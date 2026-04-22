using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Collider))]
public class JumpingFish : MonoBehaviour
{
    public static IReadOnlyList<JumpingFish> ActiveFish => activeFish;

    [Header("Water Effects")]
    public GameObject waterSplashEffectPrefab;
    public GameObject waterRippleEffectPrefab;
    public float effectCleanupDelay = 4f;
    public float splashEffectYOffset = 0.02f;
    public float rippleEffectYOffset = 0.02f;
    public float minRippleDelay = 1f;
    public float maxRippleDelay = 2f;

    [Header("Jump")]
    public float minJumpDelay = 0.5f;
    public float maxJumpDelay = 1.5f;
    public float minJumpDuration = 0.55f;
    public float maxJumpDuration = 0.85f;
    public float minJumpHeight = 0.75f;
    public float maxJumpHeight = 1.4f;
    public float minHorizontalDistance = 0.15f;
    public float maxHorizontalDistance = 1f;
    public float rotationSmooth = 10f;
    public float verticalLookStrength = 0.35f;

    [Header("Catch")]
    public float catchMoveDuration = 0.35f;
    public float catchMoveArcHeight = 0.75f;
    public float catchDisappearDuration = 0.12f;
    public float catchSpinSpeed = 720f;
    public bool notifyLunaManagerOnCatch = true;
    public AudioClip catchSound;

    public Vector3 SurfacePosition => surfacePosition;
    public Vector3 InteractionPoint => cachedCollider != null ? cachedCollider.bounds.center : transform.position;
    public Bounds SelectionBounds => cachedCollider != null ? cachedCollider.bounds : new Bounds(transform.position, Vector3.one * 0.5f);
    public bool IsCaught => isCaught;
    public bool IsJumping => isJumping;

    private static readonly List<JumpingFish> activeFish = new List<JumpingFish>();

    private Collider cachedCollider;
    private Rigidbody cachedRb;
    private Vector3 surfacePosition;
    private Vector3 initialScale;
    private FishSpawnArea owner;
    private Coroutine jumpLoopCoroutine;
    private Coroutine rippleLoopCoroutine;
    private bool isInitialized;
    private bool isCaught;
    private bool isJumping;

    private void Awake()
    {
        cachedCollider = GetComponent<Collider>();
        cachedRb = GetComponent<Rigidbody>();
        initialScale = transform.localScale;
        ConfigurePhysics();
    }

    private void OnEnable()
    {
        ConfigurePhysics();

        if (!Application.isPlaying)
            return;

        if (!activeFish.Contains(this))
            activeFish.Add(this);

        if (!isInitialized)
            PlaceAt(transform.position);

        StartJumpLoop();
        StartRippleLoop();
    }

    private void OnDisable()
    {
        if (jumpLoopCoroutine != null)
        {
            StopCoroutine(jumpLoopCoroutine);
            jumpLoopCoroutine = null;
        }

        if (rippleLoopCoroutine != null)
        {
            StopCoroutine(rippleLoopCoroutine);
            rippleLoopCoroutine = null;
        }

        activeFish.Remove(this);
    }

    public void Setup(FishSpawnArea spawnOwner, Vector3 spawnPosition)
    {
        owner = spawnOwner;
        isCaught = false;
        isJumping = false;

        if (cachedCollider != null)
            cachedCollider.enabled = true;

        transform.localScale = initialScale;
        PlaceAt(spawnPosition);
        SetFlatRotation(GetRandomHorizontalDirection());
        StartJumpLoop();
        StartRippleLoop();
        PlayRippleEffect();
    }

