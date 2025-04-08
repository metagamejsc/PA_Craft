using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spawner : MonoBehaviour
{
    public bool isActive = false;
    public int maxCap = 1;
    public GameObject spawnPrefab;
    public float spawnTime = 0f;
    public float spawnInterval = 1f;
    public List<GameObject> lstCurrentPrefab = new List<GameObject>();
    public Transform posSpawn;
    public List<Transform> listWaypoint;
    private void OnTriggerEnter(Collider other)
    {
        isActive = true;
    }

    void Update()
    {
        if (isActive)
        {
            lstCurrentPrefab.RemoveAll(enemy => enemy == null);

            // Nếu số lượng hiện tại ít hơn giới hạn, spawn thêm
            if (lstCurrentPrefab.Count < maxCap)
            {
                spawnTime -= Time.deltaTime;
                if (spawnTime <= 0)
                {
                    SpawnEnemy();
                    spawnTime = spawnInterval;
                }
            }
        }
    }

    private void SpawnEnemy()
    {
        GameObject newEnemy = Instantiate(spawnPrefab, posSpawn.position, Quaternion.identity);
        newEnemy.GetComponent<MoveByLine>().SetWaypoints(listWaypoint);
        lstCurrentPrefab.Add(newEnemy);
    }
}
