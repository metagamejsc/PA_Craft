using System.Collections.Generic;
using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class EnemyController : MonoBehaviour
{
    private static readonly List<EnemyController> ActiveEnemies = new List<EnemyController>();
    private static readonly int AttackTriggerHash = Animator.StringToHash("Attack");
    private static readonly int DeadTriggerHash = Animator.StringToHash("Dead");
    private static readonly int IsMovingBoolHash = Animator.StringToHash("isMoving");

    public float moveSpeed = 2f;
    public float attackDistance = 2f;
    public float attackCooldown = 1.5f;
    public float attackHitDelay = 0.3f;
    public int attackDamage = 1;
    public Animator animator;
    public Animator animator2;

    [Header("Animation States")]
    public string attackStateName = "metarig_Zombie_Attack";
    public string[] attackStateFallbackNames = { "metarig|Build", "metarig|Build1", "metarig|Character_Attack", "Attack_Gun" };
    public string deadStateName = "metarig|Fall";
    public string[] deadStateFallbackNames = { "Armature|Falling Idle", "Falling Idle" };
    public bool playAttackStateDirectly = true;
    public bool playDeadStateDirectly = true;
    public float minimumAttackAnimationTime = 0.45f;

    public Transform player;
    public PlayerController playerController;
    public bool isDead = false;
    public bool isAttacking = false;
    public bool canAttack = true;

    [Header("Health Settings")]
    public float maxHealth = 3f;
    public float healthBarHeight = 2.2f;
    public Vector2 healthBarSize = new Vector2(140f, 18f);
    public Color healthBarBackgroundColor = new Color(0.08f, 0.08f, 0.08f, 0.9f);
    public Color healthBarFillColor = new Color(0.27f, 0.85f, 0.16f, 1f);

    [Header("Enemy AI")]
    public float detectRadius = 8f;
    public float roamRadius = 4f;
    public float roamPointReachDistance = 0.35f;
    public float roamPointInterval = 2f;
    public LayerMask groundMask = ~0;
    public float groundRayHeight = 10f;

    [Header("Sounds")]
    public AudioClip deadSound;
    public List<AudioClip> idleSounds = new List<AudioClip>();
    public List<AudioClip> moveSounds = new List<AudioClip>();
    public List<AudioClip> takeDamageSounds = new List<AudioClip>();
    public List<AudioClip> attackSounds = new List<AudioClip>();
    public List<AudioClip> deadSounds = new List<AudioClip>();
    public float idleSoundInterval = 4f;
    public float moveSoundInterval = 0.65f;

    [Header("Hit Reaction")]
    public float rotateSpeed = 8f;
    public float hitJumpHeight = 0.45f;
    public float hitJumpDuration = 0.3f;
    public float hitPushbackDistance = 1.1f;

    private float currentHealth;
    private Camera gameplayCamera;
    private Canvas healthCanvas;
    private RectTransform healthBarFillRect;
    private Tween hitTween;
    private bool isHitReacting;
    private bool hasAttackTrigger;
    private bool hasAttackTrigger2;
    private bool hasDeadTrigger;
    private bool hasDeadTrigger2;
    private bool hasIsMovingBool;
    private bool hasIsMovingBool2;
    private Vector3 spawnPosition;
    private Vector3 roamTargetPosition;
    private float nextRoamPointTime;
    private float nextIdleSoundTime;
    private float nextMoveSoundTime;
    private EnemyController combatTarget;

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
    }

    void Start()
    {
        ResolvePlayer();
        spawnPosition = transform.position;
        roamTargetPosition = spawnPosition;
        PickNewRoamTarget();
        gameplayCamera = Camera.main;
        ApplyLunaSettings();
        CacheAnimatorParameters();
        CreateHealthBar();
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

        PlayIdleSoundIfReady();
        UpdateHealthBarTransform();

        if (isHitReacting || isAttacking)
        {
            SetMovingAnimation(false);
            return;
        }

        combatTarget = GetClosestAliveEnemyInRange(transform.position, detectRadius, this);
        if (combatTarget != null)
        {
            HandleCombatTarget(combatTarget);
            return;
        }

        HandleRoam();
    }

    void HandleCombatTarget(EnemyController target)
    {
        if (target == null || target.isDead)
        {
            SetMovingAnimation(false);
            return;
        }

        Vector3 moveDirection = target.transform.position - transform.position;
        moveDirection.y = 0f;
        if (moveDirection.sqrMagnitude <= attackDistance * attackDistance)
        {
            SetMovingAnimation(false);

            if (canAttack)
            {
                StartCoroutine(AttackEnemy(target));
            }

            return;
        }

        SetMovingAnimation(true);
        PlayMoveSoundIfReady();
        RotateTowards(moveDirection);
        transform.position += moveDirection.normalized * moveSpeed * Time.deltaTime;
    }

    void HandleRoam()
    {
        Vector3 moveDirection = roamTargetPosition - transform.position;
        moveDirection.y = 0f;

        if (moveDirection.sqrMagnitude <= roamPointReachDistance * roamPointReachDistance || Time.time >= nextRoamPointTime)
        {
            PickNewRoamTarget();
            moveDirection = roamTargetPosition - transform.position;
            moveDirection.y = 0f;
        }

        if (moveDirection.sqrMagnitude <= 0.001f)
        {
            SetMovingAnimation(false);
            return;
        }

        SetMovingAnimation(true);
        PlayMoveSoundIfReady();
        RotateTowards(moveDirection);
        transform.position += moveDirection.normalized * moveSpeed * Time.deltaTime;
    }

    void PickNewRoamTarget()
    {
        Vector2 randomCircle = Random.insideUnitCircle * Mathf.Max(0.1f, roamRadius);
        Vector3 targetPosition = spawnPosition + new Vector3(randomCircle.x, 0f, randomCircle.y);
        roamTargetPosition = ProjectToGround(targetPosition, spawnPosition.y);
        nextRoamPointTime = Time.time + Mathf.Max(0.2f, roamPointInterval);
    }

    Vector3 ProjectToGround(Vector3 position, float fallbackY)
    {
        Vector3 rayOrigin = position + Vector3.up * groundRayHeight;
        if (Physics.Raycast(rayOrigin, Vector3.down, out RaycastHit hit, groundRayHeight * 2f, groundMask, QueryTriggerInteraction.Ignore))
        {
            position.y = hit.point.y;
            return position;
        }

        position.y = fallbackY;
        return position;
    }

    IEnumerator AttackEnemy(EnemyController target)
    {
        if (isDead || isAttacking || !canAttack)
        {
            yield break;
        }

        isAttacking = true;
        canAttack = false;
        SetMovingAnimation(false);

        Vector3 attackDirection = target != null ? target.transform.position - transform.position : Vector3.zero;
        if (attackDirection.sqrMagnitude > 0.001f)
        {
            RotateTowards(attackDirection);
        }

        SetAttackAnimation();
        PlayRandomSound(attackSounds);

        float hitDelay = Mathf.Max(0f, attackHitDelay);
        if (hitDelay > 0f)
        {
            yield return new WaitForSeconds(hitDelay);
        }

        if (!isDead && target != null && !target.isDead)
        {
            Vector3 targetDirection = target.transform.position - transform.position;
            targetDirection.y = 0f;
            if (targetDirection.sqrMagnitude <= attackDistance * attackDistance)
            {
                target.TakeDamage(attackDamage, targetDirection.normalized);
            }
        }

        float remainingAttackAnimationTime = Mathf.Max(0f, minimumAttackAnimationTime - hitDelay);
        if (remainingAttackAnimationTime > 0f)
        {
            yield return new WaitForSeconds(remainingAttackAnimationTime);
        }

        float remainingCooldown = Mathf.Max(0f, attackCooldown - Mathf.Max(hitDelay, minimumAttackAnimationTime));
        if (remainingCooldown > 0f)
        {
            yield return new WaitForSeconds(remainingCooldown);
        }

        isAttacking = false;
        canAttack = true;
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
        PlayRandomSound(takeDamageSounds);
        PlayHitReaction(hitDirection);

        if (currentHealth <= 0f)
        {
            Die();
        }
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

        isDead = true;
        StopAllCoroutines();
        hitTween?.Kill();
        isHitReacting = false;
        isAttacking = false;
        canAttack = false;
        //SetMovingAnimation(false);

        if (healthCanvas != null)
        {
            healthCanvas.gameObject.SetActive(false);
        }

        /*if (animator != null && hasDeadTrigger)
        {
            //animator.SetTrigger(DeadTriggerHash);
            animator.Play("metarig|Fall");
        }*/
        if (!PlayRandomSound(deadSounds) && deadSound != null && AudioManager.ins != null)
        {
            AudioManager.ins.PlaySound(deadSound);
        }

        PlayDeadAnimation();
        if (LunaManager.ins != null)
        {
            LunaManager.ins.RegisterEnemyKill();
            if (!HasOtherAliveEnemies(this))
            {
                LunaManager.ins.ShowWinCard();
            }
        }

        Destroy(gameObject, 2f);
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

    public static EnemyController GetClosestAliveEnemyInRange(Vector3 fromPosition, float range, EnemyController excludedEnemy)
    {
        EnemyController closestEnemy = null;
        float closestDistance = range * range;

        for (int i = 0; i < ActiveEnemies.Count; i++)
        {
            EnemyController enemy = ActiveEnemies[i];
            if (enemy == null || enemy == excludedEnemy || enemy.isDead)
            {
                continue;
            }

            float sqrDistance = (enemy.transform.position - fromPosition).sqrMagnitude;
            if (sqrDistance <= closestDistance)
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
        // Force animators to always sample. In WebGL/IL2CPP builds a culled animator
        // can silently skip the attack state even though the gameplay logic still runs.
        if (animator != null)
        {
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        }
        if (animator2 != null)
        {
            animator2.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        }

        hasAttackTrigger = HasAnimatorParameter(animator, AttackTriggerHash, AnimatorControllerParameterType.Trigger);
        hasAttackTrigger2 = HasAnimatorParameter(animator2, AttackTriggerHash, AnimatorControllerParameterType.Trigger);
        hasDeadTrigger = HasAnimatorParameter(animator, DeadTriggerHash, AnimatorControllerParameterType.Trigger);
        hasDeadTrigger2 = HasAnimatorParameter(animator2, DeadTriggerHash, AnimatorControllerParameterType.Trigger);
        hasIsMovingBool = HasAnimatorParameter(animator, IsMovingBoolHash, AnimatorControllerParameterType.Bool);
        hasIsMovingBool2 = HasAnimatorParameter(animator2, IsMovingBoolHash, AnimatorControllerParameterType.Bool);
    }

    bool HasAnimatorParameter(Animator targetAnimator, int parameterHash, AnimatorControllerParameterType parameterType)
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

    void SetAttackAnimation()
    {
        PlayAttackAnimation(animator, hasIsMovingBool);
        PlayAttackAnimation(animator2, hasIsMovingBool2);
    }

    void PlayDeadAnimation()
    {
        PlayDeadAnimation(animator, hasAttackTrigger, hasDeadTrigger, hasIsMovingBool);
        PlayDeadAnimation(animator2, hasAttackTrigger2, hasDeadTrigger2, hasIsMovingBool2);
    }

    void PlayAttackAnimation(Animator targetAnimator, bool hasMoving)
    {
        if (targetAnimator == null)
        {
            return;
        }

        if (hasMoving)
        {
            targetAnimator.SetBool(IsMovingBoolHash, false);
        }

        if (!string.IsNullOrEmpty(attackStateName))
        {
            targetAnimator.Play(attackStateName, 0, 0f);
            targetAnimator.Update(0f);
        }
    }

    void PlayDeadAnimation(Animator targetAnimator, bool hasAttack, bool hasDead, bool hasMoving)
    {
        if (targetAnimator == null)
        {
            return;
        }

        if (hasAttack)
        {
            targetAnimator.ResetTrigger(AttackTriggerHash);
        }

        if (hasMoving)
        {
            targetAnimator.SetBool(IsMovingBoolHash, false);
        }

        if (hasDead)
        {
            targetAnimator.SetTrigger(DeadTriggerHash);
        }

        if (playDeadStateDirectly && PlayFirstAvailableAnimatorState(targetAnimator, deadStateName, deadStateFallbackNames) <= 0f)
        {
            targetAnimator.Play(deadStateName, 0, 0f);
        }
    }

    float PlayFirstAvailableAnimatorState(Animator targetAnimator, string primaryStateName, string[] fallbackStateNames)
    {
        if (TryPlayAnimatorState(targetAnimator, primaryStateName, out float stateLength))
        {
            return stateLength;
        }

        if (fallbackStateNames == null)
        {
            return 0f;
        }

        for (int i = 0; i < fallbackStateNames.Length; i++)
        {
            if (TryPlayAnimatorState(targetAnimator, fallbackStateNames[i], out stateLength))
            {
                return stateLength;
            }
        }

        return 0f;
    }

    bool TryPlayAnimatorState(Animator targetAnimator, string stateName, out float stateLength)
    {
        stateLength = 0f;

        if (targetAnimator == null || string.IsNullOrEmpty(stateName))
        {
            return false;
        }

        int stateHash = Animator.StringToHash(stateName);
        int fullPathHash = Animator.StringToHash("Base Layer." + stateName);
        int playableHash = 0;

        if (targetAnimator.HasState(0, fullPathHash))
        {
            playableHash = fullPathHash;
        }
        else if (targetAnimator.HasState(0, stateHash))
        {
            playableHash = stateHash;
        }
        else
        {
            return false;
        }

        // Use CrossFadeInFixedTime instead of Play + manual Animator.Update(0f).
        // Pumping the animator by hand commits the deltaTime-0 update for this frame,
        // which makes the engine skip its own animation pass in IL2CPP/WebGL builds and
        // the freshly started attack state never gets sampled. Letting the engine drive
        // the cross-fade plays reliably across Editor and build targets.
        targetAnimator.CrossFadeInFixedTime(playableHash, 0.05f, 0, 0f);
        stateLength = GetClipLength(targetAnimator, stateName);
        return true;
    }

    float GetClipLength(Animator targetAnimator, string stateName)
    {
        if (targetAnimator != null && targetAnimator.runtimeAnimatorController != null)
        {
            AnimationClip[] clips = targetAnimator.runtimeAnimatorController.animationClips;
            for (int i = 0; i < clips.Length; i++)
            {
                if (clips[i] != null && clips[i].name == stateName && clips[i].length > 0f)
                {
                    return clips[i].length;
                }
            }
        }

        return minimumAttackAnimationTime;
    }

    void SetMovingAnimation(bool isMoving)
    {
        if (animator != null && hasIsMovingBool)
        {
            animator.SetBool(IsMovingBoolHash, isMoving);
        }

        if (animator2 != null && hasIsMovingBool2)
        {
            animator2.SetBool(IsMovingBoolHash, isMoving);
        }
    }

    void PlayIdleSoundIfReady()
    {
        if (idleSounds == null || idleSounds.Count == 0 || Time.time < nextIdleSoundTime)
        {
            return;
        }

        if (PlayRandomSound(idleSounds))
        {
            nextIdleSoundTime = Time.time + Mathf.Max(0.1f, idleSoundInterval);
        }
    }

    void PlayMoveSoundIfReady()
    {
        if (moveSounds == null || moveSounds.Count == 0 || Time.time < nextMoveSoundTime)
        {
            return;
        }

        if (PlayRandomSound(moveSounds))
        {
            nextMoveSoundTime = Time.time + Mathf.Max(0.1f, moveSoundInterval);
        }
    }

    bool PlayRandomSound(List<AudioClip> clips)
    {
        if (clips == null || clips.Count == 0 || AudioManager.ins == null)
        {
            return false;
        }

        AudioClip clip = clips[Random.Range(0, clips.Count)];
        if (clip == null)
        {
            return false;
        }

        AudioManager.ins.PlaySound(clip);
        return true;
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

    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, detectRadius);
        Gizmos.color = Color.cyan;
        Vector3 center = Application.isPlaying ? spawnPosition : transform.position;
        Gizmos.DrawWireSphere(center, roamRadius);
    }
}