    public bool TryCatch(Transform catcher, float catchDistance, Vector3 catchDestination)
    {
        if (!isJumping || !IsInCatchRange(catcher, catchDistance) || isCaught)
            return false;

        isCaught = true;

        if (cachedCollider != null)
            cachedCollider.enabled = false;

        if (jumpLoopCoroutine != null)
        {
            StopCoroutine(jumpLoopCoroutine);
            jumpLoopCoroutine = null;
        }

        if (rippleLoopCoroutine != null)
        {
            StopCoroutine(rippleLoopCoroutine);
            rippleLoopCoroutine = null;
        }

        StartCoroutine(CatchRoutine(catchDestination));
        return true;
    }

    public bool IsInCatchRange(Transform catcher, float catchDistance)
    {
        if (isCaught || catcher == null)
            return false;

        Vector3 fishPos = InteractionPoint;
        Vector3 catcherPos = catcher.position;
        fishPos.y = 0f;
        catcherPos.y = 0f;

        return (fishPos - catcherPos).sqrMagnitude <= catchDistance * catchDistance;
    }

    private void ConfigurePhysics()
    {
        if (cachedCollider != null)
            cachedCollider.isTrigger = true;

        if (cachedRb == null)
            return;

        cachedRb.isKinematic = true;
        cachedRb.useGravity = false;
        cachedRb.velocity = Vector3.zero;
        cachedRb.angularVelocity = Vector3.zero;
    }

    private void PlaceAt(Vector3 worldPosition)
    {
        isInitialized = true;
        surfacePosition = worldPosition;
        transform.position = worldPosition;
    }

    private void StartJumpLoop()
    {
        if (!gameObject.activeInHierarchy || isCaught)
            return;

        if (jumpLoopCoroutine != null)
            StopCoroutine(jumpLoopCoroutine);

        jumpLoopCoroutine = StartCoroutine(JumpLoop());
    }

    private void StartRippleLoop()
    {
        if (!gameObject.activeInHierarchy || isCaught || waterRippleEffectPrefab == null)
            return;

        if (rippleLoopCoroutine != null)
            StopCoroutine(rippleLoopCoroutine);

        rippleLoopCoroutine = StartCoroutine(RippleLoop());
    }

    private IEnumerator JumpLoop()
    {
        while (!isCaught)
        {
            yield return new WaitUntil(CanAnimateFish);
            yield return new WaitForSeconds(GetRandomBetween(minJumpDelay, maxJumpDelay));

            if (isCaught)
                yield break;

            yield return JumpOnce();
        }
    }

    private IEnumerator RippleLoop()
    {
        while (!isCaught)
        {
            yield return new WaitUntil(CanAnimateFish);
            yield return new WaitForSeconds(GetRandomBetween(minRippleDelay, maxRippleDelay));

            if (isCaught || isJumping)
                continue;

            PlayRippleEffect();
        }
    }

    private IEnumerator JumpOnce()
    {
        isJumping = true;
        float duration = Mathf.Max(0.05f, GetRandomBetween(minJumpDuration, maxJumpDuration));
        float jumpHeight = Mathf.Max(0.05f, GetRandomBetween(minJumpHeight, maxJumpHeight));
        float jumpDistance = Mathf.Max(0f, GetRandomBetween(minHorizontalDistance, maxHorizontalDistance));

        Vector3 startPos = surfacePosition;
        Vector3 moveDir = GetRandomHorizontalDirection();
        Vector3 endPos = startPos + moveDir * jumpDistance;

        if (owner != null)
            endPos = owner.ClampToSurface(endPos);
        else
            endPos.y = startPos.y;

        float elapsed = 0f;

        while (elapsed < duration)
        {
            if (!CanAnimateFish())
            {
                yield return null;
                continue;
            }

            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / duration);

            Vector3 nextPos = Vector3.Lerp(startPos, endPos, t);
            nextPos.y += Mathf.Sin(t * Mathf.PI) * jumpHeight;
            transform.position = nextPos;

            float verticalVelocity = Mathf.Cos(t * Mathf.PI) * jumpHeight * Mathf.PI / duration;
            SetJumpRotation(moveDir, verticalVelocity);

            yield return null;
        }

