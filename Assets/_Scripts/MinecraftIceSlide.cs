using System;
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

    [Header("Track")]
    [Min(10)] public int segmentCount = 120;
    [Min(1)] public int forwardStep = 2;

    [Header("Start Straight")]
    [Min(0)] public int startStraightLength = 10;

    [Header("Curve")]
    [Range(0.01f,1f)] public float curveFrequency = 0.25f;
    [Min(1)] public int curveStrength = 6;

    [Header("Banking")]
    [Range(0f,1f)] public float bankingStrength = 0.6f;

    [Header("Height")]
    public int baseY = 0;
    public int minHeightOffset = -2;
    public int maxHeightOffset = 2;

    [Header("Shape")]
    [Min(1)] public int widthBlocks = 7;
    [Min(0)] public int wallHeight = 2;
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

    MeshFilter meshFilter;
    MeshCollider meshCollider;

    static readonly Vector3Int[] NeighborChecks =
    {
        Vector3Int.up,
        Vector3Int.down,
        Vector3Int.left,
        Vector3Int.right,
        new Vector3Int(0,0,1),
        new Vector3Int(0,0,-1)
    };

    private void Start()
    {
        //EnsureRefs();
        //segmentCount=LunaManager.ins.segementCount;
        //forwardStep=LunaManager.ins.lenghOneStep;
        //widthBlocks=LunaManager.ins.widthLine;
        //curveStrength=LunaManager.ins.curveStrength;
        //curveFrequency=LunaManager.ins.curveFrequency;
        //Generate();
    }

    /*void OnEnable()
    {
        EnsureRefs();

        if(!Application.isPlaying && autoUpdateInEditor)
            Generate();
    }

    void OnValidate()
    {
        EnsureRefs();

        if(!Application.isPlaying && autoUpdateInEditor)
            Generate();
    }*/

    void EnsureRefs()
    {
        if(!meshFilter) meshFilter = GetComponent<MeshFilter>();
        if(!meshCollider) meshCollider = GetComponent<MeshCollider>();
    }

    [ContextMenu("Generate Ice Track")]
    public void Generate()
    {
        HashSet<Vector3Int> blocks = BuildBlockSet();
        Mesh mesh = BuildVoxelMesh(blocks);

        meshFilter.sharedMesh = mesh;

        meshCollider.sharedMesh = null;
        meshCollider.sharedMesh = mesh;
    }

    HashSet<Vector3Int> BuildBlockSet()
    {
        HashSet<Vector3Int> blocks = new HashSet<Vector3Int>();

        System.Random rng = new System.Random(randomSeed);

        Vector3Int forward = DirectionToVector(initialDirection);
        Vector3Int right = RightOf(forward);

        int currentY = baseY;

        Vector2Int current2D = new Vector2Int(startGrid.x,startGrid.z);

        int leftWidth = widthBlocks / 2;
        int rightWidth = widthBlocks - 1 - leftWidth;

        Vector3Int prevCenter = new Vector3Int(current2D.x,currentY,current2D.y);

        AddCrossSection(blocks,prevCenter,right,leftWidth,rightWidth,0);

        for(int seg=0; seg<segmentCount; seg++)
        {
            int sideOffset = 0;

            if(seg > startStraightLength)
            {
                float curve =
                    Mathf.Sin((seg-startStraightLength)*curveFrequency)
                    * curveStrength;

                sideOffset = Mathf.RoundToInt(curve);
            }

            Vector2Int target2D =
                current2D +
                new Vector2Int(forward.x,forward.z)*forwardStep +
                new Vector2Int(right.x,right.z)*sideOffset;

            int targetY = baseY + rng.Next(minHeightOffset,maxHeightOffset+1);

            int delta = Mathf.Clamp(targetY-currentY,-1,1);
            currentY += delta;

            Vector3Int nextCenter =
                new Vector3Int(target2D.x,currentY,target2D.y);

            RasterizeSegment(
                blocks,
                prevCenter,
                nextCenter,
                right,
                leftWidth,
                rightWidth,
                seg);

            current2D = target2D;
            prevCenter = nextCenter;
        }

        return blocks;
    }

    void RasterizeSegment(
        HashSet<Vector3Int> blocks,
        Vector3Int from,
        Vector3Int to,
        Vector3Int right,
        int leftWidth,
        int rightWidth,
        int seg)
    {
        Vector3Int current = from;

        AddCrossSection(blocks,current,right,leftWidth,rightWidth,seg);

        while(current != to)
        {
            Vector3Int next = current;

            int dx = to.x-current.x;
            int dz = to.z-current.z;
            int dy = to.y-current.y;

            if(Mathf.Abs(dz)>=Mathf.Abs(dx) && dz!=0)
                next.z += dz>0?1:-1;
            else if(dx!=0)
                next.x += dx>0?1:-1;
            else if(dy!=0)
                next.y += dy>0?1:-1;

            AddCrossSection(blocks,next,right,leftWidth,rightWidth,seg);

            current = next;
        }
    }

    void AddCrossSection(
        HashSet<Vector3Int> blocks,
        Vector3Int center,
        Vector3Int right,
        int leftWidth,
        int rightWidth,
        int seg)
    {
        float bank = Mathf.Sin(seg*curveFrequency)*bankingStrength;

        for(int w=-leftWidth; w<=rightWidth; w++)
        {
            int bankOffset = Mathf.RoundToInt(bank*w);

            Vector3Int floor =
                center +
                right*w +
                Vector3Int.up*bankOffset;

            blocks.Add(floor);

            if(generateSolidUnderTrack)
            {
                for(int d=1; d<=underTrackThickness; d++)
                    blocks.Add(floor + Vector3Int.down*d);
            }
        }

        if(generateWalls && wallHeight>0)
        {
            Vector3Int leftWall = center + right*(-leftWidth-1);
            Vector3Int rightWall = center + right*(rightWidth+1);

            for(int h=0; h<wallHeight; h++)
            {
                blocks.Add(leftWall + Vector3Int.up*h);
                blocks.Add(rightWall + Vector3Int.up*h);
            }
        }
    }

    Vector3Int DirectionToVector(Direction dir)
    {
        switch(dir)
        {
            case Direction.ForwardZ: return new Vector3Int(0,0,1);
            case Direction.BackZ: return new Vector3Int(0,0,-1);
            case Direction.RightX: return new Vector3Int(1,0,0);
            case Direction.LeftX: return new Vector3Int(-1,0,0);
        }

        return new Vector3Int(0,0,1);
    }

    Vector3Int RightOf(Vector3Int dir)
    {
        return new Vector3Int(dir.z, 0, -dir.x);
    }

    Mesh BuildVoxelMesh(HashSet<Vector3Int> blocks)
    {
        List<Vector3> verts = new List<Vector3>();
        List<int> tris = new List<int>();
        List<Vector2> uvs = new List<Vector2>();

        foreach(var b in blocks)
        {
            for(int face=0; face<6; face++)
            {
                Vector3Int neighbor = b + NeighborChecks[face];

                if(blocks.Contains(neighbor))
                    continue;

                AddFace(face,b,verts,tris,uvs);
            }
        }

        Mesh mesh = new Mesh();

        mesh.indexFormat =
            verts.Count>65000 ?
            UnityEngine.Rendering.IndexFormat.UInt32 :
            UnityEngine.Rendering.IndexFormat.UInt16;

        mesh.SetVertices(verts);
        mesh.SetTriangles(tris,0);
        mesh.SetUVs(0,uvs);

        mesh.RecalculateNormals();
        mesh.RecalculateBounds();

        return mesh;
    }

    void AddFace(
        int face,
        Vector3Int gridPos,
        List<Vector3> verts,
        List<int> tris,
        List<Vector2> uvs)
    {
        int start = verts.Count;

        Vector3 p = (Vector3)gridPos * blockSize;
        float s = blockSize;

        switch(face)
        {
            case 0:
                verts.Add(p + new Vector3(0,s,0));
                verts.Add(p + new Vector3(0,s,s));
                verts.Add(p + new Vector3(s,s,s));
                verts.Add(p + new Vector3(s,s,0));
                break;

            case 1:
                verts.Add(p);
                verts.Add(p + new Vector3(s,0,0));
                verts.Add(p + new Vector3(s,0,s));
                verts.Add(p + new Vector3(0,0,s));
                break;

            case 2:
                verts.Add(p);
                verts.Add(p + new Vector3(0,0,s));
                verts.Add(p + new Vector3(0,s,s));
                verts.Add(p + new Vector3(0,s,0));
                break;

            case 3:
                verts.Add(p + new Vector3(s,0,s));
                verts.Add(p + new Vector3(s,0,0));
                verts.Add(p + new Vector3(s,s,0));
                verts.Add(p + new Vector3(s,s,s));
                break;

            case 4:
                verts.Add(p + new Vector3(0,0,s));
                verts.Add(p + new Vector3(s,0,s));
                verts.Add(p + new Vector3(s,s,s));
                verts.Add(p + new Vector3(0,s,s));
                break;

            case 5:
                verts.Add(p + new Vector3(s,0,0));
                verts.Add(p);
                verts.Add(p + new Vector3(0,s,0));
                verts.Add(p + new Vector3(s,s,0));
                break;
        }

        tris.Add(start);
        tris.Add(start+1);
        tris.Add(start+2);

        tris.Add(start);
        tris.Add(start+2);
        tris.Add(start+3);

        uvs.Add(new Vector2(0,0)*uvScale);
        uvs.Add(new Vector2(1,0)*uvScale);
        uvs.Add(new Vector2(1,1)*uvScale);
        uvs.Add(new Vector2(0,1)*uvScale);
    }
}