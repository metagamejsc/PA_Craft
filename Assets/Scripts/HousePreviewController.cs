using System;
using UnityEngine;
using UnityEngine.UI;

public class HousePreviewController : MonoBehaviour
{
    public static HousePreviewController ins;
    public GameObject[] housePreviewPrefab;
    private static GameObject currentPreview;
    public Button btnLeft, btnRight, btnUp, btnDown, btnBuild;

    public static Vector3 previewPos; // Tọa độ global
    private float gridSize = 1f; // Di chuyển theo block

    private void Awake()
    {
        ins = this;
    }

    void Start()
    {
        btnLeft.onClick.AddListener(MoveLeft);
        btnRight.onClick.AddListener(MoveRight);
        btnUp.onClick.AddListener(MoveUp);
        btnDown.onClick.AddListener(MoveDown);
        btnBuild.onClick.AddListener(()=>
        {
            LunaManager.ins.StartBuilding();
        });
    }

    public void InitPreviewHouse(int index)
    {
        currentPreview = Instantiate(housePreviewPrefab[index]);
        previewPos = FindInitialPosition(); // Lấy vị trí ban đầu
        currentPreview.transform.position = previewPos;
    }
    void Update()
    {
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

    public void MoveLeft()
    {
        MovePreview(-1, 0);
    }
    public void MoveRight()
    {
        MovePreview(1, 0);
    }
    public void MoveUp()
    {
        MovePreview(0,1);
    }
    public void MoveDown()
    {
        MovePreview(0, -1);
    }
    public static void BuildHouse()
    {
        BuildHouseAt(previewPos);
    }
    void MovePreview(int dx, int dz)
    {
        // Di chuyển vị trí preview trên mặt phẳng XZ
        previewPos += new Vector3(dx * gridSize, 0, dz * gridSize);

        // Tìm vị trí Y trên mặt phẳng (mặt đất)
        int xPos = Mathf.RoundToInt(previewPos.x);
        int zPos = Mathf.RoundToInt(previewPos.z);

        int y = TerrainChunk.chunkHeight - 2;
        while (y > 0 && GetBlockType(xPos, y, zPos) == BlockType.Air)
            y--;

        y++; // block Air trên mặt phẳng

        previewPos.y = y; // Đặt đúng y ở mặt phẳng địa hình

        currentPreview.transform.position = previewPos;
    }
    BlockType GetBlockType(int x, int y, int z)
    {
        return FindObjectOfType<TerrainGenerator>().GetBlockType(x, y, z);
    }

    static Vector3 FindInitialPosition()
    {
        // Có thể dùng vị trí player, hoặc 1 vị trí mặc định
        Vector3 playerPos = FindObjectOfType<TerrainGenerator>().player.position;
        return new Vector3(Mathf.Round(playerPos.x), 33, Mathf.Round(playerPos.z));
    }

    public static void BuildHouseAt(Vector3 pos)
    {
        currentPreview.SetActive(false);
        int x = Mathf.RoundToInt(pos.x);
        int y = Mathf.RoundToInt(pos.y-1);
        int z = Mathf.RoundToInt(pos.z);

        // Gọi HouseGenerator để xây nhà
        //HouseGenerator.GenerateHouse(TerrainGenerator.chunks, x, y, z);
        if (LunaManager.ins.houseIndex==0)
        {
            HouseGenerator.GenerateHouse(TerrainGenerator.chunks, x, y, z);
        }
        else
        {
            HouseGenerator.GenerateSlopedRoofHouse(TerrainGenerator.chunks, x, y, z);
        }

        // Gọi BuildMesh cho các chunk liên quan
        for (int dx = -1; dx <= 1; dx++)
        {
            for (int dz = -1; dz <= 1; dz++)
            {
                int chunkX = Mathf.FloorToInt((x + dx * TerrainChunk.chunkWidth) / (float)TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                int chunkZ = Mathf.FloorToInt((z + dz * TerrainChunk.chunkWidth) / (float)TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
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
