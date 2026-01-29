using System.Collections.Generic;
using UnityEngine;

public class ColliderNavGraphManual : MonoBehaviour
{
    public LayerMask groundMask;
    public float rayHeight = 2f;

    private static readonly List<ColliderNavCell> Empty = new List<ColliderNavCell>(0);

    public IList<ColliderNavCell> GetNeighbors(ColliderNavCell cell)
    {
        if (cell == null) return Empty;
        return cell.NeighborsList; // trả về List luôn
    }

    public bool TryFindCellAtPosition(Vector3 worldPos, out ColliderNavCell cell)
    {
        Vector3 origin = worldPos + Vector3.up * rayHeight;
        if (Physics.Raycast(origin, Vector3.down, out var hit, rayHeight * 5f, groundMask, QueryTriggerInteraction.Ignore))
        {
            cell = hit.collider.GetComponent<ColliderNavCell>();
            return cell != null;
        }

        cell = null;
        return false;
    }
}