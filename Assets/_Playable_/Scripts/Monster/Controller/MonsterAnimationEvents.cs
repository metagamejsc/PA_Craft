using UnityEngine;

namespace Playable
{
    public abstract class MonsterAnimationEvents : MonoBehaviour
    {
        protected Monster Monster { get; private set; }

        protected virtual void Awake()
        {
            Monster = GetComponentInParent<Monster>();

            if (Monster == null)
            {
                Debug.LogError($"[{GetType().Name}] Không tìm thấy Monster ở object cha của {name}.", this);
            }
        }

        public void AttackHit()
        {
            Monster?.Combat?.OnAttackHitAnimationEvent();
        }

        public void DeathFinished()
        {
            Monster?.OnDeathAnimationFinished();
        }
    }
}