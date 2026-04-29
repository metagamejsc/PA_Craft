using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;

[DisallowMultipleComponent]
public class AutoFightCharacter : MonoBehaviour
{
    private enum CombatAnimationState
    {
        Idle,
        Move,
        Attack,
        Dead
    }

    [Header("References")]
    [SerializeField] private Animator animator;
    [SerializeField] private SoundChar soundChar;
    [SerializeField] private Transform lookAtTarget;
    [SerializeField] private Transform rightHand;
    [SerializeField] private Transform weaponSpawnPoint;
    [SerializeField] private Slider hpSlider;
    [SerializeField] private Image hpFillImage;

    [Header("Stats")]
    [SerializeField] private float maxHp = 100f;
    [SerializeField] private float damage = 10f;
    [SerializeField] private float attackSpeed = 1f;
    [SerializeField] private float moveSpeed = 2f;
    [SerializeField] private float attackRange = 1.5f;

    [Header("Attack Timing")]
    [SerializeField] private float baseAttackDuration = 0.9f;
    [SerializeField] [Range(0.05f, 0.95f)] private float hitMomentNormalized = 0.45f;

    [Header("Animator Parameters")]
    [SerializeField] private string moveBoolName = "isMoving";
    [SerializeField] private bool useIdleTrigger;
    [SerializeField] private string idleTriggerName = "Idle";
    [SerializeField] private string attackTriggerName = "Attack";
    [SerializeField] private string deadTriggerName = "Dead";

    [Header("Options")]
    [SerializeField] private bool rotateToTarget = true;
    [SerializeField] private bool forceStableAnimatorSettings = true;
    [SerializeField] private Gradient hpGradient;

    [Header("Sound Timing")]
    [SerializeField] private float idleSoundInterval = 2.2f;
    [SerializeField] private float moveSoundInterval = 0.45f;

    [Header("Damage Flash")]
    [SerializeField] private Image damageFlashImage;
    [SerializeField] private Color damageFlashColor = new Color(1f, 0.2f, 0.2f, 0.55f);
    [SerializeField] [Min(1)] private int damageFlashBlinkCount = 2;
    [SerializeField] private float damageFlashFadeInDuration = 0.04f;
    [SerializeField] private float damageFlashFadeOutDuration = 0.12f;

    private AutoFightCharacter target;
    private Coroutine attackRoutine;
    private Coroutine damageFlashRoutine;
    private CombatAnimationState currentAnimationState = CombatAnimationState.Idle;
    private float currentHp;
    private float nextAttackTime;
    private float nextIdleSoundTime;
    private float nextMoveSoundTime;
    private float weaponDamageBonus;
    private bool battleStarted;
    private bool isDead;
    private bool isAttacking;
    private GameObject equippedWeaponInstance;
    private int moveBoolHash;
    private int idleTriggerHash;
    private int attackTriggerHash;
    private int deadTriggerHash;

    public event Action<AutoFightCharacter> HpChanged;
    public event Action<AutoFightCharacter> Died;

    public float MaxHp => maxHp;
    public float CurrentHp => currentHp;
    public float Damage => damage;
    public float TotalDamage => damage + weaponDamageBonus;
    public float AttackSpeed => attackSpeed;
    public float MoveSpeed => moveSpeed;
    public float AttackRange => attackRange;
    public bool IsDead => isDead;

    private void Awake()
    {
        if (animator == null)
        {
            animator = GetComponent<Animator>();
        }

        if (soundChar == null)
        {
            soundChar = GetComponent<SoundChar>();
        }

        CacheAnimatorParameters();
        ApplyAnimatorSettings();

        currentHp = maxHp;
        UpdateHpUi();
        ResetDamageFlash();
        SetIdleAnimation(true);
    }

    private void Update()
    {
        UpdateStateSounds();

        if (!battleStarted || isDead || target == null || target.IsDead)
        {
            return;
        }

        if (rotateToTarget)
        {
            FaceTarget();
        }

        if (isAttacking)
        {
            return;
        }

        var targetPosition = target.transform.position;
        var selfPosition = transform.position;
        targetPosition.y = selfPosition.y;

        var distance = Vector3.Distance(selfPosition, targetPosition);
        if (distance > attackRange)
        {
            MoveToTarget(targetPosition);
            return;
        }

        SetIdleAnimation();
        if (Time.time < nextAttackTime)
        {
            return;
        }

        attackRoutine = StartCoroutine(AttackCoroutine());
    }

    public void SetupTarget(AutoFightCharacter newTarget)
    {
        target = newTarget;
    }

    public void SetAnimator(Animator newAnimator)
    {
        animator = newAnimator;
        ApplyAnimatorSettings();
        SetIdleAnimation(true);
    }

    public void StartBattle()
    {
        if (isDead)
        {
            return;
        }

        battleStarted = true;
        SetIdleAnimation(true);
    }

    public void SetWeaponDamageBonus(float bonusDamage)
    {
        weaponDamageBonus = Mathf.Max(0f, bonusDamage);
    }

