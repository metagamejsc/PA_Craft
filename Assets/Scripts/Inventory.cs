using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class Inventory : MonoBehaviour
{
    int[] matCounts = new int[] { 0, 0, 0, 0 };

    public BlockType[] matTypes;
    public Button[] btnItems;
    public Image[] invImgs;
    public Image[] matImgs;
    public TextMeshProUGUI[] textCount;
    public Transform posBlock;
    public GameObject[] handBlockPrefabs;
    public Material[] handBlockMaterials;
    public Vector3 handBlockLocalPosition = Vector3.zero;
    public Vector3 handBlockLocalEulerAngles = Vector3.zero;
    public Vector3 handBlockLocalScale = Vector3.one * 0.35f;

    int curMat;
    GameObject curHandBlock;

    // Start is called before the first frame update
    void Start()
    {
        foreach(Image img in matImgs)
        {
            img.gameObject.SetActive(false);
        }

        for (int i = 0; i < btnItems.Length; i++)
        {
            var i1 = i;
            btnItems[i].onClick.AddListener(() =>
            {
                SetCur(i1);
            });
        }
        AddToInventory2(BlockType.Brick, 99);
        AddToInventory2(BlockType.Stone, 99);
        AddToInventory2(BlockType.Glass, 99);
        AddToInventory2(BlockType.Trunk, 99);
        //matImgs[0].gameObject.SetActive(true);
        SetCur(curMat);
    }

    // Update is called once per frame
    void Update()
    {
        /*if(Input.GetKeyDown(KeyCode.Alpha1))
            SetCur(0);
        else if(Input.GetKeyDown(KeyCode.Alpha2))
            SetCur(1);
        else if(Input.GetKeyDown(KeyCode.Alpha3))
            SetCur(2);
        else if(Input.GetKeyDown(KeyCode.Alpha4))
            SetCur(3);*/
    }

    void SetCur(int i)
    {
        invImgs[curMat].color = new Color(0, 0, 0, 43/255f);

        curMat = i;
        invImgs[i].color = new Color(0, 0, 0, 80/255f);
        UpdateHandBlock();
    }

    public bool CanPlaceCur()
    {
        return matCounts[curMat] > 0;
    }

    public BlockType GetCurBlock()
    {
        return matTypes[curMat];
    }

    public void ReduceCur()
    {
        matCounts[curMat]--;
        UpdateTextCount();
        if(matCounts[curMat] == 0)
        {
            matImgs[curMat].gameObject.SetActive(false);
            UpdateHandBlock();
        }
        
    }

    public void AddToInventory(BlockType block)
    {
        int i = 0;
        if(block == BlockType.Brick)
            i = 1;
        else if(block == BlockType.Trunk)
            i = 2;
        else if(block == BlockType.Glass)
            i = 3;

        matCounts[i]++;
        if(matCounts[i] == 1)
            matImgs[i].gameObject.SetActive(true);
        UpdateTextCount();
        if (i == curMat)
            UpdateHandBlock();

    }
    public void AddToInventory2(BlockType block,int quanlity)
    {
        int i = 0;
        if(block == BlockType.Brick)
            i = 1;
        else if(block == BlockType.Trunk)
            i = 2;
        else if(block == BlockType.Glass)
            i = 3;

        matCounts[i] += quanlity;
        if(matCounts[i] >= 1)
            matImgs[i].gameObject.SetActive(true);
        UpdateTextCount();
        if (i == curMat)
            UpdateHandBlock();
    }

    public void UpdateTextCount()
    {
        for (int i = 0; i < textCount.Length; i++)
        {
            textCount[i].text= matCounts[i].ToString();
            textCount[i].gameObject.SetActive(false);
        }
    }

    void UpdateHandBlock()
    {
        if (posBlock == null)
            return;

        if (curHandBlock != null)
            Destroy(curHandBlock);

        if (!CanPlaceCur())
            return;

        GameObject prefab = GetArrayValue(handBlockPrefabs, curMat);
        curHandBlock = prefab != null ? Instantiate(prefab, posBlock) : GameObject.CreatePrimitive(PrimitiveType.Cube);
        curHandBlock.transform.SetParent(posBlock, false);
        curHandBlock.transform.localPosition = handBlockLocalPosition;
        curHandBlock.transform.localEulerAngles = handBlockLocalEulerAngles;
        curHandBlock.transform.localScale = handBlockLocalScale;

        foreach (Collider col in curHandBlock.GetComponentsInChildren<Collider>())
            col.enabled = false;

        Material material = GetArrayValue(handBlockMaterials, curMat);
        foreach (Renderer renderer in curHandBlock.GetComponentsInChildren<Renderer>())
        {
            if (material != null)
                renderer.material = material;
            else
                renderer.material.color = GetFallbackColor(GetCurBlock());
        }
    }

    T GetArrayValue<T>(T[] array, int index) where T : class
    {
        if (array == null || index < 0 || index >= array.Length)
            return null;

        return array[index];
    }

    Color GetFallbackColor(BlockType block)
    {
        switch (block)
        {
            case BlockType.Brick:
                return new Color(0.55f, 0.16f, 0.12f);
            case BlockType.Stone:
                return new Color(0.45f, 0.45f, 0.45f);
            case BlockType.Glass:
                return new Color(0.45f, 0.8f, 0.95f, 0.65f);
            case BlockType.Trunk:
                return new Color(0.38f, 0.21f, 0.08f);
            default:
                return Color.white;
        }
    }
}
