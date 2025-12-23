using UnityEngine;
using TMPro;

public class PlayerGold : MonoBehaviour
{
    public static PlayerGold Instance { get; private set; } // Singleton

    public int currentGold = 100;

    [Header("UI")]
    public TextMeshProUGUI goldText;

    private void Awake()
    {
        // Đảm bảo chỉ có 1 instance
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
    }

    private void Start()
    {
        UpdateUI();
    }

    public void AddGold(int amount)
    {
        currentGold += amount;
        UpdateUI();
    }

    public bool SpendGold(int amount)
    {
        if (currentGold >= amount)
        {
            currentGold -= amount;
            UpdateUI();
            return true;
        }
        return false;
    }

    private void UpdateUI()
    {
        if (goldText != null)
        {
            goldText.text = "Gold: " + currentGold;
        }
    }
}