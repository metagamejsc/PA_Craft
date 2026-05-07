using System;
using System.Collections;
using DG.Tweening;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public Animator animator;
    public DOTweenAnimation effectDamageEnemy;
    public RectTransform aimReticle;

    [Header("Projectile")]
    public GameObject projectilePrefab;
    public Transform projectileSpawnPoint;
    public float projectileSpawnOffset = 0.6f;
    public float projectileSpeed = 35f;
    public float projectileLifetime = 5f;

    [Header("Combat Settings")]
    public float attackCooldown = 1f;
    public float shotRange = 30f;
    public float shotDamage = 1f;
    public float shotDelay = 0.12f;
    public LayerMask shotMask = ~0;
    public float aimAssistRadius = 0.9f;

    [Header("Aim Camera")]
    public Vector3 cameraPivotOffset = new Vector3(0f, 1.35f, 0f);
    public float zoomFieldOfView = 78f;
    public float zoomSpeed = 8f;
    public float mouseOrbitSensitivity = 5f;
    public float touchOrbitSensitivity = 0.08f;
    public float orbitSmoothSpeed = 12f;
    public Vector2 pitchClamp = new Vector2(8f, 45f);

    [Header("Recoil")]
    public float recoilPitch = 1.5f;
    public float recoilYaw = 0.35f;
    public float recoilRecoverSpeed = 10f;

    private float currentHealth;
    private bool isDead;
    private bool canAttack = true;
    private bool isPointerTracking;
    private bool hasLastMousePosition;
    private bool isCameraPathMoving;
    private Camera gameplayCamera;
    private float defaultCameraFieldOfView;
    private Quaternion defaultCameraRotation;
    private Quaternion defaultLocalRotation;
    private float orbitDistance;
    private float targetYaw;
    private float targetPitch;
    private float currentYaw;
    private float currentPitch;
    private float defaultYaw;
    private float defaultPitch;
    private float recoilYawOffset;
    private float recoilPitchOffset;
    private Vector2 lastMousePosition;
    private Tween cameraPathTween;

    void Start()
    {
        if (LunaManager.ins != null)
        {
            attackCooldown = LunaManager.ins.timeDelayAttackPlayer;
            currentHealth = LunaManager.ins.healthPlayer;
        }
        else
        {
            currentHealth = 1f;
        }

        defaultLocalRotation = transform.localRotation;

        CacheCameraState();

        if (animator != null)
        {
            animator.SetTrigger("Idle");
        }
    }

    void Update()
    {
        if (isDead)
        {
            return;
        }

        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            return;
        }

        if (gameplayCamera == null)
        {
            CacheCameraState();
        }

        if (isCameraPathMoving)
        {
            return;
        }

        HandleAimInput();
        UpdateAimCamera();
    }

    IEnumerator AttackEnemy(EnemyController enemy)
    {
        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            yield break;
        }

        canAttack = false;
        float timeBetweenShots = GetTimeBetweenShots();

        Ray aimRay = GetAimRay();
        EnemyController lockedEnemy = enemy;
        FaceTarget(lockedEnemy);

        if (animator != null)
        {
            animator.SetTrigger("Attack");
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundFire();
        }

        ApplyRecoil();

        yield return new WaitForSeconds(shotDelay);

        if (projectilePrefab != null)
        {
            SpawnProjectile(aimRay, lockedEnemy);
        }
        else if (lockedEnemy != null && !lockedEnemy.IsDead())
        {
            float distance = Vector3.Distance(GetShotOrigin(), lockedEnemy.GetAimPoint());
            if (distance <= shotRange)
            {
                if (effectDamageEnemy != null)
                {
                    effectDamageEnemy.gameObject.SetActive(true);
                    effectDamageEnemy.DORestart();
                }

                lockedEnemy.TakeDamage(shotDamage, aimRay.direction);
            }
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.RegisterPlayerShot();
        }

        float remainingCooldown = Mathf.Max(0f, timeBetweenShots - shotDelay);
        if (remainingCooldown > 0f)
        {
            yield return new WaitForSeconds(remainingCooldown);
        }

        canAttack = true;
    }

    public void TakeDamage(int amount)
    {
        if (isDead)
        {
            return;
        }

        currentHealth -= amount;
        if (currentHealth <= 0f)
        {
            Die();
        }
    }

    void Die()
    {
        if (isDead)
        {
            return;
        }

        isDead = true;
        if (LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
        }

        RestoreDefaultView();

        if (animator != null)
        {
            animator.SetTrigger("Dead");
        }
    }

    public bool IsDead()
    {
        return isDead;
    }

    public Vector3 GetCombatTargetPosition()
    {
        if (gameplayCamera != null && IsAttachedToGameplayCamera())
        {
            Vector3 targetPosition = gameplayCamera.transform.position;
            targetPosition.y = transform.position.y;
            return targetPosition;
        }

        return transform.position;
    }

    public Tween MoveGameplayCameraTo(Transform targetPoint, float duration, Ease ease, Action onComplete = null)
    {
        if (targetPoint == null)
        {
            return null;
        }

        return MoveGameplayCameraTo(targetPoint.position, targetPoint.rotation, duration, ease, onComplete);
    }

    public void SetGameplayCameraTo(Transform targetPoint)
    {
        if (targetPoint == null)
        {
            return;
        }

        if (gameplayCamera == null)
        {
            CacheCameraState();
        }

        if (gameplayCamera == null)
        {
            return;
        }

        cameraPathTween?.Kill();
        isCameraPathMoving = false;
        isPointerTracking = false;
        hasLastMousePosition = false;
        gameplayCamera.transform.SetPositionAndRotation(targetPoint.position, targetPoint.rotation);
        CacheCameraState();
    }

    public Tween MoveGameplayCameraTo(
        Vector3 targetPosition,
        Quaternion targetRotation,
        float duration,
        Ease ease,
        Action onComplete = null)
    {
        if (gameplayCamera == null)
        {
            CacheCameraState();
        }

        if (gameplayCamera == null)
        {
            return null;
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.StopAimHold();
        }

        cameraPathTween?.Kill();
        isPointerTracking = false;
        hasLastMousePosition = false;
        recoilPitchOffset = 0f;
        recoilYawOffset = 0f;
        isCameraPathMoving = true;

        float moveDuration = Mathf.Max(0f, duration);
        Tween moveTween = gameplayCamera.transform
            .DOMove(targetPosition, moveDuration)
            .SetEase(ease);
        Tween rotateTween = gameplayCamera.transform
            .DORotateQuaternion(targetRotation, moveDuration)
            .SetEase(ease);

        cameraPathTween = DOTween.Sequence()
            .Join(moveTween)
            .Join(rotateTween)
            .SetLink(gameplayCamera.gameObject)
            .OnComplete(() =>
            {
                FinishCameraPathMove();
                onComplete?.Invoke();
            })
            .OnKill(() =>
            {
                if (isCameraPathMoving)
                {
                    FinishCameraPathMove();
                }
            });

        return cameraPathTween;
    }

    void FinishCameraPathMove()
    {
        isCameraPathMoving = false;
        CacheCameraState();
    }

    void HandleAimInput()
    {
        if (IsPrimaryInputStarted())
        {
            isPointerTracking = true;
            hasLastMousePosition = false;

            if (AudioManager.ins != null)
            {
                AudioManager.ins.StartAimHold();
            }
        }

        if (isPointerTracking && IsPrimaryInputHeld())
        {
            ApplyOrbitInput(GetPrimaryLookDelta());
        }

        if (!isPointerTracking)
        {
            return;
        }

        if (IsPrimaryInputReleased())
        {
            if (AudioManager.ins != null)
            {
                AudioManager.ins.StopAimHold();
            }

            if (canAttack)
            {
                StartCoroutine(AttackEnemy(FindEnemyFromAimRay(GetAimRay())));
            }

            isPointerTracking = false;
            hasLastMousePosition = false;
        }
    }

    void UpdateAimCamera()
    {
        if (gameplayCamera == null)
        {
            return;
        }

        recoilPitchOffset = Mathf.Lerp(recoilPitchOffset, 0f, recoilRecoverSpeed * Time.deltaTime);
        recoilYawOffset = Mathf.Lerp(recoilYawOffset, 0f, recoilRecoverSpeed * Time.deltaTime);

        float targetFieldOfView = isPointerTracking ? zoomFieldOfView : defaultCameraFieldOfView;
        gameplayCamera.fieldOfView = Mathf.Lerp(
            gameplayCamera.fieldOfView,
            targetFieldOfView,
            zoomSpeed * Time.deltaTime);

        float finalYaw = targetYaw + recoilYawOffset;
        float finalPitch = Mathf.Clamp(targetPitch - recoilPitchOffset, pitchClamp.x, pitchClamp.y);

        currentYaw = Mathf.LerpAngle(currentYaw, finalYaw, orbitSmoothSpeed * Time.deltaTime);
        currentPitch = Mathf.LerpAngle(currentPitch, finalPitch, orbitSmoothSpeed * Time.deltaTime);

        Quaternion cameraRotation = Quaternion.Euler(currentPitch, currentYaw, 0f);
        if (IsAttachedToGameplayCamera())
        {
            gameplayCamera.transform.rotation = cameraRotation;
            return;
        }

        Vector3 pivotPosition = GetOrbitPivotPosition();
        Vector3 cameraPosition = pivotPosition - (cameraRotation * Vector3.forward * orbitDistance);
        gameplayCamera.transform.SetPositionAndRotation(cameraPosition, cameraRotation);
    }

    void CacheCameraState()
    {
        gameplayCamera = Camera.main;
        if (gameplayCamera == null)
        {
            return;
        }

        defaultCameraFieldOfView = gameplayCamera.fieldOfView;
        defaultCameraRotation = gameplayCamera.transform.rotation;
        orbitDistance = Vector3.Distance(gameplayCamera.transform.position, GetOrbitPivotPosition());

        Vector3 eulerAngles = gameplayCamera.transform.eulerAngles;
        float normalizedPitch = NormalizeAngle(eulerAngles.x);
        targetYaw = eulerAngles.y;
        currentYaw = eulerAngles.y;
        defaultYaw = eulerAngles.y;

        targetPitch = Mathf.Clamp(normalizedPitch, pitchClamp.x, pitchClamp.y);
        currentPitch = targetPitch;
        defaultPitch = targetPitch;
    }

    void RestoreDefaultView()
    {
        if (gameplayCamera == null)
        {
            return;
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.StopAimHold();
        }

        isPointerTracking = false;
        hasLastMousePosition = false;
        recoilPitchOffset = 0f;
        recoilYawOffset = 0f;
        targetYaw = defaultYaw;
        currentYaw = defaultYaw;
        targetPitch = defaultPitch;
        currentPitch = defaultPitch;
        gameplayCamera.fieldOfView = defaultCameraFieldOfView;
        gameplayCamera.transform.rotation = defaultCameraRotation;
        transform.localRotation = defaultLocalRotation;

        if (IsAttachedToGameplayCamera())
        {
            return;
        }

        Vector3 pivotPosition = GetOrbitPivotPosition();
        Vector3 cameraPosition = pivotPosition - (defaultCameraRotation * Vector3.forward * orbitDistance);
        gameplayCamera.transform.SetPositionAndRotation(cameraPosition, defaultCameraRotation);
    }

    void ApplyOrbitInput(Vector2 lookDelta)
    {
        if (lookDelta.sqrMagnitude <= 0f)
        {
            return;
        }

        targetYaw += lookDelta.x;
        targetPitch = Mathf.Clamp(targetPitch - lookDelta.y, pitchClamp.x, pitchClamp.y);
    }

    void ApplyRecoil()
    {
        recoilPitchOffset += recoilPitch;
        recoilYawOffset += UnityEngine.Random.Range(-recoilYaw, recoilYaw);
    }

    void SpawnProjectile(Ray aimRay, EnemyController targetEnemy)
    {
        Vector3 projectileDirection = aimRay.direction;
        Vector3 spawnPosition = GetProjectileSpawnPosition(projectileDirection);

        if (targetEnemy != null && !targetEnemy.IsDead())
        {
            projectileDirection = (targetEnemy.GetAimPoint() - spawnPosition).normalized;
        }

        GameObject projectileObject = Instantiate(
            projectilePrefab,
            spawnPosition,
            Quaternion.LookRotation(projectileDirection));

        ProjectileController projectile = projectileObject.GetComponent<ProjectileController>();
        if (projectile != null)
        {
            projectile.Launch(
                spawnPosition,
                projectileDirection,
                projectileSpeed,
                shotDamage,
                projectileLifetime,
                shotMask,
                transform.root);
        }
    }

    Ray GetAimRay()
    {
        if (gameplayCamera == null)
        {
            return default;
        }

        return gameplayCamera.ScreenPointToRay(GetAimScreenPosition());
    }

    Vector2 GetAimScreenPosition()
    {
        if (aimReticle == null)
        {
            return new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
        }

        Canvas canvas = aimReticle.GetComponentInParent<Canvas>();
        Camera uiCamera = null;
        if (canvas != null && canvas.renderMode != RenderMode.ScreenSpaceOverlay)
        {
            uiCamera = canvas.worldCamera != null ? canvas.worldCamera : gameplayCamera;
        }

        return RectTransformUtility.WorldToScreenPoint(uiCamera, aimReticle.position);
    }

    EnemyController FindEnemyFromAimRay(Ray ray)
    {
        if (gameplayCamera == null)
        {
            return null;
        }

        RaycastHit[] hits = Physics.RaycastAll(ray, shotRange, shotMask, QueryTriggerInteraction.Ignore);
        if (hits.Length > 0)
        {
            Array.Sort(hits, (left, right) => left.distance.CompareTo(right.distance));

            for (int i = 0; i < hits.Length; i++)
            {
                EnemyController enemy = hits[i].collider.GetComponentInParent<EnemyController>();
                if (enemy != null && !enemy.IsDead())
                {
                    return enemy;
                }
            }
        }

        return EnemyController.GetClosestAliveToRay(ray, aimAssistRadius, shotRange);
    }

    void FaceTarget(EnemyController enemy)
    {
        if (enemy == null)
        {
            return;
        }

        if (IsAttachedToGameplayCamera())
        {
            transform.localRotation = defaultLocalRotation;
            return;
        }

        Vector3 lookDirection = enemy.GetAimPoint() - GetShotOrigin();
        lookDirection.y = 0f;
        if (lookDirection.sqrMagnitude < 0.001f)
        {
            return;
        }

        transform.rotation = Quaternion.LookRotation(lookDirection.normalized);
    }

    Vector3 GetProjectileSpawnPosition(Vector3 projectileDirection)
    {
        if (projectileSpawnPoint != null)
        {
            return projectileSpawnPoint.position;
        }

        return GetShotOrigin() + (projectileDirection.normalized * projectileSpawnOffset);
    }

    Vector3 GetShotOrigin()
    {
        if (projectileSpawnPoint != null)
        {
            return projectileSpawnPoint.position;
        }

        if (gameplayCamera != null)
        {
            return gameplayCamera.transform.position;
        }

        return transform.position;
    }

    Vector3 GetOrbitPivotPosition()
    {
        if (gameplayCamera != null && IsAttachedToGameplayCamera())
        {
            return gameplayCamera.transform.position;
        }

        return transform.position + cameraPivotOffset;
    }

    bool IsAttachedToGameplayCamera()
    {
        if (gameplayCamera == null)
        {
            return false;
        }

        return transform == gameplayCamera.transform || transform.IsChildOf(gameplayCamera.transform);
    }

    Vector2 GetPrimaryLookDelta()
    {
        if (Input.touchCount > 0)
        {
            return Input.GetTouch(0).deltaPosition * touchOrbitSensitivity;
        }

        Vector2 axisDelta = new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));
        if (axisDelta.sqrMagnitude > 0.000001f)
        {
            lastMousePosition = Input.mousePosition;
            hasLastMousePosition = true;
            return axisDelta * mouseOrbitSensitivity;
        }

        Vector2 currentMousePosition = Input.mousePosition;
        if (!hasLastMousePosition)
        {
            lastMousePosition = currentMousePosition;
            hasLastMousePosition = true;
            return Vector2.zero;
        }

        Vector2 pixelDelta = currentMousePosition - lastMousePosition;
        lastMousePosition = currentMousePosition;
        return pixelDelta * (mouseOrbitSensitivity * 0.02f);
    }

    bool IsPrimaryInputStarted()
    {
        if (Input.touchCount > 0)
        {
            return Input.GetTouch(0).phase == TouchPhase.Began;
        }

        return Input.GetMouseButtonDown(0);
    }

    bool IsPrimaryInputHeld()
    {
        if (Input.touchCount > 0)
        {
            TouchPhase phase = Input.GetTouch(0).phase;
            return phase != TouchPhase.Ended && phase != TouchPhase.Canceled;
        }

        return Input.GetMouseButton(0);
    }

    bool IsPrimaryInputReleased()
    {
        if (Input.touchCount > 0)
        {
            TouchPhase phase = Input.GetTouch(0).phase;
            return phase == TouchPhase.Ended || phase == TouchPhase.Canceled;
        }

        return Input.GetMouseButtonUp(0);
    }

    float NormalizeAngle(float angle)
    {
        if (angle > 180f)
        {
            angle -= 360f;
        }

        return angle;
    }

    void OnDisable()
    {
        cameraPathTween?.Kill();

        if (gameplayCamera != null)
        {
            RestoreDefaultView();
        }
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(GetShotOrigin(), shotRange);
    }

    float GetTimeBetweenShots()
    {
        if (LunaManager.ins != null)
        {
            attackCooldown = LunaManager.ins.timeDelayAttackPlayer;
        }

        return Mathf.Max(0f, attackCooldown);
    }
}
