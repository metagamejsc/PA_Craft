using UnityEngine;

public class ThirdPersonCamera : MonoBehaviour
{
    public Transform target; // Player
    public Transform cameraTransform; // Camera (Main Camera)
    public float distance = 5.0f; // Khoảng cách mặc định
    public float minDistance = 1.0f; // Khoảng cách tối thiểu khi sát tường
    public float maxDistance = 5.0f; // Khoảng cách tối đa

    public float mouseSensitivity = 3.0f;
    public float scrollSensitivity = 2.0f;

    public float xRotation = 20f;
    public float yRotation = 0f;

    public float yMinLimit = -40f;
    public float yMaxLimit = 80f;

    public LayerMask collisionLayers; // Layer tường, vật cản

    void LateUpdate()
    {
        // Nhận input xoay camera
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity;

        yRotation += mouseX;
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, yMinLimit, yMaxLimit);

        // Tính rotation
        Quaternion rotation = Quaternion.Euler(xRotation, yRotation, 0);

        // Tính vị trí camera mong muốn (gốc player + offset quay ra sau)
        Vector3 desiredCameraPos = target.position - (rotation * Vector3.forward * distance);

        // Raycast từ player đến camera để phát hiện va chạm
        RaycastHit hit;
        float actualDistance = distance;

        if (Physics.Raycast(target.position, desiredCameraPos - target.position, out hit, distance, collisionLayers))
        {
            actualDistance = Mathf.Clamp(hit.distance - 0.2f, minDistance, maxDistance); // lùi camera tới gần tường
        }

        // Gán vị trí và rotation cho camera
        Vector3 finalCameraPos = target.position - (rotation * Vector3.forward * actualDistance);
        cameraTransform.position = finalCameraPos;
        cameraTransform.rotation = rotation;
    }
}