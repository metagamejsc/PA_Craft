using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public static GameController ins;
    public bool isStartGame = false;
    public List<GameObject> enemyList = new List<GameObject>();
    public Transform posEndCamera;
    public bool isEndGame = false;
    public int ironCount;
    public UIManager uiManager;
    public GameObject startGame;
    public float timeActive;

    private void Awake()
    {
        ins = this;
        uiManager=UIManager.ins;
    }
    public void UpdateIronCount(int count)
    {
        ironCount += count;
        uiManager.updateironCount(ironCount);
    }
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            
            //isStartGame = true;
        }
    }

    private void OnTriggerStay(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            timeActive+= Time.deltaTime;
            startGame.transform.localScale = new Vector3((1 - timeActive), (1 - timeActive), (1 - timeActive));
            if (timeActive>=1f)
            {
                isStartGame = true;
                startGame.SetActive(false);
            }
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
        startGame.transform.localScale=Vector3.one;
        timeActive = 0;
        }
    }

    [ContextMenu("Camera")]
    public void CheckCamera()
    {
        AudioManager.ins.PlaySoundVictory();
        LunaManager.ins.ShowEndCard();
        if (Camera.main != null)
        {
            Camera.main.transform.DOMove(posEndCamera.position, 1f);
            Camera.main.transform.DORotate(posEndCamera.rotation.eulerAngles, 1f);
        }
    }
    private void Update()
    {
        enemyList.RemoveAll(enemy => enemy == null);
        if (enemyList.Count==0 && isEndGame==false)
        {
            isEndGame = true;
            CheckCamera();
        }
    }
}
