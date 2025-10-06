using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public static GameController ins;
    public bool isStartGame = false;
    public bool isPauseGame = false;
    public List<GameObject> enemyList = new List<GameObject>();
    public Transform posEndCamera;
    public bool isEndGame = false;
    public GameObject startGame;
    public PlayerChar playerChar;

    public GameObject enemy;
    public int idWeapon;
    public Mesh[] lstMeshWeapons;
  
    public Transform posReSpawn;
    public int countReSpawn = 0;
    public int reSpawnMax;

    public void EnemyDead()
    {
        
    }
    public void ReSpawnPlayer()
    {
        if (countReSpawn>=reSpawnMax)
        {
            LunaManager.ins.ShowEndCard();
            return;
        }
        countReSpawn++;
        playerChar.transform.position = posReSpawn.position;
        playerChar.gameObject.SetActive(true);
        playerChar.health = 1;
        playerChar.isDead = false;
        
    }

    private void Start()
    {
        reSpawnMax = LunaManager.ins.countReSpawnFinal;
    }
    private void Awake()
    {
        ins = this;
       
    }
}
