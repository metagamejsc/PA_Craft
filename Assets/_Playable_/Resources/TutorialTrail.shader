Shader "Playable/TutorialTrail"
{
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" }
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite Off
        Cull Off
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            struct Attributes { float4 vertex : POSITION; fixed4 color : COLOR; };
            struct Varyings { float4 vertex : SV_POSITION; fixed4 color : COLOR; };
            Varyings vert(Attributes input)
            {
                Varyings output;
                output.vertex = UnityObjectToClipPos(input.vertex);
                output.color = input.color;
                return output;
            }
            fixed4 frag(Varyings input) : SV_Target { return input.color; }
            ENDCG
        }
    }
}
