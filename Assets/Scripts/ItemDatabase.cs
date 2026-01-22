using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "Chest/ItemDatabase")]
public class ItemDatabase : MonoBehaviour
{
    public static ItemDatabase Instance;
    public List<Item> items;

    private int currentIndex = 0;

    void OnEnable()
    {
        Instance = this;
        currentIndex = 0; // reset mỗi lần vào play mode
    }

    public Item GetNextItem()
    {
        if (items.Count == 0) return null;

        Item item = items[currentIndex];
        currentIndex = (currentIndex + 1) % items.Count; // vòng lặp
        return item;
    }
}
[System.Serializable]
public class Item
{
    public string itemName;
    public Sprite icon;
}