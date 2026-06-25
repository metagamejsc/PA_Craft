using DG.Tweening;
using TMPro;
using UnityEngine;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Gameplay")] [SerializeField] private Camera _raycastCamera;
        [SerializeField] private LayerMask _targetLayer;
        [SerializeField] private float _rayDistance = 100f;
        [SerializeField] private Player _player;
        [SerializeField] private Monster _monster;
        [SerializeField] private GameObject _allTargets;
        [SerializeField] private TMP_Text _txt;
        [SerializeField] private GameObject _hand;
        [SerializeField] private Transform _handPoint1;
        [SerializeField] private Transform _handPoint2;
        [SerializeField] private Transform _handPoint3;

        [Header("Camera Shake")] [SerializeField]
        private float _cameraShakeStrength = 0.3f;

        [SerializeField] private float _cameraShakeDuration = 0.2f;
        [SerializeField] private float _txtPulseScale = 1.1f;
        [SerializeField] private float _txtPulseDuration = 0.45f;
        [SerializeField] private float _handMoveDuration = 0.35f;
        [SerializeField] private float _handTapScale = 0.85f;
        [SerializeField] private float _handTapDuration = 0.12f;
        [SerializeField] private float _handPauseDuration = 0.12f;

        private bool _isSelectBow = true;
        private Tween _cameraShakeTween;
        private Tween _txtPulseTween;
        private Sequence _handGuideSequence;

        protected void Start()
        {
            _player.StartIdleBounce();
            SetText("99% Choose Wrong!");
            StartTxtPulse();
            StartHandGuide();
        }

        private void Update()
        {
            if (!TryGetPointerDownPosition(out Vector3 screenPosition) || !_isSelectBow)
            {
                return;
            }

            Camera raycastCamera = GetRaycastCamera();

            Ray ray = raycastCamera.ScreenPointToRay(screenPosition);
            if (Physics.Raycast(ray, out RaycastHit hit, _rayDistance, _targetLayer))
            {
                Target target = hit.collider.GetComponent<Target>();
                if (target != null)
                {
                    _isSelectBow = false;
                    StopHandGuide();
                    AttackMonster(target.Type);
                    _allTargets.SetActive(false);
                    StopHandGuide();
                    if (target.Type == BowType.BowVip)
                    {
                        SetText("SMART CHOICE");
                    }
                    else
                    {
                        SetText("TOO WEAK");
                    }
                }
            }
        }

        private bool TryGetPointerDownPosition(out Vector3 screenPosition)
        {
            screenPosition = default;

            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);
                if (touch.phase == TouchPhase.Began)
                {
                    screenPosition = touch.position;
                    return true;
                }
            }

            if (Input.GetMouseButtonDown(0))
            {
                screenPosition = Input.mousePosition;
                return true;
            }

            return false;
        }

        private Camera GetRaycastCamera()
        {
            if (_raycastCamera != null)
            {
                return _raycastCamera;
            }

            if (Camera.main != null)
            {
                return Camera.main;
            }

            return Camera.current;
        }

        private void AttackMonster(BowType bowType)
        {
            _player.SelectBow(bowType);
            _monster.JumpDown(AimMonster);
        }

        private void ShakeCamera()
        {
            Camera targetCamera = GetRaycastCamera();
            if (targetCamera == null)
            {
                Debug.LogWarning("GameController: missing camera for shake.");
                return;
            }

            Transform cameraTransform = targetCamera.transform;
            cameraTransform.DOKill();

            _cameraShakeTween?.Kill();
            _cameraShakeTween = cameraTransform
                .DOShakePosition(_cameraShakeDuration, _cameraShakeStrength)
                .SetUpdate(true)
                .OnKill(() => _cameraShakeTween = null);
        }

        private void AimMonster()
        {
            ShakeCamera();
            DOVirtual.DelayedCall(0.5f,
                () =>
                {
                    _player.RotateToShootAngle(
                        () =>
                        {
                            _monster.Attack(() =>
                            {
                                GameManager.Instance.ShowFailPanel();
                                GameManager.Instance.EndGame();
                            });
                        },
                        () =>
                        {
                            _monster.Death(() =>
                            {
                                GameManager.Instance.ShowWinPanel();
                                GameManager.Instance.EndGame();
                            });
                        });
                });
        }

        private void SetText(string text)
        {
            _txt.text = text;
        }

        private void StartTxtPulse()
        {
            if (_txt == null)
            {
                return;
            }

            _txtPulseTween?.Kill();
            _txt.transform.localScale = Vector3.one;
            _txtPulseTween = _txt.transform
                .DOScale(_txtPulseScale, _txtPulseDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _txtPulseTween = null);
        }

        private void StartHandGuide()
        {
            if (_hand == null || _handPoint1 == null || _handPoint2 == null || _handPoint3 == null)
            {
                return;
            }

            Transform handTransform = _hand.transform;
            _handGuideSequence?.Kill();

            _hand.SetActive(true);
            handTransform.position = _handPoint1.position;
            handTransform.localScale = Vector3.one;

            _handGuideSequence = DOTween.Sequence()
                .AppendCallback(() => MoveHandToPoint(handTransform, _handPoint1))
                .AppendInterval(_handMoveDuration + (_handTapDuration * 2f) + _handPauseDuration)
                .AppendCallback(() => MoveHandToPoint(handTransform, _handPoint2))
                .AppendInterval(_handMoveDuration + (_handTapDuration * 2f) + _handPauseDuration)
                .AppendCallback(() => MoveHandToPoint(handTransform, _handPoint3))
                .AppendInterval(_handMoveDuration + (_handTapDuration * 2f) + _handPauseDuration)
                .SetLoops(-1)
                .OnKill(() => _handGuideSequence = null);
        }

        private void MoveHandToPoint(Transform handTransform, Transform targetPoint)
        {
            handTransform.DOMove(targetPoint.position, _handMoveDuration)
                .SetEase(Ease.OutSine)
                .OnComplete(() =>
                {
                    handTransform
                        .DOScale(_handTapScale, _handTapDuration)
                        .SetEase(Ease.InSine)
                        .OnComplete(() =>
                        {
                            handTransform
                                .DOScale(Vector3.one, _handTapDuration)
                                .SetEase(Ease.OutSine);
                        });
                });
        }

        private void StopHandGuide()
        {
            _handGuideSequence?.Kill();
            _handGuideSequence = null;

            if (_hand == null)
            {
                return;
            }

            _hand.transform.DOKill();
            _hand.transform.localScale = Vector3.one;
            _hand.SetActive(false);
        }

        private void OnDisable()
        {
            _cameraShakeTween?.Kill();
            _cameraShakeTween = null;
            _txtPulseTween?.Kill();
            _txtPulseTween = null;
            StopHandGuide();
        }
    }
}