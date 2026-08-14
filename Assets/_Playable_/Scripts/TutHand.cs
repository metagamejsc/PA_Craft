using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class TutHand : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private RectTransform _objHand;

        [SerializeField] private RectTransform _circle;
        [SerializeField] private Image _arrivalIcon;

        [Header("Hand Animation")] [SerializeField]
        private Vector2 _handStartOffset = new Vector2(120f, -120f);

        [SerializeField] private float _moveDurationHand = 0.6f;
        [SerializeField] private Ease _moveEase = Ease.InOutSine;
        [SerializeField] private Ease _scaleEase = Ease.OutBack;

        [Header("Arrival Icon")] [SerializeField]
        private float _iconRiseDistance = 100f;

        [SerializeField] private float _iconDuration = 0.6f;

        private Sequence _tutorialSequence;
        private Sequence _iconSequence;
        private Tween _circleTween;
        private Vector3 _circleInitialScale;
        private Vector2 _iconInitialPosition;
        private Color _iconInitialColor;
        private bool _iconPlayedOnForwardPass;

        private void Start()
        {
            if (_objHand == null || _circle == null)
            {
                return;
            }

            _circleInitialScale = _circle.localScale;

            if (_arrivalIcon != null)
            {
                _iconInitialPosition = _arrivalIcon.rectTransform.anchoredPosition;
                _iconInitialColor = _arrivalIcon.color;
                _arrivalIcon.gameObject.SetActive(false);
            }

            PlayTutorial();
        }

        private void PlayTutorial()
        {
            Vector2 circlePosition = _circle.anchoredPosition;
            _objHand.anchoredPosition = circlePosition + _handStartOffset;
            _circle.localScale = Vector3.zero;

            _tutorialSequence = DOTween.Sequence()
                .Append(_objHand.DOAnchorPos(circlePosition, _moveDurationHand).SetEase(_moveEase))
                .AppendCallback(PlayArrivalIcon)
                .SetLoops(-1, LoopType.Yoyo)
                .OnStepComplete(() =>
                {
                    if (_tutorialSequence.CompletedLoops() % 2 == 0)
                    {
                        _iconPlayedOnForwardPass = false;
                    }
                })
                .SetUpdate(true);

            _circleTween = _circle
                .DOScale(_circleInitialScale, _moveDurationHand)
                .SetEase(_scaleEase)
                .SetLoops(-1, LoopType.Restart)
                .SetUpdate(true);
        }

        private void PlayArrivalIcon()
        {
            if (_arrivalIcon == null || _iconPlayedOnForwardPass)
            {
                return;
            }

            _iconPlayedOnForwardPass = true;
            _iconSequence?.Kill();

            RectTransform iconRect = _arrivalIcon.rectTransform;
            Color visibleColor = _iconInitialColor;
            visibleColor.a = 1f;

            iconRect.anchoredPosition = _iconInitialPosition;
            _arrivalIcon.color = visibleColor;
            _arrivalIcon.gameObject.SetActive(true);

            _iconSequence = DOTween.Sequence()
                .Append(iconRect.DOAnchorPosY(_iconInitialPosition.y + _iconRiseDistance, _iconDuration)
                    .SetEase(Ease.OutQuad))
                .Join(_arrivalIcon.DOFade(0f, _iconDuration).SetEase(Ease.InQuad))
                .OnComplete(() => _arrivalIcon.gameObject.SetActive(false))
                .SetUpdate(true);
        }

        private void OnDestroy()
        {
            _tutorialSequence?.Kill();
            _iconSequence?.Kill();
            _circleTween?.Kill();

            if (_circle != null)
            {
                _circle.localScale = _circleInitialScale;
            }

            if (_arrivalIcon != null)
            {
                _arrivalIcon.rectTransform.anchoredPosition = _iconInitialPosition;
                _arrivalIcon.color = _iconInitialColor;
            }
        }
    }
}
