using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class HouseGenerator : MonoBehaviour
{
    public static Vector3 posBlank = new Vector3(0, 0, 0);

    public static void GenerateHouse(Dictionary<ChunkPos, TerrainChunk> chunks, int startX, int startY, int startZ)
{
    int height = 4;
    int houseWidth = 7;
    int houseDepth = 7;

    // Đảm bảo các chunk liên quan đã tồn tại

    for (int x = 0; x < houseWidth; x++)
    {
        for (int z = 0; z < houseDepth; z++)
        {
            // SetBlockGlobal(chunks, startX + x, startY + 1, startZ + z, BlockType.PlankBrich, useRandom: false);
        }
    }

    for (int y = startY; y < startY + height + 1; y++)
    {
        for (int x = 0; x < houseWidth; x++)
        {
            for (int z = 0; z < houseDepth; z++)
            {
                if (x == 0 || x == houseWidth - 1 || z == 0 || z == houseDepth - 1)
                {
                    if ((y == startY + 1 || y == startY + 2) && z == 0 && x == houseWidth / 2)
                        continue;
                    else if (y == startY + 3 && (x == houseWidth / 2) && z != 0)
                        SetBlockGlobal(chunks, startX + x, y, startZ + z, BlockType.Glass, useRandom: false);
                    else
                        SetBlockGlobal(chunks, startX + x, y, startZ + z, BlockType.Stone, useRandom: false);
                }
            }
        }
    }

    for (int y = startY; y < startY + height + 1; y++)
    {
        SetBlockGlobal(chunks, startX, y, startZ, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
    }

    SetBlockGlobal(chunks, startX + 1, startY + 3, startZ, BlockType.Glass, useRandom: false);
    SetBlockGlobal(chunks, startX + houseWidth - 2, startY + 3, startZ, BlockType.Glass, useRandom: false);

    for (int layer = -1; layer < houseWidth; layer++)
    {
        for (int x = layer; x < houseWidth - layer; x++)
        {
            for (int z = layer; z < houseDepth - layer; z++)
            {
                if (x == layer || x == houseWidth - layer - 1 ||
                    z == layer || z == houseDepth - layer - 1)
                {
                    SetBlockGlobal(chunks, startX + x, startY + height + 1 + layer, startZ + z, BlockType.Brick, useRandom: false);
                }
            }
        }
    }
}
public static void GenerateSlopedRoofHouse(Dictionary<ChunkPos, TerrainChunk> chunks, int startX, int startY, int startZ)
{
    int houseWidth = 7;
    int houseDepth = 7;
    int height = 4;

    // Sàn nhà
    for (int x = 0; x < houseWidth; x++)
    {
        for (int z = 0; z < houseDepth; z++)
        {
            SetBlockGlobal(chunks, startX + x, startY, startZ + z, BlockType.PlankBrich, useRandom: false);
        }
    }

    // Tường bao quanh
    for (int y = startY ; y < startY + height + 1; y++)
    {
        for (int x = 0; x < houseWidth; x++)
        {
            for (int z = 0; z < houseDepth; z++)
            {
                if (x == 0 || x == houseWidth - 1 || z == 0 || z == houseDepth - 1)
                {
                    // Cửa ra vào
                    if (y >= startY + 1 && y <= startY + 2 && z == 0 && x == houseWidth / 2)
                        continue;

                    // Cửa sổ trái/phải
                    if (y == startY + 2 && x == 0 && z == houseDepth / 2)
                        continue;
                    if (y == startY + 2 && x == houseWidth - 1 && z == houseDepth / 2)
                        continue;

                    SetBlockGlobal(chunks, startX + x, y, startZ + z, BlockType.Stone, useRandom: false);
                }
            }
        }
    }

    // Cột 4 góc
    for (int y = startY; y < startY + height + 1; y++)
    {
        SetBlockGlobal(chunks, startX, y, startZ, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
    }

    // Mái dốc (hình tam giác)
    int centerX = houseWidth / 2;
    for (int layer = 0; layer <= height; layer++)
    {
        int halfWidth = height - layer;
        for (int dx = -halfWidth; dx <= halfWidth; dx++)
        {
            int xLeft = centerX + dx;
            if (xLeft >= 0 && xLeft < houseWidth)
            {
                SetBlockGlobal(chunks, startX + xLeft, startY + height + layer, startZ, BlockType.Brick, useRandom: false);
                SetBlockGlobal(chunks, startX + xLeft, startY + height + layer, startZ + houseDepth - 1, BlockType.Brick, useRandom: false);
            }
        }

        // Hai mặt bên hông
        for (int dz = 1; dz < houseDepth - 1; dz++)
        {
            int xLeft = centerX + (height - layer);
            int xRight = centerX - (height - layer);
            if (xLeft >= 0 && xLeft < houseWidth)
                SetBlockGlobal(chunks, startX + xLeft, startY + height + layer, startZ + dz, BlockType.Brick, useRandom: false);
            if (xRight >= 0 && xRight < houseWidth)
                SetBlockGlobal(chunks, startX + xRight, startY + height + layer, startZ + dz, BlockType.Brick, useRandom: false);
        }
    }
}
public static void GenerateHouseWithNewWindows(Dictionary<ChunkPos, TerrainChunk> chunks, int startX, int startY, int startZ)
{
    int height = 4;
    int houseWidth = 7;
    int houseDepth = 7;

    // Sàn nhà
    for (int x = 0; x < houseWidth; x++)
    {
        for (int z = 0; z < houseDepth; z++)
        {
            SetBlockGlobal(chunks, startX + x, startY + 1, startZ + z, BlockType.PlankBrich, useRandom: false);
        }
    }

    // Tường bao quanh và nội dung bên trong
    for (int y = startY + 1; y < startY + height + 1; y++)
    {
        for (int x = 0; x < houseWidth; x++)
        {
            for (int z = 0; z < houseDepth; z++)
            {
                if (x == 0 || x == houseWidth - 1 || z == 0 || z == houseDepth - 1)
                {
                    // Cửa chính ở giữa mặt trước
                    if (y >= startY + 1 && y <= startY + 2 && z == 0 && x == houseWidth / 2)
                        continue;

                    // Cửa sổ tầng 1 bên trái
                    if (y == startY + 2 && x == 0 && z == houseDepth / 2)
                        continue;

                    // Cửa sổ tầng 1 bên phải
                    if (y == startY + 2 && x == houseWidth - 1 && z == houseDepth / 2)
                        continue;

                    // Cửa sổ tầng 2 bên trái
                    if (y == startY + 3 && x == 0 && z == houseDepth / 2)
                        continue;

                    // Cửa sổ tầng 2 bên phải
                    if (y == startY + 3 && x == houseWidth - 1 && z == houseDepth / 2)
                        continue;

                    // Khối tường bình thường
                    SetBlockGlobal(chunks, startX + x, y, startZ + z, BlockType.Stone, useRandom: false);
                }
            }
        }
    }

    // Cột 4 góc
    for (int y = startY + 1; y < startY + height + 1; y++)
    {
        SetBlockGlobal(chunks, startX, y, startZ, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
    }

    // Thêm cửa sổ nhỏ phía trên mái
    SetBlockGlobal(chunks, startX + houseWidth / 2, startY + height + 1, startZ, BlockType.Glass, useRandom: false);
    SetBlockGlobal(chunks, startX + houseWidth / 2, startY + height + 1, startZ + houseDepth - 1, BlockType.Glass, useRandom: false);

    // Trang trí thêm các ô kính
    SetBlockGlobal(chunks, startX + 1, startY + 3, startZ + 1, BlockType.Glass, useRandom: false);
    SetBlockGlobal(chunks, startX + houseWidth - 2, startY + 3, startZ + 1, BlockType.Glass, useRandom: false);
    SetBlockGlobal(chunks, startX + 1, startY + 3, startZ + houseDepth - 2, BlockType.Glass, useRandom: false);
    SetBlockGlobal(chunks, startX + houseWidth - 2, startY + 3, startZ + houseDepth - 2, BlockType.Glass, useRandom: false);

    // Mái nhà
    for (int layer = -1; layer < houseWidth; layer++)
    {
        for (int x = layer; x < houseWidth - layer; x++)
        {
            for (int z = layer; z < houseDepth - layer; z++)
            {
                if (x == layer || x == houseWidth - layer - 1 ||
                    z == layer || z == houseDepth - layer - 1)
                {
                    SetBlockGlobal(chunks, startX + x, startY + height + 1 + layer, startZ + z, BlockType.Brick, useRandom: false);
                }
            }
        }
    }
}
    public static void GenerateHouse2(Dictionary<ChunkPos, TerrainChunk> chunks, int startX, int startY, int startZ)
    {
        int height = 4;
        int houseWidth = 7;
        int houseDepth = 7;

        // Đảm bảo các chunk liên quan đã tồn tại

        for (int x = 0; x < houseWidth; x++)
        {
            for (int z = 0; z < houseDepth; z++)
            {
                // SetBlockGlobal(chunks, startX + x, startY + 1, startZ + z, BlockType.PlankBrich, useRandom: false);
            }
        }

        for (int y = startY; y < startY + height + 1; y++)
        {
            for (int x = 0; x < houseWidth; x++)
            {
                for (int z = 0; z < houseDepth; z++)
                {
                    if (x == 0 || x == houseWidth - 1 || z == 0 || z == houseDepth - 1)
                    {
                        if ((y == startY + 1 || y == startY + 2) && z == 0 && x == houseWidth / 2)
                            continue;
                        else if (y == startY + 3 && (x == houseWidth / 2) && z != 0)
                            SetBlockGlobal(chunks, startX + x, y, startZ + z, BlockType.Glass, useRandom: false);
                        else
                            SetBlockGlobal(chunks, startX + x, y, startZ + z, BlockType.Stone, useRandom: false);
                    }
                }
            }
        }

        for (int y = startY; y < startY + height + 1; y++)
        {
            SetBlockGlobal(chunks, startX, y, startZ, BlockType.Trunk, useRandom: false);
            SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ, BlockType.Trunk, useRandom: false);
            SetBlockGlobal(chunks, startX, y, startZ + houseDepth - 1, BlockType.Trunk, useRandom: false);
            SetBlockGlobal(chunks, startX + houseWidth - 1, y, startZ + houseDepth - 1, BlockType.Trunk,
                useRandom: false);
        }

        SetBlockGlobal(chunks, startX + 1, startY + 3, startZ, BlockType.Glass, useRandom: false);
        SetBlockGlobal(chunks, startX + houseWidth - 2, startY + 3, startZ, BlockType.Glass, useRandom: false);

        for (int layer = -1; layer < houseWidth; layer++)
        {
            for (int x = layer; x < houseWidth - layer; x++)
            {
                for (int z = layer; z < houseDepth - layer; z++)
                {
                    if (x == layer || x == houseWidth - layer - 1 ||
                        z == layer || z == houseDepth - layer - 1)
                    {
                        SetBlockGlobal(chunks, startX + x, startY + height + 1 + layer, startZ + z, BlockType.Brick,
                            useRandom: false);
                    }
                }
            }
        }
    }
    public static void SetBlockGlobal(Dictionary<ChunkPos, TerrainChunk> chunks, int x, int y, int z, BlockType type, bool useRandom = true)
    {

        int chunkX = Mathf.FloorToInt(x / (float)TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        int chunkZ = Mathf.FloorToInt(z / (float)TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;

        int localX = x - chunkX;
        int localZ = z - chunkZ;

        // Điều chỉnh sang chunk bên cạnh nếu localX hoặc localZ vượt biên
        if (localX < 0)
        {
            chunkX -= TerrainChunk.chunkWidth;
            localX += TerrainChunk.chunkWidth;
        }
        else if (localX >= TerrainChunk.chunkWidth)
        {
            chunkX += TerrainChunk.chunkWidth;
            localX -= TerrainChunk.chunkWidth;
        }

        if (localZ < 0)
        {
            chunkZ -= TerrainChunk.chunkWidth;
            localZ += TerrainChunk.chunkWidth;
        }
        else if (localZ >= TerrainChunk.chunkWidth)
        {
            chunkZ += TerrainChunk.chunkWidth;
            localZ -= TerrainChunk.chunkWidth;
        }

        ChunkPos targetChunkPos = new ChunkPos(chunkX, chunkZ);

        if (chunks.ContainsKey(targetChunkPos))
        {
            TerrainChunk targetChunk = chunks[targetChunkPos];

            
                var a = Random.Range(0, 100);
                if (a <= 30)
                {
                    if (InBounds(localX, y, localZ, targetChunk.blocks))
                    {
                        posBlank = new Vector3(localX, y, localZ);
                        targetChunk.blocks[localX, y, localZ] = BlockType.Air;
                        return;
                    }
                }
            

            if (InBounds(localX, y, localZ, targetChunk.blocks))
            {
                targetChunk.blocks[localX, y, localZ] = type;
            }
        }
    }

    private static void SetBlock(BlockType[,,] blocks, int x, int y, int z, BlockType type, bool useRandom = true)
    {
        if (useRandom)
        {
            var a = Random.Range(0, 100);
            if (a <= 30)
            {
                if (InBounds(x, y, z, blocks))
                {
                    posBlank = new Vector3(x, y, z);
                    blocks[x, y, z] = BlockType.Empty;
                    return;
                }
            }
        }

        if (InBounds(x, y, z, blocks))
        {
            blocks[x, y, z] = type;
        }
    }

    private static bool InBounds(int x, int y, int z, BlockType[,,] blocks)
    {
        return x >= 0 && x < TerrainChunk.chunkWidth &&
               y >= 0 && y < TerrainChunk.chunkHeight &&
               z >= 0 && z < TerrainChunk.chunkWidth;
    }
}
