using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using Random = UnityEngine.Random;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;
    public LayerMask groundLayer;
    public GameObject blockPrefab;
    public GameObject blockPrefab2;
    public float timeHold = 0;
    public bool isHold = false;
    public Transform posCam;
    public GameObject stickGameObject, ironGameObject;
    public Coroutine coroutineSpawnObject;

    public Inventory inv;

    private void Awake()
    {
        ins = this;
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

        if (Mathf.Abs(mouseX) > 20 || Mathf.Abs(mouseY) > 20)
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
        blockPrefab2.SetActive(false);
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
        if (Physics.Raycast(posCam.transform.position, transform.forward, out hitInfo, 5, groundLayer))
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
            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;

            if (blockPrefab2 == null)
            {
                blockPrefab2 = Instantiate(blockPrefab, new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1),
                    Quaternion.identity);
            }

            blockPrefab2.SetActive(true);
            blockPrefab2.transform.position = new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1);
            if (timeHold >= 1)
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

    public void StopSpawnItem()
    {
        if (coroutineSpawnObject != null)
        {
            StopCoroutine(coroutineSpawnObject);
        }
    }

    public IEnumerator IeSpawnItem(GameObject item, Vector3 pos)
    {
        while (true)
        {
            yield return new WaitForSeconds(0.4f);
            Vector3 addPos = new Vector3(Random.Range(0, 2) == 1 ? -1f : 1f, 1.5f, Random.Range(0, 2) == 1 ? -1f : 1f);
            var a = Instantiate(item, pos + addPos, Quaternion.identity);
            //Vector3 force = new Vector3(UnityEngine.Random.Range(-2f, 2f)*10, UnityEngine.Random.Range(0.5f, 1f), UnityEngine.Random.Range(-2f, 2f)*10);
            //a.GetComponent<Rigidbody>().AddForce(force,ForceMode.Impulse);
        }
    }

    public IEnumerator DestroyBlock()
    {
        RaycastHit hitInfo;
        if (Physics.Raycast(posCam.transform.position, posCam.transform.forward, out hitInfo, 5, groundLayer))
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
            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;
            if (tc.blocks[bix, biy, biz] == BlockType.Empty)
            {
                yield break;
            }

            blockPrefab2.SetActive(true);
            blockPrefab2.transform.position = new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1);
            /*
            if (tc.blocks[bix, biy, biz] == BlockType.Iron)
            {
                StopSpawnItem();
                coroutineSpawnObject = StartCoroutine(IeSpawnItem(ironGameObject,
                    new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1)));
            }

            if (tc.blocks[bix, biy, biz] == BlockType.Trunk)
            {
                StopSpawnItem();
                coroutineSpawnObject = StartCoroutine(IeSpawnItem(stickGameObject,
                    new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1)));
            }
            */

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
            /*if (tc.blocks[bix, biy, biz] == BlockType.Trunk || tc.blocks[bix, biy, biz] == BlockType.Iron)
            {
                blockPrefab2.SetActive(false);
                yield break;
            }*/

            inv.AddToInventory(tc.blocks[bix, biy, biz]);
            tc.blocks[bix, biy, biz] = BlockType.Air;
            tc.BuildMesh();
            blockPrefab2.SetActive(false);
        }
    }

    public void PlaceBlock()
    {
        RaycastHit hitInfo;
        if (Physics.Raycast(posCam.transform.position, posCam.transform.forward, out hitInfo, 5, groundLayer))
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
            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;

            if (tc.blocks[bix, biy, biz] == BlockType.Empty)
            {
                tc.blocks[bix, biy, biz] = BlockType.Brick;
                tc.BuildMesh();
                PlayerMovement2.ins?.PlayBuildAnimation();
                return;
            }
        }
    }
    public void PlaceBlock2()
{
    MouseLook.ins.onClick?.Invoke();

    RaycastHit hitInfo;
    if (Physics.Raycast(posCam.transform.position, posCam.transform.forward, out hitInfo, 5, groundLayer))
    {
        Vector3 pointInTargetBlock = hitInfo.point + posCam.transform.forward * 0.01f;

        // Xác định chunk
        int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
        int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;

        ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
        TerrainChunk tc = TerrainGenerator.chunks[cp];

        // Tính index khối bị bắn trúng
        int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
        int biy = Mathf.FloorToInt(pointInTargetBlock.y);
        int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;

        // Kiểm tra xem khối này có phải là Empty hay không
        if (tc.blocks[bix, biy, biz] == BlockType.Empty && inv.CanPlaceCur())
        {
            LunaManager.ins.CheckClickShowEndCard();
            AudioManager.ins.PlaySoundBuild();
            tc.blocks[bix, biy, biz] = inv.GetCurBlock();
            tc.BuildMesh();
            inv.ReduceCur();
            PlayerMovement2.ins?.PlayBuildAnimation();
            return;
        }

        // Nếu không phải empty -> đặt khối bên cạnh theo hướng mặt tiếp xúc
        if (inv.CanPlaceCur())
        {
            // Lấy normal của mặt va chạm
            Vector3 normal = hitInfo.normal;

            // Dịch chuyển theo hướng normal 1 đơn vị để chọn khối kế bên
            Vector3 adjacentPoint = hitInfo.point + normal*0.5f;

            // Tính lại chunk và index khối kế bên
            int adjChunkPosX = Mathf.FloorToInt(adjacentPoint.x / 16f) * 16;
            int adjChunkPosZ = Mathf.FloorToInt(adjacentPoint.z / 16f) * 16;

            ChunkPos adjCp = new ChunkPos(adjChunkPosX, adjChunkPosZ);

            // Nếu chunk không tồn tại, thoát (có thể sinh ra chunk ở đây nếu cần)
            if (!TerrainGenerator.chunks.TryGetValue(adjCp, out TerrainChunk adjTc))
                return;

            int adjBix = Mathf.FloorToInt(adjacentPoint.x) - adjChunkPosX + 1;
            int adjBiy = Mathf.FloorToInt(adjacentPoint.y);
            int adjBiz = Mathf.FloorToInt(adjacentPoint.z) - adjChunkPosZ + 1;

    
            AudioManager.ins.PlaySoundBuild();
            LunaManager.ins.CheckClickShowEndCard();
            adjTc.blocks[adjBix, adjBiy, adjBiz] = inv.GetCurBlock();
            adjTc.BuildMesh();
            inv.ReduceCur();
            PlayerMovement2.ins?.PlayBuildAnimation();
        }
    }
}
}
