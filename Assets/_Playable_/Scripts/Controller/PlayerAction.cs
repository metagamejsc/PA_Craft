using System;
using UnityEngine;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        private void OnTriggerEnter(Collider other)
        {
            if (other.CompareTag("House"))
            {
                GameController.Instance.IsSafe = true;
            }
        }

        private void OnTriggerExit(Collider other)
        {
            if (other.CompareTag("House"))
            {
                GameController.Instance.IsSafe = false;
            }
        }
    }
}