using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Enderman alternates far/near teleports and strikes on every return, with departure/arrival VFX.
    /// Five reduced-damage strikes preserve the source combo within a short playable battle.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanTeleportSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional)")] [SerializeField]
        private string _teleportTriggerParam = "";

        [Header("VFX (optional)")] [SerializeField]
        private GameObject _teleportVfxPrefab;
        [SerializeField] private GameObject _teleportStartVfxPrefab;
        [SerializeField] private int _teleportStrikeCount = 5;

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
            _cooldownTimer = Random.Range(2.5f, 4f);
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
            _self.Feedback?.Skill(_self.Position, false);
            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_teleportTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_teleportTriggerHash, _teleportTriggerParam);
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
            _stepTimer -= Time.deltaTime;

            if (_stepTimer > 0f)
            {
                return;
            }

            if (_hopIndex < Mathf.Max(1, _teleportStrikeCount) * 2)
            {
                ExecuteHop();
                _stepTimer = GetStepDelay();
                return;
            }

            EndChannel();
        }

        private void ExecuteHop()
        {
            if (!_isChanneling || _channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                return;
            }

            if (_hopIndex % 2 == 0)
            {
                _self.SetAnimatorBool(Animator.StringToHash("IsAttack"), "IsAttack", false);
                Vector2 offset = Random.insideUnitCircle.normalized * _stats.TeleportRadius;
                Vector3 hopPosition = _channelTarget.Position + new Vector3(offset.x, 0f, offset.y);
                TeleportSelf(hopPosition, true);
            }
            else
            {
                _hasFinalHit = false;
                ExecuteFinalHit();
            }
            _hopIndex++;
        }

        private void ExecuteFinalHit()
        {
            if (!_isChanneling || _hasFinalHit || _channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                return;
            }

            _hasFinalHit = true;

            Vector3 finalOffset = _self.Position - _channelTarget.Position;
            finalOffset.y = 0f;

            Vector3 direction = finalOffset.sqrMagnitude > 0.0001f
                ? finalOffset.normalized
                : Vector3.forward;

            float approachDistance = Mathf.Max(_stats.AttackRange * 0.8f, _self.BodyRadius + _channelTarget.BodyRadius + 0.1f);
            Vector3 finalPosition = _channelTarget.Position + direction * approachDistance;

            TeleportSelf(finalPosition, true);
            _self.PlayAnimatorTrigger(Animator.StringToHash("IsAttack"), "IsAttack");
            MonsterAreaAttack.Apply(_self, _self.Position, approachDistance + 0.5f,
                _stats.TeleportFinalAttackDamage * 0.4f, 0.8f, 0.25f);
            _self.Feedback?.Attack(_channelTarget.Position);
        }

        private float GetStepDelay() => Mathf.Max(0.01f, _stats.TeleportStepDelay);

        private void TeleportSelf(Vector3 worldPosition, bool faceTargetAfter)
        {
            MonsterBattleEffects.Play(_teleportStartVfxPrefab != null ? _teleportStartVfxPrefab : _teleportVfxPrefab,
                _self.Position, Quaternion.identity, 0.8f);
            _self.TeleportTo(worldPosition, false);
            PlayTeleportPuff();

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

            MonsterBattleEffects.Play(_teleportVfxPrefab, _self.Position, Quaternion.identity, 0.8f);
        }

        private void EndChannel()
        {
            _self.SetAnimatorBool(Animator.StringToHash("IsAttack"), "IsAttack", false);
            _isChanneling = false;
            _cooldownTimer = _stats.TeleportCooldown;
            _channelTarget = null;
        }
    }
}
