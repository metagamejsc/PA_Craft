using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class SelectableItem : MonoBehaviour, IPointerClickHandler
    {
        [SerializeField] private int _itemId;
        [SerializeField] private Image _itemImage;

        private GameController _gameController;

        public int ItemId => _itemId;
        public Sprite ItemSprite => _itemImage != null ? _itemImage.sprite : null;

        public void Initialize(GameController gameController)
        {
            _gameController = gameController;
        }

        public void OnPointerClick(PointerEventData eventData)
        {
            _gameController?.SelectSourceItem(this);
        }
    }
}
