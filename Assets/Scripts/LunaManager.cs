using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop=0;
    public int countDropFinal;
    public int count;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("Có thể Replay (>=1 là true, 0 là false)")] public int canReplay=0;
    [LunaPlaygroundField("Player Speed")] public float playerSpeed=10f;
    [LunaPlaygroundField("Enemy Speed")] public float enemySpeed=5f;
    [LunaPlaygroundField("Player JumpForce")] public float playerJumpForce=40f;
    [LunaPlaygroundField("Lightning")] public float Lightning=5;
    [LunaPlaygroundField("Color Light")] public Color colorLight=Color.black;
    public Light directionalLight;
    public float noiseIntensity=10;
    public float landNoiseScale=0.8f;
    public int treeCount=20;
    public bool isCretivePause=false;
    public bool isEndGame = false;
    public GameObject btnRestart;
    public TextMeshProUGUI txtTimeCountDown;
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
        btnRestart.SetActive(canReplay>=1);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
    }

    private void Update()
    {
        if (timeEndCreative - Time.realtimeSinceStartup>0)
        {
            txtTimeCountDown.text = "00:"+((int)(timeEndCreative - Time.realtimeSinceStartup)).ToString();
        }
        else
        {
            txtTimeCountDown.text = "00:00";
        }
        
    }

    public void ReplayGame()
    {
        canReplay--;
        btnRestart.SetActive(canReplay>=1);
        isCretivePause = false;
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
        if (countDrop>=countDropFinal && isCretivePause==false)
        {
            isCretivePause = true;
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

    public void ShowEndCard(float delay=0)
    {
        if (isCretivePause) return;
        OnClickEndCard();
        isCretivePause = true;
        isEndGame = true;
        AudioManager.ins.PlaySoundLose();
        Invoke(nameof(ShowObjectLoseCard),delay);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowWinCard(float delay=0)
    {
        if (isCretivePause) return;
        isCretivePause = true;
        isEndGame = true;
        AudioManager.ins.PlaySoundReward();
        Invoke(nameof(ShowObjectWinCard),delay);
        Debug.Log("Show win card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowObjectWinCard( )
    {
        WinCard.SetActive(true);
    }
    public void ShowObjectLoseCard( )
    {
        EndCard.SetActive(true);
    }
    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
