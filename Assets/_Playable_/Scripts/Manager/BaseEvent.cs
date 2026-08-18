using UnityEngine;

namespace Playable
{
    public abstract class BaseEvent
    {
    }

    public sealed class CollectItemEvent : BaseEvent
    {
        public HotbarItem HotbarItem { get; }
        public GameObject ItemPrefab { get; }

        public CollectItemEvent(HotbarItem hotbarItem, GameObject itemPrefab)
        {
            HotbarItem = hotbarItem;
            ItemPrefab = itemPrefab;
        }
    }
}