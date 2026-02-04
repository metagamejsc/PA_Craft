using System;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    public static GameController ins;

    public PlayerChar playerChar;
    public Transform posSpawnPlayer;
    public bool isPauseGame;

    public Button btnRestart;
    public bool canRestart;
    public int countPlayerDie = 0;
    
    [Header("Black Screen")]
    public GameObject blackImage; // Image/Panel màn đen (full screen)

    [Header("Black Fade (IN/OUT)")]
    public float blackFadeIn = 0.25f;
    public float blackHold = 0.05f;     // giữ đen 1 chút (tuỳ chọn)
    public float blackFadeOut = 0.25f;

    private CanvasGroup blackGroup;
    private Sequence blackSeq;

    private bool monster1DeathSequencePlayed;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        btnRestart.onClick.AddListener(RestartGame);
        canRestart = LunaManager.ins.canReplay >= 1;

    }

    private void OnDestroy()
    {
        blackSeq?.Kill();
        blackGroup?.DOKill();
    }
    
    

    public void StartGame()
    {
        playerChar.OnStartRespawn();
        playerChar.transform.position = posSpawnPlayer.position;
    }

    public void RestartGame()
    {
        if (canRestart)
        {
            if (countPlayerDie >= 1)
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

    
}
