using UnityEngine;
using System.Collections.Generic;

public class ConstrainedMazeGenerator : MonoBehaviour
{
    [Header("Kích thước ma trận")]
    public int width = 6;
    public int height = 6;

    [Header("Prefab & khoảng cách")]
    public Room roomPrefab;
    public float roomSize = 10f;
    public Cell[,] Cells => cells;
    public int Width => width;
    public int Height => height;
    public float RoomSize => roomSize;
    public Cell[,] cells;

    public struct Cell
    {
        public bool visited;
        public bool wallTop;
        public bool wallBottom;
        public bool wallLeft;
        public bool wallRight;
    }

    void Start()
    {
        GenerateMazeData();
        EnforceInnerMaxTwoWalls();
        InstantiateMaze();
    }

    // 1. Sinh mê cung liên thông bằng DFS
    void GenerateMazeData()
    {
        cells = new Cell[width, height];

        // Khởi tạo: tất cả tường đều đóng
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                cells[x, y].visited = false;
                cells[x, y].wallTop = true;
                cells[x, y].wallBottom = true;
                cells[x, y].wallLeft = true;
                cells[x, y].wallRight = true;
            }
        }

        int startX = Random.Range(0, width);
        int startY = Random.Range(0, height);

        Stack<Vector2Int> stack = new Stack<Vector2Int>();
        stack.Push(new Vector2Int(startX, startY));
        cells[startX, startY].visited = true;

        while (stack.Count > 0)
        {
            Vector2Int current = stack.Peek();
            List<Vector2Int> neighbors = GetUnvisitedNeighbors(current.x, current.y);

            if (neighbors.Count == 0)
            {
                stack.Pop();
            }
            else
            {
                Vector2Int next = neighbors[Random.Range(0, neighbors.Count)];
                RemoveWallBetween(current, next);
                cells[next.x, next.y].visited = true;
                stack.Push(next);
            }
        }

        // Đảm bảo tường ngoài vẫn là viền bao (outward walls luôn đóng)
        EnforceOuterBorderWalls();
    }

    List<Vector2Int> GetUnvisitedNeighbors(int x, int y)
    {
        List<Vector2Int> result = new List<Vector2Int>();

        if (y + 1 < height && !cells[x, y + 1].visited)
            result.Add(new Vector2Int(x, y + 1)); // top

        if (y - 1 >= 0 && !cells[x, y - 1].visited)
            result.Add(new Vector2Int(x, y - 1)); // bottom

        if (x - 1 >= 0 && !cells[x - 1, y].visited)
            result.Add(new Vector2Int(x - 1, y)); // left

        if (x + 1 < width && !cells[x + 1, y].visited)
            result.Add(new Vector2Int(x + 1, y)); // right

        return result;
    }

    void RemoveWallBetween(Vector2Int a, Vector2Int b)
    {
        int dx = b.x - a.x;
        int dy = b.y - a.y;

        if (dx == 1)
        {
            cells[a.x, a.y].wallRight = false;
            cells[b.x, b.y].wallLeft = false;
        }
        else if (dx == -1)
        {
            cells[a.x, a.y].wallLeft = false;
            cells[b.x, b.y].wallRight = false;
        }
        else if (dy == 1)
        {
            cells[a.x, a.y].wallTop = false;
            cells[b.x, b.y].wallBottom = false;
        }
        else if (dy == -1)
        {
            cells[a.x, a.y].wallBottom = false;
            cells[b.x, b.y].wallTop = false;
        }
    }

    // 2. Đảm bảo viền ngoài có tường bao
    void EnforceOuterBorderWalls()
    {
        for (int x = 0; x < width; x++)
        {
            // Hàng dưới
            cells[x, 0].wallBottom = true;
            // Hàng trên
            cells[x, height - 1].wallTop = true;
        }

        for (int y = 0; y < height; y++)
        {
            // Cột trái
            cells[0, y].wallLeft = true;
            // Cột phải
            cells[width - 1, y].wallRight = true;
        }
    }

    // 3. Với các phòng bên trong, ép số tường ≤ 2
    void EnforceInnerMaxTwoWalls()
    {
        // Chỉ xử lý các phòng bên trong (x=1..width-2, y=1..height-2)
        for (int x = 1; x < width - 1; x++)
        {
            for (int y = 1; y < height - 1; y++)
            {
                bool changed = true;
                while (changed)
                {
                    changed = false;
                    int wallCount = CountWalls(x, y);

                    if (wallCount > 2)
                    {
                        // Lấy danh sách hướng đang có tường
                        List<int> walls = new List<int>();
                        if (cells[x, y].wallTop) walls.Add(0);
                        if (cells[x, y].wallBottom) walls.Add(1);
                        if (cells[x, y].wallLeft) walls.Add(2);
                        if (cells[x, y].wallRight) walls.Add(3);

                        if (walls.Count == 0) break;

                        // Random chọn 1 tường để phá
                        int dir = walls[Random.Range(0, walls.Count)];
                        RemoveWallOneSide(x, y, dir);

                        changed = true; // kiểm tra lại đến khi ≤2
                    }
                }
            }
        }
    }

    int CountWalls(int x, int y)
    {
        int count = 0;
        if (cells[x, y].wallTop) count++;
        if (cells[x, y].wallBottom) count++;
        if (cells[x, y].wallLeft) count++;
        if (cells[x, y].wallRight) count++;
        return count;
    }

    void RemoveWallOneSide(int x, int y, int dir)
    {
        // dir: 0=top, 1=bottom, 2=left, 3=right
        if (dir == 0 && y + 1 < height)
        {
            cells[x, y].wallTop = false;
            cells[x, y + 1].wallBottom = false;
        }
        else if (dir == 1 && y - 1 >= 0)
        {
            cells[x, y].wallBottom = false;
            cells[x, y - 1].wallTop = false;
        }
        else if (dir == 2 && x - 1 >= 0)
        {
            cells[x, y].wallLeft = false;
            cells[x - 1, y].wallRight = false;
        }
        else if (dir == 3 && x + 1 < width)
        {
            cells[x, y].wallRight = false;
            cells[x + 1, y].wallLeft = false;
        }
    }

    // 4. Instantiate ra scene
    void InstantiateMaze()
    {
        if (roomPrefab == null)
        {
            Debug.LogError("roomPrefab chưa được gán.");
            return;
        }

        float offsetX = -(width - 1) * roomSize * 0.5f;
        float offsetZ = -(height - 1) * roomSize * 0.5f;

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                Vector3 pos = new Vector3(
                    x * roomSize + offsetX,
                    0f,
                    y * roomSize + offsetZ
                );

                Room room = Instantiate(roomPrefab, pos, Quaternion.identity, transform);

                var cell = cells[x, y];
                room.SetWalls(
                    cell.wallTop,
                    cell.wallBottom,
                    cell.wallLeft,
                    cell.wallRight
                );
            }
        }
    }
}
