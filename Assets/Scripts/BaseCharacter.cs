using System;
using System.Linq;
using Luna.Unity.FacebookInstantGames;
using UnityEngine;

public class BaseCharacter : MonoBehaviour
{
    [Header("Character Stats")]
    public float health = 100f;
    public float damage = 20f;
    public float moveSpeed = 5f;
    public float attackSpeed = 1f;
    public float detectionRadiusMax = 5f;
    public float detectionRadiusMin = 1.5f;
    public bool isDead=false;
    public bool isFindingEnemy = false;

    public Animator animator;
    public GameObject SwordObject;
    public AnimationClip atkAnimationClip;
    [SerializeField]
    protected float attackCooldown = 0f;
    public Transform target;
    protected Rigidbody rigidbody;
    protected CapsuleCollider capsuleCollider;
    private static readonly int IsMoving = Animator.StringToHash("isMoving");

    public bool IsFindingEnemy
    {
        get => isFindingEnemy;
        set => isFindingEnemy = value;
    }
    private void OnTriggerEnter(Collider other)
    {
        /*if (other.CompareTag("Weapon"))
        {
            if (WeaponObject!=null)
            {
                WeaponObject.SetActive(true);
            }
        }*/
    }

    protected virtual void Update()
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        SearchForEnemy();
        HandleMovement();
        HandleAttack();
        
        //HandleDeath();
    }

    protected virtual void Start()
    {
        rigidbody= GetComponent<Rigidbody>();
        capsuleCollider = GetComponent<CapsuleCollider>();
    }
    public virtual void AtkCompleted()
    {
        
    }
    protected virtual void SearchForEnemy()
    {
        if (target)
        {
            return;
        }
        if (isDead)
        {
            return;
        }
      

        if (isFindingEnemy==false)
        {
            return;
        }
        Collider[] hits = Physics.OverlapSphere(transform.position, detectionRadiusMax);
        target = hits
            .Select(h => h.transform)
            .Where(t => t.CompareTag("Enemy") && 
                        t.TryGetComponent<BaseCharacter>(out var enemy) && 
                        !enemy.isDead) // Kiểm tra có component Player và chưa chết
            .OrderBy(t => Vector3.Distance(transform.position, t.position))
            .FirstOrDefault();
    }

    protected virtual void HandleMovement()
    {
        if (target==null)
        {
            return;
        }
        
        if (isDead)
        {
            return;
        }

        if (isFindingEnemy==false)
        {
            return;
        }

        Vector3 move = Vector3.zero;

        if (target != null&& Vector3.Distance(transform.position, target.position) >= detectionRadiusMin)
        {
            move = (target.position - transform.position).normalized;
            transform.position = Vector3.MoveTowards(transform.position, target.position, moveSpeed * Time.deltaTime);
        }
        if (move != Vector3.zero)
        {
            Vector3 direction = new Vector3(move.x, 0, move.z);
            transform.rotation = Quaternion.LookRotation(direction);
            animator.SetBool(IsMoving, true);
        }
        else
        {
            animator.SetBool(IsMoving, false);
        }
    }
    public virtual void HandleMovementByPoint(Transform point, Action callback = null)
    {
        if (isDead)
        {
            return;
        }
        Vector3 move = Vector3.zero;
        move = (point.position - transform.position).normalized;
        
        transform.position = Vector3.MoveTowards(transform.position, point.position, moveSpeed * Time.deltaTime);
        
        if (move != Vector3.zero)
        {
            Vector3 direction = new Vector3(move.x, 0, move.z);
            transform.rotation = Quaternion.LookRotation(direction);
            animator.SetBool("isMoving", true);
        }
        else
        {
            animator.SetBool("isMoving", false);
        }
    }

    public void SetIdle()
    {
        animator.SetBool("isMoving", false);
    }

    public virtual void HandleAttack()
    {
        if (target==null)
        {
            return;
        }
        if (isDead)
        {
            return;
        }
        attackCooldown -= Time.deltaTime;
        if (target != null && Vector3.Distance(transform.position, target.position) <= detectionRadiusMin && attackCooldown <= 0)
        {
            attackCooldown = atkAnimationClip.length/ attackSpeed;
            animator.SetFloat("AttackSpeed", attackCooldown>attackSpeed?1:attackSpeed);  
            animator.SetTrigger("Attack");
            // Reset thời gian hồi chiêu
            
        }
    }

    public virtual void TakeDamage(float dmg)
    {
        if (isDead)
        {
            return;
        }
        health -= dmg;
        if (health <= 0)
        {
            animator.SetTrigger("Dead");
            isDead = true;
            Die();
        }
    }

    protected virtual void HandleDeath()
    {
        if (isDead)
        {
            return;
        }
        if (health <= 0)    
        {
            
            animator.SetTrigger("Dead");
            enabled = false;
        }
    }

    protected virtual void Die()
    {
        GameController.ins.EnemyDead(this.gameObject);
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        //animator.transform.parent = null;
        Destroy(gameObject,1f);
    }
}

