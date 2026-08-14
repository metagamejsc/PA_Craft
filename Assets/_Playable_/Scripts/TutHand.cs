using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class TutHand : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private RectTransform _objHand;

        [SerializeField] private RectTransform _circle;

        [Header("Animation")] [SerializeField] private Vector2 _handStartOffset = new Vector2(120f, -120f);
        [SerializeField] private float _moveDurationHand = 0.6f;
        [SerializeField] private float _moveDurationCircle = 0.4f;
        [SerializeField] private Ease _moveEase = Ease.InOutSine;
        [SerializeField] private Ease _scaleEase = Ease.OutBack;

        private Vector3 _circleInitialScale;

        private void Start()
        {
            if (_objHand == null || _circle == null)
            {
                return;
            }

            _circleInitialScale = _circle.localScale;
            PlayTutorial();
        }

        private void PlayTutorial()
        {
            Vector2 circlePosition = _circle.anchoredPosition;
            Vector2 handStartPosition = circlePosition + _handStartOffset;
            _circle.localScale = Vector3.zero;
            _objHand.DOAnchorPos(handStartPosition, _moveDurationHand).SetEase(_moveEase).SetLoops(-1, LoopType.Yoyo);
            _circle.DOScale(_circleInitialScale, _moveDurationCircle).SetEase(_scaleEase).SetLoops(-1, LoopType.Restart);
        }

      
    }
}