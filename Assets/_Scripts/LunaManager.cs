using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop = 0;
    public int countEnemyDead = 0;
    [LunaPlaygroundField("Number dino feeded to store")] public int countDropFinal = 20;
    public int countEnemyDeadFinal=20;
    [LunaPlaygroundField("Time")] public int timeEndCreative = 30;
    [LunaPlaygroundAsset("Music")] public AudioClip bgMusic;
    public int healthPlayer = 1;
   public float enemyHealth = 3f;
    public float enemyMoveSpeed = 2f;
    public float enemyPushbackDistance = 1.1f;

    [LunaPlaygroundField("Light Intensity")] public float lightIntensity = 1f;
    [LunaPlaygroundField("Light Color")] public Color colorLight = Color.white;
    public Light directionalLight;
    public bool isCretivePause;

    private void Awake()
    {
        ins = this;
    }

    public Button[] lstBtnInstall;
    public GameObject EndCard, EndCardEmpty;
    public GameObject WinCard;

    void Start()
    {
        directionalLight.intensity = lightIntensity;
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
        Invoke(nameof(ShowEndCard), timeEndCreative);
    }

    public void SetTexture(RawImage raw, Texture tex)
    {
        var fitter = raw.GetComponent<AspectRatioFitter>();

        raw.texture = tex;

        if (tex != null)
        {
            fitter.aspectRatio = (float)tex.width / tex.height;
        }
    }

    public void ReplayGame()
    {
        isCretivePause = false;
        EndCard.SetActive(false);
        var timeEndCreativeRemaining = timeEndCreative - Time.realtimeSinceStartup;
        if (timeEndCreativeRemaining < 0)
        {
            timeEndCreativeRemaining = 5f;
        }

        Invoke(nameof(ShowEndCard), timeEndCreativeRemaining);
    }

    public void RegisterPlayerShot()
    {
        countDrop++;
        if (countDropFinal > 0 && countDrop >= countDropFinal && isCretivePause == false)
        {
            ShowEndCardEmpty();
        }
    }

    public void RegisterEnemyKill()
    {
        countEnemyDead++;
        if (countEnemyDeadFinal > 0 && countEnemyDead >= countEnemyDeadFinal && isCretivePause == false)
        {
            ShowEndCardEmpty();
        }
    }

    public void CheckClickShowEndCard()
    {
        RegisterPlayerShot();
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
