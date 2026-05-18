using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Serialization;
using Random = UnityEngine.Random;

[DisallowMultipleComponent]
public class DraggableEnemy : MonoBehaviour
{
    private const float HoleAttractRange = 4f;
    private const float HoleAutoPlaceDistance = 0.35f;
    private const float FallDuration = 0.18f;

    [Header("Approach")]
    [SerializeField] private bool moveTowardCamera = true;
    [SerializeField] private float approachSpeed = 1.5f;
    [SerializeField] private float stopDistanceFromCamera = 2f;
    [SerializeField] private bool faceCameraWhileApproaching = true;

    [Header("3D Drag")]
    [FormerlySerializedAs("moveHeightWhileDrag")]
    [SerializeField] private float initialDragLiftHeight = 0.5f;
    [SerializeField] private float dragScaleMultiplier = 1.08f;
    [SerializeField] private float dragMoveSpeed = 14f;
    [SerializeField] private float maxDragDistanceFromStart = 8f;
    [SerializeField] private float minDragHeight = 0.5f;
    [SerializeField] private float dragLiftSpeed = 3f;
    [SerializeField] private float autoBlackHoleHeight = 7f;
    [SerializeField] private Transform dragBoundsCenter;
    [SerializeField] private Vector2 dragBoundsSize = new Vector2(8f, 8f);
    [SerializeField] private float dragBoundsHeight = 8f;
    [FormerlySerializedAs("useRectDragBounds")]
    [SerializeField] private bool useBoxDragBounds;

    [Header("Black Hole")]
    [FormerlySerializedAs("blackHoleSwirlDuration")]
    [SerializeField] private float blackHoleMoveDuration = 0.8f;
    [SerializeField] private float blackHoleSpinDegreesPerSecond = 900f;
    [SerializeField] private float blackHoleScaleMultiplier = 0.25f;
    [SerializeField] private bool dropWithPhysics = true;

    [Header("Animation")]
    [SerializeField] private float deathRotateXAngle = 90f;
    [SerializeField] private float deathRotateDuration = 0.15f;

    [Header("Placed Result")]
    [SerializeField] private Transform placedMoveTarget;
    [SerializeField] private LayerMask landingLayerMask = ~0;
    [SerializeField] private ParticleSystem landingParticle;
    [SerializeField] private Animator animator;
    [SerializeField] private string deadTriggerName = "Dead";
    [SerializeField] private string deadStateName = "Dead";

    [Header("After Drop Wander")]
    [SerializeField] private bool wanderAfterLanding = true;
    [SerializeField] private float landedWanderRadius = 2f;
    [SerializeField] private float landedWanderSpeed = 1.5f;
    [SerializeField] private float landedTurnSpeed = 540f;
    [SerializeField] private Vector2 landedWanderWaitRange = new Vector2(0.3f, 0.8f);

    [Header("Sound")]
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AudioClip idleSound;
    [SerializeField] private AudioClip deadSound;
    [SerializeField] private float soundVolume = 1f;
    [SerializeField] private Vector2 idleSoundRepeatIntervalRange = new Vector2(2f, 4f);

    [Header("State")]
    [SerializeField] private bool isPlaced;

    private const float DragScaleLerpSpeed = 14f;

    private Transform cachedTransform;
    private Vector3 startPosition;
    private Vector3 startScale;
    private Quaternion startRotation;
    private Quaternion dragHoldRotation;
    private Vector3 dragTargetPosition;
    private Vector3 dragHorizontalAnchor;
    private float dragDepthFromCamera;
    private float currentDragLiftHeight;
    private HoleTrigger currentHole;
    private Coroutine activeAnimation;
    private Renderer[] cachedRenderers;
    private Collider[] cachedColliders;
    private Rigidbody cachedRigidbody;
    private Coroutine idleSoundLoop;
    private Coroutine landedWanderLoop;
    private bool isDragging;
    private bool isLocked;
    private bool isInsideBlackHole;
    private bool waitingForPlacedLanding;
    private bool hasPlayedPlacedLanding;
    private bool hasReachedCamera;
    private int deadTriggerHash;
    private int deadStateHash;

    public bool IsPlaced
    {
        get { return isPlaced; }
    }

