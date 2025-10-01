using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class TutorialBuildBlock : MonoBehaviour
{
    public static TutorialBuildBlock ins;
    public int stepIndex;
    public List<GameObject> lstStep;
    public List<Button> lstButtonHideStep;
    public VideoPlayer videoPlayer;
    public bool isPlayVideo;
    
    //public Button btnHideTutorial;

    private void Awake()
    {
        ins = this;
        
    }
    
    public void Update()
    {
        if (isPlayVideo)
        {
            if (stepIndex<LunaManager.ins.listTimeStep.Count)
            {
                if (videoPlayer.time>=LunaManager.ins.listTimeStep[stepIndex])
                {
                    PasueVideo();
                    ShowStep();
                }
            }
        }
    }
    public void PasueVideo()
    {
        videoPlayer.Pause();
        isPlayVideo = false;
    }
    public void ResumeVideo()
    {
        videoPlayer.Play();
        isPlayVideo = true;
    }

    private void Start()
    {
        foreach (var VARIABLE in lstStep)
        {
            VARIABLE.SetActive(false);
        }
        foreach (var VARIABLE in lstButtonHideStep)
        {
            VARIABLE.onClick.AddListener(() =>
            {
                HideStep();
            });
        }
        isPlayVideo = true;
        videoPlayer.loopPointReached+= (VideoPlayer vp) =>
        {
            LunaManager.ins.ShowEndCard();
        };
    }

    public void ShowStep()
    {
        PasueVideo();
        lstStep[stepIndex].SetActive(true);
        /*for (int i = 0; i < lstStep.Count; i++)
        {
            lstStep[i].SetActive(i==stepIndex);
        }*/
    }
    public void HideStep()
    {
        lstStep[stepIndex].SetActive(false);
        stepIndex++;
        ResumeVideo();
    }
}
