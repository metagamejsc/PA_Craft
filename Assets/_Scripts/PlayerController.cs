using System;
using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;

public class PlayerController : MonoBehaviour
{
    private static readonly int AttackTriggerHash = Animator.StringToHash("Attack");
    private static readonly int DeadTriggerHash = Animator.StringToHash("Dead");
    private static readonly int IsMovingBoolHash = Animator.StringToHash("isMoving");

    [Header("Movement")]
    [SerializeField] private ButtonMove movementJoystick;
    [SerializeField] private float moveSpeed = 4f;
    [SerializeField] private float moveDeadZone = 0.15f;

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
    private bool hasAttackTrigger;
    private bool hasDeadTrigger;
    private bool hasIsMovingBool;

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

        CacheMovementJoystick();
        CacheCameraState();
        ResolveAnimator();
        CacheAnimatorParameters();
        InitializeAnimatorState();
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

        HandleAimInput();
        HandleMovementInput();
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

        if (animator != null && hasAttackTrigger)
        {
            animator.SetTrigger(AttackTriggerHash);
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
            Vector3 shotOrigin = GetShotOrigin();
            Vector3 raycastAimPoint = GetRaycastAimPoint(aimRay);
            Vector3 hitDirection = GetDirectionFromSpawnToAimPoint(shotOrigin, raycastAimPoint, aimRay.direction);
            float distance = Vector3.Distance(shotOrigin, lockedEnemy.GetAimPoint());
            if (distance <= shotRange)
            {
                if (effectDamageEnemy != null)
                {
                    effectDamageEnemy.gameObject.SetActive(true);
                    effectDamageEnemy.DORestart();
                }

                lockedEnemy.TakeDamage(shotDamage, hitDirection);
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

        if (animator != null && hasDeadTrigger)
        {
            animator.SetTrigger(DeadTriggerHash);
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
            if (IsPointerOverUi())
            {
                isPointerTracking = false;
                hasLastMousePosition = false;
                return;
            }

            isPointerTracking = true;
            hasLastMousePosition = false;

            if (AudioManager.ins != null)
            {
                AudioManager.ins.StartAimHold();
            }

            TryAttackFromCurrentAim();
        }

        if (isPointerTracking && IsPrimaryInputHeld())
        {
            ApplyOrbitInput(GetPrimaryLookDelta());
            TryAttackFromCurrentAim();
        }

        if (isPointerTracking && IsPrimaryInputReleased())
        {
            if (AudioManager.ins != null)
            {
                AudioManager.ins.StopAimHold();
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

        float targetFieldOfView = defaultCameraFieldOfView;
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

    void TryAttackFromCurrentAim()
    {
        if (!canAttack)
        {
            return;
        }

        StartCoroutine(AttackEnemy(FindEnemyFromAimRay(GetAimRay())));
    }

    void ApplyRecoil()
    {
        recoilPitchOffset += recoilPitch;
        recoilYawOffset += UnityEngine.Random.Range(-recoilYaw, recoilYaw);
    }

    void SpawnProjectile(Ray aimRay, EnemyController targetEnemy)
    {
        Vector3 raycastAimPoint = GetRaycastAimPoint(aimRay);
        Vector3 spawnPosition = GetProjectileSpawnPosition(aimRay.direction);
        Vector3 projectileDirection = GetDirectionFromSpawnToAimPoint(spawnPosition, raycastAimPoint, aimRay.direction);

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

    Vector3 GetRaycastAimPoint(Ray aimRay)
    {
        RaycastHit[] hits = Physics.RaycastAll(aimRay, shotRange, shotMask, QueryTriggerInteraction.Ignore);
        if (hits.Length > 0)
        {
            Array.Sort(hits, (left, right) => left.distance.CompareTo(right.distance));

            for (int i = 0; i < hits.Length; i++)
            {
                if (IsOwnedCollider(hits[i].collider))
                {
                    continue;
                }

                return hits[i].point;
            }
        }

        return aimRay.origin + (aimRay.direction * shotRange);
    }

    Vector3 GetDirectionFromSpawnToAimPoint(Vector3 spawnPosition, Vector3 aimPoint, Vector3 fallbackDirection)
    {
        Vector3 direction = aimPoint - spawnPosition;
        if (direction.sqrMagnitude <= 0.0001f)
        {
            return fallbackDirection.normalized;
        }

        return direction.normalized;
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
                if (IsOwnedCollider(hits[i].collider))
                {
                    continue;
                }

                EnemyController enemy = hits[i].collider.GetComponentInParent<EnemyController>();
                if (enemy != null && !enemy.IsDead())
                {
                    return enemy;
                }
            }
        }

        return EnemyController.GetClosestAliveToRay(ray, aimAssistRadius, shotRange);
    }

    bool IsOwnedCollider(Collider targetCollider)
    {
        if (targetCollider == null)
        {
            return false;
        }

        Transform ownerRoot = transform.root;
        return targetCollider.transform == ownerRoot || targetCollider.transform.IsChildOf(ownerRoot);
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

    Transform GetMovementTargetTransform()
    {
        if (gameplayCamera != null && IsAttachedToGameplayCamera())
        {
            return gameplayCamera.transform;
        }

        return transform;
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

    void HandleMovementInput()
    {
        Vector2 moveInput = GetMovementInput();
        if (moveInput.sqrMagnitude < moveDeadZone * moveDeadZone)
        {
            SetMovingAnimation(false);
            return;
        }

        Camera targetCamera = gameplayCamera != null ? gameplayCamera : Camera.main;
        Vector3 moveDirection = Vector3.zero;

        if (targetCamera != null)
        {
            Vector3 cameraForward = targetCamera.transform.forward;
            cameraForward.y = 0f;
            cameraForward.Normalize();

            Vector3 cameraRight = targetCamera.transform.right;
            cameraRight.y = 0f;
            cameraRight.Normalize();

            moveDirection = (cameraRight * moveInput.x) + (cameraForward * moveInput.y);
        }
        else
        {
            moveDirection = new Vector3(moveInput.x, 0f, moveInput.y);
        }

        if (moveDirection.sqrMagnitude <= 0.0001f)
        {
            SetMovingAnimation(false);
            return;
        }

        Transform movementTarget = GetMovementTargetTransform();
        if (movementTarget != null)
        {
            movementTarget.position += moveDirection.normalized * moveSpeed * Time.deltaTime;
        }

        SetMovingAnimation(true);
    }

    Vector2 GetMovementInput()
    {
        if (movementJoystick == null)
        {
            CacheMovementJoystick();
        }

        if (movementJoystick != null)
        {
            return movementJoystick.Direction;
        }

        return Vector2.zero;
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

    bool IsPointerOverUi()
    {
        if (EventSystem.current == null)
        {
            return false;
        }

        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            return EventSystem.current.IsPointerOverGameObject(touch.fingerId);
        }

        return EventSystem.current.IsPointerOverGameObject();
    }

    void CacheMovementJoystick()
    {
        /*if (movementJoystick == null)
        {
            movementJoystick = FindObjectOfType<ButtonMove>(true);
        }*/
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

    void ResolveAnimator()
    {
        if (IsAnimatorUsable(animator))
        {
            return;
        }

        Animator[] availableAnimators = GetComponentsInChildren<Animator>(true);
        for (int i = 0; i < availableAnimators.Length; i++)
        {
            Animator candidate = availableAnimators[i];
            if (HasAnimatorParameter(candidate, IsMovingBoolHash, AnimatorControllerParameterType.Bool))
            {
                animator = candidate;
                return;
            }
        }

        for (int i = 0; i < availableAnimators.Length; i++)
        {
            Animator candidate = availableAnimators[i];
            if (candidate != null && candidate.runtimeAnimatorController != null)
            {
                animator = candidate;
                return;
            }
        }
    }

    void CacheAnimatorParameters()
    {
        hasAttackTrigger = HasAnimatorParameter(animator, AttackTriggerHash, AnimatorControllerParameterType.Trigger);
        hasDeadTrigger = HasAnimatorParameter(animator, DeadTriggerHash, AnimatorControllerParameterType.Trigger);
        hasIsMovingBool = HasAnimatorParameter(animator, IsMovingBoolHash, AnimatorControllerParameterType.Bool);
    }

    void InitializeAnimatorState()
    {
        if (animator == null)
        {
            return;
        }

        animator.Rebind();
        animator.Update(0f);
        SetMovingAnimation(false);
    }

    bool IsAnimatorUsable(Animator targetAnimator)
    {
        return targetAnimator != null
            && targetAnimator.runtimeAnimatorController != null
            && HasAnimatorParameter(targetAnimator, IsMovingBoolHash, AnimatorControllerParameterType.Bool);
    }

    bool HasAnimatorParameter(
        Animator targetAnimator,
        int parameterHash,
        AnimatorControllerParameterType parameterType)
    {
        if (targetAnimator == null)
        {
            return false;
        }

        AnimatorControllerParameter[] parameters = targetAnimator.parameters;
        for (int i = 0; i < parameters.Length; i++)
        {
            if (parameters[i].nameHash == parameterHash && parameters[i].type == parameterType)
            {
                return true;
            }
        }

        return false;
    }

    void SetMovingAnimation(bool isMoving)
    {
        if (animator == null || !hasIsMovingBool)
        {
            return;
        }

        animator.SetBool(IsMovingBoolHash, isMoving);
    }
}
