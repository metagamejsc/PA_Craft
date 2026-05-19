using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif

[RequireComponent(typeof(Renderer))]
public class SetupMaterialTiling : MonoBehaviour
{
    [Header("Material")]
    public bool useSharedMaterial = true;
    public Material sharedMaterial;

    [Header("Tiling")]
    public bool autoMatchScale = true;
    public Vector2 manualTiling = Vector2.one;
    public bool generateBoxUvForXYZ = true;
    public bool uniqueMeshPerObject = true;
    public float worldUnitsPerTile = 1f;

    [Header("Scrolling UV")]
    public bool enableScrolling = false;
    public Vector2 uvScrollSpeed = new Vector2(1f, 0f);

    private MaterialPropertyBlock mpb;
    private Vector2 scrollOffset;
    private Mesh generatedMesh;
    [SerializeField, HideInInspector] private Mesh originalMesh;

    private void Start()
    {
        CaptureOriginalMesh();
        ApplyMaterialAndTiling();
    }

    private void Update()
    {
        if (!Application.isPlaying || !enableScrolling)
            return;

        scrollOffset += uvScrollSpeed * Time.deltaTime;
        ApplyMaterialAndTiling();
    }

    [ContextMenu("Apply Material & Tiling")]
    public void ApplyMaterialAndTiling()
    {
        Renderer targetRenderer = GetComponent<Renderer>();
        if (targetRenderer == null)
        {
            Debug.LogError("Renderer not found.", this);
            return;
        }

        if (sharedMaterial == null)
        {
            Debug.LogError("Please assign Shared Material.", this);
            return;
        }

        if (useSharedMaterial)
            targetRenderer.sharedMaterial = sharedMaterial;
        else if (targetRenderer.sharedMaterial != sharedMaterial)
            targetRenderer.material = new Material(sharedMaterial);

        if (generateBoxUvForXYZ)
            ApplyBoxUv();

        ApplyMaterialPropertyBlock(targetRenderer);
        SetupTextureWrapMode();
    }

    [ContextMenu("Restore Original Mesh")]
    public void RestoreOriginalMesh()
    {
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter == null)
            return;

        if (originalMesh != null)
            meshFilter.sharedMesh = originalMesh;

