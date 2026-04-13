using UnityEngine;
using UnityEngine.Serialization;
using Random = UnityEngine.Random;

public class EnemyAgent : DamageableTarget
{
    private enum CombatAnimationState
    {
        Idle,
        Move,
        Attack,
        Dead
    }

    [Header("References")]
    [SerializeField] private Transform bodyRoot;
    [SerializeField] private Animator animator;
    [SerializeField] private Transform firePoint;

    [Header("Objective UI")]
    [SerializeField] private string displayName = "Zombie";
    [SerializeField] private int objectivePriority;
    [SerializeField] private float indicatorHeight = 0.45f;

    [Header("Audio")]
    [SerializeField] private AudioClip deathSoundOverride;

    [Header("Idle Patrol")]
    [SerializeField] private bool patrolWhenIdle = true;
    [SerializeField] private Transform patrolPointA;
    [SerializeField] private Transform patrolPointB;
    [SerializeField] private Vector3 localPatrolPointA = new Vector3(-2f, 0f, 0f);
    [SerializeField] private Vector3 localPatrolPointB = new Vector3(2f, 0f, 0f);
    [SerializeField] private float moveSpeed = 1.5f;
    [SerializeField] private float arriveDistance = 0.15f;
    [SerializeField] private float turnSpeed = 8f;
    [SerializeField] private float modelYawOffset;

    [Header("Alert Attack")]
    [SerializeField] private bool alertOnSpawn;
    [SerializeField] private float fireRange = 20f;
    [SerializeField] private int fireDamage = 1;
    [SerializeField] private float minFireInterval = 1.2f;
    [SerializeField] private float maxFireInterval = 2.8f;
    [SerializeField] private LayerMask lineOfSightMask = Physics.DefaultRaycastLayers;

    [Header("Projectile")]
    [SerializeField] private GameObject bulletPrefab;
    [SerializeField] private float bulletSpeed = 22f;
    [SerializeField] private float bulletLifetime = 3f;
    [SerializeField] private float bulletHitRadius = 0.2f;
    [SerializeField] private Vector3 bulletScale = new Vector3(0.11f, 0.11f, 0.11f);
    [SerializeField] private Color bulletColor = new Color(1f, 0.4f, 0.2f, 1f);

    [Header("Animator Parameters")]
    [SerializeField] private string moveBoolName = "isMoving";
    [SerializeField] private bool useIdleTrigger;
    [SerializeField] private string idleTriggerName = "Idle";
    [FormerlySerializedAs("fireTriggerName")]
    [SerializeField] private string attackTriggerName = "Attack";
    [SerializeField] private string deadTriggerName = "Dead";

    [Header("Animator Options")]
    [SerializeField] private bool forceStableAnimatorSettings = true;
    [SerializeField] private float fireAnimationDuration = 0.35f;

    [Header("Clip Sampling")]
    [FormerlySerializedAs("useClipPlayableFallback")]
    [SerializeField] private bool useClipSampling = true;
    [SerializeField] private bool disableAnimatorWhileSampling = true;
    [FormerlySerializedAs("idleClipName")]
    [SerializeField] private string idleAnimationClipName = "metarig|Idle";
    [FormerlySerializedAs("moveClipName")]
    [SerializeField] private string moveAnimationClipName = "metarig|Walk";
    [FormerlySerializedAs("attackClipName")]
    [SerializeField] private string attackAnimationClipName = "metarig|Attack_Gun";
    [FormerlySerializedAs("deadClipName")]
    [SerializeField] private string deadAnimationClipName = "metarig|Die";

    private bool isAlerted;
    private bool patrolForward = true;
    private float nextFireTime;
    private float actionLockUntil;
    private Vector3 spawnPosition;
    private CombatAnimationState currentAnimationState = CombatAnimationState.Idle;
    private int moveBoolHash;
    private int idleTriggerHash;
    private int attackTriggerHash;
    private int deadTriggerHash;
    private AnimationClip[] availableClips;
    private AnimationClip activeSampleClip;
    private float activeSampleTime;
    private bool activeSampleLoop;

