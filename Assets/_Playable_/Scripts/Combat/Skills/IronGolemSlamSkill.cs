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
        private const float ChannelDuration = 0.6f;

        [Header("Animator (optional)")]
        [SerializeField] private string _slamTriggerParam = "";

        [Header("VFX (optional)")]
        [SerializeField] private GameObject _slamVfxPrefab;

        private Monster _self;
        private MonsterStatsEntry _stats;
        private int _slamTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private Monster _channelTarget;
        private GameObject _slamVfxInstance;
        private ParticleSystem[] _slamVfxParticles;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _slamTriggerHash = Animator.StringToHash(_slamTriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _stats = stats;
            _cooldownTimer = stats.SlamCooldown;
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
            _channelTimer = ChannelDuration;
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
            _channelTimer -= Time.deltaTime;

            if (!_hasAppliedHit && _channelTimer <= 0f)
            {
                _hasAppliedHit = true;
                ApplyHit();
            }

            if (_channelTimer > 0f)
            {
                return;
            }

            _isChanneling = false;
            _cooldownTimer = _stats.SlamCooldown;
        }

        private void ApplyHit()
        {
            PlaySlamVfx();

            if (_channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

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

            if (_slamVfxInstance == null)
            {
                _slamVfxInstance = Instantiate(_slamVfxPrefab, _self.Position, Quaternion.identity);
                _slamVfxParticles = _slamVfxInstance.GetComponentsInChildren<ParticleSystem>(true);
            }
            else
            {
                _slamVfxInstance.transform.position = _self.Position;
                _slamVfxInstance.SetActive(true);
            }

            for (int i = 0; i < _slamVfxParticles.Length; i++)
            {
                _slamVfxParticles[i].Clear();
                _slamVfxParticles[i].Play();
            }
        }
    }
}
