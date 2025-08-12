using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DG.Tweening;
using UnityEngine;

public class ZombieChar : BaseCharacter
{
    public Material material;
    public SkinnedMeshRenderer[] lstMaterials;
    public AnimationClip holdHandAnimationClip;
    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
        //health = LunaManager.ins.countDropFinal;
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material = new Material(material);
        }
    }
    protected override void Update()
    {
        if (GameController.ins.isPauseGame)
        {
            return;
        }
        base.Update();
    }
    
    

    public override void HandleAttack()
    {
        if (target==null)
        {
            return;
        }
        if (isDead)
        {
            return;
        }
        if (target != null && Vector3.Distance(transform.position, target.position) <= detectionRadiusMin)
        {
            GameObject.FindObjectOfType<TutorialBuildBlock>().ShowStep();
            /*isDead = true;
            rigidbody.isKinematic = true;
            var targetNew = target.transform.position - transform.forward*2;
            transform.DOMoveY(targetNew.y+3, attackCooldown/2)
                .SetEase(Ease.Linear).OnComplete(() =>
                {
                    transform.DOMoveY(targetNew.y, attackCooldown/2)
                        .SetEase(Ease.Linear);
                });
            transform.DOMoveX(targetNew.x,attackCooldown).OnComplete(() =>
            {
                
            });
            transform.DOMoveZ(targetNew.z,attackCooldown).OnComplete(() =>
            {
                
            });
            animator.SetFloat("AttackSpeed", atkAnimationClip.length/ attackCooldown);  
            animator.SetTrigger("Attack");*/
            // Reset thời gian hồi chiêu
        }
    }
    public void HandleHoldHand()
    {
        isDead = true;
        rigidbody.isKinematic = true;
        rigidbody.useGravity = false;
        capsuleCollider.enabled = false;
        animator.Play(holdHandAnimationClip.name, 0, 0f);
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

    public override void TakeDamage(float dmg)
    {
        
        if (isDead)
        {
            return;
        }

        detectionRadiusMax = 999;
        health -= dmg;
        
        StartCoroutine(IeNhapNhay(2f));
        if (health <= 0)
        {
            GameController.ins.EnemyDead();
            animator.SetTrigger("Dead");
            isDead = true;
            Die();
        }
    }

    public void SetDead()
    {
        StopAllCoroutines();
        DOTween.KillAll();
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = false;
        capsuleCollider.enabled = true;
        transform.DORotate(new Vector3(0, 0, 90), 1f, RotateMode.FastBeyond360).SetEase(Ease.InOutQuad).OnComplete(() =>
        {
            isDead = true;
        });
    }
    public IEnumerator IeNhapNhay(float time)
    {
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material.SetColor("_Color", Color.red);
        }
        yield return new WaitForSeconds(0.1f);
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material.SetColor("_Color", Color.white);
        }
    }
}
