using System.Collections;
using UnityEngine;

[DisallowMultipleComponent]
public class DraggableEnemy : MonoBehaviour
{
    private const float HoleAttractRange = 4f;
    private const float HoleAutoPlaceDistance = 0.2f;
    private const float FallDuration = 0.18f;
    [Header("Drag")]
    [SerializeField] private float moveHeightWhileDrag = 1f;
    [SerializeField] private float dragScaleMultiplier = 1.08f;
    [SerializeField] private float dragMoveSpeed = 14f;
    [SerializeField] private float maxDragDistanceFromStart = 4f;
    [SerializeField] private Transform dragBoundsCenter;
    [SerializeField] private Vector2 dragBoundsSize = new Vector2(8f, 8f);
    [SerializeField] private bool useRectDragBounds;

    [Header("Animation")]
    [SerializeField] private float returnDuration = 0.25f;
    [SerializeField] private float snapDuration = 0.15f;
    [SerializeField] private float sinkDuration = 0.3f;
    [SerializeField] private float deathRotateXAngle = 90f;
    [SerializeField] private float deathRotateDuration = 0.15f;

    [Header("Placed Result")]
    [SerializeField] private Transform placedMoveTarget;
    [SerializeField] private LayerMask landingLayerMask = ~0;
    [SerializeField] private ParticleSystem landingParticle;
    [SerializeField] private Animator animator;
    [SerializeField] private string deadTriggerName = "Dead";
    [SerializeField] private string deadStateName = "Dead";

    [Header("Sound")]
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AudioClip idleSound;
    [SerializeField] private AudioClip deadSound;
    [SerializeField] private float soundVolume = 1f;
    [SerializeField] private Vector2 idleSoundRepeatIntervalRange = new Vector2(2f, 4f);

    [Header("State")]
    [SerializeField] private bool isPlaced;

    private const float DragScaleLerpSpeed = 14f;
    private const float MinimumSinkDistance = 1.5f;
    private const float SinkScaleMultiplier = 0.8f;

    private Transform cachedTransform;
    private Vector3 startPosition;
    private Vector3 startScale;
    private Quaternion startRotation;
    private Vector3 dragTargetPosition;
    private Plane dragPlane;
    private HoleTrigger currentHole;
    private Coroutine activeAnimation;
    private Renderer[] cachedRenderers;
    private Collider[] cachedColliders;
    private float cachedVisualHeight = 1f;
    private Coroutine idleSoundLoop;
    private bool isDragging;
    private bool isLocked;
    private bool waitingForPlacedLanding;
    private bool hasPlayedPlacedLanding;
    private int deadTriggerHash;
    private int deadStateHash;

    public bool IsPlaced
    {
        get { return isPlaced; }
    }

    private void Awake()
    {
        cachedTransform = transform;
        startPosition = cachedTransform.position;
        startScale = cachedTransform.localScale;
        startRotation = cachedTransform.rotation;
        dragTargetPosition = startPosition;
        dragPlane = new Plane(Vector3.up, startPosition);
        cachedRenderers = GetComponentsInChildren<Renderer>(true);
        cachedColliders = GetComponentsInChildren<Collider>(true);
        cachedVisualHeight = CalculateVisualHeight();
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
        if (!isDragging)
        {
            return;
        }

        cachedTransform.position = Vector3.Lerp(
            cachedTransform.position,
            dragTargetPosition,
            Time.deltaTime * dragMoveSpeed);

        cachedTransform.localScale = Vector3.Lerp(
            cachedTransform.localScale,
            startScale * dragScaleMultiplier,
            Time.deltaTime * DragScaleLerpSpeed);

        cachedTransform.rotation = startRotation;
    }

    public bool CanBeginDrag()
    {
        return !isPlaced && !isLocked;
    }

    public void BeginDrag(Vector2 screenPosition)
    {
        if (!CanBeginDrag())
        {
            return;
        }

        StopActiveAnimation();

        isDragging = true;
        isLocked = true;
        currentHole = null;
        cachedTransform.rotation = startRotation;

        Vector3 planePoint;
        if (TryGetPlanePoint(screenPosition, out planePoint))
        {
            UpdateDrag(screenPosition);
        }
        else
        {
            dragTargetPosition = new Vector3(startPosition.x, startPosition.y + moveHeightWhileDrag, startPosition.z);
        }
    }

    public void UpdateDrag(Vector2 screenPosition)
    {
        if (!isDragging)
        {
            return;
        }

        Vector3 planePoint;
        if (!TryGetPlanePoint(screenPosition, out planePoint))
        {
            return;
        }

        planePoint.y = startPosition.y + moveHeightWhileDrag;
        planePoint = ClampDragPosition(planePoint);
        currentHole = HoleTrigger.GetClosestHole(planePoint);

        if (currentHole != null)
        {
            Vector3 holePosition = currentHole.GetSnapPosition();
            holePosition.y = planePoint.y;

            float distanceToHole = Vector3.Distance(planePoint, holePosition);
            if (distanceToHole <= HoleAttractRange)
            {
                float attractStrength = 1f - Mathf.Clamp01(distanceToHole / HoleAttractRange);
                planePoint = Vector3.Lerp(planePoint, holePosition, attractStrength);
                planePoint = ClampDragPosition(planePoint);
            }

            if (Vector3.Distance(cachedTransform.position, holePosition) <= HoleAutoPlaceDistance)
            {
                dragTargetPosition = holePosition;
                isDragging = false;
                activeAnimation = StartCoroutine(PlaceIntoHoleRoutine(currentHole));
                return;
            }
        }

        dragTargetPosition = planePoint;
        cachedTransform.rotation = startRotation;
    }

