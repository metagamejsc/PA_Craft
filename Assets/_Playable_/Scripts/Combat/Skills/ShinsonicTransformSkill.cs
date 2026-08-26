using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Shinsonic theo dõi CurrentHealth/MaxHealth mỗi frame. Mỗi khi tỉ lệ máu tụt xuống ≤
    /// TransformHpThreshold (dùng chung 1 ngưỡng cho cả 3 mốc, mặc định 0.7 = còn 70%) thì biến hình lên
    /// stage tiếp theo (tăng Max HP + damage theo đúng bộ số của stage đó, đổi visual). Vì
    /// IncreaseMaxHealth hồi đầy phần máu vừa tăng nên tỉ lệ máu bật lại lên trên ngưỡng ngay sau khi
    /// biến hình, không bị kích hoạt lặp lại liên tiếp. Tối đa 3 lần biến hình/trận (khớp 4 model
    /// Phase 1-4 có sẵn: gốc + stage 1/2/3).
    /// </summary>
    [DisallowMultipleComponent]
    public class ShinsonicTransformSkill : MonoBehaviour, IMonsterSkill
    {
        private const float TransformChannelDuration = 0.5f;

        [Header("Animator (optional)")]
        [SerializeField] private string _stage1TriggerParam = "";
        [SerializeField] private string _stage2TriggerParam = "";
        [SerializeField] private string _stage3TriggerParam = "";

        [Header("Visual đổi model theo stage (optional)")]
        [SerializeField] private GameObject _baseVisual;
        [SerializeField] private GameObject _stage1Visual;
        [SerializeField] private GameObject _stage2Visual;
        [SerializeField] private GameObject _stage3Visual;

        private Monster _self;
        private MonsterHealth _health;
        private ShinsonicData _stats;
        private int _stage1TriggerHash;
        private int _stage2TriggerHash;
        private int _stage3TriggerHash;

        private int _currentStage;
        private bool _isChanneling;
        private float _channelTimer;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _stage1TriggerHash = Animator.StringToHash(_stage1TriggerParam);
            _stage2TriggerHash = Animator.StringToHash(_stage2TriggerParam);
            _stage3TriggerHash = Animator.StringToHash(_stage3TriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _health = self.Health;
            _stats = self.ShinsonicStats;
            _currentStage = 0;
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

            if (_currentStage >= 3 || _health == null || _health.IsDead || _health.MaxHealth <= 0f)
            {
                return;
            }

            float ratio = _health.CurrentHealth / _health.MaxHealth;

            if (ratio <= _stats.TransformHpThreshold)
            {
                TransformToNextStage();
            }
        }

        private void TransformToNextStage()
        {
            _currentStage++;

            float bonusMaxHealth;
            float bonusDamage;
            int triggerHash;
            string triggerParam;
            GameObject visual;

            switch (_currentStage)
            {
                case 1:
                    bonusMaxHealth = _stats.TransformStage1BonusMaxHealth;
                    bonusDamage = _stats.TransformStage1BonusDamage;
                    triggerHash = _stage1TriggerHash;
                    triggerParam = _stage1TriggerParam;
                    visual = _stage1Visual;
                    break;

                case 2:
                    bonusMaxHealth = _stats.TransformStage2BonusMaxHealth;
                    bonusDamage = _stats.TransformStage2BonusDamage;
                    triggerHash = _stage2TriggerHash;
                    triggerParam = _stage2TriggerParam;
                    visual = _stage2Visual;
                    break;

                default:
                    bonusMaxHealth = _stats.TransformStage3BonusMaxHealth;
                    bonusDamage = _stats.TransformStage3BonusDamage;
                    triggerHash = _stage3TriggerHash;
                    triggerParam = _stage3TriggerParam;
                    visual = _stage3Visual;
                    break;
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
            if (_stage3Visual != null) _stage3Visual.SetActive(_stage3Visual == activeVisual);
        }
    }
}
