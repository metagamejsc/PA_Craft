
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

[DisallowMultipleComponent]
public class EnemyButtonSelectionSpawner : MonoBehaviour
{
    [Serializable]
    public class EnemyButtonConfig
    {
        public Button button;
        public GameObject enemyPrefab;
        public int spawnCount = 1;
        public float scaleMultiplier = 1f;
        public float moveSpeed = 2f;
        public float attackDistance = 3f;
        public Vector3 rotationOffset;
    }

    [Header("UI")]
    [SerializeField] private GameObject selectionUI;
    [SerializeField] private EnemyButtonConfig[] enemies = new EnemyButtonConfig[4];
    [SerializeField] private int requiredSelectionCount = 2;
    [SerializeField] private bool disableSelectedButton = true;

    [Header("Spawn")]
    [SerializeField] private Camera spawnCamera;
    [SerializeField] private Transform targetCharacter;
    [SerializeField] private string targetTag = "Player";
    [SerializeField] private float spawnDistance = 8f;
    [SerializeField] private float spawnRandomRadius = 2.5f;
    [SerializeField] private float horizontalSpacing = 1.6f;
    [SerializeField] private float rowSpacing = 1.4f;
    [SerializeField] private int spawnColumns = 4;
    [SerializeField] private bool projectToGround = true;
    [SerializeField] private LayerMask groundLayerMask = ~0;
    [SerializeField] private float groundRayHeight = 12f;
    [SerializeField] private float groundRayDistance = 30f;

    [Header("Enemy Controller")]
    [SerializeField] private bool disableEnemyControllerUntilSelectionComplete = true;
    [SerializeField] private bool overrideEnemyMoveSpeed = true;
    [SerializeField] private bool overrideEnemyAttackDistance = true;
    [SerializeField] private bool ignoreTutorialGateAfterSelection = true;

    private readonly HashSet<int> selectedIndexes = new HashSet<int>();
    private readonly List<GameObject> spawnedEnemies = new List<GameObject>();
    private readonly List<EnemyButtonConfig> spawnedEnemyConfigs = new List<EnemyButtonConfig>();
    private bool selectionCompleted;

    private void Awake()
    {
        ResolveCamera();
        ResolveTargetCharacter();
    }

    private void Start()
    {
        RegisterButtonCallbacks();
        ShowSelectionPanel();
    }

    public void SelectEnemy0()
    {
        SelectEnemy(0);
    }

    public void SelectEnemy1()
    {
        SelectEnemy(1);
    }

    public void SelectEnemy2()
    {
        SelectEnemy(2);
    }

    public void SelectEnemy3()
    {
        SelectEnemy(3);
    }

    public void SelectEnemy(int index)
    {
        if (selectionCompleted || selectedIndexes.Contains(index))
        {
            return;
        }

        if (selectedIndexes.Count >= GetRequiredSelectionCount())
        {
            return;
        }

        if (index < 0 || enemies == null || index >= enemies.Length)
        {
            Debug.LogWarning("Enemy index is out of range: " + index);
            return;
        }

        EnemyButtonConfig config = enemies[index];
        if (config == null || config.enemyPrefab == null)
        {
            Debug.LogWarning("Missing enemy prefab at index: " + index);
            return;
        }

        selectedIndexes.Add(index);
        if (disableSelectedButton && config.button != null)
        {
            config.button.interactable = false;
        }

        SpawnEnemies(config);

        if (selectedIndexes.Count >= GetRequiredSelectionCount())
        {
            CompleteSelection();
        }
    }

    public void ResetSelection()
    {
        selectedIndexes.Clear();
        selectionCompleted = false;

        for (int i = 0; i < spawnedEnemies.Count; i++)
        {
            if (spawnedEnemies[i] != null)
            {
                Destroy(spawnedEnemies[i]);
            }
        }

        spawnedEnemies.Clear();
        spawnedEnemyConfigs.Clear();
        ShowSelectionPanel();
    }

    private void ShowSelectionPanel()
    {
        if (selectionUI != null)
        {
            selectionUI.SetActive(true);
        }

        if (enemies == null)
        {
            return;
        }

        for (int i = 0; i < enemies.Length; i++)
        {
            if (enemies[i] != null && enemies[i].button != null)
            {
                enemies[i].button.interactable = true;
            }
        }
    }

    private void RegisterButtonCallbacks()
    {
        if (enemies == null)
        {
            return;
        }

        for (int i = 0; i < enemies.Length; i++)
        {
            int index = i;
            if (enemies[i] != null && enemies[i].button != null)
            {
                enemies[i].button.onClick.AddListener(() => SelectEnemy(index));
            }
        }
    }

    private int GetRequiredSelectionCount()
    {
        if (enemies == null || enemies.Length == 0)
        {
            return 0;
        }

        return Mathf.Clamp(requiredSelectionCount, 1, enemies.Length);
    }

    private void SpawnEnemies(EnemyButtonConfig config)
    {
        int count = Mathf.Max(0, config.spawnCount);
        for (int i = 0; i < count; i++)
        {
            Vector3 spawnPosition = GetSpawnPosition(spawnedEnemies.Count);
            Quaternion spawnRotation = GetSpawnRotation(spawnPosition, config.rotationOffset);
            GameObject enemy = Instantiate(config.enemyPrefab, spawnPosition, spawnRotation);

            if (!Mathf.Approximately(config.scaleMultiplier, 1f) && config.scaleMultiplier > 0f)
            {
                enemy.transform.localScale *= config.scaleMultiplier;
            }

            PrepareEnemy(enemy, config, false);
            spawnedEnemies.Add(enemy);
            spawnedEnemyConfigs.Add(config);
        }
    }

