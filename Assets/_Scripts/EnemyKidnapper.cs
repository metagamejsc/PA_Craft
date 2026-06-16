using System.Collections;
using UnityEngine;

public class EnemyKidnapper : MonoBehaviour
{
    [Header("References")]
    public EnemyController enemyController;
    public Animator animator;
    public Rigidbody body;
    public Transform carrySocket;
    public Transform escapePoint;
    public Transform player;

    [Header("Timing")]
    public float moveToVictimDuration = 0.55f;
    public float grabDelay = 0.15f;
    public float escapeDuration = 0.9f;
    public float attackStopDistance = 1f;
    public bool disableVictimPhysicsWhileCarried = true;

    [Header("Animation")]
    public string attackTrigger = "Attack";
    public string runBool = "isMoving";

    private bool isKidnapping;
    private Vector3 homePosition;

    void Awake()
    {
        homePosition = transform.position;
        ResolveMovementBody();
    }

    void OnValidate()
    {
        if (body != null && body.transform != transform)
        {
            body = null;
        }
    }

    public void Kidnap(Transform victim)
    {
        if (isKidnapping || victim == null)
        {
            return;
        }

        StartCoroutine(KidnapRoutine(victim));
    }

    IEnumerator KidnapRoutine(Transform victim)
    {
        isKidnapping = true;

        if (enemyController != null)
        {
            enemyController.enabled = false;
        }

        SetRun(true);
        Vector3 victimPosition = GetAttackPosition(victim);
        victimPosition.y = transform.position.y;
        yield return MoveTo(victimPosition, moveToVictimDuration);

        Face(victim.position - transform.position);
        SetRun(false);
        if (animator != null && !string.IsNullOrEmpty(attackTrigger))
        {
            animator.SetTrigger(attackTrigger);
        }

        if (grabDelay > 0f)
        {
            yield return new WaitForSeconds(grabDelay);
        }

        PlayVictimDead(victim);
        PrepareVictimForCarry(victim);

        Transform parent = carrySocket != null ? carrySocket : transform;
        victim.SetParent(parent, true);
        victim.localPosition = Vector3.zero;
        victim.localRotation = Quaternion.identity;

        Vector3 returnPosition = homePosition;
        returnPosition.y = transform.position.y;
        SetRun(true);
        yield return MoveTo(returnPosition, escapeDuration);
        SetRun(false);
        FacePlayer();

        isKidnapping = false;
    }

    IEnumerator MoveTo(Vector3 targetPosition, float duration)
    {
        duration = Mathf.Max(0.01f, duration);
        Vector3 startPosition = body != null ? body.position : transform.position;
        targetPosition.y = startPosition.y;

        float elapsed = 0f;
        while (elapsed < duration)
        {
            float t = Mathf.Clamp01(elapsed / duration);
            Vector3 nextPosition = Vector3.Lerp(startPosition, targetPosition, t);
            MoveWithPhysics(nextPosition);
            Face(targetPosition - nextPosition);
            elapsed += Time.fixedDeltaTime;
            yield return new WaitForFixedUpdate();
        }

        MoveWithPhysics(targetPosition);
    }

    void Face(Vector3 direction)
    {
        direction.y = 0f;
        if (direction.sqrMagnitude <= 0.001f)
        {
            return;
        }

        Quaternion targetRotation = Quaternion.LookRotation(direction.normalized);
        if (body != null)
        {
            body.MoveRotation(targetRotation);
            return;
        }

        transform.rotation = targetRotation;
    }

    void FacePlayer()
    {
        if (player == null)
        {
            GameObject playerObject = GameObject.FindGameObjectWithTag("Player");
            if (playerObject != null)
            {
                player = playerObject.transform;
            }
        }

        if (player == null)
        {
            return;
        }

        Face(player.position - transform.position);
    }

    void SetRun(bool isRunning)
    {
        if (animator != null && !string.IsNullOrEmpty(runBool))
        {
            animator.SetBool(runBool, isRunning);
        }
    }

    void MoveWithPhysics(Vector3 position)
    {
        if (body != null)
        {
            body.MovePosition(position);
            return;
        }

        transform.position = position;
    }

    void PlayVictimDead(Transform victim)
    {
        AllyFakeShooter ally = victim.GetComponentInParent<AllyFakeShooter>();
        if (ally == null)
        {
            ally = victim.GetComponentInChildren<AllyFakeShooter>();
        }

        if (ally != null)
        {
            ally.PlayKidnappedDead();
        }
    }

    void ResolveMovementBody()
    {
        if (body != null && body.transform == transform)
        {
            return;
        }

        body = GetComponent<Rigidbody>();
    }

    Vector3 GetAttackPosition(Transform victim)
    {
        Vector3 targetPosition = GetVictimBodyPosition(victim);
        Vector3 directionToVictim = targetPosition - transform.position;
        directionToVictim.y = 0f;

        float stopDistance = Mathf.Max(0f, attackStopDistance);
        if (stopDistance > 0f && directionToVictim.sqrMagnitude > stopDistance * stopDistance)
        {
            targetPosition -= directionToVictim.normalized * stopDistance;
        }

        return targetPosition;
    }

    Vector3 GetVictimBodyPosition(Transform victim)
    {
        Rigidbody victimBody = victim.GetComponentInParent<Rigidbody>();
        if (victimBody != null)
        {
            return victimBody.worldCenterOfMass;
        }

        Collider victimCollider = victim.GetComponentInParent<Collider>();
        if (victimCollider != null)
        {
            return victimCollider.bounds.center;
        }

        return victim.position;
    }

    void PrepareVictimForCarry(Transform victim)
    {
        if (!disableVictimPhysicsWhileCarried)
        {
            return;
        }

        Rigidbody victimBody = victim.GetComponentInParent<Rigidbody>();
        if (victimBody == null)
        {
            return;
        }

        victimBody.velocity = Vector3.zero;
        victimBody.angularVelocity = Vector3.zero;
        victimBody.isKinematic = true;
        victimBody.detectCollisions = false;
    }
}
