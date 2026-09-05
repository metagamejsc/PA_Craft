using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Enderman vươn tay dài ra phía trước trong ArmReachDuration giây (VFX). Giữa thời lượng (tay duỗi
    /// hết cỡ), nếu target còn trong ArmReachRange thì gây ArmReachDamage + đứng yên (stun) đúng
    /// ArmReachStunDuration giây.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanArmReachSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional)")] [SerializeField]
        private string _armReachTriggerParam = "";

        [Header("VFX (optional)")] [SerializeField]
        private ParticleSystem _armVfx;

        private Monster _self;
        private EndermanData _stats;
        private int _armReachTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private Monster _channelTarget;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _armReachTriggerHash = Animator.StringToHash(_armReachTriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.EndermanStats;
            _cooldownTimer = _stats.ArmReachCooldown;
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

            if (distanceSqr > _stats.ArmReachRange * _stats.ArmReachRange)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _channelTimer = Mathf.Max(1f, _stats.ArmReachDuration + 1f);
            _hasAppliedHit = false;
            _channelTarget = target;

            _self.FaceTowards(target.Position);

            PlayArmVfx();

            if (!string.IsNullOrEmpty(_armReachTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_armReachTriggerHash, _armReachTriggerParam);
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
            _cooldownTimer = _stats.ArmReachCooldown;

            if (_armVfx != null)
            {
                _armVfx.gameObject.SetActive(false);
            }
        }

        private void ApplyHit()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            float distanceSqr = (_channelTarget.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.ArmReachRange * _stats.ArmReachRange)
            {
                return;
            }

            _channelTarget.Health.TakeDamage(_self, _stats.ArmReachDamage);
            _channelTarget.Health.ApplyCrowdControl(_self.Position, 0f, _stats.ArmReachStunDuration);
        }

        private void PlayArmVfx()
        {
            if (_armVfx == null)
            {
                return;
            }

            _armVfx.gameObject.SetActive(true);
            _armVfx.Play();
        }

        public void OnHitAnimationEvent()
        {
            if (!_isChanneling || _hasAppliedHit || _channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            _hasAppliedHit = true;
            _self.FaceTowards(_channelTarget.Position);
            ApplyHit();
        }

        public void OnFinishedAnimationEvent()
        {
            EndChannel();
        }
    }
}
