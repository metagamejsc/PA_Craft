using System;
using UnityEngine;

namespace Playable
{
    /// <summary>Toàn bộ số liệu riêng của Shinsonic - khai báo trực tiếp trên prefab Sonic, không qua asset chung.</summary>
    [Serializable]
    public struct ShinsonicData
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

        [Header("Skill - Transform (3 lần, dùng chung 1 ngưỡng % máu cho cả 3 mốc)")]
        public float TransformHpThreshold;
        public float TransformStage1BonusMaxHealth;
        public float TransformStage1BonusDamage;
        public float TransformStage2BonusMaxHealth;
        public float TransformStage2BonusDamage;
        public float TransformStage3BonusMaxHealth;
        public float TransformStage3BonusDamage;
    }
}
