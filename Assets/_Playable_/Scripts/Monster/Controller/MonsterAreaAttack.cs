using UnityEngine;

namespace Playable
{
    // Iterate the existing combat registry, not colliders: one hit per monster, no allocations.
    internal static class MonsterAreaAttack
    {
        public static void Apply(Monster owner, Vector3 center, float radius, float damage,
            float push = 0f, float stun = 0f, float cone = 360f, float pull = 0f,
            float launchHeight = 0f, float airTime = 0f, float poison = 0f)
        {
            float radiusSqr = radius * radius;
            float minimumDot = Mathf.Cos(cone * 0.5f * Mathf.Deg2Rad);
            // Damage may remove entries, so traverse backwards.
            for (int i = MonsterCombat.ActiveCount - 1; i >= 0; i--)
            {
                Monster other = MonsterCombat.ActiveMonster(i);
                if (other == null || other == owner || !other.isActiveAndEnabled || other.IsDead || other.Type == owner.Type) continue;
                Vector3 delta = other.Position - center;
                delta.y = 0f;
                float sqr = delta.sqrMagnitude;
                if (sqr > radiusSqr) continue;
                if (cone < 360f && sqr > 0.01f && Vector3.Dot(owner.transform.forward, delta.normalized) < minimumDot) continue;
                if (damage > 0f) other.Health.TakeDamage(owner, damage);
                if (other.IsDead) continue;
                if (pull > 0f && sqr > 1f && !other.IsAnySkillChanneling)
                    other.transform.position -= delta.normalized * Mathf.Min(pull, Mathf.Sqrt(sqr) - 1f);
                if (stun > 0f) other.Health.ApplyCrowdControl(center, push, stun);
                if (launchHeight > 0f) other.Health.PlayLaunch(launchHeight, airTime);
                if (poison > 0f) other.Health.ApplyPoison(poison, 0.5f, 3f);
            }
        }
    }
}
