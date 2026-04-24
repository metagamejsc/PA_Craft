using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;

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

    [Header("Rocket Unlock Flow")]
    public GameObject rocketPickupObject;
    public int killsToSpawnRocket = 5;
    public GameObject currentWeaponModel;
    public GameObject rocketWeaponModel;
    public bool hideCurrentWeaponModelOnRocketUnlock = true;
    public IceGun playerGun;
    public float rocketFireSpeedMultiplier = 2f;

    [Header("Boss Flow")]
    public GameObject bossPrefab;
    public Transform bossSpawnPoint;
    [FormerlySerializedAs("killsAfterRocketEquippedToSpawnBoss")]
    public int killsToSpawnBoss = 4;
    public float bossHealth = 30f;
    public float bossDamage = 2f;
    public float bossMoveSpeed = 1.3f;
    public float bossAttackSpeed = 1.1f;
    public float bossScaleMultiplier = 1.8f;
    public string bossDisplayName = "Boss";
    public bool clearAliveEnemiesWhenBossSpawns = true;

    public int countEnemyDefeat = 0;

    private Coroutine spawnCoroutine;
    private RocketPickup rocketPickup;
    private bool rocketSpawned;
    private bool rocketUnlocked;
    private bool bossSpawned;
    private GameObject bossInstance;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        SetupRuntimeReferences();
        RefreshBossSpawnProgressUi();

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

        if (enemy != null && bossInstance == enemy)
        {
            bossInstance = null;
            UIManager.ins?.HideBossUI();
            LunaManager.ins.DelayCallEndCard(1.5f);
            return;
        }

        countEnemyDefeat++;
        RefreshBossSpawnProgressUi();

        if (!rocketSpawned && countEnemyDefeat >= killsToSpawnRocket)
        {
            SpawnRocketPickup();
        }

        if (rocketUnlocked && !bossSpawned)
        {
            if (countEnemyDefeat >= killsToSpawnBoss)
            {
                SpawnBoss();
            }
        }
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
            if (isStartGame && !isPauseGame && !bossSpawned && enemyList.Count < maxEnemyOnScene)
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

    public void SetIdWeapon(int id)
    {
        if (playerChar == null)
        {
            return;
        }

        playerChar.CraftWeapon(id);
    }

    public void UnlockRocketWeapon(RocketPickup pickupSource = null)
    {
        if (rocketUnlocked)
        {
            return;
        }

        rocketUnlocked = true;

        if (pickupSource != null)
        {
            pickupSource.HidePickup();
        }
        else if (rocketPickupObject != null)
        {
            rocketPickupObject.SetActive(false);
        }

        ApplyRocketUpgrade();

        if (!bossSpawned && countEnemyDefeat >= killsToSpawnBoss)
        {
            SpawnBoss();
            return;
        }

        RefreshBossSpawnProgressUi();
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
        
        if (rocketPickupObject != null)
        {
            rocketPickup = rocketPickupObject.GetComponent<RocketPickup>();
            if (rocketPickup == null)
            {
                rocketPickup = rocketPickupObject.AddComponent<RocketPickup>();
            }

            rocketPickupObject.SetActive(false);
        }

        ApplyRocketVisualState(rocketUnlocked);
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

    private void SpawnRocketPickup()
    {
        if (rocketPickupObject == null)
        {
            Debug.LogWarning("rocketPickupObject chua duoc gan trong GameController!");
            return;
        }

        rocketSpawned = true;
        rocketPickupObject.SetActive(true);
    }

    private void SpawnBoss()
    {
        if (bossSpawned)
        {
            return;
        }

        GameObject prefabToSpawn = bossPrefab != null ? bossPrefab : enemyPrefab;
        if (prefabToSpawn == null)
        {
            return;
        }

        bossSpawned = true;
        StopSpawn();
        UIManager.ins?.HideBossSpawnProgress();

        if (clearAliveEnemiesWhenBossSpawns)
        {
            ClearAliveEnemies();
        }

        Vector3 spawnPosition = bossSpawnPoint != null
            ? bossSpawnPoint.position
            : GetEnemySpawnPosition();

        bossInstance = Instantiate(prefabToSpawn, spawnPosition, Quaternion.Euler(0f, 180f, 0f));
        bossInstance.name = $"{prefabToSpawn.name}_Boss";
        enemyList.Add(bossInstance);

        BaseCharacter bossCharacter = bossInstance.GetComponent<BaseCharacter>();
        ZombieChar bossZombie = bossInstance.GetComponent<ZombieChar>();
        float finalBossHealth = GetConfiguredBossHealth();
        if (bossZombie != null)
        {
            bossZombie.useLunaEnemySpeed = false;
        }

        if (bossCharacter != null)
        {
            bossCharacter.health = finalBossHealth;
            bossCharacter.damage = bossDamage;
            bossCharacter.moveSpeed = bossMoveSpeed;
            bossCharacter.attackSpeed = bossAttackSpeed;
            bossCharacter.detectionRadiusMax = 100f;
        }

        bossInstance.transform.localScale *= bossScaleMultiplier;

        UIManager.ins?.ShowBossUI(bossCharacter, bossDisplayName, finalBossHealth);
    }

    private void ApplyRocketUpgrade()
    {
        if (playerGun == null)
        {
            playerGun = FindObjectOfType<IceGun>();
        }

        if (playerGun != null)
        {
            playerGun.ApplyFireSpeedMultiplier(rocketFireSpeedMultiplier);
        }

        ApplyRocketVisualState(true);
    }

    private void ApplyRocketVisualState(bool hasRocketUpgrade)
    {
        if (rocketWeaponModel != null)
        {
            rocketWeaponModel.SetActive(hasRocketUpgrade);
        }

        if (currentWeaponModel != null && hideCurrentWeaponModelOnRocketUnlock)
        {
            currentWeaponModel.GetComponent<MeshRenderer>().enabled=!hasRocketUpgrade;
        }
    }

    private void RefreshBossSpawnProgressUi()
    {
        if (bossSpawned)
        {
            UIManager.ins?.HideBossSpawnProgress();
            return;
        }

        UIManager.ins?.UpdateBossSpawnProgress(countEnemyDefeat, killsToSpawnBoss);
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

    private float GetConfiguredBossHealth()
    {
        if (LunaManager.ins != null && LunaManager.ins.bossHealth > 0f)
        {
            return LunaManager.ins.bossHealth;
        }

        return bossHealth;
    }

    private void ClearAliveEnemies()
    {
        for (int i = enemyList.Count - 1; i >= 0; i--)
        {
            GameObject enemy = enemyList[i];
            if (enemy != null)
            {
                Destroy(enemy);
            }
        }

        enemyList.Clear();
    }
}
