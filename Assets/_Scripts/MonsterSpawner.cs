using UnityEngine;

public class MonsterSpawner : MonoBehaviour
{
    [Header("Spawn Settings")]
    public GameObject monsterPrefab;
    public Transform spawnPoint;
    public Transform endPoint;
    public BuyMonsterUIController sharedBuyUI;
    public float spawnInterval = 5f;

    [Header("Rarity Settings")]
    public MonsterRarityData[] rarityConfigs; // gán trong inspector

    private float timer;

    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= spawnInterval)
        {
            SpawnMonster();
            timer = 0f;
        }
    }

    void SpawnMonster()
    {
        GameObject monsterObj = Instantiate(monsterPrefab, spawnPoint.position, Quaternion.identity);

        MonsterController monster = monsterObj.GetComponent<MonsterController>();
        monster.SetTarget(endPoint);

        MonsterRarityData chosenRarity = GetRandomRarity();

        int price = Random.Range(chosenRarity.minPrice, chosenRarity.maxPrice);
        float gps = Random.Range(chosenRarity.minGoldPerSec, chosenRarity.maxGoldPerSec);

        monster.ApplyRarity(chosenRarity.rarity);
        monster.SetStats(price, gps);

        // Gán UI
        MonsterBuyTrigger trigger = monsterObj.GetComponentInChildren<MonsterBuyTrigger>();
        if (trigger != null)
        {
            trigger.buyUI = sharedBuyUI;
            trigger.SetMonster(monster);
        }
    }


    private MonsterRarityData GetRandomRarity()
    {
        float total = 0f;
        foreach (var data in rarityConfigs)
            total += data.spawnChance;

        float rand = Random.Range(0f, total);
        float cumulative = 0f;

        foreach (var data in rarityConfigs)
        {
            cumulative += data.spawnChance;
            if (rand <= cumulative)
                return data;
        }

        // fallback (rare trường hợp lỗi tỉ lệ)
        return rarityConfigs[0];
    }
}

public enum Rarity
{
    Normal,
    Rare,
    Epic,
    Legendary
}
[System.Serializable]
public class MonsterRarityData
{
    public Rarity rarity;
    public float minGoldPerSec;
    public float maxGoldPerSec;
    public int minPrice;
    public int maxPrice;
    public Material material; // mỗi bậc một material riêng
    [Range(0, 1)]
    public float spawnChance; // tỉ lệ xuất hiện
}
