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
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("Light Intensity")] public float lightIns=1;
    [LunaPlaygroundField("Color Light")] public Color color=Color.white;
    [LunaPlaygroundField("Speed Enemy")] public float speedEnemy = 1.5f;
    public Light light;
    public bool isCretivePause;
    private void Awake()
    {
        ins = this;

    }
    
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    public GameObject WindCard;
    


    // Start is called before the first frame update
    void Start()
    {
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        EndCard.SetActive(false);
        //SetupField();
        light.intensity = lightIns;
        light.color = color;
        ApplyEnemySpeed();
        Invoke(nameof(ShowEndCard),timeEndCreative);
    }

    private void Update()
    {
       
    }

    public void CheckClickShowEndCard()
    {
        /*countDrop++;
        if (countDrop>=countDropFinal && isCretivePause==false)
        {
            isCretivePause = true;
            ShowEndCard();
        }*/
    }

    private void ApplyEnemySpeed()
    {
        DraggableEnemy[] enemies = FindObjectsOfType<DraggableEnemy>();
        for (int i = 0; i < enemies.Length; i++)
        {
            enemies[i].SetApproachSpeed(speedEnemy);
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
        isCretivePause = true;
        AudioManager.ins.PlaySoundReward();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void ShowWinCard()
    {
        isCretivePause = true;
        //AudioManager.ins.PlaySoundReward();
        WindCard.SetActive(true);
        Debug.Log("Show win card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
