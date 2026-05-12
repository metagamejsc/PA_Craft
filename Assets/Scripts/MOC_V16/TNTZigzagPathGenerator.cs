using System.Collections.Generic;
using UnityEngine;

[ExecuteAlways]
public class TNTZigzagPathGenerator : MonoBehaviour
{
    private const string GeneratedBlockNamePrefix = "Generated_TNT_Zigzag_";

    [Header("References")]
    [SerializeField] private TNTObject tntPrefab;
    [SerializeField] private Transform player;
    [SerializeField] private Transform pathOrigin;
    [SerializeField] private Transform tntParent;

    [Header("Path")]
    [SerializeField] private int blocksAhead = 20;
    [SerializeField] private int blocksBehind = 0;
    [SerializeField] private float blockSpacing = 1f;
    [SerializeField] private int blocksPerRow = 4;
    [SerializeField] private float rowXOffset = 1f;
    [SerializeField] private int startIndex = 1;
    [SerializeField] private bool generateOnStart = true;
    [SerializeField] private bool activateOnTutorialComplete = true;
    [SerializeField] private bool requireTutorialBuildBlockComplete = true;
    [SerializeField] private int passedTntToShowEndCard =>LunaManager.ins.passedTntCount;
    [SerializeField] private bool autoRefreshInEditor = true;

    private readonly Dictionary<int, TNTObject> spawnedBlocks = new Dictionary<int, TNTObject>();
    private Vector3 originPosition;
    private Vector3 forward;
    private Vector3 right;
    private bool tntActive;
    [SerializeField] private int passedTntCount;

    private void Awake()
    {
        ResolveReferences();
        CachePathAxes();
        if (Application.isPlaying && (activateOnTutorialComplete || requireTutorialBuildBlockComplete))
        {
            SetTntActive(false);
        }
    }

    private void OnEnable()
    {
        if (!Application.isPlaying)
        {
            RefreshEditorPreview();
            return;
        }

        TutorialBuildBlock.OnTutorialCompleted += HandleTutorialCompleted;
        BlockSelectLoginFlow.OnFlowCompleted += HandleTutorialCompleted;
        TNTObject.OnTntExploded += HandleTntExploded;
    }

    private void OnDisable()
    {
        if (!Application.isPlaying)
        {
            ClearEditorPreviewBlocks();
            return;
        }
        TutorialBuildBlock.OnTutorialCompleted -= HandleTutorialCompleted;
        BlockSelectLoginFlow.OnFlowCompleted -= HandleTutorialCompleted;
        TNTObject.OnTntExploded -= HandleTntExploded;
    }

    private void Start()
    {
        if (!Application.isPlaying)
        {
            RefreshEditorPreview();
            return;
        }

        ClearEditorPreviewBlocks();

        if (generateOnStart)
        {
            UpdateVisibleBlocks();
        }

        if (!activateOnTutorialComplete)
        {
            SetTntActive(CanActivateTnt());
        }
    }

    private void Update()
    {
        if (!Application.isPlaying)
        {
            return;
        }

        UpdateVisibleBlocks();
    }

    private void OnValidate()
    {
        blocksAhead = Mathf.Max(0, blocksAhead);
        blocksBehind = Mathf.Max(0, blocksBehind);
        blockSpacing = Mathf.Max(0.01f, blockSpacing);
        blocksPerRow = Mathf.Max(1, blocksPerRow);
        startIndex = Mathf.Max(0, startIndex);

        if (!Application.isPlaying && autoRefreshInEditor)
        {
            QueueEditorPreviewRefresh();
        }
    }

    private void ResolveReferences()
    {
        if (player == null)
        {
            PlayerChar playerChar = FindObjectOfType<PlayerChar>();
            if (playerChar != null)
            {
                player = playerChar.transform;
            }
        }

        if (pathOrigin == null)
        {
            pathOrigin = transform;
        }

        if (tntParent == null)
        {
            tntParent = transform;
        }
    }

    private void CachePathAxes()
    {
        Transform axisSource = pathOrigin != null ? pathOrigin : transform;
        originPosition = axisSource.position;
        forward = Vector3.ProjectOnPlane(axisSource.forward, Vector3.up).normalized;
        if (forward.sqrMagnitude <= 0.001f)
        {
            forward = Vector3.forward;
        }

        right = Vector3.Cross(Vector3.up, forward).normalized;
    }

    private void HandleTutorialCompleted()
    {
        SetTntActive(CanActivateTnt());
    }

    public void SetTntActive(bool active)
    {
        tntActive = active;
        UpdateSpawnedBlocksActivationState();
    }

    private bool CanActivateTnt()
    {
        if (!requireTutorialBuildBlockComplete)
        {
            return true;
        }

        TutorialBuildBlock tutorial = TutorialBuildBlock.ins;
        if (tutorial == null)
        {
            tutorial = FindObjectOfType<TutorialBuildBlock>();
        }

        return tutorial != null && tutorial.IsCompleted;
    }

    private void UpdateVisibleBlocks()
    {
        if (tntPrefab == null || player == null)
        {
            return;
        }

        if (blocksAhead <= 0)
        {
            return;
        }

        int playerIndex = GetPlayerPathIndex();
        int minIndex = Mathf.Max(startIndex, playerIndex - blocksBehind);
        int maxIndex = Mathf.Max(minIndex, playerIndex + blocksAhead - 1);

        for (int index = minIndex; index <= maxIndex; index++)
        {
            SpawnBlock(index);
        }
    }

