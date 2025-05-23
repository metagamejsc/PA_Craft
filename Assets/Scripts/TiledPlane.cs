using UnityEngine;

public class TiledPlane : MonoBehaviour
{
    public int sizeX = 10;  // Chiều ngang (X)
    public int sizeZ = 10;  // Chiều sâu (Z)
    public Material tileMaterial;

    void Start()
    {
        // Tạo plane Unity mặc định (10x10 units)
        GameObject plane = GameObject.CreatePrimitive(PrimitiveType.Plane);

        // Đặt làm con của GameObject này (giữ vị trí gốc)
        plane.transform.parent = this.transform;

        // Đặt vị trí trùng object chứa script
        plane.transform.position = transform.position;

        // Đặt tỉ lệ theo size yêu cầu
        plane.transform.localScale = new Vector3(sizeX / 10f, 1, sizeZ / 10f);

        if (tileMaterial != null)
        {
            Renderer rend = plane.GetComponent<Renderer>();
            plane.GetComponent<MeshCollider>().convex=true;
            plane.GetComponent<MeshCollider>().isTrigger=true;
            rend.material = tileMaterial;

            // Tiling UV để texture lặp theo size 1x1
            rend.material.mainTextureScale = new Vector2(sizeX, sizeZ);
        }
        
    }
}