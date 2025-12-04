
using System.Collections.Generic;
using DG.Tweening;using UnityEngine;

public class GameController : MonoBehaviour
{
    public static GameController ins;
    public bool isPauseGame = false;
    public PlayerChar playerChar;
    public GameObject enemy;
    public int idWeapon;
    public int countEnemyDefeat = 0;

    public void EnemyDead()
    {
        countEnemyDefeat++;
        if (countEnemyDefeat>=LunaManager.ins.countDropFinal)
        {
            LunaManager.ins.ShowEndCard();
        }
    }
    private void Awake()
    {
        ins = this;
        //uiManager=UIManager.ins;
    }
    
    [ContextMenu("Camera")]
    public void CheckCamera()
    {
        
    }

    public void SpawnEnemy(Vector3 posSpawn)
    {
        enemy.transform.position = posSpawn;
    }

    public void SetIdWeapon(int id)
    {
        idWeapon = id;
        playerChar.CraftWeapon(id);
    }
}
