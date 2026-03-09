using System;
using System.Collections;
using UnityEngine;
using TMPro;

public class MonsterController : MonoBehaviour
{
    [Header("Stats")]
    public float moveSpeed = 1f;
    public float goldPerSecond;
    public int price;

    public bool isBought = false;
    private bool headingToEntryGate = false;
    private Transform target;
    private Transform goldSlotTarget;
    private bool isMoving = true;

    [Header("Rarity Materials (Per Monster)")]
    public Material normalMaterial;
    public Material rareMaterial;
    public Material epicMaterial;
    public Material legendaryMaterial;

    [Header("UI Display on Model")]
    public TextMeshProUGUI priceText;
    public TextMeshProUGUI gpsText;

    [Header("Model & Animator")]
    public Renderer modelRenderer;
    public Animator animator;
    public string walkAnimName = "walk";
    public string idleAnimName = "idle";
    public Action onDeath;

    [Header("Health")]
    public float maxHP = 10f;
    public float currentHP;

    [Header("Random Movement")]
    public bool allowRandomMove = true;
    public float wanderRadius = 3f;
    public float wanderInterval = 3f;

    private Vector3 initialPosition;
    private Coroutine wanderCoroutine;
    private Color originalColor;
    private Coroutine flashCoroutine;

    private void Start()
    {
        moveSpeed = LunaManager.ins.speedMonster;
        currentHP = maxHP;
        originalColor = modelRenderer.material.color;
        initialPosition = transform.position;

        if (!isBought && allowRandomMove)
        {
            wanderCoroutine = StartCoroutine(WanderRoutine());
        }
    }

    public void SetTarget(Vector3 targetPos)
    {
        target = new GameObject("TargetPoint").transform;
        target.position = targetPos;
    }

    public void SetTarget(Transform targetPoint)
    {
        target = targetPoint;
    }

    public void SetGoldSlot(Transform slot)
    {
        goldSlotTarget = slot;
    }
    
    public void SetStats(int _price, float _gps)
    {
        price = _price;
        goldPerSecond = _gps;

        if (priceText) priceText.text = $"$ {price}";
        if (gpsText) gpsText.text = $"{goldPerSecond:F1}/s";
    }

    public void Buy(Transform entryGate)
    {
        isBought = true;
        headingToEntryGate = true;
        SetTarget(entryGate);

        if (wanderCoroutine != null)
        {
            StopCoroutine(wanderCoroutine);
        }
    }

    void Update()
    {
        if (!isMoving || target == null) return;

        Vector3 direction = target.position - transform.position;
        direction.y = 0f;

        if (direction.sqrMagnitude > 0.01f)
        {
            Quaternion lookRotation = Quaternion.LookRotation(direction);
            transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, 10f * Time.deltaTime);
        }

        transform.position = Vector3.MoveTowards(transform.position, target.position, moveSpeed * Time.deltaTime);

        if (isMoving && !animator.GetCurrentAnimatorStateInfo(0).IsName(walkAnimName))
        {
            animator.Play(walkAnimName);
        }

        if (Vector3.Distance(transform.position, target.position) < 0.5f)
        {
            if (!isBought)
            {
                // nếu là điểm random, không destroy
                if (target.name == "TargetPoint")
                {
                    Destroy(target.gameObject);
                    target = null;
                }
            }
            else if (headingToEntryGate)
            {
                headingToEntryGate = false;

                transform.position = goldSlotTarget.position;
                
                StopMoving();
            }
        }
    }

    public void TakeDamage(float damage)
    {
        currentHP -= damage;
        FlashRed();

        if (currentHP <= 0)
        {
            Die();
        }
    }

    void FlashRed()
    {
        if (flashCoroutine != null)
            StopCoroutine(flashCoroutine);

        flashCoroutine = StartCoroutine(FlashRedRoutine());
    }

    IEnumerator FlashRedRoutine()
    {
        modelRenderer.material.color = Color.red;
        yield return new WaitForSeconds(0.1f);
        modelRenderer.material.color = originalColor;
    }

    void Die()
    {
        onDeath?.Invoke();
        Debug.Log("Die");
        isMoving = false;
        StopAllCoroutines();

        // Ngã ngửa
        Quaternion fallRotation = Quaternion.Euler(90f, transform.eulerAngles.y, 0f);
        transform.rotation = fallRotation;

        // Đổi màu
        modelRenderer.material.color = Color.gray;

        Destroy(gameObject, 1.5f);
    }

    public void StopMoving()
    {
        isMoving = false;
        animator?.Play(idleAnimName);
    }

    IEnumerator WanderRoutine()
    {
        while (!isBought && isMoving)
        {
            Vector3 randomOffset = new Vector3(
                UnityEngine.Random.Range(-wanderRadius, wanderRadius),
                0f,
                UnityEngine.Random.Range(-wanderRadius, wanderRadius)
            );

            Vector3 wanderTarget = initialPosition + randomOffset;
            SetTarget(wanderTarget);

            yield return new WaitForSeconds(wanderInterval);
        }
    }

    private void OnDrawGizmosSelected()
    {
        if (allowRandomMove)
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawWireSphere(Application.isPlaying ? initialPosition : transform.position, wanderRadius);
        }
    }
}
