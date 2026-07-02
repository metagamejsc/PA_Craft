using UnityEngine;
using DG.Tweening;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private Transform _moveRoot;
        [SerializeField] private GameObject _humanVisual;
        [SerializeField] private GameObject _dinoVisual;
        [SerializeField] private Animator _humanAnimator;
        [SerializeField] private Animator _dinoAnimator;

        [Header("Animation Params")]
        [SerializeField] private string _speedParam = "Speed";
        [SerializeField] private string _transformTrigger = "Transform";
        [SerializeField] private string _attackTrigger = "Attack";
        [SerializeField] private string _roarTrigger = "Roar";

        [Header("Timing")]
        [SerializeField] private float _transformDuration = 0.5f;
        [SerializeField] private float _moveDuration = 0.9f;
        [SerializeField] private float _attackDuration = 0.8f;
        [SerializeField] private float _roarDuration = 1f;

        private Tween _moveTween;
        private int _speedParamHash;
        private int _transformTriggerHash;
        private int _attackTriggerHash;
        private int _roarTriggerHash;

        public float TransformDuration => _transformDuration;
        public float AttackDuration => _attackDuration;
        public float RoarDuration => _roarDuration;
        public Transform MoveRoot => _moveRoot != null ? _moveRoot : transform;

        private void Awake()
        {
            _speedParamHash = Animator.StringToHash(_speedParam);
            _transformTriggerHash = Animator.StringToHash(_transformTrigger);
            _attackTriggerHash = Animator.StringToHash(_attackTrigger);
            _roarTriggerHash = Animator.StringToHash(_roarTrigger);

            if (_moveRoot == null)
            {
                _moveRoot = transform;
            }
        }

        public void SetHumanState()
        {
            if (_humanVisual != null)
            {
                _humanVisual.SetActive(true);
            }

            if (_dinoVisual != null)
            {
                _dinoVisual.SetActive(false);
            }

            SetMoveSpeed(0f);
        }

        public void PlayTransform()
        {
            if (_humanAnimator != null)
            {
                _humanAnimator.SetTrigger(_transformTriggerHash);
            }
        }

        public void FinishTransform()
        {
            if (_humanVisual != null)
            {
                _humanVisual.SetActive(false);
            }

            if (_dinoVisual != null)
            {
                _dinoVisual.SetActive(true);
            }

            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetTrigger(_transformTriggerHash);
            }
        }

        public void MoveTo(Transform target, TweenCallback onComplete = null)
        {
            if (target == null || MoveRoot == null)
            {
                onComplete?.Invoke();
                return;
            }

            Vector3 targetPosition = target.position;
            targetPosition.y = MoveRoot.position.y;

            Vector3 lookDirection = targetPosition - MoveRoot.position;
            if (lookDirection.sqrMagnitude > 0.0001f)
            {
                MoveRoot.rotation = Quaternion.LookRotation(lookDirection.normalized, Vector3.up);
            }

            _moveTween?.Kill();
            SetMoveSpeed(1f);
            _moveTween = MoveRoot.DOMove(targetPosition, _moveDuration)
                .SetEase(Ease.Linear)
                .OnComplete(() =>
                {
                    SetMoveSpeed(0f);
                    _moveTween = null;
                    onComplete?.Invoke();
                })
                .OnKill(() =>
                {
                    SetMoveSpeed(0f);
                    _moveTween = null;
                });
        }

        public void PlayAttack()
        {
            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetTrigger(_attackTriggerHash);
            }
        }

        public void PlayRoar()
        {
            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetTrigger(_roarTriggerHash);
            }
        }

        private void SetMoveSpeed(float speed)
        {
            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetFloat(_speedParamHash, speed);
            }
        }

        private void OnDestroy()
        {
            _moveTween?.Kill();
        }
    }
}
