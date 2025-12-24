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
    [LunaPlaygroundField("NoiseIntensity")] public float noiseIntensity=10;
    [LunaPlaygroundField("LandNoiseScale")] public float landNoiseScale=0.8f;
    [LunaPlaygroundField("Tree Count")] public int treeCount=20;
    public bool isCretivePause;
    private void Awake()
    {
        ins = this;
    }
    
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    [LunaPlaygroundField("Bán kính đảo")]public float isLandRadius=10;
    public int wallThickness=5;
    [LunaPlaygroundField("Khoảng cách giữa 2 đảo")]public int rangeBetweenIsland = 10;
    [LunaPlaygroundAsset("BG Texture")]public Texture bgTexture;
    [LunaPlaygroundField("BG Color")]public Color bgColor=Color.white;
    public RawImage bgRawImage;
    public TextMeshProUGUI txtTime1,txtTime2;


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
        
        bgRawImage.texture = bgTexture;
        bgRawImage.color = bgColor;
    }

    private void Update()
    {
        if (!isCretivePause)
        {
            txtTime1.text = "Time Left: "+Mathf.Clamp(timeEndCreative - (int)Time.timeSinceLevelLoad, 0, timeEndCreative).ToString();
            txtTime2.text = "Time Left: "+Mathf.Clamp(timeEndCreative - (int)Time.timeSinceLevelLoad, 0, timeEndCreative).ToString();
        }
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
