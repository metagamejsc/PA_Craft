using UnityEngine;

namespace Playable
{
    public sealed class ShinsonicVortexSkill : MonoBehaviour, IMonsterSkill
    {
        public GameObject vortexEffect;
        public float cooldown = 6f;
        public float radius = 8f;
        public float duration = 2.5f;
        private Monster _self;
        private ShinsonicTransformSkill _phase;
        private float _ready, _remaining, _hitTimer;
        public bool IsChanneling => _remaining > 0f;
        public void Init(Monster self)
        {
            _self = self;
            _phase = GetComponent<ShinsonicTransformSkill>();
            _ready = 1f;
            _remaining = 0f;
        }

        public void Tick(Monster target)
        {
            if (IsChanneling)
            {
                _remaining -= Time.deltaTime;
                _hitTimer -= Time.deltaTime;
                bool hit = _hitTimer <= 0f;
                MonsterAreaAttack.Apply(_self, _self.Position, radius, hit ? 6f : 0f,
                    0f, hit ? 0.2f : 0f, 150f, 5f * Time.deltaTime);
                if (hit) _hitTimer = 0.25f;
                if (_remaining <= 0f)
                {
                    _self.Health.IsDamageImmune = false;
                    _self.SetAnimatorBool(Animator.StringToHash("IsSkill1"), "IsSkill1", false);
                    _ready = cooldown;
                }
                return;
            }
            _ready -= Time.deltaTime;
            if (_ready > 0f || _phase == null || _phase.CurrentStage < 3 || target == null || target.IsDead || _self.IsAnySkillChanneling) return;
            if ((target.Position - _self.Position).sqrMagnitude > radius * radius) return;
            _remaining = duration;
            _self.Health.IsDamageImmune = true;
            _hitTimer = 0.5f;
            _self.FaceTowards(target.Position);
            _self.SetAnimatorBool(Animator.StringToHash("IsSkill1"), "IsSkill1", true);
            _self.Feedback?.Skill(_self.Position, false);
            MonsterBattleEffects.Play(vortexEffect, _self.Position + Vector3.up, transform.rotation, duration);
        }

        private void OnDisable()
        {
            if (_self != null) _self.Health.IsDamageImmune = false;
            _remaining = 0f;
        }
    }
}
