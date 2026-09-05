using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Enderman dịch chuyển tức thời 2 lần tới điểm ngẫu nhiên quanh target (bán kính TeleportRadius,
    /// cách nhau TeleportStepDelay giây), rồi dịch chuyển lần 3 vào tầm melee, quay mặt và gây
    /// TeleportFinalAttackDamage ngay lập tức.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanTeleportSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional)")] [SerializeField]
        private string _teleportTriggerParam = "";

        [Header("VFX (optional)")] [SerializeField]
        private ParticleSystem _teleportVfxPrefab; 

        private Monster _self;
        private EndermanData _stats;
        private int _teleportTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private int _hopIndex;
        private float _stepTimer;
        private Monster _channelTarget;
        private bool _hasFinalHit;


        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _teleportTriggerHash = Animator.StringToHash(_teleportTriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.EndermanStats;
            _cooldownTimer = _stats.TeleportCooldown;
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

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _hopIndex = 0;
            _stepTimer = GetStepDelay();
            _channelTarget = target;
            _hasFinalHit = false;

            _self.SetRunning(false);
            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_teleportTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_teleportTriggerHash, _teleportTriggerParam);
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
            _stepTimer -= Time.deltaTime;

            if (_stepTimer > 0f)
            {
                return;
            }

            if (_hopIndex < 2)
            {
                ExecuteHop();
                _stepTimer = GetStepDelay();
                return;
            }

            ExecuteFinalHit();
            EndChannel();
        }

        private void ExecuteHop()
        {
            if (!_isChanneling || _hopIndex >= 2 || _channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            Vector2 offset = Random.insideUnitCircle.normalized * _stats.TeleportRadius;
            Vector3 hopPosition = _channelTarget.Position + new Vector3(offset.x, 0f, offset.y);
            TeleportSelf(hopPosition, true);
            _hopIndex++;
        }

        private void ExecuteFinalHit()
        {
            if (!_isChanneling || _hasFinalHit || _channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            _hasFinalHit = true;

            Vector3 finalOffset = _self.Position - _channelTarget.Position;
            finalOffset.y = 0f;

            Vector3 direction = finalOffset.sqrMagnitude > 0.0001f
                ? finalOffset.normalized
                : Vector3.forward;

            float approachDistance = Mathf.Max(_stats.AttackRange * 0.8f, 0.5f);
            Vector3 finalPosition = _channelTarget.Position + direction * approachDistance;

            TeleportSelf(finalPosition, true);
            _channelTarget.Health.TakeDamage(_self, _stats.TeleportFinalAttackDamage);
        }

        private float GetStepDelay() => Mathf.Max(0.01f, _stats.TeleportStepDelay);

        private void TeleportSelf(Vector3 worldPosition, bool faceTargetAfter)
        {
            PlayTeleportPuff();
            _self.TeleportTo(worldPosition, false);

            if (faceTargetAfter && _channelTarget != null)
            {
                _self.FaceTowards(_channelTarget.Position);
            }
        }

        private void PlayTeleportPuff()
        {
            if (_teleportVfxPrefab == null)
            {
                return;
            }

            _teleportVfxPrefab.gameObject.SetActive(true);
            _teleportVfxPrefab.Play();
        }

        private void EndChannel()
        {
            _isChanneling = false;
            _cooldownTimer = _stats.TeleportCooldown;
            _channelTarget = null;
        }
    }
}
