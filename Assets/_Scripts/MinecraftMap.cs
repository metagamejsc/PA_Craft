using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class MinecraftBlockDefinition
{
    public string name = "Block";
    public GameObject prefab;
    public Material material;
    public bool applyMaterialTiling = true;
    public bool addCollider = true;
}

public class MinecraftMap : MonoBehaviour
{
    [Min(0.01f)] public float blockSize = 1f;
    public List<MinecraftBlockDefinition> blockPalette = new List<MinecraftBlockDefinition>();

    public Vector3 GridToLocalPosition(Vector3Int gridPosition)
    {
        return new Vector3(gridPosition.x, gridPosition.y, gridPosition.z) * blockSize;
    }

    public Vector3 GridToWorldPosition(Vector3Int gridPosition)
    {
        return transform.TransformPoint(GridToLocalPosition(gridPosition));
    }

    public Vector3Int LocalToGridPosition(Vector3 localPosition)
    {
        float size = Mathf.Max(0.01f, blockSize);
        return new Vector3Int(
            Mathf.RoundToInt(localPosition.x / size),
            Mathf.RoundToInt(localPosition.y / size),
            Mathf.RoundToInt(localPosition.z / size));
    }

    public MinecraftMapBlock GetBlock(Vector3Int gridPosition)
    {
        MinecraftMapBlock[] blocks = GetComponentsInChildren<MinecraftMapBlock>(true);
        for (int i = 0; i < blocks.Length; i++)
        {
            if (blocks[i].gridPosition == gridPosition)
                return blocks[i];
        }

        return null;
    }

    private void OnValidate()
    {
        blockSize = Mathf.Max(0.01f, blockSize);
    }
}

public class MinecraftMapBlock : MonoBehaviour
{
    public Vector3Int gridPosition;
    public int paletteIndex;
}
