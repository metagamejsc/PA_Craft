using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Collider))]
public class EnemyEncounter : MonoBehaviour, IInteractable
{
    [Header("Score Logic")]
    public int enemyPower = 10;          // cần >= enemyPower để thắng
    public int rewardPoints =>enemyPower;        // thắng thì +rewardPoints
    public bool destroyOnDefeat = true;
    public bool isBoss = false;

    [Header("Engage")]
    public Transform engagePoint;        // null -> dùng transform.position
    public float engageDistance = 1.2f;  // player đứng cách enemy bao xa

    [Header("Enemy Animator")]
    public Animator enemyAnimator;       // kéo animator của model 3D vào (hoặc để null sẽ tự tìm)
    public string walkBool = "isWalking";
    public string attackTrigger = "Attack";
    public string dieTrigger = "Die";
    public float attackAnimTime = 0.9f;
    public float dieAnimTime = 1.0f;

    [Header("Optional Enemy Move")]
    public float enemyWalkSpeed = 0f;    // =0 thì enemy đứng yên (vẫn có thể play walk nếu bạn muốn)
    public bool playWalkWhileApproach = true;

    [Header("UI Label (optional)")]
    public WorldValueLabelTMP label;     // label hiển thị rewardPoints (+ xanh / - đỏ)

    private Collider col;
    private bool used;

    void Awake()
    {
        col = GetComponent<Collider>();
        col.isTrigger = true;

        if (enemyAnimator == null)
            enemyAnimator = GetComponentInChildren<Animator>(true);

        // label hiển thị điểm của enemy (reward)
        if (label != null)
            label.SetValue(rewardPoints);
    }

    void OnValidate()
    {
        if (label != null)
            label.SetValue(rewardPoints);
    }

    public bool CanInteract(PlayerInteractionController player)
        => !used && player != null && !player.IsDead;

    public IEnumerator Interact(PlayerInteractionController player)
    {
        player.IsBusy = true;
        used = true;
        if (col) col.enabled = false;

        Vector3 enemyPos = (engagePoint != null) ? engagePoint.position : transform.position;

        // Tính vị trí đứng của player trước mặt enemy (theo hướng player->enemy lúc chạm)
        Vector3 toPlayer = player.transform.position - enemyPos;
        toPlayer.y = 0f;
        if (toPlayer.sqrMagnitude < 0.0001f) toPlayer = Vector3.back;
        toPlayer.Normalize();

        Vector3 playerStandPos = enemyPos + toPlayer * engageDistance;

        // Player đi tới gần enemy
        if (playWalkWhileApproach) SetEnemyWalk(true);
        IEnumerator moveEnemy = (enemyWalkSpeed > 0.01f) ? EnemyMoveTowards(enemyPos, playerStandPos) : null;

        if (moveEnemy != null) player.StartCoroutine(moveEnemy);
        yield return player.MoveNear(playerStandPos, stopDistance: 0.2f);

        SetEnemyWalk(false);

        // Quay mặt vào nhau
        Transform enemyLookT  = (enemyAnimator != null) ? enemyAnimator.transform : transform;
        Transform playerLookT = (player.animator != null) ? player.animator.transform : player.transform;

        FaceXZ(enemyLookT, playerLookT.position);
        FaceXZ(playerLookT, enemyLookT.position);

        // Play đánh nhau
        TriggerEnemyAttack();
        yield return player.PlayFight();
        player.IsBusy = false;
        // Kết quả
        if (!player.Stats.HasAtLeast(enemyPower))
        {
            // Thua -> player chết
            yield return player.PlayDie();

            // Enemy quay lại idle (tuỳ bạn)
            SetEnemyWalk(false);

            // Nếu bạn muốn enemy vẫn ở lại để player khác chạm, thì bật lại collider:
            // used = false; if (col) col.enabled = true;
            yield break;
        }

        // Thắng -> enemy chết + cộng điểm
        TriggerEnemyDie();
        yield return new WaitForSeconds(dieAnimTime);

        player.Stats.AddPoints(rewardPoints);

        if (destroyOnDefeat) Destroy(gameObject);
        else gameObject.SetActive(false);
    }

    public Transform GetTransform()
    {
        return transform;
    }

    IEnumerator EnemyMoveTowards(Vector3 enemyOrigin, Vector3 playerTarget)
    {
        // Enemy đi 1 đoạn nhỏ về phía player để “có walk”
        // (giữ đơn giản: enemy tiến tới gần playerTarget một chút, không vượt quá enemyOrigin nhiều)
        Vector3 dir = (playerTarget - enemyOrigin);
        dir.y = 0f;
        if (dir.sqrMagnitude < 0.0001f) yield break;
        dir.Normalize();

        Vector3 target = enemyOrigin + dir * 0.4f; // tiến 0.4m, bạn chỉnh nếu muốn

        SetEnemyWalk(true);

        while ((transform.position - target).sqrMagnitude > 0.02f)
        {
            transform.position = Vector3.MoveTowards(transform.position, target, enemyWalkSpeed * Time.deltaTime);
            yield return null;
        }

        SetEnemyWalk(false);
    }

    void SetEnemyWalk(bool on)
    {
        if (enemyAnimator == null || string.IsNullOrEmpty(walkBool)) return;
        enemyAnimator.SetBool(walkBool, on);
    }

    void TriggerEnemyAttack()
    {
        if (enemyAnimator == null || string.IsNullOrEmpty(attackTrigger)) return;
        enemyAnimator.SetTrigger(attackTrigger);
        // Nếu bạn muốn chờ theo anim enemy thay vì player:
        // StartCoroutine(Wait(attackAnimTime));
    }

    void TriggerEnemyDie()
    {
        LunaManager.ins.CheckClickShowEndCard();
        if (enemyAnimator == null || string.IsNullOrEmpty(dieTrigger)) return;
        enemyAnimator.SetTrigger(dieTrigger);
        if (isBoss)
        {
            GetComponent<AudioSource>().Play();
            LunaManager.ins.ShowEndCardEmpty();
        }
    }

    static void FaceXZ(Transform t, Vector3 lookAtWorld)
    {
        Vector3 d = lookAtWorld - t.position;
        d.y = 0f;
        if (d.sqrMagnitude < 0.0001f) return;
        t.rotation = Quaternion.LookRotation(d.normalized);
    }
}
