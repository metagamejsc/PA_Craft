using DG.Tweening;
using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public class Monster : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Animator _animator;

        [Header("Animation")] [SerializeField] private string _isRunParam = "IsRun";

        [Header("Wander")] [SerializeField] private float _moveSpeed = 1.5f;
        [SerializeField] private float _rotationSmooth = 8f;
        [SerializeField] private float _wanderRadius = 3f;
        [SerializeField] private Vector2 _idleDurationRange = new Vector2(0.8f, 2.5f);
        [SerializeField] private float _arriveDistance = 0.2f;
        [SerializeField] private float _moveTimeout = 6f;
        [SerializeField] private int _maxSamplePerTarget = 8;

        [Header("Ground")] [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private float _groundRayHeight = 5f;
        [SerializeField] private float _groundRayLength = 20f;

        [Tooltip("Bật: raycast mỗi frame khi đi (địa hình dốc). Tắt: nội suy độ cao 2 đầu quãng đường - nhẹ hơn nhiều")]
        [SerializeField]
        private bool _raycastWhileMoving = false;

        [Header("Spawn")] [SerializeField] private float _spawnScaleDuration = 0.35f;
        [SerializeField] private Ease _spawnScaleEase = Ease.OutBack;

        [Header("Spawn VFX")] [SerializeField] private GameObject _spawnVfxPrefab;
        [SerializeField] private Vector3 _spawnVfxOffset = Vector3.zero;
        [SerializeField] private float _spawnVfxLifeTime = 2f;
        [SerializeField] private bool _spawnVfxFollowMonster = false;

        [Tooltip("Chỉ bật khi prefab VFX tắt Play On Awake - tốn thêm 1 lần quét component")] [SerializeField]
        private bool _restartParticlesOnSpawn = false;

        private Transform _transform;
        private Vector3 _homePosition;
        private Vector3 _targetPosition;
        private Vector3 _baseScale;
        private float _arriveDistanceSqr;
        private float _moveStartHeight;
        private float _moveFlatDistance;
        private float _idleTimer;
        private float _moveTimer;
        private bool _isMoving;
        private bool _isSpawned;
        private bool _hasAnimator;
        private bool _isRunApplied;
        private int _isRunParamHash;
        private Tween _spawnTween;
        private GameObject _spawnVfxInstance;
        private ParticleSystem[] _spawnVfxParticles;
        private float _spawnVfxHideTime;

        public bool IsMoving => _isMoving;

        private void Awake()
        {
            _transform = transform;

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;

            if (_hasAnimator)
            {
                _isRunParamHash = Animator.StringToHash(_isRunParam);
            }

            _baseScale = _transform.localScale;
            _arriveDistanceSqr = _arriveDistance * _arriveDistance;
        }

        private void Update()
        {
            if (_spawnVfxHideTime > 0f && Time.time >= _spawnVfxHideTime)
            {
                _spawnVfxHideTime = 0f;

                if (_spawnVfxInstance != null)
                {
                    _spawnVfxInstance.SetActive(false);
                }
            }

            if (!_isSpawned)
            {
                return;
            }

            if (_isMoving)
            {
                UpdateMove();
            }
            else
            {
                UpdateIdle();
            }
        }

        private void OnDestroy()
        {
            _spawnTween?.Kill();

            if (_spawnVfxInstance != null && !_spawnVfxFollowMonster)
            {
                Destroy(_spawnVfxInstance);
            }
        }

        /// <summary>
        /// Đặt quái xuống map tại vị trí world tương ứng với điểm player tap trên màn hình.
        /// </summary>
        public void Spawn(Vector3 worldPosition, float wanderRadiusOverride = -1f)
        {
            if (wanderRadiusOverride > 0f)
            {
                _wanderRadius = wanderRadiusOverride;
            }

            _transform.position = SnapToGround(worldPosition);
            _transform.rotation = Quaternion.Euler(0f, Random.Range(0f, 360f), 0f);

            _homePosition = _transform.position;
            _isSpawned = true;

            DebugScale("Spawn");

            // EnterIdle();
            // PlaySpawnScale();
            // PlaySpawnVfx();
        }

        private void DebugScale(string point)
        {
            Camera cam = Camera.main;
            float distanceToCamera = cam != null
                ? Vector3.Distance(cam.transform.position, transform.position)
                : -1f;

            Debug.Log(
                $"[MONSTER SCALE] {point}\n" +
                $"name = {name}\n" +
                $"localScale = {transform.localScale}\n" +
                $"lossyScale = {transform.lossyScale}\n" +
                $"parent = {(transform.parent != null ? transform.parent.name : "NULL")}\n" +
                $"parentLocalScale = {(transform.parent != null ? transform.parent.localScale.ToString() : "NULL")}\n" +
                $"parentLossyScale = {(transform.parent != null ? transform.parent.lossyScale.ToString() : "NULL")}\n" +
                $"model localScale = {_animator.transform.localScale.ToString()}\n" +
                $"model lossyScale = {_animator.transform.lossyScale.ToString()}\n" +
                $"position = {transform.position}\n" +
                $"--- context ---\n" +
                $"Screen = {Screen.width}x{Screen.height}, aspect = {(float)Screen.width / Screen.height:F3}\n" +
                $"dpi = {Screen.dpi}\n" +
                $"cam = {(cam != null ? cam.name : "NULL")}, fov = {(cam != null ? cam.fieldOfView : -1f)}, " +
                $"orthographic = {(cam != null && cam.orthographic)}\n" +
                $"distanceToCamera = {distanceToCamera}"
            );
        }

        /// <summary>
        /// Tắt quái để trả về pool. GameController giữ lại instance thay vì Destroy.
        /// </summary>
        public void Despawn()
        {
            _isSpawned = false;
            _isMoving = false;
            _spawnTween?.Kill();
            _transform.localScale = _baseScale;

            if (_spawnVfxInstance != null)
            {
                _spawnVfxHideTime = 0f;
                _spawnVfxInstance.SetActive(false);
            }

            gameObject.SetActive(false);
        }

        private void PlaySpawnScale()
        {
            if (_spawnScaleDuration <= 0f)
            {
                return;
            }

            _spawnTween?.Kill();
            _transform.localScale = Vector3.zero;
            _spawnTween = _transform
                .DOScale(_baseScale, _spawnScaleDuration)
                .SetEase(_spawnScaleEase).OnComplete(() =>
                {
                    Debug.Log("base scale: " + _baseScale);
                    Debug.Log("local scale: " + transform.localScale);
                });
        }

        /// <summary>
        /// Bật VFX spawn ngay dưới chân quái (vị trí chân = điểm đã snap xuống ground).
        /// Instance được tạo 1 lần rồi tái sử dụng, không Instantiate/Destroy mỗi lần spawn.
        /// </summary>
        private void PlaySpawnVfx()
        {
            if (_spawnVfxPrefab == null)
            {
                return;
            }

            if (_spawnVfxInstance == null)
            {
                _spawnVfxInstance = Instantiate(
                    _spawnVfxPrefab,
                    _transform.position + _spawnVfxOffset,
                    Quaternion.identity,
                    _spawnVfxFollowMonster ? _transform : null);

                if (_restartParticlesOnSpawn)
                {
                    _spawnVfxParticles = _spawnVfxInstance.GetComponentsInChildren<ParticleSystem>(true);
                }
            }
            else
            {
                _spawnVfxInstance.SetActive(false);
                _spawnVfxInstance.transform.position = _transform.position + _spawnVfxOffset;
            }

            _spawnVfxInstance.SetActive(true);

            if (_spawnVfxParticles != null)
            {
                for (int i = 0; i < _spawnVfxParticles.Length; i++)
                {
                    _spawnVfxParticles[i].Play();
                }
            }

            _spawnVfxHideTime = _spawnVfxLifeTime > 0f ? Time.time + _spawnVfxLifeTime : 0f;
        }

        private void EnterIdle()
        {
            SetRunning(false);
            _idleTimer = Random.Range(_idleDurationRange.x, _idleDurationRange.y);
        }

        private void UpdateIdle()
        {
            _idleTimer -= Time.deltaTime;

            if (_idleTimer > 0f)
            {
                return;
            }

            if (!TryPickWanderTarget(out _targetPosition))
            {
                EnterIdle();
                return;
            }

            Vector3 position = _transform.position;
            Vector3 flatDelta = _targetPosition - position;
            flatDelta.y = 0f;

            _moveStartHeight = position.y;
            _moveFlatDistance = flatDelta.magnitude;
            _moveTimer = _moveTimeout;

            SetRunning(true);
        }

        private void UpdateMove()
        {
            float deltaTime = Time.deltaTime;
            _moveTimer -= deltaTime;

            Vector3 position = _transform.position;
            Vector3 toTarget = _targetPosition - position;
            toTarget.y = 0f;

            float flatDistanceSqr = toTarget.sqrMagnitude;

            if (flatDistanceSqr <= _arriveDistanceSqr || _moveTimer <= 0f)
            {
                EnterIdle();
                return;
            }

            float flatDistance = Mathf.Sqrt(flatDistanceSqr);
            Vector3 direction = toTarget / flatDistance;
            float step = _moveSpeed * deltaTime;

            RotateTowards(direction);

            Vector3 nextPosition = position + direction * step;

            if (_raycastWhileMoving)
            {
                nextPosition = SnapToGround(nextPosition);
            }
            else if (_moveFlatDistance > 0.0001f)
            {
                float progress = 1f - Mathf.Max(flatDistance - step, 0f) / _moveFlatDistance;
                nextPosition.y = Mathf.Lerp(_moveStartHeight, _targetPosition.y, progress);
            }

            _transform.position = nextPosition;
        }

        private void RotateTowards(Vector3 direction)
        {
            Quaternion targetRotation = Quaternion.LookRotation(direction, Vector3.up);

            _transform.rotation = Quaternion.Slerp(
                _transform.rotation,
                targetRotation,
                Time.deltaTime * _rotationSmooth);
        }

        private bool TryPickWanderTarget(out Vector3 target)
        {
            Vector3 position = _transform.position;

            for (int i = 0; i < _maxSamplePerTarget; i++)
            {
                Vector2 offset = Random.insideUnitCircle * _wanderRadius;
                Vector3 candidate = _homePosition + new Vector3(offset.x, 0f, offset.y);

                if (!TryGetGroundPoint(candidate, out Vector3 groundPoint))
                {
                    continue;
                }

                float flatX = groundPoint.x - position.x;
                float flatZ = groundPoint.z - position.z;

                if (flatX * flatX + flatZ * flatZ < _arriveDistanceSqr)
                {
                    continue;
                }

                target = groundPoint;
                return true;
            }

            target = position;
            return false;
        }

        private Vector3 SnapToGround(Vector3 position)
        {
            return TryGetGroundPoint(position, out Vector3 groundPoint)
                ? groundPoint
                : position;
        }

        private bool TryGetGroundPoint(Vector3 position, out Vector3 groundPoint)
        {
            Vector3 origin = position;
            origin.y += _groundRayHeight;

            if (Physics.Raycast(
                    origin,
                    Vector3.down,
                    out RaycastHit hit,
                    _groundRayLength,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                groundPoint = hit.point;
                return true;
            }

            groundPoint = position;
            return false;
        }

        private void SetRunning(bool isRunning)
        {
            _isMoving = isRunning;

            if (!_hasAnimator || _isRunApplied == isRunning)
            {
                return;
            }

            _animator.SetBool(_isRunParamHash, isRunning);
            _isRunApplied = isRunning;
        }

#if UNITY_EDITOR
        private void OnValidate()
        {
            _arriveDistanceSqr = _arriveDistance * _arriveDistance;
        }

        private void OnDrawGizmosSelected()
        {
            Gizmos.color = new Color(1f, 0.5f, 0f, 0.35f);
            Vector3 center = Application.isPlaying ? _homePosition : transform.position;
            Gizmos.DrawWireSphere(center, _wanderRadius);
        }
#endif
    }
}