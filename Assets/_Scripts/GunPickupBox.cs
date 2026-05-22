using UnityEngine;

public class GunPickupBox : MonoBehaviour
{
    public WeaponManager weaponManager;
    public int gunIndex;
    public float attackCooldown = 1f;

    void OnTriggerEnter(Collider other)
    {
        if (weaponManager != null && other.GetComponentInParent<PlayerController>() != null)
        {
            weaponManager.EquipGun(gunIndex, attackCooldown);
        }
    }
}