    public void SetApproachSpeed(float speed)
    {
        approachSpeed = Mathf.Max(0f, speed);
    }

    private void Awake()
    {
        cachedTransform = transform;
        startPosition = cachedTransform.position;
        startScale = cachedTransform.localScale;
        startRotation = cachedTransform.rotation;
        dragTargetPosition = startPosition;
        cachedRenderers = GetComponentsInChildren<Renderer>(true);
        cachedColliders = GetComponentsInChildren<Collider>(true);
        cachedRigidbody = GetComponent<Rigidbody>();
        deadTriggerHash = Animator.StringToHash(deadTriggerName);
        deadStateHash = Animator.StringToHash(deadStateName);

        if (animator == null)
        {
            animator = GetComponentInChildren<Animator>(true);
        }

        if (audioSource == null)
        {
            audioSource = GetComponent<AudioSource>();
            if (audioSource == null)
            {
                audioSource = gameObject.AddComponent<AudioSource>();
            }
        }

        audioSource.playOnAwake = false;
        SetRigidbodyControlled(true);
    }
    

    private void OnEnable()
    {
        if (isPlaced)
        {
            return;
        }

        PlayIdleSound();
        StartIdleSoundLoop();
    }

    private void Update()
    {
        if (isDragging)
        {
            cachedTransform.position = Vector3.Lerp(
                cachedTransform.position,
                dragTargetPosition,
                Time.deltaTime * dragMoveSpeed);

            cachedTransform.localScale = Vector3.Lerp(
                cachedTransform.localScale,
                startScale * dragScaleMultiplier,
                Time.deltaTime * DragScaleLerpSpeed);

            cachedTransform.rotation = dragHoldRotation;
            return;
        }

        if (moveTowardCamera && !isPlaced && !isLocked && !isInsideBlackHole)
        {
            MoveTowardCamera();
        }
    }

    public bool CanBeginDrag()
    {
        return !isPlaced && !isLocked && !isInsideBlackHole;
    }

    public void BeginDrag(Vector2 screenPosition)
    {
        if (!CanBeginDrag())
        {
            return;
        }

        StopActiveAnimation();
        SetRigidbodyControlled(true);

        isDragging = true;
        isLocked = true;
        currentHole = null;
        dragHoldRotation = cachedTransform.rotation;
        dragHorizontalAnchor = cachedTransform.position;
        currentDragLiftHeight = Mathf.Max(
            minDragHeight,
            initialDragLiftHeight,
            cachedTransform.position.y - startPosition.y);
        CaptureDragDepth(screenPosition);
        UpdateDrag(screenPosition);
    }

    public void UpdateDrag(Vector2 screenPosition)
    {
        if (!isDragging)
        {
            return;
        }

        Vector3 targetPosition;
        if (!TryGetRayDepthPoint(screenPosition, out targetPosition))
        {
            return;
        }

        float targetLiftHeight = Mathf.Max(minDragHeight, autoBlackHoleHeight);
        currentDragLiftHeight = Mathf.MoveTowards(
            currentDragLiftHeight,
            targetLiftHeight,
            dragLiftSpeed * Time.deltaTime);

        targetPosition.y = startPosition.y + currentDragLiftHeight;
        targetPosition.x = dragHorizontalAnchor.x;
        targetPosition.z = dragHorizontalAnchor.z;
        targetPosition = ClampDragPosition(targetPosition);

        if (currentDragLiftHeight >= autoBlackHoleHeight)
        {
            currentHole = HoleTrigger.GetClosestHole(targetPosition);
            dragTargetPosition = targetPosition;
            if (currentHole != null)
            {
                TryEnterBlackHole(currentHole);
                return;
            }
        }

        dragTargetPosition = targetPosition;
        cachedTransform.rotation = dragHoldRotation;
    }

    public void EndDrag()
    {
        if (!isDragging)
        {
            return;
        }

        isDragging = false;
        cachedTransform.rotation = dragHoldRotation;

        if (currentHole != null)
        {
            Vector3 holePosition = currentHole.GetSnapPosition();
            if (Vector3.Distance(cachedTransform.position, holePosition) <= HoleAttractRange)
            {
                TryEnterBlackHole(currentHole);
                return;
            }
        }

        activeAnimation = StartCoroutine(DropToGroundRoutine());
    }

