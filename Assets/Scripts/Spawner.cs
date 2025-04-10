using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spawner : MonoBehaviour
{
    public bool isActive = false;
    public int maxCap = 1;
    public GameObject spawnPrefab;
    public float spawnTime = 1f;
    public float spawnInterval = 1f;
    public List<GameObject> lstCurrentPrefab = new List<GameObject>();
    public Transform posSpawn;
    public List<Transform> listWaypoint;
    public GameObject camp, buy;
    public int ironToActive = 10;
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player") && isActive==false)
        {
            if (GameController.ins.ironCount < ironToActive)
            {
                return;
            }
            GameController.ins.UpdateIronCount(-ironToActive);
            isActive = true;
            camp.SetActive(true);
            buy.SetActive(false);
        }
    }

    private void Start()
    {
        camp.SetActive(false);
        buy.SetActive(true);
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
