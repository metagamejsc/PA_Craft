using UnityEngine;

[RequireComponent(typeof(MeshFilter), typeof(MeshRenderer), typeof(MeshCollider))]
public class FlowingBox : MonoBehaviour
{
    public float width = 1f;
    public float height = 1f;
    public float depth = 1f;
    public Material flowingMaterial;

    private Mesh mesh;

    void Start()
    {
        GenerateBox();
    }

    void GenerateBox()
    {
        mesh = new Mesh();
        GetComponent<MeshFilter>().mesh = mesh;

        // Vertices
        Vector3[] vertices = {
            // Front
            new Vector3(0, 0, 0), new Vector3(width, 0, 0), new Vector3(0, height, 0), new Vector3(width, height, 0),
            // Back
            new Vector3(0, 0, depth), new Vector3(width, 0, depth), new Vector3(0, height, depth), new Vector3(width, height, depth)
        };

        // Triangles
        int[] triangles = {
            // Front
            0, 2, 1, 2, 3, 1,
            // Back
            5, 7, 4, 7, 6, 4,
            // Left
            4, 6, 0, 6, 2, 0,
            // Right
            1, 3, 5, 3, 7, 5,
            // Top
            2, 6, 3, 6, 7, 3,
            // Bottom
            4, 0, 5, 0, 1, 5
        };

        // UVs
        Vector2[] uvs = {
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1), // Front
            new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1)  // Back
        };

        mesh.Clear();
        mesh.vertices = vertices;
        mesh.triangles = triangles;
        mesh.uv = uvs;
        mesh.RecalculateNormals();

        // Gán material
        if (flowingMaterial != null)
            GetComponent<MeshRenderer>().material = flowingMaterial;

        // Cập nhật MeshCollider
        GetComponent<MeshCollider>().sharedMesh = null;
        GetComponent<MeshCollider>().sharedMesh = mesh;
    }
}