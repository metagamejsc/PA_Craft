using UnityEngine;
using UnityEngine.EventSystems;

[DisallowMultipleComponent]
public class ButtonMove : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public static ButtonMove Instance { get; private set; }

    [SerializeField] private RectTransform joystickBackground;
    [SerializeField] private Collider2D circleCollider2D;
    [SerializeField] private RectTransform joystickHandle;
    [SerializeField] private float handleRange = 120f;

    public Vector2 Direction { get; private set; }

    private RectTransform rootRectTransform;
    private Vector2 startHandleAnchoredPosition;

    private void Awake()
    {
        Instance = this;
        rootRectTransform = transform as RectTransform;
        if (joystickBackground == null)
        {
            joystickBackground = rootRectTransform;
        }

        if (joystickHandle != null)
        {
            startHandleAnchoredPosition = joystickHandle.anchoredPosition;
        }
    }

    private void OnEnable()
    {
        ResetJoystick();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        UpdateJoystick(eventData);
    }

    public void OnDrag(PointerEventData eventData)
    {
        UpdateJoystick(eventData);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        ResetJoystick();
    }

    private void UpdateJoystick(PointerEventData eventData)
    {
        if (rootRectTransform == null || joystickHandle == null)
        {
            Direction = Vector2.zero;
            return;
        }

        Vector2 localPoint;
        if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(
                rootRectTransform,
                eventData.position,
                eventData.pressEventCamera,
                out localPoint))
        {
            Direction = Vector2.zero;
            return;
        }

        RectTransform moveRect = joystickBackground != null ? joystickBackground : rootRectTransform;
        float maxDistance = handleRange > 1.5f
            ? handleRange
            : Mathf.Min(moveRect.rect.width, moveRect.rect.height) * 0.5f;

        maxDistance = Mathf.Max(1f, maxDistance);

        Vector2 clampedPoint = Vector2.ClampMagnitude(localPoint, maxDistance);
        Direction = clampedPoint / maxDistance;
        joystickHandle.anchoredPosition = startHandleAnchoredPosition + clampedPoint;
    }

    private void ResetJoystick()
    {
        Direction = Vector2.zero;
        if (joystickHandle != null)
        {
            joystickHandle.anchoredPosition = startHandleAnchoredPosition;
        }
    }
}
