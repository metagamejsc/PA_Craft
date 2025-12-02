using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyChase : MonoBehaviour
{
    [Header("References")]
    public Transform player;
    public ConstrainedMazeGenerator maze;
    public Transform model; // 🎯 Model để xoay (kéo trong Editor)
    public Rigidbody rb; // 🎯 Model để xoay (kéo trong Editor)

    [Header("Settings")]
    public float speed = 3f;
    public LayerMask obstacleMask;

    [Header("Model Rotation Offset")]
    public Vector3 modelRotationOffset = new Vector3(0f, -90f, 0f); // fix model bị lệch Y

    private Coroutine movingCoroutine;
    private bool isChasing = true;

    void Start()
    {
        rb=GetComponent<Rigidbody>();
        speed = LunaManager.ins.enemySpeed;
        StartCoroutine(UpdatePathRoutine());
    }

    IEnumerator UpdatePathRoutine()
    {
        while (isChasing)
        {
            if (player == null || maze == null)
            {
                yield return null;
                continue;
            }

            if (LunaManager.ins.isCretivePause)
            {
                yield return null;
                continue;
            }
            
            if (CanSeePlayer())
            {
                if (movingCoroutine != null)
                    StopCoroutine(movingCoroutine);

                movingCoroutine = StartCoroutine(MoveDirectlyToPlayer());
            }
            else
            {
                Vector2Int start = GridUtil.WorldToGrid(transform.position, maze);
                Vector2Int target = GridUtil.WorldToGrid(player.position, maze);

                List<Vector2Int> path = Pathfinding.FindPath(start, target, maze);

                if (movingCoroutine != null)
                    StopCoroutine(movingCoroutine);

                movingCoroutine = StartCoroutine(FollowPath(path));
            }

            yield return new WaitForSeconds(0.5f);
        }
    }

    IEnumerator MoveDirectlyToPlayer()
    {
        while (CanSeePlayer())
        {
            Vector3 targetXZ = new Vector3(player.position.x, transform.position.y, player.position.z);
            Vector3 moveDir = (targetXZ - transform.position).normalized;
            RotateTowards(moveDir);

            rb.MovePosition(transform.position + moveDir * speed * Time.fixedDeltaTime);

            if ((transform.position - player.position).sqrMagnitude < 0.25f)
            {
                OnPlayerCaught();
                yield break;
            }

            yield return null;
        }
    }

    IEnumerator FollowPath(List<Vector2Int> path)
    {
        foreach (var step in path)
        {
            Vector3 targetPos = GridUtil.GridToWorld(step, maze);
            Vector3 targetXZ = new Vector3(targetPos.x, transform.position.y, targetPos.z);

            while ((transform.position - targetXZ).sqrMagnitude > 0.01f)
            {
                Vector3 moveDir = (targetXZ - transform.position).normalized;
                RotateTowards(moveDir);

                rb.MovePosition(transform.position + moveDir * speed * Time.fixedDeltaTime);

                if ((transform.position - player.position).sqrMagnitude < 0.25f)
                {
                    OnPlayerCaught();
                    yield break;
                }

                if (CanSeePlayer())
                {
                    StartCoroutine(MoveDirectlyToPlayer());
                    yield break;
                }

                yield return null;
            }
        }
    }

    bool CanSeePlayer()
    {
        Vector3 origin = transform.position + Vector3.up * 0.5f;
        Vector3 dirToPlayer = (player.position - transform.position).normalized;
        float distance = Vector3.Distance(transform.position, player.position);

        return !Physics.Raycast(origin, dirToPlayer, distance, obstacleMask);
    }

    void RotateTowards(Vector3 direction)
    {
        if (direction == Vector3.zero || model == null) return;

        Quaternion targetRotation = Quaternion.LookRotation(direction, Vector3.up);
        Quaternion offset = Quaternion.Euler(modelRotationOffset);
        model.rotation = targetRotation * offset;
    }

    void OnPlayerCaught()
    {
        //isChasing = false;
        Debug.LogWarning("Player bị bắt!");
        player.GetComponent<PlayerChar>().Die();
        LunaManager.ins.ShowEndCard(2f);
        // TODO: xử lý kết thúc game ở đây
        // Time.timeScale = 0f;
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            OnPlayerCaught();
        }
    }
}
