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
        /*if (SwordObject.activeSelf)
        {
            if (attackCooldown<=0)
            {
                swordFake.SetActive(true);
            }
            else
            {
                swordFake.SetActive(false);
            }
        }
        else
        {
            swordFake.SetActive(false);
        }*/
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
        health -= dmg;
        if (health <= 0)
        {
            LunaManager.ins.ShowEndCard();
            isDead = true;
            Die();
        }
    }

    public override void Die()
    {
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        animator.transform.parent = null;
        //Destroy(gameObject);
    }
}
