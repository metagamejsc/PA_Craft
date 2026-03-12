using UnityEngine;

public class RotateByJoystickAndCamera : MonoBehaviour
{
    public Transform cameraTransform;
    public float rotateSpeed = 10f;

    private void Update()
    {
        if (JoystickController.ins == null || cameraTransform == null) return;

        float h = JoystickController.ins.Horizontal();
        float v = JoystickController.ins.Vertical();

        Vector3 inputDir = new Vector3(h, 0f, v);

        // Chỉ xoay khi đang kéo joystick
        if (inputDir.sqrMagnitude > 0.01f)
        {
            Vector3 camForward = cameraTransform.forward;
            Vector3 camRight = cameraTransform.right;

            camForward.y = 0f;
            camRight.y = 0f;

            camForward.Normalize();
            camRight.Normalize();

            // Hướng theo camera
            Vector3 moveDir = camForward * v + camRight * h;

            if (moveDir.sqrMagnitude > 0.001f)
            {
                Quaternion targetRotation = Quaternion.LookRotation(moveDir);
                transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotateSpeed * Time.deltaTime);
            }
        }
    }
}