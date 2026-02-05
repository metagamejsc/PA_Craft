using System.Collections;
using UnityEngine;

public class EnemyAI : MonoBehaviour
{
    [Header("Enemy Settings")]
    public float moveSpeed = 2f;
    public float attackRange = 2f;
    public float attackDelay = 2f;
    public float health = 3f;
    public float damageFlashTime = 0.2f;

    [Header("Visuals")]
    public SkinnedMeshRenderer meshRenderer;
    public Material defaultMat;
    public Material hitMat;
    public Animator animator;

    [Header("Audio Clips")]
    public AudioClip moveClip;
    public AudioClip idleClip;
    public AudioClip attackClip;
    public AudioClip winClip;
    public AudioClip hitClip;
    public AudioClip deadClip;

    private AudioSource audioSource;
    private Transform player;
    private bool isAttacking = false;
    private bool isPlayerDead = false;
    private bool isMovingSoundPlaying = false;

    void Start()
    {
        player = GameObject.FindWithTag("Player").transform;
        audioSource = GetComponent<AudioSource>();
        moveSpeed = LunaManager.ins.speedMonster;
        //health = LunaManager.ins.healthMonster;
    }

    void Update()
    {
        if (!TutorialBuildBlock.ins.isTutorialCompleted|| LunaManager.ins.isCretivePause)
        {
            return;
        }
        if (isPlayerDead || player == null) return;

        float distance = Vector3.Distance(transform.position, player.position);

        if (distance <= attackRange)
        {
            animator.SetBool("isWalking", false);
            //PlaySoundOnce(idleClip);
            transform.LookAt(new Vector3(player.position.x, transform.position.y, player.position.z));
            if (!isAttacking)
                StartCoroutine(AttackPlayer());
        }
        else
        {
            // Move toward player
            animator.SetBool("isWalking", true);
            Vector3 dir = (player.position - transform.position).normalized;
            dir.y = 0;
            transform.LookAt(transform.position + dir);
            transform.position += dir * moveSpeed * Time.deltaTime;
            PlaySoundLoop(moveClip);
        }
    }

    IEnumerator AttackPlayer()
    {
        isAttacking = true;
        animator.SetTrigger("Attack");
        PlaySoundOnce(attackClip);

        yield return new WaitForSeconds(attackDelay);

        float distance = Vector3.Distance(transform.position, player.position);
        if (distance <= attackRange)
        {
            animator.SetTrigger("Win");
            PlaySoundOnce(winClip);
            isPlayerDead = true;

            PlayerChar pc = player.GetComponent<PlayerChar>();
            if (pc != null)
                pc.Die();
        }

        isAttacking = false;
    }

    public void TakeDamage(float dmg)
    {
        if (health <= 0) return;

        health -= dmg;
        PlaySoundOnce(hitClip);

        if (health <= 0)
        {
            Die();
        }
        else
        {
            StartCoroutine(FlashRed());
        }
    }

    IEnumerator FlashRed()
    {
        meshRenderer.material = hitMat;
        yield return new WaitForSeconds(damageFlashTime);
        meshRenderer.material = defaultMat;
    }

    void Die()
    {
        LunaManager.ins.ShowEndCardEmpty();
        isPlayerDead = true;
        animator.enabled = false;
        PlaySoundOnce(deadClip);
        StartCoroutine(DeathSequence());
    }

    IEnumerator DeathSequence()
    {
        float rotateSpeed = -90f;
        float rotationAmount = 0f;
        float totalRotation = -90f;

        while (rotationAmount > totalRotation)
        {
            float rotStep = rotateSpeed * Time.deltaTime*3;
            transform.Rotate(Vector3.right, rotStep);
            rotationAmount += rotStep;
            yield return null;
        }

        yield return new WaitForSeconds(2f);

        float duration = 0.2f;
        float time = 0f;
        Vector3 originalScale = transform.localScale;

        while (time < duration)
        {
            transform.localScale = Vector3.Lerp(originalScale, Vector3.zero, time / duration);
            time += Time.deltaTime;
            yield return null;
        }

        Destroy(gameObject);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Bullet"))
        {
            TakeDamage(1f);
            Destroy(other.gameObject);
        }
    }

    // === AUDIO HELPERS ===
    void PlaySoundOnce(AudioClip clip)
    {
        if (clip == null) return;

        // Nếu đang loop thì dừng loop trước
        if (audioSource.loop) StopLoop();

        audioSource.PlayOneShot(clip);
    }

    void StopLoop()
    {
        if (audioSource == null) return;

        if (audioSource.loop)
        {
            audioSource.loop = false;
            audioSource.Stop();
            audioSource.clip = null;
        }
    }

    void PlaySoundLoop(AudioClip clip)
    {
        if (clip == null) return;

        if (!audioSource.isPlaying || audioSource.clip != clip)
        {
            audioSource.clip = clip;
            audioSource.loop = true;
            audioSource.Play();
        }
    }
}
