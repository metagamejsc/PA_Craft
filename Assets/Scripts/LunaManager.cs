using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
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
    [LunaPlaygroundAsset("Bg Texture")] public Texture bgTexture;
    [LunaPlaygroundField("Bg color")] public Color bgColor=Color.white;
    
    [LunaPlaygroundAsset("Enviroment_1 Texture")] public Texture Enviroment_1Texture;
    [LunaPlaygroundField("Enviroment_1 color")] public Color Enviroment_1Color=Color.white;
    [LunaPlaygroundAsset("Enviroment_2 Texture")] public Texture Enviroment_2Texture;
    [LunaPlaygroundField("Enviroment_2 color")] public Color Enviroment_2Color=Color.white;
    [LunaPlaygroundAsset("Enviroment_3 Texture")] public Texture Enviroment_3Texture;
    [LunaPlaygroundField("Enviroment_3 color")] public Color Enviroment_3Color=Color.white;
    [LunaPlaygroundAsset("Enviroment_4 Texture")] public Texture Enviroment_4Texture;
    [LunaPlaygroundField("Enviroment_4 color")] public Color Enviroment_4Color=Color.white;
    [LunaPlaygroundAsset("Enviroment_5 Texture")] public Texture Enviroment_5Texture;
    [LunaPlaygroundField("Enviroment_5 color")] public Color Enviroment_5Color=Color.white;
    [LunaPlaygroundField("Enviroment_1 name")] public string Enviroment_1Name;
    [LunaPlaygroundField("Enviroment_2 name")] public string Enviroment_2Name;
    [LunaPlaygroundField("Enviroment_3 name")] public string Enviroment_3Name;
    [LunaPlaygroundField("Enviroment_4 name")] public string Enviroment_4Name;

    public RawImage bgImage,
        enviroment_1Image,
        enviroment_2Image,
        enviroment_3Image,
        enviroment_4Image,
        enviroment_5Image;

    public TextMeshProUGUI enviroment_1Text,
        enviroment_2Text,
        enviroment_3Text,
        enviroment_4Text;

    public bool isCretivePause;
    
    private void Awake()
    {
        ins = this;

    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    


 
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
        if (bgImage!=null)
        {
            if (bgTexture!=null)
            {
                bgImage.texture = bgTexture;
            }
            bgImage.color = bgColor;
        }
        if (enviroment_1Image!=null)
        {
            if (Enviroment_1Texture!=null)
            {
                enviroment_1Image.texture = Enviroment_1Texture;
            }
            enviroment_1Image.color = Enviroment_1Color;
        }
        if (enviroment_2Image!=null)
        {
            if (Enviroment_2Texture!=null)
            {
                enviroment_2Image.texture = Enviroment_2Texture;
            }
            enviroment_2Image.color = Enviroment_2Color;
        }
        if (enviroment_3Image!=null)
        {
            if (Enviroment_3Texture!=null)
            {
                enviroment_3Image.texture = Enviroment_3Texture;
            }
            enviroment_3Image.color = Enviroment_3Color;
        }
        if (enviroment_4Image!=null)
        {
            if (Enviroment_4Texture!=null)
            {
                enviroment_4Image.texture = Enviroment_4Texture;
            }
            enviroment_4Image.color = Enviroment_4Color;
        }
        if (enviroment_5Image!=null)
        {
            if (Enviroment_5Texture!=null)
            {
                enviroment_5Image.texture = Enviroment_5Texture;
            }
            enviroment_5Image.color = Enviroment_5Color;
        }
        if (enviroment_1Text!=null)
        {
            enviroment_1Text.text = Enviroment_1Name;
        }
        if (enviroment_2Text!=null)
        {
            enviroment_2Text.text = Enviroment_2Name;
        }
        if (enviroment_3Text!=null)
        {
            enviroment_3Text.text = Enviroment_3Name;
        }
        if (enviroment_4Text!=null)
        {
            enviroment_4Text.text = Enviroment_4Name;
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
