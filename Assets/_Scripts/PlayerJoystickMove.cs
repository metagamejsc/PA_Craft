using UnityEngine;

public class PlayerJoystickMove : MonoBehaviour
{
    public Transform cameraTransform;
    public float moveSpeed = 5f;
    public float rotateSpeed = 10f;

    private void Update()
    {
        if (JoystickController.ins == null || cameraTransform == null) return;

        float h = JoystickController.ins.Horizontal();
        float v = JoystickController.ins.Vertical();

        // Lấy hướng camera
        Vector3 camForward = cameraTransform.forward;
        Vector3 camRight = cameraTransform.right;

        // Bỏ trục Y để chỉ di chuyển trên mặt phẳng
        camForward.y = 0f;
        camRight.y = 0f;

        camForward.Normalize();
        camRight.Normalize();

        // Tính hướng di chuyển theo camera
        Vector3 moveDir = camForward * v + camRight * h;

        if (moveDir.magnitude > 1f)
            moveDir.Normalize();

        // Xoay nhân vật theo hướng di chuyển
        if (moveDir.sqrMagnitude > 0.001f)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDir);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotateSpeed * Time.deltaTime);
        }

        // Di chuyển bằng transform
        transform.position += moveDir * moveSpeed * Time.deltaTime;
    }
}