using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TutorialBuildBlock : MonoBehaviour
{
    public static event Action OnTutorialCompleted;

    public static TutorialBuildBlock ins;
    public int stepIndex;
    public List<GameObject> lstStep;
    public List<Button> lstButtonHideStep;
    public bool IsTutorialCompleted=>stepIndex>=lstStep.Count;
    //public Button btnHideTutorial;

    public bool IsCompleted => lstStep == null || stepIndex >= lstStep.Count;

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
        if (!IsCompleted)
        {
            lstStep[stepIndex].SetActive(true);
        }
       
    }
    public void HideStep()
    {
        if (IsCompleted)
        {
            OnTutorialCompleted?.Invoke();
            return;
        }

        lstStep[stepIndex].SetActive(false);
        stepIndex++;
        if (!IsCompleted)
        {
            ShowStep();
        }
        else
        {
            OnTutorialCompleted?.Invoke();
        }
        /*if (stepIndex==lstStep.Count-1)
        {
           GameController.ins.SpawnEnemy(GameController.ins.playerChar.transform.position+Camera.main.transform.forward*8f+new Vector3(0,10,0));
           ShowStep();
        }*/
    }
}
