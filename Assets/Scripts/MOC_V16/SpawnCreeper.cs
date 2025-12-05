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
    public Vector3 center;

    public void Start()
    {
        numberOfCreepers = LunaManager.ins.numberEnemy;
        SpawnEnemy();
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
            Vector3 randomPosition = new Vector3(0,0.6f,0)+new Vector3(0,0.2f,0)+new Vector3(Random.Range(-0.45f,0.45f), 0, Random.Range(-0.45f, 0.45f));
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
            
            if (zombieChars.Count==0)
            {
                LunaManager.ins.ShowEndCard();
            }
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
