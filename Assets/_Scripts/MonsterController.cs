using System;
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
    public TextMeshProUGUI gpsText; // gold per second

    [Header("Model & Animator")]
    public Renderer modelRenderer; // kéo Renderer (ví dụ: mesh body)
    public Animator animator;
    public string walkAnimName = "walk";
    public string idleAnimName = "idle";

    private void Awake()
    {
        //animator = GetComponent<Animator>();
    }

    private void Start()
    {
        moveSpeed = LunaManager.ins.speedMonster;
    }

    public void SetTarget(Transform targetPoint)
    {
        target = targetPoint;
    }

    public void SetGoldSlot(Transform slot)
    {
        goldSlotTarget = slot;
    }

    public void ApplyRarity(Rarity rarity)
    {
        switch (rarity)
        {
            case Rarity.Normal:
                modelRenderer.material = normalMaterial;
                break;
            case Rarity.Rare:
                modelRenderer.material = rareMaterial;
                break;
            case Rarity.Epic:
                modelRenderer.material = epicMaterial;
                break;
            case Rarity.Legendary:
                modelRenderer.material = legendaryMaterial;
                break;
        }
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
    }

    void Update()
    {
        if (!isMoving || target == null) return;

        Vector3 direction = target.position - transform.position;
        direction.y = 0f; // 🔴 quan trọng: khóa trục Y

        if (direction.sqrMagnitude > 0.001f)
        {
            Quaternion lookRotation = Quaternion.LookRotation(direction);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                lookRotation,
                10f * Time.deltaTime
            );
        }

        transform.position = Vector3.MoveTowards(
            transform.position,
            target.position,
            moveSpeed * Time.deltaTime
        );

        if (isMoving && !animator.GetCurrentAnimatorStateInfo(0).IsName(walkAnimName))
        {
            animator.Play(walkAnimName);
        }

        if (Vector3.Distance(transform.position, target.position) < 0.5f)
        {
            if (!isBought)
            {
                Destroy(gameObject);
            }
            else if (headingToEntryGate)
            {
                headingToEntryGate = false;

                // dịch chuyển vào slot
                transform.position = goldSlotTarget.position;

                // gán monster vào GoldSlot
                GoldSlot slot = goldSlotTarget.GetComponent<GoldSlot>();
                if (slot != null)
                {
                    slot.AssignMonster(this);
                }
                
                StopMoving();
            }
        }
    }

    public void StopMoving()
    {
        isMoving = false;
        animator?.Play(idleAnimName);
    }
}
