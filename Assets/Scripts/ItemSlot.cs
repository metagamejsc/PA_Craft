using UnityEngine;
using UnityEngine.UI;

public class ItemSlot : MonoBehaviour
{
    public Image icon;
    private bool hasItem = false;

    public void SetItem(Item item)
    {
        icon.sprite = item.icon;
        icon.enabled = true;
        hasItem = true;
    }

    public bool HasItem() => hasItem;
}