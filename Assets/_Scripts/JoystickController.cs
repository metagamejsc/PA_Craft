using UnityEngine;
using UnityEngine.EventSystems;

public class JoystickController : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public RectTransform knob;
    public float maxRadius = 80f;

    public Vector2 Direction { get; private set; }
    public bool IsActive { get; private set; }

    public int ActiveTouchId => activeTouchId;

    private RectTransform bgRect;
    private Camera canvasCamera;
    private int activeTouchId = -1;

    void Awake()
    {
        bgRect = GetComponent<RectTransform>();
        Canvas canvas = GetComponentInParent<Canvas>();
        if (canvas != null)
            canvasCamera = canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : canvas.worldCamera;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        activeTouchId = eventData.pointerId;
        IsActive = true;
        UpdateKnob(eventData.position);
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (eventData.pointerId != activeTouchId)
            return;
        UpdateKnob(eventData.position);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (eventData.pointerId != activeTouchId)
            return;
        activeTouchId = -1;
        IsActive = false;
        Direction = Vector2.zero;
        if (knob != null)
            knob.anchoredPosition = Vector2.zero;
    }

    void UpdateKnob(Vector2 screenPos)
    {
        RectTransformUtility.ScreenPointToLocalPointInRectangle(
            bgRect, screenPos, canvasCamera, out Vector2 local);

        Vector2 clamped = Vector2.ClampMagnitude(local, maxRadius);
        if (knob != null)
            knob.anchoredPosition = clamped;

        Direction = clamped / maxRadius;
    }
}
