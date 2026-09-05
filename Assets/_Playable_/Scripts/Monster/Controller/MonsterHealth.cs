using System;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// HP, sát thương, hồi máu, và mọi hiệu ứng crowd-control (đẩy lùi/choáng/hất bay) + độc (DOT).
    /// Dùng lerp thủ công trong Update cho knockback/launch thay vì DOTween - hành động này xảy ra rất
    /// thường xuyên khi nhiều quái đánh nhau, tránh tạo Tween mới mỗi lần (GC alloc dồn dập trên build Luna).
    /// </summary>
    [DisallowMultipleComponent]
    public class MonsterHealth : MonoBehaviour
    {
        [Header("Animator - Stun (optional, dùng chung cho cả đẩy lùi lẫn đứng yên tại chỗ)")]

        [SerializeField] private string _stunnedBoolParam = "";

        public event Action<Monster, float> Damaged;
        public event Action Died;

        private Monster _monster;
        private Transform _transform;
        private int _stunTriggerHash;
        private int _stunnedBoolHash;

        private float _maxHealth;
        private float _currentHealth;
        private bool _isDead;

        private float _knockbackTimer;
        private float _knockbackDuration;
        private Vector3 _knockbackStartPosition;
        private Vector3 _knockbackTargetPosition;

        private bool _isPoisoned;
        private float _poisonDamagePerTick;
        private float _poisonTickTimer;
        private float _poisonTickInterval;
        private float _poisonDurationRemaining;

        private float _launchTimer;
        private float _launchDuration;
        private float _launchHeight;
        private Vector3 _launchGroundPosition;

        public float CurrentHealth => _currentHealth;
        public float MaxHealth => _maxHealth;
        public bool IsDead => _isDead;
        public bool IsStaggered => _knockbackTimer > 0f || _launchTimer > 0f;

        /// <summary>Số giây còn lại đang bị stun/CC (0 nếu không bị) - dùng để code khác (skill, UI,
        /// target priority...) kiểm tra thời lượng thực tế thay vì chỉ true/false như IsStaggered.</summary>
        public float StunTimeRemaining => Mathf.Max(_knockbackTimer, _launchTimer);

        private void Awake()
        {
            _monster = GetComponent<Monster>();
            _transform = transform;
            _stunnedBoolHash = Animator.StringToHash(_stunnedBoolParam);
        }

        private void Update()
        {
            bool wasStaggered = IsStaggered;

            UpdateKnockback();
            UpdateLaunch();
            UpdatePoison();

            if (wasStaggered && !IsStaggered && !string.IsNullOrEmpty(_stunnedBoolParam) && _monster != null)
            {
                _monster.SetAnimatorBool(_stunnedBoolHash, _stunnedBoolParam, false);
            }
        }

        /// <summary>Gọi từ Monster.Spawn() để reset máu về đầu trận.</summary>
        public void Init(float maxHealth)
        {
            _maxHealth = maxHealth;
            _currentHealth = maxHealth;
            _isDead = false;
            _knockbackTimer = 0f;
            _launchTimer = 0f;
            _isPoisoned = false;
            _poisonDurationRemaining = 0f;
        }

        public void TakeDamage(Monster attacker, float amount)
        {
            if (_isDead || amount <= 0f)
            {
                return;
            }

            _currentHealth -= amount;
            Damaged?.Invoke(attacker, amount);

            if (_currentHealth <= 0f)
            {
                Die();
            }
        }

        public void Heal(float amount)
        {
            if (_isDead || amount <= 0f)
            {
                return;
            }

            _currentHealth = Mathf.Min(_currentHealth + amount, _maxHealth);
        }

        public void IncreaseMaxHealth(float amount, bool healSameAmount)
        {
            if (_isDead || amount <= 0f)
            {
                return;
            }

            _maxHealth += amount;

            if (healSameAmount)
            {
                _currentHealth = Mathf.Min(_currentHealth + amount, _maxHealth);
            }
        }

        /// <summary>
        /// Đẩy lùi (knockbackDistance > 0) hoặc đứng yên tại chỗ (knockbackDistance = 0, dùng cho stun của
        /// skill) trong "duration" giây. Bỏ qua nếu đã chết hoặc đang channel skill (CC-immune lúc channel).
        /// </summary>
        public void ApplyCrowdControl(Vector3 sourcePosition, float knockbackDistance, float duration)
        {
            if (_isDead || duration <= 0f || (_monster != null && _monster.IsAnySkillChanneling))
            {
                return;
            }

            _knockbackDuration = duration;
            _knockbackTimer = duration;
            PlayStunReaction();

            if (knockbackDistance <= 0f)
            {
                _knockbackStartPosition = _transform.position;
                _knockbackTargetPosition = _transform.position;
                return;
            }

            Vector3 position = _transform.position;
            Vector3 away = position - sourcePosition;
            away.y = 0f;

            Vector3 direction = away.sqrMagnitude > 0.0001f
                ? away.normalized
                : -_transform.forward;

            _knockbackStartPosition = position;
            _knockbackTargetPosition = position + direction * knockbackDistance;
        }

        /// <summary>Bắn 1 lần lúc bắt đầu bị CC (đẩy lùi hoặc đứng yên) + giữ bool true suốt thời gian bị CC.</summary>
        private void PlayStunReaction()
        {
            if (_monster == null)
            {
                return;
            }

            if (!string.IsNullOrEmpty(_stunnedBoolParam))
            {
                _monster.SetAnimatorBool(_stunnedBoolHash, _stunnedBoolParam, true);
            }
        }

        public void ApplyPoison(float damagePerTick, float tickInterval, float duration)
        {
            if (_isDead || duration <= 0f || tickInterval <= 0f)
            {
                return;
            }

            _isPoisoned = true;
            _poisonDamagePerTick = damagePerTick;
            _poisonTickInterval = tickInterval;
            _poisonDurationRemaining = duration;
            _poisonTickTimer = tickInterval;
        }

        /// <summary>Hất bay lên rồi rơi xuống thuần vị trí (không physics) - dùng cho Iron Golem slam.</summary>
        public void PlayLaunch(float height, float duration)
        {
            if (_isDead || duration <= 0f)
            {
                return;
            }

            _launchGroundPosition = _transform.position;
            _launchHeight = height;
            _launchDuration = duration;
            _launchTimer = duration;
        }

        private void UpdateKnockback()
        {
            if (_knockbackTimer <= 0f)
            {
                return;
            }

            _knockbackTimer -= Time.deltaTime;

            if (_knockbackTargetPosition == _knockbackStartPosition)
            {
                return;
            }

            float progress = 1f - Mathf.Clamp01(_knockbackTimer / _knockbackDuration);
            _transform.position = Vector3.Lerp(_knockbackStartPosition, _knockbackTargetPosition, progress);
        }

        private void UpdateLaunch()
        {
            if (_launchTimer <= 0f)
            {
                return;
            }

            _launchTimer -= Time.deltaTime;

            float progress = 1f - Mathf.Clamp01(_launchTimer / _launchDuration);
            float heightOffset = Mathf.Sin(progress * Mathf.PI) * _launchHeight;

            Vector3 position = _launchGroundPosition;
            position.y += heightOffset;
            _transform.position = position;
        }

        private void UpdatePoison()
        {
            if (!_isPoisoned)
            {
                return;
            }

            _poisonDurationRemaining -= Time.deltaTime;
            _poisonTickTimer -= Time.deltaTime;

            if (_poisonTickTimer <= 0f)
            {
                _poisonTickTimer = _poisonTickInterval;
                TakeDamage(null, _poisonDamagePerTick);
            }

            if (_poisonDurationRemaining <= 0f)
            {
                _isPoisoned = false;
            }
        }

        private void Die()
        {
            if (_isDead)
            {
                return;
            }

            _isDead = true;
            _knockbackTimer = 0f;
            _launchTimer = 0f;
            _isPoisoned = false;

            Died?.Invoke();
        }
    }
}
