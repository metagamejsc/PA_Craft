using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;

    [Header("[Player Stats]")]
    [LunaPlaygroundField("playerHealh")] public float playerHealh=100;
    [LunaPlaygroundField("playerDamage")] public float playerDamage=1;
    [Header("[Zombie Stats]")]
    [LunaPlaygroundField("zombieHealh")] public float zombieHealt=100;
    [LunaPlaygroundField("zombieDamage")] public float zombieDamage=1;
    [Header("[Golem Stats]")]
    [LunaPlaygroundField("golemHealh")] public float golemHealh=100;
    [LunaPlaygroundField("golemDamage")] public float golemDamage=1;
    [Header("[Man Stats]")]
    [LunaPlaygroundField("manHealh")] public float manHealh=100;
    [LunaPlaygroundField("manDamage")] public float manDamage=1;
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
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
    }

    public void CheckClickShowEndCard()
    {
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
