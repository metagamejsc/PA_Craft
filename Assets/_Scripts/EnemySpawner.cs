using DG.Tweening;
using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    public GameObject[] enemyPrefab;
    public Transform[] spawnPoints;

    [Header("Camera Move")]
    public Transform cameraPathStartPoint;
    public Transform cameraPathEndPoint;
    public Transform cameraTransform;
    public PlayerController playerController;
    public GameObject finishParticleEffect;
    public Renderer finishColorRenderer;
    [SerializeField] private float cameraMoveDuration = 0.8f;
    [SerializeField] private Ease cameraMoveEase = Ease.InOutSine;
    [SerializeField] private bool snapCameraToPathStart = true;
    [SerializeField] private bool deactivateFinishEffectOnStart = true;
    [SerializeField] private int finishColorMaterialIndex = 0;
    [SerializeField] private Color finishMaterialColor = Color.white;
    [SerializeField] private string finishColorProperty = "_Color";

    [Header("Spawn Settings")]
    [SerializeField] private int enemyIndex = 0;
    [SerializeField] private bool spawnOnStart = true;
    [SerializeField] private int maxTotalEnemies = 5;

    private int spawnedCount;
    private int currentSegmentIndex;
    private bool isMovingToNextSegment;
    private EnemyController currentEnemy;
    private Tween cameraMoveTween;

    void Start()
    {
        ResolveReferences();
        PrepareFinishEffect();
        SnapCameraToPathStart();

        if (!spawnOnStart)
        {
            return;
        }

        EnemyController existingEnemy = FindObjectOfType<EnemyController>();
        if (existingEnemy != null)
        {
            currentEnemy = existingEnemy;
            spawnedCount = Mathf.Max(1, EnemyController.AliveCount);
            currentSegmentIndex = Mathf.Clamp(spawnedCount - 1, 0, GetMaxTotalEnemies() - 1);
            return;
        }

        SpawnEnemyForSegment(0);
    }

    void OnDisable()
    {
        cameraMoveTween?.Kill();
    }

    public static bool NotifyEnemyKilled(EnemyController enemy)
    {
        EnemySpawner[] spawners = FindObjectsOfType<EnemySpawner>();
        bool handled = false;
        for (int i = 0; i < spawners.Length; i++)
        {
            EnemySpawner spawner = spawners[i];
            if (spawner == null || !spawner.isActiveAndEnabled)
            {
                continue;
            }

            if (spawner.HandleEnemyKilled(enemy))
            {
                handled = true;
            }
        }

        return handled;
    }

    bool HandleEnemyKilled(EnemyController enemy)
    {
        if (isMovingToNextSegment)
        {
            return false;
        }

        if (currentEnemy == null || enemy != currentEnemy)
        {
            return false;
        }

        currentEnemy = null;
        int completedSegmentIndex = currentSegmentIndex;
        currentSegmentIndex++;

        MoveCameraThenSpawnNext(completedSegmentIndex);
        return true;
    }

    void MoveCameraThenSpawnNext(int completedSegmentIndex)
    {
        if (!TryGetCameraPathStep(completedSegmentIndex, out Vector3 targetPosition, out Quaternion targetRotation))
        {
            FinishCameraMove();
            return;
        }

        ResolveReferences();
        isMovingToNextSegment = true;

        if (playerController != null)
        {
            cameraMoveTween = playerController.MoveGameplayCameraTo(
                targetPosition,
                targetRotation,
                cameraMoveDuration,
                cameraMoveEase,
                FinishCameraMove);
        }
        else
        {
            Transform targetCamera = cameraTransform != null ? cameraTransform : Camera.main?.transform;
            if (targetCamera != null)
            {
                float moveDuration = Mathf.Max(0f, cameraMoveDuration);
                cameraMoveTween = DOTween.Sequence()
                    .Join(targetCamera.DOMove(targetPosition, moveDuration).SetEase(cameraMoveEase))
                    .Join(targetCamera.DORotateQuaternion(targetRotation, moveDuration).SetEase(cameraMoveEase))
                    .SetLink(targetCamera.gameObject);
            }
        }

        if (cameraMoveTween == null)
        {
            FinishCameraMove();
            return;
        }

        if (playerController == null)
        {
            cameraMoveTween.OnComplete(FinishCameraMove);
        }
    }

    void FinishCameraMove()
    {
        isMovingToNextSegment = false;
        if (spawnedCount >= GetMaxTotalEnemies())
        {
            ActivateFinishEffect();
            ApplyFinishMaterialColor();
            ShowEndCardIfNeeded();
            return;
        }

        SpawnEnemyForSegment(currentSegmentIndex);
    }

    bool SpawnEnemyForSegment(int segmentIndex)
    {
        GameObject prefabToSpawn = GetEnemyPrefab();
        Transform spawnPoint = GetSpawnPoint(segmentIndex);
        if (prefabToSpawn == null || spawnPoint == null || spawnedCount >= GetMaxTotalEnemies())
        {
            return false;
        }

        GameObject enemyObject = Instantiate(prefabToSpawn, spawnPoint.position, spawnPoint.rotation);
        currentEnemy = enemyObject.GetComponentInChildren<EnemyController>();
        spawnedCount++;
        currentSegmentIndex = segmentIndex;
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

    Transform GetSpawnPoint(int segmentIndex)
    {
        if (spawnPoints != null && spawnPoints.Length > 0)
        {
            for (int i = 0; i < spawnPoints.Length; i++)
            {
                int spawnPointIndex = (segmentIndex + i) % spawnPoints.Length;
                if (spawnPoints[spawnPointIndex] != null)
                {
                    return spawnPoints[spawnPointIndex];
                }
            }
        }

        return transform;
    }

    int GetMaxTotalEnemies()
    {
        return Mathf.Max(1, maxTotalEnemies);
    }

    bool HasPendingSpawn()
    {
        return spawnOnStart &&
            isActiveAndEnabled &&
            GetEnemyPrefab() != null &&
            spawnedCount < GetMaxTotalEnemies();
    }

    void ResolveReferences()
    {
        if (cameraTransform == null && Camera.main != null)
        {
            cameraTransform = Camera.main.transform;
        }

        if (playerController == null)
        {
            playerController = FindObjectOfType<PlayerController>();
        }
    }

    void PrepareFinishEffect()
    {
        if (finishParticleEffect != null && deactivateFinishEffectOnStart)
        {
            finishParticleEffect.SetActive(true);
        }
    }

    void SnapCameraToPathStart()
    {
        if (!snapCameraToPathStart || cameraPathStartPoint == null)
        {
            return;
        }

        if (playerController != null)
        {
            playerController.SetGameplayCameraTo(cameraPathStartPoint);
            return;
        }

        Transform targetCamera = cameraTransform != null ? cameraTransform : Camera.main?.transform;
        if (targetCamera != null)
        {
            targetCamera.SetPositionAndRotation(cameraPathStartPoint.position, cameraPathStartPoint.rotation);
        }
    }

    bool TryGetCameraPathStep(int segmentIndex, out Vector3 targetPosition, out Quaternion targetRotation)
    {
        targetPosition = Vector3.zero;
        targetRotation = Quaternion.identity;

        if (cameraPathStartPoint == null || cameraPathEndPoint == null)
        {
            return false;
        }

        float step = Mathf.Clamp01((segmentIndex + 1f) / GetMaxTotalEnemies());
        targetPosition = Vector3.Lerp(cameraPathStartPoint.position, cameraPathEndPoint.position, step);
        targetRotation = Quaternion.Slerp(cameraPathStartPoint.rotation, cameraPathEndPoint.rotation, step);
        return true;
    }

    void ActivateFinishEffect()
    {
        if (finishParticleEffect != null)
        {
            if (AudioManager.ins != null)
            {
                AudioManager.ins.PlaySoundBomb();
            }

            finishParticleEffect.SetActive(false);
        }
    }

    void ApplyFinishMaterialColor()
    {
        if (finishColorRenderer == null)
        {
            return;
        }

        Material[] materials = finishColorRenderer.materials;
        if (materials == null || materials.Length == 0)
        {
            return;
        }

        int materialIndex = Mathf.Clamp(finishColorMaterialIndex, 0, materials.Length - 1);
        Material targetMaterial = materials[materialIndex];
        if (targetMaterial == null)
        {
            return;
        }

        if (targetMaterial.HasProperty(finishColorProperty))
        {
            targetMaterial.SetColor(finishColorProperty, finishMaterialColor);
            return;
        }

        if (targetMaterial.HasProperty("_BaseColor"))
        {
            targetMaterial.SetColor("_BaseColor", finishMaterialColor);
            return;
        }

        targetMaterial.color = finishMaterialColor;
    }

    void ShowEndCardIfNeeded()
    {
        if (LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
        }
    }

    public static bool HasPendingSpawns()
    {
        EnemySpawner[] spawners = FindObjectsOfType<EnemySpawner>();
        for (int i = 0; i < spawners.Length; i++)
        {
            EnemySpawner spawner = spawners[i];
            if (spawner != null && (spawner.HasPendingSpawn() || spawner.isMovingToNextSegment))
            {
                return true;
            }
        }

        return false;
    }
}
