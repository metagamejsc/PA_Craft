using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Iron Golem đập xuống chân đối thủ (phải trong AttackRange, dùng lại tầm melee). Sau thời gian vung
    /// tay (ChannelDuration) gây SlamDamage, hất target bay lên SlamLaunchHeight rồi rơi xuống trong
    /// SlamAirTime giây, cộng thêm SlamStunDuration giây choáng sau khi rơi.
    /// </summary>
    [DisallowMultipleComponent]
    public class IronGolemSlamSkill : MonoBehaviour, IMonsterSkill
    {
        private const float ChannelTimeout = 3f;

        [Header("Animator (optional)")] [SerializeField]
        private string _slamTriggerParam = "";

        [Header("VFX (optional)")] [SerializeField]
        private ParticleSystem _slamVfxPrefab;

        private Monster _self;
        private IronGolemData _stats;
        private int _slamTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private Monster _channelTarget;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _slamTriggerHash = Animator.StringToHash(_slamTriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.IronGolemStats;
            _cooldownTimer = _stats.SlamCooldown;
            _isChanneling = false;
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                UpdateChannel();
                return;
            }

            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.AttackRange * _stats.AttackRange)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _channelTimer = ChannelTimeout;
            _hasAppliedHit = false;
            _channelTarget = target;

            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_slamTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_slamTriggerHash, _slamTriggerParam);
            }
        }

        private void UpdateChannel()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                EndChannel();
                return;
            }

            _self.FaceTowards(_channelTarget.Position);
            _channelTimer -= Time.deltaTime;

            if (_channelTimer > 0f)
            {
                return;
            }

            EndChannel();
        }

        private void EndChannel()
        {
            if (!_isChanneling)
            {
                return;
            }

            _isChanneling = false;
            _cooldownTimer = _stats.SlamCooldown;
        }

        private void ApplyHit()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            _self.FaceTowards(_channelTarget.Position);
            PlaySlamVfx();

            float distanceSqr = (_channelTarget.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.AttackRange * _stats.AttackRange)
            {
                return;
            }

            _channelTarget.Health.TakeDamage(_self, _stats.SlamDamage);
            _channelTarget.Health.PlayLaunch(_stats.SlamLaunchHeight, _stats.SlamAirTime);
            _channelTarget.Health.ApplyCrowdControl(
                _self.Position, 0f, _stats.SlamAirTime + _stats.SlamStunDuration);
        }

        private void PlaySlamVfx()
        {
            if (_slamVfxPrefab == null)
            {
                return;
            }

            _slamVfxPrefab.gameObject.SetActive(true);
            _slamVfxPrefab.Play();
        }

        public void OnHitAnimationEvent()
        {
            if (!_isChanneling || _hasAppliedHit)
            {
                return;
            }

            _hasAppliedHit = true;
            ApplyHit();
        }

        public void OnFinishedAnimationEvent()
        {
            EndChannel();
        }
    }
}
