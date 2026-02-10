using UnityEngine;
using System.Collections;

public class EnemyController : MonoBehaviour
{
    public float moveSpeed = 2f;
    public float attackDistance = 2f;
    public float attackCooldown = 1.5f;
    public Animator animator;

    public Transform player;
    public PlayerController playerController;
    public bool isDead = false;
    public bool isAttacking = false;
    public bool canAttack = true;

    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player").transform;
        playerController = player.GetComponent<PlayerController>();
        animator.SetTrigger("Move");
    }

    void Update()
    {
        if (isDead || playerController.IsDead()) return;
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        float distance = Vector3.Distance(transform.position, player.position);

        if (distance > attackDistance)
        {
            transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
        }
        else
        {
            if (!isAttacking && canAttack)
                StartCoroutine(AttackPlayer());
        }
    }

    IEnumerator AttackPlayer()
    {
        if (LunaManager.ins.isCretivePause)
        {
            yield break;
        }
        if (isDead) yield break;
        isAttacking = true;
        canAttack = false;

        animator.SetTrigger("Attack");

        yield return new WaitForSeconds(0.8f); // Thời gian anim attack

        if (!isDead && !playerController.IsDead())
        {
            playerController.TakeDamage(1);
        }

        yield return new WaitForSeconds(attackCooldown);
        canAttack = true;
        isAttacking = false;
    }

    public void Die()
    {
        if (isDead) return;
        LunaManager.ins.CheckClickShowEndCard();
        isDead = true;
        animator.SetTrigger("Dead");
        StopAllCoroutines();
        Destroy(gameObject, 2f);
    }
}