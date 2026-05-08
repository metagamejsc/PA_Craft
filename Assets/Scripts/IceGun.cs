using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class IceGun : MonoBehaviour
{
    [System.Serializable]
    public class GunLevelConfig
    {
        public string displayName = "Gun";
        public GameObject projectilePrefab;
        public int clipSize = 30;
        public int totalAmmo = 300;
        public float fireRate = 0.2f;
        public GameObject weaponModel;
        public Sprite icon;
        public AudioClip fireSound;
        public int zombieKillsToUpgrade = 5;
    }

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

    [Header("Input Buttons")]
    public Button aimButton;
    public Button fireButton;

    [Header("Upgrade")]
    public List<GunLevelConfig> gunLevels = new List<GunLevelConfig>();
    public int currentGunLevel = 0;
    public bool refillAmmoOnUpgrade = true;

    [Header("Aim")]
    public float aimTargetHeightOffset = 1.2f;
    public bool shootAtAimTarget = true;
    public float aimSmoothSpeed = 5f;

    [Header("Player & Sound")]
    public PlayerChar playerCharacter;
    public AudioClip fireSound;
    public AudioClip reloadSound;
    public ParticleSystem muzzleFlash;
    public DOTweenAnimation muzzleFlashTween;

    private AudioManager audioManager;
    private float baseFireRate;
    private int upgradeProgress;
    private Transform currentAimTarget;
    private Coroutine reloadCoroutineHandle;
    private bool isHoldingFireButton;
    private bool initialGunSetupComplete;

    private void Awake()
    {
        ResolveRuntimeReferences();
        EnsureGunLevels();
        currentGunLevel = 0;
        upgradeProgress = 0;
        ApplyGunLevel(currentGunLevel, true);
        initialGunSetupComplete = true;
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

        if (isHoldingFireButton)
        {
            ShootTowardCenter();
        }
    }

    private void OnEnable()
    {
        ResolveRuntimeReferences();
        RegisterInputButtons();
    }

    private void OnDisable()
    {
        UnregisterInputButtons();
    }

    public void FireButtonPressed()
    {
        ShootTowardCenter();
    }

    public void BeginFireButtonHold()
    {
        if (GameController.ins != null && GameController.ins.isEndGame)
        {
            return;
        }

        isHoldingFireButton = true;
        ShootTowardCenter();
    }

    public void EndFireButtonHold()
    {
        isHoldingFireButton = false;
    }

    private void ShootTowardCenter()
    {
        ResolveRuntimeReferences();
        RefreshAimTarget();

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
        else
        {
            audioManager?.PlaySoundFire();
        }

        timeCanFire = fireRate;
        currentAmmoInClip--;
        UpdateAmmoUI();

        Vector3 targetPoint;
        if (shootAtAimTarget && currentAimTarget != null)
        {
            targetPoint = GetAimPoint(currentAimTarget);
        }
        else
        {
            Ray ray = mainCamera.ScreenPointToRay(new Vector3(Screen.width / 2f, Screen.height / 2f));
            targetPoint = ray.origin + ray.direction * 100f;

            if (Physics.Raycast(ray, out RaycastHit hit, 100f))
            {
                targetPoint = hit.point;
            }
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

        Instantiate(iceProjectilePrefab, firePoint.position, rotation);
    }

    private void TryStartReload()
    {
        if (isReloading || currentAmmoInClip >= clipSize || ammoReserve <= 0)
        {
            return;
        }

        reloadCoroutineHandle = StartCoroutine(ReloadCoroutine());
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
        reloadCoroutineHandle = null;
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

    private void RegisterInputButtons()
    {
        if (aimButton != null)
        {
            aimButton.onClick.RemoveListener(AimNextZombie);
            aimButton.onClick.AddListener(AimNextZombie);
        }

        if (fireButton != null)
        {
            IceGunFireButtonHold holdButton = fireButton.GetComponent<IceGunFireButtonHold>();
            if (holdButton == null)
            {
                holdButton = fireButton.gameObject.AddComponent<IceGunFireButtonHold>();
            }

            holdButton.SetOwner(this);
        }
    }

    private void UnregisterInputButtons()
    {
        if (aimButton != null)
        {
            aimButton.onClick.RemoveListener(AimNextZombie);
        }

        if (fireButton != null)
        {
            IceGunFireButtonHold holdButton = fireButton.GetComponent<IceGunFireButtonHold>();
            if (holdButton != null)
            {
                holdButton.ClearOwner(this);
            }
        }

        isHoldingFireButton = false;
    }

    public void AimNextZombie()
    {
        ResolveRuntimeReferences();
        ApplyAimSmoothSpeed();

        List<Transform> targets = GetAliveZombieTargetsSortedByDistance();
        if (targets.Count == 0)
        {
            SetAimTarget(null);
            return;
        }

        Transform nearestTarget = targets[0];
        Transform nextTarget = nearestTarget;
        RefreshAimTarget();

        if (currentAimTarget == nearestTarget && targets.Count > 1)
        {
            nextTarget = targets[1];
        }

        SetAimTarget(nextTarget);
    }

    private void ApplyAimSmoothSpeed()
    {
        if (MouseLook.ins != null)
        {
            MouseLook.ins.lookAtSmoothSpeed = Mathf.Max(0.01f, aimSmoothSpeed);
        }
    }

    public void ClearAimTarget()
    {
        SetAimTarget(null);
    }

    public void AddUpgradeProgress(int amount = 1)
    {
        if (amount <= 0 || IsMaxGunLevel())
        {
            RefreshUpgradeProgressUi();
            return;
        }

        upgradeProgress += amount;

        while (!IsMaxGunLevel() && upgradeProgress >= GetKillsRequiredForNextLevel())
        {
            upgradeProgress -= GetKillsRequiredForNextLevel();
            UpgradeGun();
        }

        RefreshUpgradeProgressUi();
    }

    public void RefreshUpgradeProgressUi()
    {
        if (IsMaxGunLevel())
        {
            UIManager.ins?.HideGunUpgradeProgress();
            return;
        }

        GunLevelConfig nextConfig = GetNextGunLevelConfig();
        string nextGunName = nextConfig != null ? nextConfig.displayName : string.Empty;
        Sprite nextGunIcon = nextConfig != null ? nextConfig.icon : null;
        UIManager.ins?.UpdateGunUpgradeProgress(upgradeProgress, GetKillsRequiredForNextLevel(), nextGunName, nextGunIcon);
    }

    private void UpgradeGun()
    {
        int nextLevel = Mathf.Min(currentGunLevel + 1, gunLevels.Count - 1);
        ApplyGunLevel(nextLevel, refillAmmoOnUpgrade);
    }

    private void ApplyGunLevel(int levelIndex, bool refillAmmo)
    {
        EnsureGunLevels();
        if (gunLevels.Count == 0)
        {
            return;
        }

        currentGunLevel = Mathf.Clamp(levelIndex, 0, gunLevels.Count - 1);
        GunLevelConfig config = gunLevels[currentGunLevel];

        if (config.projectilePrefab != null)
        {
            iceProjectilePrefab = config.projectilePrefab;
        }

        clipSize = Mathf.Max(1, config.clipSize);
        totalAmmo = Mathf.Max(clipSize, config.totalAmmo);
        fireRate = Mathf.Max(0.01f, config.fireRate);
        baseFireRate = fireRate;
        if (config.fireSound != null)
        {
            fireSound = config.fireSound;
        }

        if (refillAmmo)
        {
            if (reloadCoroutineHandle != null)
            {
                StopCoroutine(reloadCoroutineHandle);
                reloadCoroutineHandle = null;
            }

            currentAmmoInClip = clipSize;
            ammoReserve = Mathf.Max(0, totalAmmo - currentAmmoInClip);
            isReloading = false;

            if (reloadCircle != null)
            {
                reloadCircle.gameObject.SetActive(false);
                reloadCircle.fillAmount = 0f;
            }
        }
        else
        {
            currentAmmoInClip = Mathf.Clamp(currentAmmoInClip, 0, clipSize);
            ammoReserve = Mathf.Max(0, ammoReserve);
        }

        ApplyWeaponModel(config.weaponModel);
        UIManager.ins?.UpdateCurrentGunImage(config.icon);
        TryShowEndCardForGunLevel();

        UpdateAmmoUI();
    }

    private void TryShowEndCardForGunLevel()
    {
        if (currentGunLevel != LunaManager.ins.gunLevelToShowEndCard)
        {
            return;
        }

        LunaManager.ins?.ShowEndCard();
    }

    private void ApplyWeaponModel(GameObject activeWeaponModel)
    {
        if (activeWeaponModel == null)
        {
            return;
        }

        for (int i = 0; i < gunLevels.Count; i++)
        {
            GameObject weaponModel = gunLevels[i].weaponModel;
            if (weaponModel != null)
            {
                weaponModel.SetActive(weaponModel == activeWeaponModel);
            }
        }
    }

    private void EnsureGunLevels()
    {
        if (gunLevels.Count > 0)
        {
            return;
        }

        gunLevels.Add(new GunLevelConfig
        {
            displayName = "Gun 0",
            projectilePrefab = iceProjectilePrefab,
            clipSize = clipSize,
            totalAmmo = totalAmmo,
            fireRate = fireRate,
            zombieKillsToUpgrade = 5
        });

        gunLevels.Add(new GunLevelConfig
        {
            displayName = "Gun 1",
            projectilePrefab = iceProjectilePrefab,
            clipSize = Mathf.Max(1, Mathf.RoundToInt(clipSize * 0.75f)),
            totalAmmo = totalAmmo,
            fireRate = fireRate,
            zombieKillsToUpgrade = 5
        });

        gunLevels.Add(new GunLevelConfig
        {
            displayName = "Gun 2",
            projectilePrefab = iceProjectilePrefab,
            clipSize = Mathf.Max(1, Mathf.RoundToInt(clipSize * 0.5f)),
            totalAmmo = totalAmmo,
            fireRate = fireRate,
            zombieKillsToUpgrade = 5
        });
    }

    private bool IsMaxGunLevel()
    {
        EnsureGunLevels();
        return gunLevels.Count == 0 || currentGunLevel >= gunLevels.Count - 1;
    }

    private int GetNextGunLevel()
    {
        EnsureGunLevels();
        return Mathf.Min(currentGunLevel + 1, gunLevels.Count - 1);
    }

    private GunLevelConfig GetNextGunLevelConfig()
    {
        EnsureGunLevels();
        if (gunLevels.Count == 0 || IsMaxGunLevel())
        {
            return null;
        }

        return gunLevels[GetNextGunLevel()];
    }

    private int GetKillsRequiredForNextLevel()
    {
        EnsureGunLevels();
        if (gunLevels.Count == 0 || IsMaxGunLevel())
        {
            return 0;
        }

        return Mathf.Max(1, gunLevels[GetNextGunLevel()].zombieKillsToUpgrade);
    }

    private void RefreshAimTarget()
    {
        if (!IsAliveZombieTarget(currentAimTarget))
        {
            SetAimTarget(null);
        }
    }

    private void SetAimTarget(Transform target)
    {
        currentAimTarget = target;
        if (MouseLook.ins != null)
        {
            MouseLook.ins.target = target;
        }
    }

    private List<Transform> GetAliveZombieTargetsSortedByDistance()
    {
        List<Transform> targets = new List<Transform>();
        Vector3 origin = playerCharacter != null ? playerCharacter.transform.position : transform.position;

        if (GameController.ins == null)
        {
            return targets;
        }

        for (int i = GameController.ins.enemyList.Count - 1; i >= 0; i--)
        {
            GameObject enemy = GameController.ins.enemyList[i];
            if (enemy == null)
            {
                GameController.ins.enemyList.RemoveAt(i);
                continue;
            }

            if (IsAliveZombieTarget(enemy.transform))
            {
                targets.Add(enemy.transform);
            }
        }

        targets.Sort((a, b) =>
            Vector3.SqrMagnitude(a.position - origin).CompareTo(Vector3.SqrMagnitude(b.position - origin)));

        return targets;
    }

    private bool IsAliveZombieTarget(Transform target)
    {
        if (target == null)
        {
            return false;
        }

        BaseCharacter character = target.GetComponent<BaseCharacter>();
        return character != null && !character.isDead && target.CompareTag("Enemy");
    }

    private Vector3 GetAimPoint(Transform target)
    {
        return target.position + Vector3.up * aimTargetHeightOffset;
    }

    public void SetInitialShotsPerSecond(float shotsPerSecond)
    {
        float safeShotsPerSecond = Mathf.Max(0.01f, shotsPerSecond);
        float cooldownBetweenShots = 1f / safeShotsPerSecond;
        baseFireRate = cooldownBetweenShots;
        fireRate = cooldownBetweenShots;
    }
}

public class IceGunFireButtonHold : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
{
    private IceGun owner;

    public void SetOwner(IceGun iceGun)
    {
        owner = iceGun;
    }

    public void ClearOwner(IceGun iceGun)
    {
        if (owner == iceGun)
        {
            owner = null;
        }
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        owner?.BeginFireButtonHold();
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        owner?.EndFireButtonHold();
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        owner?.EndFireButtonHold();
    }
}
