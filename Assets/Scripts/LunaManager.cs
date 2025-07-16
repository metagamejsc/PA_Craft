using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop=0;
    /*[LunaPlaygroundField("CountDrop")] */public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    /*[LunaPlaygroundField("NoiseIntensity")] */public float noiseIntensity=10;
    /*[LunaPlaygroundField("LandNoiseScale")] */public float landNoiseScale=0.8f;
    public Image[] doTweenAnimations;
    public bool isCretivePause;
    public float timeActive = 0;
    public int numberActive = 0;
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
        Invoke(nameof(ShowEndCard),timeEndCreative);
      
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
        StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }
        AudioManager.ins.PlaySoundReward();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        HandPointerController.instance.StopHandPointer();
        Debug.Log("Click end card");
        StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }
        Luna.Unity.Playable.InstallFullGame();
    }

}
