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
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("Light")] public float intensityLight=0.2f;
    [LunaPlaygroundField("Color Light")] public Color colorLight=Color.white;
    [LunaPlaygroundField("Light Range")] public float lightRange=10f;
    public Light directionalLight;
    
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
        directionalLight.color=colorLight;
        directionalLight.intensity=intensityLight;
        directionalLight.range=lightRange;
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
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
