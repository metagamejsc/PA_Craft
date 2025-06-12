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
    public bool isCretivePause;
    public Image[] doTweenAnimations;
    
    [SerializeField] public GameObject UIBuilding,UIIngame;
    [SerializeField] public Camera camBuilding;
    [SerializeField] public GameObject startCard;
    
    public int houseIndex = 0;
    private void Awake()
    {
        ins = this;

    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    


    // Start is called before the first frame update
    void Start()
    {
        startCard.SetActive(true);
        camBuilding.gameObject.SetActive(false);
        UIBuilding.SetActive(false);
        UIIngame.SetActive(false);
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }

        for (int i = 0; i < doTweenAnimations.Length; i++)
        {
            int a = i;
            doTweenAnimations[i].GetComponent<Button>().onClick.AddListener(() =>
            {
                houseIndex = a;
                ShowUIBuilding();
            });
        }
        EndCard.SetActive(false);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
    }

    public void ShowUIBuilding()
    {
        startCard.SetActive(false);
        UIBuilding.SetActive(true);
        camBuilding.gameObject.SetActive(true);
        HousePreviewController.ins.InitPreviewHouse(index: houseIndex);
    }
    public void StartBuilding()
    {
        camBuilding.gameObject.SetActive(false);
        UIBuilding.SetActive(false);
        UIIngame.SetActive(true);
        HousePreviewController.BuildHouse();
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
