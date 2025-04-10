using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerChar : BaseCharacter
{
    protected override void Update()
    {
#if !UNITY_EDITOR
        health = LunaManager.ins.playerHealh;
        damage = LunaManager.ins.playerDamage;
#endif
        HandleAttack();
        SearchForEnemy();
    }

    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
    }

    public override void TakeDamage(float dmg)
    {
        if (isDead)
        {
            return;
        }
        health -= dmg;
        if (health <= 0)
        {
            LunaManager.ins.ShowEndCard();
            isDead = true;
            Die();
        }
    }

    protected override void Die()
    {
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        animator.transform.parent = null;
        //Destroy(gameObject);
    }
}
