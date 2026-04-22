using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class BoatAutoMoveController : MonoBehaviour
{
    [Header("Move")]
    public float forwardSpeed = 5f;

    [Header("Input")]
    public Camera inputCamera;
    public bool ignorePointerOverUI = true;
    public float fullTurnAngle = 75f;

    [Header("Fish Catch")]
    public Transform catchOrigin;
    public Transform catchTarget;
    public float fishCatchDistance = 2.5f;
    public Vector3 catchTargetOffset = new Vector3(0f, 0.35f, 0f);

    [Header("Fish Catch Button")]
    public Button fishCatchButton;
    public RectTransform fishCatchButtonParent;
    public float fishCatchButtonPadding = 20f;

    [Header("Debug Catch")]
    public bool enableCatchDebugLog = true;
    public bool requireFishJumping = true;

    [Header("Catch Range Visual")]
    public bool showCatchRange = true;
    public LineRenderer catchRangeRenderer;
    public Material catchRangeMaterial;
    public Color catchRangeColor = new Color(1f, 0.9f, 0.2f, 0.95f);
    public float catchRangeLineWidth = 0.08f;
    [Range(16, 128)] public int catchRangeSegments = 48;
    public float catchRangeHeightOffset = 0.05f;

    [Header("Turn")]
    public float turnSpeed = 60f;
    public float turnInputResponse = 4f;

    [Header("Ground / Step Up Only")]
    public LayerMask groundLayer;
    public float forwardCheckDistance = 1f;
    public float sideCheckOffset = 0.5f;
    public float checkDownStartHeight = 2f;
    public float checkDownDistance = 6f;
    public float maxStepUpHeight = 1.1f;
    public float heightSmoothTime = 0.08f;
    public float groundOffset = 0.02f;
    public float blockedHeightBuffer = 0.05f;

    [Header("Fall")]
    public bool allowFallOffEdge = true;
    public float gravity = 25f;
    public float maxFallSpeed = 30f;
    public float edgeGraceDistance = 0.05f;

    [Header("Ride Height")]
    public bool autoDetectRideHeightFromCollider = true;
    public float rideHeight = 0.5f;

    [Header("Anti Stuck")]
    public float wallCheckHeight = 0.6f;
    public float wallCheckDistance = 0.35f;
    public float wallSideInset = 0.15f;

    [Header("Boat Visual")]
    public Transform boatModel;
    public float boatVisualYawAngle = 25f;
    public float boatVisualTiltAngle = 15f;
    public float boatVisualRotateSpeed = 8f;

    [Header("Player")]
    public Transform playerModel;
    public float playerRotateSpeed = 10f;

    [Header("Boat Move Sound")]
    public AudioSource moveAudioSource;
    public List<AudioClip> moveSounds;
    public float minPitch = 0.9f;
    public float maxPitch = 1.1f;

    [Header("Boat Death Sound")]
    public AudioSource deathAudioSource;
    public AudioClip deathSound;
    public ParticleSystem deathEffect;

    private float buttonTurnInput;
    private float screenTurnInput;
    private float currentTurnInput;
    private bool hasScreenMoveInput;
    private bool isMouseMoveHeld;
    private int activeTouchId = -1;
    private Vector3 desiredMoveDirection = Vector3.forward;

    private Vector3 lastMoveDirection = Vector3.forward;
    private Quaternion defaultBoatLocalRotation;
    private Collider cachedCol;
    private Material runtimeCatchRangeMaterial;
    private RectTransform fishCatchButtonRect;
    private JumpingFish pendingCatchFish;

    private float verticalVelocity;
    private bool isFalling;

    private void Start()
    {
        cachedCol = GetComponent<Collider>();

        if (inputCamera == null)
            inputCamera = Camera.main;

        if (catchOrigin == null)
            catchOrigin = transform;

        if (catchTarget == null)
            catchTarget = transform;

        if (LunaManager.ins != null)
        {
            forwardSpeed = LunaManager.ins.playerSpeed;
            turnSpeed = LunaManager.ins.playerRotate;
        }

        if (boatModel != null)
            defaultBoatLocalRotation = boatModel.localRotation;

        InitializeFishCatchButton();
        InitializeCatchRangeVisual();
        UpdateCatchRangeVisual();

        LogCatch("BoatAutoMoveController Start completed.");
    }

    private void Update()
    {
        if (LunaManager.ins != null &&
            (LunaManager.ins.isCretivePause || (TutorialBuildBlock.ins != null && !TutorialBuildBlock.ins.isCompleteTutorial)))
        {
            ClearAllMoveInput();
            StopMoveSound();
            HideFishCatchButton();
            return;
        }

        UpdatePointerMoveInput();
        UpdateTurn();
        MoveForwardStepUpOnlyWithFall();
        RotateBoatVisual();
        RotatePlayerFollowMoveDirection();
        UpdateCatchRangeVisual();
        UpdateFishCatchButton();
        HandleMoveSound();
    }

    void HandleMoveSound()
    {
        if (IsMoveInputActive())
            PlayMoveSound();
        else
            StopMoveSound();
    }

    void PlayMoveSound()
    {
        if (moveAudioSource == null || moveSounds == null || moveSounds.Count == 0)
            return;

        if (!moveAudioSource.isPlaying)
        {
            int index = Random.Range(0, moveSounds.Count);
            moveAudioSource.clip = moveSounds[index];
            moveAudioSource.pitch = Random.Range(minPitch, maxPitch);
            moveAudioSource.loop = true;
            moveAudioSource.Play();
        }
    }

    void StopMoveSound()
    {
        if (moveAudioSource != null && moveAudioSource.isPlaying)
            moveAudioSource.Stop();
    }

    void PlayDeathSound()
    {
        if (deathAudioSource == null || deathSound == null)
            return;

        deathAudioSource.PlayOneShot(deathSound);
    }

    void UpdateTurn()
    {
        if (hasScreenMoveInput)
            screenTurnInput = GetTurnInputForDirection(desiredMoveDirection);

        float targetTurnInput = hasScreenMoveInput ? screenTurnInput : buttonTurnInput;

        currentTurnInput = Mathf.MoveTowards(
            currentTurnInput,
            targetTurnInput,
            turnInputResponse * Time.deltaTime
        );

        if (Mathf.Abs(currentTurnInput) < 0.001f)
            currentTurnInput = 0f;

        if (currentTurnInput != 0f)
            transform.Rotate(0f, currentTurnInput * turnSpeed * Time.deltaTime, 0f);
    }

    void MoveForwardStepUpOnlyWithFall()
    {
        Vector3 moveDir = transform.forward;
        moveDir.y = 0f;

        if (moveDir.sqrMagnitude < 0.0001f)
            return;

        moveDir.Normalize();

        Vector3 currentPos = transform.position;
        Vector3 nextPos = currentPos;
        float moveSpeed = IsMoveInputActive() ? forwardSpeed : 0f;
        float bottomOffset = 0f;

        if (moveSpeed <= 0.001f)
        {
            Vector3 sampleDir = lastMoveDirection.sqrMagnitude > 0.001f ? lastMoveDirection : moveDir;
            float idleGroundY = SampleGroundHeightStable(currentPos, sampleDir, out bool hasGround);

            bottomOffset = GetBottomOffset();
            float targetGroundTop = idleGroundY + bottomOffset + groundOffset;

            if (hasGround && currentPos.y <= targetGroundTop + edgeGraceDistance)
            {
                nextPos.y = Mathf.SmoothDamp(
                    currentPos.y,
                    targetGroundTop,
                    ref verticalVelocity,
                    heightSmoothTime
                );

                isFalling = false;
            }
            else
            {
                ApplyFall(ref nextPos);
            }

            transform.position = nextPos;
            return;
        }

        lastMoveDirection = moveDir;

        Vector3 targetXZ = currentPos + moveDir * moveSpeed * Time.deltaTime;
        bool blocked = IsFrontBlocked(currentPos, moveDir);

        float currentGroundY = SampleGroundHeightStable(currentPos, moveDir, out bool hasCurrentGround);
        float nextGroundY = SampleGroundHeightStableAtFront(targetXZ, moveDir, out bool hasNextGround);

        if (!blocked)
        {
            nextPos.x = targetXZ.x;
            nextPos.z = targetXZ.z;
        }

        bottomOffset = GetBottomOffset();

        float currentTargetGroundTop = currentGroundY + bottomOffset + groundOffset;
        float nextTargetGroundTop = nextGroundY + bottomOffset + groundOffset;

        bool groundedNow = hasCurrentGround && currentPos.y <= currentTargetGroundTop + edgeGraceDistance;

        if (hasCurrentGround && hasNextGround)
        {
            float diff = nextGroundY - currentGroundY;

            if (diff > 0f)
            {
                if (diff <= maxStepUpHeight + blockedHeightBuffer && !blocked)
                {
                    nextPos.y = Mathf.SmoothDamp(
                        currentPos.y,
                        nextTargetGroundTop,
                        ref verticalVelocity,
                        heightSmoothTime
                    );

                    isFalling = false;
                }
                else
                {
                    nextPos = currentPos;
                    verticalVelocity = 0f;
                }
            }
            else
            {
                if (groundedNow)
                {
                    nextPos.y = Mathf.SmoothDamp(
                        currentPos.y,
                        currentTargetGroundTop,
                        ref verticalVelocity,
                        heightSmoothTime
                    );
                }
                else
                {
                    ApplyFall(ref nextPos);
                }
            }
        }
        else
        {
            ApplyFall(ref nextPos);
        }

        transform.position = nextPos;
    }

    void UpdatePointerMoveInput()
    {
        if (Input.touchCount > 0)
        {
            isMouseMoveHeld = false;
            UpdateTouchMoveInput();
            return;
        }

        if (activeTouchId != -1)
        {
            activeTouchId = -1;
            ClearScreenMoveInput();
        }

        UpdateMouseMoveInput();
    }

    void UpdateMouseMoveInput()
    {
        if (Input.GetMouseButtonDown(0))
        {
            if (ShouldIgnorePointer(-1))
            {
                ClearScreenMoveInput();
                return;
            }

            isMouseMoveHeld = true;
        }

        if (Input.GetMouseButtonUp(0))
        {
            isMouseMoveHeld = false;
            ClearScreenMoveInput();
            return;
        }

        if (!isMouseMoveHeld)
            return;

        if (!Input.GetMouseButton(0))
        {
            isMouseMoveHeld = false;
            ClearScreenMoveInput();
            return;
        }

        SetMoveDirectionFromScreenPosition(Input.mousePosition);
    }

    void UpdateTouchMoveInput()
    {
        if (activeTouchId == -1)
        {
            for (int i = 0; i < Input.touchCount; i++)
            {
                Touch touch = Input.GetTouch(i);

                if (touch.phase != TouchPhase.Began)
                    continue;

                if (ShouldIgnorePointer(touch.fingerId))
                    continue;

                activeTouchId = touch.fingerId;
                SetMoveDirectionFromScreenPosition(touch.position);
                return;
            }

            ClearScreenMoveInput();
            return;
        }

        for (int i = 0; i < Input.touchCount; i++)
        {
            Touch touch = Input.GetTouch(i);

            if (touch.fingerId != activeTouchId)
                continue;

            if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                activeTouchId = -1;
                ClearScreenMoveInput();
                return;
            }

            SetMoveDirectionFromScreenPosition(touch.position);
            return;
        }

        activeTouchId = -1;
        ClearScreenMoveInput();
    }

    void SetMoveDirectionFromScreenPosition(Vector2 screenPosition)
    {
        Camera cam = inputCamera != null ? inputCamera : Camera.main;
        if (cam == null)
        {
            ClearScreenMoveInput();
            return;
        }

        Ray ray = cam.ScreenPointToRay(screenPosition);
        Plane movePlane = new Plane(Vector3.up, new Vector3(0f, transform.position.y, 0f));

        if (!movePlane.Raycast(ray, out float enter))
        {
            ClearScreenMoveInput();
            return;
        }

        Vector3 worldPoint = ray.GetPoint(enter);
        Vector3 dir = worldPoint - transform.position;
        dir.y = 0f;

        if (dir.sqrMagnitude < 0.0001f)
            dir = transform.forward;

        desiredMoveDirection = dir.normalized;
        hasScreenMoveInput = true;
    }

    float GetTurnInputForDirection(Vector3 targetDirection)
    {
        Vector3 flatForward = transform.forward;
        flatForward.y = 0f;

        if (flatForward.sqrMagnitude < 0.0001f || targetDirection.sqrMagnitude < 0.0001f)
            return 0f;

        float signedAngle = Vector3.SignedAngle(flatForward.normalized, targetDirection.normalized, Vector3.up);
        return Mathf.Clamp(signedAngle / Mathf.Max(1f, fullTurnAngle), -1f, 1f);
    }

    bool IsMoveInputActive()
    {
        return hasScreenMoveInput || Mathf.Abs(buttonTurnInput) > 0.001f;
    }

    Transform GetCatchOrigin()
    {
        return catchOrigin != null ? catchOrigin : transform;
    }

    Vector3 GetCatchDestination()
    {
        if (catchTarget != null)
            return catchTarget.TransformPoint(catchTargetOffset);

        return transform.TransformPoint(catchTargetOffset);
    }

    void InitializeFishCatchButton()
    {
        if (fishCatchButton == null)
        {
            LogCatchError("fishCatchButton is NULL. Please assign it in Inspector.");
            return;
        }

        fishCatchButtonRect = fishCatchButton.GetComponent<RectTransform>();

        if (fishCatchButtonRect == null)
        {
            LogCatchError("fishCatchButton does not have RectTransform.");
            return;
        }

        if (fishCatchButtonParent == null)
            fishCatchButtonParent = fishCatchButtonRect.parent as RectTransform;

        if (fishCatchButtonParent == null)
            LogCatchError("fishCatchButtonParent is NULL.");

        fishCatchButton.onClick.RemoveListener(OnFishCatchButtonClicked);
        fishCatchButton.onClick.AddListener(OnFishCatchButtonClicked);
        fishCatchButton.gameObject.SetActive(false);

        LogCatch("Fish catch button initialized.");
    }

    void UpdateFishCatchButton()
    {
        if (fishCatchButton == null)
            return;

        JumpingFish catchableFish = FindCatchableJumpingFish();

        if (catchableFish == null)
        {
            HideFishCatchButton();
            return;
        }

        if (pendingCatchFish != catchableFish || !fishCatchButton.gameObject.activeSelf)
        {
            pendingCatchFish = catchableFish;
            ShowFishCatchButtonAtRandomPosition();
            LogCatch("Show Catch button.");
        }

        fishCatchButton.interactable = true;
    }

    JumpingFish FindCatchableJumpingFish()
    {
        Transform origin = GetCatchOrigin();
        if (origin == null)
        {
            LogCatch("Catch fail: origin is null.");
            return null;
        }

        IReadOnlyList<JumpingFish> fishes = JumpingFish.ActiveFish;
        if (fishes == null || fishes.Count == 0)
        {
            LogCatch("Catch fail: ActiveFish empty.");
            return null;
        }

        JumpingFish closestFish = null;
        float closestDistanceSqr = float.MaxValue;

        Vector3 originPos = origin.position;
        originPos.y = 0f;

        for (int i = 0; i < fishes.Count; i++)
        {
            JumpingFish fish = fishes[i];

            if (fish == null)
                continue;

            if (fish.IsCaught)
                continue;

            if (requireFishJumping && !fish.IsJumping)
                continue;

            bool inRange = fish.IsInCatchRange(origin, fishCatchDistance);
            if (!inRange)
                continue;

            Vector3 fishPos = fish.InteractionPoint;
            fishPos.y = 0f;

            float distanceSqr = (fishPos - originPos).sqrMagnitude;
            if (distanceSqr < closestDistanceSqr)
            {
                closestDistanceSqr = distanceSqr;
                closestFish = fish;
            }
        }

        if (closestFish == null)
            LogCatch("Catch fail: no valid fish found.");

        return closestFish;
    }

    void ShowFishCatchButtonAtRandomPosition()
    {
        if (fishCatchButton == null)
            return;

        if (fishCatchButtonRect == null)
            fishCatchButtonRect = fishCatchButton.GetComponent<RectTransform>();

        if (fishCatchButtonRect == null)
            return;

        RectTransform parent = fishCatchButtonParent != null
            ? fishCatchButtonParent
            : fishCatchButtonRect.parent as RectTransform;

        if (parent == null)
        {
            LogCatchError("Cannot show Catch button because parent is null.");
            return;
        }

        /*fishCatchButtonRect.anchorMin = new Vector2(0.5f, 0.5f);
        fishCatchButtonRect.anchorMax = new Vector2(0.5f, 0.5f);
        fishCatchButtonRect.pivot = new Vector2(0.5f, 0.5f);

        Rect parentRect = parent.rect;
        Vector2 halfSize = fishCatchButtonRect.rect.size * 0.5f;
        float padding = Mathf.Max(0f, fishCatchButtonPadding);

        float minX = parentRect.xMin + padding + halfSize.x;
        float maxX = parentRect.xMax - padding - halfSize.x;
        float minY = parentRect.yMin + padding + halfSize.y;
        float maxY = parentRect.yMax - padding - halfSize.y;

        if (minX > maxX)
            minX = maxX = parentRect.center.x;

        if (minY > maxY)
            minY = maxY = parentRect.center.y;

        fishCatchButtonRect.anchoredPosition = new Vector2(
            Random.Range(minX, maxX),
            Random.Range(minY, maxY)
        );*/

        fishCatchButton.gameObject.SetActive(true);
    }

    void HideFishCatchButton()
    {
        pendingCatchFish = null;

        if (fishCatchButton != null && fishCatchButton.gameObject.activeSelf)
            fishCatchButton.gameObject.SetActive(false);
    }

    void OnFishCatchButtonClicked()
    {
        JumpingFish fish = pendingCatchFish;
        HideFishCatchButton();

        if (fish == null)
        {
            LogCatch("Click catch failed: pendingCatchFish null.");
            return;
        }

        if (fish.IsCaught)
        {
            LogCatch("Click catch failed: fish already caught.");
            return;
        }

        if (requireFishJumping && !fish.IsJumping)
        {
            LogCatch("Click catch failed: fish not jumping.");
            return;
        }

        fish.TryCatch(GetCatchOrigin(), fishCatchDistance, GetCatchDestination());
        LogCatch("Catch button clicked.");
    }

    void InitializeCatchRangeVisual()
    {
        if (!showCatchRange)
            return;

        if (catchRangeRenderer == null)
        {
            GameObject ringObject = new GameObject("CatchRangeVisual");
            ringObject.transform.SetParent(transform, false);
            catchRangeRenderer = ringObject.AddComponent<LineRenderer>();
        }

        catchRangeRenderer.loop = true;
        catchRangeRenderer.useWorldSpace = true;
        catchRangeRenderer.positionCount = Mathf.Max(16, catchRangeSegments);
        catchRangeRenderer.startWidth = catchRangeLineWidth;
        catchRangeRenderer.endWidth = catchRangeLineWidth;
        catchRangeRenderer.textureMode = LineTextureMode.Stretch;
        catchRangeRenderer.alignment = LineAlignment.View;
        catchRangeRenderer.numCapVertices = 2;
        catchRangeRenderer.numCornerVertices = 2;
        catchRangeRenderer.shadowCastingMode = ShadowCastingMode.Off;
        catchRangeRenderer.receiveShadows = false;
        catchRangeRenderer.enabled = true;
        catchRangeRenderer.startColor = catchRangeColor;
        catchRangeRenderer.endColor = catchRangeColor;

        if (catchRangeMaterial != null)
        {
            catchRangeRenderer.sharedMaterial = catchRangeMaterial;
            return;
        }

        if (catchRangeRenderer.sharedMaterial != null)
            return;

        Shader shader = Shader.Find("Sprites/Default");
        if (shader == null)
            shader = Shader.Find("Unlit/Color");

        if (shader == null)
            return;

        runtimeCatchRangeMaterial = new Material(shader);
        runtimeCatchRangeMaterial.hideFlags = HideFlags.HideAndDontSave;
        catchRangeRenderer.sharedMaterial = runtimeCatchRangeMaterial;
    }

    void UpdateCatchRangeVisual()
    {
        if (showCatchRange && catchRangeRenderer == null)
            InitializeCatchRangeVisual();

        if (catchRangeRenderer == null)
            return;

        bool canShow = showCatchRange && (LunaManager.ins == null || !LunaManager.ins.isCretivePause);
        catchRangeRenderer.enabled = canShow;

        if (!catchRangeRenderer.enabled)
            return;

        int segmentCount = Mathf.Max(16, catchRangeSegments);
        if (catchRangeRenderer.positionCount != segmentCount)
            catchRangeRenderer.positionCount = segmentCount;

        catchRangeRenderer.startWidth = catchRangeLineWidth;
        catchRangeRenderer.endWidth = catchRangeLineWidth;
        catchRangeRenderer.startColor = catchRangeColor;
        catchRangeRenderer.endColor = catchRangeColor;

        Vector3 center = GetCatchOrigin().position;
        center.y = transform.position.y + catchRangeHeightOffset;

        float angleStep = Mathf.PI * 2f / segmentCount;

        for (int i = 0; i < segmentCount; i++)
        {
            float angle = angleStep * i;
            Vector3 offset = new Vector3(Mathf.Cos(angle), 0f, Mathf.Sin(angle)) * fishCatchDistance;
            catchRangeRenderer.SetPosition(i, center + offset);
        }
    }

    private void OnDestroy()
    {
        if (runtimeCatchRangeMaterial != null)
            Destroy(runtimeCatchRangeMaterial);
    }

    bool ShouldIgnorePointer(int pointerId)
    {
        if (!ignorePointerOverUI || EventSystem.current == null)
            return false;

        return pointerId >= 0
            ? EventSystem.current.IsPointerOverGameObject(pointerId)
            : EventSystem.current.IsPointerOverGameObject();
    }

    void ClearScreenMoveInput()
    {
        hasScreenMoveInput = false;
        screenTurnInput = 0f;
    }

    void ClearAllMoveInput()
    {
        activeTouchId = -1;
        isMouseMoveHeld = false;
        buttonTurnInput = 0f;
        currentTurnInput = 0f;
        ClearScreenMoveInput();
    }

    void ApplyFall(ref Vector3 nextPos)
    {
        isFalling = true;

        verticalVelocity -= gravity * Time.deltaTime;
        if (verticalVelocity < -maxFallSpeed)
            verticalVelocity = -maxFallSpeed;

        nextPos.y += verticalVelocity * Time.deltaTime;
    }

    float GetBottomOffset()
    {
        if (!autoDetectRideHeightFromCollider || cachedCol == null)
            return rideHeight;

        return cachedCol.bounds.extents.y;
    }

    float SampleGroundHeightStable(Vector3 pos, Vector3 moveDir, out bool found)
    {
        Vector3 forward = moveDir.normalized;
        Vector3 right = Vector3.Cross(Vector3.up, forward).normalized;

        bool foundCenter = TryGetGroundY(pos, out float yCenter);
        if (foundCenter)
        {
            found = true;
            return yCenter;
        }

        bool foundLeft = TryGetGroundY(pos - right * sideCheckOffset, out float yLeft);
        bool foundRight = TryGetGroundY(pos + right * sideCheckOffset, out float yRight);

        found = foundLeft || foundRight;

        if (!found)
            return transform.position.y;

        if (foundLeft && foundRight)
            return Mathf.Max(yLeft, yRight);

        return foundLeft ? yLeft : yRight;
    }

    float SampleGroundHeightStableAtFront(Vector3 basePos, Vector3 moveDir, out bool found)
    {
        Vector3 forward = moveDir.normalized;
        Vector3 right = Vector3.Cross(Vector3.up, forward).normalized;

        Vector3 center = basePos + forward * Mathf.Max(0f, forwardCheckDistance - edgeGraceDistance);
        Vector3 left = center - right * sideCheckOffset;
        Vector3 rightPos = center + right * sideCheckOffset;

        bool foundCenter = TryGetGroundY(center, out float yCenter);
        if (foundCenter)
        {
            found = true;
            return yCenter;
        }

        bool foundLeft = TryGetGroundY(left, out float yLeft);
        bool foundRight = TryGetGroundY(rightPos, out float yRight);

        found = foundLeft || foundRight;

        if (!found)
            return transform.position.y;

        if (foundLeft && foundRight)
            return Mathf.Max(yLeft, yRight);

        return foundLeft ? yLeft : yRight;
    }

    bool TryGetGroundY(Vector3 worldPos, out float y)
    {
        Vector3 origin = worldPos + Vector3.up * checkDownStartHeight;

        RaycastHit[] hits = Physics.RaycastAll(
            origin,
            Vector3.down,
            checkDownDistance,
            groundLayer,
            QueryTriggerInteraction.Ignore
        );

        if (hits.Length == 0)
        {
            y = transform.position.y;
            return false;
        }

        float bestY = float.MinValue;
        bool found = false;

        for (int i = 0; i < hits.Length; i++)
        {
            if (Vector3.Dot(hits[i].normal, Vector3.up) > 0.5f)
            {
                if (hits[i].point.y > bestY)
                {
                    bestY = hits[i].point.y;
                    found = true;
                }
            }
        }

        if (found)
        {
            y = bestY;
            return true;
        }

        y = transform.position.y;
        return false;
    }

    bool IsFrontBlocked(Vector3 currentPos, Vector3 moveDir)
    {
        Vector3 forward = moveDir.normalized;
        Vector3 right = Vector3.Cross(Vector3.up, forward).normalized;

        float originY = GetBottomOffset() + 0.2f;

        Vector3 center = currentPos + Vector3.up * originY;
        Vector3 left = center - right * wallSideInset;
        Vector3 rightPos = center + right * wallSideInset;

        return RayBlocked(center, forward) || RayBlocked(left, forward) || RayBlocked(rightPos, forward);
    }

    bool RayBlocked(Vector3 origin, Vector3 forward)
    {
        if (Physics.Raycast(origin, forward, out RaycastHit hit, wallCheckDistance, groundLayer, QueryTriggerInteraction.Ignore))
        {
            float boatBottomY = transform.position.y - GetBottomOffset();
            float obstacleHeight = hit.point.y - boatBottomY;
            return obstacleHeight > maxStepUpHeight + blockedHeightBuffer;
        }

        return false;
    }

    void RotateBoatVisual()
    {
        if (boatModel == null)
            return;

        Quaternion targetLocalRotation = defaultBoatLocalRotation;

        if (Mathf.Abs(currentTurnInput) > 0.01f)
        {
            float targetYaw = currentTurnInput * boatVisualYawAngle;
            float targetRoll = -currentTurnInput * boatVisualTiltAngle;
            targetLocalRotation = defaultBoatLocalRotation * Quaternion.Euler(0f, targetYaw, targetRoll);
        }

        boatModel.localRotation = Quaternion.Lerp(
            boatModel.localRotation,
            targetLocalRotation,
            boatVisualRotateSpeed * Time.deltaTime
        );
    }

    void RotatePlayerFollowMoveDirection()
    {
        if (playerModel == null || lastMoveDirection.sqrMagnitude < 0.001f)
            return;

        Vector3 dir = lastMoveDirection;
        dir.y = 0f;

        Quaternion targetRotation = Quaternion.LookRotation(dir);
        playerModel.rotation = Quaternion.Lerp(
            playerModel.rotation,
            targetRotation,
            playerRotateSpeed * Time.deltaTime
        );
    }

    public void HoldLeft(bool isHold)
    {
        buttonTurnInput = isHold ? -1f : 0f;
    }

    public void HoldRight(bool isHold)
    {
        buttonTurnInput = isHold ? 1f : 0f;
    }

    public void ReleaseTurn()
    {
        buttonTurnInput = 0f;
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (!collision.gameObject.CompareTag("Respawn"))
            return;

        StopMoveSound();
        PlayDeathSound();

        if (deathEffect != null)
        {
            deathEffect.gameObject.SetActive(true);
            deathEffect.Play();
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
            LunaManager.ins.OnClickEndCard();
        }
    }

    void LogCatch(string message)
    {
        if (enableCatchDebugLog)
            Debug.Log("[BoatCatch] " + message);
    }

    void LogCatchError(string message)
    {
        Debug.LogError("[BoatCatch] " + message);
    }
}