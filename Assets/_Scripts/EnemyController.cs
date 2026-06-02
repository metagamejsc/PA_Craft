using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class EnemyController : MonoBehaviour
{
    private static readonly List<EnemyController> ActiveEnemies = new List<EnemyController>();
    private static readonly int DeadTriggerHash = Animator.StringToHash("Dead");
    private static readonly int IsMovingBoolHash = Animator.StringToHash("isMoving");

    public float moveSpeed = 2f;
    public Animator animator;

    [Header("Patrol Settings")]
    [Tooltip("Enemy wanders to random points within this radius of its anchor. It never chases or attacks the player.")]
    public float patrolRadius = 3f;
    [Tooltip("Optional anchor the enemy patrols around. Defaults to its spawn position when left empty.")]
    public Transform patrolAnchorOverride;
    [Tooltip("Random idle wait (seconds) after reaching a point before picking the next one.")]
    public Vector2 patrolWaitTime = new Vector2(0.4f, 1.4f);
    [Tooltip("Distance at which the enemy is considered to have reached its patrol point.")]
    public float arriveThreshold = 0.2f;

    public Transform player;
    public PlayerController playerController;
    public bool isDead = false;
    public bool waitForTutorialComplete = true;

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

    private float currentHealth;
    private Vector3 patrolAnchor;
    private Vector3 patrolTarget;
    private float patrolWaitTimer;
    private bool hasPatrolTarget;
    private Camera gameplayCamera;
    private Canvas healthCanvas;
    private RectTransform healthBarFillRect;
    private Tween hitTween;
    private bool isHitReacting;
    private bool hasDeadTrigger;
    private bool hasIsMovingBool;

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

        patrolAnchor = patrolAnchorOverride != null ? patrolAnchorOverride.position : transform.position;
        PickNewPatrolTarget();
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

        UpdateHealthBarTransform();

        if (ShouldWaitForTutorial())
        {
            SetMovingAnimation(false);
            return;
        }

        if (isHitReacting)
        {
            SetMovingAnimation(false);
            return;
        }

        Patrol();
    }

    // Wanders to random points within patrolRadius of the anchor, pausing briefly at
    // each one. The enemy never chases or attacks the player.
    void Patrol()
    {
        if (patrolWaitTimer > 0f)
        {
            patrolWaitTimer -= Time.deltaTime;
            SetMovingAnimation(false);
            return;
        }

        Vector3 moveDirection = patrolTarget - transform.position;
        moveDirection.y = 0f;

        if (!hasPatrolTarget || moveDirection.sqrMagnitude <= arriveThreshold * arriveThreshold)
        {
            PickNewPatrolTarget();
            patrolWaitTimer = Random.Range(patrolWaitTime.x, patrolWaitTime.y);
            SetMovingAnimation(false);
            return;
        }

        SetMovingAnimation(true);
        RotateTowards(moveDirection);
        transform.position += moveDirection.normalized * moveSpeed * Time.deltaTime;
    }

    void PickNewPatrolTarget()
    {
        Vector2 randomOffset = Random.insideUnitCircle * patrolRadius;
        patrolTarget = patrolAnchor + new Vector3(randomOffset.x, 0f, randomOffset.y);
        hasPatrolTarget = true;
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

    public static int AliveCount
    {
        get
        {
            int aliveCount = 0;
            for (int i = 0; i < ActiveEnemies.Count; i++)
            {
                EnemyController enemy = ActiveEnemies[i];
                if (enemy != null && !enemy.isDead)
                {
                    aliveCount++;
                }
            }

            return aliveCount;
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
        animator.Play("metarig|Fall");
        if (LunaManager.ins != null)
        {
            if (!HasOtherAliveEnemies(this) && !EnemySpawner.HasPendingSpawns())
            {
                LunaManager.ins.CheckClickShowEndCard();
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
        hasDeadTrigger = HasAnimatorParameter(DeadTriggerHash, AnimatorControllerParameterType.Trigger);
        hasIsMovingBool = HasAnimatorParameter(IsMovingBoolHash, AnimatorControllerParameterType.Bool);
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
        if (animator == null || !hasIsMovingBool)
        {
            return;
        }

        animator.SetBool(IsMovingBoolHash, isMoving);
    }

    bool ShouldWaitForTutorial()
    {
        return waitForTutorialComplete && !TutorialBuildBlock.IsComplete;
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
}
