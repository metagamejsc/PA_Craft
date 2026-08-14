using System.Collections.Generic;
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
    public bool canTriggerZoom = true;
    public Animator animator;

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

    [Header("Hit Reaction")]
    public float rotateSpeed = 8f;
    public float hitJumpHeight = 0.45f;
    public float hitJumpDuration = 0.3f;
    public float hitPushbackDistance = 1.1f;

    [Header("Patrol Settings")]
    public float patrolRadius = 4f;
    public float minPatrolDistance = 1.2f;
    public float patrolIdleTimeMin = 0.8f;
    public float patrolIdleTimeMax = 1.6f;
    public float patrolArrivalDistance = 0.15f;

    private float currentHealth;
    private Camera gameplayCamera;
    private Canvas healthCanvas;
    private RectTransform healthBarFillRect;
    private Tween hitTween;
    private bool isHitReacting;
    private bool hasAttackTrigger;
    private bool hasDeadTrigger;
    private bool hasIsMovingBool;
    private bool animatorParametersCached;
    private Vector3 patrolCenter;
    private Vector3 patrolDestination;
    private float patrolIdleTimer;
    private bool isPatrolWaiting;
    private bool isAimLocked;
    private Transform aimLookTarget;

    void Awake()
    {
        ResolveAnimator();
    }

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
        gameplayCamera = Camera.main;
        ApplyLunaSettings();
        CacheAnimatorParameters();
        CreateHealthBar();
        patrolCenter = transform.position;
        ChooseNextPatrolDestination();
    }

    void Update()
    {
        if (isDead)
        {
            return;
        }

        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            SetMovingAnimation(false);
            return;
        }

        ResolvePlayer();
        UpdateHealthBarTransform();

        if (isAimLocked)
        {
            SetMovingAnimation(false);
            RotateTowardsAimTarget();
            return;
        }

        if (player == null || (playerController != null && playerController.IsDead()))
        {
            SetMovingAnimation(UpdatePatrol());
            return;
        }

        if (isHitReacting || isAttacking)
        {
            SetMovingAnimation(false);
            return;
        }

        Vector3 attackDirection = GetAttackDirection();
        attackDirection.y = 0f;
        if (attackDirection.sqrMagnitude <= attackDistance * attackDistance)
        {
            SetMovingAnimation(false);
            RotateTowards(attackDirection);

            if (canAttack)
            {
                StartCoroutine(AttackPlayer());
            }

            return;
        }

        SetMovingAnimation(UpdatePatrol());
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

        if (animator != null && hasAttackTrigger)
        {
            animator.SetTrigger(AttackTriggerHash);
        }

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

    bool UpdatePatrol()
    {
        if (patrolRadius <= 0.01f)
        {
            return false;
        }

        if (isPatrolWaiting)
        {
            patrolIdleTimer -= Time.deltaTime;
            if (patrolIdleTimer <= 0f)
            {
                ChooseNextPatrolDestination();
            }

            return false;
        }

        Vector3 targetPosition = patrolDestination;
        targetPosition.y = transform.position.y;

        Vector3 moveDirection = targetPosition - transform.position;
        moveDirection.y = 0f;
        if (moveDirection.sqrMagnitude <= patrolArrivalDistance * patrolArrivalDistance)
        {
            transform.position = targetPosition;
            BeginPatrolIdle();
            return false;
        }

        RotateTowards(moveDirection);
        transform.position = Vector3.MoveTowards(transform.position, targetPosition, moveSpeed * Time.deltaTime);
        return true;
    }

    void BeginPatrolIdle()
    {
        isPatrolWaiting = true;

        float minIdleTime = Mathf.Min(patrolIdleTimeMin, patrolIdleTimeMax);
        float maxIdleTime = Mathf.Max(patrolIdleTimeMin, patrolIdleTimeMax);
        patrolIdleTimer = Random.Range(minIdleTime, maxIdleTime);
    }

    void ChooseNextPatrolDestination()
    {
        isPatrolWaiting = false;

        Vector3 fallbackDestination = patrolCenter;
        fallbackDestination.y = transform.position.y;
        patrolDestination = fallbackDestination;

        float desiredMinDistance = Mathf.Clamp(minPatrolDistance, 0f, patrolRadius);
        float minDistanceSqr = desiredMinDistance * desiredMinDistance;

        for (int i = 0; i < 8; i++)
        {
            Vector2 randomOffset = Random.insideUnitCircle * patrolRadius;
            Vector3 candidate = patrolCenter + new Vector3(randomOffset.x, 0f, randomOffset.y);
            if ((candidate - transform.position).sqrMagnitude < minDistanceSqr)
            {
                continue;
            }

            patrolDestination = candidate;
            patrolDestination.y = transform.position.y;
            return;
        }
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

    public bool CanTriggerZoom()
    {
        return canTriggerZoom && !isDead;
    }

    public void SetAimLocked(bool locked, Transform lookTarget = null)
    {
        isAimLocked = locked && !isDead;
        aimLookTarget = isAimLocked ? lookTarget : null;

        if (isAimLocked)
        {
            SetMovingAnimation(false);
        }
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
        isAimLocked = false;
        aimLookTarget = null;
        canAttack = false;
        SetMovingAnimation(false);

        if (healthCanvas != null)
        {
            healthCanvas.gameObject.SetActive(false);
        }

        /*if (animator != null && hasDeadTrigger)
        {
            //animator.SetTrigger(DeadTriggerHash);
            animator.Play("metarig|Fall");
        }*/
        animator.Play("metarig|Fall");
        if (LunaManager.ins != null)
        {
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

    public static void GetAliveEnemies(List<EnemyController> results)
    {
        if (results == null)
        {
            return;
        }

        results.Clear();
        for (int i = 0; i < ActiveEnemies.Count; i++)
        {
            EnemyController enemy = ActiveEnemies[i];
            if (enemy == null || enemy.isDead)
            {
                continue;
            }

            results.Add(enemy);
        }
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
        ResolveAnimator();
        if (animator == null)
        {
            animatorParametersCached = false;
            return;
        }

        hasAttackTrigger = HasAnimatorParameter(AttackTriggerHash, AnimatorControllerParameterType.Trigger);
        hasDeadTrigger = HasAnimatorParameter(DeadTriggerHash, AnimatorControllerParameterType.Trigger);
        hasIsMovingBool = HasAnimatorParameter(IsMovingBoolHash, AnimatorControllerParameterType.Bool);
        animatorParametersCached = true;
    }

    void ResolveAnimator()
    {
        if (animator != null)
        {
            return;
        }

        Animator resolvedAnimator = GetComponent<Animator>();
        if (resolvedAnimator == null)
        {
            resolvedAnimator = GetComponentInChildren<Animator>();
        }

        if (resolvedAnimator != null)
        {
            animator = resolvedAnimator;
            animatorParametersCached = false;
        }
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
            ResolveAnimator();
        }

        if (!animatorParametersCached)
        {
            CacheAnimatorParameters();
        }

        if (animator == null || !hasIsMovingBool)
        {
            return;
        }

        animator.SetBool(IsMovingBoolHash, isMoving);
    }

    Vector3 GetAttackDirection()
    {
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

    void RotateTowardsAimTarget()
    {
        if (aimLookTarget == null)
        {
            return;
        }

        RotateTowards(aimLookTarget.position - transform.position);
    }
}
