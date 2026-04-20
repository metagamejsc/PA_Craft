using System;
using UnityEngine;

[DisallowMultipleComponent]
public class PlayableGameController : MonoBehaviour
{
    public static PlayableGameController Instance { get; private set; }

    [Header("Scene")]
    [SerializeField] private Camera gameplayCamera;
    [SerializeField] private LayerMask draggableLayerMask = ~0;
    [SerializeField] private float centerRayDistance = 1000f;

    [Header("Camera Drag")]
    [SerializeField] private Transform cameraRotatePivot;
    [SerializeField] private float cameraRotateSensitivity = 0.15f;
    [SerializeField] private float minCameraPitch = -35f;
    [SerializeField] private float maxCameraPitch = 60f;

    [Header("Magnetic Gun Effect")]
    [SerializeField] private Transform gunTip;
    [SerializeField] private LineRenderer magneticLine;
    [SerializeField] private Vector3 enemyLineOffset = new Vector3(0f, 0.6f, 0f);
    [SerializeField] private int magneticLinePoints = 12;
    [SerializeField] private float magneticLineWaveAmplitude = 0.18f;
    [SerializeField] private float magneticLineWaveFrequency = 16f;
    [SerializeField] private float magneticLineWaveSpeed = 18f;

    [Header("Shared Sound")]
    [SerializeField] private AudioSource sharedAudioSource;
    [SerializeField] private AudioClip gunDragStartSound;
    [SerializeField] private AudioClip gunDragLoopSound;
    [SerializeField] private AudioClip holeDropSound;
    [SerializeField] private AudioClip highFallLandingSound;
    [SerializeField] private float sharedSoundVolume = 1f;

    [Header("Progress")]
    [SerializeField] private int totalEnemyCount = 4;
    [SerializeField] private int currentPlacedCount;
    [SerializeField] private bool isWin;

    public event Action<DraggableEnemy> EnemyPlaced;

    private DraggableEnemy activeEnemy;
    private Vector2 lastPointerPosition;
    private bool isPointerActive;
    private Vector3[] magneticLinePositions;

    public int TotalEnemyCount
    {
        get { return totalEnemyCount; }
    }

    public int CurrentPlacedCount
    {
        get { return currentPlacedCount; }
    }

    public bool IsWin
    {
        get { return isWin; }
    }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;

        if (gameplayCamera == null)
        {
            gameplayCamera = Camera.main;
        }

        if (totalEnemyCount <= 0)
        {
            totalEnemyCount = FindObjectsOfType<DraggableEnemy>().Length;
        }

