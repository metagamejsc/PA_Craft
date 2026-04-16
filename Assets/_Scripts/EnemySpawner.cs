using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    public GameObject[] enemyPrefab;
    public Transform[] spawnPoints;
    [SerializeField] private int enemyIndex = 0;
    [SerializeField] private bool spawnOnStart = true;

    void Start()
    {
        if (!spawnOnStart)
        {
            return;
        }

        if (FindObjectOfType<EnemyController>() != null)
        {
            return;
        }

        GameObject prefabToSpawn = GetEnemyPrefab();
        Transform spawnPoint = GetSpawnPoint();
        if (prefabToSpawn == null || spawnPoint == null)
        {
            return;
        }

        Instantiate(prefabToSpawn, spawnPoint.position, spawnPoint.rotation);
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
        if (spawnPoints != null && spawnPoints.Length > 0 && spawnPoints[0] != null)
        {
            return spawnPoints[0];
        }

        return transform;
    }
}
