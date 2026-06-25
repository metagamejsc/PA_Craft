using System;
using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;

public class PlayerController : MonoBehaviour
{
    [Serializable]
    public class EnemySpawnChoice
    {
        public GameObject enemyPrefab;
        public GameObject handEggPrefab;
        public Sprite eggIcon;
        public Sprite enemyIcon;
    }

    public Animator animator;
    public DOTweenAnimation effectDamageEnemy;
    public DOTweenAnimation effectTakeDamagePlayer;
    public RectTransform aimReticle;

    [Header("UI")]
    public GameObject weaponGuideUI;

    [Header("Enemy Spawn")]
    public GameObject enemySpawnPanel;
    public EnemySpawnChoice[] enemySpawnChoices;
    public Transform handEggAnchor;
    public LayerMask enemySpawnGroundMask = ~0;
    public float enemySpawnRayDistance = 80f;
    public bool hideSpawnPanelAfterSelect = true;
    public bool clearHandEggAfterSpawn = true;

    [Header("Projectile")]
    public GameObject projectilePrefab;
    public Transform projectileSpawnPoint;
    public float projectileSpawnOffset = 0.6f;
    public float projectileSpeed = 35f;
    public float projectileLifetime = 5f;

    [Header("Movement")]
    public JoystickController joystick;
    public float moveSpeed = 5f;
    public string moveSpeedParam = "Speed";

    [Header("Weapon")]
    public WeaponManager weaponManager;
    public AudioClip fireSound;
    public AudioClip deadSound;
    public string attackAnimTrigger = "Attack";

    [Header("Combat Settings")]
    public float attackCooldown = 1f;
    public float shotRange = 30f;
    public float shotDamage = 1f;
    public float shotDelay = 0.12f;
    public LayerMask shotMask = ~0;
    public float aimAssistRadius = 0.9f;
    public float aimMissDistance = 100f;

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
    private int aimTouchId = -1;
    private int selectedEnemySpawnIndex = -1;
    private GameObject currentHandEgg;

    public int SelectedEnemySpawnIndex => selectedEnemySpawnIndex;

    void Start()
    {
        if (LunaManager.ins != null)
        {
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

        HandleMovement();
        HandleAimInput();
        UpdateAimCamera();
    }

    IEnumerator AttackEnemy(EnemyController enemy)
    {
        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            yield break;
        }

        if (weaponManager != null && !weaponManager.UseAmmo())
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
            animator.SetTrigger(attackAnimTrigger);
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundFire(fireSound);
        }

        ApplyRecoil();

        yield return new WaitForSeconds(shotDelay);

        if (projectilePrefab != null)
        {
            SpawnProjectile();
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

        PlayTakeDamageWarning();
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

        // Dừng input, giữ nguyên camera tại vị trí lúc chết
        if (AudioManager.ins != null)
        {
            AudioManager.ins.StopAimHold();
            if (deadSound != null)
                AudioManager.ins.PlaySound(deadSound);
        }
        isPointerTracking = false;
        hasLastMousePosition = false;
        recoilPitchOffset = 0f;
        recoilYawOffset = 0f;

        if (animator != null)
        {
            animator.speed = 0;
        }

        // Ngã nghiêng 90° trên trục Z
        Transform tiltTarget = animator != null ? animator.transform : transform;
        Vector3 targetEuler = tiltTarget.eulerAngles;
        targetEuler.z = 90f;
        tiltTarget.DORotate(targetEuler, 0.5f, RotateMode.Fast).SetEase(Ease.OutQuad);
    }

    public bool IsDead()
    {
        return isDead;
    }

    public void PlayTakeDamageWarning()
    {
        DOTweenAnimation damageEffect = effectTakeDamagePlayer != null ? effectTakeDamagePlayer : effectDamageEnemy;
        if (damageEffect == null)
        {
            return;
        }

        damageEffect.gameObject.SetActive(true);
        damageEffect.DORestart();
    }

    public void HideWeaponGuideUI()
    {
        if (weaponGuideUI != null)
        {
            weaponGuideUI.SetActive(false);
        }
    }

    public void OpenEnemySpawnPanel()
    {
        SetEnemySpawnPanelActive(true);
    }

    public void CloseEnemySpawnPanel()
    {
        SetEnemySpawnPanelActive(false);
    }

    public void ToggleEnemySpawnPanel()
    {
        SetEnemySpawnPanelActive(enemySpawnPanel == null || !enemySpawnPanel.activeSelf);
    }

    public void SelectEnemyToSpawn(int choiceIndex)
    {
        if (enemySpawnChoices == null || choiceIndex < 0 || choiceIndex >= enemySpawnChoices.Length)
        {
            return;
        }

        if (enemySpawnChoices[choiceIndex] == null || enemySpawnChoices[choiceIndex].enemyPrefab == null)
        {
            return;
        }

        selectedEnemySpawnIndex = choiceIndex;
        ShowHandEgg(enemySpawnChoices[choiceIndex]);

        if (hideSpawnPanelAfterSelect)
        {
            SetEnemySpawnPanelActive(false);
        }
    }

