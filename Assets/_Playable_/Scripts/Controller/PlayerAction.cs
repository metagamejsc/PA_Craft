using System;
using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Camera _aimCamera;

        [SerializeField] private Animator _animator;
        [SerializeField] private PlayerController _playerController;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private GameController _gameController;
        [SerializeField] private Button _btnFire;
        [SerializeField] private GameObject _crosshair;

        [Header("Weapon")] [SerializeField] private GameObject _weaponInHand;
        [SerializeField] private GameObject _weaponOnBack;
        [SerializeField] private Transform _muzzle;
        [SerializeField] private float _runSpeedThreshold = 0.1f;

        [Header("Aim")] [SerializeField] private float _maxRange = 50f;
        [SerializeField] private float _aimAssistRadius = 0.35f;
        [SerializeField] private LayerMask _monsterMask;

        [Header("Shot Camera")] [SerializeField]
        private Transform _shotCameraAnchor;

        [SerializeField] private float _cameraMoveDuration = 0.5f;
        [SerializeField] private Ease _cameraEase = Ease.OutCubic;
        [SerializeField] private float _shootYawOffset = 40f;
        [SerializeField] private float _playerRotateDuration = 0.4f;

        [Header("Bullet")] [SerializeField] private Bullet _bulletPrefab;
        [SerializeField] private float _bulletSpeed = 60f;
        [SerializeField] private ParticleSystem _impactVfx;

        [Header("Feedback")] [SerializeField] private string _shootTriggerParam = "shoot";
        [SerializeField] private AudioClip _shootClip;
        [SerializeField] private float _shootAnimDelay = 0.2f;
        [SerializeField] private float _resultDelay = 0.15f;

        private int _shootTriggerHash;
        private bool _hasShootTrigger;
        private bool _hasFired;
        private bool _isWin;
        private bool _isWeaponOnBack;
        private Vector3 _impactPoint;
        private Monster _hitMonster;
        private Sequence _cameraSequence;
        private Tween _playerRotateTween;
        private Coroutine _shotRoutine;

        public event Action OnFired;

        public bool HasFired => _hasFired;

        private void Awake()
        {
            if (_aimCamera == null) _aimCamera = Camera.main;
            if (_playerController == null) _playerController = GetComponent<PlayerController>();
            if (_gameController == null) _gameController = FindObjectOfType<GameController>();

            _hasShootTrigger = _animator != null && !string.IsNullOrEmpty(_shootTriggerParam);
            if (_hasShootTrigger) _shootTriggerHash = Animator.StringToHash(_shootTriggerParam);
        }

        private void Start()
        {
            if (_btnFire != null) _btnFire.onClick.AddListener(Fire);

            ApplyWeaponSlot(false);
        }

        private void Update()
        {
#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.F)) Fire();
#endif

            UpdateWeaponSlot();
        }

        private void OnDestroy()
        {
            if (_btnFire != null) _btnFire.onClick.RemoveListener(Fire);

            _cameraSequence?.Kill();
            _playerRotateTween?.Kill();
            if (_shotRoutine != null) StopCoroutine(_shotRoutine);
        }

        public void Fire()
        {
            if (_hasFired || _aimCamera == null) return;

            _hasFired = true;
            OnFired?.Invoke();

            Aim();
            LockInput();

            _shotRoutine = StartCoroutine(ShotSequence());
        }

        private void UpdateWeaponSlot()
        {
            if (_hasFired || _playerController == null) return;

            Vector3 horizontalVelocity = _playerController.Velocity;
            horizontalVelocity.y = 0f;

            bool shouldBeOnBack = horizontalVelocity.magnitude > _runSpeedThreshold;
            if (shouldBeOnBack == _isWeaponOnBack) return;

            ApplyWeaponSlot(shouldBeOnBack);
        }

        private void ApplyWeaponSlot(bool onBack)
        {
            _isWeaponOnBack = onBack;

            if (_weaponOnBack != null) _weaponOnBack.SetActive(onBack);
            if (_weaponInHand != null) _weaponInHand.SetActive(!onBack);
        }

        private void LockInput()
        {
            if (_btnFire != null) _btnFire.interactable = false;
            if (_crosshair != null) _crosshair.SetActive(false);
            if (_playerController != null) _playerController.IsWorking = false;
        }

        private IEnumerator ShotSequence()
        {
            yield return RotatePlayerForShot();

            yield return MoveCameraToShotAnchor();

            ApplyWeaponSlot(false);
            PlayShootFeedback();

            if (_shootAnimDelay > 0f) yield return new WaitForSeconds(_shootAnimDelay);

            LaunchBullet();
            _shotRoutine = null;
        }

        private IEnumerator RotatePlayerForShot()
        {
            Vector3 shootDirection = _impactPoint - transform.position;
            shootDirection.y = 0f;

            float shootYaw = shootDirection.sqrMagnitude > 0.0001f
                ? Mathf.Atan2(shootDirection.x, shootDirection.z) * Mathf.Rad2Deg
                : transform.eulerAngles.y;

            _playerRotateTween = transform
                .DORotate(
                    new Vector3(0f, shootYaw + _shootYawOffset, 0f),
                    _playerRotateDuration,
                    RotateMode.Fast)
                .SetEase(_cameraEase);

            yield return _playerRotateTween.WaitForCompletion();
        }

        private IEnumerator MoveCameraToShotAnchor()
        {
            if (_shotCameraAnchor == null) yield break;

            if (_cameraController != null) _cameraController.SetTarget(null);

            Transform cameraTransform = _aimCamera.transform;

            _cameraSequence = DOTween.Sequence()
                .Append(cameraTransform
                    .DOMove(_shotCameraAnchor.position, _cameraMoveDuration)
                    .SetEase(_cameraEase))
                .Join(cameraTransform
                    .DORotateQuaternion(_shotCameraAnchor.rotation, _cameraMoveDuration)
                    .SetEase(_cameraEase));

            yield return _cameraSequence.WaitForCompletion();
        }

        private void PlayShootFeedback()
        {
            if (_hasShootTrigger) _animator.SetTrigger(_shootTriggerHash);

            if (_shootClip != null && AudioManager.Instance != null)
            {
                AudioManager.Instance.PlaySound(_shootClip);
            }
        }


        private void Aim()
        {
            Transform cameraTransform = _aimCamera.transform;
            Vector3 origin = cameraTransform.position;
            Vector3 direction = cameraTransform.forward;

            int castMask = _monsterMask.value;

            RaycastHit[] hits = Physics.SphereCastAll(
                origin,
                _aimAssistRadius,
                direction,
                _maxRange,
                castMask,
                QueryTriggerInteraction.Ignore);

            bool hasHit = false;
            float nearestDistance = float.MaxValue;
            RaycastHit nearestHit = default;

            for (int index = 0; index < hits.Length; index++)
            {
                RaycastHit candidate = hits[index];

                if (candidate.collider.transform.IsChildOf(transform)) continue;
                if (candidate.distance >= nearestDistance) continue;

                nearestDistance = candidate.distance;
                nearestHit = candidate;
                hasHit = true;
            }

            if (!hasHit)
            {
                _isWin = false;
                _hitMonster = null;
                _impactPoint = origin + direction * _maxRange;
                return;
            }

            _isWin = IsMonster(nearestHit.collider);
            _hitMonster = _isWin
                ? nearestHit.collider.GetComponentInParent<Monster>()
                : null;

            _impactPoint = nearestHit.distance > 0f
                ? nearestHit.point
                : nearestHit.collider.bounds.center;
        }

        private bool IsMonster(Collider hitCollider)
        {
            return (_monsterMask.value & (1 << hitCollider.gameObject.layer)) != 0;
        }

        private void LaunchBullet()
        {
            if (_bulletPrefab == null || _muzzle == null)
            {
                Invoke(nameof(ResolveResult), _resultDelay);
                return;
            }

            Bullet bullet = Instantiate(_bulletPrefab, _muzzle.position, _muzzle.rotation);
            bullet.Launch(_impactPoint, _bulletSpeed, ResolveResult);
        }

        private void ResolveResult()
        {
            if (_impactVfx != null)
            {
                _impactVfx.Play();
            }

            if (GameManager.Instance == null)
            {
                Debug.LogWarning("GameManager not found, cannot show result panel.");
                return;
            }

            if (_isWin && _gameController != null)
            {
                _gameController.PlayWinSequence(_hitMonster);
            }
            else if (_isWin)
            {
                _hitMonster?.PlayDeath();
                GameManager.Instance.ShowWinPanel();
            }
            else GameManager.Instance.ShowFailPanel();
        }
    }
}
