using System.Collections;
using UnityEngine;
using DG.Tweening;

public class TNTObject : MonoBehaviour
{
    public static event System.Action<TNTObject> OnTntExploded;

    public ParticleSystem explosionParticleSystem;
    public Renderer renderer;
    public LayerMask enemyLayerMask;
    public Rigidbody rigidbody;
    public float activeFallDelay = 1f;
    public float activeExplodeDelay = 2f;
    public Transform pressurePlate;
    public float pressurePlatePressDistance = 0.08f;
    public float pressurePlatePressDuration = 0.12f;
    public AudioClip pressurePlateSound;

    private bool hasHit = false;
    private bool isExploding = false;
    private bool isActivated = false;
    private bool canBeActivatedByPlayer = true;
    private bool isPressurePlatePressed = false;
    private bool hasStartedFalling = false;
    private Coroutine activeCoroutine;
    private Tween activeBlinkTween;
    private Tween pressurePlateTween;
    private Vector3 pressurePlateInitialLocalPosition;
    private Color initialRendererColor = Color.white;

    private void Start()
    {
        rigidbody = GetComponent<Rigidbody>();
        if (pressurePlate != null)
        {
            pressurePlateInitialLocalPosition = pressurePlate.localPosition;
        }

        if (renderer != null)
        {
            initialRendererColor = renderer.material.color;
        }
    }

    private void OnEnable()
    {
        LunaManager.OnEndCardShown += HandleEndCardShown;
    }

    private void OnDisable()
    {
        LunaManager.OnEndCardShown -= HandleEndCardShown;
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (hasHit) return;

        if (!isActivated && canBeActivatedByPlayer && collision.collider.CompareTag("Player"))
        {
            PressPressurePlate();
            ActivateTnt();
            return;
        }

        if (isActivated && collision.collider.CompareTag("Enemy"))
        {
            hasHit = true;

            rigidbody.velocity = Vector3.zero;
            rigidbody.useGravity = true;
            rigidbody.isKinematic = false;

            AnimExplore();
        }
    }

    public void ActivateTnt()
    {
        if (isActivated || hasHit || isExploding)
            return;

        isActivated = true;
        StartActiveBlink();
        activeCoroutine = StartCoroutine(ActiveRoutine());
    }

    public void SetCanBeActivatedByPlayer(bool canActivate)
    {
        canBeActivatedByPlayer = canActivate;
    }

    private void PressPressurePlate()
    {
        if (isPressurePlatePressed)
            return;

        isPressurePlatePressed = true;
        PlayPressurePlateSound();

        if (pressurePlate == null)
            return;

        pressurePlateTween?.Kill();
        Vector3 pressedLocalPosition = pressurePlateInitialLocalPosition + Vector3.down * pressurePlatePressDistance;
        pressurePlateTween = pressurePlate
            .DOLocalMove(pressedLocalPosition, pressurePlatePressDuration)
            .SetEase(Ease.OutQuad);
    }

    private IEnumerator ActiveRoutine()
    {
        yield return new WaitForSeconds(activeFallDelay);

        hasStartedFalling = true;
        rigidbody.useGravity = true;
        rigidbody.isKinematic = false;

        float explodeDelayAfterFall = Mathf.Max(0f, activeExplodeDelay - activeFallDelay);
        yield return new WaitForSeconds(explodeDelayAfterFall);

        activeCoroutine = null;
        hasHit = true;
        ExplodeFromActivation();
    }

    public void AnimExplore()
    {
        if (isExploding)
            return;

        isExploding = true;
        PlayExplosionSound();
        StartActiveBlink();

        Sequence s = DOTween.Sequence();
        s.Append(transform.DOScale(Vector3.one * 0.1f, 2f).SetEase(Ease.OutBack))
            .Append(transform.DOScale(Vector3.zero, 0.5f).SetEase(Ease.InBack))
            .OnComplete(Explore);
    }

    private void ExplodeFromActivation()
    {
        if (isExploding)
            return;

        isExploding = true;
        PlayExplosionSound();
        Explore();
    }

    private void StartActiveBlink()
    {
        if (renderer == null || activeBlinkTween != null)
            return;

        activeBlinkTween = renderer.material.DOColor(Color.red, 0.3f).SetLoops(-1, LoopType.Yoyo);
    }

    private void PlayExplosionSound()
    {
        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundXixi(transform.position);
        }
    }

    private void PlayPressurePlateSound()
    {
        if (AudioManager.ins == null)
            return;

        if (pressurePlateSound != null)
        {
            AudioManager.ins.PlaySound(pressurePlateSound);
            return;
        }

        AudioManager.ins.PlaySoundBuild();
    }

    private void HandleEndCardShown()
    {
        if (hasStartedFalling || hasHit || isExploding)
            return;

        CancelPendingActivation();
    }

    private void CancelPendingActivation()
    {
        if (activeCoroutine != null)
        {
            StopCoroutine(activeCoroutine);
            activeCoroutine = null;
        }

        isActivated = false;
        canBeActivatedByPlayer = false;
        hasStartedFalling = false;

        pressurePlateTween?.Kill();
        pressurePlateTween = null;
        activeBlinkTween?.Kill();
        activeBlinkTween = null;

        if (renderer != null)
        {
            renderer.material.color = initialRendererColor;
        }

        if (pressurePlate != null)
        {
            pressurePlate.localPosition = pressurePlateInitialLocalPosition;
        }

        rigidbody.velocity = Vector3.zero;
        rigidbody.angularVelocity = Vector3.zero;
        rigidbody.useGravity = false;
        rigidbody.isKinematic = true;
    }

    private void Explore()
    {
        pressurePlateTween?.Kill();
        pressurePlateTween = null;
        activeBlinkTween?.Kill();
        activeBlinkTween = null;

        var enemys=Physics.OverlapSphere(transform.position, 0.2f, enemyLayerMask);
        if (enemys.Length > 0)
            foreach (var enemy in enemys)
            {
                if (enemy.TryGetComponent<BaseCharacter>(out var character))
                {
                    character.TakeDamage(100f); // Gọi phương thức TakeDamage trên BaseCharacter
                }
            }
        if (explosionParticleSystem != null)
        {
            explosionParticleSystem.gameObject.SetActive(true);
            explosionParticleSystem.transform.SetParent(null, true);
            explosionParticleSystem.Play();
        }
        OnTntExploded?.Invoke(this);
        Destroy(gameObject);
    }
}
