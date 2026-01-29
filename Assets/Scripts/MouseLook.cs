using System;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;

    public Transform target;
    public Camera cameraMain;
    public LayerMask collisionMask;

    [Header("Tap/Click To Move")]
    public LayerMask clickMoveMask;          // Layer ground/stairs để click
    public float clickRayDistance = 200f;
    public float tapThresholdPixels = 12f;   // kéo quá ngưỡng này => coi như drag, không move

    public float distance = 5f;
    public float minDistance = 1.2f;
    public float maxDistance = 5f;
    public float heightOffset = 1.5f;
    public float collisionBuffer = 0.2f;
    public bool allowInput = true;

    // NEW: click-to-move callback
    public Action<Vector3> onClickMove;

    public float rotationSpeed = 0.2f;
    public float yMinLimit = -30f;
    public float yMaxLimit = 80f;

    [Header("Start Rotation (Euler)")]
    public Vector3 startEuler = new Vector3(20f, 0f, 0f);
    public bool applyStartEulerOnStart = true;
    public GameObject tutorialUI;

    private float xRotation = 20f; // pitch
    private float yRotation = 0f;  // yaw

    // NEW: tap vs drag tracking
    private Vector2 pointerDownPos;
    private bool dragged;

    private void Awake() => ins = this;

    private void Start()
    {
        if (applyStartEulerOnStart)
            SetRotationEuler(startEuler);
    }

    public void SetRotationEuler(Vector3 euler)
    {
        float pitch = NormalizeAngle(euler.x);
        float yaw = NormalizeAngle(euler.y);

        xRotation = Mathf.Clamp(pitch, yMinLimit, yMaxLimit);
        yRotation = yaw;
    }

    private float NormalizeAngle(float angle)
    {
        angle %= 360f;
        if (angle > 180f) angle -= 360f;
        return angle;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (!allowInput) return;

        pointerDownPos = eventData.position;
        dragged = false;

        if (tutorialUI != null) tutorialUI.SetActive(false);
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (!allowInput) return;

        // nếu kéo xa quá => coi là drag
        if (!dragged && Vector2.Distance(pointerDownPos, eventData.position) > tapThresholdPixels)
            dragged = true;

        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        yRotation += deltaX;
        xRotation -= deltaY;
        xRotation = Mathf.Clamp(xRotation, yMinLimit, yMaxLimit);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!allowInput) return;

        // Nếu vừa drag thì không coi là click
        if (dragged) return;

        // Tap/Click => raycast xuống ground lấy điểm move
        if (cameraMain == null) cameraMain = Camera.main;
        if (cameraMain == null) return;

        Ray ray = cameraMain.ScreenPointToRay(eventData.position);
        if (Physics.Raycast(ray, out RaycastHit hit, clickRayDistance, clickMoveMask))
        {
            onClickMove?.Invoke(hit.point);
        }
    }

    private void LateUpdate()
    {
        if (target == null || cameraMain == null) return;

        Quaternion rotation = Quaternion.Euler(xRotation, yRotation, 0f);
        Vector3 targetPosition = target.position + Vector3.up * heightOffset;

        Vector3 desiredCameraPos = targetPosition - (rotation * Vector3.forward * distance);

        RaycastHit hit;
        float correctedDistance = distance;

        if (Physics.Raycast(targetPosition, desiredCameraPos - targetPosition, out hit, distance + collisionBuffer, collisionMask))
        {
            correctedDistance = Mathf.Clamp(hit.distance - collisionBuffer, minDistance, maxDistance);
        }

        Vector3 finalCameraPos = targetPosition - (rotation * Vector3.forward * correctedDistance);

        float minY = target.position.y + 0.3f;
        finalCameraPos.y = Mathf.Max(finalCameraPos.y, minY);

        cameraMain.transform.position = finalCameraPos;
        cameraMain.transform.LookAt(targetPosition);
    }
}
