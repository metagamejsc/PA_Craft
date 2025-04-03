using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TerrainWallCollider : MonoBehaviour
{
    public Transform player;

    public static Dictionary<ChunkPos, TerrainChunk> chunks = new Dictionary<ChunkPos, TerrainChunk>();

    [Header("Wall Collider Settings")]
    public float wallHeight = 100f;       // Chiều cao của tường bao
    public float wallThickness = 2f;      // Độ dày của tường

    private BoxCollider wallCollider;

    void Start()
    {
        // Khởi tạo collider
        CreateWallCollider();
    }

    private void Update()
    {
        // Tạo lại tường khi cần
        UpdateWallCollider();
    }

    void CreateWallCollider()
    {
        // Xóa collider cũ nếu có
        if (wallCollider != null)
        {
            Destroy(wallCollider);
        }

        // Tạo BoxCollider mới
        wallCollider = gameObject.AddComponent<BoxCollider>();
        wallCollider.isTrigger = false;  // Bật va chạm
    }

    void UpdateWallCollider()
    {
        if (chunks.Count == 0) return;

        // Tính toán vùng bao quanh tất cả các chunk
        int minX = int.MaxValue;
        int maxX = int.MinValue;
        int minZ = int.MaxValue;
        int maxZ = int.MinValue;

        foreach (var chunk in chunks.Keys)
        {
            minX = Mathf.Min(minX, chunk.x);
            maxX = Mathf.Max(maxX, chunk.x);
            minZ = Mathf.Min(minZ, chunk.z);
            maxZ = Mathf.Max(maxZ, chunk.z);
        }

        // Tính toán vị trí và kích thước của bức tường collider
        float width = maxX - minX + 16;
        float length = maxZ - minZ + 16;
        float centerX = minX + width / 2;
        float centerZ = minZ + length / 2;

        // Cập nhật collider
        wallCollider.center = new Vector3(centerX, wallHeight / 2, centerZ);
        wallCollider.size = new Vector3(width + wallThickness, wallHeight, length + wallThickness);
    }

    // Gọi hàm này sau khi cập nhật chunk
    public void RefreshCollider()
    {
        UpdateWallCollider();
    }
}