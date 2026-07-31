using UnityEngine;

namespace Playable
{
    public class Monster : MonoBehaviour
    {
        private void OnTriggerEnter(Collider other)
        {
            PlayerAction action = other.gameObject.GetComponent<PlayerAction>();
            if (action != null)
            {
                GameController.Instance.Steal();
            }
        }

        private void OnTriggerExit(Collider other)
        {
            PlayerAction action = other.gameObject.GetComponent<PlayerAction>();
            if (action != null)
            {
                GameController.Instance.UnSteal();
            }
        }
    }
}