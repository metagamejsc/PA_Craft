using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TutorialBuildBlock : MonoBehaviour
{
    public static TutorialBuildBlock ins;
    public int stepIndex;
    public List<GameObject> lstStep;
    public List<Button> lstButtonHideStep;

    [Header("Auto Fight")]
    [SerializeField] private AutoFightInventoryRandomizer autoFightInventoryRandomizer;
    [SerializeField] private AutoFightArenaManager autoFightArenaManager;
    [SerializeField] private bool startAutoFightAfterTutorial = true;

    private bool tutorialCompleted;

    private void Awake()
    {
        ins = this;

        if (!startAutoFightAfterTutorial)
        {
            return;
        }

        //autoFightInventoryRandomizer?.HoldUntilManualStart();
        //autoFightArenaManager?.SetStartLocked(true);
    }

    public IEnumerator IeSpawnStep()
    {
        yield return new WaitForSeconds(1f);
        
    }

    private void Start()
    {
        if (lstStep != null)
        {
            foreach (var step in lstStep)
            {
                if (step != null)
                {
                    step.SetActive(false);
                }
            }
        }

        if (lstButtonHideStep != null)
        {
            foreach (var button in lstButtonHideStep)
            {
                if (button == null)
                {
                    continue;
                }

                button.onClick.AddListener(HideStep);
            }
        }

        if (lstStep == null || lstStep.Count == 0)
        {
            OnTutorialCompleted();
            return;
        }

        stepIndex = Mathf.Clamp(stepIndex, 0, lstStep.Count - 1);
        ShowStep();
    }

    public void ShowStep()
    {
        if (tutorialCompleted || lstStep == null || stepIndex < 0 || stepIndex >= lstStep.Count)
        {
            return;
        }

        var step = lstStep[stepIndex];
        if (step != null)
        {
            step.SetActive(true);
        }
    }

    public void HideStep()
    {
        if (tutorialCompleted)
        {
            return;
        }

        if (lstStep == null || lstStep.Count == 0)
        {
            OnTutorialCompleted();
            return;
        }

        if (stepIndex >= 0 && stepIndex < lstStep.Count)
        {
            var currentStep = lstStep[stepIndex];
            if (currentStep != null)
            {
                currentStep.SetActive(false);
            }
        }

        stepIndex++;
        if (stepIndex < lstStep.Count)
        {
            ShowStep();
            return;
        }

        OnTutorialCompleted();
    }

    private void OnTutorialCompleted()
    {
        if (tutorialCompleted)
        {
            return;
        }

        tutorialCompleted = true;
        if (!startAutoFightAfterTutorial)
        {
            return;
        }

        if (autoFightInventoryRandomizer != null)
        {
            autoFightInventoryRandomizer.StartRandomRoll();
            return;
        }

        if (autoFightArenaManager != null)
        {
            autoFightArenaManager.SetStartLocked(false);
            autoFightArenaManager.BeginBattle();
        }
    }
}