    private int GetPlayerPathIndex()
    {
        Vector3 fromOrigin = player.position - originPosition;
        float distance = Vector3.Dot(fromOrigin, forward);
        int row = Mathf.Max(0, Mathf.FloorToInt(distance / blockSpacing));
        return Mathf.Max(startIndex, startIndex + row * blocksPerRow);
    }

    private void HandleTntExploded(TNTObject explodedTnt)
    {
        passedTntCount++;

        if (passedTntToShowEndCard > 0 && passedTntCount >= passedTntToShowEndCard && LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
        }
    }

    private void SpawnBlock(int index)
    {
        if (spawnedBlocks.ContainsKey(index))
        {
            return;
        }

        TNTObject block = Instantiate(tntPrefab, GetBlockPosition(index), GetBlockRotation(), tntParent);
        SetupStaticTnt(block);
        block.SetCanBeActivatedByPlayer(tntActive);

        spawnedBlocks.Add(index, block);
    }

    private void UpdateSpawnedBlocksActivationState()
    {
        foreach (TNTObject block in spawnedBlocks.Values)
        {
            if (block != null)
            {
                block.SetCanBeActivatedByPlayer(tntActive);
            }
        }
    }

    private void RefreshEditorPreview()
    {
        if (Application.isPlaying || !autoRefreshInEditor || tntPrefab == null)
        {
            return;
        }

        ResolveReferences();
        CachePathAxes();
        ClearEditorPreviewBlocks();

        if (blocksAhead <= 0)
        {
            return;
        }

        int minIndex = startIndex;
        int maxIndex = startIndex + blocksAhead - 1;
        for (int index = minIndex; index <= maxIndex; index++)
        {
            CreateEditorPreviewBlock(index);
        }
    }

    private void CreateEditorPreviewBlock(int index)
    {
        Transform parent = tntParent != null ? tntParent : transform;
        TNTObject block = CreateTntInstance(GetBlockPosition(index), GetBlockRotation(), parent);
        block.name = GeneratedBlockNamePrefix + index;
        SetupStaticTnt(block);
    }

    private TNTObject CreateTntInstance(Vector3 position, Quaternion rotation, Transform parent)
    {
#if UNITY_EDITOR
        if (!Application.isPlaying)
        {
            GameObject prefabObject = UnityEditor.PrefabUtility.InstantiatePrefab(tntPrefab.gameObject, parent) as GameObject;
            if (prefabObject != null)
            {
                prefabObject.transform.SetPositionAndRotation(position, rotation);
                return prefabObject.GetComponent<TNTObject>();
            }
        }
#endif
        return Instantiate(tntPrefab, position, rotation, parent);
    }

    private static void SetupStaticTnt(TNTObject block)
    {
        Rigidbody rb = block.GetComponent<Rigidbody>();
        if (rb == null)
        {
            return;
        }

        rb.useGravity = false;
        rb.isKinematic = true;
        rb.velocity = Vector3.zero;
        rb.angularVelocity = Vector3.zero;
    }

    private void ClearEditorPreviewBlocks()
    {
        Transform parent = tntParent != null ? tntParent : transform;
        for (int i = parent.childCount - 1; i >= 0; i--)
        {
            Transform child = parent.GetChild(i);
            if (!child.name.StartsWith(GeneratedBlockNamePrefix))
            {
                continue;
            }

            if (Application.isPlaying)
            {
                Destroy(child.gameObject);
            }
            else
            {
#if UNITY_EDITOR
                DestroyImmediate(child.gameObject);
#else
                Destroy(child.gameObject);
#endif
            }
        }
    }

    private void QueueEditorPreviewRefresh()
    {
#if UNITY_EDITOR
        UnityEditor.EditorApplication.delayCall -= RefreshEditorPreview;
        UnityEditor.EditorApplication.delayCall += RefreshEditorPreview;
#endif
    }

    private Vector3 GetBlockPosition(int index)
    {
        int localIndex = Mathf.Max(0, index - startIndex);
        int row = localIndex / blocksPerRow;
        int column = localIndex % blocksPerRow;

        return originPosition +
               forward * (row * blockSpacing) +
               right * ((row * rowXOffset) + (column * blockSpacing));
    }

    private Quaternion GetBlockRotation()
    {
        return tntPrefab != null ? tntPrefab.transform.rotation : Quaternion.identity;
    }

    private void RemoveBlocksOutside(int minIndex, int maxIndex)
    {
        List<int> removeIndexes = null;

        foreach (KeyValuePair<int, TNTObject> pair in spawnedBlocks)
        {
            if (pair.Key >= minIndex && pair.Key <= maxIndex)
            {
                continue;
            }

            if (removeIndexes == null)
            {
                removeIndexes = new List<int>();
            }

            removeIndexes.Add(pair.Key);
        }

        if (removeIndexes == null)
        {
            return;
        }

        foreach (int index in removeIndexes)
        {
            if (spawnedBlocks[index] != null)
            {
                Destroy(spawnedBlocks[index].gameObject);
            }

            spawnedBlocks.Remove(index);
        }
    }
}
