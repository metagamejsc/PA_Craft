using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class Arrow : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Camera _targetCamera;

        [SerializeField] private Transform _targetPosition;

        [Header("Movement")] [SerializeField, Min(0f)]
        private float _startHeight;

        [SerializeField, Min(0f)] private float _endHeight;

        [SerializeField, Min(0.01f)] private float _moveDuration = 0.8f;

        [Header("Facing")] [SerializeField] private float _yawOffset;

        private Tween _moveTween;

        private void Awake()
        {
            if (_targetCamera == null) _targetCamera = Camera.main;
        }

        private void Start()
        {
            if (_targetPosition == null) return;

            Vector3 destination = _targetPosition.localPosition;
            transform.localPosition = new Vector3(destination.x, _startHeight, destination.z);
            _moveTween = transform
                .DOLocalMoveY(_endHeight, _moveDuration)
                .SetEase(Ease.Linear).SetLoops(-1, LoopType.Yoyo);
        }

        private void LateUpdate()
        {
            if (_targetCamera == null) return;

            Vector3 lookDirection = _targetCamera.transform.position - transform.position;
            lookDirection.y = 0f;
            if (lookDirection.sqrMagnitude <= 0.0001f) return;

            transform.rotation = Quaternion.LookRotation(lookDirection, Vector3.up)
                                 * Quaternion.Euler(0f, _yawOffset, 0f);
        }

        private void OnDestroy()
        {
            _moveTween?.Kill();
        }
    }
}