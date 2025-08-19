using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class SpawnCreeper : MonoBehaviour
{
    public static List<ZombieChar> zombieChars = new List<ZombieChar>();
    [SerializeField]GameObject creeperPrefab;
    [SerializeField]int numberOfCreepers = 5;
    public Bounds terrainBounds;

    public void Start()
    {
        SpawnEnemy();
        Debug.Log(terrainBounds.center + ", Size: " + terrainBounds.size);
        Debug.Log(terrainBounds.min + ", " + terrainBounds.max + ", " + terrainBounds.extents + ", " +
                  terrainBounds.size);
    }

    public void SpawnEnemy()
    {
        if (creeperPrefab == null)
        {
            Debug.LogError("Creeper prefab is not assigned!");
            return;
        }

        for (int i = 0; i < numberOfCreepers; i++)
        {
            Vector3 randomPosition = GetRandomPositionInBounds(terrainBounds);
            GameObject creeper = Instantiate(creeperPrefab, randomPosition, Quaternion.identity);
            creeper.transform.SetParent(transform); // Set parent to this object
            zombieChars.Add(creeper.GetComponent<ZombieChar>());
        }
    }
public static void KillEnemy(ZombieChar zombieChar)
    {
        if (zombieChars.Contains(zombieChar))
        {
            zombieChars.Remove(zombieChar);
            Destroy(zombieChar.gameObject);
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
