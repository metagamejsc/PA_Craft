using System;
using System.Collections;
using UnityEngine;

public class PlayerSequenceController : MonoBehaviour
{
    public PlayerChar player;
    public Transform[] movePoints; // các điểm cần đi qua
    public MonsterController monster1;
    public MonsterController monster2;

    private int currentIndex = 0;

    private void Start()
    {
        StartCoroutine(Sequence_Start());
    }

    IEnumerator Sequence_Start()
    {

        // Bước 1: đi tới điểm đầu
        yield return MovePlayerTo(movePoints[0]);

        // Bước 2: xoay camera + player nhìn monster
        LookAtMonster(monster1.transform);

        // Bước 3: chờ monster chết
        monster1.onDeath += OnMonster1Death;
    }

    void OnMonster1Death()
    {
        monster1.onDeath -= OnMonster1Death;
        StartCoroutine(Sequence_AfterMonster1());
    }
    IEnumerator LookAtMonsterSmooth(Transform monster, float duration = 0.5f)
    {
        //MouseLook.ins.allowInput = false;

        Vector3 dir = monster.position - player.transform.position;
        dir.y = 0;

        Quaternion startRot = player.model.transform.rotation;
        Quaternion targetRot = Quaternion.LookRotation(dir);

        float t = 0;
        while (t < 1)
        {
            t += Time.deltaTime / duration;
            player.model.transform.rotation = Quaternion.Slerp(startRot, targetRot, t);
            //MouseLook.ins.SetRotationFromDirection(-dir);
            yield return null;
        }

        //MouseLook.ins.allowInput = true;
    }

    IEnumerator Sequence_AfterMonster1()
    {
        // đi tới điểm tiếp theo
        yield return new WaitForSeconds(1.5f);
        yield return MovePlayerTo(movePoints[1]);
        yield return LookAtMonsterSmooth(monster2.transform);
        // gọi hàm khi tới nơi
        OnReachNextPoint();
    }

    void OnReachNextPoint()
    {
        Debug.Log("Player đã tới vị trí tiếp theo");
        // Gọi logic tiếp theo ở đây
        LunaManager.ins.ShowEndCardEmpty();
    }

    IEnumerator MovePlayerTo(Transform target)
    {
        //MouseLook.ins.allowInput = false;
        player.animator.SetBool("isMoving", true);

        while (Vector3.Distance(player.transform.position, target.position) > 0.2f)
        {
            Vector3 dir = (target.position - player.transform.position).normalized;
            dir.y = 0;

            player.rigidbody.velocity = dir * player.moveSpeed;

            // xoay model theo hướng di chuyển
            Quaternion rot = Quaternion.LookRotation(dir);
            player.model.transform.rotation = Quaternion.Slerp(
                player.model.transform.rotation, rot, Time.deltaTime * 10f);

            // xoay camera theo hướng di chuyển
           // MouseLook.ins.SetRotationFromDirection(-dir);

            yield return null;
        }

        player.rigidbody.velocity = Vector3.zero;
        player.animator.SetBool("isMoving", false);
        //MouseLook.ins.allowInput = true;
    }

    void LookAtMonster(Transform monster)
    {
        Vector3 dir = monster.position - player.transform.position;
        dir.y = 0;

        // xoay model
        player.model.transform.rotation = Quaternion.LookRotation(dir);

        // xoay camera
        //MouseLook.ins.SetRotationFromDirection(-dir);
    }
}
