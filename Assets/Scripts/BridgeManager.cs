using System.Collections.Generic;
using UnityEngine;

public class BridgeManager : MonoBehaviour
{
    public static BridgeManager ins;

    void Awake()
    {
        ins = this;
    }
    public List<GlassLine> glassLines;

    void Start()
    {
        SetupGlassLine();
    }
    public void SetupGlassLine()
    {
        for (int i = 0; i < glassLines.Count; i++)
        {
            bool leftSafe = Random.value > 0.5f;
            
            glassLines[i].SetSafeSide(leftSafe);
            if (i==0)
            {
                glassLines[i].leftTile.isSafe = true;
                glassLines[i].rightTile.isSafe = true;
            }
        }
    }
}