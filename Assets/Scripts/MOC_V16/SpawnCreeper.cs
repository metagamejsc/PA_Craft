using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class SpawnCreeper : MonoBehaviour
{
    public static List<ZombieChar> zombieChars = new List<ZombieChar>();
    public List<ZombieChar> zombieCharsDrag = new List<ZombieChar>();
    public Bounds terrainBounds;
    public Vector3 center;

    public void Start()
    {
        SpawnEnemy();
    }

    public void SpawnEnemy()
    {
        for (int i = 0; i < zombieCharsDrag.Count; i++)
        {
            zombieChars.Add(zombieCharsDrag[i]);
        }
    }

    public static void KillEnemy(ZombieChar zombieChar)
    {
        if (zombieChars.Contains(zombieChar))
        {
            zombieChars.Remove(zombieChar);
        }
        else
        {
            Debug.LogWarning("ZombieChar not found in the list.");
        }
    }
    private Vector3 GetRandomPositionInBounds(Bounds bounds)
    {
        float x = Random.Range(bounds.min.x, bounds.max.x);
        float y = Random.Range(bounds.min.y, bounds.max.y);
        float z = Random.Range(bounds.min.z, bounds.max.z);
        return new Vector3(x, y, z);
    }
}
