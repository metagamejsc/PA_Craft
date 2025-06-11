using UnityEngine;

public class HousePreviewController : MonoBehaviour
{
    public GameObject housePreviewPrefab;
    private GameObject currentPreview;

    private Vector3 previewPos; // Tọa độ global
    private float gridSize = 1f; // Di chuyển theo block

    void Start()
    {
        // Khởi tạo preview house
        currentPreview = Instantiate(housePreviewPrefab);
        currentPreview.SetActive(false); // Ẩn ban đầu
    }

    void Update()
    {
        // Kích hoạt preview nếu chưa
        if (!currentPreview.activeSelf)
        {
            previewPos = FindInitialPosition(); // Lấy vị trí ban đầu
            currentPreview.transform.position = previewPos;
            currentPreview.SetActive(true);
        }

        // Di chuyển preview bằng phím mũi tên
        if (Input.GetKeyDown(KeyCode.LeftArrow)) MovePreview(-1, 0);
        if (Input.GetKeyDown(KeyCode.RightArrow)) MovePreview(1, 0);
        if (Input.GetKeyDown(KeyCode.UpArrow)) MovePreview(0, 1);
        if (Input.GetKeyDown(KeyCode.DownArrow)) MovePreview(0, -1);

        // Xác nhận vị trí để xây nhà
        if (Input.GetKeyDown(KeyCode.Return))
        {
            BuildHouseAt(previewPos);
        }
    }

    void MovePreview(int dx, int dz)
    {
        previewPos += new Vector3(dx * gridSize, 0, dz * gridSize);
        currentPreview.transform.position = previewPos;
    }

    Vector3 FindInitialPosition()
    {
        // Có thể dùng vị trí player, hoặc 1 vị trí mặc định
        Vector3 playerPos = FindObjectOfType<TerrainGenerator>().player.position;
        return new Vector3(Mathf.Round(playerPos.x), 33, Mathf.Round(playerPos.z));
    }

    void BuildHouseAt(Vector3 pos)
    {
        int x = Mathf.RoundToInt(pos.x);
        int y = Mathf.RoundToInt(pos.y);
        int z = Mathf.RoundToInt(pos.z);

        // Gọi HouseGenerator để xây nhà thật
        TerrainGenerator terrainGen = FindObjectOfType<TerrainGenerator>();
        HouseGenerator.GenerateHouse(TerrainGenerator.chunks, x, y, z);

        // Gọi BuildMesh cho các chunk liên quan
        for (int dx = -1; dx <= 1; dx++)
        {
            for (int dz = -1; dz <= 1; dz++)
            {
                int chunkX = (x + dx * TerrainChunk.chunkWidth) / TerrainChunk.chunkWidth * TerrainChunk.chunkWidth;
                int chunkZ = (z + dz * TerrainChunk.chunkWidth) / TerrainChunk.chunkWidth * TerrainChunk.chunkWidth;
                ChunkPos posChunk = new ChunkPos(chunkX, chunkZ);

                if (TerrainGenerator.chunks.ContainsKey(posChunk))
                {
                    TerrainGenerator.chunks[posChunk].BuildMesh();
                }
            }
        }

        Debug.Log("Đã xây nhà tại: " + pos);
    }
}
