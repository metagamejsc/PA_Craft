using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Target selection (ưu tiên khác loại > cùng loại, không đổi target tới khi chết, trả đũa khi rảnh),
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

        [SerializeField] private bool _attackParamIsTrigger = false;

        [Header("Animator - Bomb Throw (optional)")]
        [SerializeField] private string _throwBombTriggerParam = "";
        [SerializeField] private bool _throwBombParamIsTrigger = true;

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
        private int _throwBombParamHash;
        private bool _resetAttackBool;

        private Monster _currentEnemy;
        private Monster _pendingRetaliationTarget;
        private float _attackTimer;
        private float _bombTimer;
        private bool _isAttacking;
        private bool _isThrowingBomb;
        private float _chaseStartTime;

        public Monster CurrentEnemy => _currentEnemy;

        private void Awake()
        {
            _monster = GetComponent<Monster>();
            _health = GetComponent<MonsterHealth>();
            _transform = transform;

            _attackParamHash = Animator.StringToHash(_attackTriggerParam);
            _throwBombParamHash = Animator.StringToHash(_throwBombTriggerParam);

            _health.Damaged += OnDamaged;
        }

        private void OnDestroy()
        {
            _health.Damaged -= OnDamaged;
            _activeCombats.Remove(this);
        }

        public void Init(MonsterStatsEntry stats)
        {
            _type = stats.Type;
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
        }

        /// <summary>Cộng thêm damage cận chiến vĩnh viễn trong trận (dùng bởi Shinsonic lúc biến hình).</summary>
        public void AddAttackDamageBonus(float amount)
        {
            _attackDamage += amount;
        }

        private void OnDamaged(Monster attacker, float amount)
        {
            if (attacker == null || attacker.IsDead || _currentEnemy != null)
            {
                return;
            }

            _pendingRetaliationTarget = attacker;
        }

        /// <summary>Gọi mỗi frame từ Monster.Update() khi quái đã spawn, chưa chết và không skill nào đang
        /// channel. Trả về true nếu đang có target (đang chase/melee/bomb) - Monster không wander nữa.</summary>
        public bool TryUpdateCombat()
        {
            if (_resetAttackBool)
            {
                _resetAttackBool = false;
                _monster.SetAnimatorBool(_attackParamHash, _attackTriggerParam, false);
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

            if (distanceSqr <= _attackRange * _attackRange)
            {
                _isThrowingBomb = false;
                UpdateMeleeAttack();
            }
            else if (_bombProjectilePrefab != null && distanceSqr <= _bombRange * _bombRange)
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
            if (_currentEnemy != null && !_currentEnemy.IsDead)
            {
                return true;
            }

            Monster previous = _currentEnemy;
            _currentEnemy = null;

            if (_pendingRetaliationTarget != null && !_pendingRetaliationTarget.IsDead)
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
            Monster nearestDifferentType = null;
            float nearestDifferentTypeSqr = float.MaxValue;
            Monster nearestSameType = null;
            float nearestSameTypeSqr = float.MaxValue;

            Vector3 position = _transform.position;

            for (int i = 0; i < _activeCombats.Count; i++)
            {
                MonsterCombat other = _activeCombats[i];

                if (other == this || other == null || other._health.IsDead)
                {
                    continue;
                }

                float distanceSqr = FlatDistanceSqr(position, other._transform.position);

                if (other._type != _type)
                {
                    if (distanceSqr < nearestDifferentTypeSqr)
                    {
                        nearestDifferentTypeSqr = distanceSqr;
                        nearestDifferentType = other._monster;
                    }
                }
                else if (distanceSqr < nearestSameTypeSqr)
                {
                    nearestSameTypeSqr = distanceSqr;
                    nearestSameType = other._monster;
                }
            }

            return nearestDifferentType != null ? nearestDifferentType : nearestSameType;
        }

        private void UpdateChaseTarget()
        {
            if (Time.time - _chaseStartTime >= _maxChaseDuration)
            {
                if (MonsterDebug.VerboseLoggingEnabled)
                {
                    MonsterDebug.Log(Tag, name + " đuổi " + _currentEnemy.name + " quá " + _maxChaseDuration +
                        "s chưa vào tầm đánh - ép tấn công.");
                }

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
            PlayAttackAnim();
            _currentEnemy.Health.TakeDamage(_monster, _attackDamage);
            _currentEnemy.Health.ApplyCrowdControl(_transform.position, _knockbackForce, _knockbackDuration);
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
            PlayThrowBombAnim();

            MonsterProjectile.Spawn(
                _bombProjectilePrefab,
                _transform.position,
                _monster,
                _currentEnemy,
                _bombDamage,
                _bombSpeed,
                _bombKnockbackForce,
                _knockbackDuration);
        }

        private void PlayAttackAnim()
        {
            if (!_monster.HasAnimator)
            {
                return;
            }

            if (_attackParamIsTrigger)
            {
                _monster.PlayAnimatorTrigger(_attackParamHash, _attackTriggerParam);
            }
            else
            {
                _monster.SetAnimatorBool(_attackParamHash, _attackTriggerParam, true);
                _resetAttackBool = true;
            }
        }

        private void PlayThrowBombAnim()
        {
            if (!_monster.HasAnimator || string.IsNullOrEmpty(_throwBombTriggerParam))
            {
                return;
            }

            if (_throwBombParamIsTrigger)
            {
                _monster.PlayAnimatorTrigger(_throwBombParamHash, _throwBombTriggerParam);
            }
            else
            {
                _monster.SetAnimatorBool(_throwBombParamHash, _throwBombTriggerParam, true);
            }
        }

        private static float FlatDistanceSqr(Vector3 a, Vector3 b)
        {
            float dx = a.x - b.x;
            float dz = a.z - b.z;
            return dx * dx + dz * dz;
        }
    }
}
