using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Anim3D : MonoBehaviour
{
    public BaseCharacter baseCharacter;
    public void OnAnimationEvent(AnimationEvent evt)
    {
        if (evt.stringParameter=="atk")
        {
            if (baseCharacter.target!=null && baseCharacter.target.TryGetComponent<BaseCharacter>(out var player) && !player.isDead) // Kiểm tra có component Player và chưa chết
            {
                baseCharacter.target.GetComponent<BaseCharacter>().TakeDamage(baseCharacter.damage);
            }

        }
    }
}
