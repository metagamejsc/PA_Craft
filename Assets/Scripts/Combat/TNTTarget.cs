using System.Collections.Generic;
using UnityEngine;

public class TNTTarget : DamageableTarget
{
    [SerializeField] private float explosionRadius = 4f;
    [SerializeField] private int explosionDamage = 2;
    [SerializeField] private GameObject visualRoot;
    [SerializeField] private ParticleSystem exploreEffect;

    protected override void OnDeath(Transform attacker)
    {
        Vector3 explosionOrigin = transform.position;

        if (visualRoot != null)
        {
            visualRoot.SetActive(false);
        }

        Collider[] colliders = Physics.OverlapSphere(explosionOrigin, explosionRadius, Physics.DefaultRaycastLayers, QueryTriggerInteraction.Ignore);
        HashSet<DamageableTarget> damagedTargets = new HashSet<DamageableTarget>();
        for (int i = 0; i < colliders.Length; i++)
        {
            DamageableTarget target = colliders[i].GetComponentInParent<DamageableTarget>();
            if (target == null || target == this || !damagedTargets.Add(target))
            {
                continue;
            }

            Vector3 hitPoint = colliders[i].ClosestPoint(explosionOrigin);
            Vector3 hitDirection = (hitPoint - explosionOrigin).sqrMagnitude <= 0.001f
                ? Vector3.up
                : (hitPoint - explosionOrigin).normalized;

            target.TakeDamage(explosionDamage, hitPoint, hitDirection, transform);
        }

        if (CameraDragRotate.ActiveController != null)
        {
            CameraDragRotate.ActiveController.ReceiveExplosionDamage(explosionOrigin, explosionRadius, explosionDamage);
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundBomb();
        }
        Instantiate(exploreEffect,transform.position, Quaternion.identity);
        Destroy(gameObject);
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = new Color(1f, 0.45f, 0.1f, 0.45f);
        Gizmos.DrawWireSphere(transform.position, explosionRadius);
    }
}
