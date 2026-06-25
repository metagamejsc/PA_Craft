using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TutorialStepManager : MonoBehaviour
{
    [Tooltip("Danh sach cac step tutorial theo dung thu tu hien thi.")]
    public List<GameObject> steps = new List<GameObject>();

    [Tooltip("Tat ca button nay se hide step hien tai va show step tiep theo.")]
    public List<Button> nextButtons = new List<Button>();

    [Tooltip("Step bat dau khi scene chay.")]
    public int startStepIndex = 0;

    [Tooltip("Tu dong hien step bat dau trong Start.")]
    public bool showOnStart = true;

    [Tooltip("Neu het step, an luon step cuoi.")]
    public bool hideLastStepWhenFinished = true;

    private int currentStepIndex = -1;

    void Awake()
    {
        for (int i = 0; i < nextButtons.Count; i++)
        {
            if (nextButtons[i] != null)
            {
                nextButtons[i].onClick.AddListener(NextStep);
            }
        }
    }

    void Start()
    {
        if (showOnStart)
        {
            ShowStep(startStepIndex);
        }
    }

    void OnDestroy()
    {
        for (int i = 0; i < nextButtons.Count; i++)
        {
            if (nextButtons[i] != null)
            {
                nextButtons[i].onClick.RemoveListener(NextStep);
            }
        }
    }

    public void NextStep()
    {
        if (steps.Count == 0)
        {
            return;
        }

        if (IsValidStep(currentStepIndex) && steps[currentStepIndex] != null)
        {
            steps[currentStepIndex].SetActive(false);
        }

        int nextStepIndex = currentStepIndex + 1;
        if (IsValidStep(nextStepIndex))
        {
            ShowStep(nextStepIndex);
            return;
        }

        currentStepIndex = steps.Count;

        if (!hideLastStepWhenFinished && steps[steps.Count - 1] != null)
        {
            steps[steps.Count - 1].SetActive(true);
            currentStepIndex = steps.Count - 1;
        }
    }

    public void ShowStep(int stepIndex)
    {
        HideAllSteps();

        if (!IsValidStep(stepIndex))
        {
            currentStepIndex = -1;
            return;
        }

        currentStepIndex = stepIndex;

        if (steps[currentStepIndex] != null)
        {
            steps[currentStepIndex].SetActive(true);
        }
    }

    public void HideCurrentStep()
    {
        if (IsValidStep(currentStepIndex) && steps[currentStepIndex] != null)
        {
            steps[currentStepIndex].SetActive(false);
        }
    }

    public void HideAllSteps()
    {
        for (int i = 0; i < steps.Count; i++)
        {
            if (steps[i] != null)
            {
                steps[i].SetActive(false);
            }
        }
    }

    private bool IsValidStep(int stepIndex)
    {
        return stepIndex >= 0 && stepIndex < steps.Count;
    }
}
