using System.Collections.Generic;
using UnityEngine;
using Minigames.DoorDash;

public class BotDoorAI : MonoBehaviour
{
    [Header("Movement")]
    public float moveSpeed = 3.5f;
    public float rotateSpeed = 10f;
    public float passDistance = 2f;

    [Header("ZigZag")]
    public float zigzagStrength = 0.6f;
    public float zigzagSpeed = 2f;

    [Header("Refs")]
    public Animator animator;
    public GameObject model;

    private Rigidbody rb;

    private List<DoorGroupHandler> groups;
    private List<DoorHandler> doors;

    private int currentGroupIndex = 0;
    private int currentDoorIndex = 0;

    private DoorHandler targetDoor;
    private Vector3 targetPos;

    private float zigzagOffset;

    private BotState state;

    // ================= INIT =================

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rb.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;

        zigzagOffset = Random.Range(0f, 100f);

        groups = new List<DoorGroupHandler>(
            FindObjectsOfType<DoorGroupHandler>()
        );

        // sort group theo Z (từ thấp → cao)
        groups.Sort((a, b) =>
            a.transform.position.z.CompareTo(b.transform.position.z)
        );

        LoadGroup();
    }

    // ================= UPDATE =================

    void Update()
    {
        MoveToTarget();
    }

    // ================= MOVE CORE =================

    void MoveToTarget()
    {
        Vector3 dir = targetPos - transform.position;
        dir.y = 0;

        bool isMoving = dir.magnitude > 0.2f;
        animator.SetBool("isMoving", isMoving);

        if (!isMoving)
        {
            rb.velocity = new Vector3(0, rb.velocity.y, 0);
            return;
        }

        // ZigZag
        float zigzag = Mathf.Sin(Time.time * zigzagSpeed + zigzagOffset)
                       * zigzagStrength;

        Vector3 zigzagDir = Vector3.Cross(dir.normalized, Vector3.up) * zigzag;
        Vector3 finalDir = (dir + zigzagDir).normalized;

        // Rigidbody move (đẩy nhau)
        Vector3 velocity = finalDir * moveSpeed;
        velocity.y = rb.velocity.y;
        rb.velocity = velocity;

        // Rotate model
        Quaternion targetRot = Quaternion.LookRotation(finalDir);
        model.transform.rotation = Quaternion.Slerp(
            model.transform.rotation,
            targetRot,
            Time.deltaTime * rotateSpeed
        );
    }

    // ================= GROUP =================

    void LoadGroup()
    {
        currentDoorIndex = 0;

        doors = new List<DoorHandler>(
            groups[currentGroupIndex].GetComponentsInChildren<DoorHandler>()
        );

        // Nếu CHƯA biết cửa đúng → random thứ tự cửa
        if (!DoorKnowledge.correctDoors.ContainsKey(currentGroupIndex))
        {
            ShuffleDoors(doors);
        }

        // Nếu ĐÃ biết cửa đúng → đi thẳng
        if (DoorKnowledge.correctDoors.ContainsKey(currentGroupIndex))
        {
            int correctIndex = DoorKnowledge.correctDoors[currentGroupIndex];
            targetDoor = doors.Find(d => d.doorIndex == correctIndex);
        }
        else
        {
            targetDoor = doors[currentDoorIndex];
        }

        targetPos = targetDoor.transform.position;
        state = BotState.MoveToDoor;
    }
    void ShuffleDoors(List<DoorHandler> list)
    {
        for (int i = 0; i < list.Count; i++)
        {
            int rand = Random.Range(i, list.Count);
            DoorHandler temp = list[i];
            list[i] = list[rand];
            list[rand] = temp;
        }
    }


    // ================= DOOR FAIL =================

    public void OnDoorFailed()
    {
        // Lùi lại để tránh kẹt collider
        targetPos = transform.position - transform.forward * 1.5f;
        state = BotState.BackOff;

        Invoke(nameof(MoveToNextDoor), 0.4f);
    }

    void MoveToNextDoor()
    {
        currentDoorIndex++;
        if (currentDoorIndex >= doors.Count) return;

        targetDoor = doors[currentDoorIndex];

        // Lệch sang X cửa tiếp theo
        targetPos = new Vector3(
            targetDoor.transform.position.x,
            transform.position.y,
            transform.position.z
        );

        state = BotState.MoveSide;

        Invoke(nameof(GoToDoor), 0.4f);
    }

    void GoToDoor()
    {
        targetPos = targetDoor.transform.position;
        state = BotState.MoveToDoor;
    }

    // ================= DOOR PASS =================

    public void OnDoorPassed()
    {
        // Share cửa đúng cho BOT khác
        if (!DoorKnowledge.correctDoors.ContainsKey(currentGroupIndex))
        {
            DoorKnowledge.correctDoors.Add(currentGroupIndex, targetDoor.doorIndex);
        }

        // Đi xuyên qua cửa
        targetPos = targetDoor.transform.position +
                    targetDoor.transform.forward * passDistance;

        state = BotState.PassThroughDoor;

        Invoke(nameof(GoToNextGroup), 0.6f);
    }

    void GoToNextGroup()
    {
        currentGroupIndex++;

        if (currentGroupIndex >= groups.Count)
        {
            Debug.Log("BOT FINISH");
            rb.velocity = Vector3.zero;
            animator.SetBool("isMoving", false);
            return;
        }

        LoadGroup();
    }
}

// ================= STATE =================

public enum BotState
{
    MoveToDoor,
    BackOff,
    MoveSide,
    PassThroughDoor
}
