using DG.Tweening;
using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public class Monster : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Animator _animator;

        [Header("Type & Data")]
        [Tooltip("Loại quái - quyết định dùng struct data nào bên dưới và tự gắn đúng skill component lúc Awake.")]
        [SerializeField]
        private MonsterType _monsterType;

        [Tooltip("Chỉ điền đúng 1 trong 5 struct bên dưới khớp Monster Type - 4 struct còn lại bỏ trống, không dùng tới.")]
        [Header("Enderman Data")]
        [SerializeField]
        private EndermanData _endermanData;

        [Header("Iron Golem Data")] [SerializeField]
        private IronGolemData _ironGolemData;

        [Header("Creeper Data")] [SerializeField]
        private CreeperData _creeperData;

        [Header("Huggy Data")] [SerializeField]
        private HuggyData _huggyData;

        [Header("Shinsonic Data")] [SerializeField]
        private ShinsonicData _shinsonicData;

        [Header("Animation")] [SerializeField] private string _isRunParam = "IsRun";

        [Tooltip("Tên param chết trong Animator. Spider dùng Bool \"IsDeath\", Zombie dùng Trigger \"Dead\".")]
        [SerializeField]
        private string _isDeathParam = "IsDeath";

        [SerializeField] private bool _deathParamIsTrigger = false;

        [Tooltip("Phát anim death xong đợi ngần này rồi Destroy hẳn khỏi map")] [SerializeField]
        private float _deathDespawnDelay = 1.5f;

        [Header("Wander")]
        [Tooltip("Không set trực tiếp - luôn bị Spawn() ghi đè bằng MoveSpeed trong struct data đúng loại quái.")]
        private float _moveSpeed = 1.5f;

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
        private int _isDeathParamHash;
        private Tween _spawnTween;
        private GameObject _spawnVfxInstance;
        private ParticleSystem[] _spawnVfxParticles;
        private float _spawnVfxHideTime;

        private MonsterHealth _health;
        private MonsterCombat _combat;
        private IMonsterSkill[] _skills = new IMonsterSkill[0];

        private float _deathDestroyTime;
        private int _stateBeforeDeathHash;
        private bool _deathAnimationStarted;

        public bool IsMoving => _isMoving;
        public bool IsDead => _health != null && _health.IsDead;
        public bool IsAnySkillChanneling { get; private set; }

        public MonsterHealth Health => _health;
        public MonsterCombat Combat => _combat;
        public Vector3 Position => _transform.position;
        public MonsterType Type => _monsterType;

        public EndermanData EndermanStats => _endermanData;
        public IronGolemData IronGolemStats => _ironGolemData;
        public CreeperData CreeperStats => _creeperData;
        public HuggyData HuggyStats => _huggyData;
        public ShinsonicData ShinsonicStats => _shinsonicData;

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
                _isDeathParamHash = Animator.StringToHash(_isDeathParam);
            }

            _baseScale = _transform.localScale;
            _arriveDistanceSqr = _arriveDistance * _arriveDistance;

            _health = GetComponent<MonsterHealth>();
            if (_health == null)
            {
                _health = gameObject.AddComponent<MonsterHealth>();
            }

            _combat = GetComponent<MonsterCombat>();
            if (_combat == null)
            {
                _combat = gameObject.AddComponent<MonsterCombat>();
            }

            AutoAttachSkills();
            _skills = GetComponents<IMonsterSkill>();

            _health.Died += OnHealthDied;
        }

        /// <summary>
        /// Tự gắn đúng skill component theo _monsterType nếu prefab chưa gắn sẵn trong Editor - không cần
        /// chỉnh tay từng prefab, chỉ cần đặt đúng _monsterType.
        /// </summary>
        private void AutoAttachSkills()
        {
            switch (_monsterType)
            {
                case MonsterType.Enderman:
                    EnsureSkill<EndermanArmReachSkill>();
                    EnsureSkill<EndermanTeleportSkill>();
                    break;

                case MonsterType.IronGolem:
                    EnsureSkill<IronGolemSlamSkill>();
                    EnsureSkill<IronGolemTntBarrageSkill>();
                    break;

                // Creeper và Huggy không có skill - đòn attack thường của chúng (ném TNT / gây stun)
                // đạt được hoàn toàn bằng cấu hình CreeperData/HuggyData, không cần skill component.

                case MonsterType.Shinsonic:
                    EnsureSkill<ShinsonicTransformSkill>();
                    break;
            }
        }

        private void EnsureSkill<T>() where T : Component
        {
            if (GetComponent<T>() == null)
            {
                gameObject.AddComponent<T>();
            }
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

            if (_health.IsDead)
            {
                UpdateDeath();
                return;
            }

            if (!_isSpawned)
            {
                return;
            }

            Monster currentEnemy = _combat.CurrentEnemy;
            bool anyChanneling = false;

            for (int i = 0; i < _skills.Length; i++)
            {
                _skills[i].Tick(currentEnemy);
                anyChanneling = anyChanneling || _skills[i].IsChanneling;
            }

            IsAnySkillChanneling = anyChanneling;

            if (IsAnySkillChanneling)
            {
                return;
            }

            if (_combat.TryUpdateCombat())
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

            if (_health != null)
            {
                _health.Died -= OnHealthDied;
            }

            if (_combat != null)
            {
                _combat.OnRemovedFromPlay();
            }

            if (_spawnVfxInstance != null && !_spawnVfxFollowMonster)
            {
                Destroy(_spawnVfxInstance);
            }
        }

        /// <summary>
        /// Đọc đúng struct data khớp _monsterType, gán _moveSpeed + đẩy số liệu chung (đánh thường/
        /// knockback/bomb) vào MonsterCombat. Trả về MaxHealth để Spawn() truyền cho MonsterHealth.
        /// </summary>
        private float ApplyStatsForType()
        {
            float maxHealth;
            MonsterCommonStats common;

            switch (_monsterType)
            {
                case MonsterType.Enderman:
                    _moveSpeed = _endermanData.MoveSpeed;
                    maxHealth = _endermanData.MaxHealth;
                    common = new MonsterCommonStats(
                        _endermanData.AttackDamage, _endermanData.AttackRange, _endermanData.AttackCooldown,
                        _endermanData.KnockbackForce, _endermanData.KnockbackDuration,
                        0f, 0f, 0f, 0f, 0f);
                    break;

                case MonsterType.IronGolem:
                    _moveSpeed = _ironGolemData.MoveSpeed;
                    maxHealth = _ironGolemData.MaxHealth;
                    common = new MonsterCommonStats(
                        _ironGolemData.AttackDamage, _ironGolemData.AttackRange, _ironGolemData.AttackCooldown,
                        _ironGolemData.KnockbackForce, _ironGolemData.KnockbackDuration,
                        0f, 0f, 0f, 0f, 0f);
                    break;

                case MonsterType.Creeper:
                    _moveSpeed = _creeperData.MoveSpeed;
                    maxHealth = _creeperData.MaxHealth;
                    common = new MonsterCommonStats(
                        _creeperData.AttackDamage, _creeperData.AttackRange, _creeperData.AttackCooldown,
                        _creeperData.KnockbackForce, _creeperData.KnockbackDuration,
                        _creeperData.BombDamage, _creeperData.BombRange, _creeperData.BombCooldown,
                        _creeperData.BombSpeed, _creeperData.BombKnockbackForce);
                    break;

                case MonsterType.Huggy:
                    _moveSpeed = _huggyData.MoveSpeed;
                    maxHealth = _huggyData.MaxHealth;
                    common = new MonsterCommonStats(
                        _huggyData.AttackDamage, _huggyData.AttackRange, _huggyData.AttackCooldown,
                        _huggyData.KnockbackForce, _huggyData.KnockbackDuration,
                        0f, 0f, 0f, 0f, 0f);
                    break;

                case MonsterType.Shinsonic:
                    _moveSpeed = _shinsonicData.MoveSpeed;
                    maxHealth = _shinsonicData.MaxHealth;
                    common = new MonsterCommonStats(
                        _shinsonicData.AttackDamage, _shinsonicData.AttackRange, _shinsonicData.AttackCooldown,
                        _shinsonicData.KnockbackForce, _shinsonicData.KnockbackDuration,
                        0f, 0f, 0f, 0f, 0f);
                    break;

                default:
                    maxHealth = 100f;
                    common = default;
                    break;
            }

            _combat.Init(common);
            return maxHealth;
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

            float maxHealth = ApplyStatsForType();

            _health.Init(maxHealth);

            for (int i = 0; i < _skills.Length; i++)
            {
                _skills[i].Init(this);
            }

            IsAnySkillChanneling = false;

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

            _combat.OnRemovedFromPlay();

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
                .SetEase(_spawnScaleEase);
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

        internal void SetRunning(bool isRunning)
        {
            _isMoving = isRunning;

            if (!_hasAnimator || _isRunApplied == isRunning)
            {
                return;
            }

            SetAnimatorBool(_isRunParamHash, _isRunParam, isRunning);
            _isRunApplied = isRunning;
        }

        #region Combat helpers (dùng bởi MonsterCombat / MonsterHealth / IMonsterSkill)

        /// <summary>1 bước di chuyển thẳng tới targetPosition, bám đất, xoay hướng - dùng khi đang chase.</summary>
        internal void ChaseTowards(Vector3 targetPosition)
        {
            SetRunning(true);

            Vector3 position = _transform.position;
            Vector3 toTarget = targetPosition - position;
            toTarget.y = 0f;

            float distance = toTarget.magnitude;

            if (distance <= 0.0001f)
            {
                return;
            }

            Vector3 direction = toTarget / distance;
            RotateTowards(direction);

            Vector3 nextPosition = position + direction * (_moveSpeed * Time.deltaTime);
            _transform.position = SnapToGround(nextPosition);
        }

        /// <summary>Chỉ xoay mặt về hướng targetPosition, không di chuyển - dùng lúc đứng đánh/ném bom.</summary>
        internal void FaceTowards(Vector3 targetPosition)
        {
            Vector3 toTarget = targetPosition - _transform.position;
            toTarget.y = 0f;

            if (toTarget.sqrMagnitude > 0.0001f)
            {
                RotateTowards(toTarget.normalized);
            }
        }

        /// <summary>Dịch chuyển tức thời tới worldPosition (bám đất) - dùng cho skill teleport Enderman.</summary>
        internal void TeleportTo(Vector3 worldPosition, bool faceDirectionOfTravel)
        {
            Vector3 grounded = SnapToGround(worldPosition);

            if (faceDirectionOfTravel)
            {
                Vector3 direction = grounded - _transform.position;
                direction.y = 0f;

                if (direction.sqrMagnitude > 0.0001f)
                {
                    _transform.rotation = Quaternion.LookRotation(direction, Vector3.up);
                }
            }

            _transform.position = grounded;
        }

        internal bool HasAnimator => _hasAnimator;

        /// <summary>
        /// [COMBAT DEBUG] Bọc try/catch quanh SetTrigger - nếu Inspector cấu hình sai kiểu param (vd để
        /// IsTrigger = true nhưng param thật trong Animator Controller lại là Bool), Unity ném
        /// AnimatorControllerParameterException. Dùng chung cho mọi component (Health/Combat/Skill) để
        /// không lặp lại logic cache-hash + try/catch ở từng file.
        /// </summary>
        internal void PlayAnimatorTrigger(int paramHash, string paramName)
        {
            if (!_hasAnimator)
            {
                return;
            }

            try
            {
                _animator.SetTrigger(paramHash);
            }
            catch (System.Exception e)
            {
                Debug.LogError(
                    "[MONSTER COMBAT] " + name + ": SetTrigger(\"" + paramName + "\") lỗi - param này trong " +
                    "Animator Controller thật có thể là Bool chứ không phải Trigger. Chi tiết: " + e.Message);
            }
        }

        internal void SetAnimatorBool(int paramHash, string paramName, bool value)
        {
            if (!_hasAnimator)
            {
                return;
            }

            try
            {
                _animator.SetBool(paramHash, value);
            }
            catch (System.Exception e)
            {
                Debug.LogError(
                    "[MONSTER COMBAT] " + name + ": SetBool(\"" + paramName + "\") lỗi - param này trong " +
                    "Animator Controller thật có thể là Trigger chứ không phải Bool. Chi tiết: " + e.Message);
            }
        }

        #endregion

        #region Death

        private void OnHealthDied()
        {
            _isMoving = false;
            _combat.OnRemovedFromPlay();

            if (_hasAnimator)
            {
                _stateBeforeDeathHash = _animator.GetCurrentAnimatorStateInfo(0).fullPathHash;
                _deathAnimationStarted = false;

                if (_deathParamIsTrigger) PlayAnimatorTrigger(_isDeathParamHash, _isDeathParam);
                else SetAnimatorBool(_isDeathParamHash, _isDeathParam, true);
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

    /// <summary>
    /// Số liệu chung (đánh thường/knockback/bomb) gom từ đúng struct data của loại quái đang spawn -
    /// DTO nội bộ, không [Serializable]/không hiện Inspector, chỉ dùng để truyền cho MonsterCombat.Init().
    /// </summary>
    internal readonly struct MonsterCommonStats
    {
        public readonly float AttackDamage;
        public readonly float AttackRange;
        public readonly float AttackCooldown;
        public readonly float KnockbackForce;
        public readonly float KnockbackDuration;
        public readonly float BombDamage;
        public readonly float BombRange;
        public readonly float BombCooldown;
        public readonly float BombSpeed;
        public readonly float BombKnockbackForce;

        public MonsterCommonStats(
            float attackDamage, float attackRange, float attackCooldown,
            float knockbackForce, float knockbackDuration,
            float bombDamage, float bombRange, float bombCooldown, float bombSpeed, float bombKnockbackForce)
        {
            AttackDamage = attackDamage;
            AttackRange = attackRange;
            AttackCooldown = attackCooldown;
            KnockbackForce = knockbackForce;
            KnockbackDuration = knockbackDuration;
            BombDamage = bombDamage;
            BombRange = bombRange;
            BombCooldown = bombCooldown;
            BombSpeed = bombSpeed;
            BombKnockbackForce = bombKnockbackForce;
        }
    }
}
