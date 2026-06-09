using UnityEngine;
using UnityEngine.EventSystems;

public class JoystickMoveController : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    [Header("UI")]
    [SerializeField] private RectTransform handle;
    [SerializeField] private float joystickRadius;

    [Header("Movement")]
    [SerializeField] private Transform target;
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private bool cameraRelative = true;
    [SerializeField] private Camera movementCamera;
    [SerializeField] private bool rotateToMoveDirection = true;
    [SerializeField] private float rotateSpeed = 12f;

    [Header("State")]
    [SerializeField] private bool resetHandleOnRelease = true;
    [SerializeField] private bool respectCreativePause = true;

    public Vector2 Direction { get; private set; }

    private RectTransform joystickRect;
    private Canvas parentCanvas;
    private int activePointerId = int.MinValue;
    private Vector2 targetHandlePosition;
    private bool hasTargetHandlePosition;

    private void Awake()
    {
        joystickRect = GetComponent<RectTransform>();
        parentCanvas = GetComponentInParent<Canvas>();

        if (handle == null && transform.childCount > 0)
        {
            handle = transform.GetChild(0) as RectTransform;
        }

        if (movementCamera == null)
        {
            movementCamera = Camera.main;
        }
    }

    private void OnEnable()
    {
        Canvas.willRenderCanvases += ApplyHandlePositionBeforeRender;
    }

    private void OnDisable()
    {
        Canvas.willRenderCanvases -= ApplyHandlePositionBeforeRender;
    }

    private void Update()
    {
        if (target == null || Direction.sqrMagnitude <= 0.0001f)
        {
            return;
        }

        if (respectCreativePause && LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            return;
        }

        Vector3 moveDirection = GetWorldMoveDirection(Direction);
        target.position += moveDirection * (moveSpeed * Time.deltaTime);

        if (rotateToMoveDirection && moveDirection.sqrMagnitude > 0.0001f)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection);
            target.rotation = Quaternion.Slerp(target.rotation, targetRotation, rotateSpeed * Time.deltaTime);
        }
    }

    private void LateUpdate()
    {
        ApplyHandlePosition();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (activePointerId != int.MinValue)
        {
            return;
        }

        activePointerId = eventData.pointerId;
        UpdateJoystick(eventData);
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (eventData.pointerId != activePointerId)
        {
            return;
        }

        UpdateJoystick(eventData);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (eventData.pointerId != activePointerId)
        {
            return;
        }

        activePointerId = int.MinValue;
        Direction = Vector2.zero;

        if (resetHandleOnRelease && handle != null)
        {
            SetHandlePosition(Vector2.zero);
        }
    }

    private void UpdateJoystick(PointerEventData eventData)
    {
        if (joystickRect == null)
        {
            return;
        }

        Camera eventCamera = GetEventCamera();
        if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(
                joystickRect,
                eventData.position,
                eventCamera,
                out Vector2 localPoint))
        {
            return;
        }

        float radius = GetJoystickRadius();
        Vector2 clampedPoint = Vector2.ClampMagnitude(localPoint, radius);
        Direction = radius > 0f ? clampedPoint / radius : Vector2.zero;

        if (handle != null)
        {
            SetHandlePosition(clampedPoint);
        }
    }

    private void SetHandlePosition(Vector2 position)
    {
        targetHandlePosition = position;
        hasTargetHandlePosition = true;
        ApplyHandlePosition();
    }

    private void ApplyHandlePositionBeforeRender()
    {
        ApplyHandlePosition();
    }

    private void ApplyHandlePosition()
    {
        if (!hasTargetHandlePosition || handle == null)
        {
            return;
        }

        handle.anchoredPosition = targetHandlePosition;
        handle.localPosition = new Vector3(
            handle.localPosition.x,
            handle.localPosition.y,
            0f);
    }

    private float GetJoystickRadius()
    {
        if (joystickRadius > 0f)
        {
            return joystickRadius;
        }

        if (joystickRect == null)
        {
            return 0f;
        }

        float backgroundRadius = Mathf.Min(joystickRect.rect.width, joystickRect.rect.height) * 0.5f;
        if (handle == null)
        {
            return backgroundRadius;
        }

        float handleRadius = Mathf.Min(handle.rect.width, handle.rect.height) * 0.5f;
        return Mathf.Max(0f, backgroundRadius - handleRadius);
    }

    private Camera GetEventCamera()
    {
        if (parentCanvas == null || parentCanvas.renderMode == RenderMode.ScreenSpaceOverlay)
        {
            return null;
        }

        return parentCanvas.worldCamera != null ? parentCanvas.worldCamera : Camera.main;
    }

    private Vector3 GetWorldMoveDirection(Vector2 input)
    {
        Vector3 rawDirection = new Vector3(input.x, 0f, input.y);
        if (!cameraRelative)
        {
            return rawDirection.normalized;
        }

        if (movementCamera == null)
        {
            movementCamera = Camera.main;
        }

        if (movementCamera == null)
        {
            return rawDirection.normalized;
        }

        Vector3 cameraForward = movementCamera.transform.forward;
        cameraForward.y = 0f;
        cameraForward.Normalize();

        Vector3 cameraRight = movementCamera.transform.right;
        cameraRight.y = 0f;
        cameraRight.Normalize();

        Vector3 moveDirection = (cameraRight * input.x) + (cameraForward * input.y);
        return moveDirection.sqrMagnitude > 1f ? moveDirection.normalized : moveDirection;
    }

    public void SetTarget(Transform newTarget)
    {
        target = newTarget;
    }
}
