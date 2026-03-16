using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    public static GameController ins;
    public bool isPauseGame = false;

    public PlayerChar playerChar;

    public int idWeapon;
    public Mesh[] lstMeshWeapons;
    public int countEnemyDefeat = 0;

    public Transform posSpawnPlayer;
    public int countPlayerDie=0;
    public bool canRestart;
    public Button btnRestart;
    
    public void StartGame()
    {
        //playerChar.OnStartRespawn();
        playerChar.transform.position = posSpawnPlayer.position;
    }
    public void RestartGame()
    {
        if (canRestart)
        {
            if (countPlayerDie>=1)
            {
                LunaManager.ins.OnClickEndCard();
                return;
            }
        }
        else
        {
            LunaManager.ins.OnClickEndCard();
            return;
        }
       
        LunaManager.ins.ReplayGame();
        StartGame();
        countPlayerDie++;
    }
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
    }
    public void Start()
    {
        btnRestart.onClick.AddListener(RestartGame);
        canRestart= LunaManager.ins.canReplay >= 1;
    }
    
}
