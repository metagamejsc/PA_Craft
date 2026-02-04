using UnityEngine;

[ExecuteAlways]
[RequireComponent(typeof(MeshFilter), typeof(MeshRenderer))]
public class BoxWithTilingUV : MonoBehaviour
{
    public Vector3 size = new Vector3(1, 1, 1);

    [Header("Materials")]
    public Material sideMaterial;
    public Material topMaterial;
    public Material bottomMaterial;

    string MeshName => $"GeneratedBox_{gameObject.GetInstanceID()}";

    void OnEnable()
    {
        EnsureUniqueMesh();
        GenerateBox();
        UpdateCollider();
        ApplyMaterials();
    }

    void OnValidate()
    {
        EnsureUniqueMesh();
        GenerateBox();
        UpdateCollider();
        ApplyMaterials();
    }

    void EnsureUniqueMesh()
    {
        var mf = GetComponent<MeshFilter>();
        var mesh = mf.sharedMesh;

        // Nếu mesh đang bị dùng chung (ví dụ do duplicate prefab) -> tạo mesh mới cho instance này
        if (mesh == null || mesh.name != MeshName)
        {
            var newMesh = new Mesh
            {
                name = MeshName,
                hideFlags = HideFlags.DontSaveInEditor | HideFlags.DontSaveInBuild
            };
            mf.sharedMesh = newMesh;
        }
    }

    void GenerateBox()
    {
        MeshFilter mf = GetComponent<MeshFilter>();
        Mesh mesh = mf.sharedMesh;

        // Ở đây mesh chắc chắn là mesh riêng của instance
        mesh.Clear();

        float x = Mathf.Abs(size.x) * 0.5f;
        float y = Mathf.Abs(size.y) * 0.5f;
        float z = Mathf.Abs(size.z) * 0.5f;

        Vector3[] vertices = {
            // Front
            new Vector3(-x, -y, z), new Vector3(x, -y, z),
            new Vector3(x, y, z), new Vector3(-x, y, z),
            // Back
            new Vector3(x, -y, -z), new Vector3(-x, -y, -z),
            new Vector3(-x, y, -z), new Vector3(x, y, -z),
            // Left
            new Vector3(-x, -y, -z), new Vector3(-x, -y, z),
            new Vector3(-x, y, z), new Vector3(-x, y, -z),
            // Right
            new Vector3(x, -y, z), new Vector3(x, -y, -z),
            new Vector3(x, y, -z), new Vector3(x, y, z),
            // Top
            new Vector3(-x, y, z), new Vector3(x, y, z),
            new Vector3(x, y, -z), new Vector3(-x, y, -z),
            // Bottom
            new Vector3(-x, -y, -z), new Vector3(x, -y, -z),
            new Vector3(x, -y, z), new Vector3(-x, -y, z),
        };

        Vector2[] uvs = {
            // Front (X,Y)
            new Vector2(0,0), new Vector2(Mathf.Abs(size.x),0),
            new Vector2(Mathf.Abs(size.x),Mathf.Abs(size.y)), new Vector2(0,Mathf.Abs(size.y)),
            // Back (X,Y)
            new Vector2(0,0), new Vector2(Mathf.Abs(size.x),0),
            new Vector2(Mathf.Abs(size.x),Mathf.Abs(size.y)), new Vector2(0,Mathf.Abs(size.y)),
            // Left (Z,Y)
            new Vector2(0,0), new Vector2(Mathf.Abs(size.z),0),
            new Vector2(Mathf.Abs(size.z),Mathf.Abs(size.y)), new Vector2(0,Mathf.Abs(size.y)),
            // Right (Z,Y)
            new Vector2(0,0), new Vector2(Mathf.Abs(size.z),0),
            new Vector2(Mathf.Abs(size.z),Mathf.Abs(size.y)), new Vector2(0,Mathf.Abs(size.y)),
            // Top (X,Z)
            new Vector2(0,0), new Vector2(Mathf.Abs(size.x),0),
            new Vector2(Mathf.Abs(size.x),Mathf.Abs(size.z)), new Vector2(0,Mathf.Abs(size.z)),
            // Bottom (X,Z)
            new Vector2(0,0), new Vector2(Mathf.Abs(size.x),0),
            new Vector2(Mathf.Abs(size.x),Mathf.Abs(size.z)), new Vector2(0,Mathf.Abs(size.z)),
        };

        int[] sides = {
            0,1,2, 0,2,3,
            4,5,6, 4,6,7,
            8,9,10, 8,10,11,
            12,13,14, 12,14,15
        };

        int[] top = { 16,17,18, 16,18,19 };
        int[] bottom = { 20,21,22, 20,22,23 };

        mesh.vertices = vertices;
        mesh.uv = uvs;

        mesh.subMeshCount = 3;
        mesh.SetTriangles(sides, 0);
        mesh.SetTriangles(top, 1);
        mesh.SetTriangles(bottom, 2);

        mesh.RecalculateNormals();
        mesh.RecalculateBounds();
    }

    void ApplyMaterials()
    {
        MeshRenderer mr = GetComponent<MeshRenderer>();
        mr.sharedMaterials = new Material[] { sideMaterial, topMaterial, bottomMaterial };
    }

    void UpdateCollider()
    {
        BoxCollider col = GetComponent<BoxCollider>();
        if (col != null)
        {
            col.size = new Vector3(Mathf.Abs(size.x), Mathf.Abs(size.y), Mathf.Abs(size.z));
            col.center = Vector3.zero;
        }
    }

    void OnDestroy()
    {
        // Dọn mesh “runtime/editor-generated” để tránh rác trong Editor
        if (!Application.isPlaying)
        {
            var mf = GetComponent<MeshFilter>();
            if (mf != null && mf.sharedMesh != null && mf.sharedMesh.name == MeshName)
                DestroyImmediate(mf.sharedMesh);
        }
    }
}
