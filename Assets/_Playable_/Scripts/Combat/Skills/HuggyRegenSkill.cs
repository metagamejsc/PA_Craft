using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Huggy tự hồi máu RegenPerTick mỗi RegenTickInterval giây, chạy liên tục từ lúc spawn kể cả lúc
    /// idle/chase/bị stagger, không cần target, không cooldown, không channel. Dừng khi chết.
    /// </summary>
    [DisallowMultipleComponent]
    public class HuggyRegenSkill : MonoBehaviour, IMonsterSkill
    {
        private MonsterHealth _health;
        private MonsterStatsEntry _stats;
        private float _tickTimer;

        public bool IsChanneling => false;

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _health = self.Health;
            _stats = stats;
            _tickTimer = stats.RegenTickInterval;
        }

        public void Tick(Monster target)
        {
            if (_health == null || _health.IsDead)
            {
                return;
            }

            _tickTimer -= Time.deltaTime;

            if (_tickTimer > 0f)
            {
                return;
            }

            _tickTimer = _stats.RegenTickInterval;
            _health.Heal(_stats.RegenPerTick);
        }
    }
}
