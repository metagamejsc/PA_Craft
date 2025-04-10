using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class ZombieChar : BaseCharacter
{
    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
        
#if !UNITY_EDITOR
        health = LunaManager.ins.zombieHealt;
        damage = LunaManager.ins.zombieDamage;
#endif
    }
    protected override void SearchForEnemy()
    {
        if (isDead)
        {
            return;
        }

        if (GameController.ins.isStartGame==false)
        {
            return;
        }
        Collider[] hits = Physics.OverlapSphere(transform.position, detectionRadiusMax);
        target = hits
            .Select(h => h.transform)
            .Where(t => t.CompareTag("Player") && 
                        t.TryGetComponent<BaseCharacter>(out var player) && 
                        !player.isDead) // Kiểm tra có component Player và chưa chết
            .OrderBy(t => Vector3.Distance(transform.position, t.position))
            .FirstOrDefault();
    }
}
