using UnityEngine;

public class MonsterBuyTrigger : MonoBehaviour
{
    public BuyMonsterUIController buyUI;
    [SerializeField] private MonsterController monster;

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player") && !monster.isBought)
        {
            buyUI.Show(monster);
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            buyUI.Hide();
        }
    }

    public void SetMonster(MonsterController controller)
    {
        monster = controller;
    }
}