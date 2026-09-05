using System;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Toàn bộ số liệu riêng của Creeper - khai báo trực tiếp trên prefab Creeper, không qua asset chung.
    /// Creeper không có skill - đòn "attack" của nó chính là ném TNT (dùng bộ số Bomb*), nên để
    /// AttackRange rất nhỏ (gần 0) để MonsterCombat luôn rơi vào nhánh ném bom thay vì cận chiến.
    /// </summary>
    [Serializable]
    public struct CreeperData
    {
        [Header("Core")] public float MaxHealth;
        public float MoveSpeed;

        [Header("Melee Attack (để AttackRange gần 0 để luôn dùng TNT bên dưới thay vì cận chiến)")]
        public float AttackDamage;

        public float AttackRange;
        public float AttackCooldown;

        [Header("Hit Reaction")] public float KnockbackForce;
        public float KnockbackDuration;

        [Header("Bomb (TNT ném mỗi lần attack)")]
        public float BombDamage;

        public float BombRange;
        public float BombCooldown;
        public float BombSpeed;
        public float BombKnockbackForce;
    }
}