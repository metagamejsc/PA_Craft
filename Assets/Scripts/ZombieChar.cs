using System.Linq;
using DG.Tweening;
using UnityEngine;

public class ZombieChar : BaseCharacter
{
    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
        health = LunaManager.ins.countDropFinal;
    }

    protected override void Update()
    {
        if (GameController.ins.isPauseGame)
        {
            return;
        }
        base.Update();
    }

    protected override void SearchForEnemy()
    {
        if (isDead)
        {
            return;
        }

        if (target)
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

    protected override void Die()
    {
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        animator.transform.parent = null;
        animator.transform.DORotate(Quaternion.Euler(0,0,-90).eulerAngles, 0.2f);
        Destroy(gameObject);
    }
}