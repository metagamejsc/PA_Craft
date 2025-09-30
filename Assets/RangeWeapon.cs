using UnityEngine;

public class RangedWeapon : Weapon
{
    public GameObject projectilePrefab;
    public Transform firePoint;
    public float projectileSpeed = 20f;

    public override void Attack()
    {
        if (!CanAttack()) return;

        cooldownTimer = attackCooldown;

        if (projectilePrefab && firePoint)
        {
            GameObject proj = GameObject.Instantiate(projectilePrefab, firePoint.position, Quaternion.identity);
            AudioManager.ins.PlaySound(attackSound);
            Rigidbody rb = proj.GetComponent<Rigidbody>();
            if (rb != null)
            {
                rb.velocity = Camera.main.transform.forward * projectileSpeed;
            }
        }
    }
}