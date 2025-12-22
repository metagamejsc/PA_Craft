using System;
using DG.Tweening;
using UnityEngine;

public class PlayerChar : BaseCharacter
{
    public GameObject swordFake;
    public Transform swordFakePos;
    public Transform swordPos;
    public Action fire;
    public Action canleFire;
    public GameObject[] lstWeapons;
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
        for (int i = 0; i < lstWeapons.Length; i++)
        {
            lstWeapons[i].SetActive(false);
        }
        //SwordObject.SetActive(false);
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

    public void CraftWeapon(int weaponId = 0)
    {
        //lstWeapons[weaponId].SetActive(true);
        SwordObject.SetActive(true);
    }
    public override void AtkCompleted()
    {
        base.AtkCompleted();
        SwordObject.GetComponent<DOTweenAnimation>().DOPause();
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
        fire?.Invoke();
        if (/*target != null && Vector3.Distance(transform.position, target.position) <= detectionRadiusMin && */attackCooldown <= 0)
        {
            SwordObject.GetComponent<DOTweenAnimation>().DORestart();
            attackCooldown = atkAnimationClip.length/ attackSpeed;
            animator.SetFloat("AttackSpeed", attackCooldown>attackSpeed?1:attackSpeed);  
            animator.SetTrigger("Attack");
            // Reset thời gian hồi chiêu
        }
    }
    public void CancleFire()
    {
        canleFire?.Invoke();
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
