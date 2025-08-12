using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TerrainGenerator : MonoBehaviour
{
    public GameObject terrainChunk;

    public Transform player;
    public GameObject objectToSpawn;

    public static Dictionary<ChunkPos, TerrainChunk> chunks = new Dictionary<ChunkPos, TerrainChunk>();

    [Header("Wall Collider Settings")]
    public float wallHeight = 100f;       // Chiều cao của tường bao
    public float wallThickness = 2f;      // Độ dày của tường
    public BoxCollider wallCollider;

    [Header("Noise Settings")]
    public int chunkDist = 1;
    public float landNoiseScale = 0.8f;
    public float caveNoiseScale = 5.0f;
    public float stoneNoiseScale = 1.0f;
    public float treeNoiseScale = 0.8f;
    public float noiseIntensity = 10;

    [Header("Flat Area Settings")]
    public bool  flattenAroundPlayer = true;  // Bật/tắt làm phẳng quanh player
    public float flatRadius = 12f;            // Bán kính vùng phẳng (world units)
    public float flatBlend = 6f;              // Độ rộng vành hòa trộn
    public int   flatHeightOffset = 0;        // Offset cao/thấp cho mặt phẳng
    public bool  noCavesInFlat = true;        // Tắt hang trong vùng phẳng
    public bool  noTreesInFlat = true;        // Không trồng cây trong vùng phẳng

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
        Invoke(nameof(SpawnGroupEnemy), 1);
    }

    public void SpawnGroupEnemy()
    {
        for (int i = 0; i < 1; i++)
        {
            Vector3 playerPos = player.position;

            int x = Mathf.RoundToInt(player.forward.x * 10 + playerPos.x);
            int z = Mathf.RoundToInt(player.forward.z * 10 + playerPos.z);

            int y = TerrainChunk.chunkHeight - 2;
            while (y > 0 && GetBlockType(x, y, z) == BlockType.Air)
                y--;

            y++;

            BlockType groundBlock = GetBlockType(x, y - 1, z);
            if (groundBlock == BlockType.Trunk || groundBlock == BlockType.Leaves)
            {
                continue; // bỏ qua nếu trên cây
            }

            Vector3 spawnPos = new Vector3(x, y + 1, z);
            var a = Instantiate(objectToSpawn, spawnPos, Quaternion.identity);
        }
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

    public IEnumerator IeSpawnZombie()
    {
        while (true)
        {
            yield return new WaitForSeconds(0.5f);
            while (!GameController.ins.isPauseGame && !LunaManager.ins.isCretivePause)
            {
                yield return new WaitForSeconds(2f);
                Vector3 playerPos = player.position;

                int x = Mathf.RoundToInt(player.forward.x * Random.Range(8, 15) + playerPos.x);
                int z = Mathf.RoundToInt(player.forward.z * Random.Range(8, 15) + playerPos.z);
                int y = TerrainChunk.chunkHeight - 2;
                while (y > 0 && GetBlockType(x, y, z) == BlockType.Air)
                    y--;

                y++;

                BlockType groundBlock = GetBlockType(x, y - 1, z);
                if (groundBlock == BlockType.Trunk || groundBlock == BlockType.Leaves)
                {
                    continue; // bỏ qua nếu trên cây
                }

                Vector3 spawnPos = new Vector3(x, y + 1, z);
                var a = Instantiate(objectToSpawn, spawnPos, Quaternion.identity);
            }
        }
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

    //get the block type at a specific coordinate
    BlockType GetBlockType(int x, int y, int z)
    {
        // --- Land height (noise cơ sở)
        float simplex1 = noise.GetSimplex(x * landNoiseScale, z * landNoiseScale) * noiseIntensity;
        float simplex2 = noise.GetSimplex(x * 3f, z * 3f) * noiseIntensity * (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float heightMap = simplex1 + simplex2;
        float baseLandHeight = TerrainChunk.chunkHeight * 0.5f + heightMap;

        // --- Caves
        float caveNoise1 = noise.GetPerlinFractal(x * caveNoiseScale, y * caveNoiseScale * 2, z * caveNoiseScale);
        float caveMask = noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.3f;

        // --- Stone
        float stoneNoise1 = noise.GetSimplex(x * stoneNoiseScale, z * stoneNoiseScale) * noiseIntensity;
        float stoneNoise2 = (noise.GetSimplex(x * 5f, z * 5f) + 0.5f) * 20 * (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float stoneHeightMap = stoneNoise1 + stoneNoise2;
        float baseStoneHeight = TerrainChunk.chunkHeight * 0.25f + stoneHeightMap;

        // === FLAT AREA BLEND ===
        if (flattenAroundPlayer && player != null)
        {
            // Lấy chiều cao phẳng tham chiếu theo noise tại vị trí player (giữ cảm giác tự nhiên)
            float ps1 = noise.GetSimplex(player.position.x * landNoiseScale, player.position.z * landNoiseScale) * noiseIntensity;
            float ps2 = noise.GetSimplex(player.position.x * 3f, player.position.z * 3f) * noiseIntensity * (noise.GetSimplex(player.position.x * 0.3f, player.position.z * 0.3f) + 0.5f);
            float playerBaseLand = TerrainChunk.chunkHeight * 0.5f + (ps1 + ps2);
            float flatHeight = Mathf.Round(playerBaseLand) + flatHeightOffset;

            // Khoảng cách XZ đến player
            float d = Vector2.Distance(new Vector2(x, z), new Vector2(player.position.x, player.position.z));

            // t: 0 trong vùng phẳng, 1 ngoài dải blend
            float t = Mathf.InverseLerp(flatRadius, flatRadius + Mathf.Max(0.001f, flatBlend), d);
            // smoothstep để mép mượt
            t = t * t * (3f - 2f * t);

            // Trộn chiều cao
            baseLandHeight = Mathf.Lerp(flatHeight, baseLandHeight, t);

            // Tùy chọn: tắt hang trong vùng phẳng
            if (noCavesInFlat && d <= flatRadius + 0.5f)
            {
                caveNoise1 = -1f; // ép không tạo Air bởi hang
            }
        }

        BlockType blockType = BlockType.Air;

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

        return blockType;
    }

    ChunkPos curChunk = new ChunkPos(-1, -1);
    void LoadChunks(bool instant = false)
    {
        //the current chunk the player is in
        int curChunkPosX = Mathf.FloorToInt(player.position.x / 16) * 16;
        int curChunkPosZ = Mathf.FloorToInt(player.position.z / 16) * 16;

        //entered a new chunk
        if (curChunk.x != curChunkPosX || curChunk.z != curChunkPosZ)
        {
            curChunk.x = curChunkPosX;
            curChunk.z = curChunkPosZ;

            for (int i = curChunkPosX - 16 * chunkDist; i <= curChunkPosX + 16 * chunkDist; i += 16)
                for (int j = curChunkPosZ - 16 * chunkDist; j <= curChunkPosZ + 16 * chunkDist; j += 16)
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
                if (Mathf.Abs(curChunkPosX - cp.x) > 16 * (chunkDist + 3) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > 16 * (chunkDist + 3))
                {
                    toDestroy.Add(c.Key);
                }
            }

            //remove any up for generation
            foreach (ChunkPos cp in toGenerate)
            {
                if (Mathf.Abs(curChunkPosX - cp.x) > 16 * (chunkDist + 1) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > 16 * (chunkDist + 1))
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
    }

    void GenerateTrees(BlockType[,,] blocks, int x, int z)
    {
        System.Random rand = new System.Random(x * Random.Range(1000, 10000) + z + Random.Range(-100, 100));

        float treeNoise = noise.GetSimplex(x * treeNoiseScale, z * treeNoiseScale);
        if (treeNoise <= 0) return;

        int treeCount = LunaManager.ins.treeCount;
        HashSet<Vector2Int> usedPositions = new HashSet<Vector2Int>();

        for (int i = 0; i < treeCount; i++)
        {
            int xPos = rand.Next(4, TerrainChunk.chunkWidth - 2);
            int zPos = rand.Next(4, TerrainChunk.chunkWidth - 2);

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

            // Không trồng cây trong vùng phẳng quanh player
            if (noTreesInFlat && flattenAroundPlayer && player != null)
            {
                float worldX = x + xPos;
                float worldZ = z + zPos;
                float d = Vector2.Distance(new Vector2(worldX, worldZ), new Vector2(player.position.x, player.position.z));
                if (d <= flatRadius) continue;
            }

            usedPositions.Add(pos);

            // Tìm mặt đất
            int y = TerrainChunk.chunkHeight - 2;
            while (y > 0 && blocks[xPos, y, zPos] == BlockType.Air)
                y--;

            y++; // bắt đầu từ block trống trên mặt đất

            // Trồng thân cây
            int treeHeight = 5 + rand.Next(8); // 5–12 block cao
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

public struct ChunkPos
{
    public int x, z;
    public ChunkPos(int x, int z)
    {
        this.x = x;
        this.z = z;
    }
}
