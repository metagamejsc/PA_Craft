using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    public static EnemySpawner Instance { get; private set; }

    public GameObject[] enemyPrefab;
    public Transform[] spawnPoints;
    public Transform player;

    [Header("Auto Spawn Around Player")]
    public bool spawnAroundPlayer = true;
    public int initialSpawnCount = 3;
    public int maxAliveEnemies = 6;
    public float spawnInterval = 2.5f;
    public float minSpawnRadius = 6f;
    public float maxSpawnRadius = 10f;
    public LayerMask groundMask = ~0;
    public float groundRayHeight = 20f;
    [Tooltip("Góc nửa cung spawn tính từ hướng nhìn của player (90 = spawn trong 180° phía trước)")]
    [Range(1f, 180f)]
    public float spawnFrontAngle = 90f;
    [SerializeField] private int enemyIndex = 0;
    [SerializeField] private bool spawnOnStart = false;

    private bool isSpawning;
    private float nextSpawnTime;

    void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        ResolvePlayer();

        if (spawnOnStart)
        {
            ActivateSpawning();
        }
    }

    void Update()
    {
        if (!isSpawning || LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            return;
        }

        if (Time.time < nextSpawnTime || CountAliveEnemies() >= maxAliveEnemies)
        {
            return;
        }

        SpawnEnemy();
        nextSpawnTime = Time.time + spawnInterval;
    }

    public void ActivateSpawning()
    {
        if (isSpawning)
        {
            return;
        }

        ResolvePlayer();
        isSpawning = true;

        int spawnCount = Mathf.Max(1, initialSpawnCount);
        for (int i = 0; i < spawnCount && CountAliveEnemies() < maxAliveEnemies; i++)
        {
            SpawnEnemy();
        }

        nextSpawnTime = Time.time + spawnInterval;
    }

    public void SetPlayer(Transform playerTransform)
    {
        player = playerTransform;
    }

    public void SetEnemyPrefabs(GameObject[] prefabs)
    {
        if (prefabs == null || prefabs.Length == 0)
        {
            return;
        }

        enemyPrefab = prefabs;
    }

    public void SpawnEnemy()
    {
        GameObject prefabToSpawn = GetEnemyPrefab();
        if (prefabToSpawn == null)
        {
            return;
        }

        Vector3 spawnPosition;
        Quaternion spawnRotation;
        GetSpawnPose(out spawnPosition, out spawnRotation);
        Instantiate(prefabToSpawn, spawnPosition, spawnRotation);
    }

    GameObject GetEnemyPrefab()
    {
        if (enemyPrefab == null || enemyPrefab.Length == 0)
        {
            return null;
        }

        return enemyPrefab[Random.Range(0, enemyPrefab.Length)];
    }

    Transform GetSpawnPoint()
    {
        if (spawnPoints != null && spawnPoints.Length > 0 && spawnPoints[0] != null)
        {
            int spawnPointIndex = Random.Range(0, spawnPoints.Length);
            return spawnPoints[spawnPointIndex] != null ? spawnPoints[spawnPointIndex] : spawnPoints[0];
        }

        return transform;
    }

    void GetSpawnPose(out Vector3 spawnPosition, out Quaternion spawnRotation)
    {
        if (!spawnAroundPlayer)
        {
            Transform spawnPoint = GetSpawnPoint();
            spawnPosition = spawnPoint.position;
            spawnRotation = spawnPoint.rotation;
            return;
        }

        ResolvePlayer();
        Vector3 center = player != null ? player.position : transform.position;

        Vector3 playerForward = player != null ? player.forward : Vector3.forward;
        playerForward.y = 0f;
        if (playerForward.sqrMagnitude < 0.001f)
            playerForward = Vector3.forward;
        playerForward.Normalize();

        float baseAngle = Mathf.Atan2(playerForward.x, playerForward.z) * Mathf.Rad2Deg;
        float randomAngle = baseAngle + Random.Range(-spawnFrontAngle, spawnFrontAngle);
        float rad = randomAngle * Mathf.Deg2Rad;
        Vector2 randomCircle = new Vector2(Mathf.Sin(rad), Mathf.Cos(rad));

        float radius = Random.Range(minSpawnRadius, Mathf.Max(minSpawnRadius, maxSpawnRadius));
        spawnPosition = center + new Vector3(randomCircle.x, 0f, randomCircle.y) * radius;
        spawnPosition = ProjectToGround(spawnPosition, center.y);

        Vector3 lookDirection = center - spawnPosition;
        lookDirection.y = 0f;
        spawnRotation = lookDirection.sqrMagnitude > 0.001f
            ? Quaternion.LookRotation(lookDirection.normalized)
            : Quaternion.identity;
    }

    Vector3 ProjectToGround(Vector3 position, float fallbackY)
    {
        Vector3 rayOrigin = position + Vector3.up * groundRayHeight;
        if (Physics.Raycast(rayOrigin, Vector3.down, out RaycastHit hit, groundRayHeight * 2f, groundMask, QueryTriggerInteraction.Ignore))
        {
            position.y = hit.point.y;
            return position;
        }

        position.y = fallbackY;
        return position;
    }

    int CountAliveEnemies()
    {
        EnemyController[] enemies = FindObjectsOfType<EnemyController>();
        int count = 0;
        for (int i = 0; i < enemies.Length; i++)
        {
            if (enemies[i] != null && !enemies[i].IsDead())
            {
                count++;
            }
        }

        return count;
    }

    void ResolvePlayer()
    {
        if (player != null)
        {
            return;
        }

        GameObject playerObject = GameObject.FindGameObjectWithTag("Player");
        if (playerObject != null)
        {
            player = playerObject.transform;
        }
    }
}
