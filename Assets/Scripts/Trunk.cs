using UnityEngine;

public class Trunk : MonoBehaviour
{
    public Texture2D trunkTexture;

    void Start()
    {
        // Tạo và gán material
        MeshRenderer renderer = gameObject.AddComponent<MeshRenderer>();
        Material material = new Material(Shader.Find("Standard"));
        material.mainTexture = trunkTexture;
        renderer.material = material;

        // Tạo khối voxel
        MeshFilter filter = gameObject.AddComponent<MeshFilter>();
        filter.mesh = CreateVoxelMesh();
    }

    Mesh CreateVoxelMesh()
    {
        Mesh mesh = new Mesh();
        
        Vector3[] vertices = {
            new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 1, 0), new Vector3(0, 1, 0), // Mặt trước
            new Vector3(0, 0, 1), new Vector3(1, 0, 1), new Vector3(1, 1, 1), new Vector3(0, 1, 1)  // Mặt sau
        };

        int[] triangles = {
            0, 2, 1, 0, 3, 2, // Mặt trước
            4, 5, 6, 4, 6, 7, // Mặt sau
            0, 1, 5, 0, 5, 4, // Mặt dưới
            2, 3, 7, 2, 7, 6, // Mặt trên
            0, 4, 7, 0, 7, 3, // Mặt trái
            1, 2, 6, 1, 6, 5  // Mặt phải
        };

        Vector2[] uv = {
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1), // UV mặt trước
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)  // UV mặt sau
        };

        mesh.vertices = vertices;
        mesh.triangles = triangles;
        mesh.uv = uv;
        mesh.RecalculateNormals();

        return mesh;
    }
}