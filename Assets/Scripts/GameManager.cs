using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager ins;
    public int modDataSelection = 0;
    private void Awake()
    {
        ins = this;
    }
    
    public ModData[] modData;
}
