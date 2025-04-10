using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveByLine : MonoBehaviour
{
    public BaseCharacter baseCharacter;
    [SerializeField] private List<Transform> waypoints;
    [SerializeField] public bool isFinishMove;

    public int currentWaypointIndex = 0;
public void SetWaypoints(List<Transform> newWaypoints)
    {
        waypoints = newWaypoints;
        currentWaypointIndex = 0; 
    }

private void Start()
{
    baseCharacter = GetComponent<BaseCharacter>();
}

void Update()
    {
        if (isFinishMove)
        {
            return;
        }
        if (waypoints.Count == 0) return;

        // Lấy điểm đích hiện tại
        Transform targetWaypoint = waypoints[currentWaypointIndex];

        // Di chuyển đối tượng đến điểm đích
        baseCharacter.HandleMovementByPoint(targetWaypoint);
        // Kiểm tra nếu đã đến điểm đích
        if (Vector3.Distance(transform.position, targetWaypoint.position) < 0.1f)
        {
            currentWaypointIndex++;
            // Nếu đã đến điểm cuối cùng
            if (currentWaypointIndex >= waypoints.Count)
            {
                isFinishMove = true;
                currentWaypointIndex = waypoints.Count - 1;
            }
        }
    }

    // Vẽ đường đi trong Scene để dễ theo dõi
    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        for (int i = 0; i < waypoints.Count; i++)
        {
            if (waypoints[i] != null)
            {
                Gizmos.DrawSphere(waypoints[i].position, 0.2f);
                if (i < waypoints.Count - 1)
                {
                    Gizmos.DrawLine(waypoints[i].position, waypoints[i + 1].position);
                }
            }
        }
    }
}
