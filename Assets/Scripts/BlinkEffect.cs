using UnityEngine;

public class BlinkEffect : MonoBehaviour
{
    [ColorUsage(true, true)] public Color blinkColor = new Color(1, 1, 1, 0.6f);
    private Material material;
    private Color originalColor;

    void Start()
    {
        var renderer = GetComponent<Renderer>();
        material = renderer.material;
        originalColor = material.color;
    }

    void Update()
    {
        float alpha = 0.4f + 0.6f * Mathf.Sin(Time.time * 8f);
        material.color = Color.Lerp(originalColor, blinkColor, alpha);
    }
}