    public string DisplayName => string.IsNullOrWhiteSpace(displayName) ? gameObject.name : displayName;
    public int ObjectivePriority => objectivePriority;
    public Vector3 IndicatorWorldPosition => GetIndicatorWorldPosition(indicatorHeight);

    protected override void Awake()
    {
        base.Awake();

        spawnPosition = transform.position;
        if (bodyRoot == null)
        {
            bodyRoot = transform;
        }

        if (animator == null)
        {
            animator = GetComponentInChildren<Animator>();
        }

        CacheAnimatorParameters();
        CacheAnimatorClips();

        if (animator != null && forceStableAnimatorSettings)
        {
            animator.applyRootMotion = false;
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            animator.updateMode = AnimatorUpdateMode.Normal;
        }

        if (firePoint == null)
        {
            firePoint = bodyRoot;
        }

        ScheduleNextFire(0.35f);
    }

    private void OnEnable()
    {
        EnemyAlertSystem.PlayerShotFired += OnPlayerShotFired;
    }

    private void Start()
    {
        if (alertOnSpawn)
        {
            EnterAlertState();
        }
        else
        {
            SetIdleAnimation(true);
        }
    }

    private void OnDisable()
    {
        EnemyAlertSystem.PlayerShotFired -= OnPlayerShotFired;
    }

    private void LateUpdate()
    {
        UpdateSampledClip();
    }

    private void Update()
    {
        if (IsDead)
        {
            return;
        }

        if (isAlerted)
        {
            UpdateAlertState();
        }
        else
        {
            UpdateIdleState();
        }
    }

    protected override void OnDamaged(int damage, Vector3 hitPoint, Vector3 hitDirection, Transform attacker)
    {
        EnterAlertState();
    }

    protected override void OnDeath(Transform attacker)
    {
        isAlerted = false;
        actionLockUntil = float.MaxValue;

        if (animator != null)
        {
            animator.applyRootMotion = false;
        }

        if (AudioManager.ins != null)
        {
            if (deathSoundOverride != null)
            {
                AudioManager.ins.PlaySound(deathSoundOverride);
            }
            else
            {
                AudioManager.ins.PlaySoundEnemyDeath();
            }
        }

        SetDeadAnimation(true);
        TryShowEndCardIfAllEnemiesDead();
    }

    private void TryShowEndCardIfAllEnemiesDead()
    {
        if (LunaManager.ins == null)
        {
            return;
        }

        EnemyAgent[] enemies = FindObjectsOfType<EnemyAgent>();
        if (enemies == null || enemies.Length == 0)
        {
            return;
        }

        for (int i = 0; i < enemies.Length; i++)
        {
            EnemyAgent enemy = enemies[i];
            if (enemy != null && !enemy.IsDead)
            {
                return;
            }
        }

        LunaManager.ins.ShowEndCard();
    }

    private void UpdateIdleState()
    {
        if (!patrolWhenIdle)
        {
            SetIdleAnimation();
            return;
        }

        Vector3 targetPoint = GetCurrentPatrolPoint();
        Vector3 moveDirection = targetPoint - transform.position;
        moveDirection.y = 0f;

        if (moveDirection.sqrMagnitude <= arriveDistance * arriveDistance)
        {
            patrolForward = !patrolForward;
            SetIdleAnimation();
            return;
        }

        transform.position += moveDirection.normalized * moveSpeed * Time.deltaTime;
        RotateTowards(transform.position + moveDirection);
        SetMoveAnimation();
    }

