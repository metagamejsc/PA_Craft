using System.Collections.Generic;
using UnityEngine;

public class ClickToMoveColliderNav : MonoBehaviour
{
    public Camera cam;
    public LayerMask groundMask;
    public ColliderNavGraphManual graph;
    public SimplePathMover mover;

    void Reset()
    {
        cam = Camera.main;
        mover = GetComponent<SimplePathMover>();
    }

    void Update()
    {
        if (!Input.GetMouseButtonDown(0)) return;
        if (cam == null || graph == null || mover == null) return;

        Ray ray = cam.ScreenPointToRay(Input.mousePosition);
        if (!Physics.Raycast(ray, out var hit, 500f, groundMask, QueryTriggerInteraction.Ignore))
            return;

        var goalCell = hit.collider.GetComponent<ColliderNavCell>();
        if (goalCell == null) return;

        if (!graph.TryFindCellAtPosition(mover.transform.position, out var startCell))
            return;

        if (AStarPathfinder.TryFindPath(graph, startCell, goalCell, out var cellPath))
        {
            var worldPath = new List<Vector3>(cellPath.Count + 1);
            foreach (var c in cellPath) worldPath.Add(c.GetBestCenterPoint());
            worldPath.Add(hit.point);
            mover.MoveAlongPath(worldPath);
        }
    }
}