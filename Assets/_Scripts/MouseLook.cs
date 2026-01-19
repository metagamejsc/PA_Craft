using System;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;

    public Transform target;
    public Camera cameraMain;
    public LayerMask collisionMask;

    public float distance = 5f;
    public float minDistance = 1.2f;
    public float maxDistance = 5f;
    public float heightOffset = 1.5f;
    public float collisionBuffer = 0.2f;
    public bool allowInput = true;
    public Action onMouseUpShoot;

    public float rotationSpeed = 0.2f;
    public float yMinLimit = -30f;
    public float yMaxLimit = 80f;

    [Header("Start Rotation (Euler)")]
    public Vector3 startEuler = new Vector3(20f, 0f, 0f);
    public bool applyStartEulerOnStart = true;
    public GameObject tutorialUI;

    private float xRotation = 20f; // pitch
    private float yRotation = 0f;  // yaw

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        if (applyStartEulerOnStart)
            SetRotationEuler(startEuler);
    }

    // Gọi từ ngoài vào: MouseLook.ins.SetRotationEuler(new Vector3(pitch, yaw, 0));
    public void SetRotationEuler(Vector3 euler)
    {
        float pitch = NormalizeAngle(euler.x);
        float yaw = NormalizeAngle(euler.y);

        xRotation = Mathf.Clamp(pitch, yMinLimit, yMaxLimit);
        yRotation = yaw;
    }

    // Nếu bạn muốn truyền vào 1 vector hướng (direction) thay vì Euler:
    // direction: hướng từ target ra phía camera (ví dụ Vector3.back là camera ở sau lưng)
    public void SetRotationFromDirection(Vector3 directionFromTargetToCamera)
    {
        if (directionFromTargetToCamera.sqrMagnitude < 0.0001f) return;

        // rotation dùng trong LateUpdate: rotation * Vector3.forward là hướng nhìn ra trước camera
        // CameraPos = targetPos - (rotation * forward * distance)
        // => (rotation*forward) chính là hướng từ camera -> target (ngược với direction từ target -> camera)
        Vector3 camToTargetDir = -directionFromTargetToCamera.normalized;
        Quaternion rot = Quaternion.LookRotation(camToTargetDir, Vector3.up);

        Vector3 euler = rot.eulerAngles;
        SetRotationEuler(euler);
    }

    private float NormalizeAngle(float angle)
    {
        angle %= 360f;
        if (angle > 180f) angle -= 360f;
        return angle;
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (!allowInput) return;

        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        yRotation += deltaX;
        xRotation -= deltaY;
        xRotation = Mathf.Clamp(xRotation, yMinLimit, yMaxLimit);
    }


    public void OnPointerDown(PointerEventData eventData)
    {
        if (!allowInput) return;
        tutorialUI.SetActive(false);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!allowInput) return;

        onMouseUpShoot?.Invoke();
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
