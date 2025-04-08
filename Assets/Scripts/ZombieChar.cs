using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class ZombieChar : BaseCharacter
{
    protected override void SearchForEnemy()
    {
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
