using System;
using System.Collections.Generic;
using UnityEngine;

public class ProjectileController : MonoBehaviour
{
    const int DefaultLayer = 0;

    [Serializable]
    public struct ProjectileSoundData
    {
        public AudioClip clip;
        public int channel;
        public float volume;
        public bool loop;
        public float delay;
    }

    public GameObject hitEffect;
    public float hitEffectLifetime = 1f;
    public ProjectileSoundData hitSound;
    public float defaultSpeed = 35f;
    public float defaultLifetime = 5f;
    public LayerMask defaultCollisionMask = ~0;
    public bool suppressDefaultLayerHitEffect = true;

    private readonly List<Collider> ignoredColliders = new List<Collider>();
    private readonly List<Collider> ownedColliders = new List<Collider>();
    private readonly List<Renderer> ownedRenderers = new List<Renderer>();
    private readonly List<TrailRenderer> ownedTrails = new List<TrailRenderer>();
    private readonly List<ParticleSystem> ownedParticles = new List<ParticleSystem>();
    private Vector3 moveDirection;
    private float moveSpeed;
    private float damage;
    private float lifetimeRemaining;
    private LayerMask collisionMask;
    private bool isLaunched;
    private bool hasHit;

    public void Launch(
        Vector3 spawnPosition,
        Vector3 direction,
        float speed,
        float projectileDamage,
        float lifetime,
        LayerMask mask,
        Transform ownerRoot)
    {
        transform.position = spawnPosition;
        moveDirection = direction.normalized;
        transform.rotation = Quaternion.LookRotation(moveDirection);
        moveSpeed = speed > 0f ? speed : defaultSpeed;
        damage = projectileDamage;
        lifetimeRemaining = lifetime > 0f ? lifetime : defaultLifetime;
        collisionMask = mask.value == 0 ? defaultCollisionMask : mask;
        isLaunched = true;
        hasHit = false;
        enabled = true;

        ignoredColliders.Clear();
        if (ownerRoot != null)
        {
            ignoredColliders.AddRange(ownerRoot.GetComponentsInChildren<Collider>(true));
        }

        CacheOwnedComponents();
        SetVisualState(true);
    }

    void Update()
    {
        if (!isLaunched)
        {
            return;
        }

        float moveDistance = moveSpeed * Time.deltaTime;
        Vector3 currentPosition = transform.position;

        RaycastHit[] hits = Physics.RaycastAll(
            currentPosition,
            moveDirection,
            moveDistance,
            collisionMask,
            QueryTriggerInteraction.Ignore);

        if (hits.Length > 0)
        {
            Array.Sort(hits, (left, right) => left.distance.CompareTo(right.distance));
            for (int i = 0; i < hits.Length; i++)
            {
                if (ignoredColliders.Contains(hits[i].collider))
                {
                    continue;
                }

                HandleHit(hits[i]);
                return;
            }
        }

        transform.position = currentPosition + (moveDirection * moveDistance);
        transform.rotation = Quaternion.LookRotation(moveDirection);

        lifetimeRemaining -= Time.deltaTime;
        if (lifetimeRemaining <= 0f)
        {
            DespawnProjectile();
        }
    }

    void HandleHit(RaycastHit hit)
    {
        if (hasHit)
        {
            return;
        }

        hasHit = true;
        isLaunched = false;
        enabled = false;
        transform.position = hit.point;

        EnemyController enemy = hit.collider.GetComponentInParent<EnemyController>();
        if (enemy != null && !enemy.IsDead())
        {
            enemy.TakeDamage(damage, moveDirection);
        }

        bool shouldSpawnHitEffect =
            hitEffect != null &&
            (!suppressDefaultLayerHitEffect || hit.collider.gameObject.layer != DefaultLayer || enemy != null);

        if (shouldSpawnHitEffect)
        {
            Quaternion effectRotation = hit.normal.sqrMagnitude > 0.001f
                ? Quaternion.LookRotation(hit.normal)
                : Quaternion.identity;
            GameObject effectInstance = Instantiate(hitEffect, hit.point, effectRotation);
            DestroySpawnedHitEffect(effectInstance);
        }

        if (hitSound.clip != null)
        {
            float volume = hitSound.volume <= 0f ? 1f : hitSound.volume;
            AudioSource.PlayClipAtPoint(hitSound.clip, hit.point, volume);
        }

        if (enemy != null)
        {
            DestroyProjectileRoot();
            return;
        }

        DespawnProjectile();
    }

    void CacheOwnedComponents()
    {
        ownedColliders.Clear();
        ownedRenderers.Clear();
        ownedTrails.Clear();
        ownedParticles.Clear();

        ownedColliders.AddRange(GetComponentsInChildren<Collider>(true));
        ownedRenderers.AddRange(GetComponentsInChildren<Renderer>(true));
        ownedTrails.AddRange(GetComponentsInChildren<TrailRenderer>(true));
        ownedParticles.AddRange(GetComponentsInChildren<ParticleSystem>(true));
    }

    void SetVisualState(bool isVisible)
    {
        for (int i = 0; i < ownedColliders.Count; i++)
        {
            if (ownedColliders[i] != null)
            {
                ownedColliders[i].enabled = isVisible;
            }
        }

        for (int i = 0; i < ownedRenderers.Count; i++)
        {
            if (ownedRenderers[i] != null)
            {
                ownedRenderers[i].enabled = isVisible;
            }
        }

        for (int i = 0; i < ownedTrails.Count; i++)
        {
            if (ownedTrails[i] == null)
            {
                continue;
            }

            if (isVisible)
            {
                ownedTrails[i].Clear();
                ownedTrails[i].emitting = true;
            }
            else
            {
                ownedTrails[i].emitting = false;
                ownedTrails[i].Clear();
            }
        }

        for (int i = 0; i < ownedParticles.Count; i++)
        {
            if (ownedParticles[i] == null)
            {
                continue;
            }

            if (isVisible)
            {
                ownedParticles[i].Play(true);
            }
            else
            {
                ownedParticles[i].Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            }
        }
    }

    void DespawnProjectile()
    {
        if (!gameObject.activeSelf)
        {
            Destroy(gameObject);
            return;
        }

        isLaunched = false;
        enabled = false;
        SetVisualState(false);
        gameObject.SetActive(false);
        Destroy(gameObject);
    }

    void DestroyProjectileRoot()
    {
        isLaunched = false;
        enabled = false;
        gameObject.SetActive(false);
        Destroy(gameObject);
    }

    void DestroySpawnedHitEffect(GameObject effectInstance)
    {
        if (effectInstance == null)
        {
            return;
        }

        Destroy(effectInstance, hitEffectLifetime);
    }
}
