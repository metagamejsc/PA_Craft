using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class ZombieChar : BaseCharacter
{
    public Material material;
    public SkinnedMeshRenderer[] lstMaterials;
    public bool canTakeDamage = false;
    public float timeMoveMax = 2f;
    public float timeIdleMax = 2f;
    public float timeAction = 0;
    public bool isMoving = false;
    protected override void Start()
    {
        base.Start();
        health = LunaManager.ins.zombieHealth;
        timeAction = 2;
        IsFindingEnemy = true;
        //health = LunaManager.ins.countDropFinal;
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material = new Material(material);
        }
    }
    protected override void Update()
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        //SearchForEnemy();
        HandleMovement();
        //HandleAttack();
    }

    protected override void HandleMovement()
    {
        if (isDead)
        {
            return;
        }

        timeAction -= Time.deltaTime;
        if (timeAction<=0)
        {
            isMoving=Random.Range(0,2)==0;
            timeAction= isMoving ? timeMoveMax : timeIdleMax;
        }

        if (!isMoving)
        {
            animator.SetBool(IsMoving, false);
        }
        else
        {
            Vector3 move = Vector3.right;
            Vector3 direction = new Vector3(move.x, 0, move.z);
            transform.rotation = Quaternion.LookRotation(direction);
            transform.position = Vector3.MoveTowards(transform.position, transform.position+move, moveSpeed * Time.deltaTime);
            animator.SetBool(IsMoving, true);
        }
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
        /*if (!canTakeDamage)
        {
            return;
        }*/
        if (!isMoving)
        {
            return;
        }
        detectionRadiusMax = 999;
        health -= dmg;
        
        StartCoroutine(IeNhapNhay(2f));
        if (health <= 0)
        {
            LunaManager.ins.CheckClickShowEndCard();
            GameController.ins.EnemyDead();
            animator.SetTrigger("Dead");
            isDead = true;
            Die();
        }
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
