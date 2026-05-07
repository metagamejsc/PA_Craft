using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
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

    [Header("Bow Shot")]
    public Animator bowAnimator;
    public Transform bowArrowSpawnPoint;
    public GameObject[] bowStateObjects = new GameObject[4];
    public bool useBowStateObjects = true;
    public float bowStateFrameDuration = 0.12f;
    public bool resetBowStateAfterSequence = true;
    public string bowFireBool = "isFire";
    public string bowAttackTrigger = "Attack";
    public float arrowReleaseDelay = 0f;
    public float bowFireStateDuration = 0.45f;
    public bool spawnBowArrowVisual = true;
    public int bowArrowTargetEnemyIndex = 0;
    public float bowArrowFlightDuration = 0.22f;
    public Vector3 bowArrowRotationOffset;

    [Header("Fade")]
    public bool useFadeTransition = false;
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
    public bool repeatClickSoundDuringArrows = true;
    public float clickSoundRepeatInterval = 0f;

    [Header("Bow Draw Sound")]
    public bool playDrawSoundOnBowFrame = true;
    public AudioClip bowDrawSound;
    public AudioSource bowDrawAudioSource;
    [Range(0f, 1f)] public float bowDrawSoundVolume = 1f;

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

    [Header("Incoming Arrow Motion")]
    public bool animateArrowsFromDistance = true;
    public float incomingArrowDistance = 18f;
    public Vector2 incomingArrowSpread = new Vector2(2f, 4f);
    public float incomingArrowFlightDuration = 0.35f;
    public float incomingArrowStagger = 0.015f;
    public Ease incomingArrowEase = Ease.InCubic;

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
    private float lastSpawnedArrowFlightTime;
    private Coroutine arrowSpawnSoundCoroutine;

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

        StartCoroutine(PlaySequence());
    }

    public void PrepareScene()
    {
        ResolveCamera();
        ResolvePlayerController();
        ResolveBowAnimator();
        ApplyCameraStart();
        SetBowStateObject(0);
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

        yield return PlayBowShotAnimation();
        StartArrowSpawnSoundLoop();
        yield return SpawnBowArrowVisual();

        if (arrowReleaseDelay > 0f)
        {
            yield return new WaitForSeconds(arrowReleaseDelay);
        }

        if (!useFadeTransition)
        {
            SpawnKillState();
            if (lastSpawnedArrowFlightTime > 0f)
            {
                yield return new WaitForSeconds(lastSpawnedArrowFlightTime);
            }

            StopArrowSpawnSoundLoop();
            ResetBowStateObjects();
            RestorePlayerControllerState();
            yield break;
        }

        if (fadeGraphic == null)
        {
            SpawnKillState();
            StopArrowSpawnSoundLoop();
            ResetBowStateObjects();
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

        StopArrowSpawnSoundLoop();
        ResetBowStateObjects();
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
        lastSpawnedArrowFlightTime = 0f;

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

            SpawnArrow(spawnPosition, arrowDirection, surroundingArrowRotationOffset, spawnedArrowParent, true);
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
            SpawnArrow(spawnPosition, arrowDirection, attachedArrowRotationOffset, parent, true);
        }
    }

    GameObject SpawnArrow(Vector3 position, Vector3 direction, Vector3 rotationOffset, Transform parent, bool animateFromDistance)
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
        if (animateFromDistance)
        {
            AnimateArrowFromDistance(arrow, position, direction);
        }

        spawnedArrows.Add(arrow);
        return arrow;
    }

    IEnumerator SpawnBowArrowVisual()
    {
        if (!spawnBowArrowVisual || !HasArrowPrefab())
        {
            yield break;
        }

        Vector3 spawnPosition = GetBowArrowSpawnPosition();
        Vector3 targetPosition = GetBowArrowTargetPosition();
        Vector3 direction = targetPosition - spawnPosition;
        if (direction.sqrMagnitude <= 0.001f)
        {
            direction = bowArrowSpawnPoint != null ? bowArrowSpawnPoint.forward : transform.forward;
            targetPosition = spawnPosition + direction.normalized;
        }

        GameObject arrow = SpawnArrow(spawnPosition, direction, bowArrowRotationOffset, spawnedArrowParent, false);
        if (arrow == null)
        {
            ResetBowStateObjects();
            yield break;
        }

        float duration = Mathf.Max(0.01f, bowArrowFlightDuration);
        arrow.transform
            .DOMove(targetPosition, duration)
            .SetEase(Ease.Linear)
            .SetLink(arrow)
            .OnComplete(() =>
            {
                if (arrow != null)
                {
                    arrow.transform.position = targetPosition;
                    Destroy(arrow);
                    spawnedArrows.Remove(arrow);
                }
            });

        yield return new WaitForSeconds(duration);
        ResetBowStateObjects();
    }

    void AnimateArrowFromDistance(GameObject arrow, Vector3 targetPosition, Vector3 direction)
    {
        if (!Application.isPlaying || !hasStarted || !animateArrowsFromDistance || arrow == null)
        {
            return;
        }

        Vector3 safeDirection = direction.sqrMagnitude > 0.001f ? direction.normalized : transform.forward;
        Vector3 right = Vector3.Cross(Vector3.up, safeDirection);
        if (right.sqrMagnitude <= 0.001f)
        {
            right = transform.right;
        }

        right.Normalize();
        Vector3 up = Vector3.Cross(safeDirection, right).normalized;
        Vector3 spreadOffset =
            right * Random.Range(-incomingArrowSpread.x, incomingArrowSpread.x) +
            up * Random.Range(-incomingArrowSpread.y, incomingArrowSpread.y);
        Vector3 startPosition = targetPosition - safeDirection * incomingArrowDistance + spreadOffset;
        float delay = incomingArrowStagger > 0f ? spawnedArrows.Count * incomingArrowStagger : 0f;
        float duration = Mathf.Max(0.01f, incomingArrowFlightDuration);

        arrow.transform.position = startPosition;
        arrow.transform
            .DOMove(targetPosition, duration)
            .SetDelay(delay)
            .SetEase(incomingArrowEase)
            .SetLink(arrow)
            .OnComplete(() =>
            {
                if (arrow != null)
                {
                    arrow.transform.position = targetPosition;
                }
            });

        lastSpawnedArrowFlightTime = Mathf.Max(lastSpawnedArrowFlightTime, delay + duration);
    }

    Vector3 GetBowArrowSpawnPosition()
    {
        if (bowArrowSpawnPoint != null)
        {
            return bowArrowSpawnPoint.position;
        }

        if (playerController != null && playerController.projectileSpawnPoint != null)
        {
            return playerController.projectileSpawnPoint.position;
        }

        if (playerController != null)
        {
            return playerController.transform.position + Vector3.up * 1.2f + playerController.transform.forward * 0.6f;
        }

        return gameplayCamera != null ? gameplayCamera.transform.position : transform.position;
    }

    Vector3 GetBowArrowTargetPosition()
    {
        EnemySlot slot = GetBowArrowTargetSlot();
        if (slot != null && slot.enemy != null)
        {
            return GetArrowTargetPoint(slot);
        }

        return GetBowArrowSpawnPosition() + transform.forward * Mathf.Max(1f, incomingArrowDistance);
    }

    EnemySlot GetBowArrowTargetSlot()
    {
        if (enemies == null || enemies.Length <= 0)
        {
            return null;
        }

        int clampedIndex = Mathf.Clamp(bowArrowTargetEnemyIndex, 0, enemies.Length - 1);
        EnemySlot indexedSlot = enemies[clampedIndex];
        if (indexedSlot != null && indexedSlot.enemy != null)
        {
            return indexedSlot;
        }

        for (int i = 0; i < enemies.Length; i++)
        {
            EnemySlot slot = enemies[i];
            if (slot != null && slot.enemy != null)
            {
                return slot;
            }
        }

        return null;
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

    void ResolveBowAnimator()
    {
        if (bowAnimator != null)
        {
            return;
        }

        if (playerController != null)
        {
            bowAnimator = playerController.animator;
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
        if (!useFadeTransition)
        {
            if (fadeGraphic != null)
            {
                SetFadeAlpha(0f);
                fadeGraphic.gameObject.SetActive(false);
            }

            return;
        }

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

    void StartArrowSpawnSoundLoop()
    {
        if (!playClickSound)
        {
            return;
        }

        if (arrowSpawnSoundCoroutine != null)
        {
            StopCoroutine(arrowSpawnSoundCoroutine);
        }

        arrowSpawnSoundCoroutine = StartCoroutine(PlayArrowSpawnSoundLoop());
    }

    void StopArrowSpawnSoundLoop()
    {
        if (arrowSpawnSoundCoroutine == null)
        {
            return;
        }

        StopCoroutine(arrowSpawnSoundCoroutine);
        arrowSpawnSoundCoroutine = null;
    }

    IEnumerator PlayArrowSpawnSoundLoop()
    {
        PlayClickSound();

        if (!repeatClickSoundDuringArrows)
        {
            arrowSpawnSoundCoroutine = null;
            yield break;
        }

        while (true)
        {
            yield return new WaitForSeconds(GetClickSoundRepeatInterval());
            PlayClickSound();
        }
    }

    float GetClickSoundRepeatInterval()
    {
        if (clickSoundRepeatInterval > 0f)
        {
            return clickSoundRepeatInterval;
        }

        if (clickSoundOverride != null && clickSoundOverride.length > 0f)
        {
            return clickSoundOverride.length;
        }

        if (AudioManager.ins != null && AudioManager.ins.fireSound != null && AudioManager.ins.fireSound.length > 0f)
        {
            return AudioManager.ins.fireSound.length;
        }

        return 0.1f;
    }

    void PlayOneShot(AudioClip clip, float volume)
    {
        PlayOneShot(clip, volume, clickAudioSource);
    }

    void PlayOneShot(AudioClip clip, float volume, AudioSource audioSource)
    {
        if (clip == null)
        {
            return;
        }

        float safeVolume = Mathf.Clamp01(volume);
        if (audioSource != null)
        {
            audioSource.PlayOneShot(clip, safeVolume);
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

    IEnumerator PlayBowShotAnimation()
    {
        if (useBowStateObjects && HasBowStateObjects())
        {
            int stateCount = bowStateObjects.Length;
            float frameDuration = Mathf.Max(0.01f, bowStateFrameDuration);
            for (int i = 0; i < stateCount; i++)
            {
                if (bowStateObjects[i] == null)
                {
                    continue;
                }

                SetBowStateObject(i);
                PlayBowDrawFrameSound();
                yield return new WaitForSeconds(frameDuration);
            }

            yield break;
        }

        PlayAnimatorBowShotAnimation();

        if (bowFireStateDuration > 0f)
        {
            float frameDuration = Mathf.Max(0.01f, bowStateFrameDuration);
            float elapsed = 0f;
            while (elapsed < bowFireStateDuration)
            {
                PlayBowDrawFrameSound();
                yield return new WaitForSeconds(frameDuration);
                elapsed += frameDuration;
            }
        }

        SetBowFireState(false);
    }

    void PlayBowDrawFrameSound()
    {
        if (!playDrawSoundOnBowFrame)
        {
            return;
        }

        PlayOneShot(bowDrawSound, bowDrawSoundVolume, bowDrawAudioSource);
    }

    void PlayAnimatorBowShotAnimation()
    {
        ResolveBowAnimator();
        if (bowAnimator == null)
        {
            return;
        }

        if (!string.IsNullOrEmpty(bowFireBool) &&
            HasAnimatorParameter(bowAnimator, bowFireBool, AnimatorControllerParameterType.Bool))
        {
            SetBowFireState(true);
        }

        if (!string.IsNullOrEmpty(bowAttackTrigger) &&
            HasAnimatorParameter(bowAnimator, bowAttackTrigger, AnimatorControllerParameterType.Trigger))
        {
            bowAnimator.SetTrigger(bowAttackTrigger);
        }
    }

    bool HasBowStateObjects()
    {
        if (bowStateObjects == null || bowStateObjects.Length <= 0)
        {
            return false;
        }

        for (int i = 0; i < bowStateObjects.Length; i++)
        {
            if (bowStateObjects[i] != null)
            {
                return true;
            }
        }

        return false;
    }

    void SetBowStateObject(int activeIndex)
    {
        if (!useBowStateObjects || bowStateObjects == null)
        {
            return;
        }

        for (int i = 0; i < bowStateObjects.Length; i++)
        {
            if (bowStateObjects[i] != null)
            {
                bowStateObjects[i].SetActive(i == activeIndex);
            }
        }
    }

    void ResetBowStateObjects()
    {
        if (resetBowStateAfterSequence)
        {
            SetBowStateObject(0);
        }
    }

    void SetBowFireState(bool isFire)
    {
        if (bowAnimator != null &&
            !string.IsNullOrEmpty(bowFireBool) &&
            HasAnimatorParameter(bowAnimator, bowFireBool, AnimatorControllerParameterType.Bool))
        {
            bowAnimator.SetBool(bowFireBool, isFire);
        }
    }

    bool HasAnimatorParameter(Animator targetAnimator, string parameterName, AnimatorControllerParameterType parameterType)
    {
        if (targetAnimator == null || string.IsNullOrEmpty(parameterName))
        {
            return false;
        }

        int parameterHash = Animator.StringToHash(parameterName);
        AnimatorControllerParameter[] parameters = targetAnimator.parameters;
        for (int i = 0; i < parameters.Length; i++)
        {
            if (parameters[i].nameHash == parameterHash && parameters[i].type == parameterType)
            {
                return true;
            }
        }

        return false;
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
        clickSoundRepeatInterval = Mathf.Max(0f, clickSoundRepeatInterval);
        arrowReleaseDelay = Mathf.Max(0f, arrowReleaseDelay);
        bowStateFrameDuration = Mathf.Max(0.01f, bowStateFrameDuration);
        bowFireStateDuration = Mathf.Max(0f, bowFireStateDuration);
        bowArrowTargetEnemyIndex = Mathf.Max(0, bowArrowTargetEnemyIndex);
        bowArrowFlightDuration = Mathf.Max(0.01f, bowArrowFlightDuration);
        incomingArrowDistance = Mathf.Max(0f, incomingArrowDistance);
        incomingArrowSpread.x = Mathf.Max(0f, incomingArrowSpread.x);
        incomingArrowSpread.y = Mathf.Max(0f, incomingArrowSpread.y);
        incomingArrowFlightDuration = Mathf.Max(0.01f, incomingArrowFlightDuration);
        incomingArrowStagger = Mathf.Max(0f, incomingArrowStagger);

        if (Application.isPlaying && hasSpawnedKillState)
        {
            refreshArrowsRequested = true;
        }
    }
}
