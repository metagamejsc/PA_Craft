using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class HouseGenerator
{
    public static Vector3 posBlank = new Vector3(0, 0, 0);
    // Hàm chính để sinh ngôi nhà - BÂY GIỜ CÓ THÊM startY
    public static void GenerateHouse(BlockType[,,] blocks, int startX, int startY, int startZ,Vector3 posChunk=default(Vector3))
    {
        
        // Chiều cao của nhà
        int height =4;
        // Kích thước nhà (chiều dài và rộng)
        int houseWidth = 7; // lẻ để có tâm
        int houseDepth = 7;

        // Xây nền nhà từ PlankBrich
        for (int x = 0; x < houseWidth; x++)
        {
            for (int z = 0; z < houseDepth; z++)
            {
                //SetBlock(blocks, startX + x, startY + 1, startZ + z, BlockType.PlankBrich);
            }
        }

        // Xây tường bao quanh
        for (int y = startY; y < startY + height + 1; y++)
        {
            for (int x = 0; x < houseWidth; x++)
            {
                for (int z = 0; z < houseDepth; z++)
                {
                    // Chỉ xây block nếu đang ở rìa ngoài (tường)
                    if (x == 0 || x == houseWidth - 1 || z == 0 || z == houseDepth - 1)
                    {
                        // Vị trí giữa mặt trước (z == 0) để đặt cửa
                        if ((y == startY + 1 ||y == startY + 2)&& z == 0 && x == houseWidth / 2)
                        {
                            // Cửa chính: giữ nguyên là Air
                            continue;
                        }
                        else if (y == startY + 3 && (x == houseWidth / 2) && z!=0)
                        {
                            SetBlock(blocks, startX + x, y, startZ + z, BlockType.Glass, posChunk);
                        }
                        else
                        {
                            // Xây tường bằng Brick
                            SetBlock(blocks, startX + x, y, startZ + z, BlockType.Stone, posChunk);
                        }
                    }
                }
            }
        }

        // Cột gỗ ở 4 góc
        for (int y = startY ; y < startY + height + 1; y++)
        {
            SetBlock(blocks, startX, y, startZ, BlockType.Trunk, posChunk);
            SetBlock(blocks, startX + houseWidth - 1, y, startZ, BlockType.Trunk, posChunk);
            SetBlock(blocks, startX, y, startZ + houseDepth - 1, BlockType.Trunk, posChunk);
            SetBlock(blocks, startX + houseWidth - 1, y, startZ + houseDepth - 1, BlockType.Trunk, posChunk);
        }
        SetBlock(blocks, startX + 1, startY+3, startZ , BlockType.Glass, posChunk);
        SetBlock(blocks, startX + houseWidth - 2, startY+3, startZ , BlockType.Glass, posChunk);
        
        // Mái nhà dạng kim tự tháp nhỏ
        for (int layer = -1; layer < houseWidth; layer++)
        {
            for (int x = layer; x < houseWidth - layer; x++)
            {
                for (int z = layer; z < houseDepth - layer; z++)
                {
                    if (x == layer || x == houseWidth - layer - 1 ||
                        z == layer || z == houseDepth - layer - 1)
                    {
                        SetBlock(blocks, startX + x, startY + height + 1 + layer, startZ + z, BlockType.Brick, posChunk,false);
                    }
                }
            }
        }
    }

    // Helper method để đặt block an toàn
    private static void SetBlock(BlockType[,,] blocks, int x, int y, int z, BlockType type, Vector3 posChunkVector3=default(Vector3),bool useRandom=true)
    {
        if (useRandom)
        {
            var a = Random.Range(0, 100);
            if (a<=30)
            {
                if (InBounds(x, y, z, blocks))
                {
                    posBlank = new Vector3(x, y, z)+posChunkVector3;
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

    // Kiểm tra giới hạn mảng
    private static bool InBounds(int x, int y, int z, BlockType[,,] blocks)
    {
        return x >= 0 && x < TerrainChunk.chunkWidth &&
               y >= 0 && y < TerrainChunk.chunkHeight &&
               z >= 0 && z < TerrainChunk.chunkWidth;
    }
}