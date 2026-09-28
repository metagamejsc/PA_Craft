using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public sealed class MonsterBattleFeedback : MonoBehaviour
    {
        public GameObject hitEffect;
        public GameObject skillEffect;
        public GameObject deathEffect;
        public AudioClip attackSound;
        public AudioClip skillSound;
        public AudioClip deathSound;

        public void Attack(Vector3 position)
        {
            MonsterBattleEffects.Play(hitEffect, position + Vector3.up, Quaternion.identity, 0.7f);
            MonsterBattleEffects.Sound(attackSound, 0.35f);
        }

        public void Skill(Vector3 position, bool visual = true)
        {
            if (visual) MonsterBattleEffects.Play(skillEffect, position, transform.rotation, 1.5f);
            MonsterBattleEffects.Sound(skillSound != null ? skillSound : attackSound);
        }

        public void Death(Vector3 position)
        {
            MonsterBattleEffects.Play(deathEffect, position, Quaternion.identity, 2f);
            MonsterBattleEffects.Sound(deathSound != null ? deathSound : attackSound);
        }
    }
}
