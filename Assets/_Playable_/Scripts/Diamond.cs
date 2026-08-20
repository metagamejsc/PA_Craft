using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class Diamond : MonoBehaviour
    {
        [SerializeField, Min(0f)] private float moveDistance = 0.5f;
        [SerializeField, Min(0.01f)] private float moveDuration = 1f;
        [SerializeField] private Vector3 rotationAmount = new Vector3(0f, 360f, 0f);
        [SerializeField, Min(0.01f)] private float rotationDuration = 2f;

        private Vector3 startLocalPosition;
        private Tween moveTween;
        private Tween rotationTween;

        private void Awake()
        {
            startLocalPosition = transform.localPosition;
        }

        private void OnEnable()
        {
            transform.localPosition = startLocalPosition;

            moveTween = transform
                .DOLocalMoveY(startLocalPosition.y + moveDistance, moveDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);

            rotationTween = transform
                .DOLocalRotate(rotationAmount, rotationDuration, RotateMode.FastBeyond360)
                .SetRelative()
                .SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Restart);
        }

        private void OnDisable()
        {
            moveTween?.Kill();
            rotationTween?.Kill();
        }
    }
}