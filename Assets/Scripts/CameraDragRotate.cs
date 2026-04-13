using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CameraDragRotate : MonoBehaviour
{
    public static CameraDragRotate ActiveController { get; private set; }

    [Header("Aim")]
    public float rotationSpeed = 0.2f;
    public GameObject scope;
    public GameObject tutorialUI;
    public float maxYaw = 30f;
    public float minYaw = -30f;
    public float maxPitch = 30f;
    public float minPitch = -30f;
    public float aimDurationLimit = 3f;

    [Header("Zoom")]
    public float defaultFOV = 60f;
    public float minFOV = 40f;
    public float fovAdjustSpeed = 5f;

    [Header("Player Shooting")]
    public bool fireOnMouseRelease = true;
    public int shootDamage = 1;
    public float shootDistance = 150f;
    public LayerMask shootMask = Physics.DefaultRaycastLayers;
    public Vector3 muzzleOffset = new Vector3(0f, -0.12f, 0.35f);
    public GameObject bulletPrefab;
    public float bulletSpeed = 30f;
    public float bulletLifetime = 3f;
    public float bulletHitRadius = 0.18f;
    public Vector3 bulletScale = new Vector3(0.12f, 0.12f, 0.12f);
    public Color bulletColor = new Color(1f, 0.92f, 0.2f, 1f);

    [Header("Player Health")]
    public int maxHealth = 5;
    public Image hpFillImage;
    public TMP_Text hpText;
    public bool showEndCardOnDeath;

    private Vector2 startMousePos;
    private bool isDragging;
    private float currentYaw;
    private float currentPitch;
    private float timeDragged;
    private int currentHealth;
    private bool isDead;
    private Camera cam;

    public bool IsDragging => isDragging;
    public bool IsDead => isDead;
    public Transform PlayerTransform => cam != null ? cam.transform : transform;

    private void Awake()
    {
        ActiveController = this;
        currentHealth = Mathf.Max(1, maxHealth);
    }

    private void Start()
    {
        cam = GetComponent<Camera>();
        if (cam == null)
        {
            cam = Camera.main;
        }

        if (cam != null)
        {
            cam.fieldOfView = defaultFOV;
        }

        Vector3 euler = transform.rotation.eulerAngles;
        currentYaw = NormalizeAngle(euler.y);
        currentPitch = NormalizeAngle(euler.x);

        ApplyAimVisual(false);
        UpdateHealthUI();
    }

    private void OnDestroy()
    {
        if (ActiveController == this)
        {
            ActiveController = null;
        }
    }

    private void Update()
    {
        if (!isDead)
        {
            HandleInput();
        }

        AdjustFOV();
    }

    public Vector3 GetAimTargetPosition()
    {
        Transform reference = PlayerTransform;
        return reference.position + reference.forward * 0.6f;
    }

    public void ReceiveDamage(int damage, Vector3 attackOrigin)
    {
        if (isDead || damage <= 0)
        {
            return;
        }

        currentHealth = Mathf.Max(0, currentHealth - damage);
        UpdateHealthUI();

        if (currentHealth > 0)
        {
            return;
        }

        isDead = true;
        StopAiming();

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlayMusicLose();
        }

        if (showEndCardOnDeath && LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
        }
    }

    public void ReceiveExplosionDamage(Vector3 explosionOrigin, float radius, int damage)
    {
        if (isDead || damage <= 0)
        {
            return;
        }

        if (Vector3.Distance(PlayerTransform.position, explosionOrigin) > radius)
        {
            return;
        }

        ReceiveDamage(damage, explosionOrigin);
    }

    private void HandleInput()
    {
        if (Input.GetMouseButtonDown(0))
        {
            
            StartAiming();
        }
        else if (Input.GetMouseButtonUp(0))
        {
            bool shouldShoot = isDragging && fireOnMouseRelease;
            StopAiming();

            if (shouldShoot)
            {
                Fire();
            }
        }

        if (!isDragging)
        {
            return;
        }

        timeDragged += Time.deltaTime;
        if (timeDragged >= aimDurationLimit)
        {
            StopAiming();
            return;
        }

        Vector2 currentMousePos = Input.mousePosition;
        Vector2 delta = currentMousePos - startMousePos;

        currentYaw = Mathf.Clamp(currentYaw + delta.x * rotationSpeed, minYaw, maxYaw);
        currentPitch = Mathf.Clamp(currentPitch - delta.y * rotationSpeed, minPitch, maxPitch);
        transform.rotation = Quaternion.Euler(currentPitch, currentYaw, 0f);
        startMousePos = currentMousePos;
    }

    private void StartAiming()
    {
        if (cam == null)
        {
            return;
        }
        tutorialUI.SetActive(false);
        isDragging = true;
        timeDragged = 0f;
        startMousePos = Input.mousePosition;
        ApplyAimVisual(true);
    }

    private void StopAiming()
    {
        isDragging = false;
        timeDragged = 0f;
        ApplyAimVisual(false);
    }

    private void Fire()
    {
        if (cam == null)
        {
            return;
        }

        Ray ray = cam.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0f));
        Vector3 hitPoint = ray.origin + ray.direction * shootDistance;
        DamageableTarget lockedTarget = null;

        RaycastHit[] hits = Physics.RaycastAll(ray, shootDistance, shootMask, QueryTriggerInteraction.Ignore);
        if (hits.Length > 1)
        {
            System.Array.Sort(hits, (left, right) => left.distance.CompareTo(right.distance));
        }

        for (int i = 0; i < hits.Length; i++)
        {
            hitPoint = hits[i].point;
            lockedTarget = hits[i].collider.GetComponentInParent<DamageableTarget>();
            if (lockedTarget != null)
            {
                break;
            }
        }

        Vector3 bulletOrigin = GetMuzzleWorldPosition();
        Vector3 bulletDirection = hitPoint - bulletOrigin;
        if (bulletDirection.sqrMagnitude <= 0.0001f)
        {
            bulletDirection = ray.direction;
        }

        CombatBullet.Spawn(
            bulletPrefab,
            bulletOrigin,
            bulletDirection.normalized,
            bulletSpeed,
            bulletLifetime,
            shootDamage,
            transform,
            true,
            false,
            hitPoint,
            bulletHitRadius,
            bulletColor,
            bulletScale,
            lockedTarget);

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundFire();
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }

        EnemyAlertSystem.NotifyPlayerShot(transform, hitPoint);
    }

    private void ApplyAimVisual(bool aiming)
    {
        /*if (tutorialUI != null)
        {
            tutorialUI.SetActive(!aiming);
        }*/
        if (scope != null)
        {
            scope.SetActive(aiming);
        }

        if (cam != null)
        {
            cam.depth = aiming ? 100f : -1f;
        }
    }

    private void AdjustFOV()
    {
        if (cam == null)
        {
            return;
        }

        float targetFOV = isDragging ? minFOV : defaultFOV;
        cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, targetFOV, Time.deltaTime * fovAdjustSpeed);
    }

    private void UpdateHealthUI()
    {
        float normalizedHealth = maxHealth <= 0 ? 0f : (float)currentHealth / maxHealth;

        if (hpFillImage != null)
        {
            hpFillImage.fillAmount = normalizedHealth;
        }

        if (hpText != null)
        {
            hpText.text = currentHealth + "/" + Mathf.Max(1, maxHealth);
        }
    }

    private Vector3 GetMuzzleWorldPosition()
    {
        return PlayerTransform.TransformPoint(muzzleOffset);
    }

    private static float NormalizeAngle(float angle)
    {
        if (angle > 180f)
        {
            angle -= 360f;
        }

        return angle;
    }
}
