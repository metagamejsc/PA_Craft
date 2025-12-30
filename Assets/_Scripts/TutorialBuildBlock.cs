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
    public bool isTutorialCompleted=false;

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
        ShowStep();
        //StartCoroutine(IeSpawnStep());
    }

    public void ShowStep()
    {
        GameController.ins.isPauseGame = true;
        lstStep[stepIndex].SetActive(true);
    }
    public void HideStep()
    {
        GameController.ins.isPauseGame = false;
        lstStep[stepIndex].SetActive(false);
        stepIndex++;
        if (stepIndex<lstStep.Count)
        {
            ShowStep();
        }
        else
        {
            isTutorialCompleted = true;
        }
        /*if (stepIndex==lstStep.Count-1)
        {
           GameController.ins.SpawnEnemy(GameController.ins.playerChar.transform.position+Camera.main.transform.forward*8f+new Vector3(0,10,0));
           ShowStep();
        }*/
    }
}
