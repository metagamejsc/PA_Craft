using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;

    [LunaPlaygroundField("Time Show EndCard")] 
    public int timeEndCreative = 30;

    // --- STEP TIMES (6) ---
    [LunaPlaygroundField("Step 1 Time")] public float step1Time;
    [LunaPlaygroundField("Step 2 Time")] public float step2Time;
    [LunaPlaygroundField("Step 3 Time")] public float step3Time;
    [LunaPlaygroundField("Step 4 Time")] public float step4Time;
    [LunaPlaygroundField("Step 5 Time")] public float step5Time;
    [LunaPlaygroundField("Step 6 Time")] public float step6Time;

    // --- STEP TEXTS (6) ---
    [LunaPlaygroundField("Step 1 Text")] public string step1Text;
    [LunaPlaygroundField("Step 2 Text")] public string step2Text;
    [LunaPlaygroundField("Step 3 Text")] public string step3Text;
    [LunaPlaygroundField("Step 4 Text")] public string step4Text;
    [LunaPlaygroundField("Step 5 Text")] public string step5Text;
    [LunaPlaygroundField("Step 6 Text")] public string step6Text;

    [LunaPlaygroundField("Txt EndCard")] 
    public string txtEndCard;

    public TextMeshProUGUI tmp_EndCard;
    public List<TextMeshProUGUI> tmp_Steps;

    [LunaPlaygroundAsset("Video")] 
    public VideoClip videoClip;
    public VideoPlayer videoPlayer;

    public bool isCretivePause;

    public List<float> listTimeStep ;
    private List<string> txtSteps;

    public Button[] lstBtnInstall;
    public GameObject EndCard;

    void Awake()
    {
        ins = this;
        videoPlayer.clip = videoClip;
    }

    void Start()
    {
        

        // === Build Steps Dynamically (only non-empty texts and valid times) ===
        var allStepTimes = new float[] { step1Time, step2Time, step3Time, step4Time, step5Time, step6Time };
        var allStepTexts = new string[] { step1Text, step2Text, step3Text, step4Text, step5Text, step6Text };
        listTimeStep = new List<float>();
        txtSteps = new List<string>();
        for (int i = 0; i < 6; i++)
        {
            if (!string.IsNullOrEmpty(allStepTexts[i]))
            {
                txtSteps.Add(allStepTexts[i]);
                listTimeStep.Add(allStepTimes[i]);
            }
        }

        // === Apply Steps to UI ===
        for (int i = 0; i < tmp_Steps.Count && i < txtSteps.Count; i++)
        {
            tmp_Steps[i].gameObject.SetActive(true);
            tmp_Steps[i].text = txtSteps[i];
        }

        // Hide unused step texts
        for (int i = txtSteps.Count; i < tmp_Steps.Count; i++)
        {
            tmp_Steps[i].gameObject.SetActive(false);
        }

        tmp_EndCard.text = txtEndCard;
        EndCard.SetActive(false);

        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;

        foreach (var btn in lstBtnInstall)
        {
            btn.onClick.AddListener(OnClickEndCard);
        }

        Invoke(nameof(ShowEndCard), timeEndCreative);
    }

    public void PauseGameplay() => Time.timeScale = 0;
    public void ResumeGameplay() => Time.timeScale = 1;

    public void ShowEndCard()
    {
        isCretivePause = true;
        TutorialBuildBlock.ins.HideAllStep();
        EndCard.SetActive(true);
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
}
