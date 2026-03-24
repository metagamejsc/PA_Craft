using UnityEngine;
using UnityEngine.UI;

public class SelectableItem : MonoBehaviour
{
    [Header("UI")]
    public Image background;
    public Image iconImage;
    public Button button;

    [Header("Color")]
    public Color defaultColor = Color.white;
    public Color selectedColor = Color.green;

    private MultiSelectPanel manager;
    private int itemIndex;

    public void Setup(MultiSelectPanel panel, Sprite sprite, int index)
    {
        manager = panel;
        itemIndex = index;

        if (iconImage != null)
            iconImage.sprite = sprite;

        SetSelected(false);

        if (button == null)
            button = GetComponent<Button>();

        if (button != null)
        {
            button.onClick.RemoveAllListeners();
            button.onClick.AddListener(OnClickItem);
        }
    }

    public void SetSelected(bool isSelected)
    {
        if (background != null)
            background.color = isSelected ? selectedColor : defaultColor;
    }

    private void OnClickItem()
    {
        manager?.OnItemClicked(itemIndex);
    }
}