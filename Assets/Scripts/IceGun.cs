using System.Collections;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class IceGun : MonoBehaviour
{
    [Header("Fire")]
    public GameObject iceProjectilePrefab;
    public Transform firePoint;
    public float fireRate = 0.2f;
    public float timeCanFire;

    [Header("Ammo")]
    public int clipSize = 30;
    public int totalAmmo = 300;
    private int currentAmmoInClip;
    private int ammoReserve;

    [Header("Reload")]
    public float reloadTime = 2f;
    private bool isReloading;

    [Header("UI")]
    public TextMeshProUGUI ammoText;
    public Image reloadCircle;

    [Header("Player & Sound")]
    public PlayerChar playerCharacter;
    public AudioClip fireSound;
    public AudioClip reloadSound;
    public ParticleSystem muzzleFlash;
    public DOTweenAnimation muzzleFlashTween;

    private AudioManager audioManager;
    private float baseFireRate;

    private void Awake()
    {
        ResolveRuntimeReferences();
        baseFireRate = fireRate;

        currentAmmoInClip = clipSize;
        ammoReserve = Mathf.Max(0, totalAmmo - currentAmmoInClip);
    }

    private void Start()
    {
        timeCanFire = 0f;
        UpdateAmmoUI();

        if (reloadCircle != null)
        {
            reloadCircle.gameObject.SetActive(false);
            reloadCircle.fillAmount = 0f;
        }
    }

    private void Update()
    {
        timeCanFire -= Time.deltaTime;

        if (Input.GetKeyDown(KeyCode.R))
        {
            TryStartReload();
        }
    }

    private void OnEnable()
    {
        ResolveRuntimeReferences();

        if (playerCharacter != null)
        {
            playerCharacter.fire += ShootTowardCenter;
        }
    }

    private void OnDisable()
    {
        if (playerCharacter != null)
        {
            playerCharacter.fire -= ShootTowardCenter;
        }
    }

    private void ShootTowardCenter()
    {
        ResolveRuntimeReferences();

        if (isReloading || timeCanFire > 0f)
        {
            return;
        }

        if (currentAmmoInClip <= 0)
        {
            TryStartReload();
            return;
        }

        Camera mainCamera = Camera.main;
        if (mainCamera == null || firePoint == null || iceProjectilePrefab == null)
        {
            return;
        }

        if (fireSound != null)
        {
            audioManager?.PlaySound(fireSound);
        }

        timeCanFire = fireRate;
        currentAmmoInClip--;
        UpdateAmmoUI();

        Ray ray = mainCamera.ScreenPointToRay(new Vector3(Screen.width / 2f, Screen.height / 2f));
        Vector3 targetPoint = ray.origin + ray.direction * 100f;

        if (Physics.Raycast(ray, out RaycastHit hit, 100f))
        {
            targetPoint = hit.point;
        }

        Vector3 shootDirection = (targetPoint - firePoint.position).normalized;
        Quaternion rotation = Quaternion.LookRotation(shootDirection);

        if (muzzleFlash != null)
        {
            muzzleFlash.Play();
        }

        if (muzzleFlashTween != null)
        {
            muzzleFlashTween.DORestart();
        }

        audioManager?.PlaySoundFire();
        Instantiate(iceProjectilePrefab, firePoint.position, rotation);
    }

    private void TryStartReload()
    {
        if (isReloading || currentAmmoInClip >= clipSize || ammoReserve <= 0)
        {
            return;
        }

        StartCoroutine(ReloadCoroutine());
    }

    private IEnumerator ReloadCoroutine()
    {
        isReloading = true;
        ResolveRuntimeReferences();
        audioManager?.PlaySound(reloadSound);

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
                reloadCircle.fillAmount = Mathf.Clamp01((reloadTime - elapsed) / reloadTime);
            }

            yield return null;
        }

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

    private void UpdateAmmoUI()
    {
        if (ammoText != null)
        {
            ammoText.text = $"{currentAmmoInClip} / {ammoReserve}";
        }
    }

    private void ResolveRuntimeReferences()
    {
        if (playerCharacter == null)
        {
            playerCharacter = FindObjectOfType<PlayerChar>();
        }

        if (audioManager == null)
        {
            audioManager = AudioManager.ins != null ? AudioManager.ins : FindObjectOfType<AudioManager>();
        }

        if (firePoint == null)
        {
            firePoint = transform;
        }

        if (muzzleFlash == null)
        {
            muzzleFlash = GetComponentInChildren<ParticleSystem>(true);
        }

        if (muzzleFlashTween == null)
        {
            muzzleFlashTween = GetComponent<DOTweenAnimation>();
            if (muzzleFlashTween == null)
            {
                muzzleFlashTween = GetComponentInChildren<DOTweenAnimation>(true);
            }
        }
    }

    public void ApplyFireSpeedMultiplier(float multiplier)
    {
        if (baseFireRate <= 0f)
        {
            baseFireRate = fireRate;
        }

        float safeMultiplier = Mathf.Max(0.01f, multiplier);
        fireRate = baseFireRate / safeMultiplier;
    }

    public void SetInitialShotsPerSecond(float shotsPerSecond)
    {
        float safeShotsPerSecond = Mathf.Max(0.01f, shotsPerSecond);
        float cooldownBetweenShots = 1f / safeShotsPerSecond;
        baseFireRate = cooldownBetweenShots;
        fireRate = cooldownBetweenShots;
    }
}
