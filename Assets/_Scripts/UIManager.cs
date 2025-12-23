using UnityEngine;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance;
    public BuyMonsterUIController buyUI;

    void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);
    }

    public void ShowBuyUI(MonsterController monster)
    {
        buyUI.Show(monster);
    }

    public void HideBuyUI()
    {
        buyUI.Hide();
    }
}