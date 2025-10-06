using System.Collections.Generic;
using UnityEngine;

public class BridgeManager : MonoBehaviour
{
    public List<GlassLine> glassLines;

    void Start()
    {
        SetupGlassLine();
    }
    public void SetupGlassLine()
    {
        foreach (var line in glassLines)
        {
            bool leftSafe = Random.value > 0.5f;
            line.SetSafeSide(leftSafe);
        }
    }
}