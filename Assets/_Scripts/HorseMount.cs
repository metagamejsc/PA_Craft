using System.Collections;
using UnityEngine;

public class HorseMount : MonoBehaviour
{
    [Header("Refs")]
    public Transform seatPoint;
    public PlayerMountAnimator playerMountAnimator;
    public HorseMountAnimator horseMountAnimator;

    [Header("Move To Seat")]
    public float moveDuration = 0.45f;
    public float jumpHeight = 1.0f;
    public float playerJumpLeadTime = 0.08f;
    public float horseJumpDelay = 0.05f;

    [Header("Horse Jump")]
    public float horseJumpDuration = 0.4f;                    // thời gian jump của horse
    public Vector3 horseJumpOffset = new Vector3(0f, 0f, 1.5f); // vị trí đích so với vị trí ban đầu
    public float horseJumpArcHeight = 0.35f;                  // độ cao arc khi horse nhảy

    [Header("Options")]
    public bool stopIdleWhileMounting = true;

    private bool isMounted = false;
    private bool isMounting = false;

    private Vector3 horseStartPosition;
    private Quaternion horseStartRotation;

    void Start()
    {
        horseStartPosition = transform.position;
        horseStartRotation = transform.rotation;

        if (horseMountAnimator != null)
        {
            horseMountAnimator.SetMounted(false);
            horseMountAnimator.StartIdleLoop();
        }
    }

    void OnMouseDown()
    {
        TryMount();
    }

    public void TryMount()
    {
        if (isMounted || isMounting) return;

        GameObject player = GameObject.FindGameObjectWithTag("Player");
        if (player == null || seatPoint == null) return;

        if (playerMountAnimator == null)
        {
            playerMountAnimator = player.GetComponent<PlayerMountAnimator>();
        }

        if (playerMountAnimator == null) return;

        StartCoroutine(MountRoutine(player.transform));
    }

    IEnumerator MountRoutine(Transform player)
    {
        isMounting = true;

        if (stopIdleWhileMounting && horseMountAnimator != null)
        {
            horseMountAnimator.StopIdleLoop();
        }

        // 1) Player jump
        playerMountAnimator.PlayJump();

        yield return new WaitForSeconds(playerJumpLeadTime);

        // 2) Move player to seat with arc
        Vector3 startPos = player.position;
        Quaternion startRot = player.rotation;

        Vector3 endPos = seatPoint.position;
        Quaternion endRot = seatPoint.rotation;

        float time = 0f;

        while (time < moveDuration)
        {
            time += Time.deltaTime;
            float t = Mathf.Clamp01(time / moveDuration);

            Vector3 pos = Vector3.Lerp(startPos, endPos, t);
            pos.y += Mathf.Sin(t * Mathf.PI) * jumpHeight;

            player.position = pos;
            player.rotation = Quaternion.Slerp(startRot, endRot, t);

            yield return null;
        }

        // 3) Snap to seat
        player.position = seatPoint.position;
        player.rotation = seatPoint.rotation;

        // 4) Parent to seat
        player.SetParent(seatPoint, true);

        // 5) Set riding anim
        playerMountAnimator.SetRiding(true);

        yield return new WaitForSeconds(horseJumpDelay);

        // 6) Horse jump anim
        if (horseMountAnimator != null)
        {
            horseMountAnimator.PlayJump();
            horseMountAnimator.SetMounted(true);
        }

        // 7) Move horse theo thời gian + offset
        yield return StartCoroutine(HorseJumpRoutine());

        isMounted = true;
        isMounting = false;

        if (LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
            LunaManager.ins.OnClickEndCard();
        }
    }

    IEnumerator HorseJumpRoutine()
    {
        float duration = Mathf.Max(0.01f, horseJumpDuration);

        Vector3 startPos = horseStartPosition;
        Vector3 endPos = horseStartPosition + (horseStartRotation * horseJumpOffset);
        Quaternion startRot = transform.rotation;

        float time = 0f;

        while (time < duration)
        {
            time += Time.deltaTime;
            float t = Mathf.Clamp01(time / duration);

            Vector3 pos = Vector3.Lerp(startPos, endPos, t);
            pos.y += Mathf.Sin(t * Mathf.PI) * horseJumpArcHeight;

            transform.position = pos;
            transform.rotation = startRot;

            yield return null;
        }

        transform.position = endPos;
        transform.rotation = startRot;
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.cyan;

        Vector3 targetPos = transform.position + (transform.rotation * horseJumpOffset);

        Gizmos.DrawLine(transform.position, targetPos);
        Gizmos.DrawSphere(targetPos, 0.12f);
    }
}