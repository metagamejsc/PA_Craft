using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class ArrowAmbushSequenceController : MonoBehaviour
{
    [Serializable]
    public class EnemySlot
    {
        public EnemyController enemy;
        public Transform startPoint;
        public bool applyStartPoint = true;
        public Transform enemyRootPoint;
        public Transform arrowTargetPoint;
        public Vector3 arrowTargetOffset = Vector3.zero;
        public int surroundingArrowCount = -1;
        public int attachedArrowCount = -1;
    }

    [Header("Scene Setup")]
    public Camera gameplayCamera;
    public Transform cameraStartPoint;
    public bool applyCameraStartPoint = true;
    public EnemySlot[] enemies = { new EnemySlot(), new EnemySlot() };
    public bool lockEnemiesBeforeClick = true;
    public bool playOnStart = false;

    [Header("Input")]
    public PlayerController playerController;
    public bool disablePlayerControllerDuringSequence = true;
    public bool reenablePlayerControllerAfterSequence = false;

    [Header("Fade")]
    public Graphic fadeGraphic;
    public Color fadeColor = Color.black;
    [Range(0f, 1f)] public float fadeTargetAlpha = 1f;
    public float fadeOutDuration = 0.45f;
    [Range(0f, 1f)] public float spawnAtFadeProgress = 0.5f;
    public float fadeHoldDuration = 0.05f;
    public bool fadeBackInAfterSpawn = true;
    public float fadeInDuration = 0.45f;

    [Header("Click Sound")]
    public bool playClickSound = true;
    public bool useFireSoundWhenNoOverride = true;
    public AudioClip clickSoundOverride;
    public AudioSource clickAudioSource;
    [Range(0f, 1f)] public float clickSoundVolume = 1f;

    [Header("Enemy Dead")]
    public string deadAnimationStateName = "metarig|Fall";

    [Header("Arrow Prefab")]
    public GameObject arrowPrefab;
    public GameObject[] arrowPrefabs;
    public Transform spawnedArrowParent;
    public bool overrideArrowScale = false;
    public Vector3 arrowScale = Vector3.one;
    public bool disableArrowPhysics = true;
    public bool disableArrowColliders = true;
    public bool disableArrowTrails = true;

    [Header("Surrounding Arrows")]
    public int surroundingArrowCount = 24;
    public Vector2 surroundingRadiusRange = new Vector2(2.2f, 5f);
    public Vector2 surroundingHeightRange = new Vector2(0.35f, 3.2f);
    [FormerlySerializedAs("arrowRotationOffset")] public Vector3 surroundingArrowRotationOffset;
    public float surroundingAngleJitter = 10f;

    [Header("Attached Arrows")]
    public int attachedArrowCount = 6;
    public bool parentAttachedArrowsToEnemy = true;
    public Vector2 attachedRadiusRange = new Vector2(0.15f, 0.55f);
    public Vector2 attachedHeightRange = new Vector2(0.35f, 1.65f);
    public Vector3 attachedArrowRotationOffset;
    public float attachedPivotBackOffset = 0.35f;
    public float attachedAngleJitter = 18f;

    private readonly List<GameObject> spawnedArrows = new List<GameObject>();
    private bool hasStarted;
    private bool hasSpawnedKillState;
    private bool playerControllerWasEnabled;
    private bool refreshArrowsRequested;

    void Start()
    {
        PrepareScene();

        if (playOnStart)
        {
            StartSequence();
        }
    }

    void Update()
    {
        if (refreshArrowsRequested)
        {
            refreshArrowsRequested = false;
            RefreshSpawnedArrows();
        }

        if (playOnStart || hasStarted)
        {
            return;
        }

        if (IsPrimaryInputStarted())
        {
            StartSequence();
        }
    }

    public void RefreshSpawnedArrows()
    {
        if (!hasSpawnedKillState)
        {
            return;
        }

        ClearSpawnedArrows();

        for (int i = 0; i < enemies.Length; i++)
        {
            EnemySlot slot = enemies[i];
            if (slot == null || slot.enemy == null)
            {
                continue;
            }

            if (slot.enemy.animator != null)
            {
                slot.enemy.animator.Update(0f);
            }

            SpawnSurroundingArrows(slot);
            SpawnAttachedArrows(slot);
        }
    }

    public void ClearSpawnedArrows()
    {
        for (int i = spawnedArrows.Count - 1; i >= 0; i--)
        {
            GameObject arrow = spawnedArrows[i];
            if (arrow == null)
            {
                continue;
            }

            if (Application.isPlaying)
            {
                Destroy(arrow);
            }
            else
            {
                DestroyImmediate(arrow);
            }
        }

        spawnedArrows.Clear();
    }

    public void StartSequence()
    {
        if (hasStarted)
        {
            return;
        }

        PlayClickSound();
        StartCoroutine(PlaySequence());
    }

    public void PrepareScene()
    {
        ResolveCamera();
        ResolvePlayerController();
        ApplyCameraStart();
        PrepareFade();
        ApplyEnemyStartPositions();
        SetEnemiesLocked(lockEnemiesBeforeClick);
    }

    IEnumerator PlaySequence()
    {
        hasStarted = true;
        hasSpawnedKillState = false;
        playerControllerWasEnabled = playerController != null && playerController.enabled;

        if (disablePlayerControllerDuringSequence && playerController != null)
        {
            playerController.enabled = false;
        }

        if (fadeGraphic == null)
        {
            SpawnKillState();
            RestorePlayerControllerState();
            yield break;
        }

        fadeGraphic.gameObject.SetActive(true);
        SetFadeAlpha(0f);

        float safeFadeOutDuration = Mathf.Max(0f, fadeOutDuration);
        if (safeFadeOutDuration <= 0f)
        {
            SetFadeAlpha(fadeTargetAlpha);
            SpawnKillState();
        }
        else
        {
            float elapsed = 0f;
            while (elapsed < safeFadeOutDuration)
            {
                elapsed += Time.unscaledDeltaTime;
                float progress = Mathf.Clamp01(elapsed / safeFadeOutDuration);
                SetFadeAlpha(Mathf.Lerp(0f, fadeTargetAlpha, progress));

                if (!hasSpawnedKillState && progress >= spawnAtFadeProgress)
                {
                    SpawnKillState();
                }

                yield return null;
            }

            SetFadeAlpha(fadeTargetAlpha);
            if (!hasSpawnedKillState)
            {
                SpawnKillState();
            }
        }

        if (fadeHoldDuration > 0f)
        {
            yield return new WaitForSecondsRealtime(fadeHoldDuration);
        }

        if (fadeBackInAfterSpawn)
        {
            yield return FadeTo(0f, fadeInDuration);
            fadeGraphic.gameObject.SetActive(false);
        }

        RestorePlayerControllerState();
    }

    IEnumerator FadeTo(float targetAlpha, float duration)
    {
        if (fadeGraphic == null)
        {
            yield break;
        }

        float startAlpha = fadeGraphic.color.a;
        float safeDuration = Mathf.Max(0f, duration);
        if (safeDuration <= 0f)
        {
            SetFadeAlpha(targetAlpha);
            yield break;
        }

        float elapsed = 0f;
        while (elapsed < safeDuration)
        {
            elapsed += Time.unscaledDeltaTime;
            float progress = Mathf.Clamp01(elapsed / safeDuration);
            SetFadeAlpha(Mathf.Lerp(startAlpha, targetAlpha, progress));
            yield return null;
        }

        SetFadeAlpha(targetAlpha);
    }

    void SpawnKillState()
    {
        if (hasSpawnedKillState)
        {
            return;
        }

        hasSpawnedKillState = true;

        for (int i = 0; i < enemies.Length; i++)
        {
            EnemySlot slot = enemies[i];
            if (slot == null || slot.enemy == null)
            {
                continue;
            }

            slot.enemy.ForceDeadVisual(deadAnimationStateName);
            if (slot.enemy.animator != null)
            {
                slot.enemy.animator.Update(0f);
            }

            SpawnSurroundingArrows(slot);
            SpawnAttachedArrows(slot);
        }
    }

    void SpawnSurroundingArrows(EnemySlot slot)
    {
        int count = slot.surroundingArrowCount >= 0 ? slot.surroundingArrowCount : surroundingArrowCount;
        if (count <= 0 || !HasArrowPrefab())
        {
            return;
        }

        Vector3 enemyBasePosition = GetEnemyRootPosition(slot);
        Vector3 targetPoint = GetArrowTargetPoint(slot);

        for (int i = 0; i < count; i++)
        {
            float baseAngle = (360f / count) * i;
            float angle = baseAngle + Random.Range(-surroundingAngleJitter, surroundingAngleJitter);
            Vector3 horizontalDirection = Quaternion.Euler(0f, angle, 0f) * Vector3.forward;
            float radius = Random.Range(surroundingRadiusRange.x, surroundingRadiusRange.y);
            float height = Random.Range(surroundingHeightRange.x, surroundingHeightRange.y);
            Vector3 spawnPosition = enemyBasePosition + horizontalDirection * radius + Vector3.up * height;
            Vector3 arrowDirection = targetPoint - spawnPosition;

            SpawnArrow(spawnPosition, arrowDirection, surroundingArrowRotationOffset, spawnedArrowParent);
        }
    }

    void SpawnAttachedArrows(EnemySlot slot)
    {
        int count = slot.attachedArrowCount >= 0 ? slot.attachedArrowCount : attachedArrowCount;
        if (count <= 0 || !HasArrowPrefab())
        {
            return;
        }

        Vector3 enemyBasePosition = GetEnemyRootPosition(slot);
        Transform parent = parentAttachedArrowsToEnemy ? GetEnemyRootTransform(slot) : spawnedArrowParent;

        for (int i = 0; i < count; i++)
        {
            float baseAngle = (360f / count) * i;
            float angle = baseAngle + Random.Range(-attachedAngleJitter, attachedAngleJitter);
            Vector3 outwardDirection = Quaternion.Euler(0f, angle, 0f) * Vector3.forward;
            float radius = Random.Range(attachedRadiusRange.x, attachedRadiusRange.y);
            float height = Random.Range(attachedHeightRange.x, attachedHeightRange.y);
            Vector3 hitPoint = enemyBasePosition + outwardDirection * radius + Vector3.up * height;
            Vector3 arrowDirection = (GetArrowTargetPoint(slot) - hitPoint).normalized;

            if (arrowDirection.sqrMagnitude <= 0.001f)
            {
                arrowDirection = -outwardDirection;
            }

            Vector3 spawnPosition = hitPoint - arrowDirection * attachedPivotBackOffset;
            SpawnArrow(spawnPosition, arrowDirection, attachedArrowRotationOffset, parent);
        }
    }

    GameObject SpawnArrow(Vector3 position, Vector3 direction, Vector3 rotationOffset, Transform parent)
    {
        GameObject prefab = GetRandomArrowPrefab();
        if (prefab == null)
        {
            return null;
        }

        if (direction.sqrMagnitude <= 0.001f)
        {
            direction = transform.forward;
        }

        Quaternion rotation = Quaternion.LookRotation(direction.normalized) * Quaternion.Euler(rotationOffset);
        GameObject arrow = Instantiate(prefab, position, rotation);
        if (parent != null)
        {
            arrow.transform.SetParent(parent, true);
        }

        if (overrideArrowScale)
        {
            arrow.transform.localScale = arrowScale;
        }

        ConfigureSpawnedArrow(arrow);
        spawnedArrows.Add(arrow);
        return arrow;
    }

    bool HasArrowPrefab()
    {
        if (arrowPrefabs != null)
        {
            for (int i = 0; i < arrowPrefabs.Length; i++)
            {
                if (arrowPrefabs[i] != null)
                {
                    return true;
                }
            }
        }

        return arrowPrefab != null;
    }

    GameObject GetRandomArrowPrefab()
    {
        if (arrowPrefabs != null && arrowPrefabs.Length > 0)
        {
            int validCount = 0;
            for (int i = 0; i < arrowPrefabs.Length; i++)
            {
                if (arrowPrefabs[i] != null)
                {
                    validCount++;
                }
            }

            if (validCount > 0)
            {
                int randomIndex = Random.Range(0, validCount);
                for (int i = 0; i < arrowPrefabs.Length; i++)
                {
                    if (arrowPrefabs[i] == null)
                    {
                        continue;
                    }

                    if (randomIndex == 0)
                    {
                        return arrowPrefabs[i];
                    }

                    randomIndex--;
                }
            }
        }

        return arrowPrefab;
    }

    void ConfigureSpawnedArrow(GameObject arrow)
    {
        if (arrow == null)
        {
            return;
        }

        if (disableArrowPhysics)
        {
            ProjectileController[] projectiles = arrow.GetComponentsInChildren<ProjectileController>(true);
            for (int i = 0; i < projectiles.Length; i++)
            {
                projectiles[i].enabled = false;
            }

            Rigidbody[] rigidbodies = arrow.GetComponentsInChildren<Rigidbody>(true);
            for (int i = 0; i < rigidbodies.Length; i++)
            {
                rigidbodies[i].isKinematic = true;
                rigidbodies[i].useGravity = false;
            }
        }

        if (disableArrowColliders)
        {
            Collider[] colliders = arrow.GetComponentsInChildren<Collider>(true);
            for (int i = 0; i < colliders.Length; i++)
            {
                colliders[i].enabled = false;
            }
        }

        if (disableArrowTrails)
        {
            TrailRenderer[] trails = arrow.GetComponentsInChildren<TrailRenderer>(true);
            for (int i = 0; i < trails.Length; i++)
            {
                trails[i].emitting = false;
                trails[i].Clear();
            }
        }
    }

    Vector3 GetArrowTargetPoint(EnemySlot slot)
    {
        if (slot.arrowTargetPoint != null)
        {
            return slot.arrowTargetPoint.position;
        }

        return GetEnemyRootPosition(slot) + slot.arrowTargetOffset;
    }

    Transform GetEnemyRootTransform(EnemySlot slot)
    {
        if (slot.enemyRootPoint != null)
        {
            return slot.enemyRootPoint;
        }

        return slot.enemy.transform;
    }

    Vector3 GetEnemyRootPosition(EnemySlot slot)
    {
        Transform rootTransform = GetEnemyRootTransform(slot);
        return rootTransform != null ? rootTransform.position : slot.enemy.transform.position;
    }

    void ResolveCamera()
    {
        if (gameplayCamera == null)
        {
            gameplayCamera = Camera.main;
        }
    }

    void ResolvePlayerController()
    {
        if (playerController != null)
        {
            return;
        }

        GameObject playerObject = GameObject.FindGameObjectWithTag("Player");
        if (playerObject != null)
        {
            playerController = playerObject.GetComponent<PlayerController>();
        }
    }

    void ApplyCameraStart()
    {
        if (!applyCameraStartPoint || gameplayCamera == null || cameraStartPoint == null)
        {
            return;
        }

        gameplayCamera.transform.SetPositionAndRotation(cameraStartPoint.position, cameraStartPoint.rotation);
    }

    void ApplyEnemyStartPositions()
    {
        for (int i = 0; i < enemies.Length; i++)
        {
            EnemySlot slot = enemies[i];
            if (slot == null || slot.enemy == null || slot.startPoint == null || !slot.applyStartPoint)
            {
                continue;
            }

            slot.enemy.transform.SetPositionAndRotation(slot.startPoint.position, slot.startPoint.rotation);
        }
    }

    void SetEnemiesLocked(bool locked)
    {
        for (int i = 0; i < enemies.Length; i++)
        {
            EnemySlot slot = enemies[i];
            if (slot == null || slot.enemy == null)
            {
                continue;
            }

            slot.enemy.SetCinematicLocked(locked);
        }
    }

    void PrepareFade()
    {
        if (fadeGraphic == null)
        {
            fadeGraphic = CreateRuntimeFadeGraphic();
        }

        if (fadeGraphic == null)
        {
            return;
        }

        SetFadeAlpha(0f);
        fadeGraphic.gameObject.SetActive(false);
    }

    Graphic CreateRuntimeFadeGraphic()
    {
        GameObject canvasObject = new GameObject("ArrowAmbushFadeCanvas");
        Canvas canvas = canvasObject.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvas.sortingOrder = short.MaxValue;
        canvasObject.AddComponent<CanvasScaler>();

        GameObject imageObject = new GameObject("Fade");
        imageObject.transform.SetParent(canvasObject.transform, false);

        RectTransform rectTransform = imageObject.AddComponent<RectTransform>();
        rectTransform.anchorMin = Vector2.zero;
        rectTransform.anchorMax = Vector2.one;
        rectTransform.offsetMin = Vector2.zero;
        rectTransform.offsetMax = Vector2.zero;

        Image image = imageObject.AddComponent<Image>();
        image.raycastTarget = false;
        return image;
    }

    void SetFadeAlpha(float alpha)
    {
        if (fadeGraphic == null)
        {
            return;
        }

        Color color = fadeColor;
        color.a = Mathf.Clamp01(alpha);
        fadeGraphic.color = color;
    }

    void RestorePlayerControllerState()
    {
        if (!disablePlayerControllerDuringSequence || !reenablePlayerControllerAfterSequence || playerController == null)
        {
            return;
        }

        playerController.enabled = playerControllerWasEnabled;
    }

    void PlayClickSound()
    {
        if (!playClickSound)
        {
            return;
        }

        if (clickSoundOverride != null)
        {
            PlayOneShot(clickSoundOverride, clickSoundVolume);
            return;
        }

        if (useFireSoundWhenNoOverride && AudioManager.ins != null)
        {
            if (AudioManager.ins.sound != null)
            {
                AudioManager.ins.PlaySoundFire();
            }
            else
            {
                PlayOneShot(AudioManager.ins.fireSound, clickSoundVolume);
            }
        }
    }

    void PlayOneShot(AudioClip clip, float volume)
    {
        if (clip == null)
        {
            return;
        }

        float safeVolume = Mathf.Clamp01(volume);
        if (clickAudioSource != null)
        {
            clickAudioSource.PlayOneShot(clip, safeVolume);
            return;
        }

        if (AudioManager.ins != null && AudioManager.ins.sound != null)
        {
            AudioManager.ins.sound.PlayOneShot(clip, safeVolume);
            return;
        }

        Vector3 soundPosition = gameplayCamera != null ? gameplayCamera.transform.position : transform.position;
        AudioSource.PlayClipAtPoint(clip, soundPosition, safeVolume);
    }

    bool IsPrimaryInputStarted()
    {
        if (Input.touchCount > 0)
        {
            return Input.GetTouch(0).phase == TouchPhase.Began;
        }

        return Input.GetMouseButtonDown(0);
    }

    void OnValidate()
    {
        surroundingRadiusRange.x = Mathf.Max(0f, surroundingRadiusRange.x);
        surroundingRadiusRange.y = Mathf.Max(surroundingRadiusRange.x, surroundingRadiusRange.y);
        surroundingHeightRange.y = Mathf.Max(surroundingHeightRange.x, surroundingHeightRange.y);
        attachedRadiusRange.x = Mathf.Max(0f, attachedRadiusRange.x);
        attachedRadiusRange.y = Mathf.Max(attachedRadiusRange.x, attachedRadiusRange.y);
        attachedHeightRange.y = Mathf.Max(attachedHeightRange.x, attachedHeightRange.y);
        attachedPivotBackOffset = Mathf.Max(0f, attachedPivotBackOffset);
        fadeOutDuration = Mathf.Max(0f, fadeOutDuration);
        fadeHoldDuration = Mathf.Max(0f, fadeHoldDuration);
        fadeInDuration = Mathf.Max(0f, fadeInDuration);

        if (Application.isPlaying && hasSpawnedKillState)
        {
            refreshArrowsRequested = true;
        }
    }
}
