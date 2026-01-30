using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(LineRenderer))]
public class PathVisualizer : MonoBehaviour
{
    [Header("Refs")]
    public SimplePathMover mover;          // có thể để trống, script sẽ tự tìm
    public LineRenderer line;

    [Header("Ground")]
    public LayerMask groundMask;
    public float lineHeightOffset = 0.05f;

    [Header("Ground sampling (optional)")]
    public bool bakeToGround = true;
    public float sampleStep = 0.25f;       // nhỏ hơn = bám sát hơn
    public float rayStartHeight = 6f;
    public float rayDistance = 30f;

    [Header("End Marker (Hand)")]
    public GameObject endMarkerPrefab;
    public Vector3 markerOffset = new Vector3(0, 0.05f, 0);
    public Vector3 markerEuler = Vector3.zero;

    [Header("Auto hide")]
    public bool hideWhenArrive = true;
    public float arriveDistance = 0.25f;   // đến gần đích thì ẩn

    GameObject markerInstance;
    bool hasPath;
    Vector3 endPoint;
    bool hasEnd;

    void Awake()
    {
        if (line == null) line = GetComponent<LineRenderer>();

        // ✅ tự tìm mover cả ở parent để tránh null
        if (mover == null)
        {
            mover = GetComponent<SimplePathMover>();
            if (mover == null) mover = GetComponentInParent<SimplePathMover>();
        }

        line.positionCount = 0;
        line.enabled = false;
    }

    void Update()
    {
        if (!hideWhenArrive || !hasPath) return;

        // ✅ ưu tiên theo isMoving
        if (mover != null && !mover.isMoving)
        {
            Clear();
            return;
        }

        // ✅ fallback: nếu isMoving chưa tắt, vẫn clear khi đã tới gần endPoint
        if (mover != null && hasEnd)
        {
            Vector3 p = mover.transform.position;
            Vector3 e = endPoint;
            p.y = 0f; e.y = 0f;

            if ((p - e).magnitude <= arriveDistance)
            {
                Clear();
            }
        }
    }

    // endPoint dùng đặt marker và kiểm tra arriveDistance
    public void ShowPath(List<Vector3> pathPoints, Vector3 endPointWorld)
    {
        if (pathPoints == null || pathPoints.Count == 0)
        {
            Clear();
            return;
        }

        hasPath = true;
        hasEnd = true;
        endPoint = endPointWorld;

        // ✅ nếu chỉ có 1 điểm (click cùng cell) => thêm điểm start để line hiện
        if (pathPoints.Count == 1)
        {
            Vector3 start = (mover != null) ? mover.transform.position : transform.position;
            pathPoints = new List<Vector3> { start, pathPoints[0] };
        }

        List<Vector3> finalPts = bakeToGround ? Bake(pathPoints) : new List<Vector3>(pathPoints);

        // nâng line lên khỏi mặt đất
        for (int i = 0; i < finalPts.Count; i++)
            finalPts[i] += Vector3.up * lineHeightOffset;

        line.enabled = true;
        line.positionCount = finalPts.Count;
        line.SetPositions(finalPts.ToArray());

        PlaceMarker(endPointWorld);
    }

    List<Vector3> Bake(List<Vector3> pts)
    {
        var baked = new List<Vector3>(pts.Count * 6);

        for (int i = 0; i < pts.Count - 1; i++)
        {
            Vector3 a = pts[i];
            Vector3 b = pts[i + 1];

            float dist = Vector3.Distance(a, b);
            int steps = Mathf.Max(1, Mathf.CeilToInt(dist / Mathf.Max(0.05f, sampleStep)));

            for (int s = 0; s <= steps; s++)
            {
                float t = s / (float)steps;
                Vector3 p = Vector3.Lerp(a, b, t);
                p = SnapToGround(p);

                if (baked.Count == 0 || (baked[baked.Count - 1] - p).sqrMagnitude > 0.0004f)
                    baked.Add(p);
            }
        }

        return baked;
    }

    Vector3 SnapToGround(Vector3 worldPos)
    {
        int mask = (groundMask.value == 0) ? Physics.DefaultRaycastLayers : groundMask.value;

        Vector3 origin = worldPos + Vector3.up * rayStartHeight;
        if (Physics.Raycast(origin, Vector3.down, out var hit, rayDistance, mask, QueryTriggerInteraction.Ignore))
            return hit.point;

        return worldPos;
    }

    void PlaceMarker(Vector3 worldPos)
    {
        if (endMarkerPrefab == null) return;

        Vector3 p = SnapToGround(worldPos) + markerOffset;

        if (markerInstance == null)
            markerInstance = Instantiate(endMarkerPrefab);

        markerInstance.SetActive(true);
        markerInstance.transform.position = p;
        markerInstance.transform.rotation = Quaternion.Euler(markerEuler);
    }

    public void Clear()
    {
        hasPath = false;
        hasEnd = false;

        if (line != null)
        {
            line.positionCount = 0;
            line.enabled = false;
        }

        if (markerInstance != null)
            markerInstance.SetActive(false);
    }
}
