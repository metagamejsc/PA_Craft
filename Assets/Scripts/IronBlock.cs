using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class IronBlock : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player")&& other.GetComponent<PlayerMovement2>()!=null)
        {
            TutorialBuildBlock.ins.ShowStep();
            Destroy(gameObject);
        }
    }
}