    public void TrySpawnSelectedEnemy()
    {
        if (isDead || LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            return;
        }

        EnemySpawnChoice choice = GetSelectedEnemySpawnChoice();
        if (choice == null || choice.enemyPrefab == null)
        {
            return;
        }

        if (!TryGetEnemySpawnPose(out Vector3 spawnPosition, out Quaternion spawnRotation))
        {
            return;
        }

        if (animator != null)
        {
            animator.SetTrigger(attackAnimTrigger);
        }

        Instantiate(choice.enemyPrefab, spawnPosition, spawnRotation);

        if (LunaManager.ins != null)
        {
            LunaManager.ins.RegisterPlayerShot();
        }

        if (clearHandEggAfterSpawn)
        {
            ClearHandEgg();
        }
    }

    void SetEnemySpawnPanelActive(bool isActive)
    {
        if (enemySpawnPanel != null)
        {
            enemySpawnPanel.SetActive(isActive);
        }
    }

    EnemySpawnChoice GetSelectedEnemySpawnChoice()
    {
        if (enemySpawnChoices == null || selectedEnemySpawnIndex < 0 || selectedEnemySpawnIndex >= enemySpawnChoices.Length)
        {
            return null;
        }

        return enemySpawnChoices[selectedEnemySpawnIndex];
    }

    void ShowHandEgg(EnemySpawnChoice choice)
    {
        ClearHandEgg();

        if (choice == null || choice.handEggPrefab == null || handEggAnchor == null)
        {
            return;
        }

        currentHandEgg = Instantiate(choice.handEggPrefab, handEggAnchor);
        currentHandEgg.transform.localPosition = Vector3.zero;
        currentHandEgg.transform.localRotation = Quaternion.identity;
        currentHandEgg.transform.localScale = Vector3.one;
    }

    void ClearHandEgg()
    {
        if (currentHandEgg != null)
        {
            Destroy(currentHandEgg);
            currentHandEgg = null;
        }
    }

    bool TryGetEnemySpawnPose(out Vector3 spawnPosition, out Quaternion spawnRotation)
    {
        spawnPosition = Vector3.zero;
        spawnRotation = Quaternion.identity;

        if (gameplayCamera == null)
        {
            CacheCameraState();
        }

        Ray spawnRay = gameplayCamera != null
            ? gameplayCamera.ScreenPointToRay(GetAimScreenPosition())
            : new Ray(transform.position + Vector3.up, Vector3.down);

        if (!Physics.Raycast(spawnRay, out RaycastHit hit, enemySpawnRayDistance, enemySpawnGroundMask, QueryTriggerInteraction.Ignore))
        {
            return false;
        }

        spawnPosition = hit.point;
        Vector3 forward = gameplayCamera != null ? gameplayCamera.transform.forward : transform.forward;
        forward.y = 0f;
        if (forward.sqrMagnitude <= 0.001f)
        {
            forward = transform.forward;
            forward.y = 0f;
        }

        spawnRotation = forward.sqrMagnitude > 0.001f
            ? Quaternion.LookRotation(forward.normalized)
            : Quaternion.identity;
        return true;
    }

