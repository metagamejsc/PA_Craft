using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ManChar : BaseCharacter
{
    protected override void Start()
    {
        base.Start();
        
#if !UNITY_EDITOR
       health = LunaManager.ins.manHealh;
        damage = LunaManager.ins.manDamage;
#endif
    }
}
