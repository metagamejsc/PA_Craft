using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class LevelProgressUI : MonoBehaviour
{
    [Header("References")]
    public Transform player;
    public Transform startPoint;
    public Transform finishPoint;

    [Header("UI")]
    public Image fillImage;
    public TMP_Text progressText; // nếu dùng TextMeshPro
    // public Text progressText;   // mở dòng này nếu bạn dùng UI Text thường

    float totalDistance;

    void Start()
    {
        if (startPoint == null || finishPoint == null || player == null)
        {
            Debug.LogWarning("LevelProgressUI: thiếu reference.");
            return;
        }

        // Chỉ tính trên mặt phẳng XZ để không bị ảnh hưởng bởi jump
        totalDistance = Vector3.Distance(
            new Vector3(startPoint.position.x, 0, startPoint.position.z),
            new Vector3(finishPoint.position.x, 0, finishPoint.position.z)
        );

        UpdateProgress();
    }

    void Update()
    {
        UpdateProgress();
    }

    void UpdateProgress()
    {
        if (totalDistance <= 0f) return;

        Vector3 startPos = new Vector3(startPoint.position.x, 0, startPoint.position.z);
        Vector3 finishPos = new Vector3(finishPoint.position.x, 0, finishPoint.position.z);
        Vector3 playerPos = new Vector3(player.position.x, 0, player.position.z);

        Vector3 dir = (finishPos - startPos).normalized;
        float playerProgress = Vector3.Dot(playerPos - startPos, dir);

        float percent = Mathf.Clamp01(playerProgress / totalDistance);

        if (fillImage != null)
            fillImage.fillAmount = percent;

        if (progressText != null)
            progressText.text = $"Progress: {Mathf.RoundToInt(percent * 100f)}%";
    }
}