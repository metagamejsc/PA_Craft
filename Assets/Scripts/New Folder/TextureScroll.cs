using UnityEngine;

[RequireComponent(typeof(Renderer))]
public class LavaTextureScroller : MonoBehaviour
{
    public Renderer targetRenderer;
    public string textureProperty = "_MainTex";

    public Vector2 scrollSpeed = new Vector2(0.1f, 0f);
    public Vector2 tiling = new Vector2(1f, 1f);
    public Vector2 startOffset = Vector2.zero;

    private Material mat;
    private Vector2 currentOffset;

    void Awake()
    {
        if (targetRenderer == null)
            targetRenderer = GetComponent<Renderer>();

        mat = targetRenderer.material;
    }

    void Start()
    {
        currentOffset = startOffset;
        mat.SetTextureScale(textureProperty, tiling);
        mat.SetTextureOffset(textureProperty, currentOffset);
    }

    void Update()
    {
        currentOffset += scrollSpeed * Time.deltaTime;
        mat.SetTextureScale(textureProperty, tiling);
        mat.SetTextureOffset(textureProperty, currentOffset);
    }

    public void SetTiling(Vector2 newTiling)
    {
        tiling = newTiling;
        if (mat != null)
            mat.SetTextureScale(textureProperty, tiling);
    }

    public void SetOffset(Vector2 newOffset)
    {
        currentOffset = newOffset;
        if (mat != null)
            mat.SetTextureOffset(textureProperty, currentOffset);
    }

    public void ResetOffset()
    {
        currentOffset = startOffset;
        if (mat != null)
            mat.SetTextureOffset(textureProperty, currentOffset);
    }
}