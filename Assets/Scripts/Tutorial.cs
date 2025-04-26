using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tutorial : MonoBehaviour
{
    public static Tutorial ins;
    private void Awake()
    {
        ins = this;
        ShowNextStep();
    }
    
    
    public GameObject[] tutorialPanels;
    public int step = 0;

    public void NextStep()
    {
        tutorialPanels[step].SetActive(false);
        step++;
    }

    public void ShowNextStep()
    {
        for (int i = 0; i < tutorialPanels.Length; i++)
        {
            tutorialPanels[i].SetActive(i==step);
        }
    }
}
