using System.Collections.Generic;
using UnityEngine;

public class ChunkGenerator : MonoBehaviour
{
    public int chunkSize = 16;
    public int heightMultiplier = 8;
    public float noiseScale = 0.1f;
    public Material blockMaterial;

    void Start()
    {
        GenerateChunk();
    }

    void GenerateChunk()
    {
        MeshFilter meshFilter = gameObject.AddComponent<MeshFilter>();
        MeshRenderer meshRenderer = gameObject.AddComponent<MeshRenderer>();
        meshRenderer.material = blockMaterial;

        List<Vector3> vertices = new List<Vector3>();
        List<int> triangles = new List<int>();
        List<Vector2> uvs = new List<Vector2>();

        for (int x = 0; x < chunkSize; x++)
        {
            for (int z = 0; z < chunkSize; z++)
            {
                // Tạo chiều cao dựa vào Noise
                int height = Mathf.FloorToInt(Mathf.PerlinNoise(x * noiseScale, z * noiseScale) * heightMultiplier);

                // Tạo mặt trên của khối ở độ cao lớn nhất
                AddTopFace(vertices, triangles, uvs, x, height, z);
            }
        }

        // Gán mesh
        Mesh mesh = new Mesh();
        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();
        mesh.uv = uvs.ToArray();
        mesh.RecalculateNormals();

        meshFilter.mesh = mesh;
    }

    void AddTopFace(List<Vector3> vertices, List<int> triangles, List<Vector2> uvs, int x, int y, int z)
    {
        int vertexIndex = vertices.Count;

        // Định nghĩa 4 đỉnh của mặt trên
        vertices.Add(new Vector3(x, y, z));
        vertices.Add(new Vector3(x + 1, y, z));
        vertices.Add(new Vector3(x + 1, y, z + 1));
        vertices.Add(new Vector3(x, y, z + 1));

        // Tạo tam giác cho mặt trên
        triangles.Add(vertexIndex + 0);
        triangles.Add(vertexIndex + 1);
        triangles.Add(vertexIndex + 2);

        triangles.Add(vertexIndex + 0);
        triangles.Add(vertexIndex + 2);
        triangles.Add(vertexIndex + 3);

        // UV mapping (sử dụng texture vuông)
        uvs.Add(new Vector2(0, 0));
        uvs.Add(new Vector2(1, 0));
        uvs.Add(new Vector2(1, 1));
        uvs.Add(new Vector2(0, 1));
    }
}