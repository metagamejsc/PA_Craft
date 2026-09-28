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
        private GameObject _armVfx;
        private ParticleSystem[] _armParticles;
        private Vector3 _armBaseScale;

        private Monster _self;
        private EndermanData _stats;
        private int _armReachTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private Monster _channelTarget;
        private float _hitTimer;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _armReachTriggerHash = Animator.StringToHash(_armReachTriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.EndermanStats;
            _armParticles = _armVfx != null ? _armVfx.GetComponentsInChildren<ParticleSystem>(true) : new ParticleSystem[0];
            if (_armVfx != null) _armBaseScale = _armVfx.transform.localScale;
            _cooldownTimer = Random.Range(0.8f, 2f);
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
            _channelTimer = Mathf.Max(0.8f, _stats.ArmReachDuration);
            _hitTimer = 0.35f;
            _hasAppliedHit = false;
            _channelTarget = target;

            _self.FaceTowards(target.Position);

            PlayArmVfx();
            _self.Feedback?.Skill(_self.Position, false);

            if (!string.IsNullOrEmpty(_armReachTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_armReachTriggerHash, _armReachTriggerParam);
            }
        }

        private void UpdateChannel()
        {
            if (_channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                EndChannel();
                return;
            }

            _self.FaceTowards(_channelTarget.Position);
            UpdateBeam();
            _channelTimer -= Time.deltaTime;
            _hitTimer -= Time.deltaTime;
            if (_hitTimer <= 0f)
            {
                ApplyHit();
                _hasAppliedHit = true;
                _hitTimer = 0.5f;
            }

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
            _self.SetAnimatorBool(_armReachTriggerHash, _armReachTriggerParam, false);

            if (_armVfx != null)
            {
                _armVfx.SetActive(false);
                _armVfx.transform.localScale = _armBaseScale;
            }
        }

        private void ApplyHit()
        {
            if (_channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                return;
            }

            float distanceSqr = (_channelTarget.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.ArmReachRange * _stats.ArmReachRange)
            {
                return;
            }

            MonsterAreaAttack.Apply(_self, _self.Position, _stats.ArmReachRange,
                _stats.ArmReachDamage * 0.4f, 0f, Mathf.Min(0.3f, _stats.ArmReachStunDuration), 120f);
        }

        private void PlayArmVfx()
        {
            if (_armVfx == null)
            {
                return;
            }

            _armVfx.SetActive(true);
            UpdateBeam();
            for (int i = 0; i < _armParticles.Length; i++)
            {
                _armParticles[i].Clear();
                _armParticles[i].Play(true);
            }
        }

        private void UpdateBeam()
        {
            if (_armVfx == null || _channelTarget == null) return;
            Vector3 direction = _channelTarget.Position + Vector3.up * 1.5f - _armVfx.transform.position;
            if (direction.sqrMagnitude < 0.01f) return;
            _armVfx.transform.rotation = Quaternion.LookRotation(direction);
            _armVfx.transform.localScale = _armBaseScale * Mathf.Max(0.5f, direction.magnitude / 5f);
        }

        public void OnHitAnimationEvent()
        {
            if (!_isChanneling || _hasAppliedHit || _channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                return;
            }

            _hasAppliedHit = true;
            _self.FaceTowards(_channelTarget.Position);
            _hitTimer = 0.5f;
            ApplyHit();
        }

        public void OnFinishedAnimationEvent()
        {
            EndChannel();
        }
    }
}
