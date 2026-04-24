using System;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class ChooseOptionVideo : MonoBehaviour
{
    [Serializable]
    private class ChoiceStep
    {
        public GameObject stepRoot;
        public Button optionButton1;
        public Button optionButton2;
        public VideoClip option1Clip;
        public VideoClip option2Clip;
    }

    [Header("Steps")]
    [SerializeField] private ChoiceStep[] steps;

    [Header("Video UI")]
    [SerializeField] private GameObject videoRoot;

    [Header("Video")]
    [SerializeField] private VideoPlayer videoPlayer;
    [SerializeField] private RawImage videoOutput;
    [SerializeField] private RenderTexture renderTexture;

    private int currentStepIndex;
    private int currentOptionIndex = -1;

    private void Awake()
    {
        for (int i = 0; i < steps.Length; i++)
        {
            int stepIndex = i;

            if (steps[i].optionButton1 != null)
            {
                steps[i].optionButton1.onClick.AddListener(() => PlayOption(stepIndex, 0));
            }

            if (steps[i].optionButton2 != null)
            {
                steps[i].optionButton2.onClick.AddListener(() => PlayOption(stepIndex, 1));
            }
        }

        if (videoPlayer != null)
        {
            videoPlayer.playOnAwake = false;
            videoPlayer.isLooping = false;
            videoPlayer.loopPointReached += OnVideoFinished;
        }
    }

    private void Start()
    {
        currentStepIndex = 0;
        ShowCurrentStep();
    }

    private void OnDestroy()
    {
        if (videoPlayer != null)
        {
            videoPlayer.loopPointReached -= OnVideoFinished;
        }
    }

    public void PlayOption(int stepIndex, int optionIndex)
    {
        if (stepIndex != currentStepIndex)
        {
            return;
        }

        if (stepIndex < 0 || stepIndex >= steps.Length)
        {
            Debug.LogWarning("ChooseOptionVideo: Invalid step index.");
            return;
        }

        VideoClip clip = optionIndex == 0 ? steps[stepIndex].option1Clip : steps[stepIndex].option2Clip;
        currentOptionIndex = optionIndex;
        PlayVideo(clip);
    }

    private void PlayVideo(VideoClip clip)
    {
        if (videoPlayer == null)
        {
            Debug.LogWarning("ChooseOptionVideo: Missing VideoPlayer.");
            return;
        }

        if (clip == null)
        {
            Debug.LogWarning("ChooseOptionVideo: Missing VideoClip.");
            return;
        }

        if (videoOutput != null && renderTexture != null)
        {
            videoOutput.texture = renderTexture;
        }

        videoPlayer.Stop();
        videoPlayer.clip = clip;
        videoPlayer.targetTexture = renderTexture;
        videoPlayer.isLooping = currentStepIndex >= steps.Length - 1;

        HideAllSteps();

        if (videoRoot != null)
        {
            videoRoot.SetActive(true);
        }

        videoPlayer.Play();
    }

    private void OnVideoFinished(VideoPlayer source)
    {
        Debug.Log($"done - step {currentStepIndex + 1} - option {currentOptionIndex + 1}");

        if (currentStepIndex >= steps.Length - 1)
        {
            return;
        }

        currentStepIndex++;
        ShowCurrentStep();
    }
    public void EndCardStep()
    {

    }

    private void ShowCurrentStep()
    {
        if (videoPlayer != null)
        {
            videoPlayer.Stop();
            videoPlayer.isLooping = false;
        }

        HideAllSteps();

        if (currentStepIndex >= 0 && currentStepIndex < steps.Length && steps[currentStepIndex].stepRoot != null)
        {
            steps[currentStepIndex].stepRoot.SetActive(true);
        }

        if (videoRoot != null)
        {
            videoRoot.SetActive(false);
        }
    }

    private void HideAllSteps()
    {
        for (int i = 0; i < steps.Length; i++)
        {
            if (steps[i].stepRoot != null)
            {
                steps[i].stepRoot.SetActive(false);
            }
        }
    }
}
