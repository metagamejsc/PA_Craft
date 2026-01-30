using UnityEngine;

[ExecuteAlways]
[RequireComponent(typeof(MeshFilter), typeof(MeshRenderer))]
public class BoxWithTilingUV : MonoBehaviour
{
    public Vector3 size = new Vector3(1, 1, 1);

    void OnValidate()
    {
        GenerateBox();
        UpdateCollider();
    }

    void GenerateBox()
    {
        MeshFilter mf = GetComponent<MeshFilter>();
        Mesh mesh = new Mesh();
        mesh.name = "GeneratedBox";

        float x = size.x * 0.5f;
        float y = size.y * 0.5f;
        float z = size.z * 0.5f;

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
            new Vector2(0,0), new Vector2(size.x,0),
            new Vector2(size.x,size.y), new Vector2(0,size.y),
            // Back (X,Y)
            new Vector2(0,0), new Vector2(size.x,0),
            new Vector2(size.x,size.y), new Vector2(0,size.y),
            // Left (Z,Y)
            new Vector2(0,0), new Vector2(size.z,0),
            new Vector2(size.z,size.y), new Vector2(0,size.y),
            // Right (Z,Y)
            new Vector2(0,0), new Vector2(size.z,0),
            new Vector2(size.z,size.y), new Vector2(0,size.y),
            // Top (X,Z)
            new Vector2(0,0), new Vector2(size.x,0),
            new Vector2(size.x,size.z), new Vector2(0,size.z),
            // Bottom (X,Z)
            new Vector2(0,0), new Vector2(size.x,0),
            new Vector2(size.x,size.z), new Vector2(0,size.z),
        };

        int[] triangles = {
            0,1,2, 0,2,3,         // Front
            4,5,6, 4,6,7,         // Back
            8,9,10, 8,10,11,      // Left
            12,13,14, 12,14,15,   // Right
            16,17,18, 16,18,19,   // Top
            20,21,22, 20,22,23    // Bottom
        };

        mesh.vertices = vertices;
        mesh.uv = uvs;
        mesh.triangles = triangles;
        mesh.RecalculateNormals();

        mf.sharedMesh = mesh;
    }

    void UpdateCollider()
    {
        BoxCollider col = GetComponent<BoxCollider>();
        if (col != null)
        {
            col.size = size;
            col.center = Vector3.zero;
        }
    }
}
