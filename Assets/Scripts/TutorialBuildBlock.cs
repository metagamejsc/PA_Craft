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

    private void Awake()
    {
        ins = this;
    }

    public IEnumerator IeSpawnStep()
    {
        yield return new WaitForSeconds(1f);
    }

    private void Start()
    {
        HideAllTut();

        foreach (var button in lstButtonHideStep)
        {
            button.onClick.AddListener(() =>
            {
                HideStep();
            });
        }

        stepIndex = 0;
        ShowStep();
    }

    public void ShowStep()
    {
        if (stepIndex < 0 || stepIndex >= lstStep.Count)
            return;

        GameController.ins.isPauseGame = true;
        lstStep[stepIndex].SetActive(true);
    }

    public void HideStep()
    {
        if (stepIndex < 0 || stepIndex >= lstStep.Count)
            return;

        lstStep[stepIndex].SetActive(false);
        stepIndex++;

        if (stepIndex < lstStep.Count)
        {
            ShowStep();
        }
        else
        {
            GameController.ins.isPauseGame = false;
        }
    }

    public void HideAllTut()
    {
        foreach (var step in lstStep)
        {
            if (step != null)
                step.SetActive(false);
        }

        GameController.ins.isPauseGame = false;
    }
}