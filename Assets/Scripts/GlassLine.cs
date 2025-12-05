using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlassLine : MonoBehaviour
{
    public GlassTile leftTile;
    public GlassTile rightTile;
    public bool isLeftSafe; // Được đặt bởi BridgeManager
    
    public void ResetLine()
    {
        leftTile.isSafe = isLeftSafe;
        rightTile.isSafe = !isLeftSafe;
        
        leftTile.ResetTile();
        rightTile.ResetTile();
    }
    public void SetSafeSide(bool leftSafe)
    {
        isLeftSafe = leftSafe;
        leftTile.isSafe = leftSafe;
        rightTile.isSafe = !leftSafe;
        leftTile.OnStart();
        rightTile.OnStart();
    }
    public Transform LeftPos()
    {
        return leftTile.transform;
    }
    public Transform RightPos()
    {
        return rightTile.transform;
    }
}
