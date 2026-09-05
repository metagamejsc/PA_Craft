using System;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Toàn bộ số liệu riêng của Huggy - khai báo trực tiếp trên prefab Huggy, không qua asset chung.
    /// Huggy không có skill - để KnockbackForce = 0 để đối thủ bị stun đứng yên mỗi khi trúng đòn thường
    /// thay vì bị đẩy lùi.
    /// </summary>
    [Serializable]
    public struct HuggyData
    {
        [Header("Core")]
        public float MaxHealth;
        public float MoveSpeed;

        [Header("Melee Attack")]
        public float AttackDamage;
        public float AttackRange;
        public float AttackCooldown;

        [Header("Hit Reaction (KnockbackForce = 0 -> stun đối thủ khi trúng đòn)")]
        public float KnockbackForce;
        public float KnockbackDuration;
    }
}
