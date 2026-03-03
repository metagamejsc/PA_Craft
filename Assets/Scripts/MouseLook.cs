using System;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;

    public Transform target;                 // Player
    public Camera cameraMain;               // Main Camera
    public LayerMask collisionMask;         // Các layer có thể chặn camera

    public float distance = 5f;
    public float minDistance = 1.2f;
    public float maxDistance = 5f;
    public float heightOffset = 1.5f;        // Camera nhìn ngang tầm đầu
    public float collisionBuffer = 0.2f;     // Tránh camera dính vào tường

    public float rotationSpeed = 0.2f;
    public float yMinLimit = -30f;
    public float yMaxLimit = 80f;

    private float xRotation = 20f;
    private float yRotation = 0f;
    
    [Header("Chest Interaction")]
    public LayerMask chestLayer;
    public float chestInteractDistance = 2.5f;
    public Transform player; 
    private void Awake()
    {
        ins = this;
    }
    private void TryInteractChest(PointerEventData eventData)
    {
        if (player == null) return;

        Ray ray = cameraMain.ScreenPointToRay(eventData.position);
        RaycastHit hit;

        if (Physics.Raycast(ray, out hit, 100f, chestLayer))
        {
            ChestController chest = hit.transform.GetComponent<ChestController>();

            if (chest != null)
            {
                float distance = Vector3.Distance(player.position, chest.transform.position);

                if (distance <= chestInteractDistance)
                {
                    //player.
                    chest.OpenChest();
                }
            }
        }
    }
    public void OnDrag(PointerEventData eventData)
    {
        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        yRotation += deltaX;
        xRotation -= deltaY;
        xRotation = Mathf.Clamp(xRotation, yMinLimit, yMaxLimit);
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        // Không cần gì ở đây nếu không xử lý click giữ
        TryInteractChest(eventData);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        // Không cần gì ở đây nếu không xử lý click giữ
    }

    private void LateUpdate()
    {
        if (target == null || cameraMain == null) return;

        // Tính rotation
        Quaternion rotation = Quaternion.Euler(xRotation, yRotation, 0f);
        Vector3 targetPosition = target.position + Vector3.up * heightOffset;

        // Tính vị trí mong muốn của camera
        Vector3 desiredCameraPos = targetPosition - (rotation * Vector3.forward * distance);

        // Raycast kiểm tra vật cản giữa player và camera
        RaycastHit hit;
        float correctedDistance = distance;

        if (Physics.Raycast(targetPosition, desiredCameraPos - targetPosition, out hit, distance + collisionBuffer, collisionMask))
        {
            correctedDistance = Mathf.Clamp(hit.distance - collisionBuffer, minDistance, maxDistance);
        }

        // Tính lại vị trí camera
        Vector3 finalCameraPos = targetPosition - (rotation * Vector3.forward * correctedDistance);

        // Clamp chiều cao để tránh lọt xuống đất
        float minY = target.position.y + 0.3f;
        finalCameraPos.y = Mathf.Max(finalCameraPos.y, minY);

        // Áp dụng vị trí và xoay camera nhìn vào player
        cameraMain.transform.position = finalCameraPos;
        cameraMain.transform.LookAt(targetPosition);
    }
}
