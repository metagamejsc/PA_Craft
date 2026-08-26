using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Creeper (Add Component thủ công), điền CreeperData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class CreeperMonsterData : MonoBehaviour
    {
        [SerializeField]
        private CreeperData _data = new CreeperData
        {
            MaxHealth = 90f, // máu giấy, đổi lại DPS tầm xa ổn định
            MoveSpeed = 1.8f,

            AttackDamage = 5f, // gần như không dùng tới vì AttackRange nhỏ, luôn rơi vào nhánh ném bom
            AttackRange = 0.1f,
            AttackCooldown = 1f,

            KnockbackForce = 0.4f,
            KnockbackDuration = 0.3f,

            BombDamage = 16f,
            BombRange = 5f,
            BombCooldown = 1.8f, // ném TNT liên tục, đây chính là nhịp tấn công thật của Creeper
            BombSpeed = 7f,
            BombKnockbackForce = 0.4f
        };

        public CreeperData Data => _data;
    }
}
