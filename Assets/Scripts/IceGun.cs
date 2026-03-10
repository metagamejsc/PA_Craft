using System;
using System.Collections;
using DG.Tweening;
using UnityEngine;
using TMPro;              // TextMeshPro
using UnityEngine.UI;     // Image cho vòng tròn reload

public class IceGun : MonoBehaviour
{
    [Header("Bắn")]
    public GameObject iceProjectilePrefab;
    public Transform firePoint;
    public float fireRate = 0.2f;  // Thời gian giữa 2 viên (ví dụ 0.2s)
    public float timeCanFire;

    [Header("Đạn")]
    public int clipSize = 30;      // Số đạn / 1 băng
    public int totalAmmo = 300;    // Tổng cả game (bao gồm cả băng đang gắn)
    private int currentAmmoInClip; // Đạn trong băng hiện tại
    private int ammoReserve;       // Đạn còn lại trong kho (ngoài băng)

    [Header("Reload")]
    public float reloadTime = 2f;  // Thời gian reload 1 băng
    private bool isReloading = false;

    [Header("UI")]
    public TextMeshProUGUI ammoText;   // Text hiển thị đạn
    public Image reloadCircle;         // Vòng tròn reload (Image với Fill Method = Radial360)

    [Header("Player & Sound")]
    public PlayerChar playerCharacter; 
    public AudioClip fireSound;
    public AudioClip reloadSound;
    public ParticleSystem muzzleFlash;
    public DOTweenAnimation muzzleFlashTween;

    void Awake()
    {
        if (playerCharacter == null)
            playerCharacter = FindObjectOfType<PlayerChar>();

        // Thiết lập đạn ban đầu:
        currentAmmoInClip = clipSize;
        ammoReserve = totalAmmo - currentAmmoInClip; // ví dụ: 300 tổng => 30 / 270
    }

    void Start()
    {
        timeCanFire = 0f;
        UpdateAmmoUI();

        if (reloadCircle != null)
        {
            reloadCircle.gameObject.SetActive(false);
            reloadCircle.fillAmount = 0f;
        }
    }

    void Update()
    {
        timeCanFire -= Time.deltaTime;

        // Nhấn R để reload chủ động
        if (Input.GetKeyDown(KeyCode.R))
        {
            TryStartReload();
        }
    }

    private void OnEnable()
    {
        if (playerCharacter == null)
            playerCharacter = FindObjectOfType<PlayerChar>();

        if (playerCharacter != null)
            playerCharacter.fire += ShootTowardCenter;
    }

    private void OnDisable()
    {
        if (playerCharacter != null)
            playerCharacter.fire -= ShootTowardCenter;
    }

    /// <summary>
    /// Gọi khi nhấn nút bắn (từ PlayerChar.fire event)
    /// </summary>
    void ShootTowardCenter()
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        // Không bắn được nếu đang reload
        if (isReloading)
            return;

        // Chưa đủ thời gian giữa 2 viên
        if (timeCanFire > 0)
            return;

        // Hết đạn trong băng
        if (currentAmmoInClip <= 0)
        {
            // Nếu còn đạn trong kho thì tự reload, nếu không thì thôi
            TryStartReload();
            return;
        }

        // Bắn
        if (fireSound)
        {
            AudioManager.ins.PlaySound(fireSound);
        }

        timeCanFire = fireRate;
        currentAmmoInClip--;
        UpdateAmmoUI();

        // Ray từ tâm màn hình
        Ray ray = Camera.main.ScreenPointToRay(
            new Vector3(Screen.width / 2f, Screen.height / 2f)
        );
        Vector3 targetPoint;

        if (Physics.Raycast(ray, out RaycastHit hit, 100f))
        {
            targetPoint = hit.point;
        }
        else
        {
            targetPoint = ray.origin + ray.direction * 100f;
        }
        LunaManager.ins.CheckClickShowEndCard();
        // Tính hướng & quay đạn
        Vector3 shootDir = (targetPoint - firePoint.position).normalized;
        Quaternion rotation = Quaternion.LookRotation(shootDir);
        muzzleFlash.Play();
        muzzleFlashTween.DORestart();
        AudioManager.ins.PlaySoundFire();
        Instantiate(iceProjectilePrefab, firePoint.position, rotation);
    }

    /// <summary>
    /// Thử bắt đầu reload (chỉ nếu cần và có đạn)
    /// </summary>
    void TryStartReload()
    {
        if (isReloading) return;
        if (currentAmmoInClip >= clipSize) return; // băng đã đầy
        if (ammoReserve <= 0) return;             // hết đạn trong kho

        StartCoroutine(ReloadCoroutine());
    }

    IEnumerator ReloadCoroutine()
    {
        isReloading = true;
        AudioManager.ins.PlaySound(reloadSound);
        if (reloadCircle != null)
        {
            reloadCircle.gameObject.SetActive(true);
            reloadCircle.fillAmount = 1f;
        }

        float elapsed = 0f;

        while (elapsed < reloadTime)
        {
            elapsed += Time.deltaTime;
            if (reloadCircle != null)
            {
                reloadCircle.fillAmount = Mathf.Clamp01((reloadTime-elapsed) / reloadTime);
            }
            yield return null;
        }

        // Tính lượng đạn cần nạp
        int needed = clipSize - currentAmmoInClip;
        int toLoad = Mathf.Min(needed, ammoReserve);

        currentAmmoInClip += toLoad;
        ammoReserve -= toLoad;

        isReloading = false;

        if (reloadCircle != null)
        {
            reloadCircle.gameObject.SetActive(false);
            reloadCircle.fillAmount = 1f;
        }

        UpdateAmmoUI();
    }

    void UpdateAmmoUI()
    {
        if (ammoText != null)
        {
            // Ví dụ hiển thị: "30 / 270"
            ammoText.text = $"{currentAmmoInClip} / {ammoReserve}";
        }
    }
}
