using UnityEngine;

[ExecuteInEditMode]
public class CreateCorrectUVCube : MonoBehaviour
{
    public Vector3 cubeSize = Vector3.one;

    void Start()
    {
        CreateCubeWithCorrectUV();
    }

    [ContextMenu("Create Cube with Correct UV")]
    void CreateCubeWithCorrectUV()
    {
        MeshFilter mf = GetComponent<MeshFilter>();
        if (mf == null) mf = gameObject.AddComponent<MeshFilter>();

        Mesh mesh = new Mesh();
        mf.mesh = mesh;

        // Đỉnh (vertices)
        Vector3[] vertices = new Vector3[]
        {
            // Mặt trước (Z+)
            new Vector3(-0.5f, -0.5f, 0.5f),
            new Vector3(0.5f, -0.5f, 0.5f),
            new Vector3(0.5f, 0.5f, 0.5f),
            new Vector3(-0.5f, 0.5f, 0.5f),

            // Mặt sau (Z-)
            new Vector3(-0.5f, -0.5f, -0.5f),
            new Vector3(0.5f, -0.5f, -0.5f),
            new Vector3(0.5f, 0.5f, -0.5f),
            new Vector3(-0.5f, 0.5f, -0.5f),

            // Mặt phải (X+)
            new Vector3(0.5f, -0.5f, -0.5f),
            new Vector3(0.5f, -0.5f, 0.5f),
            new Vector3(0.5f, 0.5f, 0.5f),
            new Vector3(0.5f, 0.5f, -0.5f),

            // Mặt trái (X-)
            new Vector3(-0.5f, -0.5f, -0.5f),
            new Vector3(-0.5f, -0.5f, 0.5f),
            new Vector3(-0.5f, 0.5f, 0.5f),
            new Vector3(-0.5f, 0.5f, -0.5f),

            // Mặt trên (Y+)
            new Vector3(-0.5f, 0.5f, -0.5f),
            new Vector3(0.5f, 0.5f, -0.5f),
            new Vector3(0.5f, 0.5f, 0.5f),
            new Vector3(-0.5f, 0.5f, 0.5f),

            // Mặt dưới (Y-)
            new Vector3(-0.5f, -0.5f, -0.5f),
            new Vector3(0.5f, -0.5f, -0.5f),
            new Vector3(0.5f, -0.5f, 0.5f),
            new Vector3(-0.5f, -0.5f, 0.5f),
        };

        // UV chuẩn — mỗi mặt có UV từ (0,0) đến (1,1) theo đúng hướng
        Vector2[] uvs = new Vector2[]
        {
            // Mặt trước
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1),
            // Mặt sau
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1),
            // Mặt phải
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1),
            // Mặt trái
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1),
            // Mặt trên — LUU Y: cần đảo V để texture không bị ngược
            new Vector2(0, 1), new Vector2(1, 1), new Vector2(1, 0), new Vector2(0, 0),
            // Mặt dưới — LUU Y: cần đảo V để texture không bị ngược
            new Vector2(0, 1), new Vector2(1, 1), new Vector2(1, 0), new Vector2(0, 0),
        };

        // Tam giác
        int[] triangles = new int[]
        {
            0, 2, 1, 0, 3, 2, // trước
            4, 5, 6, 4, 6, 7, // sau
            8, 9, 10, 8, 10, 11, // phải
            12, 15, 14, 12, 14, 13, // trái
            16, 17, 18, 16, 18, 19, // trên
            20, 23, 22, 20, 22, 21  // dưới
        };

        // Áp dụng
        mesh.vertices = vertices;
        mesh.uv = uvs;
        mesh.triangles = triangles;
        mesh.RecalculateNormals();

        // Scale theo cubeSize
        transform.localScale = cubeSize;

        // Gán collider
        if (GetComponent<BoxCollider>() == null)
            gameObject.AddComponent<BoxCollider>();
    }
}