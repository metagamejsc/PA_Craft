using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnEnemy : MonoBehaviour
{
    public GameObject zombiePrefab;
    public BoxCollider spawnArea;
    public int numberOfZombies = 5;
    private List<GameObject> spawnedZombies = new List<GameObject>();
    void Start()
    {
        SpawnZombies();
    }
    void SpawnZombies()
    {
        for (int i = 0; i < numberOfZombies; i++)
        {
            Vector3 spawnPosition = new Vector3(
                Random.Range(spawnArea.bounds.min.x, spawnArea.bounds.max.x),
                spawnArea.bounds.min.y,
                Random.Range(spawnArea.bounds.min.z, spawnArea.bounds.max.z)
            );

            GameObject zombie = Instantiate(zombiePrefab, spawnPosition, Quaternion.identity);
            spawnedZombies.Add(zombie);
        }
    }
}
