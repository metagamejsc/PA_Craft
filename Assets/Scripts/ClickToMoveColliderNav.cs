using System.Collections.Generic;
using UnityEngine;

public class ClickToMoveColliderNav : MonoBehaviour
{
    public Camera cam;
    public LayerMask groundMask;
    public ColliderNavGraphManual graph;
    public SimplePathMover mover;
    public PlayerInteractionController playerController;
    public GameObject handTutorial;
    [Header("Input Delay")]
    public float clickCooldown = 0.15f; // 0.1~0.2s là ổn
    float _nextClickTime = 0f;

    [Header("Visual")]
    public PathVisualizer pathVis; // kéo thả PathVisualizer (thường gắn trên Player)

    [Header("Snap waypoint to ground")]
    public float snapRayHeight = 2f;
    public float snapRayDistance = 10f;

    void Reset()
    {
        cam = Camera.main;
        mover = GetComponent<SimplePathMover>();
        pathVis = GetComponent<PathVisualizer>();
        playerController = GetComponent<PlayerInteractionController>();
    }

    void Awake()
    {
        if (cam == null) cam = Camera.main;
        if (mover == null) mover = GetComponent<SimplePathMover>();
        if (pathVis == null) pathVis = GetComponent<PathVisualizer>();
        if (playerController == null) playerController = GetComponent<PlayerInteractionController>();
    }

    void Update()
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        if (playerController.IsBusy|| playerController.IsDead)
        {
            return;
        }
        if (Time.time < _nextClickTime) return;          // ✅ chặn spam click
        if (!Input.GetMouseButtonDown(0)) return;
        if (handTutorial!= null)
        {
            handTutorial.SetActive(false);
        }
        _nextClickTime = Time.time + clickCooldown; 
        
        if (cam == null || graph == null || mover == null) return;

        Ray ray = cam.ScreenPointToRay(Input.mousePosition);
        if (!Physics.Raycast(ray, out var hit, 500f, groundMask, QueryTriggerInteraction.Ignore))
            return;


        var goalCell = hit.collider.GetComponent<ColliderNavCell>();
        if (goalCell == null) return;

        if (!graph.TryFindCellAtPosition(mover.transform.position, out var startCell))
            return;

        // ✅ Nếu click ngay trong cell hiện tại -> đi thẳng tới điểm click
        if (startCell == goalCell)
        {
            // path chạy
            var movePath = new List<Vector3> { hit.point };
            mover.MoveAlongPath(movePath);

            // path vẽ (2 điểm) để line hiện
            if (pathVis != null)
            {
                var drawPath = new List<Vector3> { mover.transform.position, hit.point };
                pathVis.ShowPath(drawPath, hit.point);
            }
            return;
        }


        if (!AStarPathfinder.TryFindPath(graph, startCell, goalCell, out var cellPath) || cellPath == null || cellPath.Count < 2)
        {
            var direct = new List<Vector3> { hit.point };
            mover.MoveAlongPath(direct);
            if (pathVis != null) pathVis.ShowPath(direct, hit.point);
            return;
        }

        // Build path bằng "điểm nối giữa collider" thay vì tâm cell
        var worldPath = new List<Vector3>();

        for (int i = 0; i < cellPath.Count - 1; i++)
        {
            var a = cellPath[i];
            var b = cellPath[i + 1];
            if (a == null || b == null || a.Col == null || b.Col == null) continue;

            Vector3 wp = GetLinkPoint(a, b);

            // tránh add waypoint trùng/siêu gần nhau
            if (worldPath.Count == 0 || (worldPath[worldPath.Count - 1] - wp).sqrMagnitude > 0.01f)
                worldPath.Add(wp);
        }

        // điểm cuối chính xác
        worldPath.Add(hit.point);

        mover.MoveAlongPath(worldPath);
        if (pathVis != null) pathVis.ShowPath(worldPath, hit.point);
    }

    Vector3 GetLinkPoint(ColliderNavCell a, ColliderNavCell b)
    {
        // điểm gần nhất trên mỗi collider về phía collider kia
        Vector3 pA = a.Col.ClosestPoint(b.Col.bounds.center);
        Vector3 pB = b.Col.ClosestPoint(a.Col.bounds.center);

        Vector3 mid = (pA + pB) * 0.5f;

        // snap xuống ground để đúng Y (dốc/tầng)
        Vector3 origin = mid + Vector3.up * snapRayHeight;
        if (Physics.Raycast(origin, Vector3.down, out var groundHit, snapRayHeight + snapRayDistance, groundMask, QueryTriggerInteraction.Ignore))
            mid.y = groundHit.point.y;

        return mid;
    }
}
