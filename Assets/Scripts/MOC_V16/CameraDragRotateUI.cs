using UnityEngine;
using UnityEngine.EventSystems;

public class CameraDragRotateUI : MonoBehaviour, IDragHandler, IBeginDragHandler
{
    public Transform targetToRotate; // Camera hoặc object bạn muốn xoay
    public float rotateSpeed = 0.5f;

    // Giới hạn góc X (pitch - lên/xuống) và Y (yaw - trái/phải)
    public float minX = 10f;
    public float maxX = 80f;
    public float minY = -60f;
    public float maxY = 60f;

    private Vector2 rotation = Vector2.zero;

    public void OnBeginDrag(PointerEventData eventData)
    {
        // Bạn có thể reset nếu cần
    }

    public void OnDrag(PointerEventData eventData)
    {
        float deltaX = eventData.delta.x * rotateSpeed;
        float deltaY = -eventData.delta.y * rotateSpeed;

        rotation.x += deltaY;
        rotation.y += deltaX;

        // Clamp giới hạn
        rotation.x = Mathf.Clamp(rotation.x, minX, maxX);
        rotation.y = Mathf.Clamp(rotation.y, minY, maxY);

        // Áp dụng xoay (xoay theo góc Euler)
        targetToRotate.localEulerAngles = new Vector3(rotation.x, rotation.y, 0f);
    }
}