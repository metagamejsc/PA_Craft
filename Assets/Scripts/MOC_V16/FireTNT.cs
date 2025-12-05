using UnityEngine;
using UnityEngine.UI;       // <-- thêm
using TMPro;                // <-- thêm
using DG.Tweening;

public class FireTNT : MonoBehaviour
{
    [Header("Fire Settings")]
    public Transform firePoint; 
    public float maxFireDistance = 100f;
    public float flightDuration = 1f;
    public LayerMask hitMask;
    public TNTObject tntObjectPrefab;
    public float fireCooldown = 2f;
    public ParticleSystem effectFire;

    private float cooldownTimer = 0f;

    [Header("UI")]
    public Button fireButton;                // nút bắn
    public TextMeshProUGUI fireButtonText;   // text trên nút

    private void Start()
    {
        // Gắn sự kiện click nút => gọi Fire()
        if (fireButton != null)
        {
            fireButton.onClick.AddListener(Fire);
        }

        UpdateFireButtonUI();
    }

    private void Update()
    {
        if (cooldownTimer > 0f)
        {
            cooldownTimer -= Time.deltaTime;
            if (cooldownTimer < 0f) cooldownTimer = 0f;
        }

        UpdateFireButtonUI();
    }

    private void UpdateFireButtonUI()
    {
        if (fireButton == null || fireButtonText == null) return;

        if (cooldownTimer > 0f)
        {
            fireButton.interactable = false;

            // Hiển thị thời gian còn lại (1 số thập phân)
            fireButtonText.text = cooldownTimer.ToString("F1") + "s";
        }
        else
        {
            fireButton.interactable = true;
            fireButtonText.text = "FIRE";  // hoặc "Bắn"
        }
    }

    public void Fire()
    {
        // Nếu còn cooldown thì không bắn
        if (cooldownTimer > 0f)
        {
            return;
        }

        Vector3 cameraOrigin = Camera.main.transform.position;
        Vector3 cameraForward = Camera.main.transform.forward;

        Debug.DrawRay(cameraOrigin, cameraForward * maxFireDistance, Color.cyan, 2f);
        Debug.Log($"[Raycast] From Camera at {cameraOrigin} forward {cameraForward}");

        if (Physics.Raycast(cameraOrigin, cameraForward, out RaycastHit hit, maxFireDistance, hitMask))
        {
            Vector3 hitPoint = hit.point;

            Debug.Log($"[Raycast] Hit {hit.collider.name} at {hitPoint}");

            Vector3 fireDirection = (hitPoint - firePoint.position).normalized;

            TNTObject tnt = Instantiate(tntObjectPrefab, firePoint.position, Quaternion.LookRotation(fireDirection));
            Rigidbody rb = tnt.GetComponent<Rigidbody>();
            rb.isKinematic = true;
            rb.useGravity = false;
            effectFire.Play();
            AudioManager.ins.PlaySoundFire();
            LunaManager.ins.CheckClickShowEndCard();
            tnt.transform.DOMove(hitPoint, flightDuration)
                .SetEase(Ease.Linear)
                .OnComplete(() =>
                {
                    Debug.Log("[TNT] Reached hit point. Enabling physics.");
                    rb.isKinematic = false;
                    rb.useGravity = true;
                    rb.velocity = Vector3.zero;

                    // TODO: xử lý nổ khi va chạm
                });

            cooldownTimer = fireCooldown;    // bắt đầu đếm cooldown
            UpdateFireButtonUI();            // cập nhật UI ngay lập tức
        }
        else
        {
            Debug.Log("[Raycast] No hit detected.");
        }
    }
}
