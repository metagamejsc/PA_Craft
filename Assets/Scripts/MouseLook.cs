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
    public GameObject blockPrefab2;
    public float timeHold = 0;
    public bool isHold = false;
    public Transform posCam;

    public Inventory inv;
    private void Awake()
    {
        ins= this;
    }

    public Action onClick;
    
    public float distance = 5f;
    public float minDistance = 1.2f;
    public float maxDistance = 5f;
    public float heightOffset = 1.5f;
    public float collisionBuffer = 0.2f;
    public Transform target;
    public Camera cameraMain;
    public LayerMask collisionMask;
    public float rotationSpeed = 0.2f;
    public float yMinLimit = -30f;
    public float yMaxLimit = 80f;
    
    private float xRotation = 0f;
    private float yRotation = 0f;  // yaw
    public bool allowInput = true;
    
    float mx;

  
    public void SetRotationFromDirection(Vector3 directionFromTargetToCamera)
    {
        if (directionFromTargetToCamera.sqrMagnitude < 0.0001f) return;

        // rotation dùng trong LateUpdate: rotation * Vector3.forward là hướng nhìn ra trước camera
        // CameraPos = targetPos - (rotation * forward * distance)
        // => (rotation*forward) chính là hướng từ camera -> target (ngược với direction từ target -> camera)
        Vector3 camToTargetDir = -directionFromTargetToCamera.normalized;
        Quaternion rot = Quaternion.LookRotation(camToTargetDir, Vector3.up);

        Vector3 euler = rot.eulerAngles;
        SetRotationEuler(euler);
    }
    public void SetRotationEuler(Vector3 euler)
    {
        float pitch = NormalizeAngle(euler.x);
        float yaw = NormalizeAngle(euler.y);

        xRotation = Mathf.Clamp(pitch, yMinLimit, yMaxLimit);
        yRotation = yaw;
    }
    private float NormalizeAngle(float angle)
    {
        angle %= 360f;
        if (angle > 180f) angle -= 360f;
        return angle;
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (!allowInput) return;

        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        yRotation += deltaX;
        xRotation -= deltaY;
        xRotation = Mathf.Clamp(xRotation, yMinLimit, yMaxLimit);
    }


    public void OnPointerDown(PointerEventData eventData)
    {
        if (!allowInput) return;
        StartCoroutine(DestroyBlock());
        target.GetComponent<PlayerChar>().HandleAttack();
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!allowInput) return;
        StopAllCoroutines();
        blockPrefab2.SetActive(false);
    }


    private void LateUpdate()
    {
        if (target == null || cameraMain == null) return;

        Quaternion rotation = Quaternion.Euler(xRotation, yRotation, 0f);
        Vector3 targetPosition = target.position + Vector3.up * heightOffset;

        Vector3 desiredCameraPos = targetPosition - (rotation * Vector3.forward * distance);

        RaycastHit hit;
        float correctedDistance = distance;

        if (Physics.Raycast(targetPosition, desiredCameraPos - targetPosition, out hit, distance + collisionBuffer, collisionMask))
        {
            correctedDistance = Mathf.Clamp(hit.distance - collisionBuffer, minDistance, maxDistance);
        }

        Vector3 finalCameraPos = targetPosition - (rotation * Vector3.forward * correctedDistance);

        float minY = target.position.y + 0.3f;
        finalCameraPos.y = Mathf.Max(finalCameraPos.y, minY);

        cameraMain.transform.position = finalCameraPos;
        cameraMain.transform.LookAt(targetPosition);
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
                        int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                        int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
        
                        ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
        
                        TerrainChunk tc = TerrainGenerator2.chunks[cp];
        
                        //index of the target block
                        int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
                        int biy = Mathf.FloorToInt(pointInTargetBlock.y);
                        int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;

                        if (blockPrefab2==null)
                        {
                            blockPrefab2= Instantiate(blockPrefab, new Vector3(bix+ chunkPosX-1, biy, biz+ chunkPosZ-1), Quaternion.identity);
                        }
                        blockPrefab2.SetActive(true);
                        blockPrefab2.transform.position = new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1);
                        if (timeHold>=1)
                        {
                            inv.AddToInventory(tc.blocks[bix, biy, biz]);
                            tc.blocks[bix, biy, biz] = BlockType.Air;
                            tc.BuildMesh();
                            blockPrefab2.SetActive(false);
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
                        int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                        int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / TerrainChunk.chunkWidth) * TerrainChunk.chunkWidth;
                        
                        ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
        
                       
        
                        //index of the target block
                        int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX+1;
                        int biy = Mathf.FloorToInt(pointInTargetBlock.y);
                        int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ+1;

                       
                        blockPrefab2.SetActive(true);
                        blockPrefab2.transform.position = new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1);
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
                        
                        if (TerrainGenerator2.ins)
                        {
                            TerrainChunk tc2 = TerrainGenerator2.chunks[cp];
                            inv.AddToInventory(tc2.blocks[bix, biy, biz]);
                            tc2.blocks[bix, biy, biz] = BlockType.Air;
                            tc2.BuildMesh();
                        }

                        if (TerrainGenerator.ins)
                        {
                            TerrainChunk tc = TerrainGenerator.chunks[cp];
                            inv.AddToInventory(tc.blocks[bix, biy, biz]);
                            tc.blocks[bix, biy, biz] = BlockType.Air;
                            tc.BuildMesh();
                        }

                        blockPrefab2.SetActive(false);

                    }
    }
}
