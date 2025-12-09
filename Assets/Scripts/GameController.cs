using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public static GameController ins;

    [Header("Game State")]
    public bool isStartGame = false;
    public bool isPauseGame = false;
    public bool isEndGame = false;

    [Header("Enemy")]
    public GameObject enemyPrefab;              // Prefab enemy
    public List<GameObject> enemyList = new List<GameObject>();
    public int maxEnemyOnScene = 10;           // Giới hạn số enemy đang tồn tại

    [Header("Spawn Area & Time")]
    public BoxCollider spawnArea;              // Vùng collider dùng để spawn
    public float spawnInterval = 3f;           // Khoảng thời gian giữa mỗi lần spawn
    public bool autoSpawnOnStart = true;       // Tự động spawn khi game bắt đầu

    public PlayerChar playerChar;
    public int countEnemyDefeat = 0;

    private Coroutine spawnCoroutine;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        if (autoSpawnOnStart)
        {
            StartSpawn();
        }
    }

    public void EnemyDead(GameObject enemy)
    {
        countEnemyDefeat++;

        // Xoá enemy ra khỏi danh sách nếu có
        if (enemyList.Contains(enemy))
        {
            enemyList.Remove(enemy);
        }

        if (countEnemyDefeat >= LunaManager.ins.countDropFinal)
        {
            LunaManager.ins.DelayCallEndCard(2f);
        }
    }

    [ContextMenu("Camera")]
    public void CheckCamera()
    {
        // Tùy bạn xử lý
    }

    // ===== HÀM BẮT ĐẦU SPAWN THEO THỜI GIAN =====
    public void StartSpawn()
    {
        if (spawnCoroutine == null)
        {
            spawnCoroutine = StartCoroutine(SpawnEnemyRoutine());
        }
    }

    // ===== HÀM DỪNG SPAWN =====
    public void StopSpawn()
    {
        if (spawnCoroutine != null)
        {
            StopCoroutine(spawnCoroutine);
            spawnCoroutine = null;
        }
    }

    // ===== VÒNG LẶP SPAWN THEO THỜI GIAN =====
    private IEnumerator SpawnEnemyRoutine()
    {
        Vector3 spawnPos = GetRandomPointInBox(spawnArea);
        SpawnEnemy(spawnPos);
         spawnPos = GetRandomPointInBox(spawnArea);
        SpawnEnemy(spawnPos);
         spawnPos = GetRandomPointInBox(spawnArea);
        SpawnEnemy(spawnPos);
        while (isEndGame == false)
        {
            // Chỉ spawn khi game đang chạy và chưa pause
            if (isStartGame && !isPauseGame)
            {
                // Kiểm tra số lượng enemy hiện tại
                if (enemyList.Count < maxEnemyOnScene)
                {
                    spawnPos = GetRandomPointInBox(spawnArea);
                    SpawnEnemy(spawnPos);
                }
            }

            yield return new WaitForSeconds(spawnInterval);
        }

        
    }

    // ===== LẤY VỊ TRÍ NGẪU NHIÊN TRONG BOX COLLIDER =====
    private Vector3 GetRandomPointInBox(BoxCollider box)
    {
        if (box == null)
        {
            Debug.LogWarning("SpawnArea (BoxCollider) chưa được gán!");
            return Vector3.zero;
        }

        Bounds b = box.bounds;
        float x = Random.Range(b.min.x, b.max.x);
        float y = Random.Range(b.min.y, b.max.y);
        float z = Random.Range(b.min.z, b.max.z);

        return new Vector3(x, y, z);
    }

    // ===== SPAWN ENEMY TẠI VỊ TRÍ CHỈ ĐỊNH =====
    public void SpawnEnemy(Vector3 posSpawn)
    {
        if (enemyPrefab == null)
        {
            Debug.LogWarning("enemyPrefab chưa được gán trong GameController!");
            return;
        }

        GameObject newEnemy = Instantiate(enemyPrefab, posSpawn, Quaternion.identity);
        newEnemy.transform.rotation=Quaternion.Euler(0,180,0);
        enemyList.Add(newEnemy);
    }

    public void SetIdWeapon(int id)
    {
        playerChar.CraftWeapon(id);
    }
}
