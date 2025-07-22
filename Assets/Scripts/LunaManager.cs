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
    [LunaPlaygroundField("Số enemy giết để bay ra store")] public int countDropFinal;
    [LunaPlaygroundField("CountDrop")] public int count;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("NoiseIntensity")] public float noiseIntensity=10;
    [LunaPlaygroundField("LandNoiseScale")] public float landNoiseScale=0.8f;
    [LunaPlaygroundField("Tree Count")] public int treeCount=20;
    public Image imgDotDiem;
    public bool isCretivePause;
    private void Awake()
    {
        ins = this;

    }
    public Button[] lstBtnInstall;
    public Button btnCampFire;
    public GameObject EndCard, winCard, loseCard;
    


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
        winCard.SetActive(false);
        loseCard.SetActive(false);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
    }

    public void TabSau2s()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }
    public void TabTruoc2s()
    {
        
        imgDotDiem.DOColor(Color.white, 1f);
        imgDotDiem.GetComponent<Button>().enabled = true;
        btnCampFire.gameObject.SetActive(false);
        EnableButton();
    }
    public void SetAmbient()
    {
        RenderSettings.ambientLight = new Color(0.2f, 0.3f, 0.5f);
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

    public void EnableButton()
    {
        winCard.GetComponent<Button>().enabled = true;
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
        Invoke(nameof(EnableButton),2f);
        AudioManager.ins.PlaySoundReward();
        winCard.SetActive(true);
        Debug.Log("Show winCard");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowLoseCard()
    {
        isCretivePause = true;
        AudioManager.ins.PlaySoundReward();
        loseCard.SetActive(true);
        Debug.Log("Show loseCard");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
