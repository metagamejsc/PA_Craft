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
        [Header("Animator (optional)")]
        [SerializeField] private string _armReachTriggerParam = "";

        [Header("VFX (optional)")]
        [SerializeField] private GameObject _armVfxPrefab;
        [SerializeField] private Vector3 _armVfxOffset = Vector3.zero;

        private Monster _self;
        private EndermanData _stats;
        private int _armReachTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private GameObject _armVfxInstance;
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
            _channelTimer = _stats.ArmReachDuration;
            _hasAppliedHit = false;
            _channelTarget = target;

            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_armReachTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_armReachTriggerHash, _armReachTriggerParam);
            }

            if (_armVfxPrefab == null)
            {
                return;
            }

            if (_armVfxInstance == null)
            {
                _armVfxInstance = Instantiate(
                    _armVfxPrefab, _self.Position + _armVfxOffset, _self.transform.rotation, _self.transform);
            }
            else
            {
                _armVfxInstance.transform.localPosition = _armVfxOffset;
                _armVfxInstance.SetActive(true);
            }
        }

        private void UpdateChannel()
        {
            _channelTimer -= Time.deltaTime;

            float halfDuration = _stats.ArmReachDuration * 0.5f;

            if (!_hasAppliedHit && _channelTimer <= halfDuration)
            {
                _hasAppliedHit = true;
                ApplyHit();
            }

            if (_channelTimer > 0f)
            {
                return;
            }

            _isChanneling = false;
            _cooldownTimer = _stats.ArmReachCooldown;

            if (_armVfxInstance != null)
            {
                _armVfxInstance.SetActive(false);
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
    }
}
