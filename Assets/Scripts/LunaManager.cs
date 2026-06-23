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
    [LunaPlaygroundField("Số lần đặt block")] public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundField("NoiseIntensity")] public float noiseIntensity=10;
    [LunaPlaygroundField("LandNoiseScale")] public float landNoiseScale=0.8f;
    [LunaPlaygroundField("Tree Count")] public int treeCount=20;
    [LunaPlaygroundField("Light Instensity")] public float lightInstensity;
    [LunaPlaygroundField("Light Color")] public Color lightColor;
    public Light light;
    [LunaPlaygroundAsset("Music")] public AudioClip music;
    [LunaPlaygroundAsset("Music Volum")] public float musicVolume;
    public AudioSource musicSource;
    public bool isCretivePause;
    public Image[] doTweenAnimations;
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
        
        light.intensity = lightInstensity;
        light.color = lightColor;
        
        musicSource.clip = music;
        musicSource.loop = true;
        musicSource.volume = musicVolume;
        musicSource.Play();
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
        /*StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }*/
        StartCoroutine(IESelectBuilding());
        AudioManager.ins.PlaySoundReward();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        StopAllCoroutines();
        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            doTweenAnimations[i].color=Color.cyan;
        }
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
