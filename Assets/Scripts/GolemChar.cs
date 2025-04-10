using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GolemChar : BaseCharacter
{
    // Start is called before the first frame update
    protected override void Start()
    {
        base.Start();
        
#if !UNITY_EDITOR
       health = LunaManager.ins.golemHealh;
        damage = LunaManager.ins.golemDamage;
#endif
    }
}
