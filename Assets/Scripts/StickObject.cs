using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StickObject : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player")&& other.GetComponent<PlayerMovement2>()!=null)
        {
            AudioManager.ins.PlaySoundGetItem();
            if (TutorialBuildBlock.ins.stickCount<3)
            {
                TutorialBuildBlock.ins.AddStick();
            }
            Destroy(gameObject);
        }
    }
}
