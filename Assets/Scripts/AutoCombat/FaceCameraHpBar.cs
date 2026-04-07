using UnityEngine;

[ExecuteAlways]
[DisallowMultipleComponent]
public class FaceCameraHpBar : MonoBehaviour
{
    [SerializeField] private Camera targetCamera;
    [SerializeField] private bool autoFindMainCamera = true;
    [SerializeField] private bool invertForward = false;
    [SerializeField] private bool lockXRotation = true;
    [SerializeField] private bool lockYRotation = false;
    [SerializeField] private bool lockZRotation = true;

    private void LateUpdate()
    {
        var cameraToUse = ResolveCamera();
        if (cameraToUse == null)
        {
            return;
        }

        var direction = transform.position - cameraToUse.transform.position;
        if (invertForward)
        {
            direction = -direction;
        }

        if (direction.sqrMagnitude < 0.0001f)
        {
            return;
        }

        var rotation = Quaternion.LookRotation(direction.normalized, Vector3.up);
        var euler = rotation.eulerAngles;
        var currentEuler = transform.rotation.eulerAngles;

        if (lockXRotation)
        {
            euler.x = currentEuler.x;
        }

        if (lockYRotation)
        {
            euler.y = currentEuler.y;
        }

        if (lockZRotation)
        {
            euler.z = currentEuler.z;
        }

        transform.rotation = Quaternion.Euler(euler);
    }

    private Camera ResolveCamera()
    {
        if (targetCamera != null)
        {
            return targetCamera;
        }

        if (!autoFindMainCamera)
        {
            return null;
        }

        if (Camera.main != null)
        {
            return Camera.main;
        }

        return FindObjectOfType<Camera>();
    }
}
