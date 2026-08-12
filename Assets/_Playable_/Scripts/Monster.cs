using System.Collections.Generic;
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

        [Tooltip("Tên param tấn công trong Animator. Asset hiện không đồng nhất giữa các prefab quái - " +
                 "Spider dùng Bool \"IsAttack\", Zombie/Golem dùng Trigger \"Attack\" - chỉnh đúng theo prefab.")]
        [SerializeField]
        private string _isAttackParam = "IsAttack";

        [SerializeField] private bool _attackParamIsTrigger = false;

        [Tooltip("Tên param chết trong Animator. Spider dùng Bool \"IsDeath\", Zombie dùng Trigger \"Dead\".")]
        [SerializeField]
        private string _isDeathParam = "IsDeath";

        [SerializeField] private bool _deathParamIsTrigger = false;

        [Header("Combat")] [SerializeField] private float _maxHealth = 100f;
        [SerializeField] private float _attackDamage = 20f;
        [SerializeField] private float _attackRange = 1.5f;
        [SerializeField] private float _attackCooldown = 1.5f;

        [Tooltip("Phát anim death xong đợi ngần này rồi Destroy hẳn khỏi map")] [SerializeField]
        private float _deathDespawnDelay = 1.5f;

        [Tooltip("Đuổi cùng 1 địch quá lâu mà chưa vào được _attackRange (thường do collider 2 con " +
                 "chạm nhau chặn vật lý trước khi tâm-tới-tâm đủ gần) thì ép dừng lại đánh luôn, " +
                 "không đứng chạy tại chỗ vô thời hạn.")]
        [SerializeField]
        private float _maxChaseDuration = 2.5f;

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

        // Registry toàn cục - mọi Monster (không phân biệt prefab/loại) tự đăng ký lúc Spawn() và tự gỡ
        // lúc chết, dùng để mỗi con tự dò quái khác gần nhất làm mục tiêu tấn công.
        private static readonly List<Monster> _activeMonsters = new List<Monster>();

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
        private int _isAttackParamHash;
        private int _isDeathParamHash;
        private Tween _spawnTween;
        private GameObject _spawnVfxInstance;
        private ParticleSystem[] _spawnVfxParticles;
        private float _spawnVfxHideTime;

        private float _currentHealth;
        private bool _isDead;
        private bool _isAttacking;
        private Monster _currentEnemy;
        private float _attackTimer;
        private bool _resetAttackBool;
        private float _deathDestroyTime;
        private int _stateBeforeDeathHash;
        private bool _deathAnimationStarted;
        private float _chaseStartTime;

        public bool IsMoving => _isMoving;
        public bool IsDead => _isDead;

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
                _isAttackParamHash = Animator.StringToHash(_isAttackParam);
                _isDeathParamHash = Animator.StringToHash(_isDeathParam);
            }

            _baseScale = _transform.localScale;
            _arriveDistanceSqr = _arriveDistance * _arriveDistance;
            _currentHealth = _maxHealth;
        }

        private void Update()
        {
            ResetAttackAnimationPulse();

            if (_spawnVfxHideTime > 0f && Time.time >= _spawnVfxHideTime)
            {
                _spawnVfxHideTime = 0f;

                if (_spawnVfxInstance != null)
                {
                    _spawnVfxInstance.SetActive(false);
                }
            }

            if (_isDead)
            {
                UpdateDeath();
                return;
            }

            if (!_isSpawned)
            {
                return;
            }

            if (_isAttacking)
            {
                UpdateAttack();
                return;
            }

            if (TryFindNearestEnemy(out Monster enemy))
            {
                if (_currentEnemy != enemy)
                {
                    _currentEnemy = enemy;
                    _chaseStartTime = Time.time;
                }

                UpdateChase(enemy);
                return;
            }

            _currentEnemy = null;

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

            _activeMonsters.Remove(this);

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

            _currentHealth = _maxHealth;
            _isDead = false;
            _isAttacking = false;
            _resetAttackBool = false;
            _currentEnemy = null;

            if (!_activeMonsters.Contains(this))
            {
                _activeMonsters.Add(this);
            }


            // EnterIdle();
            // PlaySpawnScale();
            // PlaySpawnVfx();
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

            _activeMonsters.Remove(this);

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

        #region Combat

        /// <summary>
        /// Quét registry toàn cục tìm quái khác gần nhất - KHÔNG check bán kính/vùng gì cả, chỉ cần còn
        /// sống trên map (không phân biệt loại/prefab) là thành mục tiêu, dù ở bất kỳ đâu trên map.
        /// </summary>
        private bool TryFindNearestEnemy(out Monster enemy)
        {
            enemy = null;

            float bestDistanceSqr = float.MaxValue;
            Vector3 position = _transform.position;

            for (int i = 0; i < _activeMonsters.Count; i++)
            {
                Monster other = _activeMonsters[i];

                if (other == this || other == null || other._isDead)
                {
                    continue;
                }

                float distanceSqr = (other._transform.position - position).sqrMagnitude;

                if (distanceSqr < bestDistanceSqr)
                {
                    bestDistanceSqr = distanceSqr;
                    enemy = other;
                }
            }

            return enemy != null;
        }

        /// <summary>
        /// Đuổi theo địch - raycast ground mỗi frame (khác UpdateMove) vì mục tiêu di chuyển liên tục,
        /// không nội suy được 2 điểm cố định như lúc wander.
        /// </summary>
        private void UpdateChase(Monster enemy)
        {
            Vector3 position = _transform.position;
            Vector3 toEnemy = enemy._transform.position - position;
            toEnemy.y = 0f;

            float distanceSqr = toEnemy.sqrMagnitude;

            if (distanceSqr <= _attackRange * _attackRange)
            {
                EnterAttackState();
                return;
            }

            // Đuổi cùng 1 địch quá lâu mà chưa vào được _attackRange - thường do collider 2 con chạm
            // nhau chặn vật lý trước khi tâm-tới-tâm đủ gần theo lý thuyết. Ép dừng lại đánh luôn thay
            // vì đứng "chạy tại chỗ" (SetRunning true) vô thời hạn không bao giờ vào state tấn công.
            if (Time.time - _chaseStartTime >= _maxChaseDuration)
            {
                Debug.Log(
                    $"[MONSTER COMBAT] {name} đuổi {enemy.name} quá {_maxChaseDuration}s vẫn chưa vào " +
                    $"_attackRange ({_attackRange}), khoảng cách hiện tại = {Mathf.Sqrt(distanceSqr)} - " +
                    $"ép vào tấn công (nghi ngờ bị collider chặn vật lý).");

                EnterAttackState();
                return;
            }

            SetRunning(true);

            float distance = Mathf.Sqrt(distanceSqr);
            Vector3 direction = toEnemy / distance;

            RotateTowards(direction);

            Vector3 nextPosition = position + direction * (_moveSpeed * Time.deltaTime);
            _transform.position = SnapToGround(nextPosition);
        }

        private void EnterAttackState()
        {
            _isAttacking = true;
            _attackTimer = 0f;
            SetRunning(false);
        }

        private void ExitAttackState()
        {
            _isAttacking = false;
            ClearAttackAnimation();
        }

        /// <summary>
        /// [COMBAT DEBUG] Bọc try/catch quanh SetBool/SetTrigger - nếu Inspector cấu hình sai kiểu param
        /// (vd để IsTrigger = false nhưng param thật trong Animator Controller lại là Trigger), Unity ném
        /// AnimatorControllerParameterException. Không bọc thì exception này chặn ngang cả phần logic di
        /// chuyển/damage còn lại trong cùng lệnh gọi, trông giống như quái "không đánh nhau" dù logic đúng.
        /// </summary>
        private void SafeSetAnimatorBool(int paramHash, string paramName, bool value)
        {
            try
            {
                _animator.SetBool(paramHash, value);
            }
            catch (System.Exception e)
            {
                Debug.LogError(
                    $"[MONSTER COMBAT] {name}: SetBool(\"{paramName}\") lỗi - param này trong Animator " +
                    $"Controller thật có thể là Trigger chứ không phải Bool. Đổi cờ IsTrigger tương ứng " +
                    $"trong Inspector. Chi tiết: {e.Message}");
            }
        }

        private void SafeSetAnimatorTrigger(int paramHash, string paramName)
        {
            try
            {
                _animator.SetTrigger(paramHash);
            }
            catch (System.Exception e)
            {
                Debug.LogError(
                    $"[MONSTER COMBAT] {name}: SetTrigger(\"{paramName}\") lỗi - param này trong Animator " +
                    $"Controller thật có thể là Bool chứ không phải Trigger. Đổi cờ IsTrigger tương ứng " +
                    $"trong Inspector. Chi tiết: {e.Message}");
            }
        }

        /// <summary>
        /// Đang tấn công: quay mặt vào địch, cứ _attackCooldown giây phát 1 nhịp đánh + trừ máu địch.
        /// Chỉ thoát tấn công khi địch chết - KHÔNG check lại khoảng cách mỗi frame nữa (trước đây làm
        /// vậy, nhưng 2 con đứng sát nhau dễ bị collider đẩy qua đẩy lại quanh mép _attackRange, khiến
        /// EnterAttackState()/ExitAttackState() gọi lặp liên tục -> IsAttack bị set true/false liên tục
        /// thay vì chỉ 1 lần lúc bắt đầu). Một khi đã cam kết đánh 1 mục tiêu thì đánh tới khi nó chết.
        /// </summary>
        private void UpdateAttack()
        {
            if (_currentEnemy == null || _currentEnemy._isDead)
            {
                ExitAttackState();
                _currentEnemy = null;
                return;
            }

            Vector3 toEnemy = _currentEnemy._transform.position - _transform.position;
            toEnemy.y = 0f;

            if (toEnemy.sqrMagnitude > 0.0001f)
            {
                RotateTowards(toEnemy.normalized);
            }

            _attackTimer -= Time.deltaTime;

            if (_attackTimer > 0f)
            {
                return;
            }

            _attackTimer = _attackCooldown;

            if (_hasAnimator)
            {
                if (_attackParamIsTrigger)
                {
                    SafeSetAnimatorTrigger(_isAttackParamHash, _isAttackParam);
                }
                else
                {
                    SafeSetAnimatorBool(_isAttackParamHash, _isAttackParam, true);
                    _resetAttackBool = true;
                }
            }

            _currentEnemy.TakeDamage(_attackDamage);
        }

        private void ResetAttackAnimationPulse()
        {
            if (!_resetAttackBool)
            {
                return;
            }

            _resetAttackBool = false;

            if (_hasAnimator && !_attackParamIsTrigger)
            {
                SafeSetAnimatorBool(_isAttackParamHash, _isAttackParam, false);
            }
        }

        private void ClearAttackAnimation()
        {
            _resetAttackBool = false;

            if (!_hasAnimator)
            {
                return;
            }

            if (_attackParamIsTrigger)
            {
                _animator.ResetTrigger(_isAttackParamHash);
            }
            else
            {
                SafeSetAnimatorBool(_isAttackParamHash, _isAttackParam, false);
            }
        }

        /// <summary>
        /// Trừ máu quái này - public vì bị gọi từ Monster khác (đối thủ) đang tấn công nó.
        /// </summary>
        public void TakeDamage(float amount)
        {
            if (_isDead)
            {
                return;
            }

            _currentHealth -= amount;

            if (_currentHealth <= 0f)
            {
                Die();
            }
        }

        /// <summary>
        /// Hết máu: phát anim chết, gỡ khỏi registry (không còn ai nhắm nó làm mục tiêu nữa), hẹn giờ
        /// Destroy hẳn khỏi map sau _deathDespawnDelay giây để anim kịp chạy xong.
        /// </summary>
        private void Die()
        {
            if (_isDead)
            {
                return;
            }

            _isDead = true;
            _isMoving = false;
            _isAttacking = false;
            _currentEnemy = null;
            ClearAttackAnimation();

            _activeMonsters.Remove(this);

            if (_hasAnimator)
            {
                _stateBeforeDeathHash = _animator.GetCurrentAnimatorStateInfo(0).fullPathHash;
                _deathAnimationStarted = false;

                if (_deathParamIsTrigger) SafeSetAnimatorTrigger(_isDeathParamHash, _isDeathParam);
                else SafeSetAnimatorBool(_isDeathParamHash, _isDeathParam, true);
            }

            _deathDestroyTime = Time.time + _deathDespawnDelay;
        }

        private void UpdateDeath()
        {
            if (Time.time >= _deathDestroyTime)
            {
                DeactivateAfterDeath();
                return;
            }

            if (!_hasAnimator)
            {
                return;
            }

            AnimatorStateInfo stateInfo = _animator.GetCurrentAnimatorStateInfo(0);

            if (!_deathAnimationStarted)
            {
                if (_animator.IsInTransition(0) || stateInfo.fullPathHash == _stateBeforeDeathHash)
                {
                    return;
                }

                _deathAnimationStarted = true;
            }

            if (!_animator.IsInTransition(0) && stateInfo.normalizedTime >= 1f)
            {
                DeactivateAfterDeath();
            }
        }

        private void DeactivateAfterDeath()
        {
            _isSpawned = false;
            _isMoving = false;
            _isAttacking = false;
            _resetAttackBool = false;
            gameObject.SetActive(false);
        }

        #endregion

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
