using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Shinsonic (Add Component thủ công), điền ShinsonicData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class ShinsonicMonsterData : MonoBehaviour
    {
        [SerializeField]
        private ShinsonicData _data = new ShinsonicData
        {
            MaxHealth = 100f, // yếu nhất lúc chưa biến hình, bù lại bùng nổ dần qua 3 stage
            MoveSpeed = 2f,

            AttackDamage = 10f,
            AttackRange = 1.5f,
            AttackCooldown = 1.2f,

            KnockbackForce = 0.4f,
            KnockbackDuration = 0.3f,

            TransformHpThreshold = 0.7f,
            TransformStage1BonusMaxHealth = 40f, // 140 HP / 18 dmg sau stage 1
            TransformStage1BonusDamage = 8f,
            TransformStage2BonusMaxHealth = 60f, // 200 HP / 30 dmg sau stage 2
            TransformStage2BonusDamage = 12f,
            TransformStage3BonusMaxHealth = 80f, // 280 HP / 45 dmg sau stage 3 (full biến hình)
            TransformStage3BonusDamage = 15f
        };

        public ShinsonicData Data => _data;
    }
}
