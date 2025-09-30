using UnityEngine;

public abstract class Weapon : MonoBehaviour, IWeapon
{
    public string weaponName;
    public float attackCooldown = 1f;
    public float cooldownTimer = 0f;
    public Transform originalParent;
    public AudioClip attackSound;

    public abstract void Attack();

    public virtual void Equip(Transform handTransform)
    {
        originalParent = transform.parent;
        transform.SetParent(handTransform);
        //transform.localPosition = Vector3.zero;
        //transform.localRotation = Quaternion.identity;
        gameObject.SetActive(true);
    }

    public virtual void Unequip()
    {
        transform.SetParent(originalParent);
        gameObject.SetActive(false);
    }

    protected bool CanAttack()
    {
        return cooldownTimer <= 0f;
    }

    protected virtual void Update()
    {
        if (cooldownTimer > 0)
            cooldownTimer -= Time.deltaTime;
    }
}