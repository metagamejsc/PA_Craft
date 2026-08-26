using System;
using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    [Serializable]
    public class MonsterStatsEntry
    {
        public MonsterType Type;

        [Header("Core")]
        public float MaxHealth = 100f;
        public float MoveSpeed = 1.5f;

        [Header("Melee Attack")]
        public float AttackDamage = 20f;
        public float AttackRange = 1.5f;
        public float AttackCooldown = 1.5f;

        [Header("Bomb (ranged)")]
        public float BombDamage = 15f;
        public float BombRange = 5f;
        public float BombCooldown = 3f;
        public float BombSpeed = 8f;
        public float BombKnockbackForce = 0.5f;

        [Header("Hit Reaction (chung mọi loại sát thương)")]
        public float KnockbackForce = 0.4f;
        public float KnockbackDuration = 0.35f;

        [Header("Enderman - Arm Reach")]
        public float ArmReachCooldown = 8f;
        public float ArmReachDamage = 15f;
        public float ArmReachDuration = 2f;
        public float ArmReachRange = 3f;
        public float ArmReachStunDuration = 1f;

        [Header("Enderman - Teleport")]
        public float TeleportCooldown = 10f;
        public float TeleportRadius = 3f;
        public float TeleportStepDelay = 0.3f;
        public float TeleportFinalAttackDamage = 20f;

        [Header("Iron Golem - Ground Slam")]
        public float SlamCooldown = 8f;
        public float SlamDamage = 25f;
        public float SlamLaunchHeight = 2f;
        public float SlamAirTime = 1f;
        public float SlamStunDuration = 1f;

        [Header("Creeper - Poison")]
        public float PoisonCooldown = 6f;
        public float PoisonDamagePerTick = 3f;
        public float PoisonTickInterval = 1f;
        public float PoisonDuration = 5f;

        [Header("Huggy - Regen")]
        public float RegenPerTick = 2f;
        public float RegenTickInterval = 1f;

        [Header("Shinsonic - Transform")]
        public float TransformStage1HpThreshold = 0.7f;
        public float TransformStage2HpThreshold = 0.3f;
        public float TransformStage1BonusMaxHealth = 50f;
        public float TransformStage1BonusDamage = 10f;
        public float TransformStage2BonusMaxHealth = 100f;
        public float TransformStage2BonusDamage = 20f;
    }

    [CreateAssetMenu(fileName = "MonsterStatsTable", menuName = "Playable/Monster Stats Table")]
    public class MonsterStatsTable : ScriptableObject
    {
        [SerializeField] private List<MonsterStatsEntry> _entries = new List<MonsterStatsEntry>();

        private static readonly MonsterStatsEntry _fallbackEntry = new MonsterStatsEntry();

        public MonsterStatsEntry GetEntry(MonsterType type)
        {
            for (int i = 0; i < _entries.Count; i++)
            {
                if (_entries[i] != null && _entries[i].Type == type)
                {
                    return _entries[i];
                }
            }

            MonsterDebug.LogError(
                "MONSTER STATS",
                "Không tìm thấy MonsterStatsEntry cho loại " + type + " trong bảng - dùng giá trị mặc định.");

            return _fallbackEntry;
        }
    }
}