        DestroyGeneratedMesh();
    }

    private void ApplyMaterialPropertyBlock(Renderer targetRenderer)
    {
        if (mpb == null)
            mpb = new MaterialPropertyBlock();

        targetRenderer.GetPropertyBlock(mpb);

        Vector2 tiling = generateBoxUvForXYZ
            ? Vector2.one
            : autoMatchScale
                ? new Vector2(Mathf.Abs(transform.localScale.x), Mathf.Abs(transform.localScale.z))
                : manualTiling;

        mpb.SetVector("_MainTex_ST", new Vector4(tiling.x, tiling.y, scrollOffset.x, scrollOffset.y));
        targetRenderer.SetPropertyBlock(mpb);
    }

    private void ApplyBoxUv()
    {
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter == null)
            return;

        CaptureOriginalMesh();

        Mesh sourceMesh = originalMesh != null ? originalMesh : meshFilter.sharedMesh;
        if (sourceMesh == null)
        {
            Debug.LogError("MeshFilter has no mesh. Assign a mesh before applying material tiling.", this);
            return;
        }

        if (uniqueMeshPerObject)
        {
            generatedMesh = meshFilter.mesh;
            generatedMesh.name = $"{sourceMesh.name}_BoxUV_{gameObject.GetInstanceID()}";
            CopyMesh(sourceMesh, generatedMesh);
        }
        else if (generatedMesh == null)
        {
            generatedMesh = Instantiate(sourceMesh);
            generatedMesh.name = sourceMesh.name + "_BoxUV";
            generatedMesh.hideFlags = HideFlags.HideAndDontSave;
        }
        else
        {
            generatedMesh.Clear();
            CopyMesh(sourceMesh, generatedMesh);
        }

        Vector3[] vertices = generatedMesh.vertices;
        Vector3[] normals = generatedMesh.normals;
        Vector2[] uvs = new Vector2[vertices.Length];

        Vector3 scale = GetUvScale();
        float tileSize = Mathf.Max(0.0001f, worldUnitsPerTile);

        for (int i = 0; i < vertices.Length; i++)
        {
            Vector3 normal = normals != null && normals.Length == vertices.Length ? normals[i] : Vector3.up;
            Vector3 absNormal = new Vector3(Mathf.Abs(normal.x), Mathf.Abs(normal.y), Mathf.Abs(normal.z));
            Vector3 worldLikePosition = Vector3.Scale(vertices[i], scale);

            if (absNormal.x >= absNormal.y && absNormal.x >= absNormal.z)
                uvs[i] = new Vector2(worldLikePosition.z, worldLikePosition.y) / tileSize;
            else if (absNormal.y >= absNormal.x && absNormal.y >= absNormal.z)
                uvs[i] = new Vector2(worldLikePosition.x, worldLikePosition.z) / tileSize;
            else
                uvs[i] = new Vector2(worldLikePosition.x, worldLikePosition.y) / tileSize;
        }

        generatedMesh.uv = uvs;
    }

    private void CaptureOriginalMesh()
    {
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter == null)
            return;

        if (IsGeneratedBoxUvMesh(originalMesh))
            originalMesh = null;

        if (meshFilter.sharedMesh == null)
        {
            if (originalMesh != null)
                meshFilter.sharedMesh = originalMesh;

            return;
        }

        if (meshFilter.sharedMesh != generatedMesh && !IsGeneratedBoxUvMesh(meshFilter.sharedMesh))
            originalMesh = meshFilter.sharedMesh;
    }

    private static void CopyMesh(Mesh source, Mesh target)
    {
        target.vertices = source.vertices;
        target.triangles = source.triangles;
        target.normals = source.normals;
        target.tangents = source.tangents;
        target.colors = source.colors;
        target.uv = source.uv;
        target.uv2 = source.uv2;
        target.bounds = source.bounds;
        target.subMeshCount = source.subMeshCount;

        for (int i = 0; i < source.subMeshCount; i++)
            target.SetTriangles(source.GetTriangles(i), i);
    }

    private static bool IsGeneratedBoxUvMesh(Mesh mesh)
    {
        return mesh != null && mesh.name.Contains("_BoxUV");
    }

    private Vector3 GetUvScale()
    {
        if (!autoMatchScale)
            return new Vector3(manualTiling.x, manualTiling.y, manualTiling.x);

        Vector3 scale = transform.lossyScale;
        return new Vector3(Mathf.Abs(scale.x), Mathf.Abs(scale.y), Mathf.Abs(scale.z));
    }

    private void SetupTextureWrapMode()
    {
#if UNITY_EDITOR
        if (sharedMaterial == null)
            return;

        Texture mainTexture = sharedMaterial.GetTexture("_MainTex");
        if (mainTexture == null)
            return;

        string assetPath = AssetDatabase.GetAssetPath(mainTexture);
        if (string.IsNullOrEmpty(assetPath))
            return;

        TextureImporter importer = AssetImporter.GetAtPath(assetPath) as TextureImporter;
        if (importer != null && importer.wrapMode != TextureWrapMode.Repeat)
        {
            importer.wrapMode = TextureWrapMode.Repeat;
            importer.SaveAndReimport();
            Debug.Log($"Set Wrap Mode = Repeat for texture: {mainTexture.name}", this);
        }
#endif
    }

#if UNITY_EDITOR
    private void OnValidate()
    {
        worldUnitsPerTile = Mathf.Max(0.0001f, worldUnitsPerTile);
        manualTiling.x = Mathf.Max(0.0001f, manualTiling.x);
        manualTiling.y = Mathf.Max(0.0001f, manualTiling.y);

        if (!Application.isPlaying)
            CaptureOriginalMesh();
    }
#endif

    private void OnDisable()
    {
        if (!Application.isPlaying)
            RestoreOriginalMesh();
    }

    private void OnDestroy()
    {
        DestroyGeneratedMesh();
    }

    private void DestroyGeneratedMesh()
    {
        if (generatedMesh == null)
            return;

        if (Application.isPlaying)
            Destroy(generatedMesh);
        else
            DestroyImmediate(generatedMesh);

        generatedMesh = null;
    }
}
