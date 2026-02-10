using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TerrainModifier : MonoBehaviour
{
    public LayerMask groundLayer;
    public GameObject blockPrefab;

    public Inventory inv;
    public Inventory inv2;

    public float maxDist = 10;
    public float minDist = 2;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        /*bool leftClick = Input.GetMouseButtonDown(0);
       
        if(leftClick )
        {
            RaycastHit hitInfo;
            if(Physics.Raycast(transform.position, transform.forward, out hitInfo, maxDist, groundLayer))
            {
                Vector3 pointInTargetBlock;

                //destroy
                if(leftClick)
                    pointInTargetBlock = hitInfo.point + transform.forward * .01f;//move a little inside the block
                else
                    pointInTargetBlock = hitInfo.point - transform.forward * .01f;

                //get the terrain chunk (can't just use collider)
                int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;

                ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);

                TerrainChunk tc = TerrainGenerator.chunks[cp];

                //index of the target block
                int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
                int biy = Mathf.FloorToInt(pointInTargetBlock.y);
                int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;

                if(leftClick)//replace block with air
                {
                    inv.AddToInventory(tc.blocks[bix, biy, biz]);
                    //tc.blocks[bix, biy, biz] = BlockType.Air;
                    Instantiate(blockPrefab, new Vector3(bix+ chunkPosX-1, biy, biz+ chunkPosZ-1), Quaternion.identity);
                    //tc.BuildMesh();
                }
                /*else if(leftClick)
                {
                    if(inv.CanPlaceCur())
                    {
                        tc.blocks[bix, biy, biz] = inv.GetCurBlock();

                        tc.BuildMesh();

                        inv.ReduceCur();
                    }
                    
                }#1#
            }
        }*/
    }

    public void PlaceBlock()
{
    MouseLook.ins.onClick?.Invoke();
    RaycastHit hitInfo;
    if (Physics.Raycast(transform.position, transform.forward, out hitInfo, maxDist, groundLayer))
    {
        Vector3 pointInTargetBlock = hitInfo.point - transform.forward * 0.01f;
        float dist = Vector3.Distance(transform.position, pointInTargetBlock);

        // Nếu quá gần (đang đứng trong block), giảm Y để lấy block dưới chân
        if (dist <= minDist)
        {
            pointInTargetBlock = hitInfo.point - new Vector3(0, 0.5f, 0);
        }

        // Tính toán chunk
        int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);

        if (!TerrainGenerator2.chunks.TryGetValue(cp, out TerrainChunk tc))
            return;

        // Tọa độ block trong chunk
        int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
        int biy = Mathf.FloorToInt(pointInTargetBlock.y);
        int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;

        if (dist <= minDist)
        {
            // Đặt block ở 4 hướng xung quanh, cùng độ cao, nếu không bị player chiếm
            Vector3Int[] directions = new Vector3Int[]
            {
                new Vector3Int(1, 0, 0),
                new Vector3Int(-1, 0, 0),
                new Vector3Int(0, 0, 1),
                new Vector3Int(0, 0, -1),
            };

            foreach (var dir in directions)
            {
                int nx = bix + dir.x;
                int ny = biy;
                int nz = biz + dir.z;

                Vector3 worldPos = new Vector3(nx + chunkPosX - 1 + 0.5f, ny + 0.5f, nz + chunkPosZ - 1 + 0.5f);
                Vector3 halfExtents = Vector3.one * 0.45f; // block 1x1x1

                // Kiểm tra xem player có đè lên block đó không
                Collider[] colliders = Physics.OverlapBox(worldPos, halfExtents);
                bool isBlockedByPlayer = false;
                foreach (var col in colliders)
                {
                    if (col.CompareTag("Player"))
                    {
                        isBlockedByPlayer = true;
                        break;
                    }
                }

                // Nếu trống và không bị player chiếm, đặt block
                if (!isBlockedByPlayer && tc.blocks[nx, ny, nz] == BlockType.Air)
                {
                    if (inv.CanPlaceCur())
                    {
                        AudioManager.ins.PlaySoundBuild();
                        tc.blocks[nx, ny, nz] = inv.GetCurBlock();
                        tc.BuildMesh();
                        inv.ReduceCur();
                    }
                    break;
                }
            }

            return;
        }

        // Trường hợp bình thường: đặt block tại điểm raycast
        if (inv.CanPlaceCur())
        {
            AudioManager.ins.PlaySoundBuild();
            tc.blocks[bix, biy, biz] = inv.GetCurBlock();
            tc.BuildMesh();
            inv.ReduceCur();
        }
    }
}


}
