using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class EnemyController : MonoBehaviour
{
    private static readonly List<EnemyController> ActiveEnemies = new List<EnemyController>();
    private static readonly int AttackTriggerHash = Animator.StringToHash("Attack");
    private static readonly int DeadTriggerHash = Animator.StringToHash("Dead");
    private static readonly int IdleTriggerHash = Animator.StringToHash("Idle");
    private static readonly int IsMovingBoolHash = Animator.StringToHash("isMoving");

    public float moveSpeed = 2f;
    public float attackDistance = 2f;
    public float attackCooldown = 1.5f;
    public float attackHitDelay = 0.3f;
    public int attackDamage = 1;
    public Animator animator;
    public bool forceAlwaysAnimate = true;
    public string moveAnimationStateName = "animation_mpiglin_move";
    public string attackAnimationStateName = "animation_mpiglin_attack";
    public string deadAnimationStateName = "animation_mpiglin_death";
    public string animatorBaseLayerName = "Base Layer";
    public float deathDestroyDelay = 2f;

    public Transform player;
    public PlayerController playerController;
    public bool isDead = false;
    public bool isAttacking = false;
    public bool canAttack = true;
    public bool isCinematicLocked = false;
    public bool waitForFirstPlayerInput = true;

    [Header("Zigzag Chase")]
    public bool enableZigzagMovement = true;
    public float zigzagWidth = 1.5f;
    public float zigzagFrequency = 2.5f;
    public float zigzagStopDistance = 0.5f;

    [Header("Health Settings")]
    public float maxHealth = 3f;
    public float healthBarHeight = 2.2f;
    public Vector2 healthBarSize = new Vector2(140f, 18f);
    public Color healthBarBackgroundColor = new Color(0.08f, 0.08f, 0.08f, 0.9f);
    public Color healthBarFillColor = new Color(0.27f, 0.85f, 0.16f, 1f);
    public Slider healthSlider;
    public bool hideHealthSliderOnDeath = false;

    [Header("Hit Reaction")]
    public float rotateSpeed = 8f;
    public float hitJumpHeight = 0.45f;
    public float hitJumpDuration = 0.3f;
    public float hitPushbackDistance = 1.1f;

    [Header("Audio")]
    public AudioClip attackSound;
    public AudioClip takeDamageSound;
    public AudioClip deadSound;
    public AudioSource audioSource;
    public float attackSoundVolume = 1f;
    public float takeDamageSoundVolume = 1f;
    public float deadSoundVolume = 1f;

    [Header("Death VFX")]
    public GameObject bloodParticleObject;
    public bool autoFindBloodParticleObject = true;
    public string bloodParticleChildName = "blood";
    public bool playBloodParticlesOnDeath = true;

    private float currentHealth;
    private Camera gameplayCamera;
    private Canvas healthCanvas;
    private RectTransform healthBarFillRect;
    private Tween hitTween;
    private Tween destroyTween;
    private bool isHitReacting;
    private bool hasAttackTrigger;
    private bool hasDeadTrigger;
    private bool hasIdleTrigger;
    private bool hasIsMovingBool;
    private string currentAnimationStateName;
    private bool hasGameplayStarted;

    void OnEnable()
    {
        if (!ActiveEnemies.Contains(this))
        {
            ActiveEnemies.Add(this);
        }
    }

    void OnDisable()
    {
        ActiveEnemies.Remove(this);
        hitTween?.Kill();
        if (!isDead)
        {
            destroyTween?.Kill();
        }
    }

    void Start()
    {
        ResolvePlayer();
        gameplayCamera = Camera.main;
        ApplyLunaSettings();
        UpdateHealthSlider();
        ConfigureAnimatorForRuntime();
        CacheAnimatorParameters();
        hasGameplayStarted = !waitForFirstPlayerInput;
        if (!isDead)
        {
            CreateHealthBar();
            PlayMoveAnimation(true);
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

        ResolvePlayer();
        UpdateHealthBarTransform();

        if (!hasGameplayStarted)
        {
            hasGameplayStarted = HasPrimaryInputStarted();
            SetMovingAnimation(false);
            return;
        }

        if (isCinematicLocked)
        {
            SetMovingAnimation(false);
            return;
        }

        if (player == null || (playerController != null && playerController.IsDead()))
        {
            SetMovingAnimation(false);
            return;
        }

        if (isHitReacting || isAttacking)
        {
            SetMovingAnimation(false);
            return;
        }

        Vector3 targetPosition = playerController != null
            ? playerController.GetCombatTargetPosition()
            : player.position;
        Vector3 directDirection = targetPosition - transform.position;
        directDirection.y = 0f;
        if (directDirection.sqrMagnitude <= attackDistance * attackDistance)
        {
            SetMovingAnimation(false);

            if (canAttack)
            {
                StartCoroutine(AttackPlayer());
            }

            return;
        }

        Vector3 moveDirection = GetChaseDirection(targetPosition, directDirection);
        SetMovingAnimation(true);
        RotateTowards(moveDirection);
        transform.position += moveDirection.normalized * moveSpeed * Time.deltaTime;
    }

    Vector3 GetChaseDirection(Vector3 targetPosition, Vector3 directDirection)
    {
        if (!enableZigzagMovement || directDirection.sqrMagnitude <= 0.001f)
        {
            return directDirection;
        }

        float directDistance = directDirection.magnitude;
        float fadeDistance = Mathf.Max(0.01f, zigzagStopDistance);
        float zigzagStrength = Mathf.Clamp01((directDistance - attackDistance) / fadeDistance);
        Vector3 sideDirection = Vector3.Cross(Vector3.up, directDirection.normalized);
        float sideOffset = Mathf.Sin(Time.time * zigzagFrequency) * Mathf.Max(0f, zigzagWidth) * zigzagStrength;
        Vector3 zigzagTarget = targetPosition + (sideDirection * sideOffset);
        Vector3 zigzagDirection = zigzagTarget - transform.position;
        zigzagDirection.y = 0f;
        return zigzagDirection.sqrMagnitude > 0.001f ? zigzagDirection : directDirection;
    }

    System.Collections.IEnumerator AttackPlayer()
    {
        if (isDead || isAttacking || !canAttack)
        {
            yield break;
        }

        isAttacking = true;
        canAttack = false;
        SetMovingAnimation(false);

        Vector3 attackDirection = GetAttackDirection();
        if (attackDirection.sqrMagnitude > 0.001f)
        {
            RotateTowards(attackDirection);
        }

        PlayAttackAnimation();

        PlayEnemySound(attackSound, attackSoundVolume);

        yield return new WaitForSeconds(attackHitDelay);

        if (!isDead && playerController != null && !playerController.IsDead())
        {
            Vector3 playerDirection = GetAttackDirection();
            playerDirection.y = 0f;
            if (playerDirection.sqrMagnitude <= attackDistance * attackDistance)
            {
                playerController.TakeDamage(attackDamage);
            }
        }

        float remainingCooldown = Mathf.Max(0f, attackCooldown - attackHitDelay);
        if (remainingCooldown > 0f)
        {
            yield return new WaitForSeconds(remainingCooldown);
        }

        isAttacking = false;
        canAttack = true;
        if (!isDead)
        {
            PlayMoveAnimation();
        }
    }

    void ResolvePlayer()
    {
        if (player != null && playerController != null)
        {
            return;
        }

        GameObject playerObject = GameObject.FindGameObjectWithTag("Player");
        if (playerObject == null)
        {
            return;
        }

        player = playerObject.transform;
        playerController = playerObject.GetComponent<PlayerController>();
    }

    void CreateHealthBar()
    {
        GameObject canvasObject = new GameObject("HealthBar");
        canvasObject.transform.SetParent(transform, false);
        canvasObject.transform.localPosition = Vector3.up * healthBarHeight;
        canvasObject.layer = gameObject.layer;

        healthCanvas = canvasObject.AddComponent<Canvas>();
        healthCanvas.renderMode = RenderMode.WorldSpace;
        healthCanvas.sortingOrder = 50;
        CanvasScaler canvasScaler = canvasObject.AddComponent<CanvasScaler>();
        canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ConstantPixelSize;
        canvasScaler.referencePixelsPerUnit = 10f;
        canvasObject.AddComponent<GraphicRaycaster>().enabled = false;

        RectTransform canvasRect = healthCanvas.GetComponent<RectTransform>();
        canvasRect.sizeDelta = healthBarSize;
        canvasRect.localScale = Vector3.one * 0.01f;

        GameObject backgroundObject = new GameObject("Background");
        backgroundObject.transform.SetParent(canvasObject.transform, false);
        RectTransform backgroundRect = backgroundObject.AddComponent<RectTransform>();
        backgroundRect.anchorMin = Vector2.zero;
        backgroundRect.anchorMax = Vector2.one;
        backgroundRect.offsetMin = Vector2.zero;
        backgroundRect.offsetMax = Vector2.zero;

        RawImage backgroundImage = backgroundObject.AddComponent<RawImage>();
        backgroundImage.color = healthBarBackgroundColor;

        GameObject fillObject = new GameObject("Fill");
        fillObject.transform.SetParent(backgroundObject.transform, false);
        healthBarFillRect = fillObject.AddComponent<RectTransform>();
        healthBarFillRect.anchorMin = Vector2.zero;
        healthBarFillRect.anchorMax = Vector2.one;
        healthBarFillRect.offsetMin = Vector2.zero;
        healthBarFillRect.offsetMax = Vector2.zero;
        healthBarFillRect.pivot = new Vector2(0f, 0.5f);

        RawImage fillImage = fillObject.AddComponent<RawImage>();
        fillImage.color = healthBarFillColor;

        UpdateHealthBarFill();
        UpdateHealthSlider();
    }

    void ApplyLunaSettings()
    {
        if (LunaManager.ins != null)
        {
            maxHealth = LunaManager.ins.enemyHealth;
            moveSpeed = LunaManager.ins.enemyMoveSpeed;
            hitPushbackDistance = LunaManager.ins.enemyPushbackDistance;
        }

        currentHealth = maxHealth;
    }

    void UpdateHealthBarTransform()
    {
        if (healthCanvas == null)
        {
            return;
        }

        if (gameplayCamera == null)
        {
            gameplayCamera = Camera.main;
        }

        if (gameplayCamera == null)
        {
            return;
        }

        healthCanvas.transform.rotation = gameplayCamera.transform.rotation;
    }

    void UpdateHealthBarFill()
    {
        if (healthBarFillRect == null)
        {
            return;
        }

        float normalizedHealth = maxHealth <= 0f ? 0f : Mathf.Clamp01(currentHealth / maxHealth);
        healthBarFillRect.localScale = new Vector3(normalizedHealth, 1f, 1f);
    }

    void UpdateHealthSlider()
    {
        if (healthSlider == null)
        {
            return;
        }

        healthSlider.maxValue = maxHealth;
        healthSlider.minValue = 0f;
        healthSlider.value = Mathf.Clamp(currentHealth, 0f, maxHealth);
    }

    void PlayHitReaction(Vector3 hitDirection)
    {
        hitTween?.Kill();
        isHitReacting = true;

        Vector3 pushDirection = hitDirection;
        pushDirection.y = 0f;
        if (pushDirection.sqrMagnitude <= 0.001f)
        {
            pushDirection = -transform.forward;
        }

        Vector3 targetPosition = transform.position + (pushDirection.normalized * hitPushbackDistance);
        hitTween = transform.DOJump(targetPosition, hitJumpHeight, 1, hitJumpDuration)
            .SetEase(Ease.OutQuad)
            .SetLink(gameObject)
            .OnComplete(() => isHitReacting = false)
            .OnKill(() =>
            {
                if (!isDead)
                {
                    isHitReacting = false;
                }
            });
    }

    public void TakeDamage(float amount, Vector3 hitDirection = default)
    {
        if (isDead)
        {
            return;
        }

        currentHealth = Mathf.Max(0f, currentHealth - amount);
        UpdateHealthBarFill();
        UpdateHealthSlider();

        if (currentHealth <= 0f)
        {
            Die();
            return;
        }

        PlayEnemySound(takeDamageSound, takeDamageSoundVolume);
        PlayHitReaction(hitDirection);
    }

    public Vector3 GetAimPoint()
    {
        return transform.position + Vector3.up * healthBarHeight;
    }

    public bool IsDead()
    {
        return isDead;
    }

    public void Die()
    {
        if (isDead)
        {
            return;
        }

        ForceDeadVisual(deadAnimationStateName);
        if (LunaManager.ins != null)
        {
            if (!HasOtherAliveEnemies(this))
            {
                LunaManager.ins.ShowWinCard();
            }
        }

        ScheduleDestroy();
    }

    public void SetCinematicLocked(bool locked)
    {
        isCinematicLocked = locked;
        if (!locked)
        {
            canAttack = true;
            return;
        }

        StopAllCoroutines();
        hitTween?.Kill();
        isHitReacting = false;
        isAttacking = false;
        canAttack = false;
        SetMovingAnimation(false);

        if (animator != null && hasIdleTrigger)
        {
            SetAnimatorTrigger(IdleTriggerHash);
        }
    }

    public void ForceDeadVisual(string deadAnimationStateName = "")
    {
        isDead = true;
        isCinematicLocked = false;
        StopAllCoroutines();
        hitTween?.Kill();
        isHitReacting = false;
        isAttacking = false;
        canAttack = false;
        SetMovingAnimation(false);

        if (healthCanvas != null)
        {
            healthCanvas.gameObject.SetActive(false);
        }

        if (healthSlider != null && hideHealthSliderOnDeath)
        {
            healthSlider.gameObject.SetActive(false);
        }

        PlayEnemySound(deadSound, deadSoundVolume);
        ActivateBloodParticles();
        PlayDeadAnimation(deadAnimationStateName);
    }

    void PlayEnemySound(AudioClip clip, float volume)
    {
        if (clip == null)
        {
            return;
        }

        float finalVolume = Mathf.Clamp01(volume);
        if (audioSource != null)
        {
            audioSource.PlayOneShot(clip, finalVolume);
            return;
        }

        AudioSource.PlayClipAtPoint(clip, transform.position, finalVolume);
    }

    public static EnemyController GetClosestAlive(Vector3 fromPosition)
    {
        EnemyController closestEnemy = null;
        float closestDistance = float.MaxValue;

        for (int i = 0; i < ActiveEnemies.Count; i++)
        {
            EnemyController enemy = ActiveEnemies[i];
            if (enemy == null || enemy.isDead)
            {
                continue;
            }

            float sqrDistance = (enemy.transform.position - fromPosition).sqrMagnitude;
            if (sqrDistance < closestDistance)
            {
                closestDistance = sqrDistance;
                closestEnemy = enemy;
            }
        }

        return closestEnemy;
    }

    public static EnemyController GetClosestAliveToRay(Ray ray, float maxDistanceFromRay, float maxDistanceAlongRay)
    {
        EnemyController closestEnemy = null;
        float closestDistance = maxDistanceFromRay * maxDistanceFromRay;

        for (int i = 0; i < ActiveEnemies.Count; i++)
        {
            EnemyController enemy = ActiveEnemies[i];
            if (enemy == null || enemy.isDead)
            {
                continue;
            }

            Vector3 enemyPoint = enemy.GetAimPoint();
            Vector3 toEnemy = enemyPoint - ray.origin;
            float distanceAlongRay = Vector3.Dot(toEnemy, ray.direction);
            if (distanceAlongRay < 0f || distanceAlongRay > maxDistanceAlongRay)
            {
                continue;
            }

            Vector3 closestPoint = ray.origin + (ray.direction * distanceAlongRay);
            float sqrDistance = (enemyPoint - closestPoint).sqrMagnitude;
            if (sqrDistance < closestDistance)
            {
                closestDistance = sqrDistance;
                closestEnemy = enemy;
            }
        }

        return closestEnemy;
    }

    static bool HasOtherAliveEnemies(EnemyController currentEnemy)
    {
        for (int i = 0; i < ActiveEnemies.Count; i++)
        {
            EnemyController enemy = ActiveEnemies[i];
            if (enemy == null || enemy == currentEnemy || enemy.isDead)
            {
                continue;
            }

            return true;
        }

        return false;
    }

    void CacheAnimatorParameters()
    {
        if (animator == null)
        {
            animator = GetComponentInChildren<Animator>();
        }

        hasAttackTrigger = HasAnimatorParameter(AttackTriggerHash, AnimatorControllerParameterType.Trigger);
        hasDeadTrigger = HasAnimatorParameter(DeadTriggerHash, AnimatorControllerParameterType.Trigger);
        hasIdleTrigger = HasAnimatorParameter(IdleTriggerHash, AnimatorControllerParameterType.Trigger);
        hasIsMovingBool = HasAnimatorParameter(IsMovingBoolHash, AnimatorControllerParameterType.Bool);
    }

    void ConfigureAnimatorForRuntime()
    {
        if (animator == null)
        {
            animator = GetComponentInChildren<Animator>();
        }

        if (animator == null)
        {
            return;
        }

        if (forceAlwaysAnimate)
        {
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        }

        animator.Rebind();
        animator.Update(0f);
    }

    bool HasAnimatorParameter(int parameterHash, AnimatorControllerParameterType parameterType)
    {
        if (animator == null)
        {
            return false;
        }

        AnimatorControllerParameter[] parameters = animator.parameters;
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
        if (animator == null)
        {
            return;
        }

        if (hasIsMovingBool)
        {
            animator.SetBool(IsMovingBoolHash, isMoving);
            return;
        }

        if (isMoving)
        {
            PlayMoveAnimation();
        }
    }

    void ScheduleDestroy()
    {
        float delay = Mathf.Max(0f, deathDestroyDelay);
        destroyTween?.Kill();
        destroyTween = DOVirtual.DelayedCall(delay, () =>
            {
                if (this != null && gameObject != null)
                {
                    Destroy(gameObject);
                }
            })
            .SetUpdate(true);
    }

    void PlayMoveAnimation(bool restart = false)
    {
        PlayAnimationState(moveAnimationStateName, restart);
    }

    void PlayAttackAnimation()
    {
        if (!string.IsNullOrEmpty(attackAnimationStateName))
        {
            PlayAnimationState(attackAnimationStateName, true);
            return;
        }

        if (hasAttackTrigger)
        {
            SetAnimatorTrigger(AttackTriggerHash);
        }
    }

    void PlayDeadAnimation(string targetDeadAnimationStateName)
    {
        if (animator == null)
        {
            return;
        }

        if (!string.IsNullOrEmpty(targetDeadAnimationStateName))
        {
            PlayAnimationState(targetDeadAnimationStateName, true);
            return;
        }

        if (hasDeadTrigger)
        {
            SetAnimatorTrigger(DeadTriggerHash);
        }
    }

    void PlayAnimationState(string stateName, bool restart = false)
    {
        if (animator == null || string.IsNullOrEmpty(stateName))
        {
            return;
        }

        if (!restart && currentAnimationStateName == stateName)
        {
            return;
        }

        currentAnimationStateName = stateName;
        string fullStateName = string.IsNullOrEmpty(animatorBaseLayerName)
            ? stateName
            : animatorBaseLayerName + "." + stateName;

        animator.Play(fullStateName, 0, 0f);
        animator.Update(0f);
    }

    void SetAnimatorTrigger(int triggerHash)
    {
        if (animator == null)
        {
            return;
        }

        if (hasAttackTrigger)
        {
            animator.ResetTrigger(AttackTriggerHash);
        }

        if (hasDeadTrigger)
        {
            animator.ResetTrigger(DeadTriggerHash);
        }

        if (hasIdleTrigger)
        {
            animator.ResetTrigger(IdleTriggerHash);
        }

        animator.SetTrigger(triggerHash);
    }

    void ActivateBloodParticles()
    {
        GameObject bloodObject = GetBloodParticleObject();
        if (bloodObject == null)
        {
            return;
        }

        bloodObject.SetActive(true);

        if (!playBloodParticlesOnDeath)
        {
            return;
        }

        ParticleSystem[] particles = bloodObject.GetComponentsInChildren<ParticleSystem>(true);
        for (int i = 0; i < particles.Length; i++)
        {
            if (particles[i] != null)
            {
                particles[i].Play(true);
            }
        }
    }

    GameObject GetBloodParticleObject()
    {
        if (bloodParticleObject != null)
        {
            return bloodParticleObject;
        }

        if (!autoFindBloodParticleObject || string.IsNullOrEmpty(bloodParticleChildName))
        {
            return null;
        }

        Transform[] childTransforms = GetComponentsInChildren<Transform>(true);
        for (int i = 0; i < childTransforms.Length; i++)
        {
            Transform child = childTransforms[i];
            if (child == null || child == transform)
            {
                continue;
            }

            if (child.name.IndexOf(bloodParticleChildName, System.StringComparison.OrdinalIgnoreCase) >= 0)
            {
                bloodParticleObject = child.gameObject;
                return bloodParticleObject;
            }
        }

        return null;
    }

    Vector3 GetAttackDirection()
    {
        if (playerController != null)
        {
            return playerController.GetCombatTargetPosition() - transform.position;
        }

        if (player != null)
        {
            return player.position - transform.position;
        }

        return Vector3.zero;
    }

    void RotateTowards(Vector3 direction)
    {
        direction.y = 0f;
        if (direction.sqrMagnitude <= 0.001f)
        {
            return;
        }

        Quaternion targetRotation = Quaternion.LookRotation(direction.normalized);
        transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotateSpeed * Time.deltaTime);
    }

    bool HasPrimaryInputStarted()
    {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            return touch.phase == TouchPhase.Began;
        }

        return Input.GetMouseButtonDown(0);
    }
}
