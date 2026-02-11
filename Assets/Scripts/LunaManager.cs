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
    [LunaPlaygroundField("Click to store")] public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("Light Color")] public Color lightColor=Color.white;
    [LunaPlaygroundField("Light Instensity")] public float lightInstensity=1;
    public Light mainLight;
    
    public bool isCretivePause;

    [LunaPlaygroundAsset("BG")] public Texture bgTexture;
    [LunaPlaygroundField("Color Bg")] public Color bgColor;
    public RawImage bgImage;
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
        mainLight.color=lightColor;
        mainLight.intensity=lightInstensity;
        
        SetTexture(bgImage,bgTexture);
        bgImage.color = bgColor;
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
    public void SetTexture(RawImage raw,Texture tex)
    {
        var fitter = raw.GetComponent<AspectRatioFitter>();

        raw.texture = tex;

        if (tex != null)
        {
            fitter.aspectRatio = (float)tex.width / tex.height;
        }
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
