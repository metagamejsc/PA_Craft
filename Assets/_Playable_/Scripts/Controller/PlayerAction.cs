using UnityEngine;
using DG.Tweening;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private Transform _visualRoot;

        [Header("Bounce")]
        [SerializeField] private float _bounceHeight = 0.15f;
        [SerializeField] private float _bounceScale = 1.08f;
        [SerializeField] private float _bounceDuration = 0.45f;
        [SerializeField] private Ease _bounceEase = Ease.InOutSine;

        private Tween _bounceTween;
        private Vector3 _startLocalPosition;
        private Vector3 _startLocalScale;

        private void Awake()
        {
            if (_visualRoot == null)
            {
                _visualRoot = transform;
            }

            _startLocalPosition = _visualRoot.localPosition;
            _startLocalScale = _visualRoot.localScale;
        }

        private void OnEnable()
        {
            PlayBounce();
        }

        public void PlayBounce()
        {
            if (_visualRoot == null)
            {
                return;
            }

            _bounceTween?.Kill();
            _visualRoot.localPosition = _startLocalPosition;
            _visualRoot.localScale = _startLocalScale;

            _bounceTween = DOTween.Sequence()
                .Append(_visualRoot.DOLocalMoveY(_startLocalPosition.y + _bounceHeight, _bounceDuration * 0.5f).SetEase(_bounceEase))
                .Join(_visualRoot.DOScale(_startLocalScale * _bounceScale, _bounceDuration * 0.5f).SetEase(_bounceEase))
                .Append(_visualRoot.DOLocalMoveY(_startLocalPosition.y, _bounceDuration * 0.5f).SetEase(_bounceEase))
                .Join(_visualRoot.DOScale(_startLocalScale, _bounceDuration * 0.5f).SetEase(_bounceEase))
                .SetLoops(-1, LoopType.Restart)
                .SetLink(gameObject)
                .OnKill(() => _bounceTween = null);
        }

        public void StopBounce()
        {
            _bounceTween?.Kill();
            _bounceTween = null;

            if (_visualRoot != null)
            {
                _visualRoot.localPosition = _startLocalPosition;
                _visualRoot.localScale = _startLocalScale;
            }
        }

        private void OnDisable()
        {
            StopBounce();
        }
    }
}
