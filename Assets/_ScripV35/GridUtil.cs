using UnityEngine;

public static class GridUtil
{
    public static Vector2Int WorldToGrid(Vector3 worldPos, ConstrainedMazeGenerator maze)
    {
        int x = Mathf.RoundToInt((worldPos.x + ((maze.Width - 1) * maze.RoomSize * 0.5f)) / maze.RoomSize);
        int y = Mathf.RoundToInt((worldPos.z + ((maze.Height - 1) * maze.RoomSize * 0.5f)) / maze.RoomSize);
        return new Vector2Int(x, y);
    }

    public static Vector3 GridToWorld(Vector2Int gridPos, ConstrainedMazeGenerator maze)
    {
        float x = gridPos.x * maze.RoomSize - ((maze.Width - 1) * maze.RoomSize * 0.5f);
        float z = gridPos.y * maze.RoomSize - ((maze.Height - 1) * maze.RoomSize * 0.5f);
        return new Vector3(x, 0f, z);
    }
}