using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ClayBuildManager : MonoBehaviour
{
    [Header("Raycast / Place")]
    public Transform posCam;
    public LayerMask groundLayer;
    public float placeDistance = 5f;
    public float overlapHalfExtent = 0.45f;

    [Header("Player Check")]
    public Transform playerRoot;

    [Header("Clay Items")]
    public List<ClayBuildItem> items = new List<ClayBuildItem>();
    public int selectedIndex = 0;

    [Header("UI")]
    public List<Button> slotHighlights = new List<Button>();
    public List<Image> slotIcons = new List<Image>();
    public List<TMP_Text> slotCounts = new List<TMP_Text>();

    [Header("UI Visual")]
    public Color ColorSelected = new Color(1f, 0.85f, 0.2f, 1f);
    public Color ColorUnselected = Color.white;
    public Color ColorEmpty = Color.gray;
    public float selectedScale = 1.1f;
    public float normalScale = 1f;

    private void Start()
    {
        BindSlotButtons();
        ClampSelectedIndex();
        RefreshUI();
    }

    private void Update()
    {
        HandleHotkey();
    }

    void BindSlotButtons()
    {
        for (int i = 0; i < slotHighlights.Count; i++)
        {
            int index = i;

            if (slotHighlights[i] != null)
            {
                slotHighlights[i].onClick.RemoveAllListeners();
                slotHighlights[i].onClick.AddListener(() => SelectSlot(index));
            }
        }
    }

    void HandleHotkey()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1)) SelectSlot(0);
        if (Input.GetKeyDown(KeyCode.Alpha2)) SelectSlot(1);
        if (Input.GetKeyDown(KeyCode.Alpha3)) SelectSlot(2);
        if (Input.GetKeyDown(KeyCode.Alpha4)) SelectSlot(3);
        if (Input.GetKeyDown(KeyCode.Alpha5)) SelectSlot(4);
        if (Input.GetKeyDown(KeyCode.Alpha6)) SelectSlot(5);
        if (Input.GetKeyDown(KeyCode.Alpha7)) SelectSlot(6);
        if (Input.GetKeyDown(KeyCode.Alpha8)) SelectSlot(7);
        if (Input.GetKeyDown(KeyCode.Alpha9)) SelectSlot(8);
    }

    void ClampSelectedIndex()
    {
        if (items == null || items.Count == 0)
        {
            selectedIndex = 0;
            return;
        }

        selectedIndex = Mathf.Clamp(selectedIndex, 0, items.Count - 1);
    }

    public void SelectSlot(int index)
    {
        if (index < 0 || index >= items.Count) return;

        ClayBuildItem item = items[index];
        bool hasItem = item != null && item.count > 0;

        if (!hasItem) return;

        if (AudioManager.ins != null)
            AudioManager.ins.PlaySoundClick();

        selectedIndex = index;
        RefreshUI();
    }

    public void PlaceSelectedBlock()
    {
        if (!CanPlaceSelected()) return;
        if (posCam == null) return;

        RaycastHit hitInfo;
        if (!Physics.Raycast(posCam.position, posCam.forward, out hitInfo, placeDistance, groundLayer))
            return;

        Vector3 hitBlockCenter = new Vector3(
            Mathf.Round(hitInfo.point.x - hitInfo.normal.x * 0.5f),
            Mathf.Round(hitInfo.point.y - hitInfo.normal.y * 0.5f),
            Mathf.Round(hitInfo.point.z - hitInfo.normal.z * 0.5f)
        );

        Vector3 placeCenter = hitBlockCenter + hitInfo.normal;

        Vector3 placeGrid = new Vector3(
            Mathf.Floor(placeCenter.x),
            Mathf.Floor(placeCenter.y),
            Mathf.Floor(placeCenter.z)
        );

        if (IsPositionOccupiedByPlayer(placeGrid))
            return;

        Collider[] hits = Physics.OverlapBox(
            placeCenter,
            Vector3.one * overlapHalfExtent,
            Quaternion.identity,
            groundLayer
        );

        for (int i = 0; i < hits.Length; i++)
        {
            if (hits[i] == hitInfo.collider)
                continue;

            return;
        }

        ClayBuildItem item = items[selectedIndex];
        if (item == null || item.prefab == null || item.count <= 0) return;

        if (AudioManager.ins != null)
            AudioManager.ins.PlaySoundBuild();

        if (LunaManager.ins != null)
            LunaManager.ins.CheckClickShowEndCard();

        GameObject block = Instantiate(item.prefab, placeCenter, Quaternion.identity);
        block.transform.rotation = Quaternion.identity;

        item.count--;
        if (item.count < 0)
            item.count = 0;

        if (item.count == 0)
            TrySelectNearestAvailableSlot();

        RefreshUI();
    }

    void TrySelectNearestAvailableSlot()
    {
        int nextIndex = GetNearestAvailableSlotIndex();
        if (nextIndex >= 0)
            selectedIndex = nextIndex;
    }

    int GetNearestAvailableSlotIndex()
    {
        if (items == null || items.Count == 0) return -1;

        for (int offset = 0; offset < items.Count; offset++)
        {
            int right = selectedIndex + offset;
            if (right >= 0 && right < items.Count)
            {
                if (items[right] != null && items[right].count > 0)
                    return right;
            }

            if (offset == 0) continue;

            int left = selectedIndex - offset;
            if (left >= 0 && left < items.Count)
            {
                if (items[left] != null && items[left].count > 0)
                    return left;
            }
        }

        return -1;
    }

    public void RefreshUI()
    {
        ClampSelectedIndex();

        int uiCount = Mathf.Min(items.Count, slotHighlights.Count);

        for (int i = 0; i < uiCount; i++)
        {
            bool hasItem = items[i] != null && items[i].count > 0;
            bool isSelected = hasItem && i == selectedIndex;

            if (slotIcons.Count > i && slotIcons[i] != null)
            {
                slotIcons[i].enabled = hasItem;
                slotIcons[i].sprite = hasItem ? items[i].icon : null;
            }

            if (slotCounts.Count > i && slotCounts[i] != null)
            {
                slotCounts[i].text = hasItem ? items[i].count.ToString() : "";
            }

            if (slotHighlights[i] != null)
            {
                slotHighlights[i].interactable = hasItem;
                slotHighlights[i].transform.localScale = Vector3.one * (isSelected ? selectedScale : normalScale);

                Image btnImage = slotHighlights[i].GetComponent<Image>();
                if (btnImage != null)
                {
                    if (!hasItem)
                        btnImage.color = ColorEmpty;
                    else
                        btnImage.color = isSelected ? ColorSelected : ColorUnselected;
                }
            }
        }

        for (int i = uiCount; i < slotHighlights.Count; i++)
        {
            if (slotIcons.Count > i && slotIcons[i] != null)
            {
                slotIcons[i].enabled = false;
                slotIcons[i].sprite = null;
            }

            if (slotCounts.Count > i && slotCounts[i] != null)
            {
                slotCounts[i].text = "";
            }

            if (slotHighlights[i] != null)
            {
                slotHighlights[i].interactable = false;
                slotHighlights[i].transform.localScale = Vector3.one * normalScale;

                Image btnImage = slotHighlights[i].GetComponent<Image>();
                if (btnImage != null)
                    btnImage.color = ColorEmpty;
            }
        }
    }

    public bool CanPlaceSelected()
    {
        if (selectedIndex < 0 || selectedIndex >= items.Count) return false;

        ClayBuildItem item = items[selectedIndex];
        return item != null &&
               item.prefab != null &&
               item.count > 0;
    }

    public void AddItem(int index, int amount)
    {
        if (index < 0 || index >= items.Count) return;
        if (items[index] == null) return;

        items[index].count += amount;
        if (items[index].count < 0)
            items[index].count = 0;

        RefreshUI();
    }

    private bool IsPositionOccupiedByPlayer(Vector3 blockWorldPos)
    {
        if (playerRoot == null) return false;

        Vector3 playerPos = playerRoot.position;

        Vector3 playerBlockPos = new Vector3(
            Mathf.Floor(playerPos.x),
            Mathf.Floor(playerPos.y),
            Mathf.Floor(playerPos.z)
        );

        Vector3 playerFeetBlockPos = playerBlockPos;
        Vector3 playerHeadBlockPos = new Vector3(
            playerBlockPos.x,
            playerBlockPos.y + 1,
            playerBlockPos.z
        );

        bool isFeetPosition =
            Mathf.Approximately(blockWorldPos.x, playerFeetBlockPos.x) &&
            Mathf.Approximately(blockWorldPos.y, playerFeetBlockPos.y) &&
            Mathf.Approximately(blockWorldPos.z, playerFeetBlockPos.z);

        bool isHeadPosition =
            Mathf.Approximately(blockWorldPos.x, playerHeadBlockPos.x) &&
            Mathf.Approximately(blockWorldPos.y, playerHeadBlockPos.y) &&
            Mathf.Approximately(blockWorldPos.z, playerHeadBlockPos.z);

        return isFeetPosition || isHeadPosition;
    }
}

[System.Serializable]
public class ClayBuildItem
{
    public string itemName;
    public GameObject prefab;
    public Sprite icon;
    public int count = 10;
}