    private void UpdateAlertState()
    {
        CameraDragRotate player = CameraDragRotate.ActiveController;
        if (player == null || player.IsDead)
        {
            SetIdleAnimation();
            return;
        }

        Vector3 targetPoint = player.GetAimTargetPosition();
        RotateTowards(targetPoint);

        if (Time.time < actionLockUntil)
        {
            return;
        }

        SetIdleAnimation();

        if (Vector3.Distance(GetFireOrigin(), targetPoint) > fireRange || Time.time < nextFireTime)
        {
            return;
        }

        if (!HasLineOfSight(targetPoint))
        {
            ScheduleNextFire(0.5f);
            return;
        }

        FireAtPlayer(player, targetPoint);
    }

    private void FireAtPlayer(CameraDragRotate player, Vector3 targetPoint)
    {
        Vector3 bulletOrigin = GetFireOrigin();
        Vector3 bulletDirection = targetPoint - bulletOrigin;
        if (bulletDirection.sqrMagnitude <= 0.0001f)
        {
            bulletDirection = transform.forward;
        }

        SetAttackAnimation(true);
        CombatBullet.Spawn(
            bulletPrefab,
            bulletOrigin,
            bulletDirection.normalized,
            bulletSpeed,
            bulletLifetime,
            fireDamage,
            transform,
            false,
            true,
            targetPoint,
            bulletHitRadius,
            bulletColor,
            bulletScale);

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundFire();
        }

