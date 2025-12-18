using System;
using UnityEngine;
using Random = UnityEngine.Random;

[DisallowMultipleComponent]
[RequireComponent(typeof(Rigidbody))]
public class AutoMoveByVelocity : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private Rigidbody rb;
    [SerializeField] private Animator animator;

    [Header("Auto Move")]
    [SerializeField] private float moveSpeed = 3.5f;
    [SerializeField] private float stopDistance = 0.25f;
    [SerializeField] private float turnSpeed = 12f;

    [Header("Wander")]
    [SerializeField] private float wanderRadius = 2.0f;
    [SerializeField] private float wanderMinPickTime = 0.6f;
    [SerializeField] private float wanderMaxPickTime = 1.5f;

    [Header("Animator Params (optional)")]
    [SerializeField] private string isMovingParam = "isMoving";
    [SerializeField] private string deadParam = "Dead";

    [Header("Optional Auto Start")]
    [SerializeField] private bool autoStart;
    [SerializeField] private Transform startTarget; // nếu muốn auto chạy tới một Transform ngay khi Start

    private enum State { None, ToPoint, Wander }
    private State state = State.None;

    private Vector3 target;
    private Vector3 wanderCenter;
    private float nextPickTime;
    public ParticleSystem triggerRespawnEffect;

    private void Reset()
    {
        rb = GetComponent<Rigidbody>();
        animator = GetComponentInChildren<Animator>();
    }

    private void Awake()
    {
        if (!rb) rb = GetComponent<Rigidbody>();
        if (!animator) animator = GetComponentInChildren<Animator>();
    }

    private void Start()
    {
        if (autoStart && startTarget != null)
            StartAutoMoveTo(startTarget.position);
    }

    /// <summary>Gọi hàm này để bắt đầu chạy tới vị trí worldPos.</summary>
    public void StartAutoMoveTo(Vector3 worldPos)
    {
        state = State.ToPoint;
        target = worldPos;
    }

    /// <summary>Dừng auto move và trả velocity XZ về 0.</summary>
    public void StopAutoMove()
    {
        state = State.None;
        SetHorizontalVelocity(Vector3.zero);
        SetAnimMoving(false);
    }

    private void Update()
    {
        // Nếu animator có Dead=true thì dừng (tránh kéo xác đi)
        if (animator && !string.IsNullOrEmpty(deadParam))
        {
            if (animator.GetBool(deadParam))
            {
                StopAutoMove();
                return;
            }
        }

        // cập nhật isMoving theo velocity hiện tại
        if (animator)
        {
            Vector3 hv = new Vector3(rb.velocity.x, 0f, rb.velocity.z);
            SetAnimMoving(hv.sqrMagnitude > 0.01f);
        }
    }

    private void FixedUpdate()
    {
        if (state == State.None) return;
        if (!rb || rb.isKinematic) return;

        if (state == State.ToPoint)
        {
            MoveTowards(target);

            if (Reached(target))
            {
                wanderCenter = target;
                PickNextWanderTarget();
                state = State.Wander;
            }
        }
        else if (state == State.Wander)
        {
            if (Reached(target) || Time.time >= nextPickTime)
                PickNextWanderTarget();

            MoveTowards(target);
        }
    }

    private void MoveTowards(Vector3 dest)
    {
        Vector3 to = dest - transform.position;
        to.y = 0f;

        if (to.sqrMagnitude < 0.0001f)
        {
            SetHorizontalVelocity(Vector3.zero);
            return;
        }

        Vector3 dir = to.normalized;

        // quay mặt theo hướng chạy (tuỳ bạn có cần không)
        Vector3 newForward = Vector3.Slerp(transform.forward, dir, turnSpeed * Time.fixedDeltaTime);
        newForward.y = 0f;
        if (newForward.sqrMagnitude > 0.0001f) transform.forward = newForward.normalized;

        SetHorizontalVelocity(dir * moveSpeed);
    }

    private bool Reached(Vector3 dest)
    {
        Vector3 d = dest - transform.position;
        d.y = 0f;

        if (d.magnitude <= stopDistance)
        {
            SetHorizontalVelocity(Vector3.zero);
            return true;
        }
        return false;
    }

    private void SetHorizontalVelocity(Vector3 horizontal)
    {
        Vector3 v = rb.velocity;
        v.x = horizontal.x;
        v.z = horizontal.z;
        rb.velocity = v;
    }

    private void PickNextWanderTarget()
    {
        Vector2 r = Random.insideUnitCircle * wanderRadius;
        target = wanderCenter + new Vector3(r.x, 0f, r.y);
        nextPickTime = Time.time + Random.Range(wanderMinPickTime, wanderMaxPickTime);
    }

    private void SetAnimMoving(bool moving)
    {
        if (!animator || string.IsNullOrEmpty(isMovingParam)) return;
        animator.SetBool(isMovingParam, moving);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Respawn"))
        {
            if (triggerRespawnEffect != null)
            {
                var effect = Instantiate(triggerRespawnEffect,transform.position,Quaternion.identity);
            }
        }
    }
#if UNITY_EDITOR
    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(wanderCenter == Vector3.zero ? transform.position : wanderCenter, wanderRadius);

        Gizmos.color = Color.green;
        Gizmos.DrawSphere(target, 0.08f);
    }
#endif
}
