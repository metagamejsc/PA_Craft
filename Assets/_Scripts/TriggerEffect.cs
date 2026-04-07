using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TriggerEffect : MonoBehaviour
{
    public int timeTrigger=0;
    public int MaxTimeTrigger=1;
    public ParticleSystem triggerEffect;
    public AudioClip triggerSound;
    public AudioSource audioSource;
    
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            timeTrigger++;
            if (timeTrigger<=MaxTimeTrigger)
            {
                audioSource.PlayOneShot(triggerSound);
                triggerEffect.Play();
                LunaManager.ins.ShowWinCard();
            }
        }
    }
}
