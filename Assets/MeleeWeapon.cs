using UnityEngine;

public class MeleeWeapon : Weapon
{
    public Animator animator;
    public AnimationClip attackClip;
    public BoxCollider hitbox;

    public void Start()
    {
        if (animator == null)
        {
            //animator = GetComponentInParent<Animator>();
        }
        
        if (hitbox == null)
        {
            hitbox=GetComponent<BoxCollider>();
        }else
        {
            hitbox.enabled = false;
        }
    }
    public override void Attack()
    {
        if (!CanAttack()) return;
        cooldownTimer = attackCooldown;

        if (animator != null)
        {
            AudioManager.ins.PlaySound(attackSound);
            //animator.SetFloat("AttackSpeed", attackCooldown > 0.5f ? 1 : 1 / attackCooldown);
            animator.SetTrigger("Attack");
        }
    }
    public void EnableHitbox()
    {
        if (hitbox != null)
        {
            hitbox.enabled = true;
        }
    }
    public void DisableHitbox()
    {
        if (hitbox != null)
        {
            hitbox.enabled = false;
        }
    }
}