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

    [Header("Options")]
    public bool stopIdleWhileMounting = true;

    private bool isMounted = false;
    private bool isMounting = false;

    void Start()
    {
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

        // 6) Horse jump
        if (horseMountAnimator != null)
        {
            horseMountAnimator.PlayJump();
            horseMountAnimator.SetMounted(true);
        }

        isMounted = true;
        isMounting = false;

        if (LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
            LunaManager.ins.OnClickEndCard();
        }
    }
}