using System;
using UnityEngine;

namespace Playable
{
    /// <summary>Toàn bộ số liệu riêng của Iron Golem - khai báo trực tiếp trên prefab Golem, không qua asset chung.</summary>
    [Serializable]
    public struct IronGolemData
    {
        [Header("Core")]
        public float MaxHealth;
        public float MoveSpeed;

        [Header("Melee Attack")]
        public float AttackDamage;
        public float AttackRange;
        public float AttackCooldown;

        [Header("Hit Reaction")]
        public float KnockbackForce;
        public float KnockbackDuration;

        [Header("Skill 1 - Ground Slam")]
        public float SlamCooldown;
        public float SlamDamage;
        public float SlamLaunchHeight;
        public float SlamAirTime;
        public float SlamStunDuration;

        [Header("Skill 2 - TNT Barrage")]
        public float TntBarrageCooldown;
        public float TntBarrageRange;
        public float TntBarrageDamage;
        public float TntBarrageDuration;
        public float TntBarrageSpeed;
        public float TntBarrageKnockbackForce;
    }
}
