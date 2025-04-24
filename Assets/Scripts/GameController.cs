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
    public UIManager uiManager;
    public GameObject startGame;
    public PlayerChar playerChar;
    public float timeActive;

    private void Awake()
    {
        ins = this;
        //uiManager=UIManager.ins;
    }
    
    [ContextMenu("Camera")]
    public void CheckCamera()
    {
        
       
    }
    private void Update()
    {
        
    }
}
