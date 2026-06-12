using System.Collections.Generic;
using UnityEngine;

public class Dino : MonoBehaviour
{
    public enum DinoState
    {
        Wander,     // lang thang quanh vị trí ban đầu
        Following   // chạy theo player sau khi được cho ăn
    }

    [Header("Animation")]
    public Animator animator;
    [Tooltip("Float param điều khiển blend idle/move (0 = idle, >0 = move)")]
    public string speedParam = "Speed";
    public float animDampTime = 0.1f;

    [Header("Wander - đi quanh điểm spawn")]
    public float wanderRadius = 4f;        // bán kính lang thang quanh điểm ban đầu
    public float wanderSpeed = 1.5f;
    [Tooltip("Khoảng thời gian đứng idle (random min/max) giữa các lần đi")]
    public Vector2 idleWaitRange = new Vector2(1.5f, 3.5f);
    public float arriveDistance = 0.3f;

    [Header("Feed - cho ăn")]
    [Tooltip("Khoảng cách tối đa từ player tới dino để có thể cho ăn")]
    public float feedRange = 3f;
    [Tooltip("GameObject bên trong dino, bật lên ngay khi được cho ăn")]
    public GameObject objectToActivateOnFeed;
    public bool isFed = false;

    [Header("Follow - chạy theo player")]
    public float followSpeed = 4f;
    [Tooltip("Khoảng cách giữ phía sau player")]
    public float followDistance = 2.5f;
    public float followStopDistance = 0.4f;

    [Header("Rotation")]
    public float rotateSpeed = 10f;

    [Header("Audio")]
    [Tooltip("Tiếng bước chân lặp khi dino di chuyển (wander/follow)")]
    public AudioClip moveSound;
    [Tooltip("Danh sach tieng move cua dino. Moi lan bat dau di chuyen se random 1 clip.")]
    public List<AudioClip> soundMove = new List<AudioClip>();
    [Tooltip("Danh sach tieng roar cua dino.")]
    public List<AudioClip> soundRoar = new List<AudioClip>();
    [Tooltip("Khoang thoi gian random giua cac lan moi dino duoc phep roar.")]
    public Vector2 roarIntervalRange = new Vector2(8f, 16f);
    [Tooltip("Khoang cach toi thieu giua 2 tieng roar bat ky trong ca scene.")]
    public float minTimeBetweenAnyRoar = 4f;
    [Tooltip("Chi roar khi dino dang dung yen de tranh 8 dino keu lien tuc khi di chuyen.")]
    public bool roarOnlyWhenIdle = true;
    public float roarVolume = 1f;
    [Tooltip("Tiếng phát 1 lần khi được cho ăn")]
    public AudioClip feedSound;
    [Tooltip("AudioSource phát tiếng move (loop). Tự tạo nếu để trống.")]
    public AudioSource moveAudioSource;

    private static readonly List<Dino> ActiveDinos = new List<Dino>();
    private static float nextGlobalRoarTime;

    private DinoState state = DinoState.Wander;
    private Vector3 spawnPosition;
    private Vector3 wanderTarget;
    private float idleTimer;
    private bool isWaiting;
    private bool isMovingNow;
    private float nextRoarTime;
    private Transform player;

    void OnEnable()
    {
        if (!ActiveDinos.Contains(this))
            ActiveDinos.Add(this);
    }

    void OnDisable()
    {
        ActiveDinos.Remove(this);
    }

    void Start()
    {
        spawnPosition = transform.position;

        if (objectToActivateOnFeed != null)
            objectToActivateOnFeed.SetActive(false);

        SetupMoveAudio();
        ResetRoarTimer();
        ResolvePlayer();
        PickNewWanderTarget();
    }

    void SetupMoveAudio()
    {
        if (moveAudioSource == null)
        {
            moveAudioSource = gameObject.AddComponent<AudioSource>();
            moveAudioSource.playOnAwake = false;
            moveAudioSource.spatialBlend = 0f;
        }

        moveAudioSource.loop = true;
    }

    void Update()
    {
        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
            return;

        switch (state)
        {
            case DinoState.Wander:
                UpdateWander();
                break;
            case DinoState.Following:
                UpdateFollow();
                break;
        }

        UpdateRoarSound();
    }

    void UpdateWander()
    {
        if (isWaiting)
        {
            SetSpeed(0f);
            idleTimer -= Time.deltaTime;
            if (idleTimer <= 0f)
            {
                isWaiting = false;
                PickNewWanderTarget();
            }
            return;
        }

        Vector3 toTarget = wanderTarget - transform.position;
        toTarget.y = 0f;

        if (toTarget.sqrMagnitude <= arriveDistance * arriveDistance)
        {
            isWaiting = true;
            idleTimer = Random.Range(idleWaitRange.x, idleWaitRange.y);
            SetSpeed(0f);
            return;
        }

        RotateTowards(toTarget);
        transform.position += toTarget.normalized * wanderSpeed * Time.deltaTime;
        SetSpeed(wanderSpeed);
    }

    void PickNewWanderTarget()
    {
        Vector2 circle = Random.insideUnitCircle * wanderRadius;
        wanderTarget = spawnPosition + new Vector3(circle.x, 0f, circle.y);
    }

