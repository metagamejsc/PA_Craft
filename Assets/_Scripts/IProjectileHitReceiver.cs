using UnityEngine;

public interface IProjectileHitReceiver
{
    void OnProjectileHit(RaycastHit hit, float damage, Vector3 hitDirection);
}
