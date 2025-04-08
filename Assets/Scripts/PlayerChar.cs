using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerChar : BaseCharacter
{
    protected override void Update()
    {
        HandleAttack();
        SearchForEnemy();
    }
}
