using UnityEngine;

public class PlayerChar : BaseCharacter
{
    public GameObject swordFake;
    public Transform swordFakePos;
    public Transform swordPos;
    protected override void Update()
    {

        //HandleAttack();
        if (GameController.ins.isPauseGame)
        {
            return;
        }
        SearchForEnemy();
        attackCooldown -= Time.deltaTime;
        
    }

    protected override void Start()
    {
        base.Start();
        SwordObject.SetActive(false);
        IsFindingEnemy = true;
    }

    protected override void SearchForEnemy()
    {
        if (isDead)
        {
            return;
        }
        if (isFindingEnemy==false)
        {
            return;
        }
        Camera cam = Camera.main;
        Ray ray = new Ray(cam.transform.position, cam.transform.forward);
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit, detectionRadiusMax, LayerMask.GetMask("Enemy"))) 
        {
            GameObject hitObj = hit.transform.gameObject;
            
            if (hitObj.CompareTag("Enemy"))
            {
                target = hitObj.transform;
            }
            else
            {
                target = null;
            }
        }
    }

    public void CraftWeapon()
    {
        SwordObject.SetActive(true);
    }
    public override void AtkCompleted()
    {
        base.AtkCompleted();
        SwordObject.transform.parent = swordFakePos;
        SwordObject.transform.localPosition = Vector3.zero;
        SwordObject.transform.localRotation = Quaternion.Euler(Vector3.zero);
    }

    public override void HandleAttack()
    {
        if (isDead)
        {
            return;
        }

        if (/*target != null && Vector3.Distance(transform.position, target.position) <= detectionRadiusMin && */attackCooldown <= 0)
        {
            SwordObject.transform.parent = swordPos;
            SwordObject.transform.localPosition = Vector3.zero;
            SwordObject.transform.localRotation = Quaternion.Euler(Vector3.zero);
            attackCooldown = atkAnimationClip.length/ attackSpeed;
            animator.SetFloat("AttackSpeed", attackCooldown>attackSpeed?1:attackSpeed);  
            animator.SetTrigger("Attack");
            // Reset thời gian hồi chiêu
        }
    }

    public override void TakeDamage(float dmg)
    {
        if (isDead)
        {
            return;
        }
        /*health -= dmg;
        if (health <= 0)
        {
            
        }*/
        Die();
        //Invoke(nameof(ResetPlayer), 1f);

    }
    public void ResetPlayer()
    {
        isDead = false;
        health = 1;
        //animator.transform.parent = transform;
        capsuleCollider.enabled = true;
        rigidbody.isKinematic = false;
        GameController.ins.ReSpawnPlayer();
        if (LunaManager.ins.isCretiveEnd)
        {
            return;
        }

        AudioManager.ins.PlaySoundRespawn();
        animator.Play("Armature|Falling Idle");
    }
    public void SetJump()
    {
        AudioManager.ins.PlaySoundJumping();
        animator.SetBool("isJumping", true);
    }
    public void SetIdle()
    {
        animator.SetBool("isJumping", false);
        animator.Play("metarig|Idle");
    }
    public override void Die()
    {
        isDead = true;
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        AudioManager.ins.PlaySoundTakeDame();
        //animator.transform.parent = null;
        LunaManager.ins.ShowEndCard();
        //Destroy(gameObject);
    }
}
