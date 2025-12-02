using System.Collections.Generic;
using UnityEngine;

public static class Pathfinding
{
    public static List<Vector2Int> FindPath(Vector2Int start, Vector2Int target, ConstrainedMazeGenerator maze)
    {
        Queue<Vector2Int> frontier = new Queue<Vector2Int>();
        Dictionary<Vector2Int, Vector2Int> cameFrom = new Dictionary<Vector2Int, Vector2Int>();
        frontier.Enqueue(start);
        cameFrom[start] = start;

        while (frontier.Count > 0)
        {
            Vector2Int current = frontier.Dequeue();
            if (current == target) break;

            foreach (var next in GetNeighbors(current, maze))
            {
                if (!cameFrom.ContainsKey(next))
                {
                    frontier.Enqueue(next);
                    cameFrom[next] = current;
                }
            }
        }

        List<Vector2Int> path = new List<Vector2Int>();
        if (!cameFrom.ContainsKey(target)) return path;

        Vector2Int step = target;
        while (step != start)
        {
            path.Add(step);
            step = cameFrom[step];
        }
        path.Reverse();
        return path;
    }

    private static List<Vector2Int> GetNeighbors(Vector2Int pos, ConstrainedMazeGenerator maze)
    {
        List<Vector2Int> result = new List<Vector2Int>();
        var cell = maze.Cells[pos.x, pos.y];

        if (!cell.wallTop && pos.y + 1 < maze.Height)
            result.Add(new Vector2Int(pos.x, pos.y + 1));
        if (!cell.wallBottom && pos.y - 1 >= 0)
            result.Add(new Vector2Int(pos.x, pos.y - 1));
        if (!cell.wallLeft && pos.x - 1 >= 0)
            result.Add(new Vector2Int(pos.x - 1, pos.y));
        if (!cell.wallRight && pos.x + 1 < maze.Width)
            result.Add(new Vector2Int(pos.x + 1, pos.y));

        return result;
    }
}