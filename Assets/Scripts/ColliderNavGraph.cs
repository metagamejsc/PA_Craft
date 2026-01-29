using System.Collections.Generic;
using UnityEngine;

public class ColliderNavGraph : MonoBehaviour
{
    [Header("Connection thresholds")]
    public float connectHorizontal = 2.0f; // tạm tăng lớn để test (sau giảm)
    public float stepHeight = 3.0f;        // tạm tăng lớn để test (sau giảm)

    private readonly List<ColliderNavCell> _cells = new List<ColliderNavCell>();
    private readonly Dictionary<ColliderNavCell, List<ColliderNavCell>> _neighbors = new Dictionary<ColliderNavCell, List<ColliderNavCell>>();

    void Start() => Rebuild();

    public void Rebuild()
    {
        _cells.Clear();
        _neighbors.Clear();

        _cells.AddRange(FindObjectsOfType<ColliderNavCell>());
        foreach (var c in _cells)
        {
            c.Ensure();
            _neighbors[c] = new List<ColliderNavCell>();
        }

        float minHoriz = float.PositiveInfinity;
        float minDy = float.PositiveInfinity;

        int links = 0;
        for (int i = 0; i < _cells.Count; i++)
        {
            for (int j = i + 1; j < _cells.Count; j++)
            {
                var a = _cells[i];
                var b = _cells[j];
                if (a == null || b == null || a.Col == null || b.Col == null) continue;

                Vector3 pA = a.Col.ClosestPoint(b.Col.bounds.center);
                Vector3 pB = b.Col.ClosestPoint(a.Col.bounds.center);

                float horiz = Vector2.Distance(new Vector2(pA.x, pA.z), new Vector2(pB.x, pB.z));
                float dy = Mathf.Abs(pA.y - pB.y);

                if (horiz < minHoriz) minHoriz = horiz;
                if (dy < minDy) minDy = dy;

                if (horiz <= connectHorizontal && dy <= stepHeight)
                {
                    AddNeighbor(a, b);
                    links++;
                }
            }
        }

        Debug.Log($"[ColliderNavGraph] Cells={_cells.Count}, Links={links}, MinHoriz={minHoriz:F3}, MinDy={minDy:F3}");
    }

    void AddNeighbor(ColliderNavCell a, ColliderNavCell b)
    {
        if (_neighbors.TryGetValue(a, out var la) && !la.Contains(b)) la.Add(b);
        if (_neighbors.TryGetValue(b, out var lb) && !lb.Contains(a)) lb.Add(a);
    }

    public IReadOnlyList<ColliderNavCell> GetNeighbors(ColliderNavCell cell)
    {
        if (cell != null && _neighbors.TryGetValue(cell, out var list)) return list;
        return System.Array.Empty<ColliderNavCell>();
    }

    public bool TryFindCellAtPosition(Vector3 worldPos, out ColliderNavCell cell)
    {
        // raycast tự do, lấy collider nào có ColliderNavCell
        if (Physics.Raycast(worldPos + Vector3.up * 2f, Vector3.down, out var hit, 50f))
        {
            cell = hit.collider.GetComponent<ColliderNavCell>();
            return cell != null;
        }
        cell = null;
        return false;
    }
}
