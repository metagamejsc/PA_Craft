using System;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float damage = 1f;

    private void OnTriggerEnter(Collider other)
    {
        MonsterController monster = other.gameObject.GetComponent<MonsterController>();
        if (monster != null)
        {
            monster.TakeDamage(damage);
        }

        Destroy(gameObject);
    }
    
}