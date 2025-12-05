using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop=0;
    [LunaPlaygroundField("Số lần vượt qua kính ra store")]public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("Có thể Replay (>=1 là true, 0 là false)")] public int canReplay=0;
    [LunaPlaygroundField("Lightning")] public float Lightning=5;
    [LunaPlaygroundField("Color Light")] public Color colorLight=Color.black;
    public Light directionalLight;
    public bool isCretiveEnd;
    public bool isCretivePause;
    public GameObject btnRestart;
    private void Awake()
    {
        ins = this;

    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    public GameObject WinCard;
    


    // Start is called before the first frame update
    void Start()
    {
        directionalLight.intensity = Lightning;
        directionalLight.color = colorLight;
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        EndCard.SetActive(false);
        WinCard.SetActive(false);
        btnRestart.GetComponent<Button>().onClick.AddListener(ReplayGame);
        btnRestart.GetComponent<Button>().onClick.AddListener(GameController.ins.SpawnPlayer);
        btnRestart.SetActive(canReplay>=1);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
    }
    public void ReplayGame()
    {
        canReplay--;
        countDrop = 0;
        btnRestart.SetActive(canReplay>=1);
        isCretiveEnd = false;
        EndCard.SetActive(false);
        var timeEndCreativeRemaining = timeEndCreative - Time.realtimeSinceStartup;
        if (timeEndCreativeRemaining<0)
        {
            timeEndCreativeRemaining = 5f;
        }
        Invoke(nameof(ShowEndCard), timeEndCreativeRemaining);
    }
   
    public void CheckClickShowEndCard()
    {
        countDrop++;
        if (countDrop>=countDropFinal && isCretiveEnd==false)
        {
            isCretiveEnd = true;
            ShowEndCard();
        }
    }
    // Update is called once per frame
    public void PauseGameplay()
    {
        Debug.Log("Pause game");
        Time.timeScale = 0;
    }

    public void ResumeGameplay()
    {
        Debug.Log("Load game");
        Time.timeScale = 1;
    }

    public void ShowEndCard()
    {
        if (isCretiveEnd) return;
        isCretiveEnd = true;
        AudioManager.ins.PlaySoundReward();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowLoseCard()
    {
        if (isCretiveEnd) return;
        isCretiveEnd = true;
        AudioManager.ins.PlayMusicLose();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowWinCard()
    {
        if (isCretiveEnd) return;
        isCretiveEnd = true;
        AudioManager.ins.PlaySoundReward();
        WinCard.SetActive(true);
        Debug.Log("Show win card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
