using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Creeper hết PoisonCooldown + target trong AttackRange thì áp độc DOT lên target (không gây damage
    /// tức thời riêng - chỉ bào máu theo tick). Không channel, chạy song song với đòn melee thường của
    /// MonsterCombat (là hành động cộng thêm, không thay thế đòn đánh).
    /// </summary>
    [DisallowMultipleComponent]
    public class CreeperPoisonSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional, để trống = dùng lại anim đánh thường)")]
        [SerializeField] private string _poisonTriggerParam = "";

        private Monster _self;
        private MonsterStatsEntry _stats;
        private int _poisonTriggerHash;

        private float _cooldownTimer;

        public bool IsChanneling => false;

        private void Awake()
        {
            _poisonTriggerHash = Animator.StringToHash(_poisonTriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _stats = stats;
            _cooldownTimer = stats.PoisonCooldown;
        }

        public void Tick(Monster target)
        {
            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.AttackRange * _stats.AttackRange)
            {
                return;
            }

            _cooldownTimer = _stats.PoisonCooldown;

            if (!string.IsNullOrEmpty(_poisonTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_poisonTriggerHash, _poisonTriggerParam);
            }

            target.Health.ApplyPoison(_stats.PoisonDamagePerTick, _stats.PoisonTickInterval, _stats.PoisonDuration);
        }
    }
}
