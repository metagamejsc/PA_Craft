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
    [LunaPlaygroundField("Số lần đặt block ra store")]public int countDropFinal;
     public int count;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("Range Light")] public float rangeLight;
    [LunaPlaygroundField("intensity Light")] public float intensityLight;
    public List<Light> lstLight;
    public List<Light> lstLight2;
   public float noiseIntensity=10;
    public float landNoiseScale=0.8f;
    public int treeCount=20;
    
    public int wallThickness=5;
    public int rangeBetweenIsland=10;
    public int isLandRadius=5;
    public bool isCretivePause;
    private void Awake()
    {
        ins = this;

    }
    
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    


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
        Invoke(nameof(ShowEndCard),timeEndCreative);
        for (int i = 0; i < lstLight.Count; i++)
        {
            lstLight[i].range = rangeLight;
        }
        for (int i = 0; i < lstLight2.Count; i++)
        {
            lstLight2[i].intensity = intensityLight;
        }
    }

    private void Update()
    {
        if (timeEndCreative - Time.timeSinceLevelLoad<=0)
        {
            return;
        }
        //txtTime.text= $"Time Left: {Mathf.CeilToInt(timeEndCreative - Time.timeSinceLevelLoad)}";
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

    public void ShowEndCard()
    {
        isCretivePause = true;
        AudioManager.ins.PlaySoundReward();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
