using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    [LunaPlaygroundField("Time")]           public int timeEndCreative=30;
    [LunaPlaygroundAsset("Video")]          public VideoClip videoClip;
    [LunaPlaygroundField("Video Volume")]           public float videoVolume;
    
    [LunaPlaygroundAsset("Music Clip")]          public AudioClip musicClip;
   
    [LunaPlaygroundField("Music Volume")]           public float musicVolume;
    [LunaPlaygroundAsset("Texture 1")] public Texture2D texture1;
    [LunaPlaygroundField("Color Texture 1")]          public Color colorTexture1;
    [LunaPlaygroundAsset("Texture 2")]          public Texture2D texture2;
    [LunaPlaygroundField("Color Texture 2")]          public Color colorTexture2;
    public RawImage image1, image2;
    [LunaPlaygroundField("Time Show Select Weapon")]     public float timeShowSelectWeapon=2f;

    public bool isCretivePause;
    public VideoPlayer video;
    public AudioSource musicSource;
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
        video.clip = videoClip;
        //video.audioOutputMode = VideoAudioOutputMode.Direct;
        video.EnableAudioTrack(0, true);
        video.SetDirectAudioVolume(0, videoVolume);
        
        musicSource.clip = musicClip;
        musicSource.volume = musicVolume;
        musicSource.Play();
        image1.texture = texture1;
        image2.texture = texture2;
        image1.color = colorTexture1;
        image2.color = colorTexture2;
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
