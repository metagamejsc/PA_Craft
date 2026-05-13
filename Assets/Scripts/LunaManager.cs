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

    [LunaPlaygroundField("Light Intensity")] public float LightIntensity = 1;
    [LunaPlaygroundField("Light Color")] public Color LightColor = Color.white;

    public Light light;
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
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
        /*for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].enabled = false;
        }*/
        //StartCoroutine(IESelectBuilding());
        light.intensity = LightIntensity;
        light.color = LightColor;
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
    

    private void FixedUpdate()
    {
        /*if (isCretivePause)
        {
            return;
        }
        timeActive += Time.fixedDeltaTime;
        if (timeActive>=0.92f)
        {
            timeActive = 0;
            for (int i = 0; i < doTweenAnimations.Length; i++)
            {
                doTweenAnimations[i].color = i==numberActive?Color.green:Color.cyan;
            }
            numberActive += 1;
            if (numberActive>=doTweenAnimations.Length)
            {
                numberActive = 0;
            }
        }*/
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
