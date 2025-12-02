using UnityEngine;

public class Room : MonoBehaviour
{
    [Header("Walls")]
    public GameObject wallTop;
    public GameObject wallBottom;
    public GameObject wallLeft;
    public GameObject wallRight;

    [Header("Coin Settings")]
    public GameObject coinPrefab;          // Prefab coin
    [Range(0f, 1f)]
    public float coinSpawnChance = 0.5f;   // 0.5 = 50% phòng có coin
    public Transform coinSpawnPoint;       // Vị trí gốc để spawn coin (optional)

    [Header("Coin Group Settings")]
    public int minCoinsInGroup = 3;        // số coin ít nhất trong 1 group
    public int maxCoinsInGroup = 6;        // số coin nhiều nhất trong 1 group
    public float coinSpacing = 0.6f;       // khoảng cách giữa các coin

    // Hàm tiện để bật/tắt tường
    public void SetWalls(bool top, bool bottom, bool left, bool right)
    {
        if (wallTop != null) wallTop.SetActive(top);
        if (wallBottom != null) wallBottom.SetActive(bottom);
        if (wallLeft != null) wallLeft.SetActive(left);
        if (wallRight != null) wallRight.SetActive(right);
    }

    private void Start()
    {
        TrySpawnCoinGroup();
    }

    void TrySpawnCoinGroup()
    {
        if (coinPrefab == null) return;

        // Random: phòng này có coin hay không
        if (Random.value > coinSpawnChance) return;

        // Vị trí trung tâm để spawn group
        Vector3 centerPos = coinSpawnPoint != null ? coinSpawnPoint.position : transform.position;

        // Số lượng coin trong group
        int coinCount = Random.Range(minCoinsInGroup, maxCoinsInGroup + 1);

        // Hướng để xếp coin cạnh nhau (dùng trục X của room)
        Vector3 dir = transform.right; // có thể đổi thành transform.forward nếu muốn xếp theo Z

        // Tính vị trí bắt đầu sao cho group nằm cân giữa
        float totalLength = coinSpacing * (coinCount - 1);
        Vector3 startPos = centerPos - dir * (totalLength * 0.5f);

        for (int i = 0; i < coinCount; i++)
        {
            Vector3 spawnPos = startPos + dir * (i * coinSpacing);
            GameObject coin = Instantiate(coinPrefab, spawnPos, Quaternion.identity);
            coin.transform.SetParent(transform); // cho coin là con của Room cho gọn Hierarchy
        }
    }
}
