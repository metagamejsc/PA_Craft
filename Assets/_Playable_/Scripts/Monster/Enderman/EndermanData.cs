using System;
using UnityEngine;

namespace Playable
{
    /// <summary>Toàn bộ số liệu riêng của Enderman - khai báo trực tiếp trên prefab Enderman, không qua asset chung.</summary>
    [Serializable]
    public struct EndermanData
    {
        [Header("Core")]
        public float MaxHealth;
        public float MoveSpeed;

        [Header("Melee Attack")]
        public float AttackDamage;
        public float AttackRange;
        public float AttackCooldown;

        [Header("Hit Reaction (KnockbackForce = 0 -> đứng yên/stun thay vì đẩy lùi khi trúng đòn thường)")]
        public float KnockbackForce;
        public float KnockbackDuration;

        [Header("Skill 1 - Arm Reach")]
        public float ArmReachCooldown;
        public float ArmReachDamage;
        public float ArmReachDuration;
        public float ArmReachRange;
        public float ArmReachStunDuration;

        [Header("Skill 2 - Teleport")]
        public float TeleportCooldown;
        public float TeleportRadius;
        public float TeleportStepDelay;
        public float TeleportFinalAttackDamage;
    }
}
