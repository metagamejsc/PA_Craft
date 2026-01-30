using System;
using System.Collections;
using UnityEngine;

public class CameraMoveWithDelay : MonoBehaviour
{
    [Header("Camera Points")]
    public Transform startPoint;   // điểm nhìn ban đầu
    public Transform endPoint;     // điểm camera sẽ move tới

    [Header("Timing")]
    public float lookDelay = 2f;   // thời gian đứng nhìn ở startPoint
    public float moveDuration = 2f;
    public PlayerInteractionController player;

    Coroutine routine;

    private void Start()
    {
        Play(player);
    }

    public void Play(PlayerInteractionController player)
    {
        if (routine != null)
            StopCoroutine(routine);

        routine = StartCoroutine(PlayRoutine(player));
    }

    IEnumerator PlayRoutine(PlayerInteractionController player)
    {
        // 🔒 khóa player
        player.SetBusy(true);

        // 1️⃣ snap camera vào start point
        transform.position = startPoint.position;
        transform.rotation = startPoint.rotation;

        // 2️⃣ delay nhìn
        yield return new WaitForSeconds(lookDelay);

        // 3️⃣ move camera sang end point
        Vector3 fromPos = transform.position;
        Quaternion fromRot = transform.rotation;

        float t = 0f;
        while (t < 1f)
        {
            t += Time.deltaTime / moveDuration;
            transform.position = Vector3.Lerp(fromPos, endPoint.position, t);
            transform.rotation = Quaternion.Slerp(fromRot, endPoint.rotation, t);
            yield return null;
        }

        // 4️⃣ đảm bảo chính xác
        transform.position = endPoint.position;
        transform.rotation = endPoint.rotation;

        // 🔓 mở khóa player
        player.SetBusy(false);
    }
}