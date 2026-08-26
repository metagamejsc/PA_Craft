using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Shinsonic theo dõi CurrentHealth/MaxHealth mỗi frame. Lần đầu tụt xuống ≤
    /// TransformStage1HpThreshold thì biến hình 1 (tăng Max HP + damage theo bộ số Stage1, đổi visual).
    /// Tụt tiếp ≤ TransformStage2HpThreshold (tính trên MaxHealth mới) thì biến hình 2. Mỗi mốc chỉ kích
    /// hoạt đúng 1 lần/trận.
    /// </summary>
    [DisallowMultipleComponent]
    public class ShinsonicTransformSkill : MonoBehaviour, IMonsterSkill
    {
        private const float TransformChannelDuration = 0.5f;

        [Header("Animator (optional)")]
        [SerializeField] private string _stage1TriggerParam = "";
        [SerializeField] private string _stage2TriggerParam = "";

        [Header("Visual đổi model theo stage (optional)")]
        [SerializeField] private GameObject _baseVisual;
        [SerializeField] private GameObject _stage1Visual;
        [SerializeField] private GameObject _stage2Visual;

        private Monster _self;
        private MonsterHealth _health;
        private MonsterStatsEntry _stats;
        private int _stage1TriggerHash;
        private int _stage2TriggerHash;

        private bool _hasTransformedStage1;
        private bool _hasTransformedStage2;
        private bool _isChanneling;
        private float _channelTimer;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _stage1TriggerHash = Animator.StringToHash(_stage1TriggerParam);
            _stage2TriggerHash = Animator.StringToHash(_stage2TriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _health = self.Health;
            _stats = stats;
            _hasTransformedStage1 = false;
            _hasTransformedStage2 = false;
            _isChanneling = false;

            SetVisual(_baseVisual);
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                _channelTimer -= Time.deltaTime;

                if (_channelTimer <= 0f)
                {
                    _isChanneling = false;
                }

                return;
            }

            if (_health == null || _health.IsDead || _health.MaxHealth <= 0f)
            {
                return;
            }

            float ratio = _health.CurrentHealth / _health.MaxHealth;

            if (!_hasTransformedStage1 && ratio <= _stats.TransformStage1HpThreshold)
            {
                TransformTo(
                    true,
                    _stats.TransformStage1BonusMaxHealth,
                    _stats.TransformStage1BonusDamage,
                    _stage1TriggerHash,
                    _stage1TriggerParam,
                    _stage1Visual);
                return;
            }

            if (_hasTransformedStage1 && !_hasTransformedStage2 && ratio <= _stats.TransformStage2HpThreshold)
            {
                TransformTo(
                    false,
                    _stats.TransformStage2BonusMaxHealth,
                    _stats.TransformStage2BonusDamage,
                    _stage2TriggerHash,
                    _stage2TriggerParam,
                    _stage2Visual);
            }
        }

        private void TransformTo(
            bool isStage1,
            float bonusMaxHealth,
            float bonusDamage,
            int triggerHash,
            string triggerParam,
            GameObject visual)
        {
            if (isStage1)
            {
                _hasTransformedStage1 = true;
            }
            else
            {
                _hasTransformedStage2 = true;
            }

            _isChanneling = true;
            _channelTimer = TransformChannelDuration;

            _health.IncreaseMaxHealth(bonusMaxHealth, true);
            _self.Combat.AddAttackDamageBonus(bonusDamage);

            if (!string.IsNullOrEmpty(triggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(triggerHash, triggerParam);
            }

            SetVisual(visual);
        }

        private void SetVisual(GameObject activeVisual)
        {
            if (_baseVisual != null) _baseVisual.SetActive(_baseVisual == activeVisual);
            if (_stage1Visual != null) _stage1Visual.SetActive(_stage1Visual == activeVisual);
            if (_stage2Visual != null) _stage2Visual.SetActive(_stage2Visual == activeVisual);
        }
    }
}
