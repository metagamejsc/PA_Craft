using System;
using UnityEngine;

public abstract class DamageableTarget : MonoBehaviour
{
    [SerializeField] private int maxHealth = 1;
    [SerializeField] private bool disableObjectOnDeath;
    [SerializeField] private bool autoCreateCollider = true;
    [SerializeField] private Collider hitCollider;

    public event Action<DamageableTarget, int, int> HealthChanged;
    public event Action<DamageableTarget, Transform> Died;

    public int MaxHealth => Mathf.Max(1, maxHealth);
    public int CurrentHealth { get; private set; }
    public bool IsDead { get; private set; }
    public Collider HitCollider => hitCollider;

    protected virtual void Awake()
    {
        CurrentHealth = MaxHealth;
        ResolveHitCollider();
    }

    public void TakeDamage(int damage, Vector3 hitPoint, Vector3 hitDirection, Transform attacker)
    {
        if (IsDead || damage <= 0)
        {
            return;
        }

        CurrentHealth = Mathf.Max(0, CurrentHealth - damage);
        HealthChanged?.Invoke(this, CurrentHealth, MaxHealth);
        OnDamaged(damage, hitPoint, hitDirection, attacker);

        if (CurrentHealth > 0)
        {
            return;
        }

        IsDead = true;
        if (hitCollider != null)
        {
            hitCollider.enabled = false;
        }

        OnDeath(attacker);
        Died?.Invoke(this, attacker);

        if (disableObjectOnDeath)
        {
            gameObject.SetActive(false);
        }
    }

    protected virtual void OnDamaged(int damage, Vector3 hitPoint, Vector3 hitDirection, Transform attacker)
    {
    }

    protected virtual void OnDeath(Transform attacker)
    {
    }

    public Vector3 GetClosestHitPoint(Vector3 worldPosition)
    {
        if (hitCollider != null)
        {
            return hitCollider.ClosestPoint(worldPosition);
        }

        return transform.position;
    }

    public Vector3 GetIndicatorWorldPosition(float additionalHeight = 0f)
    {
        if (hitCollider != null)
        {
            Bounds bounds = hitCollider.bounds;
            return new Vector3(bounds.center.x, bounds.max.y + additionalHeight, bounds.center.z);
        }

        Renderer[] renderers = GetComponentsInChildren<Renderer>();
        if (renderers.Length > 0)
        {
            Bounds bounds = renderers[0].bounds;
            for (int i = 1; i < renderers.Length; i++)
            {
                bounds.Encapsulate(renderers[i].bounds);
            }

            return new Vector3(bounds.center.x, bounds.max.y + additionalHeight, bounds.center.z);
        }

        return transform.position + Vector3.up * (1.5f + additionalHeight);
    }

    private void ResolveHitCollider()
    {
        if (hitCollider != null)
        {
            return;
        }

        Collider[] colliders = GetComponentsInChildren<Collider>();
        for (int i = 0; i < colliders.Length; i++)
        {
            if (colliders[i] != null && colliders[i].enabled && !colliders[i].isTrigger)
            {
                hitCollider = colliders[i];
                return;
            }
        }

        if (!autoCreateCollider)
        {
            return;
        }

        Renderer[] renderers = GetComponentsInChildren<Renderer>();
        if (renderers.Length == 0)
        {
            return;
        }

        Bounds bounds = renderers[0].bounds;
        for (int i = 1; i < renderers.Length; i++)
        {
            bounds.Encapsulate(renderers[i].bounds);
        }

        BoxCollider generatedCollider = gameObject.AddComponent<BoxCollider>();
        generatedCollider.center = transform.InverseTransformPoint(bounds.center);
        generatedCollider.size = WorldSizeToLocalSize(bounds.size);
        hitCollider = generatedCollider;
    }

    private Vector3 WorldSizeToLocalSize(Vector3 worldSize)
    {
        Vector3 lossyScale = transform.lossyScale;
        return new Vector3(
            worldSize.x * SafeInverse(lossyScale.x),
            worldSize.y * SafeInverse(lossyScale.y),
            worldSize.z * SafeInverse(lossyScale.z));
    }

    private static float SafeInverse(float value)
    {
        return Mathf.Approximately(value, 0f) ? 1f : 1f / value;
    }
}
