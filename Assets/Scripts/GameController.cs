using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public static GameController ins;

    [Header("Game State")]
    public bool isStartGame = false;
    public bool isPauseGame = false;
    public bool isEndGame = false;

    [Header("Enemy")]
    public GameObject enemyPrefab;
    public List<GameObject> enemyPrefabs = new List<GameObject>();
    public List<Transform> enemySpawnPoints = new List<Transform>();
    public List<GameObject> enemyList = new List<GameObject>();
    public int initialSpawnCount = 3;
    public int maxEnemyOnScene = 10;

    [Header("Spawn Area & Time")]
    public BoxCollider spawnArea;
    public float spawnInterval = 3f;
    public bool autoSpawnOnStart = true;

    [Header("Spawn Placement")]
    public bool useSpawnPointsWhenAvailable = true;
    public float minDistanceBetweenSpawnedEnemies = 1.75f;
    public bool fallbackToRandomSpawnWhenSpawnPointsBlocked = true;
    public bool snapRandomSpawnsToGround = true;
    public LayerMask groundPlacementMask = ~0;
    public float groundProbeHeight = 20f;
    public float groundSpawnOffset = 0f;
    public float minDistanceFromPlayerForRandomSpawn = 3f;
    public int randomSpawnAttempts = 6;

    [Header("Player")]
    public PlayerChar playerChar;
    public IceGun playerGun;

    public int countEnemyDefeat = 0;

    private Coroutine spawnCoroutine;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        SetupRuntimeReferences();
        RefreshGunUpgradeProgressUi();

        if (autoSpawnOnStart)
        {
            StartSpawn();
        }
    }

    public void EnemyDead(GameObject enemy)
    {
        if (enemy != null && enemyList.Contains(enemy))
        {
            enemyList.Remove(enemy);
        }

        countEnemyDefeat++;
        if (playerGun == null)
        {
            playerGun = FindObjectOfType<IceGun>();
        }

        playerGun?.AddUpgradeProgress(1);
    }

    [ContextMenu("Camera")]
    public void CheckCamera()
    {
    }

    public void StartSpawn()
    {
        if (spawnCoroutine == null)
        {
            spawnCoroutine = StartCoroutine(SpawnEnemyRoutine());
        }
    }

    public void StopSpawn()
    {
        if (spawnCoroutine != null)
        {
            StopCoroutine(spawnCoroutine);
            spawnCoroutine = null;
        }
    }

    private IEnumerator SpawnEnemyRoutine()
    {
        for (int i = 0; i < Mathf.Max(0, initialSpawnCount); i++)
        {
            SpawnEnemy(GetEnemySpawnPosition());
        }

        while (!isEndGame)
        {
            if (isStartGame && !isPauseGame && enemyList.Count < maxEnemyOnScene)
            {
                SpawnEnemy(GetEnemySpawnPosition());
            }

            yield return new WaitForSeconds(spawnInterval);
        }
    }

    private Vector3 GetEnemySpawnPosition()
    {
        if (useSpawnPointsWhenAvailable)
        {
            Transform spawnPoint = GetAvailableSpawnPoint(enemySpawnPoints);
            if (spawnPoint != null)
            {
                return spawnPoint.position;
            }

            if (!fallbackToRandomSpawnWhenSpawnPointsBlocked)
            {
                spawnPoint = GetRandomTransform(enemySpawnPoints);
                if (spawnPoint != null)
                {
                    return spawnPoint.position;
                }
            }
        }

        return GetRandomPointInBox(spawnArea);
    }

    private Transform GetAvailableSpawnPoint(List<Transform> transforms)
    {
        List<Transform> availableTransforms = new List<Transform>();
        for (int i = 0; i < transforms.Count; i++)
        {
            Transform candidate = transforms[i];
            if (candidate == null)
            {
                continue;
            }

            if (IsSpawnPositionAvailable(candidate.position))
            {
                availableTransforms.Add(candidate);
            }
        }

        if (availableTransforms.Count == 0)
        {
            return null;
        }

        return availableTransforms[Random.Range(0, availableTransforms.Count)];
    }

    private Transform GetRandomTransform(List<Transform> transforms)
    {
        List<Transform> validTransforms = new List<Transform>();
        for (int i = 0; i < transforms.Count; i++)
        {
            if (transforms[i] != null)
            {
                validTransforms.Add(transforms[i]);
            }
        }

        if (validTransforms.Count == 0)
        {
            return null;
        }

        return validTransforms[Random.Range(0, validTransforms.Count)];
    }

    private Vector3 GetRandomPointInBox(BoxCollider box)
    {
        if (box == null)
        {
            Debug.LogWarning("SpawnArea (BoxCollider) chua duoc gan!");
            return playerChar != null ? playerChar.transform.position : Vector3.zero;
        }

        Bounds bounds = box.bounds;
        Vector3 spawnPosition = box.transform.position;
        int attempts = Mathf.Max(1, randomSpawnAttempts);

        for (int i = 0; i < attempts; i++)
        {
            float x = Random.Range(bounds.min.x, bounds.max.x);
            float z = Random.Range(bounds.min.z, bounds.max.z);
            spawnPosition = new Vector3(x, bounds.max.y, z);

            if (playerChar == null)
            {
                break;
            }

            Vector3 flatOffset = spawnPosition - playerChar.transform.position;
            flatOffset.y = 0f;
            if (flatOffset.sqrMagnitude >= minDistanceFromPlayerForRandomSpawn * minDistanceFromPlayerForRandomSpawn)
            {
                break;
            }
        }

        return ResolveGroundPosition(spawnPosition);
    }

    private Vector3 ResolveGroundPosition(Vector3 worldPosition)
    {
        if (!snapRandomSpawnsToGround)
        {
            return worldPosition;
        }

        Vector3 rayOrigin = worldPosition + Vector3.up * groundProbeHeight;
        float rayDistance = groundProbeHeight * 2f + 5f;

        if (Physics.Raycast(rayOrigin, Vector3.down, out RaycastHit hit, rayDistance, groundPlacementMask, QueryTriggerInteraction.Ignore))
        {
            worldPosition = hit.point + Vector3.up * groundSpawnOffset;
        }

        return worldPosition;
    }

    private bool IsSpawnPositionAvailable(Vector3 worldPosition)
    {
        if (minDistanceBetweenSpawnedEnemies <= 0f)
        {
            return true;
        }

        float minDistanceSqr = minDistanceBetweenSpawnedEnemies * minDistanceBetweenSpawnedEnemies;
        for (int i = enemyList.Count - 1; i >= 0; i--)
        {
            GameObject enemy = enemyList[i];
            if (enemy == null)
            {
                enemyList.RemoveAt(i);
                continue;
            }

            Vector3 offset = enemy.transform.position - worldPosition;
            offset.y = 0f;
            if (offset.sqrMagnitude < minDistanceSqr)
            {
                return false;
            }
        }

        return true;
    }

    public void SpawnEnemy(Vector3 posSpawn)
    {
        GameObject prefabToSpawn = GetEnemyPrefab();
        if (prefabToSpawn == null)
        {
            Debug.LogWarning("enemyPrefab chua duoc gan trong GameController!");
            return;
        }

        GameObject newEnemy = Instantiate(prefabToSpawn, posSpawn, Quaternion.Euler(0f, 180f, 0f));
        ApplySpawnedEnemyStats(newEnemy);
        enemyList.Add(newEnemy);
    }

    private void SetupRuntimeReferences()
    {
        if (playerChar == null)
        {
            playerChar = FindObjectOfType<PlayerChar>();
        }

        if (playerGun == null)
        {
            playerGun = FindObjectOfType<IceGun>();
        }

        RefreshGunUpgradeProgressUi();
    }

    private GameObject GetEnemyPrefab()
    {
        List<GameObject> validPrefabs = new List<GameObject>();
        for (int i = 0; i < enemyPrefabs.Count; i++)
        {
            if (enemyPrefabs[i] != null)
            {
                validPrefabs.Add(enemyPrefabs[i]);
            }
        }

        if (validPrefabs.Count > 0)
        {
            return validPrefabs[Random.Range(0, validPrefabs.Count)];
        }

        return enemyPrefab;
    }

    private void RefreshGunUpgradeProgressUi()
    {
        if (playerGun == null)
        {
            playerGun = FindObjectOfType<IceGun>();
        }

        playerGun?.RefreshUpgradeProgressUi();
    }

    private void ApplySpawnedEnemyStats(GameObject enemyInstance)
    {
        if (enemyInstance == null)
        {
            return;
        }

        BaseCharacter enemyCharacter = enemyInstance.GetComponent<BaseCharacter>();
        if (enemyCharacter == null)
        {
            return;
        }

        float configuredEnemyHealth = GetConfiguredEnemyHealth();
        if (configuredEnemyHealth > 0f)
        {
            enemyCharacter.health = configuredEnemyHealth;
        }
    }

    private float GetConfiguredEnemyHealth()
    {
        if (LunaManager.ins != null && LunaManager.ins.enemyHealth > 0f)
        {
            return LunaManager.ins.enemyHealth;
        }

        return 0f;
    }

}
