Shader "Custom/MinecraftLava"
{
    Properties
    {
        _MainTex ("Lava Texture", 2D) = "white" {}
        _ScrollSpeed ("Scroll Speed", Vector) = (0.1, 0.1, 0, 0)
        _EmissionColor ("Emission Color", Color) = (1, 0.5, 0, 1)
        _EmissionStrength ("Emission Strength", Range(0,10)) = 2
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 200

        CGPROGRAM
        #pragma surface surf Standard fullforwardshadows

        sampler2D _MainTex;
        float4 _ScrollSpeed;
        float4 _EmissionColor;
        float _EmissionStrength;

        struct Input
        {
            float2 uv_MainTex;
        };

        void surf (Input IN, inout SurfaceOutputStandard o)
        {
            float2 uv = IN.uv_MainTex + _ScrollSpeed.xy * _Time.y;
            fixed4 c = tex2D(_MainTex, uv);
            o.Albedo = c.rgb;
            o.Emission = c.rgb * _EmissionColor.rgb * _EmissionStrength;
            o.Smoothness = 0.0;
            o.Metallic = 0.0;
        }
        ENDCG
    }
    FallBack "Diffuse"
}
