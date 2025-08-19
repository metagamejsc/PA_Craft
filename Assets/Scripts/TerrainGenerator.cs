using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class TerrainGenerator : MonoBehaviour
{
    public static TerrainGenerator ins;
    public GameObject terrainChunk;

    public Transform player;
    public GameObject objectToSpawn;
    public ParticleSystem particleSystem;
    public static Dictionary<ChunkPos, TerrainChunk> chunks = new Dictionary<ChunkPos, TerrainChunk>();

    [Header("Wall Collider Settings")]
    public float wallHeight = 100f;
    public BoxCollider wallCollider;

    [Header("Noise Settings")]
    public int chunkDist = 1;
    public float landNoiseScale = 0.8f;
    public float caveNoiseScale = 5.0f;
    public float stoneNoiseScale = 1.0f;
    public float treeNoiseScale = 0.8f;
    public float noiseIntensity = 10f;

    FastNoise noise = new FastNoise();

    List<TerrainChunk> pooledChunks = new List<TerrainChunk>();
    List<ChunkPos> toGenerate = new List<ChunkPos>();

    [Header("Room Settings")]
    public int roomInnerWidth = 8;
    public int roomInnerHeight = 4;
    public int roomInnerLength = 8;
    public BlockType roomWallBlockType = BlockType.Stone;
    public BlockType roomFloorBlockType = BlockType.Dirt;
    public BlockType roomCeilingBlockType = BlockType.Stone;
    public int wallThickness => LunaManager.ins.wallThickness;
    public float lightHoleChance = 0.2f;

    void Start()
    {
        landNoiseScale = LunaManager.ins.landNoiseScale;
        noiseIntensity = LunaManager.ins.noiseIntensity;
    
        LoadChunks(true);
        Invoke(nameof(UpdateWallCollider), 1f);
        //Invoke(nameof(CreateIslandTriggerCollider), 1.5f);
        //OnPlayerEnterIsland2 += PlayerEnteredIsland2;

        // ✅ Sinh 8 object sau khi map được load
        Invoke(nameof(SpawnExampleObjects), 0.2f); // Chờ 2 giây để chunk sinh xong
    }
    public Bounds GetGeneratedTerrainBounds()
    {
        if (chunks.Count == 0)
        {
            // Nếu chưa có chunk nào, trả về vị trí player làm trung tâm
            return new Bounds(player.position, new Vector3(50, 20, 50));
        }

        int minX = int.MaxValue, maxX = int.MinValue;
        int minZ = int.MaxValue, maxZ = int.MinValue;

        foreach (var chunk in chunks.Keys)
        {
            int chunkWorldX = chunk.x;
            int chunkWorldZ = chunk.z;
            int chunkSize = TerrainChunk.chunkWidth;

            minX = Mathf.Min(minX, chunkWorldX);
            maxX = Mathf.Max(maxX, chunkWorldX + chunkSize);
            minZ = Mathf.Min(minZ, chunkWorldZ);
            maxZ = Mathf.Max(maxZ, chunkWorldZ + chunkSize);
        }

        // Tính center và size
        float centerX = minX + (maxX - minX) / 2f;
        float centerZ = minZ + (maxZ - minZ) / 2f;
        Vector3 center = new Vector3(centerX, TerrainChunk.chunkHeight / 2f, centerZ);

        float sizeX = maxX - minX;
        float sizeZ = maxZ - minZ;
        Vector3 size = new Vector3(sizeX, TerrainChunk.chunkHeight, sizeZ);

        return new Bounds(center, size);
    }
    void SpawnExampleObjects()
    {
        TerrainGenerator.ins.SpawnObjectsOnMap(15, spawnAroundPlayer: false, spawnRadius: 40f);
    }

    private void Awake()
    {
        if (ins == null) ins = this;
        else Destroy(gameObject);
    }

    void UpdateWallCollider()
    {
        if (chunks.Count == 0) return;

        int minX = int.MaxValue, maxX = int.MinValue, minZ = int.MaxValue, maxZ = int.MinValue;
        foreach (var chunk in chunks.Keys)
        {
            minX = Mathf.Min(minX, chunk.x);
            maxX = Mathf.Max(maxX, chunk.x);
            minZ = Mathf.Min(minZ, chunk.z);
            maxZ = Mathf.Max(maxZ, chunk.z);
        }

        float width = maxX - minX + TerrainChunk.chunkWidth;
        float length = maxZ - minZ + TerrainChunk.chunkWidth;
        float centerX = minX + width / 2;
        float centerZ = minZ + length / 2;

        wallCollider.center = new Vector3(centerX, wallHeight / 2, centerZ);
        wallCollider.size = new Vector3(width + wallThickness * 2, wallHeight, length + wallThickness * 2);
    }

    void BuildChunk(int xPos, int zPos)
    {
        TerrainChunk chunk;
        if (pooledChunks.Count > 0)
        {
            chunk = pooledChunks[0];
            chunk.gameObject.SetActive(true);
            pooledChunks.RemoveAt(0);
            chunk.transform.position = new Vector3(xPos, 0, zPos);
        }
        else
        {
            GameObject chunkGO = Instantiate(terrainChunk, new Vector3(xPos, 0, zPos), Quaternion.identity);
            chunk = chunkGO.GetComponent<TerrainChunk>();
        }

        // Clear blocks
        for (int x = 0; x < TerrainChunk.chunkWidth + 2; x++)
        for (int z = 0; z < TerrainChunk.chunkWidth + 2; z++)
        for (int y = 0; y < TerrainChunk.chunkHeight; y++)
        {
            int worldX = xPos + x - 1;
            int worldZ = zPos + z - 1;
            chunk.blocks[x, y, z] = GetBlockType(worldX, y, worldZ);
        }

        GenerateTrees(chunk.blocks, xPos, zPos);

        chunk.BuildMesh();

        WaterChunk waterChunk = chunk.GetComponentInChildren<WaterChunk>();
        //waterChunk.SetLocs(chunk.blocks);
        //waterChunk.BuildMesh();

        chunks.Add(new ChunkPos(xPos, zPos), chunk);
    }

    [Header("Island Collider")]
    [SerializeField] private bool enableIslandTrigger = false; // Tắt trigger nếu không cần
    private GameObject islandTriggerObject;
    private BoxCollider islandTriggerCollider;
    public System.Action OnPlayerEnterIsland2;

    // --- CHỈNH SỬA: GetBlockType sinh địa hình liên tục theo noise ---
    BlockType GetBlockType(int x, int y, int z)
    {
        // Tính độ cao từ noise
        float simplex1 = noise.GetSimplex(x * landNoiseScale, z * landNoiseScale) * noiseIntensity;
        float simplex2 = noise.GetSimplex(x * 3f, z * 3f) * noiseIntensity * 
                         (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float heightMap = simplex1 + simplex2;
        float baseLandHeight = TerrainChunk.chunkHeight * 0.5f + heightMap;

        // Tầng đá
        float stoneNoise1 = noise.GetSimplex(x * stoneNoiseScale, z * stoneNoiseScale) * noiseIntensity;
        float stoneNoise2 = (noise.GetSimplex(x * 5f, z * 5f) + 0.5f) * 20 *
                            (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float stoneHeightMap = stoneNoise1 + stoneNoise2;
        float baseStoneHeight = TerrainChunk.chunkHeight * 0.25f + stoneHeightMap;

        // Noise hang động
        float caveNoise1 = noise.GetPerlinFractal(x * caveNoiseScale, y * caveNoiseScale * 2, z * caveNoiseScale);
        float caveMask = noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.3f;

        // Bắt đầu xác định loại khối
        BlockType blockType = BlockType.Air;

        if (y <= baseLandHeight)
        {
            blockType = BlockType.Dirt;
            if (y > baseLandHeight - 1 && y > WaterChunk.waterHeight - 2)
                blockType = BlockType.Grass;
            if (y <= baseStoneHeight)
                blockType = BlockType.Stone;
        }

        // Hang động
        if (caveNoise1 > Mathf.Max(caveMask, 0.2f))
            blockType = BlockType.Air;

        return blockType;
    }
public void SpawnObjectsOnMap(int spawnCount, bool spawnAroundPlayer = true, float spawnRadius = 50f)
{
    if (objectToSpawn == null)
    {
        Debug.LogError("objectToSpawn chưa được gán trong TerrainGenerator!");
        return;
    }

    List<Vector3> validPositions = new List<Vector3>();

    // Xác định vùng sinh
    int minX, maxX, minZ, maxZ;

    if (spawnAroundPlayer && player != null)
    {
        Vector3 playerPos = player.position;
        minX = Mathf.FloorToInt(playerPos.x - spawnRadius);
        maxX = Mathf.FloorToInt(playerPos.x + spawnRadius);
        minZ = Mathf.FloorToInt(playerPos.z - spawnRadius);
        maxZ = Mathf.FloorToInt(playerPos.z + spawnRadius);
    }
    else
    {
        // Sinh trên toàn bộ chunk đã sinh
        if (chunks.Count == 0)
        {
            Debug.LogWarning("Chưa có chunk nào được sinh. Không thể spawn object.");
            return;
        }

        minX = int.MaxValue; maxX = int.MinValue;
        minZ = int.MaxValue; maxZ = int.MinValue;

        foreach (var chunk in chunks.Keys)
        {
            minX = Mathf.Min(minX, chunk.x);
            maxX = Mathf.Max(maxX, chunk.x + TerrainChunk.chunkWidth);
            minZ = Mathf.Min(minZ, chunk.z);
            maxZ = Mathf.Max(maxZ, chunk.z + TerrainChunk.chunkWidth);
        }
    }
    int FindGroundY(int x, int z)
    {
        int y = TerrainChunk.chunkHeight - 2;
        while (y > 0 && GetBlockType(x, y, z) == BlockType.Air)
            y--;
        return y + 1; // vị trí trên mặt đất
    }
    // Tìm vị trí hợp lệ
    for (int attempt = 0; attempt < spawnCount * 20; attempt++) // Giới hạn số lần thử
    {
        int x = Random.Range(minX, maxX);
        int z = Random.Range(minZ, maxZ);

        // Tìm độ cao mặt đất tại (x, z)
        int y = FindGroundY(x, z);
        if (y <= 0) continue; // Không có mặt đất

        // Kiểm tra khối dưới chân
        BlockType ground = GetBlockType(x, y - 1, z);
        if (ground != BlockType.Grass && ground != BlockType.Dirt && ground != BlockType.Stone) continue;

        // Kiểm tra khối tại vị trí spawn (phải là Air)
        BlockType blockAtPos = GetBlockType(x, y, z);
        if (blockAtPos != BlockType.Air) continue;

        // Tránh cây
        BlockType blockAbove = GetBlockType(x, y + 1, z);
        if (blockAbove == BlockType.Trunk || blockAbove == BlockType.Leaves) continue;

        // Tránh nước (tùy chọn)
        if (y <= WaterChunk.waterHeight) continue;

        Vector3 spawnPos = new Vector3(x + 0.5f, y + 0.5f, z + 0.5f); // giữa block
        validPositions.Add(spawnPos);

        if (validPositions.Count >= spawnCount) break;
    }

    // Sinh object
    foreach (Vector3 pos in validPositions)
    {
        Instantiate(objectToSpawn, pos, Quaternion.identity);
    }

    Debug.Log($"Đã sinh {validPositions.Count}/{spawnCount} object trên bản đồ.");
}
    // Không cần tạo trigger cho "đảo" nữa, nhưng giữ lại nếu cần dùng
    public void CreateIslandTriggerCollider() { /* Bỏ trống hoặc tùy chỉnh */ }

    public void PlayerEnteredIsland2()
    {
        LunaManager.ins.ShowEndCard();
    }

    ChunkPos curChunk = new ChunkPos(-1, -1);

    void LoadChunks(bool instant = false)
    {
        int curChunkPosX = Mathf.FloorToInt(player.position.x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        int curChunkPosZ = Mathf.FloorToInt(player.position.z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;

        if (curChunk.x != curChunkPosX || curChunk.z != curChunkPosZ)
        {
            curChunk.x = curChunkPosX;
            curChunk.z = curChunkPosZ;

            for (int i = curChunkPosX - TerrainChunk.chunkWidth * chunkDist;
                 i <= curChunkPosX + TerrainChunk.chunkWidth * chunkDist;
                 i += TerrainChunk.chunkWidth)
            for (int j = curChunkPosZ - TerrainChunk.chunkWidth * chunkDist;
                 j <= curChunkPosZ + TerrainChunk.chunkWidth * chunkDist;
                 j += TerrainChunk.chunkWidth)
            {
                ChunkPos cp = new ChunkPos(i, j);
                if (!chunks.ContainsKey(cp) && !toGenerate.Contains(cp))
                {
                    if (instant)
                        BuildChunk(i, j);
                    else
                        toGenerate.Add(cp);
                }
            }

            // Unload chunks xa
            List<ChunkPos> toDestroy = new List<ChunkPos>();
            foreach (var c in chunks)
            {
                if (Mathf.Abs(curChunkPosX - c.Key.x) > TerrainChunk.chunkWidth * (chunkDist + 3) ||
                    Mathf.Abs(curChunkPosZ - c.Key.z) > TerrainChunk.chunkWidth * (chunkDist + 3))
                {
                    toDestroy.Add(c.Key);
                }
            }

            foreach (var cp in toGenerate)
            {
                if (Mathf.Abs(curChunkPosX - cp.x) > TerrainChunk.chunkWidth * (chunkDist + 1) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > TerrainChunk.chunkWidth * (chunkDist + 1))
                    toGenerate.Remove(cp);
            }

            foreach (var cp in toDestroy)
            {
                chunks[cp].gameObject.SetActive(false);
                pooledChunks.Add(chunks[cp]);
                chunks.Remove(cp);
            }

            StartCoroutine(DelayBuildChunks());
        }

        //Invoke(nameof(SpawnObjectNearPlayerAvoidTrees), 2f);
    }

    void GenerateTrees(BlockType[,,] blocks, int chunkX, int chunkZ)
    {
        System.Random rand = new System.Random(chunkX * 10000 + chunkZ);
        int treeCount = LunaManager.ins.treeCount;

        HashSet<Vector2Int> usedPositions = new HashSet<Vector2Int>();

        for (int i = 0; i < treeCount; i++)
        {
            int xPos = rand.Next(2, TerrainChunk.chunkWidth - 2);
            int zPos = rand.Next(2, TerrainChunk.chunkWidth - 2);

            Vector2Int pos = new Vector2Int(xPos, zPos);
            bool tooClose = false;
            foreach (var used in usedPositions)
            {
                if (Vector2Int.Distance(used, pos) < 4f)
                {
                    tooClose = true;
                    break;
                }
            }
            if (tooClose) continue;
            usedPositions.Add(pos);

            int y = TerrainChunk.chunkHeight - 2;
            while (y > 0 && blocks[xPos, y, zPos] == BlockType.Air) y--;
            y++;

            BlockType ground = GetBlockType(chunkX + xPos, y - 1, chunkZ + zPos);
            if (ground != BlockType.Grass && ground != BlockType.Dirt) continue;

            int treeHeight = 4 + rand.Next(3);
            for (int j = 0; j < treeHeight; j++)
                if (InBounds(xPos, y + j, zPos))
                    blocks[xPos, y + j, zPos] = BlockType.Trunk;

            int leavesStart = y + treeHeight - 2;
            for (int layer = 0; layer < 3; layer++)
            {
                int radius = 2 - layer;
                int layerY = leavesStart + layer;
                for (int lx = -radius; lx <= radius; lx++)
                for (int lz = -radius; lz <= radius; lz++)
                {
                    int leafX = xPos + lx, leafZ = zPos + lz;
                    if (Mathf.Abs(lx) + Mathf.Abs(lz) <= radius + 1 && InBounds(leafX, layerY, leafZ) && blocks[leafX, layerY, leafZ] == BlockType.Air)
                        blocks[leafX, layerY, leafZ] = BlockType.Leaves;
                }
            }
            if (InBounds(xPos, y + treeHeight, zPos))
                blocks[xPos, y + treeHeight, zPos] = BlockType.Leaves;
        }
    }

    bool InBounds(int x, int y, int z)
    {
        return x >= 0 && x < TerrainChunk.chunkWidth &&
               y >= 0 && y < TerrainChunk.chunkHeight &&
               z >= 0 && z < TerrainChunk.chunkWidth;
    }

    IEnumerator DelayBuildChunks()
    {
        while (toGenerate.Count > 0)
        {
            BuildChunk(toGenerate[0].x, toGenerate[0].z);
            toGenerate.RemoveAt(0);
            yield return new WaitForSeconds(0.05f); // sinh chậm để tránh lag
        }
    }
}

public struct ChunkPos
{
    public int x, z;
    public ChunkPos(int x, int z) { this.x = x; this.z = z; }
}