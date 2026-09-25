using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class HandTutorial : MonoBehaviour
    {
        [Header("Move hint")]
        [SerializeField] private RectTransform _infinityGraphic;
        [SerializeField] private RectTransform _moveHand;
        [SerializeField, Min(0.1f)] private float _loopDuration = 2f;
        [SerializeField] private Vector2 _pathSize = new Vector2(0.4f, 0.3f);

        [Header("Steal hint")]
        [SerializeField] private RectTransform _stealHand;
        [SerializeField, Min(0.1f)] private float _pressDuration = 0.4f;
        [SerializeField, Range(0.1f, 1f)] private float _pressedScale = 0.8f;

        private Tween _moveTween;
        private Tween _pressTween;
        private Vector2 _moveHandOrigin;
        private Vector3 _stealHandScale;
        private bool _cached;

        private void CacheLayout()
        {
            if (_cached) return;
            if (_moveHand != null) _moveHandOrigin = _moveHand.anchoredPosition;
            if (_stealHand != null) _stealHandScale = _stealHand.localScale;
            _cached = true;
        }

        public void ShowMovementTutorial()
        {
            CacheLayout();
            HideMovementTutorial();
            if (_infinityGraphic == null || _moveHand == null) return;

            _infinityGraphic.gameObject.SetActive(true);
            _moveHand.gameObject.SetActive(true);
            _moveTween = DOVirtual.Float(0f, Mathf.PI * 2f, Mathf.Max(0.1f, _loopDuration), angle =>
            {
                Vector2 size = _infinityGraphic.rect.size;
                _moveHand.anchoredPosition = _moveHandOrigin + new Vector2(
                    Mathf.Sin(angle) * size.x * _pathSize.x,
                    Mathf.Sin(angle * 2f) * size.y * _pathSize.y);
            }).SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart);
        }

        private void Update()
        {
            if (_infinityGraphic == null || !_infinityGraphic.gameObject.activeSelf) return;
            if (Input.GetMouseButtonDown(0))
            {
                HideMovementTutorial();
                return;
            }

            for (int i = 0; i < Input.touchCount; i++)
            {
                if (Input.GetTouch(i).phase != TouchPhase.Began) continue;
                HideMovementTutorial();
                return;
            }
        }

        public void HideMovementTutorial()
        {
            CacheLayout();
            _moveTween?.Kill();
            _moveTween = null;
            if (_moveHand != null) _moveHand.anchoredPosition = _moveHandOrigin;
            if (_infinityGraphic != null) _infinityGraphic.gameObject.SetActive(false);
        }

        public void SetStealHintVisible(bool visible)
        {
            CacheLayout();
            if (visible) HideMovementTutorial();
            if (_stealHand == null) return;
            if (visible && _pressTween != null && _pressTween.IsActive()) return;

            _pressTween?.Kill();
            _pressTween = null;
            _stealHand.localScale = _stealHandScale;
            _stealHand.gameObject.SetActive(visible);
            if (!visible) return;

            _pressTween = _stealHand.DOScale(_stealHandScale * _pressedScale, Mathf.Max(0.1f, _pressDuration))
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        public void HideAll()
        {
            HideMovementTutorial();
            SetStealHintVisible(false);
        }

        private void OnDisable()
        {
            HideAll();
        }
    }
}
