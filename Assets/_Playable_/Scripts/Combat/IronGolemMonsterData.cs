using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Iron Golem (Add Component thủ công), điền IronGolemData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class IronGolemMonsterData : MonoBehaviour
    {
        [SerializeField]
        private IronGolemData _data = new IronGolemData
        {
            MaxHealth = 220f, // tankiest trong 5 loại
            MoveSpeed = 1.3f, // chậm, bù lại máu trâu + damage cao

            AttackDamage = 20f,
            AttackRange = 1.8f,
            AttackCooldown = 1.6f,

            KnockbackForce = 0.5f,
            KnockbackDuration = 0.35f,

            SlamCooldown = 10f,
            SlamDamage = 30f,
            SlamLaunchHeight = 2.5f,
            SlamAirTime = 1f,
            SlamStunDuration = 1f,

            TntBarrageCooldown = 14f,
            TntBarrageRange = 6f,
            TntBarrageDamage = 8f, // damage/phát, bắn ~5 phát mỗi lần dùng skill
            TntBarrageStartDuration = 0.3f,
            TntBarrageLoopDuration = 1.5f,
            TntBarrageEndDuration = 0.3f,
            TntBarrageShotInterval = 0.3f,
            TntBarrageSpeed = 7f,
            TntBarrageKnockbackForce = 0.3f
        };

        public IronGolemData Data => _data;
    }
}