    void UpdateFollow()
    {
        if (player == null)
        {
            ResolvePlayer();
            if (player == null)
            {
                SetSpeed(0f);
                return;
            }
        }

        // Vị trí mục tiêu: ngay phía sau player
        Vector3 targetPosition = player.position - player.forward * followDistance;
        Vector3 toTarget = targetPosition - transform.position;
        toTarget.y = 0f;

        if (toTarget.sqrMagnitude <= followStopDistance * followStopDistance)
        {
            SetSpeed(0f);
            RotateTowards(player.position - transform.position); // đứng nhìn về player
            return;
        }

        RotateTowards(toTarget);
        transform.position += toTarget.normalized * followSpeed * Time.deltaTime;
        SetSpeed(followSpeed);
    }

    // Gọi khi player cho ăn thành công
    public void Feed()
    {
        if (isFed)
            return;

        isFed = true;

        if (objectToActivateOnFeed != null)
            objectToActivateOnFeed.SetActive(true);

        if (feedSound != null && AudioManager.ins != null)
            AudioManager.ins.PlaySound(feedSound);

        state = DinoState.Following;

        if (LunaManager.ins != null)
            LunaManager.ins.RegisterPlayerShot();
    }

    public bool CanBeFed => !isFed;

    public bool IsWithinFeedRange(Vector3 fromPosition)
    {
        Vector3 delta = transform.position - fromPosition;
        delta.y = 0f;
        return delta.sqrMagnitude <= feedRange * feedRange;
    }

    void RotateTowards(Vector3 direction)
    {
        direction.y = 0f;
        if (direction.sqrMagnitude <= 0.0001f)
            return;

        Quaternion target = Quaternion.LookRotation(direction.normalized);
        transform.rotation = Quaternion.Slerp(transform.rotation, target, rotateSpeed * Time.deltaTime);
    }

    void SetSpeed(float speed)
    {
        if (animator != null && !string.IsNullOrEmpty(speedParam))
            animator.SetFloat(speedParam, speed);

        isMovingNow = speed > 0.01f;
        UpdateMoveSound(isMovingNow);
    }

    void UpdateRoarSound()
    {
        if (moveAudioSource == null || Time.time < nextRoarTime)
            return;

        if (roarOnlyWhenIdle && isMovingNow)
            return;

        if (Time.time < nextGlobalRoarTime)
            return;

        AudioClip roarClip = GetRandomRoarSound();
        ResetRoarTimer();
        if (roarClip == null)
            return;

        moveAudioSource.PlayOneShot(roarClip, roarVolume);
        nextGlobalRoarTime = Time.time + minTimeBetweenAnyRoar;
    }

    void ResetRoarTimer()
    {
        float minInterval = Mathf.Max(0.1f, Mathf.Min(roarIntervalRange.x, roarIntervalRange.y));
        float maxInterval = Mathf.Max(minInterval, Mathf.Max(roarIntervalRange.x, roarIntervalRange.y));
        nextRoarTime = Time.time + Random.Range(minInterval, maxInterval);
    }

    void UpdateMoveSound(bool isMoving)
    {
        if (moveAudioSource == null)
            return;

        if (isMoving)
        {
            if (!moveAudioSource.isPlaying)
            {
                AudioClip selectedClip = GetRandomMoveSound();
                if (selectedClip == null)
                    return;

                moveAudioSource.clip = selectedClip;
                moveAudioSource.Play();
            }
        }
        else if (moveAudioSource.isPlaying)
        {
            moveAudioSource.Stop();
        }
    }

    AudioClip GetRandomMoveSound()
    {
        if (soundMove != null && soundMove.Count > 0)
        {
            int startIndex = Random.Range(0, soundMove.Count);
            for (int i = 0; i < soundMove.Count; i++)
            {
                AudioClip clip = soundMove[(startIndex + i) % soundMove.Count];
                if (clip != null)
                    return clip;
            }
        }

        return moveSound;
    }

    AudioClip GetRandomRoarSound()
    {
        if (soundRoar == null || soundRoar.Count == 0)
            return null;

        int startIndex = Random.Range(0, soundRoar.Count);
        for (int i = 0; i < soundRoar.Count; i++)
        {
            AudioClip clip = soundRoar[(startIndex + i) % soundRoar.Count];
            if (clip != null)
                return clip;
        }

        return null;
    }

    void ResolvePlayer()
    {
        GameObject playerObject = GameObject.FindGameObjectWithTag("Player");
        if (playerObject != null)
            player = playerObject.transform;
    }

    // Tìm dino mà player đang chỉ vào (raycast qua tâm màn hình) và còn trong tầm feed
    public static Dino GetFeedTarget(Camera cam, Vector3 playerPosition, LayerMask mask, float maxRayDistance = 100f)
    {
        if (cam == null)
            return null;

        Ray ray = cam.ScreenPointToRay(new Vector3(Screen.width * 0.5f, Screen.height * 0.5f, 0f));
        if (Physics.Raycast(ray, out RaycastHit hit, maxRayDistance, mask, QueryTriggerInteraction.Ignore))
        {
            Dino dino = hit.collider.GetComponentInParent<Dino>();
            if (dino != null && dino.CanBeFed && dino.IsWithinFeedRange(playerPosition))
                return dino;
        }

        return null;
    }

    void OnDrawGizmosSelected()
    {
        Vector3 center = Application.isPlaying ? spawnPosition : transform.position;
        Gizmos.color = Color.green;
        Gizmos.DrawWireSphere(center, wanderRadius);

        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, feedRange);
    }
}
