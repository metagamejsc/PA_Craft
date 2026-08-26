Shader "PartyCraft/MatCap"
{
    Properties
    {
        [MainTexture] _BaseMap ("Base Map", 2D) = "white" {}
        [MainColor] _BaseColor ("Base Color", Color) = (1, 1, 1, 1)
        _MatCapTex ("MatCap", 2D) = "white" {}
        _MatCapIntensity ("MatCap Intensity", Range(0, 2)) = 1
        _FresnelPower ("Fresnel Power", Range(1, 8)) = 5
        _FresnelBias ("Fresnel Bias", Range(0, 1)) = 0.08
        _Metallic ("Metallic", Range(0, 1)) = 0
        _smoothness ("smoothness", Range(0, 1)) = 0.85
        _hueValue ("hueValue", Range(0, 1)) = 0
    }

    SubShader
    {
        Tags
        {
            "RenderType" = "Opaque"
            "RenderPipeline" = "UniversalPipeline"
            "Queue" = "Geometry"
            "UniversalMaterialType" = "Lit"
        }

        Pass
        {
            Name "ForwardMatCap"
            Tags { "LightMode" = "UniversalForward" }

            HLSLPROGRAM
            #pragma target 2.0
            #pragma vertex Vert
            #pragma fragment Frag
            #pragma multi_compile_instancing
            #pragma multi_compile _ _MATCAP_ON
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile_fragment _ _SHADOWS_SOFT

            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"

            TEXTURE2D(_BaseMap);
            SAMPLER(sampler_BaseMap);
            TEXTURE2D(_MatCapTex);
            SAMPLER(sampler_MatCapTex);

            CBUFFER_START(UnityPerMaterial)
                float4 _BaseMap_ST;
                half4 _BaseColor;
                half _MatCapIntensity;
                half _FresnelPower;
                half _FresnelBias;
                half _Metallic;
                half _smoothness;
                half _hueValue;
            CBUFFER_END

            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
                float2 uv : TEXCOORD0;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct Varyings
            {
                float4 positionCS : SV_POSITION;
                float2 uv : TEXCOORD0;
                float3 normalWS : TEXCOORD1;
                float3 positionWS : TEXCOORD2;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            Varyings Vert(Attributes input)
            {
                Varyings output;
                UNITY_SETUP_INSTANCE_ID(input);
                UNITY_TRANSFER_INSTANCE_ID(input, output);

                VertexPositionInputs positionInputs = GetVertexPositionInputs(input.positionOS.xyz);
                VertexNormalInputs normalInputs = GetVertexNormalInputs(input.normalOS);

                output.positionCS = positionInputs.positionCS;
                output.positionWS = positionInputs.positionWS;
                output.normalWS = normalInputs.normalWS;
                output.uv = TRANSFORM_TEX(input.uv, _BaseMap);
                return output;
            }

            // Same as Shader Graph Hue Normalized used by CarColor (_hueValue 0-1).
            half3 ApplyHue(half3 color, half hueOffset)
            {
                half4 k = half4(0.0h, -1.0h / 3.0h, 2.0h / 3.0h, -1.0h);
                half4 p = lerp(half4(color.bg, k.wz), half4(color.gb, k.xy), step(color.b, color.g));
                half4 q = lerp(half4(p.xyw, color.r), half4(color.r, p.yzx), step(p.x, color.r));
                half d = q.x - min(q.w, q.y);
                half e = 1e-10h;
                half v = (d == 0.0h) ? q.x : (q.x + e);
                half3 hsv = half3(abs(q.z + (q.w - q.y) / (6.0h * d + e)), d / (q.x + e), v);

                half hue = hsv.x + hueOffset;
                hsv.x = (hue < 0.0h) ? hue + 1.0h : ((hue > 1.0h) ? hue - 1.0h : hue);

                half4 k2 = half4(1.0h, 2.0h / 3.0h, 1.0h / 3.0h, 3.0h);
                half3 p2 = abs(frac(hsv.xxx + k2.xyz) * 6.0h - k2.www);
                return hsv.z * lerp(k2.xxx, saturate(p2 - k2.xxx), hsv.y);
            }

            void SampleMainLighting(
                float3 normalWS,
                float3 positionWS,
                float3 viewDirWS,
                half3 baseColor,
                out half3 diffuseLight,
                out half3 specular,
                out half reflectScale)
            {
                float4 shadowCoord = TransformWorldToShadowCoord(positionWS);
                Light mainLight = GetMainLight(shadowCoord);
                half ndotl = saturate(dot(normalWS, mainLight.direction));
                half atten = mainLight.distanceAttenuation * mainLight.shadowAttenuation;
                half3 ambient = SampleSH(normalWS);
                diffuseLight = ambient + mainLight.color * (ndotl * atten);

                // Dim fake env (MatCap) with sun/ambient so night is not glossy like day.
                half3 envLight = ambient + mainLight.color * atten;
                reflectScale = saturate(dot(envLight, half3(0.2126h, 0.7152h, 0.0722h)));

                // Mobile Blinn-Phong: gloss from smoothness, no GGX / no IBL.
                float3 halfDir = SafeNormalize(mainLight.direction + viewDirWS);
                half ndoth = saturate(dot(normalWS, halfDir));
                half gloss = exp2(8.0h * _smoothness + 1.0h);
                half specTerm = pow(ndoth, gloss) * _smoothness;
                half3 f0 = lerp(half3(0.04h, 0.04h, 0.04h), baseColor, _Metallic);
                specular = mainLight.color * (specTerm * atten) * f0;
            }

            half4 Frag(Varyings input) : SV_Target
            {
                UNITY_SETUP_INSTANCE_ID(input);

                half3 baseColor = SAMPLE_TEXTURE2D(_BaseMap, sampler_BaseMap, input.uv).rgb * _BaseColor.rgb;
                baseColor = ApplyHue(baseColor, _hueValue);

                float3 normalWS = normalize(input.normalWS);
                float3 viewDirWS = GetWorldSpaceNormalizeViewDir(input.positionWS);

                half3 diffuseLight;
                half3 specular;
                half reflectScale;
                SampleMainLighting(normalWS, input.positionWS, viewDirWS, baseColor, diffuseLight, specular, reflectScale);

                half3 litDiffuse = baseColor * diffuseLight;

                #if defined(_MATCAP_ON)
                float3 normalVS = mul((float3x3)UNITY_MATRIX_V, normalWS);
                float2 matCapUV = normalVS.xy * 0.5 + 0.5;
                // Roughness blurs MatCap via mip; still one 2D sample (no cubemap).
                half matCapLod = (1.0h - _smoothness) * 6.0h;
                half3 matCap = SAMPLE_TEXTURE2D_LOD(_MatCapTex, sampler_MatCapTex, matCapUV, matCapLod).rgb * _MatCapIntensity;

                half ndotv = saturate(dot(normalWS, viewDirWS));
                half fresnel = _FresnelBias + (1.0h - _FresnelBias) * pow(1.0h - ndotv, _FresnelPower);

                half3 reflection = lerp(matCap, baseColor * matCap, _Metallic) * reflectScale;
                half3 color = litDiffuse * (1.0h - _Metallic) + reflection * fresnel + specular;
                #else
                half3 color = litDiffuse + specular;
                #endif

                return half4(color, _BaseColor.a);
            }
            ENDHLSL
        }

        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }

            ZWrite On
            ColorMask R

            HLSLPROGRAM
            #pragma target 2.0
            #pragma vertex DepthVert
            #pragma fragment DepthFrag
            #pragma multi_compile_instancing

            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float4 _BaseMap_ST;
                half4 _BaseColor;
                half _MatCapIntensity;
                half _FresnelPower;
                half _FresnelBias;
                half _Metallic;
                half _smoothness;
                half _hueValue;
            CBUFFER_END

            struct Attributes
            {
                float4 positionOS : POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct Varyings
            {
                float4 positionCS : SV_POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            Varyings DepthVert(Attributes input)
            {
                Varyings output;
                UNITY_SETUP_INSTANCE_ID(input);
                UNITY_TRANSFER_INSTANCE_ID(input, output);
                output.positionCS = TransformObjectToHClip(input.positionOS.xyz);
                return output;
            }

            half4 DepthFrag(Varyings input) : SV_Target
            {
                return 0;
            }
            ENDHLSL
        }

        Pass
        {
            Name "ShadowCaster"
            Tags { "LightMode" = "ShadowCaster" }

            ZWrite On
            ZTest LEqual
            ColorMask 0

            HLSLPROGRAM
            #pragma target 2.0
            #pragma vertex ShadowVert
            #pragma fragment ShadowFrag
            #pragma multi_compile_instancing

            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"

            float3 _LightDirection;
            float3 _LightPosition;

            CBUFFER_START(UnityPerMaterial)
                float4 _BaseMap_ST;
                half4 _BaseColor;
                half _MatCapIntensity;
                half _FresnelPower;
                half _FresnelBias;
                half _Metallic;
                half _smoothness;
                half _hueValue;
            CBUFFER_END

            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct Varyings
            {
                float4 positionCS : SV_POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            float4 GetShadowPositionHClip(Attributes input)
            {
                float3 positionWS = TransformObjectToWorld(input.positionOS.xyz);
                float3 normalWS = TransformObjectToWorldNormal(input.normalOS);
                float3 lightDirectionWS = _LightDirection;
                float4 positionCS = TransformWorldToHClip(ApplyShadowBias(positionWS, normalWS, lightDirectionWS));
                #if UNITY_REVERSED_Z
                positionCS.z = min(positionCS.z, UNITY_NEAR_CLIP_VALUE);
                #else
                positionCS.z = max(positionCS.z, UNITY_NEAR_CLIP_VALUE);
                #endif
                return positionCS;
            }

            Varyings ShadowVert(Attributes input)
            {
                Varyings output;
                UNITY_SETUP_INSTANCE_ID(input);
                UNITY_TRANSFER_INSTANCE_ID(input, output);
                output.positionCS = GetShadowPositionHClip(input);
                return output;
            }

            half4 ShadowFrag(Varyings input) : SV_Target
            {
                return 0;
            }
            ENDHLSL
        }
    }

    FallBack Off
}
