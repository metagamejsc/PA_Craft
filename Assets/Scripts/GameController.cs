using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    public static GameController ins;

    [Header("Game State")]
    public bool isStartGame = false;
    public bool isPauseGame = false;
    public bool isEndGame = false;

    [Header("Enemy")]
    public GameObject[] enemyPrefab;              // Prefab enemy
    public List<GameObject> enemyList = new List<GameObject>();
    public int maxEnemyOnScene = 10;           // Giới hạn số enemy đang tồn tại

    [Header("Spawn Area & Time")]
    public BoxCollider spawnArea;              // Vùng collider dùng để spawn
    public float spawnInterval = 3f;           // Khoảng thời gian giữa mỗi lần spawn
    public bool autoSpawnOnStart = true;       // Tự động spawn khi game bắt đầu

    public PlayerChar playerChar;
    public int countEnemyDefeat = 0;

    [Header("Weapon Progress")]
    public Image weaponProgressFill;
    public GameObject[] weapons;
    [Range(0f, 100f)]
    public float progressAddPerEnemy = 20f;
    public float progressRequireAddPerWeapon = 50f;

    private float currentWeaponProgress = 0f;
    private int currentWeaponIndex = 0;
    private float currentWeaponRequire = 100f;

    [Header("Boss Countdown")]
    public TextMeshProUGUI bossCountdownText;
    public GameObject bossPrefab;
    public float bossSpawnCountdown = 30f;
    public float bossScaleMultiplier = 2f;

    private float currentBossCountdown;
    private bool isBossSpawned = false;
    private Coroutine spawnCoroutine;
    private Coroutine bossCountdownCoroutine;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        SetupWeapons();
        UpdateWeaponProgressUI();
        StartBossCountdown();

        if (autoSpawnOnStart)
        {
            StartSpawn();
        }
    }

    public void EnemyDead(GameObject enemy)
    {
        countEnemyDefeat++;
        AddWeaponProgress();

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

    private void SetupWeapons()
    {
        if (weapons == null || weapons.Length == 0)
        {
            return;
        }

        currentWeaponIndex = Mathf.Clamp(currentWeaponIndex, 0, weapons.Length - 1);

        for (int i = 0; i < weapons.Length; i++)
        {
            if (weapons[i] != null)
            {
                weapons[i].SetActive(i == currentWeaponIndex);
            }
        }
    }

    private void AddWeaponProgress()
    {
        if (weapons == null || weapons.Length == 0)
        {
            return;
        }

        if (currentWeaponIndex >= weapons.Length - 1)
        {
            return;
        }

        currentWeaponProgress += progressAddPerEnemy;

        if (currentWeaponProgress >= currentWeaponRequire)
        {
            currentWeaponProgress = 0f;
            ChangeNextWeapon();
        }

        UpdateWeaponProgressUI();
    }

    private void ChangeNextWeapon()
    {
        if (weapons == null || weapons.Length == 0)
        {
            return;
        }

        if (currentWeaponIndex >= weapons.Length - 1)
        {
            return;
        }

        if (weapons[currentWeaponIndex] != null)
        {
            weapons[currentWeaponIndex].SetActive(false);
        }

        currentWeaponIndex++;

        if (weapons[currentWeaponIndex] != null)
        {
            weapons[currentWeaponIndex].SetActive(true);
        }

        currentWeaponRequire = 100f + (progressRequireAddPerWeapon * currentWeaponIndex);

        if (currentWeaponIndex >= weapons.Length - 1)
        {
            print("endgame");
            LunaManager.ins.ShowEndCard();
        }
    }

    private void UpdateWeaponProgressUI()
    {
        if (weaponProgressFill == null)
        {
            return;
        }

        weaponProgressFill.fillAmount = Mathf.Clamp01(currentWeaponProgress / currentWeaponRequire);
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
    private void StartBossCountdown()
    {
        if (bossCountdownCoroutine == null)
        {
            bossCountdownCoroutine = StartCoroutine(BossCountdownRoutine());
        }
    }

    private IEnumerator BossCountdownRoutine()
    {
        currentBossCountdown = bossSpawnCountdown;
        UpdateBossCountdownUI();

        while (!isEndGame && !isBossSpawned && currentBossCountdown > 0f)
        {
            if (isStartGame && !isPauseGame)
            {
                currentBossCountdown -= Time.deltaTime;
                UpdateBossCountdownUI();
            }

            yield return null;
        }

        if (!isEndGame && !isBossSpawned)
        {
            SpawnBoss();
        }

        bossCountdownCoroutine = null;
    }

    private void UpdateBossCountdownUI()
    {
        if (bossCountdownText == null)
        {
            return;
        }

        int seconds = Mathf.CeilToInt(Mathf.Max(0f, currentBossCountdown));
        bossCountdownText.text = "BOSS APPEARS AFTER: " + seconds.ToString();
    }

    private void SpawnBoss()
    {
        if (bossPrefab == null)
        {
            Debug.LogWarning("bossPrefab chua duoc gan trong GameController!");
            return;
        }

        Vector3 spawnPos = GetRandomPointInBox(spawnArea);
        GameObject newBoss = Instantiate(bossPrefab, spawnPos, Quaternion.identity);
        newBoss.transform.rotation = Quaternion.Euler(0, 180, 0);
        newBoss.transform.localScale *= bossScaleMultiplier;
        enemyList.Add(newBoss);
        isBossSpawned = true;
    }

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

        GameObject newEnemy = Instantiate(enemyPrefab[Random.Range(0, enemyPrefab.Length)], posSpawn, Quaternion.identity);
        newEnemy.transform.rotation = Quaternion.Euler(0, 180, 0);
        enemyList.Add(newEnemy);
    }

    public void SetIdWeapon(int id)
    {
        playerChar.CraftWeapon(id);
    }
}
