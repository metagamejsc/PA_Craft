using System.Collections;
using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    public GameObject[] enemyPrefab;
    public Transform[] spawnPoints;
    [SerializeField] private int enemyIndex = 0;
    [SerializeField] private bool spawnOnStart = true;
    [SerializeField] private float spawnInterval = 2f;
    [SerializeField] private int maxAliveEnemies = 3;
    [SerializeField] private int maxTotalEnemies = 5;

    private int spawnedCount;
    private int nextSpawnPointIndex;

    void Start()
    {
        if (!spawnOnStart)
        {
            return;
        }

        EnemyController existingEnemy = FindObjectOfType<EnemyController>();
        if (existingEnemy != null)
        {
            spawnedCount = EnemyController.AliveCount;
        }
        else
        {
            if (!SpawnEnemy())
            {
                return;
            }
        }

        StartCoroutine(SpawnLoop());
    }

    IEnumerator SpawnLoop()
    {
        while (!HasReachedMaxTotal())
        {
            while (!TutorialBuildBlock.IsComplete || EnemyController.AliveCount >= GetMaxAliveEnemies())
            {
                yield return null;
            }

            yield return new WaitForSeconds(GetSpawnInterval());

            if (TutorialBuildBlock.IsComplete &&
                EnemyController.AliveCount < GetMaxAliveEnemies() &&
                !HasReachedMaxTotal())
            {
                if (!SpawnEnemy()|| LunaManager.ins.isCretivePause)
                {
                    yield break;
                }
            }
        }
    }

    bool SpawnEnemy()
    {
        GameObject prefabToSpawn = GetEnemyPrefab();
        Transform spawnPoint = GetSpawnPoint();
        if (prefabToSpawn == null || spawnPoint == null)
        {
            return false;
        }

        Instantiate(prefabToSpawn, spawnPoint.position, spawnPoint.rotation);
        spawnedCount++;
        return true;
    }

    GameObject GetEnemyPrefab()
    {
        if (enemyPrefab == null || enemyPrefab.Length == 0)
        {
            return null;
        }

        int clampedIndex = Mathf.Clamp(enemyIndex, 0, enemyPrefab.Length - 1);
        return enemyPrefab[clampedIndex];
    }

    Transform GetSpawnPoint()
    {
        if (spawnPoints != null && spawnPoints.Length > 0)
        {
            for (int i = 0; i < spawnPoints.Length; i++)
            {
                int spawnPointIndex = nextSpawnPointIndex % spawnPoints.Length;
                nextSpawnPointIndex++;

                if (spawnPoints[spawnPointIndex] != null)
                {
                    return spawnPoints[spawnPointIndex];
                }
            }
        }

        return transform;
    }

    float GetSpawnInterval()
    {
        return Mathf.Max(0.1f, spawnInterval);
    }

    int GetMaxAliveEnemies()
    {
        return Mathf.Max(1, maxAliveEnemies);
    }

    bool HasReachedMaxTotal()
    {
        return spawnedCount >= Mathf.Max(1, maxTotalEnemies);
    }

    bool HasPendingSpawn()
    {
        return spawnOnStart && isActiveAndEnabled && GetEnemyPrefab() != null && !HasReachedMaxTotal();
    }

    public static bool HasPendingSpawns()
    {
        EnemySpawner[] spawners = FindObjectsOfType<EnemySpawner>();
        for (int i = 0; i < spawners.Length; i++)
        {
            EnemySpawner spawner = spawners[i];
            if (spawner != null && spawner.HasPendingSpawn())
            {
                return true;
            }
        }

        return false;
    }
}
