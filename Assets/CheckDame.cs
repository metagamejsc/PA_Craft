using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CheckDame : MonoBehaviour
{
    public bool canDestroy;
    public void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Enemy"))
        {
            other.GetComponent<ZombieChar>().TakeDamage(1);
            if (canDestroy)
            {
                Destroy(gameObject);
            }
        }
    }
}
