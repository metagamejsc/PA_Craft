using UnityEngine;

public class RunnerCameraFollow : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private Vector3 offset = new Vector3(0f, 6f, -8f);
    [SerializeField] private float followSpeed = 8f;
    [SerializeField] private bool lookAtTarget = true;

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
        targetPosition.x = offset.x;
        targetPosition.z = target.position.z + offset.z;
        transform.position = Vector3.Lerp(transform.position, targetPosition, followSpeed * Time.deltaTime);

        if (lookAtTarget)
            transform.LookAt(new Vector3(offset.x, target.position.y + 1.5f, target.position.z));
    }

    private void OnValidate()
    {
        followSpeed = Mathf.Max(0.1f, followSpeed);
    }
}