        surfacePosition = owner != null ? owner.ClampToSurface(endPos) : endPos;
        transform.position = surfacePosition;
        SetFlatRotation(moveDir);
        PlaySplashEffect();
        isJumping = false;
    }

    private IEnumerator CatchRoutine(Vector3 catchDestination)
    {
        if (AudioManager.ins != null)
        {
            if (catchSound != null)
                AudioManager.ins.PlaySound(catchSound);
            else
                AudioManager.ins.PlaySoundGetCoin();
        }

        Vector3 startPos = transform.position;
        Vector3 endPos = catchDestination;
        Vector3 startScale = transform.localScale;
        Quaternion startRotation = transform.rotation;

        float elapsed = 0f;
        float duration = Mathf.Max(0.05f, catchMoveDuration);

        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / duration);

            Vector3 nextPos = Vector3.Lerp(startPos, endPos, t);
            nextPos.y += Mathf.Sin(t * Mathf.PI) * catchMoveArcHeight;
            transform.position = nextPos;

            transform.rotation = startRotation * Quaternion.Euler(0f, catchSpinSpeed * t, 0f);

            yield return null;
        }

        transform.position = endPos;

        elapsed = 0f;
        float disappearDuration = Mathf.Max(0.05f, catchDisappearDuration);

        while (elapsed < disappearDuration)
        {
            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / disappearDuration);
            transform.localScale = Vector3.Lerp(startScale, Vector3.zero, t);

            yield return null;
        }

        if (notifyLunaManagerOnCatch && LunaManager.ins != null)
            LunaManager.ins.CheckClickShowEndCard();

        if (owner != null)
            owner.NotifyFishCaught(this);

        Destroy(gameObject);
    }

    private void PlaySplashEffect()
    {
        SpawnEffect(waterSplashEffectPrefab, surfacePosition + Vector3.up * splashEffectYOffset);
    }

    private void PlayRippleEffect()
    {
        SpawnEffect(waterRippleEffectPrefab, surfacePosition + Vector3.up * rippleEffectYOffset);
    }

    private void SpawnEffect(GameObject effectPrefab, Vector3 position)
    {
        if (effectPrefab == null)
            return;

        GameObject instance = Instantiate(effectPrefab, position, effectPrefab.transform.rotation);
        Destroy(instance, effectCleanupDelay);
    }

    private void SetJumpRotation(Vector3 moveDir, float verticalVelocity)
    {
        Vector3 lookDir = moveDir.normalized;
        lookDir.y = Mathf.Clamp(verticalVelocity * verticalLookStrength, -1f, 1f);

        if (lookDir.sqrMagnitude < 0.001f)
            lookDir = transform.forward;

        Quaternion targetRotation = Quaternion.LookRotation(lookDir.normalized, Vector3.up);
        transform.rotation = Quaternion.Slerp(
            transform.rotation,
            targetRotation,
            rotationSmooth * Time.deltaTime
        );
    }

    private void SetFlatRotation(Vector3 moveDir)
    {
        Vector3 flatDir = moveDir;
        flatDir.y = 0f;

        if (flatDir.sqrMagnitude < 0.001f)
            return;

        transform.rotation = Quaternion.LookRotation(flatDir.normalized, Vector3.up);
    }

    private Vector3 GetRandomHorizontalDirection()
    {
        Vector2 random2D = Random.insideUnitCircle;

        if (random2D.sqrMagnitude < 0.001f)
            random2D = Vector2.right;

        return new Vector3(random2D.x, 0f, random2D.y).normalized;
    }

    private float GetRandomBetween(float a, float b)
    {
        if (a > b)
        {
            float temp = a;
            a = b;
            b = temp;
        }

        return Random.Range(a, b);
    }

    private bool CanAnimateFish()
    {
        /*if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
            return false;

        if (TutorialBuildBlock.ins != null && !TutorialBuildBlock.ins.isCompleteTutorial)
            return false;
            */

        return true;
    }
}
