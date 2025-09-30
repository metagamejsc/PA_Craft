
using UnityEngine;

public interface IWeapon
{
    void Attack();
    void Equip(Transform handTransform);
    void Unequip();
}