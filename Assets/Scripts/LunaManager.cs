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
    
    [LunaPlaygroundAsset("Music Audio")] public AudioClip musicClip;
    [LunaPlaygroundField("Music Volum")] public float musicVolume;
    public AudioSource musicSource;
    

    public RawImage bgImage;
    
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
                SetTexture(bgImage,bgTexture);
            }
            bgImage.color = bgColor;
        }

        if (musicClip!=null)
        {
            musicSource.clip = musicClip;
            musicSource.volume = musicVolume;
            musicSource.Play();
        }
        
        //textRect.anchoredPosition = positionText;
        /*rawImageMonster.sprite = SpriteFromTexture(textureMonster);
        rawImageMonster.color = colorMonster;*/
    }

    Sprite SpriteFromTexture(Texture2D tex)
{
    if (tex == null) return null;
    return Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), Vector2.one * 0.5f);
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
        //AudioManager.ins.PlaySoundReward();
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
