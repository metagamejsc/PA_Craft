using UnityEngine;

[RequireComponent(typeof(PlayerStats))]
public class PlayerPointsLabel : MonoBehaviour
{
    [SerializeField] private WorldValueLabelTMP worldLabel; // kéo thả script label (hoặc object có script đó)

    PlayerStats stats;

    void Awake()
    {
        stats = GetComponent<PlayerStats>();

        // nếu quên kéo thả, thử tự tìm
        if (worldLabel == null) worldLabel = GetComponentInChildren<WorldValueLabelTMP>(true);
    }

    void OnEnable()
    {
        if (stats != null) stats.OnPointsChanged += HandleChanged;
        // set ngay lần đầu
        if (stats != null && worldLabel != null) worldLabel.SetValue(stats.Points);
    }

    void OnDisable()
    {
        if (stats != null) stats.OnPointsChanged -= HandleChanged;
    }

    void HandleChanged(int newPoints)
    {
        if (worldLabel != null) worldLabel.SetValue(newPoints);
    }
}