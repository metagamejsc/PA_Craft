using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class CloneDragItem : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler
    {
        [SerializeField] private Image _itemImage;
        [SerializeField] private CanvasGroup _canvasGroup;
        [SerializeField] private RectTransform _rectTransform;
        [SerializeField] private Canvas _canvas;

        private Vector2 _defaultAnchoredPosition;

        public int CurrentItemId { get; private set; } = -1;
        public Sprite CurrentSprite => _itemImage != null ? _itemImage.sprite : null;
        public bool HasData => CurrentItemId >= 0 && CurrentSprite != null;

        public void Initialize()
        {
            if (_rectTransform == null)
            {
                _rectTransform = transform as RectTransform;
            }

            if (_canvasGroup == null)
            {
                _canvasGroup = GetComponent<CanvasGroup>();
            }

            if (_itemImage == null)
            {
                _itemImage = GetComponent<Image>();
            }

            if (_canvas == null)
            {
                _canvas = GetComponentInParent<Canvas>();
            }

            if (_rectTransform != null)
            {
                _defaultAnchoredPosition = _rectTransform.anchoredPosition;
            }

            Clear();
        }

        public void SetData(int itemId, Sprite sprite)
        {
            CurrentItemId = itemId;

            if (_itemImage != null)
            {
                _itemImage.sprite = sprite;
                _itemImage.enabled = sprite != null;
            }
        }

        public void Clear()
        {
            CurrentItemId = -1;

            if (_itemImage != null)
            {
                _itemImage.sprite = null;
                _itemImage.enabled = false;
            }
        }

        public void OnBeginDrag(PointerEventData eventData)
        {
            if (!HasData)
            {
                return;
            }

            if (_canvasGroup != null)
            {
                _canvasGroup.blocksRaycasts = false;
            }
        }

        public void OnDrag(PointerEventData eventData)
        {
            if (!HasData || _rectTransform == null)
            {
                return;
            }

            float scaleFactor = _canvas != null ? _canvas.scaleFactor : 1f;
            _rectTransform.anchoredPosition += eventData.delta / scaleFactor;
        }

        public void OnEndDrag(PointerEventData eventData)
        {
            if (_canvasGroup != null)
            {
                _canvasGroup.blocksRaycasts = true;
            }

            if (_rectTransform != null)
            {
                _rectTransform.anchoredPosition = _defaultAnchoredPosition;
            }
        }
    }
}
