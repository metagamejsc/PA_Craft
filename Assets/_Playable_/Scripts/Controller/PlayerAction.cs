using UnityEngine;
using DG.Tweening;
using System.Collections;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Transform _moveRoot;

        [SerializeField] private GameObject _humanVisual;
        [SerializeField] private GameObject _dinoVisual;
        [SerializeField] private Animator _dinoAnimator;
        [SerializeField] private ParticleSystem _vfxTransform;
        [SerializeField] private ParticleSystem _vfxFire;
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private Transform _transformCameraTarget;
        [SerializeField] private Transform _attackCameraTarget;

        [Header("Animation Params")] [SerializeField]
        private string _speedParam = "Speed";

        [SerializeField] private string _attackTrigger = "Attack";
        [SerializeField] private string _idleTrigger = "Idle";
        [SerializeField] private string _roarTrigger = "Roar";

        [Header("Timing")] [SerializeField] private float _transformDuration = 0.5f;
        [SerializeField] private float _moveDuration = 0.9f;
        [SerializeField] private float _attackDuration = 0.8f;
        [SerializeField] private float _attackToIdleDelay = 1f;
        [SerializeField] private float _roarDuration = 1f;
        [SerializeField] private float _cameraMoveDuration = 0.5f;
        [SerializeField] private float _rotateDuration = 0.2f;
        [SerializeField] private float _moveShakeStrength = 0.08f;
        [SerializeField] private float _moveShakeDuration = 0.12f;
        [SerializeField] private float _moveShakeStepDelay = 0.25f;

        [Header("Audio")] [SerializeField] private AudioClip _dinoRoar;
        [SerializeField] private AudioClip _dinoBoom;
        [SerializeField] private AudioClip _dinoFoot;
        [SerializeField] private AudioClip _dinoFire;

        private Tween _moveTween;
        private Tween _cameraMoveTween;
        private Tween _rotateTween;
        private Tween _attackIdleTween;
        private Coroutine _moveShakeCoroutine;
        private int _speedParamHash;
        private int _attackTriggerHash;
        private int _idleTriggerHash;
        private int _roarTriggerHash;

        public float TransformDuration => _transformDuration;
        public float AttackDuration => _attackDuration;
        public float RoarDuration => _roarDuration;
        public Transform MoveRoot => _moveRoot != null ? _moveRoot : transform;

        private void Awake()
        {
            _speedParamHash = Animator.StringToHash(_speedParam);
            _attackTriggerHash = Animator.StringToHash(_attackTrigger);
            _idleTriggerHash = Animator.StringToHash(_idleTrigger);
            _roarTriggerHash = Animator.StringToHash(_roarTrigger);

            if (_moveRoot == null)
            {
                _moveRoot = transform;
            }

            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;
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

        public void Transform()
        {
            if (_humanVisual != null)
            {
                _humanVisual.SetActive(false);
            }

            if (_dinoVisual != null)
            {
                _dinoVisual.SetActive(true);
            }

            if (_vfxTransform != null)
            {
                _vfxTransform.Play();
            }

            MoveCameraToTransformView();
            AudioManager.Instance.PlaySound(_dinoBoom, 0.7f);
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

            _rotateTween?.Kill();

            if (_dinoVisual != null)
            {
                Vector3 dinoEuler = _dinoVisual.transform.localEulerAngles;
                _rotateTween = _dinoVisual.transform
                    .DOLocalRotate(new Vector3(dinoEuler.x, -90f, dinoEuler.z), _rotateDuration)
                    .SetEase(Ease.InOutSine)
                    .OnComplete(() =>
                    {
                        _rotateTween = null;
                        StartMoveTween(targetPosition, onComplete);
                    })
                    .OnKill(() => _rotateTween = null);
                return;
            }

            StartMoveTween(targetPosition, onComplete);
        }

        private void StartMoveTween(Vector3 targetPosition, TweenCallback onComplete)
        {
            _moveTween?.Kill();
            SetMoveSpeed(1f);
            StartMoveCameraShake();
            _moveTween = MoveRoot.DOMove(targetPosition, _moveDuration)
                .SetEase(Ease.Linear)
                .OnComplete(() =>
                {
                    StopMoveCameraShake();
                    SetMoveSpeed(0f);
                    _moveTween = null;
                    MoveCameraToTarget(_attackCameraTarget);
                    onComplete?.Invoke();
                })
                .OnKill(() =>
                {
                    StopMoveCameraShake();
                    SetMoveSpeed(0f);
                    _moveTween = null;
                });
        }

        public void PlayAttack()
        {
            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetTrigger(_attackTriggerHash);
                DOVirtual.DelayedCall(0.6f, () =>
                {
                    _vfxFire.Play();
                    AudioManager.Instance.PlaySound(_dinoFire);
                });
                _attackIdleTween?.Kill();
                _attackIdleTween = DOVirtual.DelayedCall(_attackDuration + _attackToIdleDelay, () =>
                    {
                        if (_dinoAnimator != null)
                        {
                            _dinoAnimator.SetTrigger(_idleTriggerHash);
                            _vfxFire.Stop();
                        }
                    }).OnKill(() => _attackIdleTween = null)
                    .OnComplete(() => _attackIdleTween = null);
            }
        }

        public void PlayRoar()
        {
            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetTrigger(_roarTriggerHash);
                AudioManager.Instance.PlaySound(_dinoRoar);
            }
        }

        private void SetMoveSpeed(float speed)
        {
            if (_dinoAnimator != null)
            {
                _dinoAnimator.SetFloat(_speedParamHash, speed);
            }
        }

        private void MoveCameraToTransformView()
        {
            MoveCameraToTarget(_transformCameraTarget);
        }

        private void MoveCameraToTarget(Transform target)
        {
            if (_targetCamera == null || target == null)
            {
                return;
            }

            _cameraMoveTween?.Kill();
            Sequence cameraSequence = DOTween.Sequence();
            cameraSequence.Join(_targetCamera.transform.DOMove(target.position, _cameraMoveDuration));
            cameraSequence.Join(
                _targetCamera.transform.DORotateQuaternion(target.rotation, _cameraMoveDuration));
            cameraSequence.SetEase(Ease.InOutSine);
            cameraSequence.OnKill(() => _cameraMoveTween = null);
            cameraSequence.OnComplete(() => _cameraMoveTween = null);
            _cameraMoveTween = cameraSequence;
        }

        private void StartMoveCameraShake()
        {
            StopMoveCameraShake();

            if (_targetCamera == null)
            {
                return;
            }

            _moveShakeCoroutine = StartCoroutine(IEMoveCameraShake());
        }

        private void StopMoveCameraShake()
        {
            if (_moveShakeCoroutine != null)
            {
                StopCoroutine(_moveShakeCoroutine);
                _moveShakeCoroutine = null;
            }

            if (_targetCamera != null)
            {
                _targetCamera.transform.DOKill();
            }
        }

        private IEnumerator IEMoveCameraShake()
        {
            WaitForSeconds waitDelay = new WaitForSeconds(_moveShakeStepDelay);

            while (true)
            {
                if (_targetCamera != null)
                {
                    AudioManager.Instance.PlaySound(_dinoFoot);
                    _targetCamera.transform.DOShakePosition(
                        _moveShakeDuration,
                        _moveShakeStrength,
                        10,
                        90f,
                        false,
                        true);
                }

                yield return waitDelay;
            }
        }

        private void OnDestroy()
        {
            _moveTween?.Kill();
            _cameraMoveTween?.Kill();
            _rotateTween?.Kill();
            _attackIdleTween?.Kill();
            StopMoveCameraShake();
        }
    }
}