    public void EquipWeapon(GameObject weaponPrefab, Vector3 localPosition, Vector3 localEulerAngles, Vector3 localScale)
    {
        ClearWeapon();

        var parentTransform = weaponSpawnPoint != null ? weaponSpawnPoint : rightHand;
        if (weaponPrefab == null || parentTransform == null)
        {
            return;
        }

        equippedWeaponInstance = Instantiate(weaponPrefab, parentTransform);
        equippedWeaponInstance.name = weaponPrefab.name + "_Equipped";
        equippedWeaponInstance.transform.localPosition = localPosition;
        equippedWeaponInstance.transform.localRotation = Quaternion.Euler(localEulerAngles);
        equippedWeaponInstance.transform.localScale = localScale;

        foreach (var colliderComponent in equippedWeaponInstance.GetComponentsInChildren<Collider>(true))
        {
            colliderComponent.enabled = false;
        }

        foreach (var rigidbodyComponent in equippedWeaponInstance.GetComponentsInChildren<Rigidbody>(true))
        {
            Destroy(rigidbodyComponent);
        }
    }

    public void ClearWeapon()
    {
        if (equippedWeaponInstance == null)
        {
            return;
        }

        Destroy(equippedWeaponInstance);
        equippedWeaponInstance = null;
    }

    public void StopBattle()
    {
        battleStarted = false;
        isAttacking = false;

        if (attackRoutine != null)
        {
            StopCoroutine(attackRoutine);
            attackRoutine = null;
        }

        if (!isDead)
        {
            SetIdleAnimation(true);
        }
    }

    public void ResetCharacter()
    {
        StopBattle();
        isDead = false;
        currentHp = maxHp;
        nextAttackTime = 0f;
        UpdateHpUi();
        ResetDamageFlash();
        SetIdleAnimation(true);
    }

    public void TakeDamage(float incomingDamage)
    {
        if (isDead)
        {
            return;
        }

        currentHp = Mathf.Max(0f, currentHp - incomingDamage);
        UpdateHpUi();
        soundChar?.PlayTakeDameSound();
        if (incomingDamage > 0f)
        {
            PlayDamageFlash();
        }

        HpChanged?.Invoke(this);

        if (currentHp > 0f)
        {
            return;
        }

        Die();
    }

    private void MoveToTarget(Vector3 targetPosition)
    {
        SetMoveAnimation();
        transform.position = Vector3.MoveTowards(
            transform.position,
            targetPosition,
            moveSpeed * Time.deltaTime);
    }

    private IEnumerator AttackCoroutine()
    {
        isAttacking = true;
        nextAttackTime = Time.time + (1f / Mathf.Max(attackSpeed, 0.01f));

        SetAttackAnimation(true);
        var attackDuration = Mathf.Max(0.05f, baseAttackDuration);
        var hitDelay = attackDuration * hitMomentNormalized;

        yield return new WaitForSeconds(hitDelay);

        if (!isDead && target != null && !target.IsDead)
        {
            var distance = Vector3.Distance(transform.position, target.transform.position);
            if (distance <= attackRange + 0.15f)
            {
                target.TakeDamage(TotalDamage);
            }
        }

        yield return new WaitForSeconds(Mathf.Max(0f, attackDuration - hitDelay));

        isAttacking = false;
        attackRoutine = null;

        if (!isDead)
        {
            SetIdleAnimation();
        }
    }

    private void Die()
    {
        isDead = true;
        battleStarted = false;
        isAttacking = false;

        if (attackRoutine != null)
        {
            StopCoroutine(attackRoutine);
            attackRoutine = null;
        }

        if (animator != null)
        {
            animator.applyRootMotion = false;
        }

        SetDeadAnimation(true);
        Died?.Invoke(this);
        LunaManager.ins.ShowEndCard();
    }

