using UnityEngine;
using UnityEngine.UI;

public class BuyMonsterUIController : MonoBehaviour
{
    public Button buyButton;
    public MonsterController currentMonster;

    [Header("References")]
    public Transform[] goldSlots; // các vị trí để quái đến
    [Header("Entry Point")]
    public Transform playerEntryGate;
    public int nextSlotIndex = 0;

    private void Start()
    {
        //gameObject.SetActive(false);
        buyButton.onClick.AddListener(OnBuyButtonClick);
    }

    public void Show(MonsterController monster)
    {
        currentMonster = monster;
        buyButton.gameObject.SetActive(true);
    }

    public void Hide()
    {
        currentMonster = null;
        buyButton.gameObject.SetActive(false);
    }

    private void OnBuyButtonClick()
    {
        if (currentMonster == null) return;

        if (!PlayerGold.Instance.SpendGold(currentMonster.price))
        {
            Debug.Log("Không đủ vàng!");
            return;
        }

        Transform targetSlot = GetNextAvailableSlot();

        // CHỈ truyền slot cho monster, KHÔNG gán vào GoldSlot
        currentMonster.SetGoldSlot(targetSlot);
        currentMonster.Buy(playerEntryGate);

        Hide();
    }




    private Transform GetNextAvailableSlot()
    {
        Transform slot = goldSlots[nextSlotIndex];
        nextSlotIndex = (nextSlotIndex + 1) % goldSlots.Length;
        return slot;
    }
}