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
    public int currentStep;
    public GameObject UIJump;
    public GameObject deadPanel;

    public void ReSpawnPlayer()
    {
        countReSpawn++;
        currentStep = 0;
        deadPanel.SetActive(false);
        UIJump.SetActive(true);
        playerChar.transform.position = posReSpawn.position;
        playerChar.gameObject.SetActive(true);
        playerChar.health = 1;
        playerChar.isDead = false;
    }

    public void SpawnPlayer()
    {
        playerChar.ResetPlayer();
    }
    // private void Start()
    // {
    //     reSpawnMax = LunaManager.ins.countReSpawnFinal;
    // }

    public void SelectSideBrigde(bool isLeft)
    {
        if (countReSpawn >= reSpawnMax)
        {
            LunaManager.ins.ShowEndCard();
            return;
        }
        playerChar.SetJump();
        if (isLeft)
        {
            UIJump.gameObject.SetActive(false);
            playerChar.transform.DOJump(BridgeManager.ins.glassLines[currentStep].LeftPos().position + new Vector3(0, 1.4f, 0), 5, 1, 1f)
                .OnComplete(() =>
                {
                    playerChar.SetIdle();
                });
        }
        else
        {
            UIJump.gameObject.SetActive(false);
            playerChar.transform.DOJump(BridgeManager.ins.glassLines[currentStep].RightPos().position + new Vector3(0, 1.4f, 0), 5, 1, 1f).OnComplete(() =>
            {
                playerChar.SetIdle();
            });
        }
    }

    private void Awake()
    {
        ins = this;

    }
}
