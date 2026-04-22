using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FishSpawnArea : MonoBehaviour
{
    [Header("Spawn")]
    public List<JumpingFish> fishPrefabs;
    public int spawnCount = 5;
    public bool spawnOnStart = true;
    public float respawnDelay = 2f;
    public Transform fishParent;
    public float minSpacing = 1.5f;
    public int maxSpawnAttemptsPerFish = 12;

    [Header("Area")]
    public BoxCollider spawnBounds;
    public Vector3 areaCenter = Vector3.zero;
    public Vector3 areaSize = new Vector3(8f, 0f, 8f);
    public float surfaceYOffset = 0f;

    private readonly List<JumpingFish> activeFish = new List<JumpingFish>();

    private void Awake()
    {
        if (spawnBounds == null)
            spawnBounds = GetComponent<BoxCollider>();

        if (fishParent == null)
            fishParent = transform;
    }

    private void Start()
    {
        if (!Application.isPlaying || !spawnOnStart)
            return;

        StartCoroutine(SpawnWhenReady());
    }

    [ContextMenu("Spawn Missing Fish")]
    public void SpawnMissingFish()
    {
        if (!Application.isPlaying)
            return;

        CleanupMissingFish();

        while (activeFish.Count < spawnCount)
        {
            if (!TrySpawnFish())
                break;
        }
    }

    public void NotifyFishCaught(JumpingFish fish)
    {
        activeFish.Remove(fish);

        if (!Application.isPlaying || respawnDelay < 0f)
            return;

        StartCoroutine(RespawnAfterDelay());
    }

    public Vector3 ClampToSurface(Vector3 worldPosition)
    {
        Bounds bounds = GetWorldBounds();

        worldPosition.x = Mathf.Clamp(worldPosition.x, bounds.min.x, bounds.max.x);
        worldPosition.z = Mathf.Clamp(worldPosition.z, bounds.min.z, bounds.max.z);
        worldPosition.y = GetSurfaceY(bounds);

        return worldPosition;
    }

    private IEnumerator RespawnAfterDelay()
    {
        yield return new WaitForSeconds(respawnDelay);
        yield return new WaitUntil(CanSpawnFish);
        SpawnMissingFish();
    }

    private IEnumerator SpawnWhenReady()
    {
        yield return new WaitUntil(CanSpawnFish);
        SpawnMissingFish();
    }

    private bool TrySpawnFish()
    {
        for (int i = 0; i < Mathf.Max(1, maxSpawnAttemptsPerFish); i++)
        {
            Vector3 spawnPosition = GetRandomSurfacePoint();

            if (!HasEnoughSpacing(spawnPosition))
                continue;

            int randomIndex = Random.Range(0, fishPrefabs.Count);
            JumpingFish spawnedFish = Instantiate(fishPrefabs[randomIndex], spawnPosition, Quaternion.identity, fishParent);
            spawnedFish.Setup(this, spawnPosition);
            activeFish.Add(spawnedFish);
            return true;
        }

        return false;
    }

    private Vector3 GetRandomSurfacePoint()
    {
        Bounds bounds = GetWorldBounds();

        return new Vector3(
            Random.Range(bounds.min.x, bounds.max.x),
            GetSurfaceY(bounds),
            Random.Range(bounds.min.z, bounds.max.z)
        );
    }

    private bool HasEnoughSpacing(Vector3 spawnPosition)
    {
        float minSpacingSqr = minSpacing * minSpacing;

        for (int i = activeFish.Count - 1; i >= 0; i--)
        {
            if (activeFish[i] == null)
            {
                activeFish.RemoveAt(i);
                continue;
            }

            Vector3 otherPos = activeFish[i].SurfacePosition;
            otherPos.y = spawnPosition.y;

            if ((otherPos - spawnPosition).sqrMagnitude < minSpacingSqr)
                return false;
        }

        return true;
    }

    private void CleanupMissingFish()
    {
        for (int i = activeFish.Count - 1; i >= 0; i--)
        {
            if (activeFish[i] == null)
                activeFish.RemoveAt(i);
        }
    }

    private Bounds GetWorldBounds()
    {
        if (spawnBounds != null)
            return spawnBounds.bounds;

        Vector3 size = Vector3.Scale(areaSize, transform.lossyScale);
        size.x = Mathf.Max(0.1f, Mathf.Abs(size.x));
        size.y = Mathf.Max(0.1f, Mathf.Abs(size.y));
        size.z = Mathf.Max(0.1f, Mathf.Abs(size.z));

        return new Bounds(transform.TransformPoint(areaCenter), size);
    }

    private float GetSurfaceY(Bounds bounds)
    {
        if (spawnBounds != null)
            return bounds.max.y + surfaceYOffset;

        return bounds.center.y + surfaceYOffset;
    }

    private bool CanSpawnFish()
    {
        if (!Application.isPlaying)
            return false;

        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
            return false;

        if (TutorialBuildBlock.ins != null && !TutorialBuildBlock.ins.isCompleteTutorial)
            return false;

        return true;
    }

    private void OnDrawGizmosSelected()
    {
        Bounds bounds = GetWorldBounds();
        Vector3 center = bounds.center;
        center.y = GetSurfaceY(bounds);

        Gizmos.color = new Color(0.2f, 0.8f, 1f, 0.25f);
        Gizmos.DrawCube(center, new Vector3(bounds.size.x, 0.05f, bounds.size.z));

        Gizmos.color = new Color(0.2f, 0.8f, 1f, 0.85f);
        Gizmos.DrawWireCube(center, new Vector3(bounds.size.x, 0.05f, bounds.size.z));
    }
}
