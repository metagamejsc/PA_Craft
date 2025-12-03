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
    public int ironCount;
    public GameObject startGame;
    public float timeActive;
    public GameObject enemy;
    public int idWeapon;
    public Mesh[] lstMeshWeapons;
    public int countEnemyDefeat = 0;

   
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
        
    }
}
