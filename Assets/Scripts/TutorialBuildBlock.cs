using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TutorialBuildBlock : MonoBehaviour
{
    public GameObject step;

    public IEnumerator IeSpawnStep()
    {
        yield return new WaitForSeconds(1f);
        step.gameObject.SetActive(true);
    }

    private void Start()
    {
        /*MouseLook.ins.onClick += () =>
        {
            step.SetActive(false);
        };*/
        //StartCoroutine(IeSpawnStep());
    }
}
