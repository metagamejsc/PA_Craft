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
    [LunaPlaygroundField("CountDrop")] public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    /*/*[LunaPlaygroundField("NoiseIntensity")] #1#public float noiseIntensity=10;
    /*[LunaPlaygroundField("LandNoiseScale")] #1#public float landNoiseScale=0.8f;*/
    public Image[] doTweenAnimations;
    public bool isCretivePause;
    public float timeActive = 0;
    public int numberActive = 0;
    public GameObject lava;
    public Tween lavaTween;
    private void Awake()
    {
        ins = this;

    }
    public Button[] lstBtnInstall;
    public GameObject StartCard;
    public GameObject EndCard;
    public GameObject WinCard;
    


    // Start is called before the first frame update
    void Start()
    {
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        StartCard.SetActive(true);
        EndCard.SetActive(false);
        WinCard.SetActive(false);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
        /*for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].enabled = false;
        }*/
        //StartCoroutine(IESelectBuilding());
        lavaTween=lava.transform.DOMoveY(lava.transform.position.y+4.9f, timeEndCreative).SetEase(Ease.Linear).SetLoops(1).OnComplete(() =>
        {
            ShowEndCard();
        });
    }

    public void CheckClickShowEndCard()
    {
        countDrop++;
        if (countDrop>=countDropFinal && isCretivePause==false)
        {
            ShowEndCard();
        }
    }
    

    private void FixedUpdate()
    {
        /*if (isCretivePause)
        {
            return;
        }
        timeActive += Time.fixedDeltaTime;
        if (timeActive>=0.92f)
        {
            timeActive = 0;
            for (int i = 0; i < doTweenAnimations.Length; i++)
            {
                doTweenAnimations[i].color = i==numberActive?Color.green:Color.cyan;
            }
            numberActive += 1;
            if (numberActive>=doTweenAnimations.Length)
            {
                numberActive = 0;
            }
        }*/
    }

    public IEnumerator IESelectBuilding()
    {
        
        int number = 0;
        while (true)
        {
            
            yield return new WaitForSeconds(0.92f);
            AudioManager.ins.PlaySoundClick();
            doTweenAnimations[number].color = Color.green;
            for (int i = 0; i < doTweenAnimations.Length; i++)
            {
                yield return null;
                if (i!=number)
                {
                    doTweenAnimations[i].color=Color.cyan;
                }
            }
            number++;
            if (number>=doTweenAnimations.Length)
            {
                number = 0;
            }
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
        
        DOTween.KillAll();
        StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }
        AudioManager.ins.PlaySoundReward();
        if ( isCretivePause!=true)
        {
            isCretivePause = true;
            EndCard.SetActive(true);
        }
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowWinCard()
    {
        
        AudioManager.ins.PlaySoundReward();
        DOTween.KillAll();
        StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }
        AudioManager.ins.PlaySoundReward();
        if ( isCretivePause!=true)
        {
            isCretivePause = true;
            WinCard.SetActive(true);
        }
        Debug.Log("Show WinCard");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void OnClickEndCard()
    {
        DOTween.KillAll();
        Debug.Log("Click end card");
        isCretivePause = true;
        StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }
        Luna.Unity.Playable.InstallFullGame();
    }

}
