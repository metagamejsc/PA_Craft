using System.Collections.Generic;
using UnityEngine;

[ExecuteAlways]
[RequireComponent(typeof(MeshFilter), typeof(MeshRenderer), typeof(MeshCollider))]
public class MinecraftIceSlide : MonoBehaviour
{
    [Header("Editor")]
    public bool autoUpdateInEditor = true;

    [Header("Block")]
    [Min(0.1f)] public float blockSize = 1f;

    [Header("Path")]
    [Min(2)] public int segmentCount = 30;
    [Min(1)] public int forwardPerSegment = 4;
    [Min(0)] public int sideMinOffset = 1;
    [Min(0)] public int sideMaxOffset = 2;

    [Header("Curve")]
    [Range(0f, 1f)] public float forwardBias = 0.85f;
    [Range(0f, 1f)] public float curveRatio = 0.3f;
    [Range(0f, 1f)] public float keepCurveDirectionChance = 0.7f;

    [Header("Height")]
    public int baseY = 0;
    public int minHeightOffset = -2;
    public int maxHeightOffset = 2;
    public bool clampHeightStep = true;
    [Min(1)] public int maxHeightDeltaPerSegment = 1;

    [Header("Shape")]
    [Min(1)] public int widthBlocks = 5;
    [Min(0)] public int wallHeight = 1;
    public bool generateWalls = true;
    public bool generateSolidUnderTrack = true;
    [Min(1)] public int underTrackThickness = 1;

    [Header("Start")]
    public Vector3Int startGrid = Vector3Int.zero;
    public Direction initialDirection = Direction.ForwardZ;
    public int randomSeed = 12345;

    [Header("UV")]
    public float uvScale = 1f;

    public enum Direction
    {
        ForwardZ,
        BackZ,
        RightX,
        LeftX
    }

    private MeshFilter meshFilter;
    private MeshCollider meshCollider;

    private static readonly Vector3Int[] NeighborChecks =
    {
        Vector3Int.up,
        Vector3Int.down,
        Vector3Int.left,
        Vector3Int.right,
        new Vector3Int(0, 0, 1),
        new Vector3Int(0, 0, -1)
    };

    private void OnEnable()
    {
        EnsureRefs();
        if (!Application.isPlaying && autoUpdateInEditor)
            Generate();
    }

    private void OnValidate()
    {
        EnsureRefs();

        blockSize = Mathf.Max(0.1f, blockSize);
        segmentCount = Mathf.Max(2, segmentCount);
        forwardPerSegment = Mathf.Max(1, forwardPerSegment);
        sideMinOffset = Mathf.Max(0, sideMinOffset);
        sideMaxOffset = Mathf.Max(sideMinOffset, sideMaxOffset);
        maxHeightDeltaPerSegment = Mathf.Max(1, maxHeightDeltaPerSegment);
        widthBlocks = Mathf.Max(1, widthBlocks);
        wallHeight = Mathf.Max(0, wallHeight);
        underTrackThickness = Mathf.Max(1, underTrackThickness);

        if (!Application.isPlaying && autoUpdateInEditor)
            Generate();
    }

    private void EnsureRefs()
    {
        if (!meshFilter) meshFilter = GetComponent<MeshFilter>();
        if (!meshCollider) meshCollider = GetComponent<MeshCollider>();
    }

    [ContextMenu("Generate Ice Slide")]
    public void Generate()
    {
        EnsureRefs();

        HashSet<Vector3Int> blocks = BuildBlockSet();
        Mesh mesh = BuildVoxelMesh(blocks);

        meshFilter.sharedMesh = mesh;
        meshCollider.sharedMesh = null;
        meshCollider.sharedMesh = mesh;
    }

    [ContextMenu("Clear Mesh")]
    public void ClearMesh()
    {
        EnsureRefs();
        meshFilter.sharedMesh = null;
        meshCollider.sharedMesh = null;
    }

