using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Events;

public class ExplosiveTntBarrel : MonoBehaviour, IProjectileHitReceiver
{
    public event Action<ExplosiveTntBarrel> Exploded;

    [Header("Explosion")]
    public float radius = 6f;
    public float enemyDamage = 999f;
    public LayerMask affectedLayers = ~0;
    public bool explodeOnlyOnce = true;
    public bool destroyAfterExplosion = true;
    public float destroyDelay = 0.05f;

    [Header("Model")]
    public Transform tntModel;

    [Header("Idle Shake")]
    public bool shakeOnStart = true;
    public float idlePositionStrength = 0.015f;
    public float idleRotationStrength = 2f;
    public float idlePulseScaleStrength = 0.025f;
    public float idleShakeFrequency = 8f;

    [Header("Hit Warning Shake")]
    public float warningDuration = 0.8f;
    public float shakePositionStrength = 0.08f;
    public float shakeRotationStrength = 6f;
    public float pulseScaleStrength = 0.12f;
    public float shakeFrequency = 32f;

    [Header("Feedback")]
    public GameObject explosionEffectPrefab;
    public AudioClip explosionSound;
    public UnityEvent onExploded;

    private bool hasExploded;
    private bool isWarning;
    private Coroutine idleShakeRoutine;
    private Coroutine explosionRoutine;
    private Vector3 modelStartLocalPosition;
    private Quaternion modelStartLocalRotation;
    private Vector3 modelStartLocalScale;
    private Transform cachedModel;

    public bool HasExploded => hasExploded;

    void Start()
    {
        CacheModelTransform(GetModel());
        if (shakeOnStart)
        {
            idleShakeRoutine = StartCoroutine(IdleShakeRoutine());
        }
    }

    void OnDisable()
    {
        if (cachedModel != null)
        {
            RestoreModelTransform(cachedModel);
        }
    }

    public void OnProjectileHit(RaycastHit hit, float damage, Vector3 hitDirection)
    {
        Explode();
    }

    public void Explode()
    {
        if ((hasExploded || isWarning) && explodeOnlyOnce)
        {
            return;
        }

        if (explosionRoutine != null)
        {
            StopCoroutine(explosionRoutine);
        }

        explosionRoutine = StartCoroutine(ExplodeRoutine());
    }

    IEnumerator ExplodeRoutine()
    {
        isWarning = true;

        if (idleShakeRoutine != null)
        {
            StopCoroutine(idleShakeRoutine);
            idleShakeRoutine = null;
        }

        Transform model = GetModel();
        RestoreModelTransform(model);

        float elapsed = 0f;
        while (elapsed < warningDuration)
        {
            float intensity = warningDuration <= 0f ? 1f : Mathf.Clamp01(elapsed / warningDuration);
            float wave = Mathf.Sin(elapsed * shakeFrequency);
            float randomX = UnityEngine.Random.Range(-1f, 1f);
            float randomZ = UnityEngine.Random.Range(-1f, 1f);

            model.localPosition = modelStartLocalPosition + new Vector3(randomX, 0f, randomZ) * shakePositionStrength * intensity;
            model.localRotation = modelStartLocalRotation * Quaternion.Euler(
                0f,
                wave * shakeRotationStrength * intensity,
                randomX * shakeRotationStrength * intensity);
            model.localScale = modelStartLocalScale * (1f + Mathf.Abs(wave) * pulseScaleStrength * intensity);

            elapsed += Time.deltaTime;
            yield return null;
        }

        RestoreModelTransform(model);
        isWarning = false;
        explosionRoutine = null;
        ExplodeNow();
    }

    IEnumerator IdleShakeRoutine()
    {
        Transform model = GetModel();
        float elapsed = 0f;
        while (!hasExploded && !isWarning)
        {
            float wave = Mathf.Sin(elapsed * idleShakeFrequency);
            float offsetWave = Mathf.Cos(elapsed * idleShakeFrequency * 0.7f);

            model.localPosition = modelStartLocalPosition + new Vector3(wave, 0f, offsetWave) * idlePositionStrength;
            model.localRotation = modelStartLocalRotation * Quaternion.Euler(
                offsetWave * idleRotationStrength,
                wave * idleRotationStrength,
                -wave * idleRotationStrength);
            model.localScale = modelStartLocalScale * (1f + Mathf.Abs(wave) * idlePulseScaleStrength);

            elapsed += Time.deltaTime;
            yield return null;
        }
    }

    void ExplodeNow()
    {
        if (hasExploded && explodeOnlyOnce)
        {
            return;
        }

        hasExploded = true;

        if (explosionEffectPrefab != null)
        {
            explosionEffectPrefab.SetActive(true);
        }

        if (explosionSound != null)
        {
            AudioSource.PlayClipAtPoint(explosionSound, transform.position);
        }

        Collider[] hits = Physics.OverlapSphere(transform.position, radius, affectedLayers, QueryTriggerInteraction.Collide);
        for (int i = 0; i < hits.Length; i++)
        {
            EnemyController enemy = hits[i].GetComponentInParent<EnemyController>();
            if (enemy == null || enemy.IsDead())
            {
                continue;
            }

            Vector3 hitDirection = enemy.transform.position - transform.position;
            enemy.TakeDamage(enemyDamage, hitDirection.normalized);
        }

        onExploded?.Invoke();
        Exploded?.Invoke(this);

        if (destroyAfterExplosion)
        {
            Destroy(gameObject, destroyDelay);
        }
    }

    void CacheModelTransform(Transform model)
    {
        cachedModel = model;
        modelStartLocalPosition = model.localPosition;
        modelStartLocalRotation = model.localRotation;
        modelStartLocalScale = model.localScale;
    }

    void RestoreModelTransform(Transform model)
    {
        model.localPosition = modelStartLocalPosition;
        model.localRotation = modelStartLocalRotation;
        model.localScale = modelStartLocalScale;
    }

    Transform GetModel()
    {
        return tntModel != null ? tntModel : transform;
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = new Color(1f, 0.35f, 0f, 0.35f);
        Gizmos.DrawSphere(transform.position, radius);
    }
}
