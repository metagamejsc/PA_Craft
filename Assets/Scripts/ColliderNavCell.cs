using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Collider))]
public class ColliderNavCell : MonoBehaviour
{
    public Collider Col { get; private set; }
    public List<ColliderNavCell> NeighborsList => neighbors;

    [Header("Walk constraints")]
    public float maxSlopeAngle = 60f;

    [Header("Manual neighbors (drag & drop)")]
    [SerializeField] private List<ColliderNavCell> neighbors = new List<ColliderNavCell>();
    public IReadOnlyList<ColliderNavCell> Neighbors => neighbors;

    void Awake() => Ensure();
    void OnEnable() => Ensure();
    void OnValidate() => Ensure();

    public void Ensure()
    {
        if (Col == null) Col = GetComponent<Collider>();
    }

    public bool TryGetSurfaceHitAtXZ(Vector3 worldPos, float rayHeight, out RaycastHit hit)
    {
        Ensure();
        Vector3 origin = new Vector3(worldPos.x, Col.bounds.max.y + rayHeight, worldPos.z);
        Ray ray = new Ray(origin, Vector3.down);
        return Col.Raycast(ray, out hit, (Col.bounds.size.y + rayHeight) * 3f);
    }

    public Vector3 GetBestCenterPoint(float rayHeight = 2f)
    {
        Ensure();
        Vector3 p = Col.bounds.center;
        if (TryGetSurfaceHitAtXZ(p, rayHeight, out var hit))
            return hit.point;

        return new Vector3(p.x, Col.bounds.max.y, p.z);
    }

    public bool IsWalkable(RaycastHit hit)
    {
        return Vector3.Angle(hit.normal, Vector3.up) <= maxSlopeAngle;
    }

    // ==== Editor helpers (safe to call at runtime too) ====

    public List<ColliderNavCell> GetNeighborsMutable() => neighbors;

    public bool HasNeighbor(ColliderNavCell other)
        => other != null && neighbors.Contains(other);

    public void AddNeighbor(ColliderNavCell other, bool bidirectional = true)
    {
        if (other == null || other == this) return;
        if (!neighbors.Contains(other)) neighbors.Add(other);
        if (bidirectional) other.AddNeighbor(this, false);
    }

    public void RemoveNeighbor(ColliderNavCell other, bool bidirectional = true)
    {
        if (other == null || other == this) return;
        neighbors.Remove(other);
        if (bidirectional) other.RemoveNeighbor(this, false);
    }

    public void MakeBidirectional()
    {
        for (int i = 0; i < neighbors.Count; i++)
        {
            var n = neighbors[i];
            if (n == null || n == this) continue;
            if (!n.HasNeighbor(this))
                n.AddNeighbor(this, false);
        }
    }

    public void ClearNeighbors(bool bidirectional = false)
    {
        if (!bidirectional)
        {
            neighbors.Clear();
            return;
        }

        // remove opposite links too
        var copy = new List<ColliderNavCell>(neighbors);
        for (int i = 0; i < copy.Count; i++)
            RemoveNeighbor(copy[i], true);
    }

    void OnDrawGizmosSelected()
    {
        Ensure();
        Gizmos.color = Color.yellow;
        Vector3 a = GetBestCenterPoint();

        foreach (var n in neighbors)
        {
            if (n == null) continue;
            Vector3 b = n.GetBestCenterPoint();
            Gizmos.DrawLine(a, b);
        }
    }
}