    public void TryShoot()
    {
        if (isDead)
            return;
        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
            return;
        if (!canAttack)
            return;

        StartCoroutine(AttackEnemy(FindEnemyFromAimRay(GetAimRay())));
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

    void HandleMovement()
    {
        Vector2 input = GetMovementInput();

        if (animator != null)
            animator.SetFloat(moveSpeedParam, input.magnitude);

        if (gameplayCamera != null)
        {
            Vector3 camForward = gameplayCamera.transform.forward;
            camForward.y = 0f;
            if (camForward.sqrMagnitude > 0.001f)
            {
                transform.rotation = Quaternion.Slerp(
                    transform.rotation,
                    Quaternion.LookRotation(camForward.normalized),
                    10f * Time.deltaTime);

                if (input.sqrMagnitude >= 0.01f)
                {
                    Vector3 camRight = gameplayCamera.transform.right;
                    camRight.y = 0f;
                    camRight.Normalize();
                    Vector3 moveDir = camForward.normalized * input.y + camRight * input.x;
                    transform.position += moveDir * moveSpeed * Time.deltaTime;
                }
            }
        }
        else if (input.sqrMagnitude >= 0.01f)
        {
            transform.position += new Vector3(input.x, 0f, input.y) * moveSpeed * Time.deltaTime;
        }
    }

    Vector2 GetMovementInput()
    {
        Vector2 input = joystick != null ? joystick.Direction : Vector2.zero;

#if UNITY_EDITOR
        Vector2 keyboardInput = Vector2.zero;
        if (Input.GetKey(KeyCode.A))
            keyboardInput.x -= 1f;
        if (Input.GetKey(KeyCode.D))
            keyboardInput.x += 1f;
        if (Input.GetKey(KeyCode.S))
            keyboardInput.y -= 1f;
        if (Input.GetKey(KeyCode.W))
            keyboardInput.y += 1f;

        if (keyboardInput.sqrMagnitude > 1f)
            keyboardInput.Normalize();

        if (keyboardInput.sqrMagnitude > 0f)
            input = keyboardInput;
#endif

        return input;
    }

    void HandleAimInput()
    {
        int joystickTouchId = joystick != null ? joystick.ActiveTouchId : -1;

        if (Input.touchCount > 0)
        {
            for (int i = 0; i < Input.touchCount; i++)
            {
                Touch touch = Input.GetTouch(i);
                if (touch.fingerId == joystickTouchId)
                    continue;

                if (touch.phase == TouchPhase.Began && !isPointerTracking)
                {
                    if (EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(touch.fingerId))
                        continue;

                    aimTouchId = touch.fingerId;
                    isPointerTracking = true;
                    hasLastMousePosition = false;
                    if (AudioManager.ins != null)
                        AudioManager.ins.StartAimHold();
                }

                if (!isPointerTracking || touch.fingerId != aimTouchId)
                    continue;

                if (touch.phase == TouchPhase.Moved || touch.phase == TouchPhase.Stationary)
                    ApplyOrbitInput(touch.deltaPosition * touchOrbitSensitivity);

                if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
                {
                    if (AudioManager.ins != null)
                        AudioManager.ins.StopAimHold();
                    isPointerTracking = false;
                    aimTouchId = -1;
                    hasLastMousePosition = false;
                }
            }
            return;
        }

        // Mouse fallback (PC)
        bool overUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject();
        if (Input.GetMouseButtonDown(0) && !overUI)
        {
            isPointerTracking = true;
            hasLastMousePosition = false;
            if (AudioManager.ins != null)
                AudioManager.ins.StartAimHold();
        }

        if (isPointerTracking && Input.GetMouseButton(0))
            ApplyOrbitInput(GetMouseLookDelta());

        if (isPointerTracking && Input.GetMouseButtonUp(0))
        {
            if (AudioManager.ins != null)
                AudioManager.ins.StopAimHold();
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

        gameplayCamera.fieldOfView = Mathf.Lerp(
            gameplayCamera.fieldOfView,
            defaultCameraFieldOfView,
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

    void SpawnProjectile()
    {
        Vector3 spawnPosition = GetProjectileSpawnPosition();
        Vector3 aimPoint = GetAimPointFromScreenCenter(spawnPosition, out RaycastHit aimHit);
        Vector3 projectileDirection = aimPoint - spawnPosition;
        if (projectileDirection.sqrMagnitude <= 0.001f)
        {
            projectileDirection = gameplayCamera != null ? gameplayCamera.transform.forward : transform.forward;
        }
        else
        {
            projectileDirection.Normalize();
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
        Vector3 shotOrigin = GetShotOrigin();
        Vector3 aimPoint = GetAimPointFromScreenCenter(shotOrigin, out RaycastHit aimHit);
        Vector3 aimDirection = aimPoint - shotOrigin;
        if (aimDirection.sqrMagnitude <= 0.001f)
        {
            aimDirection = gameplayCamera != null ? gameplayCamera.transform.forward : transform.forward;
        }

        return new Ray(shotOrigin, aimDirection.normalized);
    }

    Vector3 GetAimPointFromScreenCenter(Vector3 shotOrigin, out RaycastHit validHit)
    {
        validHit = default;
        if (gameplayCamera == null)
        {
            return shotOrigin + transform.forward * aimMissDistance;
        }

        Ray cameraRay = gameplayCamera.ScreenPointToRay(GetAimScreenPosition());
        RaycastHit[] hits = Physics.RaycastAll(cameraRay, aimMissDistance, shotMask, QueryTriggerInteraction.Ignore);
        if (hits.Length > 0)
        {
            Array.Sort(hits, (left, right) => left.distance.CompareTo(right.distance));
            for (int i = 0; i < hits.Length; i++)
            {
                if (IsOwnedCollider(hits[i].collider))
                {
                    continue;
                }

                validHit = hits[i];
                return hits[i].point;
            }
        }

        return cameraRay.origin + cameraRay.direction * aimMissDistance;
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

    Vector3 GetProjectileSpawnPosition()
    {
        if (projectileSpawnPoint != null)
        {
            return projectileSpawnPoint.position;
        }

        Vector3 shotDirection = gameplayCamera != null ? gameplayCamera.transform.forward : transform.forward;
        return GetShotOrigin() + (shotDirection.normalized * projectileSpawnOffset);
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

        return transform.position + Vector3.up * cameraPivotOffset.y;
    }

    bool IsOwnedCollider(Collider targetCollider)
    {
        if (targetCollider == null)
        {
            return false;
        }

        Transform root = transform.root;
        return targetCollider.transform == root || targetCollider.transform.IsChildOf(root);
    }

    bool IsAttachedToGameplayCamera()
    {
        if (gameplayCamera == null)
        {
            return false;
        }

        return transform == gameplayCamera.transform || transform.IsChildOf(gameplayCamera.transform);
    }

    Vector2 GetMouseLookDelta()
    {
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
        return Mathf.Max(0f, attackCooldown);
    }
}
