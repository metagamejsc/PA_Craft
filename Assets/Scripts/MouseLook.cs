using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;
    public LayerMask groundLayer;
    public GameObject blockPrefab;

    public float timeHold = 0;
    public bool isHold = false;
    public Transform posCam;

    public Inventory inv;
    private void Awake()
    {
        ins= this;
    }

    public float mouseSensitivity = 180;

    public Transform playerBody;
    public Camera cameraMain;

    private float xRotation = 0f;
    public Action onClick;
    
    // Start is called before the first frame update
    void Start()
    {
        //Cursor.lockState = CursorLockMode.Locked;
        //Cursor.visible = false;

        /*mouseSensitivity = 180;

        if(Application.isEditor)
            mouseSensitivity = 400;*/
    }

    float mx;

  
    public void OnDrag(PointerEventData eventData)
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        if(Mathf.Abs(mouseX) > 20 || Mathf.Abs(mouseY) > 20)
            return;

        //camera's x rotation (look up and down)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);

        cameraMain.transform.localRotation = Quaternion.Euler(xRotation, 0, 0);

        //mx = Input.GetAxis("Mouse X");
        
        //player body's y rotation (turn left and right)
        playerBody.Rotate(Vector3.up * mouseX);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        StopAllCoroutines();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        StartCoroutine(DestroyBlock());
        //DesTroyBlock();
    }

    private void Update()
    {
        /*if (isHold)
        {
            timeHold+=Time.deltaTime;
            if (timeHold>0.1f)
            {
                DesTroyBlock();
            }
        }*/
        
    }

    public void DesTroyBlock()
    {
            Debug.Log("DesTroyBlock");
                    RaycastHit hitInfo;
                    if(Physics.Raycast(posCam.transform.position, transform.forward, out hitInfo, 5, groundLayer))
                    {
                        Debug.Log("DesTroyBlock");
                        Vector3 pointInTargetBlock;
        
                        //destroy
                        /*if(leftClick)
                            pointInTargetBlock = hitInfo.point + transform.forward * .01f;//move a little inside the block
                        else
                            pointInTargetBlock = hitInfo.point - transform.forward * .01f;*/
                        pointInTargetBlock = hitInfo.point + transform.forward * .01f;
        
                        //get the terrain chunk (can't just use collider)
                        int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
                        int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;
        
                        ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
        
                        TerrainChunk tc = TerrainGenerator.chunks[cp];
        
                        //index of the target block
                        int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
                        int biy = Mathf.FloorToInt(pointInTargetBlock.y);
                        int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;

                      
                        if (timeHold>=1)
                        {
                            inv.AddToInventory(tc.blocks[bix, biy, biz]);
                            tc.blocks[bix, biy, biz] = BlockType.Air;
                            tc.BuildMesh();
                           
                            isHold = false;
                            timeHold = 0;
                        }
                    }
    }

    public IEnumerator DestroyBlock()
    {
                
                     RaycastHit hitInfo;
                    if(Physics.Raycast(posCam.transform.position, posCam.transform.forward, out hitInfo, 5, groundLayer))
                    {
                     
                        Vector3 pointInTargetBlock;
        
                        //destroy
                        /*if(leftClick)
                            pointInTargetBlock = hitInfo.point + transform.forward * .01f;//move a little inside the block
                        else
                            pointInTargetBlock = hitInfo.point - transform.forward * .01f;*/
                        pointInTargetBlock = hitInfo.point + posCam.transform.forward * .01f;
        
                        //get the terrain chunk (can't just use collider)
                        int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
                        int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;
                        
                        ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
        
                        TerrainChunk tc = TerrainGenerator.chunks[cp];
        
                        //index of the target block
                        int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
                        int biy = Mathf.FloorToInt(pointInTargetBlock.y);
                        int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;

                       
                       
                        AudioManager.ins.PlayMiningSound();
                        yield return new WaitForSeconds(0.2f);
                        AudioManager.ins.PlayMiningSound();
                        yield return new WaitForSeconds(0.2f);
                        AudioManager.ins.PlayMiningSound();
                        yield return new WaitForSeconds(0.2f);
                        AudioManager.ins.PlayMiningSound();
                        yield return new WaitForSeconds(0.2f);
                        AudioManager.ins.PlayMiningSound();
                        yield return new WaitForSeconds(0.2f);
                        inv.AddToInventory(tc.blocks[bix, biy, biz]);
                        tc.blocks[bix, biy, biz] = BlockType.Air;
                        tc.BuildMesh();
                        
                    }
    }
}
