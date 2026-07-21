Shader "UI/RoundedImage"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Radius ("Corner Radius", Range(0,0.5)) = 0.1
        _BorderWidth ("Border Width", Range(0,0.1)) = 0.01
        _BorderColor ("Border Color", Color) = (1,1,1,1)
    }

    SubShader
    {
        Tags
        {
            "Queue"="Transparent"
            "RenderType"="Transparent"
            "CanUseSpriteAtlas"="True"
        }

        Blend SrcAlpha OneMinusSrcAlpha
        Cull Off
        Lighting Off
        ZWrite Off

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            sampler2D _MainTex;
            float4 _MainTex_ST;

            float _Radius;
            float _BorderWidth;
            float4 _BorderColor;

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

            v2f vert(appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                return o;
            }

            float roundedBox(float2 p, float2 b, float r)
            {
                float2 q = abs(p) - b + r;
                return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                fixed4 col = tex2D(_MainTex, i.uv);

                float2 p = i.uv - 0.5;

                float dist = roundedBox(p, float2(0.5,0.5), _Radius);

                float aa = fwidth(dist);

                float alpha = 1 - smoothstep(0, aa, dist);

                float border = smoothstep(-_BorderWidth-aa, -_BorderWidth, dist)
                             - smoothstep(-aa, 0, dist);

                col.rgb = lerp(col.rgb, _BorderColor.rgb, border * _BorderColor.a);
                col.a *= alpha;

                return col;
            }
            ENDCG
        }
    }
}