using System.Collections.Generic;
using UnityEngine;

public class NoDamageProjectile : MonoBehaviour
{
    public LayerMask collisionMask = ~0;

    private readonly List<Collider> ignoredColliders = new List<Collider>();
    private Vector3 direction;
    private float speed;
    private float lifetime;
    private bool launched;

    public void Launch(Vector3 launchDirection, float launchSpeed, float launchLifetime, Transform ownerRoot)
    {
        direction = launchDirection.normalized;
        speed = launchSpeed;
        lifetime = launchLifetime;
        launched = true;

        ignoredColliders.Clear();
        if (ownerRoot != null)
        {
            ignoredColliders.AddRange(ownerRoot.GetComponentsInChildren<Collider>(true));
        }
    }

    void Update()
    {
        if (!launched)
        {
            return;
        }

        float moveDistance = speed * Time.deltaTime;
        RaycastHit[] hits = Physics.RaycastAll(transform.position, direction, moveDistance, collisionMask, QueryTriggerInteraction.Ignore);
        for (int i = 0; i < hits.Length; i++)
        {
            if (!ignoredColliders.Contains(hits[i].collider))
            {
                Destroy(gameObject);
                return;
            }
        }

        transform.position += direction * moveDistance;
        lifetime -= Time.deltaTime;
        if (lifetime <= 0f)
        {
            Destroy(gameObject);
        }
    }
}
