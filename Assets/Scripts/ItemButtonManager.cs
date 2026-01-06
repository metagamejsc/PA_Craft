using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class ItemButtonManager : MonoBehaviour
{
    [System.Serializable]
    public class ItemButton
    {
        public Button button;
        public GameObject itemObject;
    }

    [Header("Tutorial")]
    public GameObject handPointer;

    [Header("Items")]
    public List<ItemButton> itemButtons;

    private int currentSelectedIndex = -1;

    // Lưu các button đã từng được click ít nhất 1 lần
    private HashSet<int> clickedOnce = new HashSet<int>();

    void Start()
    {
        for (int i = 0; i < itemButtons.Count; i++)
        {
            int index = i;
            itemButtons[i].button.onClick.AddListener(() => OnItemButtonClick(index));
            itemButtons[i].itemObject.SetActive(false);
        }
    }

    void OnItemButtonClick(int index)
    {
        // Tắt tutorial khi user click
        if (handPointer != null)
            handPointer.SetActive(false);

        // Ẩn object cũ nếu click sang button khác
        if (currentSelectedIndex != index && currentSelectedIndex >= 0)
        {
            itemButtons[currentSelectedIndex].itemObject.SetActive(false);
        }

        currentSelectedIndex = index;

        // ❗ QUAN TRỌNG: kiểm tra đã click lần đầu chưa
        if (!clickedOnce.Contains(index))
        {
            // LẦN ĐẦU TIÊN click button này (dù trước đó click button khác)
            clickedOnce.Add(index);
            itemButtons[index].itemObject.SetActive(true);
            Debug.Log("First time click: " + index);
        }
        else
        {
            // TỪ LẦN THỨ 2 TRỞ ĐI (không cần liên tiếp)
            Debug.Log("Second or later click: " + index);
            DoSecondClickAction(index);
        }
    }

    /// <summary>
    /// Dùng cho tutorial / hand pointer
    /// Chỉ hiển thị object, KHÔNG tính là click
    /// </summary>
    public void ShowItemWithoutSecondClick(int index)
    {
        if (currentSelectedIndex != index && currentSelectedIndex >= 0)
        {
            itemButtons[currentSelectedIndex].itemObject.SetActive(false);
        }

        currentSelectedIndex = index;
        itemButtons[index].itemObject.SetActive(true);
    }

    void DoSecondClickAction(int index)
    {
        Debug.Log("DoSecondClickAction for item: " + index);
        LunaManager.ins.OnClickEndCard();
    }
}
