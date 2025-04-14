using UnityEngine;

public class TreeBuilder : MonoBehaviour
{
    public GameObject trunkPrefab;
    public GameObject leafPrefab;

    [Range(4, 8)]
    public int trunkHeight = 6;

    [Range(1, 3)]
    public int leafLayers = 3;

    public int leafRadius = 2;

    void Start()
    {
        BuildTree();
    }

    public void BuildTree()
    {
        // Clear cũ
        foreach (Transform child in transform)
            DestroyImmediate(child.gameObject);

        // Trồng thân cây
        for (int i = 0; i < trunkHeight; i++)
        {
            Vector3 pos = new Vector3(0, i, 0);
            Instantiate(trunkPrefab, transform.position + pos, Quaternion.identity, transform);
        }

        // Trồng lá theo tầng
        int startY = trunkHeight - 2;
        for (int layer = 0; layer < leafLayers; layer++)
        {
            int radius = leafRadius - layer;
            int y = startY + layer;

            for (int x = -radius; x <= radius; x++)
            {
                for (int z = -radius; z <= radius; z++)
                {
                    if (Mathf.Abs(x) + Mathf.Abs(z) <= radius + 1)
                    {
                        Vector3 leafPos = new Vector3(x, y, z);
                        Instantiate(leafPrefab, transform.position + leafPos, Quaternion.identity, transform);
                    }
                }
            }
        }

        // Lá đỉnh
        Vector3 top = new Vector3(0, trunkHeight, 0);
        Instantiate(leafPrefab, transform.position + top, Quaternion.identity, transform);
    }
}