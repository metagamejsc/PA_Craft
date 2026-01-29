using System.Collections.Generic;
using UnityEngine;

public class SimplePathMover : MonoBehaviour
{
    [Header("Move")]
    public float moveSpeed = 3f;
    public float stopDistance = 0.05f;

    [Header("Visual")]
    public Transform modelToRotate;
    public float rotateSpeed = 10f;
    public Animator animator;

    [Header("Ground follow")]
    public LayerMask groundMask;            // set = Terrain (layer đất của bạn)
    public float groundRayHeight = 2f;      // điểm bắn ray cao lên
    public float maxGroundSnapDistance = 8f; // khoảng ray xuống tối đa

    public Queue<Vector3> pathQueue = new Queue<Vector3>();
    public bool isMoving = false;

    Rigidbody rb;

    void Awake()
    {
        rb = GetComponent<Rigidbody>();
    }

    void Update()
    {
        if (!isMoving || pathQueue.Count == 0) return;

        Vector3 pos = GetPosition();
        Vector3 target = pathQueue.Peek();

        // Lấy normal mặt đất hiện tại để đi theo dốc
        Vector3 groundNormal = Vector3.up;
        if (TryGetGround(pos, out var groundHit))
        {
            groundNormal = groundHit.normal;

            // (tuỳ chọn) luôn dính xuống mặt đất hiện tại
            pos.y = groundHit.point.y;
            SetPosition(pos);
        }

        // Hướng đến target nhưng đi theo mặt phẳng dốc (project lên plane theo normal)
        Vector3 toTarget = target - pos;
        Vector3 moveVec = Vector3.ProjectOnPlane(toTarget, groundNormal);
        float planarDist = moveVec.magnitude;

        // Đến waypoint thì pop
        if (planarDist <= stopDistance)
        {
            pathQueue.Dequeue();

            if (pathQueue.Count == 0)
            {
                isMoving = false;
                if (animator) animator.SetBool("isMoving", false);
                return;
            }

            target = pathQueue.Peek();
            toTarget = target - pos;
            moveVec = Vector3.ProjectOnPlane(toTarget, groundNormal);
            planarDist = moveVec.magnitude;
        }

        if (planarDist > 0.0001f)
        {
            Vector3 dir = moveVec / planarDist;

            Vector3 nextPos = pos + dir * moveSpeed * Time.deltaTime;

            // Snap xuống ground tại vị trí mới => leo dốc / lên platform
            if (TryGetGround(nextPos, out var snapHit))
                nextPos.y = snapHit.point.y;

            MoveTo(nextPos);

            // Rotate model theo hướng di chuyển
            Transform t = (modelToRotate != null) ? modelToRotate : transform;
            if (dir.sqrMagnitude > 0.001f)
            {
                Quaternion look = Quaternion.LookRotation(dir);
                t.rotation = Quaternion.Slerp(t.rotation, look, rotateSpeed * Time.deltaTime);
            }

            if (animator) animator.SetBool("isMoving", true);
        }
    }

    bool TryGetGround(Vector3 worldPos, out RaycastHit hit)
    {
        int mask = (groundMask.value == 0) ? Physics.DefaultRaycastLayers : groundMask.value;

        Vector3 origin = worldPos + Vector3.up * groundRayHeight;
        float dist = groundRayHeight + maxGroundSnapDistance;

        return Physics.Raycast(origin, Vector3.down, out hit, dist, mask, QueryTriggerInteraction.Ignore);
    }

    Vector3 GetPosition()
    {
        if (rb != null && !rb.isKinematic) return rb.position;
        return transform.position;
    }

    void SetPosition(Vector3 p)
    {
        if (rb != null && !rb.isKinematic) rb.position = p;
        else transform.position = p;
    }

    void MoveTo(Vector3 p)
    {
        if (rb != null && !rb.isKinematic) rb.MovePosition(p);
        else transform.position = p;
    }

    public void MoveAlongPath(List<Vector3> path)
    {
        pathQueue.Clear();

        if (path == null || path.Count == 0)
        {
            isMoving = false;
            if (animator) animator.SetBool("isMoving", false);
            return;
        }

        for (int i = 0; i < path.Count; i++)
            pathQueue.Enqueue(path[i]);

        isMoving = true;
        if (animator) animator.SetBool("isMoving", true);
    }
}
