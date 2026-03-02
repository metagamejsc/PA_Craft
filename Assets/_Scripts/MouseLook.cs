using System;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;

    [Header("Object cần xoay")]
    public Transform target;

    [Header("Input")]
    public bool allowInput = true;
    public float rotationSpeed = 0.2f;
    public Action onPointerUpAction;

    [Header("Giới hạn góc X (pitch)")]
    public float xMinLimit = -45f;
    public float xMaxLimit = 45f;

    [Header("Giới hạn góc Y (yaw)")]
    public float yMinLimit = -60f;
    public float yMaxLimit = 60f;
    public GameObject tutorialPanel;

    [Header("Góc bắt đầu (Euler)")]
    public Vector3 startEuler = Vector3.zero;
    public bool applyStartEulerOnStart = true;

    private float xRotation;
    private float yRotation;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        if (target == null)
            target = transform;

        if (applyStartEulerOnStart)
        {
            SetRotationEuler(startEuler);
        }
        else
        {
            Vector3 euler = target.localEulerAngles;
            xRotation = NormalizeAngle(euler.x);
            yRotation = NormalizeAngle(euler.y);
        }

        ApplyRotation();
    }

    public void SetRotationEuler(Vector3 euler)
    {
        xRotation = Mathf.Clamp(NormalizeAngle(euler.x), xMinLimit, xMaxLimit);
        yRotation = Mathf.Clamp(NormalizeAngle(euler.y), yMinLimit, yMaxLimit);
        ApplyRotation();
    }

    private float NormalizeAngle(float angle)
    {
        angle %= 360f;
        if (angle > 180f) angle -= 360f;
        return angle;
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (!allowInput || target == null) return;

        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        // Kéo ngang -> xoay quanh trục Y
        yRotation += deltaX;

        // Kéo dọc -> xoay quanh trục X
        xRotation -= deltaY;

        xRotation = Mathf.Clamp(xRotation, xMinLimit, xMaxLimit);
        yRotation = Mathf.Clamp(yRotation, yMinLimit, yMaxLimit);

        ApplyRotation();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (!allowInput) return;
        tutorialPanel?.SetActive(false);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!allowInput) return;
        onPointerUpAction?.Invoke();
    }

    private void ApplyRotation()
    {
        if (target == null) return;
        target.localRotation = Quaternion.Euler(xRotation, yRotation, 0f);
    }
}