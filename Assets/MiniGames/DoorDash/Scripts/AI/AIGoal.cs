using UnityEngine;

namespace Minigames.DoorDash.AI
{
    public class AIGoal : MonoBehaviour
    {
        public static AIGoal Instance;

        private void Awake()
        {
            Instance = this;
        }

        public Vector3 Position => transform.position;
    }
}


