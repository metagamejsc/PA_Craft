using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public Animator animator;
    public DOTweenAnimation effectDamageEnemy;
    public RectTransform aimReticle;
    public RectTransform scopeUiRoot;

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

    [Header("Auto Target")]
    public int autoTargetCount = 3;
    public float autoTargetSwitchInterval = 0.7f;
    public float autoReticleFollowSpeed = 18f;

    [Header("Recoil")]
    public float recoilPitch = 1.5f;
    public float recoilYaw = 0.35f;
    public float recoilRecoverSpeed = 10f;

    private float currentHealth;
    private bool isDead;
    private bool canAttack = true;
    private bool isPointerTracking;
    private bool hasLastMousePosition;
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
    private readonly List<EnemyController> autoTargets = new List<EnemyController>();
    private RectTransform aimReticleParent;
    private Canvas aimReticleCanvas;
    private Vector2 defaultReticleAnchoredPosition;
    private Vector2 currentReticleAnchoredPosition;
    private EnemyController currentAutoTarget;
    private EnemyController lastAutoTarget;
    private int autoTargetIndex = -1;
    private float autoTargetTimer;
    private bool isAutoTargetLoopRunning;

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
        CacheReticleState();
        ResetAutoTargeting();
        SetScopeVisible(false);

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

        bool isCreativePaused = LunaManager.ins != null && LunaManager.ins.isCretivePause;
        if (isCreativePaused && !isAutoTargetLoopRunning)
        {
            return;
        }

        if (gameplayCamera == null)
        {
            CacheCameraState();
        }

        if (!isCreativePaused)
        {
            HandleAimInput();
        }
        else if (isPointerTracking)
        {
            UpdateAutoTargeting();
        }

        UpdateAimCamera();
        UpdateScopeReticle();
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

        ApplyRecoil();

        yield return new WaitForSeconds(shotDelay);

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundFire();
        }

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

        LunaManager.ins?.CheckClickShowEndCard();

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

        //RestoreDefaultView();

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

    void HandleAimInput()
    {
        if (IsPrimaryInputStarted())
        {
            StartAimTracking();
        }

        if (isPointerTracking)
        {
            if (!UpdateAutoTargeting() && isPointerTracking)
            {
                ApplyOrbitInput(GetPrimaryLookDelta());
            }
        }

        if (IsPrimaryInputReleased())
        {
            if (canAttack)
            {
                StartCoroutine(AttackEnemy(GetAttackTarget()));
            }
        }

        if (!isPointerTracking)
        {
            return;
        }
    }

    void UpdateAimCamera()
    {
        if (gameplayCamera == null)
        {
            return;
        }

        float deltaTime = GetAimDeltaTime();
        recoilPitchOffset = Mathf.Lerp(recoilPitchOffset, 0f, recoilRecoverSpeed * deltaTime);
        recoilYawOffset = Mathf.Lerp(recoilYawOffset, 0f, recoilRecoverSpeed * deltaTime);

        float targetFieldOfView = isPointerTracking ? zoomFieldOfView : defaultCameraFieldOfView;
        gameplayCamera.fieldOfView = Mathf.Lerp(
            gameplayCamera.fieldOfView,
            targetFieldOfView,
            zoomSpeed * deltaTime);

        float finalYaw = targetYaw + recoilYawOffset;
        float finalPitch = Mathf.Clamp(targetPitch - recoilPitchOffset, pitchClamp.x, pitchClamp.y);

        currentYaw = Mathf.LerpAngle(currentYaw, finalYaw, orbitSmoothSpeed * deltaTime);
        currentPitch = Mathf.LerpAngle(currentPitch, finalPitch, orbitSmoothSpeed * deltaTime);

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

    void CacheReticleState()
    {
        if (aimReticle == null)
        {
            return;
        }

        aimReticleParent = aimReticle.parent as RectTransform;
        aimReticleCanvas = aimReticle.GetComponentInParent<Canvas>();
        defaultReticleAnchoredPosition = aimReticle.anchoredPosition;
        currentReticleAnchoredPosition = defaultReticleAnchoredPosition;
    }

    void RestoreDefaultView()
    {
        if (AudioManager.ins != null)
        {
            AudioManager.ins.StopAimHold();
        }

        isPointerTracking = false;
        hasLastMousePosition = false;
        recoilPitchOffset = 0f;
        recoilYawOffset = 0f;
        ResetAutoTargeting();
        SetScopeVisible(false);
        targetYaw = defaultYaw;
        currentYaw = defaultYaw;
        targetPitch = defaultPitch;
        currentPitch = defaultPitch;

        if (gameplayCamera == null)
        {
            return;
        }

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

    void StartAimTracking()
    {
        if (isAutoTargetLoopRunning)
        {
            return;
        }

        ResetAutoTargeting();
        isPointerTracking = true;
        isAutoTargetLoopRunning = true;
        hasLastMousePosition = false;
        autoTargetTimer = autoTargetSwitchInterval;
        RefreshAutoTargets();
        SetScopeVisible(true);

        if (AudioManager.ins != null)
        {
            AudioManager.ins.StartAimHold();
        }
    }

    void StopAimTracking()
    {
        EnemyController completedTarget = currentAutoTarget;
        bool keepAimVisual = ShouldKeepAimVisualAfterGameEnd();

        if (AudioManager.ins != null)
        {
            AudioManager.ins.StopAimHold();
        }

        isAutoTargetLoopRunning = false;
        hasLastMousePosition = false;
        lastAutoTarget = completedTarget;

        if (keepAimVisual)
        {
            isPointerTracking = true;
            currentAutoTarget = completedTarget;
            ClearAutoTargetLoopState(false);
            SetScopeVisible(true);
            return;
        }

        isPointerTracking = false;
        ResetAutoTargeting();
        lastAutoTarget = completedTarget;
        SetScopeVisible(false);
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

    bool UpdateAutoTargeting()
    {
        if (!isAutoTargetLoopRunning)
        {
            return false;
        }

        bool needsRefresh = currentAutoTarget == null || currentAutoTarget.IsDead() || autoTargetTimer >= autoTargetSwitchInterval;
        if (needsRefresh)
        {
            RefreshAutoTargets();
            if (!SelectNextAutoTarget())
            {
                currentAutoTarget = null;
                autoTargetTimer = 0f;
                return true;
            }

            autoTargetTimer = 0f;
        }
        else
        {
            autoTargetTimer += GetAimDeltaTime();
        }
        if (currentAutoTarget == null)
        {
            return false;
        }
       
        AimCameraAtTarget(currentAutoTarget);
        return true;
    }

    void RefreshAutoTargets()
    {
        EnemyController.GetAliveEnemies(autoTargets);
        if (autoTargets.Count == 0)
        {
            currentAutoTarget = null;
            autoTargetIndex = -1;
            return;
        }

        Vector3 referencePosition = gameplayCamera != null
            ? gameplayCamera.transform.position
            : transform.position;
        autoTargets.Sort((left, right) =>
        {
            float leftDistance = (left.GetAimPoint() - referencePosition).sqrMagnitude;
            float rightDistance = (right.GetAimPoint() - referencePosition).sqrMagnitude;
            return leftDistance.CompareTo(rightDistance);
        });

        int clampedTargetCount = Mathf.Max(1, autoTargetCount);
        if (autoTargets.Count > clampedTargetCount)
        {
            autoTargets.RemoveRange(clampedTargetCount, autoTargets.Count - clampedTargetCount);
        }

        if (gameplayCamera == null || autoTargets.Count <= 1)
        {
            return;
        }

        autoTargets.Sort((left, right) =>
        {
            float leftViewportX = gameplayCamera.WorldToViewportPoint(left.GetAimPoint()).x;
            float rightViewportX = gameplayCamera.WorldToViewportPoint(right.GetAimPoint()).x;
            return leftViewportX.CompareTo(rightViewportX);
        });
    }

    bool SelectNextAutoTarget()
    {
        if (autoTargets.Count == 0)
        {
            currentAutoTarget = null;
            autoTargetIndex = -1;
            return false;
        }

        int startingIndex = autoTargetIndex;
        for (int i = 0; i < autoTargets.Count; i++)
        {
            int candidateIndex = (startingIndex + 1 + i) % autoTargets.Count;
            EnemyController candidate = autoTargets[candidateIndex];
            if (candidate == null || candidate.IsDead())
            {
                continue;
            }

            autoTargetIndex = candidateIndex;
            currentAutoTarget = candidate;
            lastAutoTarget = candidate;
            return true;
        }

        currentAutoTarget = null;
        autoTargetIndex = -1;
        return false;
    }

    void AimCameraAtTarget(EnemyController enemy)
    {
        if (enemy == null || gameplayCamera == null)
        {
            return;
        }

        Vector3 lookDirection = enemy.GetAimPoint() - gameplayCamera.transform.position;
        if (lookDirection.sqrMagnitude <= 0.001f)
        {
            return;
        }

        Quaternion lookRotation = Quaternion.LookRotation(lookDirection.normalized);
        Vector3 lookEulerAngles = lookRotation.eulerAngles;
        targetYaw = lookEulerAngles.y;
        targetPitch = Mathf.Clamp(NormalizeAngle(lookEulerAngles.x), pitchClamp.x, pitchClamp.y);
    }

    void UpdateScopeReticle()
    {
        if (aimReticle == null)
        {
            return;
        }

        if (!isPointerTracking || currentAutoTarget == null || currentAutoTarget.IsDead() || gameplayCamera == null)
        {
            ResetReticlePosition();
            return;
        }

        Vector3 screenPoint = gameplayCamera.WorldToScreenPoint(currentAutoTarget.GetAimPoint());
        if (screenPoint.z <= 0f)
        {
            ResetReticlePosition();
            return;
        }

        if (!TryGetReticleAnchoredPosition(screenPoint, out Vector2 targetAnchoredPosition))
        {
            return;
        }

        currentReticleAnchoredPosition = Vector2.Lerp(
            currentReticleAnchoredPosition,
            targetAnchoredPosition,
            autoReticleFollowSpeed * GetAimDeltaTime());
        aimReticle.anchoredPosition = currentReticleAnchoredPosition;
    }

    bool TryGetReticleAnchoredPosition(Vector2 screenPoint, out Vector2 anchoredPosition)
    {
        anchoredPosition = default;
        if (aimReticleParent == null)
        {
            return false;
        }

        Camera uiCamera = null;
        if (aimReticleCanvas != null && aimReticleCanvas.renderMode != RenderMode.ScreenSpaceOverlay)
        {
            uiCamera = aimReticleCanvas.worldCamera != null ? aimReticleCanvas.worldCamera : gameplayCamera;
        }

        if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(
                aimReticleParent,
                screenPoint,
                uiCamera,
                out anchoredPosition))
        {
            return false;
        }

        Rect parentRect = aimReticleParent.rect;
        Vector2 halfSize = aimReticle.rect.size * 0.5f;
        anchoredPosition.x = Mathf.Clamp(anchoredPosition.x, parentRect.xMin + halfSize.x, parentRect.xMax - halfSize.x);
        anchoredPosition.y = Mathf.Clamp(anchoredPosition.y, parentRect.yMin + halfSize.y, parentRect.yMax - halfSize.y);
        return true;
    }

    void ResetAutoTargeting()
    {
        ClearAutoTargetLoopState(true);
    }

    void ClearAutoTargetLoopState(bool resetReticle)
    {
        autoTargets.Clear();
        if (resetReticle)
        {
            currentAutoTarget = null;
            lastAutoTarget = null;
        }

        autoTargetIndex = -1;
        autoTargetTimer = 0f;
        isAutoTargetLoopRunning = false;
        if (resetReticle)
        {
            ResetReticlePosition();
        }
    }

    void ResetReticlePosition()
    {
        if (aimReticle == null)
        {
            return;
        }

        currentReticleAnchoredPosition = defaultReticleAnchoredPosition;
        aimReticle.anchoredPosition = defaultReticleAnchoredPosition;
    }

    void SetScopeVisible(bool isVisible)
    {
        if (scopeUiRoot != null)
        {
            scopeUiRoot.gameObject.SetActive(isVisible);
        }

        if (aimReticle != null && (scopeUiRoot == null || aimReticle != scopeUiRoot))
        {
            aimReticle.gameObject.SetActive(isVisible);
        }
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

    EnemyController GetAttackTarget()
    {
        if (currentAutoTarget != null && !currentAutoTarget.IsDead())
        {
            return currentAutoTarget;
        }

        if (lastAutoTarget != null && !lastAutoTarget.IsDead())
        {
            return lastAutoTarget;
        }

        return FindEnemyFromAimRay(GetAimRay());
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

    float GetAimDeltaTime()
    {
        return LunaManager.ins != null && LunaManager.ins.isCretivePause
            ? Time.unscaledDeltaTime
            : Time.deltaTime;
    }

    bool ShouldKeepAimVisualAfterGameEnd()
    {
        return LunaManager.ins != null && LunaManager.ins.isCretivePause;
    }

    void OnDisable()
    {
        //RestoreDefaultView();
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
