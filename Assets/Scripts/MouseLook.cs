using System;
using System.Collections;
using DG.Tweening;
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
    public Transform pickaxe;
    public float pickaxeSwingOffsetX = 0.15f;
    public float pickaxeSwingOffsetY = -0.2f;
    public float pickaxeSwingRotationZ = -35f;
    public float pickaxeSwingDuration = 0.1f;

    public Inventory inv;

    private Sequence pickaxeSwingSequence;
    private Vector3 pickaxeStartLocalPosition;
    private Vector3 pickaxeStartLocalEulerAngles;
    private bool hasCachedPickaxePose;

    public float mouseSensitivity = 180;
    public Transform playerBody;
    public Camera cameraMain;
    public Action onClick;

    private float xRotation = 0f;
    float mx;

    private void Awake()
    {
        ins = this;
    }

    void Start()
    {
        //Cursor.lockState = CursorLockMode.Locked;
        //Cursor.visible = false;

        /*mouseSensitivity = 180;

        if(Application.isEditor)
            mouseSensitivity = 400;*/
    }

    public void OnDrag(PointerEventData eventData)
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        if (Mathf.Abs(mouseX) > 20 || Mathf.Abs(mouseY) > 20)
            return;

        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);
        cameraMain.transform.localRotation = Quaternion.Euler(xRotation, 0, 0);
        playerBody.Rotate(Vector3.up * mouseX);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        StopAllCoroutines();

        if (blockPrefab2 != null)
        {
            blockPrefab2.SetActive(false);
        }

        ResetPickaxeAnimation();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        CachePickaxePose();
        StartCoroutine(DestroyBlock());
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
            Vector3 pointInTargetBlock = hitInfo.point + transform.forward * .01f;

            int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
            int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;
            ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
            TerrainChunk tc = TerrainGenerator.chunks[cp];

            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;

            if (blockPrefab2 == null)
            {
                blockPrefab2 = Instantiate(blockPrefab, new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1), Quaternion.identity);
            }

            blockPrefab2.SetActive(true);
            blockPrefab2.transform.position = new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1);
            if (timeHold >= 1)
            {
                var destroyedBlock = tc.blocks[bix, biy, biz];
                tc.blocks[bix, biy, biz] = BlockType.Air;
                tc.BuildMesh();
                inv.AddToInventory(destroyedBlock);
                blockPrefab2.SetActive(false);
                isHold = false;
                timeHold = 0;
                TryShowEndCardForWoodBlock(destroyedBlock);
            }
        }
    }

    public IEnumerator DestroyBlock()
    {
        Debug.Log("DestroyBlock");
        RaycastHit hitInfo;
        if (Physics.Raycast(posCam.transform.position, posCam.transform.forward, out hitInfo, 5, groundLayer))
        {
            Debug.Log("DesTroyBlock2");
            Vector3 pointInTargetBlock = hitInfo.point + posCam.transform.forward * .01f;

            int chunkPosX = Mathf.FloorToInt(pointInTargetBlock.x / 16f) * 16;
            int chunkPosZ = Mathf.FloorToInt(pointInTargetBlock.z / 16f) * 16;
            ChunkPos cp = new ChunkPos(chunkPosX, chunkPosZ);
            TerrainChunk tc = TerrainGenerator.chunks[cp];

            int bix = Mathf.FloorToInt(pointInTargetBlock.x) - chunkPosX + 1;
            int biy = Mathf.FloorToInt(pointInTargetBlock.y);
            int biz = Mathf.FloorToInt(pointInTargetBlock.z) - chunkPosZ + 1;

            if (blockPrefab2 == null)
            {
                blockPrefab2 = Instantiate(blockPrefab, new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1), Quaternion.identity);
            }

            blockPrefab2.SetActive(true);
            blockPrefab2.transform.position = new Vector3(bix + chunkPosX - 1, biy, biz + chunkPosZ - 1);

            for (int i = 0; i < 5; i++)
            {
                PlayPickaxeSwing();
                AudioManager.ins.PlayMiningSound();
                yield return new WaitForSeconds(0.2f);
            }

            var destroyedBlock = tc.blocks[bix, biy, biz];
            tc.blocks[bix, biy, biz] = BlockType.Air;
            tc.BuildMesh();
            inv.AddToInventory(destroyedBlock);

            if (blockPrefab2 != null)
            {
                blockPrefab2.SetActive(false);
            }

            yield return null;
            TryShowEndCardForWoodBlock(destroyedBlock);
            ResetPickaxeAnimation();
        }
    }

    private void CachePickaxePose()
    {
        if (pickaxe == null)
        {
            return;
        }

        pickaxeStartLocalPosition = pickaxe.localPosition;
        pickaxeStartLocalEulerAngles = pickaxe.localEulerAngles;
        hasCachedPickaxePose = true;
    }

    private void PlayPickaxeSwing()
    {
        if (pickaxe == null || !hasCachedPickaxePose)
        {
            return;
        }

        pickaxeSwingSequence?.Kill(false);
        pickaxe.localPosition = pickaxeStartLocalPosition;
        pickaxe.localEulerAngles = pickaxeStartLocalEulerAngles;

        float targetPosX = pickaxeStartLocalPosition.x + pickaxeSwingOffsetX;
        float targetPosY = pickaxeStartLocalPosition.y + pickaxeSwingOffsetY;
        Vector3 targetRotation = pickaxeStartLocalEulerAngles;
        targetRotation.z += pickaxeSwingRotationZ;

        pickaxeSwingSequence = DOTween.Sequence();
        pickaxeSwingSequence.Append(pickaxe.DOLocalMoveX(targetPosX, pickaxeSwingDuration).SetEase(Ease.OutQuad));
        pickaxeSwingSequence.Join(pickaxe.DOLocalMoveY(targetPosY, pickaxeSwingDuration).SetEase(Ease.OutQuad));
        pickaxeSwingSequence.Join(pickaxe.DOLocalRotate(targetRotation, pickaxeSwingDuration).SetEase(Ease.OutQuad));
        pickaxeSwingSequence.Append(pickaxe.DOLocalMoveX(pickaxeStartLocalPosition.x, pickaxeSwingDuration).SetEase(Ease.InQuad));
        pickaxeSwingSequence.Join(pickaxe.DOLocalMoveY(pickaxeStartLocalPosition.y, pickaxeSwingDuration).SetEase(Ease.InQuad));
        pickaxeSwingSequence.Join(pickaxe.DOLocalRotate(pickaxeStartLocalEulerAngles, pickaxeSwingDuration).SetEase(Ease.InQuad));
    }

    private void ResetPickaxeAnimation()
    {
        if (pickaxe == null || !hasCachedPickaxePose)
        {
            return;
        }

        pickaxeSwingSequence?.Kill(false);
        pickaxe.localPosition = pickaxeStartLocalPosition;
        pickaxe.localEulerAngles = pickaxeStartLocalEulerAngles;
        hasCachedPickaxePose = false;
    }

    private void TryShowEndCardForWoodBlock(BlockType blockType)
    {
        if (blockType != BlockType.Trunk)
        {
            return;
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }
    }

    private void OnDisable()
    {
        ResetPickaxeAnimation();
    }
}
