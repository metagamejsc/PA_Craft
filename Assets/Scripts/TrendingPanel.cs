using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TrendingPanel : MonoBehaviour
{
    public ModView[] modViews;
    public int currentIndex = 0;

    public void Start()
    {
        for (int i = 0; i < modViews.Length; i++)
        {
            modViews[i].GetComponent<Button>().onClick.AddListener(() =>
            {
                int index = i;
                currentIndex = i;
            });
            modViews[i].ID = i;
            modViews[i].SetValue(GameManager.ins.modData[i]);
        }
    }
}
