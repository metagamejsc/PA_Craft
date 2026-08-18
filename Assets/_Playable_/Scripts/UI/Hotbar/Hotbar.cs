using UnityEngine;

namespace Playable
{
    public class Hotbar : MonoBehaviour
    {
        [SerializeField] private HotbarItem[] _items;

        private HotbarItem _selectedItem;

        private void Awake()
        {
            if (_items == null || _items.Length == 0)
            {
                _items = GetComponentsInChildren<HotbarItem>(true);
            }

            RefreshSelectionVisuals();
        }

        private void OnEnable()
        {
            EventBus.Subscribe<CollectItemEvent>(OnCollectItem);
        }

        private void OnDisable()
        {
            EventBus.Unsubscribe<CollectItemEvent>(OnCollectItem);
        }

        private void OnCollectItem(CollectItemEvent eventData)
        {
            if (eventData.HotbarItem == null || !Contains(eventData.HotbarItem))
            {
                return;
            }

            SelectItem(eventData.HotbarItem);
        }

        private void SelectItem(HotbarItem item)
        {
            if (item == null)
            {
                return;
            }

            _selectedItem = item;
            RefreshSelectionVisuals();
        }

        private bool Contains(HotbarItem item)
        {
            for (int i = 0; i < _items.Length; i++)
            {
                if (_items[i] == item)
                {
                    return true;
                }
            }

            return false;
        }

        private void RefreshSelectionVisuals()
        {
            if (_items == null)
            {
                return;
            }

            for (int i = 0; i < _items.Length; i++)
            {
                if (_items[i] != null)
                {
                    _items[i].SetSelected(_items[i] == _selectedItem);
                }
            }
        }
    }
}