    public void SetCurrentHole(HoleTrigger hole, bool isInside)
    {
        if (isPlaced || (!isLocked && !isDragging))
        {
            return;
        }

        if (isInside)
        {
            currentHole = hole;
            return;
        }

        if (currentHole == hole)
        {
            currentHole = null;
        }
    }

    public void TryEnterBlackHole(HoleTrigger hole)
    {
        if (hole == null || isPlaced || isInsideBlackHole)
        {
            return;
        }

        StopActiveAnimation();
        isDragging = false;
        isLocked = true;
        isInsideBlackHole = true;
        currentHole = hole;
        SetRigidbodyControlled(true);
        StopIdleSoundLoop();
        activeAnimation = StartCoroutine(BlackHoleRoutine(hole));
    }

    private void CaptureDragDepth(Vector2 screenPosition)
    {
        Camera gameplayCamera = GetGameplayCamera();
        if (gameplayCamera == null)
        {
            dragDepthFromCamera = 5f;
            return;
        }

        Vector3 toEnemy = cachedTransform.position - gameplayCamera.transform.position;
        dragDepthFromCamera = Vector3.Dot(toEnemy, gameplayCamera.transform.forward);
        if (dragDepthFromCamera <= 0.25f)
        {
            dragDepthFromCamera = Vector3.Distance(gameplayCamera.transform.position, cachedTransform.position);
        }
    }

    private bool TryGetRayDepthPoint(Vector2 screenPosition, out Vector3 worldPoint)
    {
        worldPoint = Vector3.zero;

        Camera gameplayCamera = GetGameplayCamera();
        if (gameplayCamera == null)
        {
            return false;
        }

        Ray ray = gameplayCamera.ScreenPointToRay(screenPosition);
        worldPoint = ray.origin + (ray.direction * dragDepthFromCamera);
        return true;
    }

    private Vector3 ClampDragPosition(Vector3 position)
    {
        if (useBoxDragBounds)
        {
            Vector3 center = dragBoundsCenter != null ? dragBoundsCenter.position : startPosition;
            float halfX = dragBoundsSize.x * 0.5f;
            float halfY = dragBoundsHeight * 0.5f;
            float halfZ = dragBoundsSize.y * 0.5f;

            position.x = Mathf.Clamp(position.x, center.x - halfX, center.x + halfX);
            position.y = Mathf.Clamp(position.y, center.y - halfY, center.y + halfY);
            position.z = Mathf.Clamp(position.z, center.z - halfZ, center.z + halfZ);
            return position;
        }

        Vector3 fromStart = position - startPosition;
        Vector3 horizontalFromStart = fromStart;
        horizontalFromStart.y = 0f;
        if (horizontalFromStart.sqrMagnitude > maxDragDistanceFromStart * maxDragDistanceFromStart)
        {
            horizontalFromStart = horizontalFromStart.normalized * maxDragDistanceFromStart;
            position.x = startPosition.x + horizontalFromStart.x;
            position.z = startPosition.z + horizontalFromStart.z;
        }

        return position;
    }

    private void MoveTowardCamera()
    {
        Camera gameplayCamera = GetGameplayCamera();
        if (gameplayCamera == null)
        {
            return;
        }

        Vector3 cameraPosition = gameplayCamera.transform.position;
        Vector3 toCamera = cameraPosition - cachedTransform.position;
        toCamera.y = 0f;

        float distance = toCamera.magnitude;
        if (distance <= stopDistanceFromCamera || distance <= 0.001f)
        {
            NotifyReachedCamera();
            return;
        }

        Vector3 direction = toCamera / distance;
        cachedTransform.position += direction * approachSpeed * Time.deltaTime;

        if (faceCameraWhileApproaching)
        {
            cachedTransform.rotation = Quaternion.LookRotation(direction, Vector3.up);
        }
    }

