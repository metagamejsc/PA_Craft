using UnityEngine;

[RequireComponent(typeof(Collider))]
public class EndlessRunnerPlayer : MonoBehaviour
{
    [Header("Lane")]
    [SerializeField] private int startLane = 1;
    [SerializeField] private int laneCount = 3;
    [SerializeField] private float laneWidth = 2.5f;
    [SerializeField] private float laneMoveSpeed = 12f;
    [SerializeField] private float swipeThresholdPixels = 45f;

    [Header("Forward Run")]
    [SerializeField] private float forwardSpeed = 8f;
    [SerializeField] private bool runOnStart = true;
    [SerializeField] private bool waitForTutorialCompletion = true;

    [Header("Finish")]
    [SerializeField] private string finishTag = "Finish";
    [SerializeField] private bool showEndCardOnFinish = true;

    [Header("Optional")]
    [SerializeField] private Transform modelRoot;
    [SerializeField] private Animator animator;
    [SerializeField] private string runBoolName = "isMoving";

    private int currentLane;
    private float targetX;
    private bool isRunning;
    private bool pointerDown;
    private Vector2 pointerStart;
    private Vector2 lastSwipeOrigin;
    private int runBoolHash;
    private Rigidbody cachedRigidbody;

    public int CurrentLane => currentLane;
    public bool IsRunning => isRunning;
    public float ForwardSpeed
    {
        get => forwardSpeed;
        set => forwardSpeed = Mathf.Max(0f, value);
    }

    private void Awake()
    {
        cachedRigidbody = GetComponent<Rigidbody>();
        runBoolHash = Animator.StringToHash(runBoolName);
        currentLane = Mathf.Clamp(startLane, 0, laneCount - 1);
        targetX = LaneToX(currentLane);

        Vector3 position = transform.position;
        position.x = targetX;
        transform.position = position;
    }

    private void OnEnable()
    {
        if (waitForTutorialCompletion)
        {
            TutorialBuildBlock.OnTutorialCompleted += HandleTutorialCompleted;
            SetRunning(TutorialBuildBlock.ins != null && TutorialBuildBlock.ins.IsTutorialCompleted && runOnStart);
            return;
        }

        SetRunning(runOnStart);
    }

    private void Start()
    {
        if (!waitForTutorialCompletion || TutorialBuildBlock.ins != null)
            return;

        SetRunning(runOnStart);
    }

    private void OnDisable()
    {
        TutorialBuildBlock.OnTutorialCompleted -= HandleTutorialCompleted;
    }

    private void Update()
    {
        if (!isRunning)
            return;

        HandleInput();
        UpdateTransformMovement(Time.deltaTime);
    }

    private void FixedUpdate()
    {
        if (!isRunning || cachedRigidbody == null || cachedRigidbody.isKinematic)
            return;

        Vector3 position = cachedRigidbody.position;
        position.x = Mathf.MoveTowards(position.x, targetX, laneMoveSpeed * Time.fixedDeltaTime);
        position.z += GetCurrentForwardSpeed() * Time.fixedDeltaTime;
        cachedRigidbody.MovePosition(position);
    }

    public void SetRunning(bool value)
    {
        isRunning = value;

        if (animator != null && !string.IsNullOrEmpty(runBoolName))
            animator.SetBool(runBoolHash, isRunning);

        if (!isRunning && cachedRigidbody != null)
        {
            cachedRigidbody.velocity = Vector3.zero;
            cachedRigidbody.angularVelocity = Vector3.zero;
        }
    }

    private void HandleTutorialCompleted()
    {
        if (runOnStart)
            SetRunning(true);
    }

    public void MoveLeft()
    {
        SetLane(currentLane - 1);
    }

    public void MoveRight()
    {
        SetLane(currentLane + 1);
    }

    public void SetLane(int lane)
    {
        currentLane = Mathf.Clamp(lane, 0, laneCount - 1);
        targetX = LaneToX(currentLane);
    }

    private void HandleInput()
    {
#if UNITY_EDITOR || UNITY_STANDALONE
        if (Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A))
            MoveLeft();

        if (Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D))
            MoveRight();
#endif

        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Began)
                BeginPointer(touch.position);
            else if (touch.phase == TouchPhase.Moved || touch.phase == TouchPhase.Stationary)
                DragPointer(touch.position);
            else if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
                EndPointer();

            return;
        }

        if (Input.GetMouseButtonDown(0))
            BeginPointer(Input.mousePosition);
        else if (Input.GetMouseButton(0))
            DragPointer(Input.mousePosition);
        else if (Input.GetMouseButtonUp(0))
            EndPointer();
    }

    private void BeginPointer(Vector2 screenPosition)
    {
        pointerDown = true;
        pointerStart = screenPosition;
        lastSwipeOrigin = screenPosition;
    }

    private void DragPointer(Vector2 screenPosition)
    {
        if (!pointerDown)
            BeginPointer(screenPosition);

        float deltaX = screenPosition.x - lastSwipeOrigin.x;
        if (Mathf.Abs(deltaX) < swipeThresholdPixels)
            return;

        if (deltaX > 0f)
            MoveRight();
        else
            MoveLeft();

        lastSwipeOrigin = screenPosition;
    }

    private void EndPointer()
    {
        pointerDown = false;
    }

    private void UpdateTransformMovement(float deltaTime)
    {
        if (cachedRigidbody != null && !cachedRigidbody.isKinematic)
            return;

        Vector3 position = transform.position;
        position.x = Mathf.MoveTowards(position.x, targetX, laneMoveSpeed * deltaTime);
        position.z += GetCurrentForwardSpeed() * deltaTime;
        transform.position = position;

        if (modelRoot != null)
            modelRoot.forward = Vector3.forward;
    }

    private float GetCurrentForwardSpeed()
    {
        if (LunaManager.ins != null)
            return Mathf.Max(0f, LunaManager.ins.playerSpeed);

        return forwardSpeed;
    }

    private float LaneToX(int lane)
    {
        float centerOffset = (laneCount - 1) * 0.5f;
        return (lane - centerOffset) * laneWidth;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!other.CompareTag(finishTag))
            return;

        SetRunning(false);

        if (showEndCardOnFinish && LunaManager.ins != null)
            LunaManager.ins.ShowEndCard();
    }

    private void OnValidate()
    {
        laneCount = Mathf.Max(1, laneCount);
        startLane = Mathf.Clamp(startLane, 0, laneCount - 1);
        laneWidth = Mathf.Max(0.1f, laneWidth);
        laneMoveSpeed = Mathf.Max(0.1f, laneMoveSpeed);
        swipeThresholdPixels = Mathf.Max(1f, swipeThresholdPixels);
        forwardSpeed = Mathf.Max(0f, forwardSpeed);
    }
}
