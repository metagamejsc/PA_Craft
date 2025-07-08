using UnityEngine;

public class IceSpike : MonoBehaviour
{
    public float damagePerSecond = 1f;
    public LayerMask enemyLayer;

    void OnTriggerStay(Collider other)
    {
        // Kiểm tra nếu object trong layer enemy
        if (((1 << other.gameObject.layer) & enemyLayer) != 0)
        {
            // Gây sát thương mỗi giây
            BaseCharacter target = other.GetComponent<BaseCharacter>();
            if (target != null)
            {
                target.TakeDamage(damagePerSecond * Time.deltaTime);
            }
        }
    }
}