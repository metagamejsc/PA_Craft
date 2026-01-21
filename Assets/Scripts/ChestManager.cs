using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChestManager : MonoBehaviour
{
    public static ChestManager Instance;
    public bool isBusy = false; // ngăn mở nhiều rương một lúc

    [Header("Setup")]
    public List<ChestController> chests;         // Kéo thủ công vào Inspector
    public ItemSlot[] itemSlots;
    public UIManager uiManager;

    private List<Item> obtainedItems = new List<Item>();
    private int chestOpened = 0; // size = 3
  

    void Awake() => Instance = this;

    void Start()
    {
        // Nếu cần reset trạng thái rương, có thể làm tại đây
        foreach (var chest in chests)
        {
            chest.ResetChest();
        }
    }

    public void OpenChestAfterDelay(ChestController chest, float delay)
    {
        StartCoroutine(OpenChestCoroutine(chest, delay));
    }

    private IEnumerator OpenChestCoroutine(ChestController chest, float delay)
    {
        yield return new WaitForSeconds(delay);
        AudioManager.ins.PlaySoundOpenChest();
        Item item = ItemDatabase.Instance.GetNextItem();
        obtainedItems.Add(item);

        int slotIndex = GetNextEmptySlot();
        if (slotIndex >= 0)
        {
            yield return StartCoroutine(uiManager.ShowRewardPopupAndMoveToSlot(item, itemSlots[slotIndex]));
        }

        chestOpened++;

        if (obtainedItems.Count >= 3)
        {
            yield return new WaitForSeconds(1f);
            uiManager.ShowFinalResult(obtainedItems);
        }
        else
        {
            yield return new WaitForSeconds(0.5f);
            isBusy = false; // cho phép mở rương tiếp
        }
    }

    private int GetNextEmptySlot()
    {
        for (int i = 0; i < itemSlots.Length; i++)
        {
            if (!itemSlots[i].HasItem()) return i;
        }
        return -1;
    }
}