    private HashSet<Vector3Int> BuildBlockSet()
    {
        HashSet<Vector3Int> blocks = new HashSet<Vector3Int>();
        System.Random rng = new System.Random(randomSeed);

        Vector3Int forward = DirectionToVector(initialDirection);
        Vector3Int right = RightOf(forward);

        int currentY = baseY;
        Vector2Int current2D = new Vector2Int(startGrid.x, startGrid.z);

        int lastCurveSign = 0;

        int leftWidth = widthBlocks / 2;
        int rightWidth = widthBlocks - 1 - leftWidth;

        Vector3Int prevCenter = new Vector3Int(current2D.x, currentY, current2D.y);
        AddCrossSection(blocks, prevCenter, right, leftWidth, rightWidth);

        for (int seg = 0; seg < segmentCount; seg++)
        {
            int targetY = baseY + rng.Next(minHeightOffset, maxHeightOffset + 1);

            if (clampHeightStep)
            {
                int delta = Mathf.Clamp(targetY - currentY, -maxHeightDeltaPerSegment, maxHeightDeltaPerSegment);
                targetY = currentY + delta;
            }

            bool doCurve = rng.NextDouble() < curveRatio * Mathf.Lerp(1f, 0.35f, forwardBias);

            int sideOffset = 0;
            if (doCurve && sideMaxOffset > 0)
            {
                int sign;
                bool keepSameCurve = lastCurveSign != 0 && rng.NextDouble() < keepCurveDirectionChance;
                if (keepSameCurve)
                    sign = lastCurveSign;
                else
                    sign = rng.NextDouble() < 0.5 ? -1 : 1;

                sideOffset = rng.Next(sideMinOffset, sideMaxOffset + 1) * sign;
                lastCurveSign = sign;
            }
            else if (rng.NextDouble() < 0.2)
            {
                lastCurveSign = 0;
            }

            Vector2Int target2D =
                current2D +
                new Vector2Int(forward.x, forward.z) * forwardPerSegment +
                new Vector2Int(right.x, right.z) * sideOffset;

            Vector3Int nextCenter = new Vector3Int(target2D.x, targetY, target2D.y);

            RasterizeSegment(blocks, prevCenter, nextCenter, right, leftWidth, rightWidth);

            current2D = target2D;
            currentY = targetY;
            prevCenter = nextCenter;
        }

        return blocks;
    }

    private void RasterizeSegment(
        HashSet<Vector3Int> blocks,
        Vector3Int from,
        Vector3Int to,
        Vector3Int right,
        int leftWidth,
        int rightWidth)
    {
        Vector3Int current = from;
        AddCrossSection(blocks, current, right, leftWidth, rightWidth);

        while (current != to)
        {
            Vector3Int next = current;

            int dx = to.x - current.x;
            int dz = to.z - current.z;
            int dy = to.y - current.y;

            // Ưu tiên đi về trước trước, rồi mới lệch ngang, sau đó mới đổi cao
            if (Mathf.Abs(dz) >= Mathf.Abs(dx) && dz != 0)
            {
                next.z += dz > 0 ? 1 : -1;
            }
            else if (dx != 0)
            {
                next.x += dx > 0 ? 1 : -1;
            }
            else if (dy != 0)
            {
                next.y += dy > 0 ? 1 : -1;
            }

            // Nếu vẫn còn lệch ngang sau khi tiến trước, thỉnh thoảng chen bước cao độ vào giữa để dốc đỡ gắt
            if (next == current && dy != 0)
                next.y += dy > 0 ? 1 : -1;

            AddCrossSection(blocks, next, right, leftWidth, rightWidth);
            current = next;
        }
    }

    private void AddCrossSection(HashSet<Vector3Int> blocks, Vector3Int center, Vector3Int right, int leftWidth, int rightWidth)
    {
        // Mặt trượt
        for (int w = -leftWidth; w <= rightWidth; w++)
        {
            Vector3Int floor = center + right * w;
            blocks.Add(floor);

            if (generateSolidUnderTrack)
            {
                for (int d = 1; d <= underTrackThickness; d++)
                    blocks.Add(floor + Vector3Int.down * d);
            }
        }

        // Thành hai bên
        if (generateWalls && wallHeight > 0)
        {
            Vector3Int leftWallBase = center + right * (-leftWidth - 1);
            Vector3Int rightWallBase = center + right * (rightWidth + 1);

            for (int h = 0; h < wallHeight; h++)
            {
                blocks.Add(leftWallBase + Vector3Int.up * h);
                blocks.Add(rightWallBase + Vector3Int.up * h);

                if (generateSolidUnderTrack)
                {
                    for (int d = 1; d <= underTrackThickness; d++)
                    {
                        blocks.Add(leftWallBase + Vector3Int.up * h + Vector3Int.down * d);
                        blocks.Add(rightWallBase + Vector3Int.up * h + Vector3Int.down * d);
                    }
                }
            }
        }
    }

