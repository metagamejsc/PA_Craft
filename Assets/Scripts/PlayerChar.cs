using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerChar : BaseCharacter
{
    protected override void Update()
    {
#if !UNITY_EDITOR
        health = LunaManager.ins.playerHealh;
        damage = LunaManager.ins.playerDamage;
#endif
        HandleAttack();
        SearchForEnemy();
    }

    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
    }
}
