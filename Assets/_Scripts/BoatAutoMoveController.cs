using UnityEngine;

public class BoatAutoMoveController : MonoBehaviour
{
    [Header("Move")]
    public float forwardSpeed = 5f;

    [Header("Turn")]
    public float turnSpeed = 60f;
    public float turnInputResponse = 4f; // tốc độ currentTurnInput tiến tới targetTurnInput

    [Header("Ground / Step Up Only")]
    public LayerMask groundLayer;
    public float forwardCheckDistance = 1f;
    public float sideCheckOffset = 0.5f;
    public float checkDownStartHeight = 2f;
    public float checkDownDistance = 6f;
    public float maxStepUpHeight = 1.1f;
    public float heightSmoothTime = 0.08f;
    public float groundOffset = 0.02f;
    public float blockedHeightBuffer = 0.05f;

    [Header("Ride Height")]
    public bool autoDetectRideHeightFromCollider = true;
    public float rideHeight = 0.5f;

    [Header("Anti Stuck")]
    public float wallCheckHeight = 0.6f;
    public float wallCheckDistance = 0.35f;
    public float wallSideInset = 0.15f;

    [Header("Boat Visual")]
    public Transform boatModel;
    public float boatVisualYawAngle = 25f;
    public float boatVisualTiltAngle = 15f;
    public float boatVisualRotateSpeed = 8f;

    [Header("Player")]
    public Transform playerModel;
    public float playerRotateSpeed = 10f;

    private float targetTurnInput;
    private float currentTurnInput;

    private Vector3 lastMoveDirection = Vector3.forward;
    private Quaternion defaultBoatLocalRotation;
    private Collider cachedCol;

    private float verticalVelocity;

    private void Start()
    {
        cachedCol = GetComponent<Collider>();

        if (boatModel != null)
            defaultBoatLocalRotation = boatModel.localRotation;
    }

    private void Update()
    {
        UpdateTurn();
        MoveForwardStepUpOnly();
        RotateBoatVisual();
        RotatePlayerFollowMoveDirection();
    }

    void UpdateTurn()
    {
        currentTurnInput = Mathf.MoveTowards(
            currentTurnInput,
            targetTurnInput,
            turnInputResponse * Time.deltaTime
        );

        if (Mathf.Abs(currentTurnInput) < 0.001f)
            currentTurnInput = 0f;

        if (currentTurnInput != 0f)
        {
            transform.Rotate(0f, currentTurnInput * turnSpeed * Time.deltaTime, 0f);
        }
    }

    void MoveForwardStepUpOnly()
    {
        Vector3 moveDir = transform.forward;
        moveDir.y = 0f;

        if (moveDir.sqrMagnitude < 0.0001f)
            return;

        moveDir.Normalize();
        lastMoveDirection = moveDir;

        Vector3 currentPos = transform.position;
        Vector3 targetXZ = currentPos + moveDir * forwardSpeed * Time.deltaTime;

        bool blocked = IsFrontBlocked(currentPos, moveDir);
        float currentGroundY = SampleGroundHeightStable(currentPos, moveDir, out bool hasCurrentGround);
        float nextGroundY = SampleGroundHeightStableAtFront(targetXZ, moveDir, out bool hasNextGround);

        Debug.Log($"blocked={blocked}, hasCurrent={hasCurrentGround}, hasNext={hasNextGround}, currentY={currentGroundY}, nextY={nextGroundY}");

        if (blocked)
            return;

        Vector3 nextPos = targetXZ;
        nextPos.y = currentPos.y;

        if (hasCurrentGround && hasNextGround)
        {
            float diff = nextGroundY - currentGroundY;
            Debug.Log("diff=" + diff);

            if (diff > 0f)
            {
                if (diff <= maxStepUpHeight + blockedHeightBuffer)
                {
                    float targetY = nextGroundY + GetBottomOffset() + groundOffset;
                    nextPos.y = Mathf.SmoothDamp(
                        currentPos.y,
                        targetY,
                        ref verticalVelocity,
                        heightSmoothTime
                    );
                }
                else
                {
                    nextPos.x = currentPos.x;
                    nextPos.z = currentPos.z;
                    nextPos.y = currentPos.y;
                }
            }
            else
            {
                nextPos.y = currentPos.y;
            }
        }
        else
        {
            nextPos.x = currentPos.x;
            nextPos.z = currentPos.z;
            nextPos.y = currentPos.y;
        }

        transform.position = nextPos;
    }

    float GetBottomOffset()
    {
        if (!autoDetectRideHeightFromCollider || cachedCol == null)
            return rideHeight;

        return cachedCol.bounds.extents.y;
    }

    // Ưu tiên center để tránh bị ray bên hông "ăn" vào thành tường rồi gây giật
    float SampleGroundHeightStable(Vector3 pos, Vector3 moveDir, out bool found)
    {
        Vector3 forward = moveDir.normalized;
        Vector3 right = Vector3.Cross(Vector3.up, forward).normalized;

        bool foundCenter = TryGetGroundY(pos, out float yCenter);
        if (foundCenter)
        {
            found = true;
            return yCenter;
        }

        bool foundLeft = TryGetGroundY(pos - right * sideCheckOffset, out float yLeft);
        bool foundRight = TryGetGroundY(pos + right * sideCheckOffset, out float yRight);

        found = foundLeft || foundRight;

        if (!found)
            return transform.position.y;

        if (foundLeft && foundRight)
            return Mathf.Max(yLeft, yRight);

        return foundLeft ? yLeft : yRight;
    }