    public void EndDrag()
    {
        if (!isDragging)
        {
            return;
        }

        isDragging = false;
        cachedTransform.rotation = startRotation;

        if (currentHole != null)
        {
            Vector3 holePosition = currentHole.GetSnapPosition();
            holePosition.y = startPosition.y + moveHeightWhileDrag;

            if (Vector3.Distance(cachedTransform.position, holePosition) <= HoleAttractRange)
            {
                activeAnimation = StartCoroutine(PlaceIntoHoleRoutine(currentHole));
                return;
            }
        }

        activeAnimation = StartCoroutine(DropToGroundRoutine());
    }

    public void SetCurrentHole(HoleTrigger hole, bool isInside)
    {
        if (isPlaced || !isLocked)
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

    private bool TryGetPlanePoint(Vector2 screenPosition, out Vector3 planePoint)
    {
        planePoint = Vector3.zero;

        Camera gameplayCamera = PlayableGameController.Instance != null
            ? PlayableGameController.Instance.GetGameplayCamera()
            : Camera.main;

        if (gameplayCamera == null)
        {
            return false;
        }

        Ray ray = gameplayCamera.ScreenPointToRay(screenPosition);
        float enter;
        if (!dragPlane.Raycast(ray, out enter))
        {
            return false;
        }

        planePoint = ray.GetPoint(enter);
        return true;
    }

    private Vector3 ClampDragPosition(Vector3 position)
    {
        if (useRectDragBounds)
        {
            Vector3 center = dragBoundsCenter != null ? dragBoundsCenter.position : startPosition;
            float halfX = dragBoundsSize.x * 0.5f;
            float halfZ = dragBoundsSize.y * 0.5f;

            position.x = Mathf.Clamp(position.x, center.x - halfX, center.x + halfX);
            position.z = Mathf.Clamp(position.z, center.z - halfZ, center.z + halfZ);
            return position;
        }

        Vector3 fromStart = position - startPosition;
        fromStart.y = 0f;

        if (fromStart.sqrMagnitude > maxDragDistanceFromStart * maxDragDistanceFromStart)
        {
            fromStart = fromStart.normalized * maxDragDistanceFromStart;
            position.x = startPosition.x + fromStart.x;
            position.z = startPosition.z + fromStart.z;
        }

        return position;
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

    private IEnumerator PlaceIntoHoleRoutine(HoleTrigger hole)
    {
        Vector3 snapPosition = hole.GetSnapPosition();
        Quaternion snapRotation = startRotation;
        Vector3 dragScale = startScale * dragScaleMultiplier;

        StopIdleSoundLoop();

        yield return AnimateTransform(
            cachedTransform.position,
            snapPosition,
            cachedTransform.localScale,
            dragScale,
            cachedTransform.rotation,
            snapRotation,
            snapDuration);

        cachedTransform.position = snapPosition;
        cachedTransform.rotation = snapRotation;

        float sinkDistance = Mathf.Max(MinimumSinkDistance, cachedVisualHeight + hole.GetExtraSinkOffset());
        Vector3 sinkTarget = snapPosition + (Vector3.down * sinkDistance);
        Vector3 sinkScale = startScale * SinkScaleMultiplier;

        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.PlayHoleDropSound();
        }

        yield return AnimateTransform(
            snapPosition,
            sinkTarget,
            cachedTransform.localScale,
            sinkScale,
            snapRotation,
            snapRotation,
            sinkDuration);

        isPlaced = true;
        cachedTransform.position = sinkTarget;
        cachedTransform.localScale = sinkScale;
        isLocked = true;
        SetCollidersEnabled(false);

        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.NotifyEnemyPlaced(this);
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }

        Vector3 targetPosition = placedMoveTarget != null ? placedMoveTarget.position : startPosition;
        cachedTransform.position = targetPosition;
        cachedTransform.localScale = startScale;
        cachedTransform.rotation = startRotation * Quaternion.Euler(-90f, 0f, 0f);
        SetCollidersEnabled(true);
        waitingForPlacedLanding = true;
        hasPlayedPlacedLanding = false;

        activeAnimation = null;
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
        if (PlayableGameController.Instance != null)
        {
            PlayableGameController.Instance.PlayHighFallLandingSound();
        }

        PlayLandingParticle();
        PlayOneShot(deadSound);
        PlayDeadAnimation();
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

    private float CalculateVisualHeight()
    {
        if (cachedRenderers == null || cachedRenderers.Length == 0)
        {
            return 1f;
        }

        Bounds bounds = cachedRenderers[0].bounds;
        for (int i = 1; i < cachedRenderers.Length; i++)
        {
            bounds.Encapsulate(cachedRenderers[i].bounds);
        }

        return Mathf.Max(1f, bounds.size.y);
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

    private static float EaseOutCubic(float t)
    {
        t = 1f - t;
        return 1f - (t * t * t);
    }
}
