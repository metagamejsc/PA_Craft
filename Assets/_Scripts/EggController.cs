using DG.Tweening;
using UnityEngine;

public class EggController : MonoBehaviour
{
    [Header("Click")]
    [SerializeField] private int clicksToHatch = 5;

    [Header("References")]
    [SerializeField] private Transform eggModel;
    [SerializeField] private GameObject eggObjectToHide;
    [SerializeField] private GameObject dragon;
    [SerializeField] private GameObject hatchEffectPrefab;
    [SerializeField] private Transform hatchEffectSpawnPoint;
    [SerializeField] private ParticleSystem eggClickEffect;
    [SerializeField] private GameObject hatchUi;

    [Header("Audio")]
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AudioClip shellCrackSound;
    [SerializeField] private AudioClip dragonRoarSound;

    [Header("Dragon Click")]
    [SerializeField] private Camera targetCamera;
    [SerializeField] private float dragonClickFov = 35f;
    [SerializeField] private float dragonClickFovDuration = 0.5f;
    [SerializeField] private Ease dragonClickFovEase = Ease.OutSine;

    [Header("Egg Shake")]
    [SerializeField] private float shakeDuration = 0.25f;
    [SerializeField] private Vector3 shakeStrength = new Vector3(0f, 0f, 18f);
    [SerializeField] private int shakeVibrato = 14;

    [Header("Egg Idle")]
    [SerializeField] private bool playIdleShake = true;
    [SerializeField] private float idleShakeDuration = 1.2f;
    [SerializeField] private Vector3 idleShakeStrength = new Vector3(0f, 0f, 3f);
    [SerializeField] private int idleShakeVibrato = 6;
    [SerializeField] private float idleDelayAfterClick = 0.15f;

    private int clickCount;
    private bool hatched;
    private Tween shakeTween;
    private Tween idleTween;
    private Tween restartIdleTween;
    private Tween cameraFovTween;
    private Quaternion startEggRotation;

    private void Awake()
    {
        if (eggModel == null)
        {
            eggModel = transform;
        }

        if (audioSource == null)
        {
            audioSource = GetComponent<AudioSource>();
        }

        if (targetCamera == null)
        {
            targetCamera = Camera.main;
        }

        startEggRotation = eggModel.localRotation;

        if (eggObjectToHide == null)
        {
            eggObjectToHide = eggModel.gameObject;
        }

        if (dragon != null)
        {
            dragon.SetActive(false);
        }

        if (hatchUi != null)
        {
            hatchUi.SetActive(false);
        }

        RegisterDragonClick();
        StartIdleShake();
    }

    private void OnMouseDown()
    {
        ClickEgg();
    }

    public void ClickEgg()
    {
        if (hatched)
        {
            return;
        }

        clickCount++;
        PlaySound(shellCrackSound);
        PlayEggClickEffect();
        ShakeEgg();

        if (clickCount >= clicksToHatch)
        {
            Hatch();
        }
    }

    public void ClickDragon()
    {
        if (!hatched || dragon == null || !dragon.activeInHierarchy)
        {
            return;
        }

        if (targetCamera != null)
        {
            cameraFovTween?.Kill();
            cameraFovTween = targetCamera.DOFieldOfView(dragonClickFov, dragonClickFovDuration)
                .SetEase(dragonClickFovEase);
        }

        PlaySound(dragonRoarSound);
        LunaManager.ins.ShowEndCard();
    }

    private void ShakeEgg()
    {
        if (eggModel == null)
        {
            return;
        }

        idleTween?.Kill();
        restartIdleTween?.Kill();
        shakeTween?.Kill();
        eggModel.localRotation = startEggRotation;
        shakeTween = eggModel.DOShakeRotation(shakeDuration, shakeStrength, shakeVibrato)
            .OnComplete(() =>
            {
                eggModel.localRotation = startEggRotation;
                restartIdleTween = DOVirtual.DelayedCall(idleDelayAfterClick, StartIdleShake);
            });
    }

    private void StartIdleShake()
    {
        if (!playIdleShake || hatched || eggModel == null)
        {
            return;
        }

        idleTween?.Kill();
        eggModel.localRotation = startEggRotation;
        idleTween = eggModel.DOShakeRotation(idleShakeDuration, idleShakeStrength, idleShakeVibrato)
            .SetLoops(-1, LoopType.Restart)
            .SetEase(Ease.InOutSine);
    }

    private void Hatch()
    {
        hatched = true;
        idleTween?.Kill();
        restartIdleTween?.Kill();
        shakeTween?.Kill();

        Vector3 effectPosition = hatchEffectSpawnPoint != null ? hatchEffectSpawnPoint.position : transform.position;
        Quaternion effectRotation = hatchEffectSpawnPoint != null ? hatchEffectSpawnPoint.rotation : Quaternion.identity;

        if (hatchEffectPrefab != null)
        {
            hatchEffectPrefab.transform.SetPositionAndRotation(effectPosition, effectRotation);
            hatchEffectPrefab.SetActive(true);
        }

        if (eggObjectToHide != null)
        {
            eggObjectToHide.SetActive(false);
        }

        if (dragon != null)
        {
            dragon.SetActive(true);
        }

        if (hatchUi != null)
        {
            hatchUi.SetActive(true);
        }

        PlaySound(dragonRoarSound);
    }

    private void PlaySound(AudioClip clip)
    {
        if (clip == null)
        {
            return;
        }

        if (audioSource != null)
        {
            audioSource.PlayOneShot(clip);
            return;
        }

        AudioSource.PlayClipAtPoint(clip, transform.position);
    }

    private void PlayEggClickEffect()
    {
        if (eggClickEffect == null)
        {
            return;
        }

        eggClickEffect.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
        eggClickEffect.Play();
    }

    private void RegisterDragonClick()
    {
        if (dragon == null)
        {
            return;
        }

        Collider[] dragonColliders = dragon.GetComponentsInChildren<Collider>(true);
        if (dragonColliders.Length == 0)
        {
            DragonClickRelay rootRelay = dragon.GetComponent<DragonClickRelay>();
            if (rootRelay == null)
            {
                rootRelay = dragon.AddComponent<DragonClickRelay>();
            }

            rootRelay.Init(this);
            return;
        }

        foreach (Collider dragonCollider in dragonColliders)
        {
            DragonClickRelay relay = dragonCollider.GetComponent<DragonClickRelay>();
            if (relay == null)
            {
                relay = dragonCollider.gameObject.AddComponent<DragonClickRelay>();
            }

            relay.Init(this);
        }
    }

    private void OnDisable()
    {
        idleTween?.Kill();
        restartIdleTween?.Kill();
        shakeTween?.Kill();
        cameraFovTween?.Kill();
    }
}
