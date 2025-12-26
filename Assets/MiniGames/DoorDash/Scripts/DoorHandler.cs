using UnityEngine;

namespace Minigames.DoorDash
{
    public class DoorHandler : MonoBehaviour
    {
        [SerializeField] private Rigidbody[] doorRigis;
        [SerializeField] private GameObject navObstacle;

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
            BaseCharacter targetCharacter = other.GetComponent<BaseCharacter>();
            if (targetCharacter != null)
            {
                if(!isDoorCanPass)
                {
                    navObstacle.SetActive(true);
                }
                else
                {
                    foreach (Rigidbody rigidbody in doorRigis)
                    {
                        rigidbody.isKinematic = false;
                    }
                }
            }
        }
    }
}


