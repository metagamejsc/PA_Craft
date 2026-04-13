using System;
using UnityEngine;

public static class EnemyAlertSystem
{
    public static event Action<Transform, Vector3> PlayerShotFired;

    public static void NotifyPlayerShot(Transform shooter, Vector3 hitPoint)
    {
        PlayerShotFired?.Invoke(shooter, hitPoint);
    }
}
