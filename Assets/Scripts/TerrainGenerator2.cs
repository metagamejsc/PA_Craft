using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class TerrainGenerator2 : MonoBehaviour
{
    public static TerrainGenerator2 ins;
    public GameObject terrainChunk;

    public Transform player;
    public ParticleSystem particleSystem;
    public static Dictionary<ChunkPos, TerrainChunk> chunks = new Dictionary<ChunkPos, TerrainChunk>();

    [Header("Wall Collider Settings")] public float wallHeight = 100f; // Chiều cao của tường bao

    // Độ dày của tường
    public BoxCollider wallCollider;

    [Header("Noise Settings")] public int chunkDist = 1;
    public float landNoiseScale = 0.8f;
    public float caveNoiseScale = 5.0f;
    public float stoneNoiseScale = 1.0f;
    public float treeNoiseScale = 0.8f;
    public float noiseIntensity = 10;

    FastNoise noise = new FastNoise();


    List<TerrainChunk> pooledChunks = new List<TerrainChunk>();

    List<ChunkPos> toGenerate = new List<ChunkPos>();
    public int wallThickness => LunaManager.ins.wallThickness; // Độ dày tường (từ 1 trở lên)

    void Start()
    {
        landNoiseScale = LunaManager.ins.landNoiseScale;
        noiseIntensity = LunaManager.ins.noiseIntensity;
        LoadChunks(true);
        Invoke(nameof(UpdateWallCollider), 1f);
        Invoke(nameof(CreateIslandTriggerCollider), 1.5f);
        OnPlayerEnterIsland2 += PlayerEnteredIsland2;
        
        Invoke(nameof(SpawnSpecialTreeOnIsland2), 0.5f); // Chờ chút để chunk được sinh
    }

    private void Awake()
    {
        ins = this;
    }
    void SpawnSpecialTreeOnIsland2()
    {
        SpawnTreeAtPosition(island2Center.x, island2Center.y);
    }
void SpawnTreeAtPosition(int x, int z)
{
    // Tìm chunk chứa tọa độ (x, z)
    int chunkX = Mathf.FloorToInt((float)x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
    int chunkZ = Mathf.FloorToInt((float)z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;

    if (!chunks.ContainsKey(new ChunkPos(chunkX, chunkZ)))
    {
        Debug.LogWarning($"Không thể trồng cây tại ({x}, {z}) – chunk chưa được sinh.");
        return;
    }

    TerrainChunk chunk = chunks[new ChunkPos(chunkX, chunkZ)];

    // Tính tọa độ tương đối trong chunk
    int localX = x - chunkX;
    int localZ = z - chunkZ;

    // Tìm độ cao mặt đất tại vị trí này
    int y = TerrainChunk.chunkHeight - 2;
    while (y > 0 && GetBlockType(x, y, z) == BlockType.Air)
        y--;
    y++; // vị trí trên mặt đất

    // Kiểm tra loại block dưới chân (phải là Grass hoặc Dirt)
    BlockType ground = GetBlockType(x, y - 1, z);
    if (ground != BlockType.Grass && ground != BlockType.Dirt)
    {
        Debug.LogWarning($"Không thể trồng cây tại ({x}, {y - 1}, {z}) – không phải mặt đất.");
        return;
    }

    // Trồng thân cây (cao hơn bình thường một chút để nổi bật)
    int treeHeight = 8; // Cây cao hơn bình thường
    for (int j = 0; j < treeHeight; j++)
    {
        if (InBounds(localX, y + j, localZ))
            chunk.blocks[localX, y + j, localZ] = BlockType.Trunk;
    }

    // Tán lá – dạng hình cầu nhẹ
    int leavesStart = y + treeHeight - 3;
    for (int layer = 0; layer < 4; layer++)
    {
        int radius = 3 - layer; // Tán thu nhỏ dần theo độ cao
        int layerY = leavesStart + layer;
        for (int lx = -radius; lx <= radius; lx++)
        {
            for (int lz = -radius; lz <= radius; lz++)
            {
                if (Mathf.Abs(lx) + Mathf.Abs(lz) <= radius + 1)
                {
                    int leafX = localX + lx;
                    int leafZ = localZ + lz;
                    if (InBounds(leafX, layerY, leafZ) && chunk.blocks[leafX, layerY, leafZ] == BlockType.Air)
                        chunk.blocks[leafX, layerY, leafZ] = BlockType.Leaves;
                }
            }
        }
    }

    // Lá trên cùng
    if (InBounds(localX, y + treeHeight, localZ))
        chunk.blocks[localX, y + treeHeight, localZ] = BlockType.Leaves;

    // Cập nhật lại mesh của chunk này
    chunk.BuildMesh();
    WaterChunk waterChunk = chunk.GetComponentInChildren<WaterChunk>();
    waterChunk.SetLocs(chunk.blocks);
    waterChunk.BuildMesh();

    Debug.Log($"Đã trồng một cái cây đặc biệt tại trung tâm đảo 2: ({x}, {y}, {z})");
}
    public void SpawnObjectNearPlayerAvoidTrees()
    {
        for (int attempt = 0; attempt < 20; attempt++) // thử tối đa 20 lần
        {
            Vector3 playerPos = player.position;

            int x = Mathf.RoundToInt(playerPos.x + Random.Range(-8, 8));
            int z = Mathf.RoundToInt(playerPos.z + Random.Range(-8, 8));

            int y = TerrainChunk.chunkHeight - 2;
            while (y > 0 && GetBlockType(x, y, z) == BlockType.Air)
                y--;

            y++; // mặt đất

            BlockType groundBlock = GetBlockType(x, y - 1, z);
            if (groundBlock == BlockType.Trunk || groundBlock == BlockType.Leaves)
            {
                continue; // bỏ qua nếu trên cây
            }

            Vector3 spawnPos = new Vector3(x, y + 1, z);
            return; // spawn thành công, thoát
        }

        Debug.LogWarning("Không tìm được vị trí spawn phù hợp (tránh cây).");
    }

    private void LateUpdate()
    {
        //LoadChunks();
        float MinX = wallCollider.center.x - wallCollider.size.x / 2 + wallThickness;
        float MaxX = wallCollider.center.x + wallCollider.size.x / 2 - wallThickness;
        float MinZ = wallCollider.center.z - wallCollider.size.z / 2 + wallThickness;
        float MaxZ = wallCollider.center.z + wallCollider.size.z / 2 - wallThickness;
        player.transform.position = new Vector3(Mathf.Clamp(player.transform.position.x, MinX, MaxX),
            player.transform.position.y,
            Mathf.Clamp(player.transform.position.z, MinZ, MaxZ));
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
        float width = maxX - minX + TerrainChunk.chunkWidth;
        float length = maxZ - minZ + TerrainChunk.chunkWidth;
        float centerX = minX + width / 2;
        float centerZ = minZ + length / 2;

        // Cập nhật collider
        wallCollider.center = new Vector3(centerX, wallHeight / 2, centerZ);
        wallCollider.size = new Vector3(width + wallThickness, wallHeight, length + wallThickness);
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

        for (int x = 0; x < TerrainChunk.chunkWidth + 2; x++)
        for (int z = 0; z < TerrainChunk.chunkWidth + 2; z++)
        for (int y = 0; y < TerrainChunk.chunkHeight; y++)
        {
            chunk.blocks[x, y, z] = GetBlockType(xPos + x - 1, y, zPos + z - 1);
        }


        GenerateTrees(chunk.blocks, xPos, zPos);

        chunk.BuildMesh();

        WaterChunk waterChunk = chunk.GetComponentInChildren<WaterChunk>();
        waterChunk.SetLocs(chunk.blocks);
        waterChunk.BuildMesh();
        chunks.Add(new ChunkPos(xPos, zPos), chunk);
    }


    [Header("Island Collider")] [SerializeField]
    private bool enableIslandTrigger = true; // Bật/tắt collider

    private GameObject islandTriggerObject; // GameObject chứa collider
    private BoxCollider islandTriggerCollider; // Collider trigger
    private Vector2Int island2Center; // Lưu vị trí đảo 2 để dùng cho collider

    private float islandRadius =>LunaManager.ins.isLandRadius; // Bán kính đảo, nên đồng bộ với trong GetBlockType
    public System.Action OnPlayerEnterIsland2; // Event khi player vào đảo 2

    BlockType GetBlockType(int x, int y, int z)
    {
        // --- Cấu hình vị trí hai hòn đảo ---
        // Vị trí trung tâm của hòn đảo 1 (gần vị trí người chơi bắt đầu)
        Vector2Int island1Center = new Vector2Int(Mathf.RoundToInt(player.position.x), Mathf.RoundToInt(player.position.z)); // Vị trí trung tâm của hòn đảo 1

        // Vị trí trung tâm của hòn đảo 2, cách hòn đảo 1 khoảng 10 ô (theo trục X)
        island2Center = new Vector2Int(island1Center.x + LunaManager.ins.rangeBetweenIsland, island1Center.y);
        // Nếu muốn cách theo trục Z: new Vector2Int(island1Center.x, island1Center.y + 10);

        // --- Kiểm tra xem điểm (x, z) có nằm trong vùng tạo đảo không ---
        float distanceToIsland1 = Vector2.Distance(new Vector2(x, z), island1Center);
        float distanceToIsland2 = Vector2.Distance(new Vector2(x, z), island2Center);

        // Nếu không nằm trong bất kỳ hòn đảo nào, trả về Air
        if (distanceToIsland1 > islandRadius && distanceToIsland2 > islandRadius)
        {
            return BlockType.Air;
        }

        // --- Logic tạo terrain bên trong vùng đảo (giữ nguyên) ---
        float simplex1 = noise.GetSimplex(x * landNoiseScale, z * landNoiseScale) * noiseIntensity;
        float simplex2 = noise.GetSimplex(x * 3f, z * 3f) * noiseIntensity *
                         (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float heightMap = simplex1 + simplex2;
        float baseLandHeight = TerrainChunk.chunkHeight * 0.5f + heightMap;

        float caveNoise1 = noise.GetPerlinFractal(x * caveNoiseScale, y * caveNoiseScale * 2, z * caveNoiseScale);
        float caveMask = noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.3f;

        float stoneNoise1 = noise.GetSimplex(x * stoneNoiseScale, z * stoneNoiseScale) * noiseIntensity;
        float stoneNoise2 = (noise.GetSimplex(x * 5f, z * 5f) + 0.5f) * 20 *
                            (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float stoneHeightMap = stoneNoise1 + stoneNoise2;
        float baseStoneHeight = TerrainChunk.chunkHeight * 0.25f + stoneHeightMap;

        BlockType blockType = BlockType.Air;

        if (distanceToIsland1 <= islandRadius || distanceToIsland2 <= islandRadius)
        {
            if (y <= baseLandHeight)
            {
                blockType = BlockType.Dirt;
                if (y > baseLandHeight - 1 && y > WaterChunk.waterHeight - 2)
                    blockType = BlockType.Grass;
                if (y <= baseStoneHeight)
                    blockType = BlockType.Stone;
            }

            if (caveNoise1 > Mathf.Max(caveMask, 0.2f))
                blockType = BlockType.Air;
        }

        return blockType;
    }

    // --- Hàm tạo Island Trigger Collider ---
    public void CreateIslandTriggerCollider()
    {
        if (!enableIslandTrigger) return;

        // Hủy collider cũ nếu có
        if (islandTriggerObject != null)
        {
            Destroy(islandTriggerObject);
        }

        // Tạo GameObject mới cho collider
        islandTriggerObject = new GameObject("Island2Trigger");
        islandTriggerObject.transform.SetParent(this.transform); // Đặt làm con của TerrainGenerator
        islandTriggerCollider = islandTriggerObject.AddComponent<BoxCollider>();

        // Cấu hình BoxCollider
        islandTriggerCollider.isTrigger = true; // Đặt là trigger để detect va chạm mà không block
        // Đặt vị trí ở tâm đảo 2
        islandTriggerCollider.center = new Vector3(island2Center.x, TerrainChunk.chunkHeight / 2f, island2Center.y);
        
        islandTriggerCollider.size = new Vector3(islandRadius * 2-4, TerrainChunk.chunkHeight, islandRadius * 2 -4);
        
        if (islandTriggerObject.GetComponent<IslandTriggerDetector>() == null)
        {
            IslandTriggerDetector detector = islandTriggerObject.AddComponent<IslandTriggerDetector>();
            detector.particleSystem= particleSystem; // Gán hệ thống hạt
            detector.terrainGenerator = this; // Gán tham chiếu
        }

        Debug.Log(
            $"Island 2 Trigger Collider created at {islandTriggerCollider.center} with size {islandTriggerCollider.size}");
    }


    // --- Ví dụ về hành động khi player vào đảo 2 ---
    public void PlayerEnteredIsland2()
    {
        LunaManager.ins.ShowEndCard();
    }

    ChunkPos curChunk = new ChunkPos(-1, -1);

    void LoadChunks(bool instant = false)
    {
        //the current chunk the player is in
        int curChunkPosX = Mathf.FloorToInt(player.position.x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        int curChunkPosZ = Mathf.FloorToInt(player.position.z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;

        //entered a new chunk
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

            //remove chunks that are too far away
            List<ChunkPos> toDestroy = new List<ChunkPos>();
            //unload chunks
            foreach (KeyValuePair<ChunkPos, TerrainChunk> c in chunks)
            {
                ChunkPos cp = c.Key;
                if (Mathf.Abs(curChunkPosX - cp.x) > TerrainChunk.chunkWidth * (chunkDist + 3) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > TerrainChunk.chunkWidth * (chunkDist + 3))
                {
                    toDestroy.Add(c.Key);
                }
            }

            //remove any up for generation
            foreach (ChunkPos cp in toGenerate)
            {
                if (Mathf.Abs(curChunkPosX - cp.x) > TerrainChunk.chunkWidth * (chunkDist + 1) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > TerrainChunk.chunkWidth * (chunkDist + 1))
                    toGenerate.Remove(cp);
            }

            foreach (ChunkPos cp in toDestroy)
            {
                chunks[cp].gameObject.SetActive(false);
                pooledChunks.Add(chunks[cp]);
                chunks.Remove(cp);
            }

            StartCoroutine(DelayBuildChunks());
        }


        Invoke(nameof(SpawnObjectNearPlayerAvoidTrees), 2f);
        //SpawnObjectNearPlayerAvoidTrees();
    }


    void GenerateTrees(BlockType[,,] blocks, int x, int z)
    {
        System.Random rand = new System.Random(x * 10000 + z);

        /*float treeNoise = noise.GetSimplex(x * treeNoiseScale, z * treeNoiseScale);
        if (treeNoise <= 0) return;*/

        //int treeCount = Mathf.FloorToInt(rand.Next(1, 5) * treeNoise);
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

            /*int xPos = rand.Next(1, TerrainChunk.chunkWidth - 1);
            int zPos = rand.Next(1, TerrainChunk.chunkWidth - 1);*/

            // Tìm mặt đất
            int y = TerrainChunk.chunkHeight - 2;
            while (y > 0 && blocks[xPos, y, zPos] == BlockType.Air)
                y--;

            y++; // bắt đầu từ block trống trên mặt đất

            // Trồng thân cây
            int treeHeight = 4 + rand.Next(6); // 4–6 block cao
            for (int j = 0; j < treeHeight; j++)
            {
                if (InBounds(xPos, y + j, zPos))
                    blocks[xPos, y + j, zPos] = BlockType.Trunk;
            }

            // Trồng lá – theo tầng
            int leavesStart = y + treeHeight - 2;
            for (int layer = 0; layer < 3; layer++)
            {
                int radius = 2 - layer;
                int layerY = leavesStart + layer;

                for (int lx = -radius; lx <= radius; lx++)
                for (int lz = -radius; lz <= radius; lz++)
                {
                    int leafX = xPos + lx;
                    int leafZ = zPos + lz;

                    if ((Mathf.Abs(lx) + Mathf.Abs(lz)) <= radius + 1) // làm tròn tán
                    {
                        if (InBounds(leafX, layerY, leafZ) && blocks[leafX, layerY, leafZ] == BlockType.Air)
                            blocks[leafX, layerY, leafZ] = BlockType.Leaves;
                    }
                }
            }

            // Lá đỉnh
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

            yield return new WaitForSeconds(.2f);
        }
    }
}
