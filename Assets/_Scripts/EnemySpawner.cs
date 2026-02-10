using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    [Header("Enemy Setup")]
    public GameObject[] enemyPrefab;
    public Transform[] spawnPoints;
    
    private float spawnInterval;
    private float enemySpeed;

    private void Start()
    {
        StartCoroutine(SpawnLoop());
    }

    IEnumerator SpawnLoop()
    {
        while (!LunaManager.ins.isCretivePause)
        {
            spawnInterval = Random.Range(LunaManager.ins.rangeTimeSpawn.x, LunaManager.ins.rangeTimeSpawn.y);
            yield return new WaitForSeconds(spawnInterval);
            SpawnEnemy();
        }
    }

    void SpawnEnemy()
    {
        if (enemyPrefab.Length==0 || spawnPoints.Length == 0) return;

        Transform spawnPoint = spawnPoints[Random.Range(0, spawnPoints.Length)];
        GameObject enemyGO = this.enemyPrefab[Random.Range(0, this.enemyPrefab.Length)];
        GameObject enemy = Instantiate(enemyGO, spawnPoint.position, spawnPoint.rotation);

        // Gán tốc độ cho enemy
        EnemyController ec = enemy.GetComponent<EnemyController>();
        if (ec != null)
        {
            ec.moveSpeed = Random.Range(LunaManager.ins.rangeSpeedMonster.x, LunaManager.ins.rangeSpeedMonster.y);
        }
    }
}