    float SampleGroundHeightStableAtFront(Vector3 basePos, Vector3 moveDir, out bool found)
    {
        Vector3 forward = moveDir.normalized;
        Vector3 right = Vector3.Cross(Vector3.up, forward).normalized;

        Vector3 center = basePos + forward * forwardCheckDistance;
        Vector3 left = center - right * sideCheckOffset;
        Vector3 rightPos = center + right * sideCheckOffset;

        bool foundCenter = TryGetGroundY(center, out float yCenter);
        if (foundCenter)
        {
            found = true;
            return yCenter;
        }

        bool foundLeft = TryGetGroundY(left, out float yLeft);
        bool foundRight = TryGetGroundY(rightPos, out float yRight);

        found = foundLeft || foundRight;

        if (!found)
            return transform.position.y;

        if (foundLeft && foundRight)
            return Mathf.Max(yLeft, yRight);

        return foundLeft ? yLeft : yRight;
    }

    bool TryGetGroundY(Vector3 worldPos, out float y)
    {
        Vector3 origin = worldPos + Vector3.up * checkDownStartHeight;

        RaycastHit[] hits = Physics.RaycastAll(
            origin,
            Vector3.down,
            checkDownDistance,
            groundLayer,
            QueryTriggerInteraction.Ignore
        );

        if (hits.Length == 0)
        {
            y = transform.position.y;
            return false;
        }

        float bestY = float.MinValue;
        bool found = false;

        for (int i = 0; i < hits.Length; i++)
        {
            if (Vector3.Dot(hits[i].normal, Vector3.up) > 0.5f)
            {
                if (hits[i].point.y > bestY)
                {
                    bestY = hits[i].point.y;
                    found = true;
                }
            }
        }

        if (found)
        {
            y = bestY;
            return true;
        }

        y = transform.position.y;
        return false;
    }

    bool IsFrontBlocked(Vector3 currentPos, Vector3 moveDir)
    {
        Vector3 forward = moveDir.normalized;
        Vector3 right = Vector3.Cross(Vector3.up, forward).normalized;

        float originY = GetBottomOffset() + 0.2f;

        Vector3 center = currentPos + Vector3.up * originY;
        Vector3 left = center - right * wallSideInset;
        Vector3 rightPos = center + right * wallSideInset;

        return RayBlocked(center, forward) || RayBlocked(left, forward) || RayBlocked(rightPos, forward);
    }

    bool RayBlocked(Vector3 origin, Vector3 forward)
    {
        if (Physics.Raycast(origin, forward, out RaycastHit hit, wallCheckDistance, groundLayer, QueryTriggerInteraction.Ignore))
        {
            float boatBottomY = transform.position.y - GetBottomOffset();
            float obstacleHeight = hit.point.y - boatBottomY;
            return obstacleHeight > maxStepUpHeight + blockedHeightBuffer;
        }

        return false;
    }

    void RotateBoatVisual()
    {
        if (boatModel == null) return;

        Quaternion targetLocalRotation = defaultBoatLocalRotation;

        if (Mathf.Abs(currentTurnInput) > 0.01f)
        {
            float targetYaw = currentTurnInput * boatVisualYawAngle;
            float targetRoll = -currentTurnInput * boatVisualTiltAngle;
            targetLocalRotation = defaultBoatLocalRotation * Quaternion.Euler(0f, targetYaw, targetRoll);
        }

        boatModel.localRotation = Quaternion.Lerp(
            boatModel.localRotation,
            targetLocalRotation,
            boatVisualRotateSpeed * Time.deltaTime
        );
    }

    void RotatePlayerFollowMoveDirection()
    {
        if (playerModel == null) return;
        if (lastMoveDirection.sqrMagnitude < 0.001f) return;

        Vector3 dir = lastMoveDirection;
        dir.y = 0f;

        Quaternion targetRotation = Quaternion.LookRotation(dir);

        playerModel.rotation = Quaternion.Lerp(
            playerModel.rotation,
            targetRotation,
            playerRotateSpeed * Time.deltaTime
        );
    }

    public void HoldLeft(bool isHold)
    {
        targetTurnInput = isHold ? -1f : 0f;
    }

    public void HoldRight(bool isHold)
    {
        targetTurnInput = isHold ? 1f : 0f;
    }

    public void ReleaseTurn()
    {
        targetTurnInput = 0f;
    }

    private void OnDrawGizmosSelected()
    {
        Vector3 moveDir = transform.forward;
        moveDir.y = 0f;

        if (moveDir.sqrMagnitude < 0.001f)
            moveDir = Vector3.forward;

        moveDir.Normalize();

        Vector3 right = Vector3.Cross(Vector3.up, moveDir).normalized;

        Vector3 center = transform.position + moveDir * forwardCheckDistance;
        Vector3 left = center - right * sideCheckOffset;
        Vector3 rightPos = center + right * sideCheckOffset;

        Gizmos.color = Color.cyan;
        DrawRayBox(center);

        Gizmos.color = Color.yellow;
        DrawRayBox(left);

        Gizmos.color = Color.magenta;
        DrawRayBox(rightPos);

        Vector3 wallOrigin = transform.position + Vector3.up * wallCheckHeight;
        Gizmos.color = Color.red;
        Gizmos.DrawLine(wallOrigin, wallOrigin + moveDir * wallCheckDistance);
    }

    void DrawRayBox(Vector3 pos)
    {
        Vector3 origin = pos + Vector3.up * checkDownStartHeight;
        Gizmos.DrawLine(origin, origin + Vector3.down * checkDownDistance);
        Gizmos.DrawWireSphere(pos, 0.08f);
    }
}