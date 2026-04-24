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
    public bool IsTutorialComplete { get; private set; }

    public static bool IsComplete
    {
        get
        {
            return ins == null || ins.IsTutorialComplete;
        }
    }
    //public Button btnHideTutorial;

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
        if (lstStep == null || lstStep.Count == 0)
        {
            CompleteTutorial();
            return;
        }

        foreach (var VARIABLE in lstStep)
        {
            if (VARIABLE != null)
            {
                VARIABLE.SetActive(false);
            }
        }

        if (lstButtonHideStep != null)
        {
            foreach (var VARIABLE in lstButtonHideStep)
            {
                if (VARIABLE != null)
                {
                    VARIABLE.onClick.AddListener(() =>
                    {
                        HideStep();
                    });
                }
            }
        }

        if (stepIndex < 0)
        {
            stepIndex = 0;
        }

        if (stepIndex >= lstStep.Count)
        {
            CompleteTutorial();
            return;
        }

        ShowStep();
        //StartCoroutine(IeSpawnStep());
    }

    public void ShowStep()
    {
        if (IsTutorialComplete || lstStep == null || stepIndex < 0 || stepIndex >= lstStep.Count)
        {
            return;
        }

        GameObject step = lstStep[stepIndex];
        if (step != null)
        {
            step.SetActive(true);
        }
    }
    public void HideStep()
    {
        if (IsTutorialComplete || lstStep == null || stepIndex < 0 || stepIndex >= lstStep.Count)
        {
            return;
        }

        GameObject step = lstStep[stepIndex];
        if (step != null)
        {
            step.SetActive(false);
        }
        stepIndex++;
        
        if (stepIndex<lstStep.Count)
        {
            ShowStep();
            return;
        }

        CompleteTutorial();
    }

    void CompleteTutorial()
    {
        IsTutorialComplete = true;
    }

    private void OnDestroy()
    {
        if (ins == this)
        {
            ins = null;
        }
    }
}
