using UnityEngine;

namespace Playable
{
    // Phase 2 approach-and-roar from MobBossJumpScareActionP2, without source navigation dependencies.
    [DisallowMultipleComponent]
    public sealed class ShinsonicRoarSkill : MonoBehaviour, IMonsterSkill
    {
        public float cooldown = 4f;
        public float range = 4f;
        public float duration = 1f;
        private Monster _self;
        private ShinsonicTransformSkill _phase;
        private Monster _target;
        private float _ready, _remaining;
        private static readonly int RoarHash = Animator.StringToHash("IsSkill1");
        public bool IsChanneling => _remaining > 0f;

        public void Init(Monster self)
        {
            _self = self;
            _phase = GetComponent<ShinsonicTransformSkill>();
            _ready = 0.8f;
            EndRoar();
        }

        public void Tick(Monster target)
        {
            if (IsChanneling)
            {
                _remaining -= Time.deltaTime;
                if (_target == null || !_target.isActiveAndEnabled || _target.IsDead || _remaining <= 0f)
                {
                    EndRoar();
                    _ready = cooldown;
                }
                else _self.FaceTowards(_target.Position);
                return;
            }
            _ready -= Time.deltaTime;
            if (_ready > 0f || _phase == null || _phase.CurrentStage != 1
                || target == null || !target.isActiveAndEnabled || target.IsDead || _self.IsAnySkillChanneling) return;
            Vector3 delta = target.Position - _self.Position;
            delta.y = 0f;
            if (delta.sqrMagnitude > range * range) return;
            _target = target;
            _remaining = Mathf.Max(0.1f, duration);
            _self.FaceTowards(target.Position);
            _self.SetAnimatorBool(RoarHash, "IsSkill1", true);
            _self.Feedback?.Skill(_self.Position, false);
        }

        private void EndRoar()
        {
            _remaining = 0f;
            _target = null;
            if (_self != null) _self.SetAnimatorBool(RoarHash, "IsSkill1", false);
        }
        private void OnDisable() { EndRoar(); }
    }
}
