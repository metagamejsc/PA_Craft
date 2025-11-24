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
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundAsset("BG")] public Texture2D textureBG;
    [LunaPlaygroundField("Color BG")] public Color colorBG=Color.white;
    
    [LunaPlaygroundAsset("Player")] public Texture2D texturePlayer;
    [LunaPlaygroundField("Color Player")] public Color colorPlayer=Color.white;
    [LunaPlaygroundField("txt Player")] public string strPlayer="Shooter";
    [LunaPlaygroundField("Color TXT Player")] public Color colorStrPlayer=Color.white;
    
    [LunaPlaygroundAsset("Monster")] public Texture2D textureMonster;
    [LunaPlaygroundField("Color Monster")] public Color colorMonster=Color.white;
    [LunaPlaygroundField("txt Monster")] public string strMonsters="Monster";
    [LunaPlaygroundField("Color TXT Monster")] public Color colorStrMonster=Color.white;
    [LunaPlaygroundAsset("Music")] public AudioClip musicGame;
    
    public RawImage rawImageBG;
    public TextMeshProUGUI txtPlayer;
    public TextMeshProUGUI txtMonster;
    public Image rawImagePlayer;
    public Image rawImageMonster;
    public AudioSource audioSourceMusic;

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
        Invoke(nameof(ShowEndCard),timeEndCreative);
        rawImageBG.texture = textureBG;
        rawImageBG.color = colorBG;
        
        rawImagePlayer.sprite = SpriteFromTexture(texturePlayer);
        rawImagePlayer.color = colorPlayer;
        txtPlayer.text = strPlayer;
        txtPlayer.color = colorStrPlayer;

        rawImageMonster.sprite = SpriteFromTexture(textureMonster);
        rawImageMonster.color = colorMonster;
        txtMonster.text = strMonsters;
        txtMonster.color = colorStrMonster;
        
        audioSourceMusic.clip = musicGame;
        audioSourceMusic.Play();
    }
    Sprite SpriteFromTexture(Texture2D tex)
    {
        if (tex == null) return null;
        return Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), Vector2.one * 0.5f);
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
