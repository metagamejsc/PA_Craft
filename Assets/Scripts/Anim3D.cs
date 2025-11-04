using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Anim3D : MonoBehaviour
{
    public BaseCharacter baseCharacter;
    public SoundChar soundChar;

    private void Start()
    {
        baseCharacter=gameObject.transform.parent.GetComponent<BaseCharacter>();
        soundChar=GetComponent<SoundChar>();
    }

    public void OnAnimationEvent(AnimationEvent evt)
    {
        /*if (baseCharacter.target!=null && baseCharacter.target.TryGetComponent<BaseCharacter>(out var player) && !player.isDead) // Kiểm tra có component Player và chưa chết
        {
            Debug.Log("Attack baseCharacter.target!=null");
            baseCharacter.target.GetComponent<BaseCharacter>().TakeDamage(baseCharacter.damage);
        }*/
    }

    public void EventAtk()
    {
        if (baseCharacter!=null)
        {
            if (baseCharacter.target==null)
            {
                soundChar.PlayAttackSound();
            }
            else
            {
                soundChar.PlayAttackSound();
                if (baseCharacter.target != null &&
                    baseCharacter.target.TryGetComponent<BaseCharacter>(out var player) &&
                    !player.isDead) // Kiểm tra có component Player và chưa chết
                {
                    baseCharacter.animator.GetComponent<SoundChar>().PlayTakeDameSound();
                    baseCharacter.target.GetComponent<BaseCharacter>().TakeDamage(baseCharacter.damage);
                }
            }
        }
    }
    public void EventAtkComplete()
    {
        if (baseCharacter!=null)
        {
            baseCharacter.AtkCompleted();
        }
    }
    public void EventIdle()
    {
        soundChar.PlayIdleSound();
    }

    public void EventDead()
    {
        //LunaManager.ins.ShowEndCard();
        soundChar.PlayDeadSound();
    }
    public void EventMove()
    {
        soundChar.PlayMoveSound();
    }
    public void EventJump()
    {
        soundChar.PlayJumpSound();
    }
}
