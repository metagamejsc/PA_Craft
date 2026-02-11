using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class SpawnCreeper : MonoBehaviour
{
    public static List<ZombieChar> zombieChars = new List<ZombieChar>();

    [SerializeField] GameObject[] creeperPrefab;
    [SerializeField] int numberOfCreepers = 5;

    public Vector2 spawnAreaSize = new Vector2(4f, 4f);
    public float spacingPadding = 0.3f;

    void Start()
    {
        //SpawnEnemy();
    }
    void OnEnable()
    {
        CollectChildrenEnemies();
    }
    public void CollectChildrenEnemies()
    {
        zombieChars.Clear();

        foreach (Transform child in transform)
        {
            ZombieChar zombie = child.GetComponent<ZombieChar>();
            if (zombie != null)
            {
                zombieChars.Add(zombie);
            }
        }
    }

    public void SpawnEnemy()
    {
        if (creeperPrefab == null || creeperPrefab.Length == 0)
        {
            Debug.LogError("Creeper prefab is not assigned!");
            return;
        }

        List<Vector3> positions = GenerateSpawnPositions();

        for (int i = 0; i < positions.Count; i++)
        {
            GameObject creeper = Instantiate(
                creeperPrefab[Random.Range(0, creeperPrefab.Length)],
                positions[i],
                Quaternion.identity
            );

            creeper.transform.SetParent(transform);
            zombieChars.Add(creeper.GetComponent<ZombieChar>());
        }
    }

    List<Vector3> GenerateSpawnPositions()
    {
        List<Vector3> result = new List<Vector3>();

        int gridSize = Mathf.CeilToInt(Mathf.Sqrt(numberOfCreepers));

        float cellWidth = spawnAreaSize.x / gridSize;
        float cellHeight = spawnAreaSize.y / gridSize;

        int count = 0;

        for (int x = 0; x < gridSize; x++)
        {
            for (int z = 0; z < gridSize; z++)
            {
                if (count >= numberOfCreepers)
                    return result;

                Vector3 pos = GetPositionInCell(x, z, cellWidth, cellHeight);
                result.Add(pos);
                count++;
            }
        }

        return result;
    }

    Vector3 GetPositionInCell(int xIndex, int zIndex, float cellWidth, float cellHeight)
    {
        float baseX = -spawnAreaSize.x * 0.5f + xIndex * cellWidth;
        float baseZ = -spawnAreaSize.y * 0.5f + zIndex * cellHeight;

        float offsetX = Random.Range(spacingPadding, cellWidth - spacingPadding);
        float offsetZ = Random.Range(spacingPadding, cellHeight - spacingPadding);

        return new Vector3(
            baseX + offsetX,
            0.5f,
            baseZ + offsetZ
        );
    }

    public static void KillEnemy(ZombieChar zombieChar)
    {
        if (zombieChars.Contains(zombieChar))
        {
            zombieChars.Remove(zombieChar);
            Destroy(zombieChar.gameObject);
        }
    }
}
