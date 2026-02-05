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
    public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    public int canReplay=0;
    public float playerSpeed=1.5f;
    public float playerJumpForce=40f;
     public float Lightning=5;
     public Color colorLight=Color.black;
    
    [LunaPlaygroundAsset("Music")] public AudioClip bgMusic;
    [LunaPlaygroundAsset("BG")] public Texture bgTexture;
    [LunaPlaygroundField("Color Bg")] public Color bgColor;
    [LunaPlaygroundField("Positon Text")] public Vector2 positionText;
    public RectTransform textRect;
    public RawImage bgImage;
    
    public float speedMonster=5f;
    public float timeSpawn=3f;
    public float starterGold=500;
    public Light directionalLight;
    public bool isCretivePause;
    public GameObject btnRestart;
    private void Awake()
    {
        ins = this;
    }
    public Button[] lstBtnInstall;
    public GameObject EndCard,EndCardEmpty;
    public GameObject WinCard;
    


    // Start is called before the first frame update
    void Start()
    {
        directionalLight.intensity = Lightning;
        directionalLight.color = colorLight;
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        EndCard.SetActive(false);
        EndCardEmpty.SetActive(false);
        WinCard.SetActive(false);
        btnRestart.SetActive(canReplay>=1);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
        SetTexture(bgImage,bgTexture);
        bgImage.color = bgColor;
        textRect.anchoredPosition = positionText;
    }
    public void SetTexture(RawImage raw,Texture tex)
    {
        var fitter = raw.GetComponent<AspectRatioFitter>();

        raw.texture = tex;

        if (tex != null)
        {
            fitter.aspectRatio = (float)tex.width / tex.height;
        }

        /*// đảm bảo phủ parent theo anchor
        var rt = (RectTransform)transform;
        rt.anchorMin = Vector2.zero;
        rt.anchorMax = Vector2.one;
        rt.offsetMin = Vector2.zero;
        rt.offsetMax = Vector2.zero;
        rt.pivot = new Vector2(0.5f, 0.5f);*/
    }
    public void ReplayGame()
    {
        canReplay--;
        btnRestart.SetActive(canReplay>=1);
        isCretivePause = false;
        EndCard.SetActive(false);
        var timeEndCreativeRemaining = timeEndCreative - Time.realtimeSinceStartup;
        if (timeEndCreativeRemaining<0)
        {
            timeEndCreativeRemaining = 5f;
        }
        Invoke(nameof(ShowEndCard), timeEndCreativeRemaining);
    }
   
    public void CheckClickShowEndCard()
    {
        countDrop++;
        if (countDrop>=countDropFinal && isCretivePause==false)
        {
            ShowEndCardEmpty();
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
        if (isCretivePause) return;
        isCretivePause = true;
        AudioManager.ins.PlayMusicLose();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowEndCardEmpty()
    {
        if (isCretivePause) return;
        isCretivePause = true;
        //AudioManager.ins.PlayMusicLose();
        EndCardEmpty.SetActive(true);
        Debug.Log("ShowEndCardEmpty");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowWinCard()
    {
        if (isCretivePause) return;
        isCretivePause = true;
        AudioManager.ins.PlayMusicWin();
        WinCard.SetActive(true);
        Debug.Log("Show win card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
