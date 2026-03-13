using UnityEngine;

public class CameraFollowForward : MonoBehaviour
{
    public Transform target;

    public float distance = 6f;
    public float height = 3f;

    public float positionSmooth = 5f;
    public float rotationSmooth = 5f;

    void LateUpdate()
    {
        if (target == null) return;

        // vị trí camera phía sau object
        Vector3 desiredPosition =
            target.position
            - target.forward * distance
            + Vector3.up * height;

        transform.position = Vector3.Lerp(
            transform.position,
            desiredPosition,
            positionSmooth * Time.deltaTime
        );

        // camera nhìn về object
        Quaternion desiredRotation =
            Quaternion.LookRotation(target.forward);

        transform.rotation = Quaternion.Lerp(
            transform.rotation,
            desiredRotation,
            rotationSmooth * Time.deltaTime
        );
    }
}