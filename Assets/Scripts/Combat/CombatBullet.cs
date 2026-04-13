using UnityEngine;

public class CombatBullet : MonoBehaviour
{
    private Rigidbody bulletRigidbody;
    private Collider bulletCollider;
    private Material runtimeMaterial;
    private Transform owner;
    private Vector3 targetPoint;
    private float targetHitRadius;
    private float lifeRemaining;
    private int damage;
    private bool canDamageTargets;
    private bool canDamagePlayer;
    private bool useTargetPoint;
    private bool isResolved;
    private DamageableTarget lockedTarget;

    public static CombatBullet Spawn(
        GameObject bulletPrefab,
        Vector3 spawnPosition,
        Vector3 direction,
        float speed,
        float lifetime,
        int damage,
        Transform owner,
        bool canDamageTargets,
        bool canDamagePlayer,
        Vector3 targetPoint,
        float targetHitRadius,
        Color fallbackColor,
        Vector3 fallbackScale,
        DamageableTarget lockedTarget = null)
    {
        Vector3 safeDirection = direction.sqrMagnitude <= 0.0001f ? Vector3.forward : direction.normalized;
        GameObject bulletObject = bulletPrefab != null
            ? Instantiate(bulletPrefab, spawnPosition, Quaternion.LookRotation(safeDirection))
            : CreateFallbackBullet(spawnPosition, safeDirection, fallbackColor, fallbackScale);

        CombatBullet bullet = bulletObject.GetComponent<CombatBullet>();
        if (bullet == null)
        {
            bullet = bulletObject.AddComponent<CombatBullet>();
        }

        bullet.Initialize(
            safeDirection,
            speed,
            lifetime,
            damage,
            owner,
            canDamageTargets,
            canDamagePlayer,
            targetPoint,
            targetHitRadius,
            bulletPrefab == null,
            lockedTarget);

        return bullet;
    }

    private static GameObject CreateFallbackBullet(Vector3 spawnPosition, Vector3 direction, Color color, Vector3 scale)
    {
        GameObject bulletObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        bulletObject.name = "CombatBullet";
        bulletObject.transform.position = spawnPosition;
        bulletObject.transform.rotation = Quaternion.LookRotation(direction);
        bulletObject.transform.localScale = scale;

        Renderer renderer = bulletObject.GetComponent<Renderer>();
        if (renderer != null)
        {
            Shader shader = Shader.Find("Standard");
            if (shader == null)
            {
                shader = Shader.Find("Sprites/Default");
            }

            if (shader != null)
            {
                Material material = new Material(shader);
                if (material.HasProperty("_Color"))
                {
                    material.color = color;
                }

                if (material.HasProperty("_BaseColor"))
                {
                    material.SetColor("_BaseColor", color);
                }

                renderer.material = material;
            }
        }

        return bulletObject;
    }

    private void Initialize(
        Vector3 direction,
        float speed,
        float lifetime,
        int damage,
        Transform bulletOwner,
        bool damageTargets,
        bool damagePlayer,
        Vector3 destination,
        float destinationRadius,
        bool createdFallbackVisual,
        DamageableTarget preferredTarget)
    {
        owner = bulletOwner;
        canDamageTargets = damageTargets;
        canDamagePlayer = damagePlayer;
        targetPoint = destination;
        targetHitRadius = Mathf.Max(0.05f, destinationRadius);
        useTargetPoint = true;
        lifeRemaining = Mathf.Max(0.1f, lifetime);
        this.damage = damage;
        lockedTarget = preferredTarget;

        bulletCollider = GetComponent<Collider>();
        if (bulletCollider == null)
        {
            bulletCollider = gameObject.AddComponent<SphereCollider>();
        }

        bulletCollider.isTrigger = true;

        bulletRigidbody = GetComponent<Rigidbody>();
        if (bulletRigidbody == null)
        {
            bulletRigidbody = gameObject.AddComponent<Rigidbody>();
        }

        bulletRigidbody.useGravity = false;
        bulletRigidbody.isKinematic = false;
        bulletRigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
        bulletRigidbody.interpolation = RigidbodyInterpolation.Interpolate;
        bulletRigidbody.constraints = RigidbodyConstraints.FreezeRotation;
        bulletRigidbody.velocity = direction * speed;

        int ignoreRaycastLayer = LayerMask.NameToLayer("Ignore Raycast");
        if (ignoreRaycastLayer >= 0)
        {
            gameObject.layer = ignoreRaycastLayer;
        }

        IgnoreOwnerCollisions();

        if (createdFallbackVisual)
        {
            Renderer renderer = GetComponent<Renderer>();
            if (renderer != null)
            {
                runtimeMaterial = renderer.material;
            }
        }
    }

