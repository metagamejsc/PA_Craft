using UnityEngine;

public class BillboardToCamera : MonoBehaviour
{
    public Camera targetCamera;

    void LateUpdate()
    {
        if (targetCamera == null) targetCamera = Camera.main;
        if (targetCamera == null) return;

        transform.forward = (transform.position - targetCamera.transform.position).normalized;
    }
}