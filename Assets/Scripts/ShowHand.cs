using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ShowHand : MonoBehaviour
{
    public GameObject[] lstHand;
    public Image[] bg;
    public int id;
    void Start()
    {
        StartCoroutine(ShowEachHand());
    }

    // Update is called once per frame
    private void OnDisable()
    {
        //StopAllCoroutines();
    }

    private IEnumerator ShowEachHand()
    {
        while (true)
        {
            id++;
            if (id>= lstHand.Length)
            {
                id = 0;
            }
            for (int i = 0; i < lstHand.Length; i++)
            {
                lstHand[i].SetActive(id==i);
                bg[i].color= id==i ? Color.green : Color.white;
            }
            yield return new WaitForSeconds(1);
        }
    }
    
}
