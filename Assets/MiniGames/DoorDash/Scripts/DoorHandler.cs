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
            PlayerMovement2 player = other.GetComponent<PlayerMovement2>();
            if (player != null)
            {
                if (!isDoorCanPass)
                {
                    navObstacle.SetActive(true);
                }
                else
                {
                    if (doorRigis[0].isKinematic==true)
                    {
                        AudioManager.ins.PlaySoundOpenDoor();
                    }
                    foreach (Rigidbody rb in doorRigis)
                        rb.isKinematic = false;
                }
                return;
            }
            BotDoorAI bot = other.GetComponent<BotDoorAI>();
            if (bot == null) return;

            if (!isDoorCanPass)
            {
                navObstacle.SetActive(true);
                bot.OnDoorFailed();
            }
            else
            {
                if (doorRigis[0].isKinematic==true)
                {
                    AudioManager.ins.PlaySoundOpenDoor();
                }
                foreach (Rigidbody rb in doorRigis)
                    rb.isKinematic = false;
                bot.OnDoorPassed();
            }
        }

    }
}


