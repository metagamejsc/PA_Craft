using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class TerrainGenerator : MonoBehaviour
{
    public static TerrainGenerator ins;

    private void Awake()
    {
        ins = this;
    }

    public GameObject terrainChunk;
    public int witdth => LunaManager.ins.chunkWidth;
    public Transform player;
    public GameObject objectToSpawn;
    public static Dictionary<ChunkPos, TerrainChunk> chunks = new Dictionary<ChunkPos, TerrainChunk>();

    [Header("Wall Collider Settings")]
    public float wallHeight = 100f; // Chiều cao của tường bao
    public float wallThickness = 2f; // Độ dày của tường
    public BoxCollider wallCollider;

    [Header("Noise Settings")]
    public int chunkDist = 1;
    public float landNoiseScale = 0.8f;
    public float caveNoiseScale = 5.0f;
    public float stoneNoiseScale = 1.0f;
    public float ironNoiseScale = 1.0f;
    public float treeNoiseScale = 0.8f;
    public float noiseIntensity = 10;

    FastNoise noise = new FastNoise();
    List<TerrainChunk> pooledChunks = new List<TerrainChunk>();
    List<ChunkPos> toGenerate = new List<ChunkPos>();

    // Start is called before the first frame update
    void Start()
    {
        landNoiseScale = LunaManager.ins.landNoiseScale;
        noiseIntensity = LunaManager.ins.noiseIntensity;
        LoadChunks(true);
        Invoke(nameof(UpdateWallCollider), 1f);
        Invoke(nameof(CreateSinkholeAtPlayer), 0.5f);
    }
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.H))
        {
            GetComponent<TerrainGenerator>().CreateSinkholeAtPlayer();
        }
    }
    public void SpawnObjectNearPlayerAvoidTrees()
    {
        for (int attempt = 0; attempt < 20; attempt++)
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
                continue;
            }
            Vector3 spawnPos = new Vector3(x, y + 1, z);
            return;
        }
        Debug.LogWarning("Không tìm được vị trí spawn phù hợp (tránh cây).");
    }

    public void ShowTargerPlaceBlock()
    {
       
    }

    private void LateUpdate()
    {
        float MinX = wallCollider.center.x - wallCollider.size.x / 2 + wallThickness;
        float MaxX = wallCollider.center.x + wallCollider.size.x / 2 - wallThickness;
        float MinZ = wallCollider.center.z - wallCollider.size.z / 2 + wallThickness;
        float MaxZ = wallCollider.center.z + wallCollider.size.z / 2 - wallThickness;
        player.transform.position = new Vector3(
            Mathf.Clamp(player.transform.position.x, MinX, MaxX),
            player.transform.position.y,
            Mathf.Clamp(player.transform.position.z, MinZ, MaxZ)
        );
    }

    [ContextMenu("Build Mesh")]
    public void BuildMesh()
    {
        for (int i = 0; i < pooledChunks.Count; i++)
        {
            pooledChunks[i].BuildMesh();
        }
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

        float width = maxX - minX + witdth;
        float length = maxZ - minZ + witdth;
        float centerX = minX + width / 2;
        float centerZ = minZ + length / 2;

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

        int groundY = FindGroundY(chunk.blocks, 5, 5);
        GenerateTrees(chunk.blocks, xPos, zPos);
        chunk.BuildMesh();

        WaterChunk waterChunk = chunk.GetComponentInChildren<WaterChunk>();
        waterChunk.SetLocs(chunk.blocks);
        waterChunk.BuildMesh();

        chunks.Add(new ChunkPos(xPos, zPos), chunk);

        player.transform.position = new Vector3(
            xPos + TerrainChunk.chunkWidth / 2f,
            player.transform.position.y,
            zPos + TerrainChunk.chunkWidth / 2f
        );
    }

    private static int FindGroundY(BlockType[,,] blocks, int x, int z)
    {
        for (int y = TerrainChunk.chunkHeight - 1; y >= 0; y--)
        {
            if (blocks[x, y, z] != BlockType.Air)
                return y;
        }
        return 0;
    }

    public BlockType GetBlockType(int x, int y, int z)
    {
        float simplex1 = noise.GetSimplex(x * landNoiseScale, z * landNoiseScale) * noiseIntensity;
        float simplex2 = noise.GetSimplex(x * 3f, z * 3f) * noiseIntensity * (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float heightMap = simplex1 + simplex2;
        float baseLandHeight = TerrainChunk.chunkHeight * 0.5f + heightMap;

        float caveNoise1 = noise.GetPerlinFractal(x * caveNoiseScale, y * caveNoiseScale * 2, z * caveNoiseScale);
        float caveMask = noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.3f;

        float stoneNoise1 = noise.GetSimplex(x * stoneNoiseScale, z * stoneNoiseScale) * noiseIntensity;
        float stoneNoise2 = (noise.GetSimplex(x * 5f, z * 5f) + 0.5f) * 20 * (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float stoneHeightMap = stoneNoise1 + stoneNoise2;
        float baseStoneHeight = TerrainChunk.chunkHeight * 0.25f + stoneHeightMap;

        BlockType blockType = BlockType.Air;
        if (y <= baseLandHeight)
        {
            blockType = BlockType.Dirt;
            if (y > baseLandHeight - 1 && y > WaterChunk.waterHeight - 2)
                blockType = BlockType.Grass;
            if (y <= baseStoneHeight)
                blockType = BlockType.Stone;
        }

        if (blockType == BlockType.Grass || blockType == BlockType.Dirt)
        {
            float ironSurfaceNoise = noise.GetSimplex(x * ironNoiseScale, y * ironNoiseScale, z * ironNoiseScale);
            if (ironSurfaceNoise > 0.65f)
            {
                blockType = BlockType.Iron;
            }
        }

        if (caveNoise1 > Mathf.Max(caveMask, 0.2f))
            blockType = BlockType.Air;

        return blockType;
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

            for (int i = curChunkPosX - TerrainChunk.chunkWidth * chunkDist; i <= curChunkPosX + TerrainChunk.chunkWidth * chunkDist; i += TerrainChunk.chunkWidth)
            {
                for (int j = curChunkPosZ - TerrainChunk.chunkWidth * chunkDist; j <= curChunkPosZ + TerrainChunk.chunkWidth * chunkDist; j += TerrainChunk.chunkWidth)
                {
                    ChunkPos cp = new ChunkPos(i, j);
                    if (!chunks.ContainsKey(cp) && !toGenerate.Contains(cp))
                    {
                        if (instant)
                        {
                            BuildChunk(i, j);
                        }
                        else
                        {
                            toGenerate.Add(cp);
                        }
                    }
                }
            }

            List<ChunkPos> toDestroy = new List<ChunkPos>();
            foreach (KeyValuePair<ChunkPos, TerrainChunk> c in chunks)
            {
                ChunkPos cp = c.Key;
                if (Mathf.Abs(curChunkPosX - cp.x) > witdth * (chunkDist + 3) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > witdth * (chunkDist + 3))
                {
                    toDestroy.Add(c.Key);
                }
            }

            foreach (ChunkPos cp in toDestroy)
            {
                chunks[cp].gameObject.SetActive(false);
                pooledChunks.Add(chunks[cp]);
                chunks.Remove(cp);
            }

            StartCoroutine(DelayBuildChunks());
        }

        Invoke(nameof(ShowTargerPlaceBlock), 2f);
    }

    void GenerateTrees(BlockType[,,] blocks, int x, int z)
    {
        System.Random rand = new System.Random(x * 10000 + z);
        float treeNoise = noise.GetSimplex(Mathf.Abs(x) * treeNoiseScale, Mathf.Abs(z) * treeNoiseScale);
        if (treeNoise <= 0) return;

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

            int treeHeight = 4 + rand.Next(6);
            for (int j = 0; j < treeHeight; j++)
            {
                if (InBounds(xPos, y + j, zPos))
                    blocks[xPos, y + j, zPos] = BlockType.Trunk;
            }

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
                    if ((Mathf.Abs(lx) + Mathf.Abs(lz)) <= radius + 1)
                    {
                        if (InBounds(leafX, layerY, leafZ) && blocks[leafX, layerY, leafZ] == BlockType.Air)
                            blocks[leafX, layerY, leafZ] = BlockType.Leaves;
                    }
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
            yield return new WaitForSeconds(.2f);
        }
    }

    // ================== ✅ CẬP NHẬT MỚI: TẠO VÙNG SỤT LÚN ==================

    /// <summary>
    /// Tạo một vùng sụt lún hình tròn tại vị trí (centerX, centerZ)
    /// </summary>
    /// <param name="centerX">Tọa độ X toàn cục</param>
    /// <param name="centerZ">Tọa độ Z toàn cục</param>
    /// <param name="radius">Bán kính hố (mặc định 6)</param>
    /// <param name="maxDepth">Độ sâu tối đa (mặc định 5)</param>
    public void GenerateSinkhole(int centerX, int centerZ, int radius = 6, int maxDepth = 5)
{
    int chunkMinX = (centerX - radius) / TerrainChunk.chunkWidth * TerrainChunk.chunkWidth;
    int chunkMaxX = (centerX + radius) / TerrainChunk.chunkWidth * TerrainChunk.chunkWidth;
    int chunkMinZ = (centerZ - radius) / TerrainChunk.chunkWidth * TerrainChunk.chunkWidth;
    int chunkMaxZ = (centerZ + radius) / TerrainChunk.chunkWidth * TerrainChunk.chunkWidth;

    // Danh sách các vị trí hợp lệ để đặt TNT (những khối bị xóa, tức là không khí trong hố)
    List<Vector3Int> validPositions = new List<Vector3Int>();

    for (int cx = chunkMinX; cx <= chunkMaxX; cx += TerrainChunk.chunkWidth)
    {
        for (int cz = chunkMinZ; cz <= chunkMaxZ; cz += TerrainChunk.chunkWidth)
        {
            ChunkPos chunkPos = new ChunkPos(cx, cz);
            if (!chunks.ContainsKey(chunkPos)) continue;

            TerrainChunk chunk = chunks[chunkPos];

            for (int lx = 0; lx < TerrainChunk.chunkWidth; lx++)
            {
                for (int lz = 0; lz < TerrainChunk.chunkWidth; lz++)
                {
                    int worldX = cx + lx;
                    int worldZ = cz + lz;

                    float dist = Vector2.Distance(new Vector2(worldX, worldZ), new Vector2(centerX, centerZ));
                    if (dist <= radius)
                    {
                        float depthFactor = 1f - (dist / radius);
                        int depth = Mathf.RoundToInt(maxDepth * depthFactor * depthFactor);

                        int groundY = FindGroundYGlobal(worldX, worldZ);
                        if (groundY <= 0) continue;

                        int bottomY = groundY - depth + 1;

                        // Xóa các khối từ mặt đất xuống đáy hố
                        for (int y = groundY; y >= bottomY && y >= 0; y--)
                        {
                            if (InBounds(lx, y, lz))
                            {
                                chunk.blocks[lx, y, lz] = BlockType.Air;
                                // Ghi lại vị trí trống để có thể đặt TNT
                                validPositions.Add(new Vector3Int(worldX, y, worldZ));
                            }
                        }
                    }
                }
            }
            if (validPositions.Count > 0)
            {
                System.Random rand = new System.Random(System.DateTime.Now.Millisecond + centerX + centerZ * 1000);
                int tntCount = Mathf.Clamp(rand.Next(7, 10), 8, validPositions.Count); // 1-3 khối TNT

                for (int i = 0; i < tntCount; i++)
                {
                    int index = rand.Next(validPositions.Count);
                    Vector3Int pos = validPositions[index];
                    validPositions.RemoveAt(index); // Tránh trùng

                    // Dùng hàm có sẵn để đặt block toàn cục
                    HouseGenerator.SetBlockGlobal(chunks, pos.x, pos.y, pos.z, BlockType.TNT, useRandom: false);
                }

                Debug.Log($"🧨 Đã đặt {tntCount} khối TNT vào vùng sụt lún tại ({centerX}, {centerZ})");
            }

            Debug.Log($"✅ Tạo vùng sụt lún tại ({centerX}, {centerZ}), bán kính {radius}, sâu {maxDepth} khối.");
            // Cập nhật mesh
            chunk.BuildMesh();
            chunk.GetComponentInChildren<WaterChunk>()?.BuildMesh();
        }
    }

    // ✅ Đặt khối TNT vào các vị trí ngẫu nhiên trong hố
    
}
    public static void SetBlockGlobal(int x, int y, int z, BlockType type)
    {
        HouseGenerator.SetBlockGlobal(chunks, x, y, z, type, useRandom: false);
    }

    /// <summary>
    /// Tìm độ cao mặt đất tại tọa độ toàn cục
    /// </summary>
    public int FindGroundYGlobal(int worldX, int worldZ)
    {
        int chunkX = Mathf.FloorToInt(worldX / (float)TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        int chunkZ = Mathf.FloorToInt(worldZ / (float)TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        int localX = worldX - chunkX;
        int localZ = worldZ - chunkZ;

        ChunkPos chunkPos = new ChunkPos(chunkX, chunkZ);
        if (!chunks.ContainsKey(chunkPos)) return -1;

        BlockType[,,] blocks = chunks[chunkPos].blocks;
        for (int y = TerrainChunk.chunkHeight - 1; y >= 0; y--)
        {
            if (InBounds(localX, y, localZ) && blocks[localX, y, localZ] != BlockType.Air)
                return y;
        }
        return 0;
    }

    // ================== ✅ GỌI HÀM NÀY ĐỂ TẠO HỐ ==================
    public void CreateSinkholeAtPlayer()
    {
        Vector3 playerPos = player.position+player.forward*5;
        int centerX = Mathf.RoundToInt(playerPos.x);
        int centerZ = Mathf.RoundToInt(playerPos.z);
        GenerateSinkhole(centerX, centerZ, radius: 7, maxDepth: 6);
    }
    
}

public struct ChunkPos
{
    public int x, z;
    public ChunkPos(int x, int z)
    {
        this.x = x;
        this.z = z;
    }
}