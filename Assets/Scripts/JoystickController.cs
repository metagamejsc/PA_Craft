// Unity script to create a joystick controller

using System;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class JoystickController : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static JoystickController ins;

    private void Awake()
    {
        ins = this;
    }

    public RectTransform joystickBackground;
    public CircleCollider2D circleCollider2D;
    public RectTransform joystickHandle;
    private Vector2 inputVector;

    
    
    public bool isAutoRotating = false;   // Bật tắt chế độ auto
    public float autoRotateSpeed = 1f;    // Tốc độ quay
    public float autoRotateRadius = 0.5f; // Tỉ lệ bán kính (0–1)
    private float autoAngle = 0f;
    public void OnDrag(PointerEventData eventData)
    {
        Vector2 position = Vector2.zero;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(joystickBackground, eventData.position, eventData.pressEventCamera, out position);

        position.x /= joystickBackground.sizeDelta.x;
        position.y /= joystickBackground.sizeDelta.y;

        inputVector = new Vector2(position.x * 2, position.y * 2);
        inputVector = (inputVector.magnitude > 1.0f) ? inputVector.normalized : inputVector;

        // Move joystick handle
        joystickHandle.anchoredPosition = new Vector2(inputVector.x * (joystickBackground.sizeDelta.x / 2), inputVector.y * (joystickBackground.sizeDelta.y / 2));
    }
    private void Update()
    {
        if (isAutoRotating)
        {
            autoAngle += Time.deltaTime * autoRotateSpeed * 360f;
            float rad = autoAngle * Mathf.Deg2Rad;

            // Vị trí theo hình tròn
            float x = Mathf.Cos(rad) * autoRotateRadius;
            float y = Mathf.Sin(rad) * autoRotateRadius;

            inputVector = new Vector2(x, y);

            // Di chuyển joystick handle theo inputVector
            joystickHandle.anchoredPosition = new Vector2(
                inputVector.x * (joystickBackground.sizeDelta.x / 2),
                inputVector.y * (joystickBackground.sizeDelta.y / 2)
            );
        }

        // Bạn có thể debug ở đây nếu muốn
        // Debug.Log($"Joystick Input: {inputVector}");
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        OnDrag(eventData);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        inputVector = Vector2.zero;
        joystickHandle.anchoredPosition = Vector2.zero;
    }

    public float Horizontal() { return inputVector.x; }
    public float Vertical() { return inputVector.y; }
}