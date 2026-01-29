using System.Collections.Generic;
using UnityEngine;

public static class AStarPathfinder
{
    public static bool TryFindPath(ColliderNavGraphManual graph, ColliderNavCell start, ColliderNavCell goal, out List<ColliderNavCell> cellPath)
    {
        cellPath = null;
        if (start == null || goal == null) return false;

        if (start == goal)
        {
            cellPath = new List<ColliderNavCell> { start };
            return true;
        }

        var open = new List<ColliderNavCell> { start };
        var closed = new HashSet<ColliderNavCell>();

        var cameFrom = new Dictionary<ColliderNavCell, ColliderNavCell>();
        var gScore = new Dictionary<ColliderNavCell, float> { [start] = 0f };
        var fScore = new Dictionary<ColliderNavCell, float> { [start] = Heuristic(start, goal) };

        while (open.Count > 0)
        {
            ColliderNavCell current = open[0];
            float bestF = fScore.TryGetValue(current, out var f0) ? f0 : float.PositiveInfinity;

            for (int i = 1; i < open.Count; i++)
            {
                var c = open[i];
                float f = fScore.TryGetValue(c, out var ft) ? ft : float.PositiveInfinity;
                if (f < bestF) { bestF = f; current = c; }
            }

            if (current == goal)
            {
                cellPath = Reconstruct(cameFrom, current);
                return true;
            }

            open.Remove(current);
            closed.Add(current);

            var neigh = graph.GetNeighbors(current);
            for (int i = 0; i < neigh.Count; i++)
            {
                var n = neigh[i];
                if (n == null || closed.Contains(n)) continue;

                float tentativeG = gScore[current] + Cost(current, n);

                if (!open.Contains(n)) open.Add(n);
                else if (gScore.TryGetValue(n, out var oldG) && tentativeG >= oldG) continue;

                cameFrom[n] = current;
                gScore[n] = tentativeG;
                fScore[n] = tentativeG + Heuristic(n, goal);
            }
        }

        return false;
    }

    static float Cost(ColliderNavCell a, ColliderNavCell b)
        => Vector3.Distance(a.GetBestCenterPoint(), b.GetBestCenterPoint());

    static float Heuristic(ColliderNavCell a, ColliderNavCell b)
        => Vector3.Distance(a.GetBestCenterPoint(), b.GetBestCenterPoint());

    static List<ColliderNavCell> Reconstruct(Dictionary<ColliderNavCell, ColliderNavCell> cameFrom, ColliderNavCell current)
    {
        var total = new List<ColliderNavCell> { current };
        while (cameFrom.TryGetValue(current, out var prev))
        {
            current = prev;
            total.Add(current);
        }
        total.Reverse();
        return total;
    }
}
