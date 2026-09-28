using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Target selection (chỉ tấn công monster khác loại, không đổi target tới khi chết, trả đũa khi rảnh),
    /// đánh cận chiến, và ném bom tầm xa khi đối thủ ngoài AttackRange nhưng trong BombRange.
    /// </summary>
    [DisallowMultipleComponent]
    [RequireComponent(typeof(MonsterHealth))]
    public class MonsterCombat : MonoBehaviour
    {
        private const string Tag = "MONSTER COMBAT";

        private static readonly List<MonsterCombat> _activeCombats = new List<MonsterCombat>();

        [Header("Animator - Melee Attack")]
        [Tooltip("Tên param tấn công trong Animator. Asset hiện không đồng nhất giữa các prefab quái - " +
                 "Spider dùng Bool \"IsAttack\", Zombie/Golem dùng Trigger \"Attack\" - chỉnh đúng theo prefab.")]
        [SerializeField]
        private string _attackTriggerParam = "IsAttack";

        [Tooltip("Bật sau khi đã thêm event AttackHit vào clip attack. Khi tắt, damage/projectile vẫn được tạo ngay như cũ.")]
        [SerializeField]
        private bool _useAttackHitAnimationEvent;

        [Header("Bomb Visual (optional)")]
        [Tooltip("Prefab quả bom (phải có/tự động được gắn component MonsterProjectile). Để trống = quái " +
                 "này không ném bom, chỉ đánh cận chiến.")]
        [SerializeField]
        private GameObject _bombProjectilePrefab;

        [Tooltip("Đuổi cùng 1 địch quá lâu mà chưa vào được AttackRange (thường do collider 2 con chạm " +
                 "nhau chặn vật lý) thì ép dừng lại đánh luôn, không đứng chạy tại chỗ vô thời hạn.")]
        [SerializeField]
        private float _maxChaseDuration = 2.5f;

        private Monster _monster;
        private MonsterHealth _health;
        private Transform _transform;

        private MonsterType _type;
        private float _attackDamage;
        private float _attackRange;
        private float _attackCooldown;
        private float _bombDamage;
        private float _bombRange;
        private float _bombCooldown;
        private float _bombSpeed;
        private float _bombKnockbackForce;
        private float _knockbackForce;
        private float _knockbackDuration;

        private int _attackParamHash;
        private bool _resetAttackBool;

        private Monster _currentEnemy;
        private Monster _pendingRetaliationTarget;
        private float _attackTimer;
        private float _bombTimer;
        private bool _isAttacking;
        private bool _isThrowingBomb;
        private float _chaseStartTime;
        private PendingAttack _pendingAttack;

        private enum PendingAttack
        {
            None,
            Melee,
            Bomb
        }

        public Monster CurrentEnemy => _currentEnemy;
        internal static int ActiveCount => _activeCombats.Count;
        internal static Monster ActiveMonster(int index) => index >= 0 && index < _activeCombats.Count ? _activeCombats[index]._monster : null;
        private float _pendingHitTime;
        private Monster _attackTarget;
        private ShinsonicTransformSkill _sonicPhase;
        private int _comboIndex, _pendingComboIndex;
        private string _activeAttackParam;
        private int _activeAttackHash;

        public void CancelPendingAttack()
        {
            _pendingAttack = PendingAttack.None;
            _attackTarget = null;
            if (_resetAttackBool)
            {
                _monster.SetAnimatorBool(_activeAttackHash, _activeAttackParam, false);
                _resetAttackBool = false;
            }
        }

        public void RefreshTarget()
        {
            TryAcquireTarget();
        }

        private void Awake()
        {
            _monster = GetComponent<Monster>();
            _health = GetComponent<MonsterHealth>();
            _transform = transform;

            _type = _monster.Type;
            _attackParamHash = Animator.StringToHash(_attackTriggerParam);

            _health.Damaged += OnDamaged;
        }

        private void OnDestroy()
        {
            _health.Damaged -= OnDamaged;
            _activeCombats.Remove(this);
        }

        internal void Init(MonsterCommonStats stats)
        {
            _sonicPhase = GetComponent<ShinsonicTransformSkill>();
            _comboIndex = _pendingComboIndex = 0;
            _attackDamage = stats.AttackDamage;
            _attackRange = stats.AttackRange;
            _attackCooldown = stats.AttackCooldown;
            _bombDamage = stats.BombDamage;
            _bombRange = Mathf.Max(stats.BombRange, stats.AttackRange);
            _bombCooldown = stats.BombCooldown;
            _bombSpeed = stats.BombSpeed;
            _bombKnockbackForce = stats.BombKnockbackForce;
            _knockbackForce = stats.KnockbackForce;
            _knockbackDuration = stats.KnockbackDuration;

            _currentEnemy = null;
            _pendingRetaliationTarget = null;
            _attackTimer = 0f;
            _bombTimer = 0f;
            _isAttacking = false;
            _isThrowingBomb = false;
            _resetAttackBool = false;
            _pendingAttack = PendingAttack.None;

            if (!_activeCombats.Contains(this))
            {
                _activeCombats.Add(this);
            }
        }

        /// <summary>Gọi từ Monster.Despawn()/OnDestroy()/lúc chết - gỡ khỏi registry target-scan, reset
        /// state để lần Spawn() tiếp theo (pooled) không dính target cũ.</summary>
        public void OnRemovedFromPlay()
        {
            _activeCombats.Remove(this);
            _currentEnemy = null;
            _pendingRetaliationTarget = null;
            _isAttacking = false;
            _isThrowingBomb = false;
            _pendingAttack = PendingAttack.None;
        }

        /// <summary>Cộng thêm damage cận chiến vĩnh viễn trong trận (dùng bởi Shinsonic lúc biến hình).</summary>
        public void AddAttackDamageBonus(float amount)
        {
            _attackDamage += amount;
        }

        private void OnDamaged(Monster attacker, float amount)
        {
            if (attacker == null || attacker.IsDead || attacker.Type == _type || _currentEnemy != null)
            {
                return;
            }

            _pendingRetaliationTarget = attacker;
        }

        /// <summary>Gọi mỗi frame từ Monster.Update() khi quái đã spawn, chưa chết và không skill nào đang
        /// channel. Trả về true nếu đang có target (đang chase/melee/bomb) - Monster không wander nữa.</summary>
        public bool TryUpdateCombat()
        {
            if (_pendingAttack != PendingAttack.None && Time.time >= _pendingHitTime)
                ApplyPendingAttack();
            if (_resetAttackBool)
            {
                _resetAttackBool = false;
                _monster.SetAnimatorBool(_activeAttackHash, _activeAttackParam, false);
            }

            if (_health.IsStaggered)
            {
                return _currentEnemy != null;
            }

            if (!TryAcquireTarget())
            {
                _isAttacking = false;
                _isThrowingBomb = false;
                return false;
            }

            float distanceSqr = FlatDistanceSqr(_transform.position, _currentEnemy.Position);

            float meleeRange = MeleeRange(_currentEnemy);
            if (distanceSqr <= meleeRange * meleeRange)
            {
                _isThrowingBomb = false;
                UpdateMeleeAttack();
            }
            else if (_bombProjectilePrefab != null && _bombDamage > 0f && distanceSqr <= _bombRange * _bombRange)
            {
                _isAttacking = false;
                UpdateBombStance();
            }
            else
            {
                _isAttacking = false;
                _isThrowingBomb = false;
                UpdateChaseTarget();
            }

            return true;
        }

        private bool TryAcquireTarget()
        {
            if (IsValidEnemy(_currentEnemy))
            {
                return true;
            }

            Monster previous = _currentEnemy;
            _currentEnemy = null;

            if (IsValidEnemy(_pendingRetaliationTarget))
            {
                _currentEnemy = _pendingRetaliationTarget;
            }

            _pendingRetaliationTarget = null;

            if (_currentEnemy == null)
            {
                _currentEnemy = FindPriorityTarget();
            }

            if (_currentEnemy != null && _currentEnemy != previous)
            {
                _chaseStartTime = Time.time;
            }

            return _currentEnemy != null;
        }

        private Monster FindPriorityTarget()
        {
            Monster nearestEnemy = null;
            float nearestEnemyDistanceSqr = float.MaxValue;

            Vector3 position = _transform.position;

            for (int i = 0; i < _activeCombats.Count; i++)
            {
                MonsterCombat other = _activeCombats[i];

                if (other == this || other == null || !other.isActiveAndEnabled || !IsValidEnemy(other._monster))
                {
                    continue;
                }

                float distanceSqr = FlatDistanceSqr(position, other._transform.position);

                if (distanceSqr < nearestEnemyDistanceSqr)
                {
                    nearestEnemyDistanceSqr = distanceSqr;
                    nearestEnemy = other._monster;
                }
            }

            return nearestEnemy;
        }

        private bool IsValidEnemy(Monster target)
        {
            return target != null && target.isActiveAndEnabled && !target.IsDead && target.Type != _type
                && target.Combat != null && target.Combat.isActiveAndEnabled
                && _activeCombats.Contains(target.Combat);
        }

        private void UpdateChaseTarget()
        {
            if (_maxChaseDuration > 0f && Time.time - _chaseStartTime >= _maxChaseDuration)
            {
                if (MonsterDebug.VerboseLoggingEnabled)
                {
                    MonsterDebug.Log(Tag, name + " đuổi " + _currentEnemy.name + " quá " + _maxChaseDuration +
                                          "s chưa vào tầm đánh - thử tấn công rồi tiếp tục truy đuổi.");
                }

                _chaseStartTime = Time.time;
                UpdateMeleeAttack();
                return;
            }

            _monster.ChaseTowards(_currentEnemy.Position);
        }

        private void UpdateMeleeAttack()
        {
            _monster.FaceTowards(_currentEnemy.Position);
            _monster.SetRunning(false);

            if (!_isAttacking)
            {
                _isAttacking = true;
                _attackTimer = 0f;
            }

            _attackTimer -= Time.deltaTime;

            if (_attackTimer > 0f)
            {
                return;
            }

            _attackTimer = _attackCooldown;
            _pendingComboIndex = _comboIndex;
            int comboLength = _type == MonsterType.IronGolem ? 3 : _sonicPhase != null && _sonicPhase.CurrentStage == 2 ? 2 : 1;
            _comboIndex = (_comboIndex + 1) % comboLength;
            PlayAttackAnim();
            _pendingAttack = PendingAttack.Melee;
            _attackTarget = _currentEnemy;
            _pendingHitTime = Time.time + Mathf.Min(0.45f, _attackCooldown * 0.4f);

            if (!_useAttackHitAnimationEvent)
            {
                ApplyPendingAttack();
            }
        }

        private void UpdateBombStance()
        {
            _monster.FaceTowards(_currentEnemy.Position);
            _monster.SetRunning(false);

            if (!_isThrowingBomb)
            {
                _isThrowingBomb = true;
                _bombTimer = 0f;
            }

            _bombTimer -= Time.deltaTime;

            if (_bombTimer > 0f)
            {
                return;
            }

            _bombTimer = _bombCooldown;
            PlayAttackAnim();
            _pendingAttack = PendingAttack.Bomb;
            _attackTarget = _currentEnemy;
            _pendingHitTime = Time.time + 0.35f;

            if (!_useAttackHitAnimationEvent)
            {
                ApplyPendingAttack();
            }
        }

        public void OnAttackHitAnimationEvent()
        {
            if (!_useAttackHitAnimationEvent)
            {
                return;
            }

            ApplyPendingAttack();
        }

        private void ApplyPendingAttack()
        {
            PendingAttack attack = _pendingAttack;
            _pendingAttack = PendingAttack.None;

            Monster victim = _attackTarget;
            _attackTarget = null;
            if (_monster.IsDead || _monster.IsAnySkillChanneling || _health.IsStaggered || !IsValidEnemy(victim))
            {
                return;
            }

            if (attack == PendingAttack.Melee)
            {
                float distanceSqr = FlatDistanceSqr(_transform.position, victim.Position);

                float meleeRange = MeleeRange(victim);
                if (distanceSqr > meleeRange * meleeRange)
                {
                    return;
                }

                float damage = _attackDamage;
                if (_type == MonsterType.IronGolem)
                    damage *= _pendingComboIndex == 0 ? 0.9f : _pendingComboIndex == 1 ? 1.1f : 1.35f;
                bool golemFinisher = _type == MonsterType.IronGolem && _pendingComboIndex == 2;
                int sonicStage = _sonicPhase != null ? _sonicPhase.CurrentStage : 0;
                if (golemFinisher || sonicStage >= 2)
                {
                    float cone = golemFinisher ? 90f : sonicStage == 2 ? 120f : 75f;
                    MonsterAreaAttack.Apply(_monster, _monster.Position, meleeRange, damage,
                        _knockbackForce, golemFinisher ? 0.8f : _knockbackDuration, cone,
                        0f, golemFinisher ? 1f : 0f, golemFinisher ? 0.5f : 0f);
                }
                else
                {
                    victim.Health.TakeDamage(_monster, damage);
                    victim.Health.ApplyCrowdControl(_transform.position, _knockbackForce, _knockbackDuration);
                }
                _monster.Feedback?.Attack(victim.Position);
                return;
            }

            if (attack == PendingAttack.Bomb && _bombProjectilePrefab != null)
            {
                MonsterProjectile.Spawn(
                    _bombProjectilePrefab,
                    _transform.position,
                    _monster,
                    victim,
                    _bombDamage,
                    _bombSpeed,
                    _bombKnockbackForce,
                    _knockbackDuration);
                _monster.Feedback?.Skill(_transform.position, false);
            }
        }

        private void PlayAttackAnim()
        {
            if (!_monster.HasAnimator)
            {
                return;
            }

            bool useCombo = _type == MonsterType.IronGolem || _sonicPhase != null && _sonicPhase.CurrentStage == 2;
            _activeAttackParam = useCombo && _pendingComboIndex > 0
                ? (_pendingComboIndex == 1 ? "IsAttack2" : "IsAttack3") : _attackTriggerParam;
            _activeAttackHash = Animator.StringToHash(_activeAttackParam);
            _monster.SetAnimatorBool(_activeAttackHash, _activeAttackParam, true);
            _resetAttackBool = true;
        }

        private static float FlatDistanceSqr(Vector3 a, Vector3 b)
        {
            float dx = a.x - b.x;
            float dz = a.z - b.z;
            return dx * dx + dz * dz;
        }

        private float MeleeRange(Monster target)
        {
            // Physical bodies must be able to touch before melee is considered out of range.
            // Ranged Creeper keeps its deliberately small melee range so it still throws TNT.
            float range = _sonicPhase != null && _sonicPhase.CurrentStage >= 2 ? Mathf.Max(4f, _attackRange) : _attackRange;
            return _type == MonsterType.Creeper ? range
                : Mathf.Max(range, _monster.BodyRadius + target.BodyRadius + 0.2f);
        }
    }
}
