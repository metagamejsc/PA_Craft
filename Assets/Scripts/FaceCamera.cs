using UnityEngine;

public class FaceCamera : MonoBehaviour
{
    private Camera mainCamera;

    void Start()
    {
        mainCamera = Camera.main;
    }

    void LateUpdate()
    {
        if (mainCamera != null)
        {
            // Quay mặt về camera
            transform.LookAt(transform.position + mainCamera.transform.forward);
        }
    }
}