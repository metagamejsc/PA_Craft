using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TerrainGenerator : MonoBehaviour
{
    public static TerrainGenerator ins;
    private void Awake()
    {
        ins = this;
    }
    public GameObject terrainChunk;

    public Transform player;
    public GameObject objectToSpawn;

    public static Dictionary<ChunkPos, TerrainChunk> chunks = new Dictionary<ChunkPos, TerrainChunk>();
    [Header("Wall Collider Settings")]
    public float wallHeight = 100f;       // Chiều cao của tường bao
     // Độ dày của tường
    public BoxCollider wallCollider;
    
    [Header("Noise Settings")]
    public int chunkDist = 1;
    public float landNoiseScale = 0.8f;
    public float caveNoiseScale = 5.0f;
    public float stoneNoiseScale = 1.0f;
    public float treeNoiseScale = 0.8f;
    public float noiseIntensity = 10;
    
    FastNoise noise = new FastNoise();



    List<TerrainChunk> pooledChunks = new List<TerrainChunk>();

    List<ChunkPos> toGenerate = new List<ChunkPos>();

    [Header("Room Settings")]
    public int roomInnerWidth = 8;     // Chiều rộng bên trong phòng (trục X)
    public int roomInnerHeight = 4;     // Chiều cao bên trong phòng (trục Y)
    public int roomInnerLength = 8;    // Chiều dài bên trong phòng (trục Z)
    public BlockType roomWallBlockType = BlockType.Stone; // Loại khối dùng cho tường
    public BlockType roomFloorBlockType = BlockType.Dirt; // Loại khối dùng cho sàn
    public BlockType roomCeilingBlockType = BlockType.Stone; // Loại khối dùng cho trần (trừ ô sáng)
    public int wallThickness =>LunaManager.ins.wallThickness ; // Độ dày tường (từ 1 trở lên)
    public float lightHoleChance = 0.2f;
    
    void Start()
    {
        landNoiseScale = LunaManager.ins.landNoiseScale;
        noiseIntensity = LunaManager.ins.noiseIntensity;
        LoadChunks(true);
        //wallCollider = GetComponent<BoxCollider>();
        Invoke(nameof(UpdateWallCollider),1f);
        //StartCoroutine(IeSpawnZombie());
        //Invoke(nameof(GenHouse),0.1f);
        Invoke(nameof(CreateRoomAroundPlayer), 0.1f); 
    }
public void CreateRoomAroundPlayer()
    {
        if (player == null) return;

        Vector3 playerPos = player.position;
        int playerX = Mathf.RoundToInt(playerPos.x);
        int playerY = Mathf.RoundToInt(playerPos.y);
        int playerZ = Mathf.RoundToInt(playerPos.z);

        // Tính toán giới hạn của phòng bên trong (Inner Room Bounds)
        int innerMinX = playerX - roomInnerWidth / 2;
        int innerMaxX = playerX + roomInnerWidth / 2;
        int innerMinY = playerY-2; // Đặt sàn phòng tại chân người chơi
        int innerMaxY = playerY + roomInnerHeight;
        int innerMinZ = playerZ - roomInnerLength / 2;
        int innerMaxZ = playerZ + roomInnerLength / 2;

        // Tính toán giới hạn của tường bên ngoài (Outer Wall Bounds)
        int outerMinX = innerMinX - wallThickness;
        int outerMaxX = innerMaxX + wallThickness;
        int outerMinZ = innerMinZ - wallThickness;
        int outerMaxZ = innerMaxZ + wallThickness;
        // Trần và sàn mở rộng thêm độ dày tường
        int floorMinY = innerMinY - wallThickness;
        int ceilingMaxY = innerMaxY + wallThickness;

        // Danh sách để lưu các chunk cần cập nhật mesh
        HashSet<ChunkPos> chunksToUpdate = new HashSet<ChunkPos>();
        System.Random rand = new System.Random(playerX * 1000 + playerZ); // Dùng seed cố định theo vị trí player để tạo ngẫu nhiên nhất quán

        // Vòng lặp qua tất cả các tọa độ trong khối lập phương bao quanh tường ngoài
        for (int x = outerMinX; x <= outerMaxX; x++)
        {
            for (int y = floorMinY; y <= ceilingMaxY; y++)
            {
                for (int z = outerMinZ; z <= outerMaxZ; z++)
                {
                    BlockType blockToSet = BlockType.Air; // Mặc định là không khí
                    bool shouldSetBlock = false; // Chỉ đặt block nếu cần thiết

                    // 1. Tạo sàn (bao gồm cả phần mở rộng dưới chân người chơi)
                    if (y >= floorMinY && y < innerMinY)
                    {
                        // Kiểm tra nếu nằm trong phạm vi sàn mở rộng
                        if (x >= outerMinX && x <= outerMaxX && z >= outerMinZ && z <= outerMaxZ)
                        {
                            blockToSet = roomFloorBlockType;
                            shouldSetBlock = true;
                        }
                    }
                    // 2. Tạo tường (lớp ngoài và lớp trong)
                    else if ((x >= outerMinX && x < innerMinX) || (x > innerMaxX && x <= outerMaxX) || // Tường X
                             (z >= outerMinZ && z < innerMinZ) || (z > innerMaxZ && z <= outerMaxZ) || // Tường Z
                             (y >= innerMinY && y <= innerMaxY && (x == outerMinX || x == outerMaxX || z == outerMinZ || z == outerMaxZ))) // Tường Y (cạnh trên/dưới của tường dọc)
                    {
                         blockToSet = roomWallBlockType;
                         shouldSetBlock = true;
                    }
                    // 3. Tạo trần (bao gồm cả phần mở rộng phía trên)
                    else if (y > innerMaxY && y <= ceilingMaxY)
                    {
                        // Kiểm tra nếu nằm trong phạm vi trần mở rộng
                        if (x >= outerMinX && x <= outerMaxX && z >= outerMinZ && z <= outerMaxZ)
                        {
                            // Quyết định có tạo ô sáng không
                            if (rand.NextDouble() < lightHoleChance)
                            {
                                // Ô sáng - để trống (BlockType.Air) hoặc block đặc biệt
                                blockToSet = BlockType.Air; // Hoặc BlockType.Glass nếu bạn muốn block trong suốt
                                // Nếu bạn muốn block đặc biệt cho ô sáng:
                                // blockToSet = BlockType.Glass;
                            }
                            else
                            {
                                // Trần bình thường
                                blockToSet = roomCeilingBlockType;
                            }
                            shouldSetBlock = true;
                        }
                    }

                    // Nếu cần đặt block
                    if (shouldSetBlock)
                    {
                        // --- Tương tự như trước: tìm chunk và đặt block ---
                        // Lấy chunk chứa tọa độ (x, y, z)
                        int chunkX = Mathf.FloorToInt((float)x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                        int chunkZ = Mathf.FloorToInt((float)z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                        ChunkPos chunkPos = new ChunkPos(chunkX, chunkZ);

                        // Kiểm tra xem chunk đã được tạo chưa
                        if (chunks.ContainsKey(chunkPos))
                        {
                            TerrainChunk chunk = chunks[chunkPos];

                            // Chuyển tọa độ thế giới sang tọa độ cục bộ của chunk (bao gồm padding)
                            int localX = x - chunkX + 1; // +1 do padding
                            int localZ = z - chunkZ + 1; // +1 do padding
                            int localY = y;

                            // Kiểm tra giới hạn cục bộ (bao gồm padding)
                            if (localX >= 0 && localX < TerrainChunk.chunkWidth + 2 &&
                                localY >= 0 && localY < TerrainChunk.chunkHeight &&
                                localZ >= 0 && localZ < TerrainChunk.chunkWidth + 2)
                            {
                                // Đặt loại block
                                chunk.blocks[localX, localY, localZ] = blockToSet;
                                // Ghi nhớ chunk cần cập nhật mesh
                                chunksToUpdate.Add(chunkPos);
                            }
                        }
                        // --- Kết thúc phần tìm chunk và đặt block ---
                    }
                }
            }
        }

        // Cập nhật mesh cho các chunk bị ảnh hưởng
        foreach (ChunkPos pos in chunksToUpdate)
        {
            if (chunks.ContainsKey(pos))
            {
                chunks[pos].BuildMesh();
                // Nếu có nước trong chunk, cũng cập nhật nước
                WaterChunk waterChunk = chunks[pos].GetComponentInChildren<WaterChunk>();
                if(waterChunk != null)
                {
                    waterChunk.SetLocs(chunks[pos].blocks); // Cập nhật lại trạng thái nước nếu cần
                    waterChunk.BuildMesh();
                }
            }
        }

         // Di chuyển người chơi vào giữa phòng (tùy chọn, đảm bảo không bị kẹt trong block)
         player.position = new Vector3(playerX, innerMinY + 1, playerZ); // +1 để người chơi đứng trên sàn
    }

    /*public void GenHouse()
    {
        Vector3Int posHouse = new Vector3Int((int)player.position.x,(int)player.position.y,(int)player.position.z)+new Vector3Int(24,0,24);
        //HouseGenerator.GenerateHouse(chunks,posHouse.x,posHouse.y,posHouse.z);
        HouseGenerator.GenerateLargeHouse(chunks,24,31,24);
        foreach (var VARIABLE in chunks)
        {
            VARIABLE.Value.BuildMesh();
        }
    }*/
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

            Vector3 spawnPos = new Vector3(x, y+1, z);
            /*var a=Instantiate(objectToSpawn, spawnPos, Quaternion.identity);
            a.transform.position = spawnPos;*/
            //objectToSpawn.transform.position = spawnPos;
            //Camera.main.transform.localRotation=Quaternion.LookRotation(objectToSpawn.transform.position-Camera.main.transform.position,Vector3.up);
            //Debug.Log($"Spawned object at: {objectToSpawn.transform.position}");
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
                int x = Mathf.RoundToInt(playerPos.x + Random.Range(-8, 8));
                int z = Mathf.RoundToInt(playerPos.z + Random.Range(-8, 8));

                int y = TerrainChunk.chunkHeight - 2;
                while (y > 0 && GetBlockType(x, y, z) == BlockType.Air)
                    y--;

                y++;

                BlockType groundBlock = GetBlockType(x, y - 1, z);
                if (groundBlock == BlockType.Trunk || groundBlock == BlockType.Leaves)
                {
                    continue; // bỏ qua nếu trên cây
                }

                Vector3 spawnPos = new Vector3(x, y+1, z);
                var a=Instantiate(objectToSpawn, spawnPos, Quaternion.identity);
            }
        }
    }
    private void LateUpdate()
    {
        //LoadChunks();
        float MinX = wallCollider.center.x - wallCollider.size.x/2 + wallThickness;
        float MaxX = wallCollider.center.x + wallCollider.size.x/2 - wallThickness;
        float MinZ = wallCollider.center.z - wallCollider.size.z/2 + wallThickness;
        float MaxZ = wallCollider.center.z + wallCollider.size.z/2 - wallThickness;
                   player.transform.position=new Vector3(Mathf.Clamp(player.transform.position.x,MinX,MaxX),player.transform.position.y,
                       Mathf.Clamp(player.transform.position.z,MinZ,MaxZ));
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


    //get the block type at a specific coordinate
    BlockType GetBlockType(int x, int y, int z)
    {
        // Noise calculations for land height
        float simplex1 = noise.GetSimplex(x * landNoiseScale, z * landNoiseScale) * noiseIntensity;
        float simplex2 = noise.GetSimplex(x * 3f, z * 3f) * noiseIntensity * (noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.5f);
        float heightMap = simplex1 + simplex2;

        float baseLandHeight = TerrainChunk.chunkHeight * 0.5f + heightMap;

        // Noise for caves
        float caveNoise1 = noise.GetPerlinFractal(x * caveNoiseScale, y * caveNoiseScale * 2, z * caveNoiseScale);
        float caveMask = noise.GetSimplex(x * 0.3f, z * 0.3f) + 0.3f;

        // Noise for stone layers
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

        if (caveNoise1 > Mathf.Max(caveMask, 0.2f))
            blockType = BlockType.Air;

        return blockType;
    }


    ChunkPos curChunk = new ChunkPos(-1,-1);
    void LoadChunks(bool instant = false)
    {
        //the current chunk the player is in
        int curChunkPosX = Mathf.FloorToInt(player.position.x/TerrainChunk.chunkWidth)*TerrainChunk.chunkWidth;
        int curChunkPosZ = Mathf.FloorToInt(player.position.z/TerrainChunk.chunkWidth)*TerrainChunk.chunkWidth;

        //entered a new chunk
        if(curChunk.x != curChunkPosX || curChunk.z != curChunkPosZ)
        {
            curChunk.x = curChunkPosX;
            curChunk.z = curChunkPosZ;


            for(int i = curChunkPosX - TerrainChunk.chunkWidth * chunkDist; i <= curChunkPosX + TerrainChunk.chunkWidth * chunkDist; i += TerrainChunk.chunkWidth)
                for(int j = curChunkPosZ - TerrainChunk.chunkWidth * chunkDist; j <= curChunkPosZ + TerrainChunk.chunkWidth * chunkDist; j += TerrainChunk.chunkWidth)
                {
                    ChunkPos cp = new ChunkPos(i, j);

                    if(!chunks.ContainsKey(cp) && !toGenerate.Contains(cp))
                    {
                        if(instant)
                            BuildChunk(i, j);
                        else
                            toGenerate.Add(cp);
                    }
                     

                }

            //remove chunks that are too far away
            List<ChunkPos> toDestroy = new List<ChunkPos>();
            //unload chunks
            foreach(KeyValuePair<ChunkPos, TerrainChunk> c in chunks)
            {
                ChunkPos cp = c.Key;
                if(Mathf.Abs(curChunkPosX - cp.x) > TerrainChunk.chunkWidth * (chunkDist + 3) || 
                    Mathf.Abs(curChunkPosZ - cp.z) > TerrainChunk.chunkWidth * (chunkDist + 3))
                {
                    toDestroy.Add(c.Key);
                }
            }

            //remove any up for generation
            foreach(ChunkPos cp in toGenerate)
            {
                if(Mathf.Abs(curChunkPosX - cp.x) > TerrainChunk.chunkWidth * (chunkDist + 1) ||
                    Mathf.Abs(curChunkPosZ - cp.z) > TerrainChunk.chunkWidth * (chunkDist + 1))
                    toGenerate.Remove(cp);
            }

            foreach(ChunkPos cp in toDestroy)
            {
                chunks[cp].gameObject.SetActive(false);
                pooledChunks.Add(chunks[cp]);
                chunks.Remove(cp);
            }

            StartCoroutine(DelayBuildChunks());
        }


        Invoke(nameof(SpawnObjectNearPlayerAvoidTrees),2f);
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
                if (Vector2Int.Distance(used, pos) <4f)
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
        while(toGenerate.Count > 0)
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