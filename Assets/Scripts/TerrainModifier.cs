using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TerrainModifier : MonoBehaviour
{
    public LayerMask groundLayer;
    public GameObject blockPrefab;

    public Inventory inv;

    float maxDist = 5;
    float minDist = 2;

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
                int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
                int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;

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
        if(Physics.Raycast(transform.position, transform.forward, out hitInfo, maxDist, groundLayer))
        {
            Vector3 pointInTargetBlock;
            
            pointInTargetBlock = hitInfo.point - transform.forward * .01f;
            Debug.Log(Vector3.Distance(transform.position,pointInTargetBlock));
            if (Vector3.Distance(transform.position,pointInTargetBlock)<=minDist)
            {
                return;
            }
            //get the terrain chunk (can't just use collider)
            int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
            int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;

            ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);

            TerrainChunk tc = TerrainGenerator.chunks[cp];

            //index of the target block
            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;
            
                if(inv.CanPlaceCur())
                {
                    //LunaManager.ins.CheckClickShowEndCard();
                    AudioManager.ins.PlaySoundBuild();
                    tc.blocks[bix, biy, biz] = inv.GetCurBlock();
                    tc.BuildMesh();
                    inv.ReduceCur();
                    PlayerMovement2.ins?.PlayBuildAnimation();
                }

        }
    }
    public void PlaceBlock2()
    {
        MouseLook.ins.onClick?.Invoke();
        RaycastHit hitInfo;
        if(Physics.Raycast(transform.position, transform.forward, out hitInfo, maxDist, groundLayer))
        {
            Vector3 pointInTargetBlock;
            
            pointInTargetBlock = hitInfo.point - transform.forward * .01f;
            Debug.Log(Vector3.Distance(transform.position,pointInTargetBlock));
            
            //get the terrain chunk (can't just use collider)
            int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
            int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;

            ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);

            TerrainChunk tc = TerrainGenerator.chunks[cp];

            //index of the target block
            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;
            
            if (tc.blocks[bix, biy, biz] == BlockType.Empty)
            {
                if(inv.CanPlaceCur())
                {
                    AudioManager.ins.PlaySoundBuild();
                    tc.blocks[bix, biy, biz] = inv.GetCurBlock();
                    tc.BuildMesh();
                    inv.ReduceCur();
                    PlayerMovement2.ins?.PlayBuildAnimation();
                }
                return;
            }
            if(inv.CanPlaceCur())
            {
                //LunaManager.ins.CheckClickShowEndCard();
                AudioManager.ins.PlaySoundBuild();
                tc.blocks[bix, biy, biz] = inv.GetCurBlock();
                tc.BuildMesh();
                inv.ReduceCur();
                PlayerMovement2.ins?.PlayBuildAnimation();
            }

        }
    }
    
}
