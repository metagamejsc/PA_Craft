using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TutorialBuildBlock : MonoBehaviour
{
    public GameObject step;
    public Button btnHideTutorial;

    public IEnumerator IeSpawnStep()
    {
        yield return new WaitForSeconds(1f);
        step.gameObject.SetActive(true);
    }

    private void Start()
    {
        MouseLook.ins.onClick += () =>
        {
            step.SetActive(false);
        };
        btnHideTutorial.onClick.AddListener(() =>
        {
            step.SetActive(false);
        });
        StartCoroutine(IeSpawnStep());
    }
}