    private Vector3Int DirectionToVector(Direction dir)
    {
        switch (dir)
        {
            case Direction.ForwardZ: return new Vector3Int(0, 0, 1);
            case Direction.BackZ:    return new Vector3Int(0, 0, -1);
            case Direction.RightX:   return new Vector3Int(1, 0, 0);
            case Direction.LeftX:    return new Vector3Int(-1, 0, 0);
            default: return new Vector3Int(0, 0, 1);
        }
    }

    private Vector3Int RightOf(Vector3Int dir)
    {
        if (dir == new Vector3Int(0, 0, 1))  return new Vector3Int(1, 0, 0);
        if (dir == new Vector3Int(1, 0, 0))  return new Vector3Int(0, 0, -1);
        if (dir == new Vector3Int(0, 0, -1)) return new Vector3Int(-1, 0, 0);
        if (dir == new Vector3Int(-1, 0, 0)) return new Vector3Int(0, 0, 1);
        return Vector3Int.right;
    }

    private Mesh BuildVoxelMesh(HashSet<Vector3Int> blocks)
    {
        List<Vector3> verts = new List<Vector3>();
        List<int> tris = new List<int>();
        List<Vector2> uvs = new List<Vector2>();

        foreach (var b in blocks)
        {
            for (int face = 0; face < 6; face++)
            {
                Vector3Int neighbor = b + NeighborChecks[face];
                if (blocks.Contains(neighbor))
                    continue;

                AddFace(face, b, verts, tris, uvs);
            }
        }

        Mesh mesh = new Mesh();
        mesh.name = "MinecraftIceSlideMesh";
        mesh.indexFormat = verts.Count > 65000
            ? UnityEngine.Rendering.IndexFormat.UInt32
            : UnityEngine.Rendering.IndexFormat.UInt16;

        mesh.SetVertices(verts);
        mesh.SetTriangles(tris, 0);
        mesh.SetUVs(0, uvs);
        mesh.RecalculateNormals();
        mesh.RecalculateBounds();

        return mesh;
    }

    private void AddFace(int face, Vector3Int gridPos, List<Vector3> verts, List<int> tris, List<Vector2> uvs)
    {
        int start = verts.Count;
        Vector3 p = (Vector3)gridPos * blockSize;
        float s = blockSize;

        switch (face)
        {
            case 0: // up
                verts.Add(p + new Vector3(0, s, 0));
                verts.Add(p + new Vector3(0, s, s));
                verts.Add(p + new Vector3(s, s, s));
                verts.Add(p + new Vector3(s, s, 0));
                break;

            case 1: // down
                verts.Add(p + new Vector3(0, 0, 0));
                verts.Add(p + new Vector3(s, 0, 0));
                verts.Add(p + new Vector3(s, 0, s));
                verts.Add(p + new Vector3(0, 0, s));
                break;

            case 2: // left (-x)
                verts.Add(p + new Vector3(0, 0, 0));
                verts.Add(p + new Vector3(0, 0, s));
                verts.Add(p + new Vector3(0, s, s));
                verts.Add(p + new Vector3(0, s, 0));
                break;

            case 3: // right (+x)
                verts.Add(p + new Vector3(s, 0, s));
                verts.Add(p + new Vector3(s, 0, 0));
                verts.Add(p + new Vector3(s, s, 0));
                verts.Add(p + new Vector3(s, s, s));
                break;

            case 4: // forward (+z)
                verts.Add(p + new Vector3(0, 0, s));
                verts.Add(p + new Vector3(s, 0, s));
                verts.Add(p + new Vector3(s, s, s));
                verts.Add(p + new Vector3(0, s, s));
                break;

            case 5: // back (-z)
                verts.Add(p + new Vector3(s, 0, 0));
                verts.Add(p + new Vector3(0, 0, 0));
                verts.Add(p + new Vector3(0, s, 0));
                verts.Add(p + new Vector3(s, s, 0));
                break;
        }

        // winding hướng ra ngoài
        tris.Add(start + 0);
        tris.Add(start + 1);
        tris.Add(start + 2);

        tris.Add(start + 0);
        tris.Add(start + 2);
        tris.Add(start + 3);

        uvs.Add(new Vector2(0, 0) * uvScale);
        uvs.Add(new Vector2(1, 0) * uvScale);
        uvs.Add(new Vector2(1, 1) * uvScale);
        uvs.Add(new Vector2(0, 1) * uvScale);
    }
}