        SetupMagneticLine();
        SetupSharedAudio();
    }

    private void Update()
    {
        if (isWin)
        {
            SetMagneticLineVisible(false);
            //return;
        }

        Vector2 pointerPosition;

        if (TryGetPointerDown(out pointerPosition))
        {
            isPointerActive = true;
            lastPointerPosition = pointerPosition;
            TryBeginCenterDrag();
            return;
        }

        if (isPointerActive && TryGetPointerHeld(out pointerPosition))
        {
            Vector2 pointerDelta = pointerPosition - lastPointerPosition;
            lastPointerPosition = pointerPosition;

            RotateCamera(pointerDelta);

            if (activeEnemy == null)
            {
                TryBeginCenterDrag();
            }

            if (activeEnemy != null)
            {
                activeEnemy.UpdateDrag(GetCenterScreenPosition());
            }
        }

        if (isPointerActive && TryGetPointerUp(out pointerPosition))
        {
            isPointerActive = false;
            StopGunDragLoop();

            if (activeEnemy != null)
            {
                activeEnemy.EndDrag();
                activeEnemy = null;
            }
        }

        UpdateMagneticLine();
    }

    public Camera GetGameplayCamera()
    {
        return gameplayCamera != null ? gameplayCamera : Camera.main;
    }

    public void NotifyEnemyPlaced(DraggableEnemy enemy)
    {
        currentPlacedCount++;

        if (activeEnemy == enemy)
        {
            activeEnemy = null;
            SetMagneticLineVisible(false);
            StopGunDragLoop();
        }

        if (EnemyPlaced != null)
        {
            EnemyPlaced(enemy);
        }

        if (!isWin && currentPlacedCount >= totalEnemyCount)
        {
            HandleWin();
        }
    }

    private void TryBeginCenterDrag()
    {
        if (activeEnemy != null)
        {
            return;
        }

        Camera targetCamera = GetGameplayCamera();
        if (targetCamera == null)
        {
            return;
        }

        Vector2 centerScreenPosition = GetCenterScreenPosition();
        Ray ray = targetCamera.ScreenPointToRay(centerScreenPosition);
        RaycastHit hit;
        if (!Physics.Raycast(ray, out hit, centerRayDistance, draggableLayerMask, QueryTriggerInteraction.Ignore))
        {
            return;
        }

        DraggableEnemy enemy = hit.collider.GetComponent<DraggableEnemy>();
        if (enemy == null)
        {
            enemy = hit.collider.GetComponentInParent<DraggableEnemy>();
        }

        if (enemy == null || !enemy.CanBeginDrag())
        {
            return;
        }

        activeEnemy = enemy;
        activeEnemy.BeginDrag(centerScreenPosition);
        PlayOneShot(gunDragStartSound);
        PlayGunDragLoop();
        SetMagneticLineVisible(true);
        UpdateMagneticLine();
    }

    public void PlayHoleDropSound()
    {
        PlayOneShot(holeDropSound);
    }

    public void PlayHighFallLandingSound()
    {
        PlayOneShot(highFallLandingSound);
    }

    private void SetupSharedAudio()
    {
        if (sharedAudioSource == null)
        {
            sharedAudioSource = GetComponent<AudioSource>();
            if (sharedAudioSource == null)
            {
                sharedAudioSource = gameObject.AddComponent<AudioSource>();
            }
        }

        sharedAudioSource.playOnAwake = false;
    }

    private void PlayOneShot(AudioClip clip)
    {
        if (clip == null || sharedAudioSource == null)
        {
            return;
        }

        sharedAudioSource.PlayOneShot(clip, sharedSoundVolume);
    }

    private void PlayGunDragLoop()
    {
        if (gunDragLoopSound == null || sharedAudioSource == null)
        {
            return;
        }

        sharedAudioSource.clip = gunDragLoopSound;
        sharedAudioSource.loop = true;
        sharedAudioSource.volume = sharedSoundVolume;
        sharedAudioSource.Play();
    }

    private void StopGunDragLoop()
    {
        if (sharedAudioSource == null || sharedAudioSource.clip != gunDragLoopSound)
        {
            return;
        }

        sharedAudioSource.Stop();
        sharedAudioSource.loop = false;
        sharedAudioSource.clip = null;
    }

    private void SetupMagneticLine()
    {
        if (magneticLine == null)
        {
            return;
        }

        magneticLinePoints = Mathf.Max(2, magneticLinePoints);
        magneticLinePositions = new Vector3[magneticLinePoints];
        magneticLine.positionCount = magneticLinePoints;
        magneticLine.useWorldSpace = true;
        SetMagneticLineVisible(false);
    }

    private void UpdateMagneticLine()
    {
        if (magneticLine == null)
        {
            return;
        }

        if (activeEnemy == null || gunTip == null)
        {
            SetMagneticLineVisible(false);
            return;
        }

        if (magneticLinePositions == null || magneticLinePositions.Length != magneticLinePoints)
        {
            magneticLinePoints = Mathf.Max(2, magneticLinePoints);
            magneticLinePositions = new Vector3[magneticLinePoints];
            magneticLine.positionCount = magneticLinePoints;
        }

        Vector3 start = gunTip.position;
        Vector3 end = activeEnemy.transform.position + enemyLineOffset;
        Vector3 direction = end - start;
        Vector3 directionNormalized = direction.sqrMagnitude > 0.0001f ? direction.normalized : Vector3.forward;
        Vector3 side = Vector3.Cross(directionNormalized, Vector3.up);

        if (side.sqrMagnitude < 0.0001f)
        {
            side = Vector3.Cross(directionNormalized, Vector3.right);
        }

        side.Normalize();
        Vector3 up = Vector3.Cross(side, directionNormalized).normalized;
        float time = Time.time * magneticLineWaveSpeed;

        for (int i = 0; i < magneticLinePoints; i++)
        {
            float t = i / (float)(magneticLinePoints - 1);
            Vector3 point = Vector3.Lerp(start, end, t);

            if (i > 0 && i < magneticLinePoints - 1)
            {
                float edgeFade = Mathf.Sin(t * Mathf.PI);
                float waveA = Mathf.Sin((t * magneticLineWaveFrequency) + time);
                float waveB = Mathf.Cos((t * magneticLineWaveFrequency * 0.73f) + (time * 1.37f));
                Vector3 offset = ((side * waveA) + (up * waveB)) * magneticLineWaveAmplitude * edgeFade;
                point += offset;
            }

            magneticLinePositions[i] = point;
        }

        magneticLine.SetPositions(magneticLinePositions);
        SetMagneticLineVisible(true);
    }

    private void SetMagneticLineVisible(bool isVisible)
    {
        if (magneticLine != null && magneticLine.enabled != isVisible)
        {
            magneticLine.enabled = isVisible;
        }
    }

    private Vector2 GetCenterScreenPosition()
    {
        Camera targetCamera = GetGameplayCamera();
        if (targetCamera != null)
        {
            return new Vector2(targetCamera.pixelWidth * 0.5f, targetCamera.pixelHeight * 0.5f);
        }

        return new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
    }

    private void RotateCamera(Vector2 pointerDelta)
    {
        if (pointerDelta.sqrMagnitude <= 0.001f)
        {
            return;
        }

        Camera targetCamera = GetGameplayCamera();
        if (targetCamera == null)
        {
            return;
        }

        float yawDelta = pointerDelta.x * cameraRotateSensitivity;
        float pitchDelta = -pointerDelta.y * cameraRotateSensitivity;

        Transform pitchTransform = targetCamera.transform;
        if (cameraRotatePivot != null)
        {
            cameraRotatePivot.Rotate(Vector3.up, yawDelta, Space.World);
        }
        else
        {
            Vector3 cameraEuler = pitchTransform.eulerAngles;
            cameraEuler.y += yawDelta;
            pitchTransform.eulerAngles = cameraEuler;
        }

        Vector3 localEuler = pitchTransform.localEulerAngles;
        float pitch = NormalizeAngle(localEuler.x) + pitchDelta;
        pitch = Mathf.Clamp(pitch, minCameraPitch, maxCameraPitch);
        localEuler.x = pitch;
        localEuler.z = 0f;
        pitchTransform.localEulerAngles = localEuler;
    }

    private static float NormalizeAngle(float angle)
    {
        if (angle > 180f)
        {
            angle -= 360f;
        }

        return angle;
    }

    private void HandleWin()
    {
        isWin = true;
        LunaManager.ins.ShowEndCard();
        Debug.Log("WIN");
        OnWin();
    }

    private void OnWin()
    {
        // Hook CTA / EndCard here when integrating the playable flow.
    }

    private static bool TryGetPointerDown(out Vector2 position)
    {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Began)
            {
                position = touch.position;
                return true;
            }
        }

        if (Input.GetMouseButtonDown(0))
        {
            position = Input.mousePosition;
            return true;
        }

        position = default;
        return false;
    }

    private static bool TryGetPointerHeld(out Vector2 position)
    {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Moved || touch.phase == TouchPhase.Stationary)
            {
                position = touch.position;
                return true;
            }
        }

        if (Input.GetMouseButton(0))
        {
            position = Input.mousePosition;
            return true;
        }

        position = default;
        return false;
    }

    private static bool TryGetPointerUp(out Vector2 position)
    {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                position = touch.position;
                return true;
            }
        }

        if (Input.GetMouseButtonUp(0))
        {
            position = Input.mousePosition;
            return true;
        }

        position = default;
        return false;
    }
}