    private void NotifyReachedCamera()
    {
        if (hasReachedCamera || isPlaced || isLocked || isInsideBlackHole)
        {
            return;
        }

        hasReachedCamera = true;

        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.NotifyEnemyReachedPlayer(this);
        }
    }

    private IEnumerator DropToGroundRoutine()
    {
        Vector3 targetPosition = cachedTransform.position;
        targetPosition.y = startPosition.y;
        Vector3 fromPosition = cachedTransform.position;
        Vector3 fromScale = cachedTransform.localScale;
        Quaternion fromRotation = cachedTransform.rotation;
        float elapsed = 0f;

        while (elapsed < FallDuration)
        {
            elapsed += Time.deltaTime;
            float t = EaseOutCubic(Mathf.Clamp01(elapsed / FallDuration));

            cachedTransform.position = Vector3.Lerp(fromPosition, targetPosition, t);
            cachedTransform.localScale = Vector3.Lerp(fromScale, startScale, t);
            cachedTransform.rotation = Quaternion.Slerp(fromRotation, startRotation, t);

            yield return null;
        }

        cachedTransform.position = targetPosition;
        cachedTransform.localScale = startScale;
        cachedTransform.rotation = startRotation;
        isLocked = false;
        currentHole = null;
        activeAnimation = null;
    }

    private IEnumerator BlackHoleRoutine(HoleTrigger hole)
    {
        Vector3 center = hole.GetSnapPosition();
        Vector3 spiralStart = cachedTransform.position;
        Vector3 orbitAxis = Vector3.forward;
        Vector3 radial = spiralStart - center;
        float startDepthOffset = radial.z;

        if (radial.sqrMagnitude < 0.001f)
        {
            radial = cachedTransform.right;
        }

        Vector3 planarRadial = Vector3.ProjectOnPlane(radial, orbitAxis);
        if (planarRadial.sqrMagnitude < 0.001f)
        {
            planarRadial = Vector3.forward;
        }

        float startRadius = planarRadial.magnitude;
        Vector3 radialDirection = planarRadial.normalized;

        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.PlayHoleDropSound();
        }

        Vector3 swirlScaleStart = cachedTransform.localScale;
        Vector3 swirlScaleEnd = startScale * blackHoleScaleMultiplier;
        float moveDuration = Mathf.Max(0.01f, blackHoleMoveDuration);
        float elapsed = 0f;

        while (elapsed < moveDuration)
        {
            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / moveDuration);
            float eased = EaseInCubic(t);
            float radius = Mathf.Lerp(startRadius, 0f, eased);
            float depthOffset = Mathf.Lerp(startDepthOffset, 0f, eased);
            Quaternion orbitRotation = Quaternion.AngleAxis(blackHoleSpinDegreesPerSecond * elapsed, orbitAxis);

            cachedTransform.position = center + (orbitRotation * radialDirection * radius) + (orbitAxis * depthOffset);
            cachedTransform.localScale = Vector3.Lerp(swirlScaleStart, swirlScaleEnd, eased);
            cachedTransform.Rotate(orbitAxis, blackHoleSpinDegreesPerSecond * Time.deltaTime, Space.World);

            yield return null;
        }

        cachedTransform.position = center;
        cachedTransform.localScale = swirlScaleEnd;

        isPlaced = true;
        SetCollidersEnabled(false);

        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.NotifyEnemyPlaced(this);
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }

        Vector3 dropPosition = placedMoveTarget != null ? placedMoveTarget.position : hole.GetDropPosition();
        cachedTransform.position = dropPosition;
        cachedTransform.localScale = startScale;
        cachedTransform.rotation = startRotation;
        SetCollidersEnabled(true);
        waitingForPlacedLanding = true;
        hasPlayedPlacedLanding = false;
        isInsideBlackHole = false;
        currentHole = null;

        if (dropWithPhysics)
        {
            StartFreeFall();
        }
        else
        {
            isLocked = false;
        }

        activeAnimation = null;
    }

    private void StartFreeFall()
    {
        if (cachedRigidbody == null)
        {
            cachedRigidbody = gameObject.AddComponent<Rigidbody>();
        }

        cachedRigidbody.isKinematic = false;
        cachedRigidbody.useGravity = true;
        cachedRigidbody.velocity = Vector3.zero;
        cachedRigidbody.angularVelocity = Vector3.zero;
    }

    private void SetRigidbodyControlled(bool isControlled)
    {
        if (cachedRigidbody == null)
        {
            return;
        }

        cachedRigidbody.velocity = Vector3.zero;
        cachedRigidbody.angularVelocity = Vector3.zero;
        cachedRigidbody.useGravity = !isControlled;
        cachedRigidbody.isKinematic = isControlled;
    }

    private void EnableRigidbodyAfterLanding()
    {
        if (cachedRigidbody == null)
        {
            cachedRigidbody = gameObject.AddComponent<Rigidbody>();
        }

        cachedRigidbody.isKinematic = false;
        cachedRigidbody.useGravity = true;
        cachedRigidbody.velocity = Vector3.zero;
        cachedRigidbody.angularVelocity = Vector3.zero;
    }

    private void OnCollisionEnter(Collision collision)
    {
        TryHandlePlacedLanding(collision.collider.gameObject.layer);
    }

    private void OnTriggerEnter(Collider other)
    {
        TryHandlePlacedLanding(other.gameObject.layer);
    }

    private void TryHandlePlacedLanding(int layer)
    {
        if (!waitingForPlacedLanding || hasPlayedPlacedLanding)
        {
            return;
        }

        if ((landingLayerMask.value & (1 << layer)) == 0)
        {
            return;
        }

        hasPlayedPlacedLanding = true;
        waitingForPlacedLanding = false;
        EnableRigidbodyAfterLanding();

        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.PlayHighFallLandingSound();
        }

        PlayLandingParticle();
        StartLandedWander();
    }

    private IEnumerator AnimateTransform(
        Vector3 fromPosition,
        Vector3 toPosition,
        Vector3 fromScale,
        Vector3 toScale,
        Quaternion fromRotation,
        Quaternion toRotation,
        float duration)
    {
        if (duration <= 0f)
        {
            cachedTransform.position = toPosition;
            cachedTransform.localScale = toScale;
            cachedTransform.rotation = toRotation;
            yield break;
        }

        float elapsed = 0f;
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = EaseOutCubic(Mathf.Clamp01(elapsed / duration));

            cachedTransform.position = Vector3.Lerp(fromPosition, toPosition, t);
            cachedTransform.localScale = Vector3.Lerp(fromScale, toScale, t);
            cachedTransform.rotation = Quaternion.Slerp(fromRotation, toRotation, t);

            yield return null;
        }

        cachedTransform.position = toPosition;
        cachedTransform.localScale = toScale;
        cachedTransform.rotation = toRotation;
    }

    private void StopActiveAnimation()
    {
        if (activeAnimation == null)
        {
            return;
        }

        StopCoroutine(activeAnimation);
        activeAnimation = null;
    }

    private void OnDisable()
    {
        StopIdleSoundLoop();
        StopLandedWander();
    }

    private void SetCollidersEnabled(bool isEnabled)
    {
        if (cachedColliders == null)
        {
            return;
        }

        for (int i = 0; i < cachedColliders.Length; i++)
        {
            if (cachedColliders[i] != null)
            {
                cachedColliders[i].enabled = isEnabled;
            }
        }
    }

    private void PlayDeadAnimation()
    {
        Transform deathRoot = animator != null ? animator.transform : cachedTransform;

        Animator deathAnimator = deathRoot.GetComponent<Animator>();
        if (deathAnimator != null)
        {
            deathAnimator.enabled = false;
        }

        DeathRotateBody deathRotateBody = deathRoot.GetComponent<DeathRotateBody>();
        if (deathRotateBody == null)
        {
            deathRotateBody = deathRoot.gameObject.AddComponent<DeathRotateBody>();
        }

        deathRotateBody.Play(deathRotateXAngle, deathRotateDuration);
    }

    private void StartLandedWander()
    {
        if (!wanderAfterLanding || landedWanderRadius <= 0f || landedWanderSpeed <= 0f)
        {
            isLocked = false;
            return;
        }

        StopLandedWander();
        isLocked = true;
        landedWanderLoop = StartCoroutine(LandedWanderRoutine(cachedTransform.position));
    }

    private void StopLandedWander()
    {
        if (landedWanderLoop == null)
        {
            return;
        }

        StopCoroutine(landedWanderLoop);
        landedWanderLoop = null;
    }

    private IEnumerator LandedWanderRoutine(Vector3 center)
    {
        while (isPlaced && isActiveAndEnabled)
        {
            Vector2 offset = Random.insideUnitCircle * landedWanderRadius;
            Vector3 targetPosition = center + new Vector3(offset.x, 0f, offset.y);

            while (isPlaced && isActiveAndEnabled)
            {
                Vector3 toTarget = targetPosition - cachedTransform.position;
                toTarget.y = 0f;

                if (toTarget.sqrMagnitude <= 0.01f)
                {
                    break;
                }

                Vector3 moveDirection = toTarget.normalized;
                Vector3 nextPosition = Vector3.MoveTowards(
                    cachedTransform.position,
                    targetPosition,
                    landedWanderSpeed * Time.deltaTime);

                if (moveDirection.sqrMagnitude > 0.001f)
                {
                    Quaternion targetRotation = Quaternion.LookRotation(moveDirection, Vector3.up);
                    Quaternion nextRotation = Quaternion.RotateTowards(
                        cachedTransform.rotation,
                        targetRotation,
                        landedTurnSpeed * Time.deltaTime);

                    if (cachedRigidbody != null && !cachedRigidbody.isKinematic)
                    {
                        cachedRigidbody.MoveRotation(nextRotation);
                    }
                    else
                    {
                        cachedTransform.rotation = nextRotation;
                    }
                }

                if (cachedRigidbody != null && !cachedRigidbody.isKinematic)
                {
                    cachedRigidbody.MovePosition(nextPosition);
                }
                else
                {
                    cachedTransform.position = nextPosition;
                }

                yield return null;
            }

            float waitDuration = Random.Range(
                Mathf.Min(landedWanderWaitRange.x, landedWanderWaitRange.y),
                Mathf.Max(landedWanderWaitRange.x, landedWanderWaitRange.y));

            if (waitDuration > 0f)
            {
                yield return new WaitForSeconds(waitDuration);
            }
            else
            {
                yield return null;
            }
        }

        landedWanderLoop = null;
    }

    private void PlayLandingParticle()
    {
        if (landingParticle == null)
        {
            return;
        }

        landingParticle.transform.position = cachedTransform.position;
        landingParticle.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
        landingParticle.Play();
    }

    private void PlayOneShot(AudioClip clip)
    {
        if (clip == null || audioSource == null)
        {
            return;
        }

        audioSource.PlayOneShot(clip, soundVolume);
    }

    private void PlayIdleSound()
    {
        if (isPlaced || idleSound == null || audioSource == null || audioSource.isPlaying)
        {
            return;
        }

        PlayOneShot(idleSound);
    }

    private void StartIdleSoundLoop()
    {
        float maxRepeatDelay = Mathf.Max(idleSoundRepeatIntervalRange.x, idleSoundRepeatIntervalRange.y);
        if (idleSoundLoop != null || maxRepeatDelay <= 0f || idleSound == null)
        {
            return;
        }

        idleSoundLoop = StartCoroutine(IdleSoundLoopRoutine());
    }

    private void StopIdleSoundLoop()
    {
        if (idleSoundLoop == null)
        {
            return;
        }

        StopCoroutine(idleSoundLoop);
        idleSoundLoop = null;
    }

    private IEnumerator IdleSoundLoopRoutine()
    {
        while (!isPlaced && isActiveAndEnabled)
        {
            float repeatDelay = Random.Range(
                Mathf.Min(idleSoundRepeatIntervalRange.x, idleSoundRepeatIntervalRange.y),
                Mathf.Max(idleSoundRepeatIntervalRange.x, idleSoundRepeatIntervalRange.y));

            yield return new WaitForSeconds(repeatDelay);

            if (isPlaced || !isActiveAndEnabled)
            {
                break;
            }

            PlayIdleSound();
        }

        idleSoundLoop = null;
    }

    private Camera GetGameplayCamera()
    {
        if (PlayableGameController.Instance != null)
        {
            return PlayableGameController.Instance.GetGameplayCamera();
        }

        return Camera.main;
    }

    private static float EaseOutCubic(float t)
    {
        t = 1f - t;
        return 1f - (t * t * t);
    }

    private static float EaseInCubic(float t)
    {
        return t * t * t;
    }
}
