using System.Collections;
using DG.Tweening;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public Animator animator;
    public DOTweenAnimation effectDamageEnemy;
    private float currentHealth;
    private bool isDead = false;

    [Header("Combat Settings")]
    public float attackRange = 2f;
    public float attackCooldown = 1f;
    private bool canAttack = true;

    void Start()
    {
        attackCooldown=LunaManager.ins.timeDelayAttackPlayer;
        currentHealth = LunaManager.ins.healthPlayer;
        animator.SetTrigger("Idle");
    }

    void Update()
    {
        if (isDead) return;
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        if (Input.GetMouseButtonDown(0) && canAttack)
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out RaycastHit hit))
            {
                if (hit.collider.CompareTag("Enemy"))
                {
                    StartCoroutine(AttackEnemy(hit.collider.gameObject));
                }
            }
        }
    }

    IEnumerator AttackEnemy(GameObject enemyObj)
    {
        if (LunaManager.ins.isCretivePause)
        {
           yield break;
        }
        canAttack = false;
        animator.SetTrigger("Attack");

        yield return new WaitForSeconds(0.2f);

        float distance = Vector3.Distance(transform.position, enemyObj.transform.position);
        if (distance <= attackRange)
        {
            EnemyController enemy = enemyObj.GetComponent<EnemyController>();
            if (enemy != null)
            {
                effectDamageEnemy.gameObject.SetActive(true);
                effectDamageEnemy.DORestart();
                enemy.Die();
            }
        }

        yield return new WaitForSeconds(attackCooldown);
        canAttack = true;
    }

    public void TakeDamage(int amount)
    {
        if (isDead) return;

        currentHealth -= amount;
        if (currentHealth <= 0)
        {
            Die();
        }
    }

    void Die()
    {
        if (isDead) return;
        LunaManager.ins.ShowEndCard();
        isDead = true;
        animator.SetTrigger("Dead");
    }

    public bool IsDead()
    {
        return isDead;
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(transform.position, attackRange);
    }
}