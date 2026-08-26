using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Enderman (Add Component thủ công), điền EndermanData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanMonsterData : MonoBehaviour
    {
        [SerializeField]
        private EndermanData _data = new EndermanData
        {
            MaxHealth = 110f,
            MoveSpeed = 2.2f,

            AttackDamage = 12f,
            AttackRange = 1.6f,
            AttackCooldown = 1.3f,

            KnockbackForce = 0f, // đứng yên/stun khi trúng đòn thường thay vì đẩy lùi
            KnockbackDuration = 0.4f,

            ArmReachCooldown = 8f,
            ArmReachDamage = 18f,
            ArmReachDuration = 2f,
            ArmReachRange = 3f,
            ArmReachStunDuration = 1.5f,

            TeleportCooldown = 12f,
            TeleportRadius = 3f,
            TeleportStepDelay = 0.25f,
            TeleportFinalAttackDamage = 20f
        };

        public EndermanData Data => _data;
    }
}
