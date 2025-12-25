using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TriggerEffect : MonoBehaviour
{
    public ParticleSystem effect;
    public int triggerCount = 0;
    public int triggerMax=1;
    private void OnTriggerEnter(Collider other)
    {
        triggerCount++;
        if (triggerCount > triggerMax)
        {
            return;
        }

        if (other.CompareTag("Player"))
        {
            Instantiate(effect, other.transform.position, Quaternion.identity);
        }
    }
}