        ScheduleNextFire();
    }

    private void RotateTowards(Vector3 worldPoint)
    {
        Transform pivot = bodyRoot != null ? bodyRoot : transform;
        Vector3 flatDirection = worldPoint - pivot.position;
        flatDirection.y = 0f;

        if (flatDirection.sqrMagnitude <= 0.0001f)
        {
            return;
        }

        Quaternion targetRotation = Quaternion.LookRotation(flatDirection.normalized) * Quaternion.Euler(0f, modelYawOffset, 0f);
        pivot.rotation = Quaternion.Slerp(pivot.rotation, targetRotation, Time.deltaTime * turnSpeed);
    }

    private Vector3 GetCurrentPatrolPoint()
    {
        if (patrolPointA != null && patrolPointB != null)
        {
            return patrolForward ? patrolPointB.position : patrolPointA.position;
        }

        return spawnPosition + (patrolForward ? localPatrolPointB : localPatrolPointA);
    }

    private Vector3 GetFireOrigin()
    {
        return firePoint != null ? firePoint.position : transform.position + Vector3.up * 1.2f;
    }

    private bool HasLineOfSight(Vector3 targetPoint)
    {
        Vector3 origin = GetFireOrigin();
        Vector3 direction = targetPoint - origin;
        float distance = direction.magnitude;
        if (distance <= 0.001f)
        {
            return true;
        }

        RaycastHit[] hits = Physics.RaycastAll(origin, direction.normalized, distance, lineOfSightMask, QueryTriggerInteraction.Ignore);
        for (int i = 0; i < hits.Length; i++)
        {
            if (hits[i].collider == null)
            {
                continue;
            }

            if (hits[i].collider.transform.root == transform.root)
            {
                continue;
            }

            return false;
        }

        return true;
    }

    private void EnterAlertState()
    {
        if (IsDead)
        {
            return;
        }

        isAlerted = true;
        ScheduleNextFire(Random.Range(0.2f, 0.7f));
    }

    private void OnPlayerShotFired(Transform shooter, Vector3 hitPoint)
    {
        EnterAlertState();
    }

    private void ScheduleNextFire(float delay = -1f)
    {
        if (delay >= 0f)
        {
            nextFireTime = Time.time + delay;
            return;
        }

        nextFireTime = Time.time + Random.Range(minFireInterval, maxFireInterval);
    }

    private void SetIdleAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Idle)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Idle;

        if (TryStartClipSampling(idleAnimationClipName, true, "idle"))
        {
            return;
        }

        RestoreAnimatorControl();
        SetMoveBool(false);

        if (useIdleTrigger)
        {
            TriggerParameter(idleTriggerName);
        }
    }

    private void SetMoveAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Move)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Move;

        if (TryStartClipSampling(moveAnimationClipName, true, "walk", "run", "move"))
        {
            return;
        }

        RestoreAnimatorControl();
        SetMoveBool(true);
    }

    private void SetAttackAnimation(bool force = false)
    {
        actionLockUntil = Time.time + fireAnimationDuration;

        if (!force && currentAnimationState == CombatAnimationState.Attack)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Attack;

        if (TryStartClipSampling(attackAnimationClipName, false, "attack", "fire", "shoot"))
        {
            return;
        }

        RestoreAnimatorControl();
        SetMoveBool(false);
        TriggerParameter(attackTriggerName);
    }

    private void SetDeadAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Dead)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Dead;

        if (TryStartClipSampling(deadAnimationClipName, false, "dead", "die", "death"))
        {
            return;
        }

        RestoreAnimatorControl();
        SetMoveBool(false);
        TriggerParameter(deadTriggerName);
    }

    private bool TryStartClipSampling(string preferredClipName, bool loop, params string[] fallbackKeywords)
    {
        if (!useClipSampling || animator == null)
        {
            return false;
        }

        AnimationClip clip = FindClip(preferredClipName, fallbackKeywords);
        if (clip == null)
        {
            return false;
        }

        activeSampleClip = clip;
        activeSampleLoop = loop;
        activeSampleTime = 0f;

        if (disableAnimatorWhileSampling && animator.enabled)
        {
            animator.enabled = false;
        }

        SampleClipAtTime(clip, 0f);
        return true;
    }

    private void UpdateSampledClip()
    {
        if (activeSampleClip == null || animator == null)
        {
            return;
        }

        float clipLength = Mathf.Max(0.01f, activeSampleClip.length);
        if (activeSampleLoop)
        {
            activeSampleTime = Mathf.Repeat(activeSampleTime + Time.deltaTime, clipLength);
        }
        else
        {
            activeSampleTime = Mathf.Min(activeSampleTime + Time.deltaTime, clipLength);
        }

        SampleClipAtTime(activeSampleClip, activeSampleTime);
    }

    private void SampleClipAtTime(AnimationClip clip, float time)
    {
        if (clip == null || animator == null)
        {
            return;
        }

        clip.SampleAnimation(animator.gameObject, time);
    }

    private void RestoreAnimatorControl()
    {
        activeSampleClip = null;
        activeSampleTime = 0f;
        activeSampleLoop = false;

        if (animator != null && disableAnimatorWhileSampling && !animator.enabled)
        {
            animator.enabled = true;
            animator.Update(0f);
        }
    }

    private void SetMoveBool(bool value)
    {
        if (animator == null || string.IsNullOrWhiteSpace(moveBoolName) || !HasParameter(moveBoolName, AnimatorControllerParameterType.Bool))
        {
            return;
        }

        animator.SetBool(moveBoolHash, value);
    }

    private void TriggerParameter(string triggerName)
    {
        if (animator == null || string.IsNullOrWhiteSpace(triggerName) || !HasParameter(triggerName, AnimatorControllerParameterType.Trigger))
        {
            return;
        }

        int triggerHash = GetTriggerHash(triggerName);
        animator.ResetTrigger(triggerHash);
        animator.SetTrigger(triggerHash);
    }

    private AnimationClip FindClip(string preferredName, params string[] fallbackKeywords)
    {
        if (availableClips == null || availableClips.Length == 0)
        {
            return null;
        }

        string preferredKey = NormalizeKey(preferredName);
        string shortPreferredKey = NormalizeKey(ExtractShortName(preferredName));
        AnimationClip partialMatch = null;

        for (int i = 0; i < availableClips.Length; i++)
        {
            AnimationClip clip = availableClips[i];
            if (clip == null)
            {
                continue;
            }

            string clipKey = NormalizeKey(clip.name);
            if (!string.IsNullOrEmpty(preferredKey) && clipKey == preferredKey)
            {
                return clip;
            }

            if (!string.IsNullOrEmpty(shortPreferredKey) && clipKey == shortPreferredKey)
            {
                return clip;
            }

            if (partialMatch == null)
            {
                if (!string.IsNullOrEmpty(preferredKey) && clipKey.Contains(preferredKey))
                {
                    partialMatch = clip;
                }
                else if (!string.IsNullOrEmpty(shortPreferredKey) && clipKey.Contains(shortPreferredKey))
                {
                    partialMatch = clip;
                }
            }
        }

        if (partialMatch != null)
        {
            return partialMatch;
        }

        for (int i = 0; i < availableClips.Length; i++)
        {
            AnimationClip clip = availableClips[i];
            if (clip == null)
            {
                continue;
            }

            string clipKey = NormalizeKey(clip.name);
            for (int keywordIndex = 0; keywordIndex < fallbackKeywords.Length; keywordIndex++)
            {
                string keyword = NormalizeKey(fallbackKeywords[keywordIndex]);
                if (!string.IsNullOrEmpty(keyword) && clipKey.Contains(keyword))
                {
                    return clip;
                }
            }
        }

        return null;
    }

    private void CacheAnimatorClips()
    {
        if (animator == null || animator.runtimeAnimatorController == null)
        {
            availableClips = null;
            return;
        }

        availableClips = animator.runtimeAnimatorController.animationClips;
    }

    private bool HasParameter(string parameterName, AnimatorControllerParameterType parameterType)
    {
        if (animator == null)
        {
            return false;
        }

        AnimatorControllerParameter[] parameters = animator.parameters;
        for (int i = 0; i < parameters.Length; i++)
        {
            if (parameters[i].name == parameterName && parameters[i].type == parameterType)
            {
                return true;
            }
        }

        return false;
    }

    private void CacheAnimatorParameters()
    {
        moveBoolHash = string.IsNullOrWhiteSpace(moveBoolName) ? 0 : Animator.StringToHash(moveBoolName);
        idleTriggerHash = string.IsNullOrWhiteSpace(idleTriggerName) ? 0 : Animator.StringToHash(idleTriggerName);
        attackTriggerHash = string.IsNullOrWhiteSpace(attackTriggerName) ? 0 : Animator.StringToHash(attackTriggerName);
        deadTriggerHash = string.IsNullOrWhiteSpace(deadTriggerName) ? 0 : Animator.StringToHash(deadTriggerName);
    }

    private int GetTriggerHash(string triggerName)
    {
        if (triggerName == idleTriggerName)
        {
            return idleTriggerHash;
        }

        if (triggerName == attackTriggerName)
        {
            return attackTriggerHash;
        }

        if (triggerName == deadTriggerName)
        {
            return deadTriggerHash;
        }

        return Animator.StringToHash(triggerName);
    }

    private static string ExtractShortName(string clipName)
    {
        if (string.IsNullOrWhiteSpace(clipName))
        {
            return string.Empty;
        }

        int separatorIndex = clipName.LastIndexOf('|');
        if (separatorIndex < 0 || separatorIndex >= clipName.Length - 1)
        {
            return clipName;
        }

        return clipName.Substring(separatorIndex + 1);
    }

    private static string NormalizeKey(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return string.Empty;
        }

        return value
            .Trim()
            .Replace(" ", string.Empty)
            .Replace("_", string.Empty)
            .ToLowerInvariant();
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.cyan;

        Vector3 pointA = patrolPointA != null ? patrolPointA.position : transform.position + localPatrolPointA;
        Vector3 pointB = patrolPointB != null ? patrolPointB.position : transform.position + localPatrolPointB;

        Gizmos.DrawSphere(pointA, 0.12f);
        Gizmos.DrawSphere(pointB, 0.12f);
        Gizmos.DrawLine(pointA, pointB);

        Gizmos.color = new Color(1f, 0.3f, 0.1f, 0.45f);
        Gizmos.DrawWireSphere(transform.position, fireRange);
    }
}
