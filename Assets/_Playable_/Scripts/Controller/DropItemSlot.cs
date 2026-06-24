using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class DropItemSlot : MonoBehaviour, IDropHandler
    {
        [SerializeField] private int _expectedItemId;
        [SerializeField] private Image _placedItemImage;

        private GameController _gameController;

        public bool IsFilled { get; private set; }

        public void Initialize(GameController gameController)
        {
            _gameController = gameController;

            if (_placedItemImage != null)
            {
                _placedItemImage.enabled = false;
            }

            IsFilled = false;
        }

        public bool CanAccept(int itemId)
        {
            return !IsFilled && itemId == _expectedItemId;
        }

        public void SetItem(int itemId, Sprite sprite)
        {
            if (_placedItemImage != null)
            {
                _placedItemImage.sprite = sprite;
                _placedItemImage.enabled = sprite != null;
            }

            IsFilled = itemId == _expectedItemId && sprite != null;
        }

        public void OnDrop(PointerEventData eventData)
        {
            CloneDragItem dragItem = eventData.pointerDrag != null
                ? eventData.pointerDrag.GetComponent<CloneDragItem>()
                : null;

            _gameController?.TryPlaceItem(this, dragItem);
        }
    }
}