    private Vector3 GetSpawnPosition(int globalIndex)
    {
        Transform origin = GetSpawnOrigin();
        Vector3 forward = GetPlanarForward(origin);
        Vector3 right = GetPlanarRight(origin, forward);

        Vector3 basePosition = origin.position + forward * spawnDistance;
        Vector2 randomOffset = UnityEngine.Random.insideUnitCircle * Mathf.Max(0f, spawnRandomRadius);
        Vector3 position = basePosition
            + right * randomOffset.x
            + forward * randomOffset.y;

        if (projectToGround)
        {
            ProjectToGround(ref position);
        }

        return position;
    }

    private Quaternion GetSpawnRotation(Vector3 spawnPosition, Vector3 rotationOffset)
    {
        Transform lookTarget = targetCharacter != null ? targetCharacter : GetSpawnOrigin();
        Vector3 lookDirection = lookTarget.position - spawnPosition;
        lookDirection.y = 0f;

        Quaternion lookRotation = lookDirection.sqrMagnitude > 0.001f
            ? Quaternion.LookRotation(lookDirection.normalized)
            : Quaternion.identity;

        return lookRotation * Quaternion.Euler(rotationOffset);
    }

    private Transform GetSpawnOrigin()
    {
        ResolveCamera();
        return spawnCamera != null ? spawnCamera.transform : transform;
    }

    private Vector3 GetPlanarForward(Transform origin)
    {
        Vector3 forward = origin.forward;
        forward.y = 0f;

        if (forward.sqrMagnitude <= 0.001f)
        {
            forward = Vector3.forward;
        }

        return forward.normalized;
    }

    private Vector3 GetPlanarRight(Transform origin, Vector3 forward)
    {
        Vector3 right = origin.right;
        right.y = 0f;

        if (right.sqrMagnitude <= 0.001f)
        {
            right = Vector3.Cross(Vector3.up, forward);
        }

        return right.normalized;
    }

    private void ProjectToGround(ref Vector3 position)
    {
        Vector3 rayStart = position + Vector3.up * groundRayHeight;
        RaycastHit hit;
        if (Physics.Raycast(
                rayStart,
                Vector3.down,
                out hit,
                groundRayHeight + groundRayDistance,
                groundLayerMask,
                QueryTriggerInteraction.Ignore))
        {
            position.y = hit.point.y;
        }
    }

    private void PrepareEnemy(GameObject enemy, EnemyButtonConfig config, bool canMove)
    {
        if (enemy == null)
        {
            return;
        }

        EnemyController[] controllers = enemy.GetComponentsInChildren<EnemyController>(true);
        if (controllers.Length == 0)
        {
            Debug.LogWarning("Spawned enemy prefab does not contain EnemyController: " + enemy.name);
            return;
        }

        ResolveTargetCharacter();

        for (int i = 0; i < controllers.Length; i++)
        {
            EnemyController controller = controllers[i];
            if (controller == null)
            {
                continue;
            }

            ApplyEnemyControllerConfig(controller, config);
            controller.enabled = canMove || !disableEnemyControllerUntilSelectionComplete;
        }
    }

    private void ApplyEnemyControllerConfig(EnemyController controller, EnemyButtonConfig config)
    {
        if (targetCharacter != null)
        {
            controller.player = targetCharacter;
            controller.playerController = targetCharacter.GetComponent<PlayerController>();
        }

        if (config != null)
        {
            if (overrideEnemyMoveSpeed && config.moveSpeed > 0f)
            {
                controller.moveSpeed = config.moveSpeed;
            }

            if (overrideEnemyAttackDistance && config.attackDistance > 0f)
            {
                controller.attackDistance = config.attackDistance;
            }
        }

        if (ignoreTutorialGateAfterSelection)
        {
            controller.waitForTutorialComplete = false;
        }
    }

    private void CompleteSelection()
    {
        selectionCompleted = true;

        if (selectionUI != null)
        {
            selectionUI.SetActive(false);
        }

        for (int i = 0; i < spawnedEnemies.Count; i++)
        {
            if (spawnedEnemies[i] == null)
            {
                continue;
            }

            EnemyButtonConfig config = i < spawnedEnemyConfigs.Count ? spawnedEnemyConfigs[i] : null;
            PrepareEnemy(spawnedEnemies[i], config, true);
        }
    }

    private void ResolveCamera()
    {
        if (spawnCamera == null)
        {
            spawnCamera = Camera.main;
        }
    }

    private void ResolveTargetCharacter()
    {
        if (targetCharacter != null)
        {
            return;
        }

        if (string.IsNullOrEmpty(targetTag))
        {
            return;
        }

        GameObject targetObject;
        try
        {
            targetObject = GameObject.FindGameObjectWithTag(targetTag);
        }
        catch (UnityException)
        {
            Debug.LogWarning("Target tag is not defined: " + targetTag);
            return;
        }

        if (targetObject != null)
        {
            targetCharacter = targetObject.transform;
        }
    }
}
