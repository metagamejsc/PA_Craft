using UnityEngine;

public class BoatController : MonoBehaviour
{
    public Transform cameraTransform;
    public float moveSpeed = 5f;
    public float rotateSpeed = 5f;

    private Vector3 lastMoveDirection;

    public Vector3 LastMoveDirection => lastMoveDirection;

    private void Update()
    {
        if (cameraTransform == null || JoystickController.ins == null) return;

        RotateBoatFollowCamera();
        MoveByJoystick();
    }

    void RotateBoatFollowCamera()
    {
        Vector3 camForward = cameraTransform.forward;
        camForward.y = 0f;

        if (camForward.sqrMagnitude < 0.001f) return;

        Quaternion targetRotation = Quaternion.LookRotation(camForward.normalized);
        transform.rotation = Quaternion.Lerp(transform.rotation, targetRotation, rotateSpeed * Time.deltaTime);
    }

    void MoveByJoystick()
    {
        float h = JoystickController.ins.Horizontal();
        float v = JoystickController.ins.Vertical();

        // Di chuyển theo mặt phẳng local của thuyền
        Vector3 moveDir = (transform.forward * v + transform.right * h);

        if (moveDir.magnitude > 1f)
            moveDir.Normalize();

        if (moveDir.sqrMagnitude > 0.0001f)
        {
            lastMoveDirection = moveDir.normalized;
            transform.position += moveDir * moveSpeed * Time.deltaTime;
        }
    }
}