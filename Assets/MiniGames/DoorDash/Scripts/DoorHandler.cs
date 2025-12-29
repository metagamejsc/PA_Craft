using UnityEngine;

namespace Minigames.DoorDash
{
    public class DoorHandler : MonoBehaviour
    {
        [SerializeField] private Rigidbody[] doorRigis;
        [SerializeField] private GameObject navObstacle;
        public int groupIndex;

        public int doorIndex;
        private bool isDoorCanPass;

        private void Start()
        {
            navObstacle.SetActive(false);
        }

        public void ActiveDoor()
        {
            isDoorCanPass = true;

            foreach (Rigidbody rigidbody in doorRigis)
            {
                rigidbody.isKinematic = true;
            }
        }

        public void DeActiveDoor()
        {
            isDoorCanPass = false;

            foreach (Rigidbody rigidbody in doorRigis)
            {
                rigidbody.isKinematic = true;
            }
        }

        private void OnTriggerEnter(Collider other)
        {
            BotDoorAI bot = other.GetComponent<BotDoorAI>();
            if (bot == null) return;

            if (!isDoorCanPass)
            {
                navObstacle.SetActive(true);
                bot.OnDoorFailed();
            }
            else
            {
                foreach (Rigidbody rb in doorRigis)
                    rb.isKinematic = false;

                bot.OnDoorPassed();
            }
        }

    }
}