    private void Update()
    {
        if (isResolved)
        {
            return;
        }

        lifeRemaining -= Time.deltaTime;
        if (lifeRemaining <= 0f)
        {
            DestroySelf();
            return;
        }

        if (!useTargetPoint)
        {
            return;
        }

        if (Vector3.Distance(transform.position, targetPoint) > targetHitRadius)
        {
            return;
        }

        if (lockedTarget != null && !lockedTarget.IsDead)
        {
            lockedTarget.TakeDamage(damage, lockedTarget.GetClosestHitPoint(transform.position), GetTravelDirection(), owner);
            DestroySelf();
            return;
        }

        if (canDamagePlayer)
        {
            CameraDragRotate player = CameraDragRotate.ActiveController;
            if (player != null && !player.IsDead)
            {
                player.ReceiveDamage(damage, transform.position);
            }
        }

        DestroySelf();
    }

    private void OnTriggerEnter(Collider other)
    {
        ResolveCollision(other);
    }

    private void OnCollisionEnter(Collision collision)
    {
        ResolveCollision(collision.collider);
    }

    private void ResolveCollision(Collider other)
    {
        if (isResolved || other == null)
        {
            return;
        }

        if (owner != null && other.transform.root == owner.root)
        {
            return;
        }

        if (canDamageTargets)
        {
            DamageableTarget damageableTarget = other.GetComponentInParent<DamageableTarget>();
            if (damageableTarget != null)
            {
                lockedTarget = damageableTarget;
                damageableTarget.TakeDamage(damage, other.ClosestPoint(transform.position), GetTravelDirection(), owner);
                DestroySelf();
                return;
            }
        }

        if (canDamagePlayer)
        {
            CameraDragRotate player = CameraDragRotate.ActiveController;
            if (player != null && !player.IsDead)
            {
                Transform playerRoot = player.PlayerTransform.root;
                if (other.transform.root == playerRoot)
                {
                    player.ReceiveDamage(damage, transform.position);
                    DestroySelf();
                    return;
                }
            }
        }

        DestroySelf();
    }

    private Vector3 GetTravelDirection()
    {
        if (bulletRigidbody != null && bulletRigidbody.velocity.sqrMagnitude > 0.0001f)
        {
            return bulletRigidbody.velocity.normalized;
        }

        return transform.forward;
    }

    private void IgnoreOwnerCollisions()
    {
        if (owner == null || bulletCollider == null)
        {
            return;
        }

        Collider[] ownerColliders = owner.GetComponentsInChildren<Collider>(true);
        for (int i = 0; i < ownerColliders.Length; i++)
        {
            if (ownerColliders[i] != null)
            {
                Physics.IgnoreCollision(bulletCollider, ownerColliders[i], true);
            }
        }
    }

    private void DestroySelf()
    {
        if (isResolved)
        {
            return;
        }

        isResolved = true;
        Destroy(gameObject);
    }

    private void OnDestroy()
    {
        if (runtimeMaterial != null)
        {
            Destroy(runtimeMaterial);
        }
    }
}