    private void FaceTarget()
    {
        var focus = lookAtTarget != null ? lookAtTarget.position : target.transform.position;
        var direction = focus - transform.position;
        direction.y = 0f;
        if (direction.sqrMagnitude < 0.0001f)
        {
            return;
        }

        var rotation = Quaternion.LookRotation(direction);
        transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * 10f);
    }

    private void SetIdleAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Idle)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Idle;
        SetMoveBool(false);

        if (useIdleTrigger)
        {
            TriggerParameter(idleTriggerName);
        }

        HandleStateSound(currentAnimationState);
    }

    private void SetMoveAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Move)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Move;
        SetMoveBool(true);
        HandleStateSound(currentAnimationState);
    }

    private void SetAttackAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Attack)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Attack;
        SetMoveBool(false);
        TriggerParameter(attackTriggerName);
        HandleStateSound(currentAnimationState);
    }

    private void SetDeadAnimation(bool force = false)
    {
        if (!force && currentAnimationState == CombatAnimationState.Dead)
        {
            return;
        }

        currentAnimationState = CombatAnimationState.Dead;
        SetMoveBool(false);
        TriggerParameter(deadTriggerName);
        HandleStateSound(currentAnimationState);
    }

    private void UpdateHpUi()
    {
        var normalizedHp = maxHp <= 0f ? 0f : currentHp / maxHp;

        if (hpSlider != null)
        {
            hpSlider.maxValue = maxHp;
            hpSlider.value = currentHp;
        }

        if (hpFillImage != null && hpGradient != null)
        {
            hpFillImage.color = hpGradient.Evaluate(normalizedHp);
        }
    }

    private void PlayDamageFlash()
    {
        if (damageFlashImage == null || !isActiveAndEnabled)
        {
            return;
        }

        if (damageFlashRoutine != null)
        {
            StopCoroutine(damageFlashRoutine);
        }

        damageFlashRoutine = StartCoroutine(DamageFlashCoroutine());
    }

    private IEnumerator DamageFlashCoroutine()
    {
        SetDamageFlashAlpha(0f);

        for (var i = 0; i < damageFlashBlinkCount; i++)
        {
            yield return FadeDamageFlash(0f, damageFlashColor.a, damageFlashFadeInDuration);
            yield return FadeDamageFlash(damageFlashColor.a, 0f, damageFlashFadeOutDuration);
        }

        damageFlashRoutine = null;
    }

    private IEnumerator FadeDamageFlash(float fromAlpha, float toAlpha, float duration)
    {
        if (damageFlashImage == null)
        {
            yield break;
        }

        if (duration <= 0f)
        {
            SetDamageFlashAlpha(toAlpha);
            yield break;
        }

        var elapsed = 0f;
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            var normalizedTime = Mathf.Clamp01(elapsed / duration);
            SetDamageFlashAlpha(Mathf.Lerp(fromAlpha, toAlpha, normalizedTime));
            yield return null;
        }

        SetDamageFlashAlpha(toAlpha);
    }

    private void ResetDamageFlash()
    {
        if (damageFlashRoutine != null)
        {
            StopCoroutine(damageFlashRoutine);
            damageFlashRoutine = null;
        }

        SetDamageFlashAlpha(0f);
    }

    private void SetDamageFlashAlpha(float alpha)
    {
        if (damageFlashImage == null)
        {
            return;
        }

        damageFlashImage.color = new Color(
            damageFlashColor.r,
            damageFlashColor.g,
            damageFlashColor.b,
            Mathf.Clamp01(alpha));
    }

    private void UpdateStateSounds()
    {
        if (soundChar == null || isDead)
        {
            return;
        }

        if (currentAnimationState == CombatAnimationState.Move && Time.time >= nextMoveSoundTime)
        {
            soundChar.PlayMoveSound();
            nextMoveSoundTime = Time.time + moveSoundInterval;
        }

        if (currentAnimationState == CombatAnimationState.Idle && Time.time >= nextIdleSoundTime)
        {
            soundChar.PlayIdleSound();
            nextIdleSoundTime = Time.time + idleSoundInterval;
        }
    }

    private void HandleStateSound(CombatAnimationState animationState)
    {
        if (soundChar == null)
        {
            return;
        }

        if (animationState == CombatAnimationState.Idle)
        {
            soundChar.PlayIdleSound();
            nextIdleSoundTime = Time.time + idleSoundInterval;
            return;
        }

        if (animationState == CombatAnimationState.Move)
        {
            soundChar.PlayMoveSound();
            nextMoveSoundTime = Time.time + moveSoundInterval;
            return;
        }

        if (animationState == CombatAnimationState.Attack)
        {
            soundChar.PlayAttackSound();
            return;
        }

        if (animationState == CombatAnimationState.Dead)
        {
            soundChar.PlayDeadSound();
        }
    }

    private void SetMoveBool(bool isMoving)
    {
        if (animator == null || string.IsNullOrEmpty(moveBoolName))
        {
            return;
        }

        animator.SetBool(moveBoolHash, isMoving);
    }

    private void TriggerParameter(string triggerName)
    {
        if (animator == null || string.IsNullOrEmpty(triggerName))
        {
            return;
        }

        var triggerHash = GetTriggerHash(triggerName);
        animator.ResetTrigger(triggerHash);
        animator.SetTrigger(triggerHash);
    }

    private void CacheAnimatorParameters()
    {
        moveBoolHash = string.IsNullOrEmpty(moveBoolName) ? 0 : Animator.StringToHash(moveBoolName);
        idleTriggerHash = string.IsNullOrEmpty(idleTriggerName) ? 0 : Animator.StringToHash(idleTriggerName);
        attackTriggerHash = string.IsNullOrEmpty(attackTriggerName) ? 0 : Animator.StringToHash(attackTriggerName);
        deadTriggerHash = string.IsNullOrEmpty(deadTriggerName) ? 0 : Animator.StringToHash(deadTriggerName);
    }

    private void ApplyAnimatorSettings()
    {
        if (animator == null || !forceStableAnimatorSettings)
        {
            return;
        }

        animator.applyRootMotion = false;
        animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        animator.updateMode = AnimatorUpdateMode.Normal;
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
}
