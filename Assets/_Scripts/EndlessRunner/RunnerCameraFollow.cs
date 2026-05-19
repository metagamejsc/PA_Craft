using UnityEngine;

public class RunnerCameraFollow : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private float zOffset = 0f;
    [SerializeField] private float followSpeed = 8f;

    private Vector3 startPosition;

    private void Awake()
    {
        startPosition = transform.position;
    }

    private void LateUpdate()
    {
        if (target == null)
            return;

        Vector3 targetPosition = startPosition;
        targetPosition.z = target.position.z + zOffset;
        transform.position = Vector3.Lerp(transform.position, targetPosition, followSpeed * Time.deltaTime);
    }

    private void OnValidate()
    {
        followSpeed = Mathf.Max(0.1f, followSpeed);
    }
}
