using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TutorialBuildBlock : MonoBehaviour
{
    public static TutorialBuildBlock ins;
    public GameObject baseRobot;
    public GameObject[] items;
    public GameObject[] types;

    void Awake()
    {
        ins = this;
    }
    void Start()
    {
        baseRobot.SetActive(true);
        foreach (GameObject item in items) item.SetActive(false);
        foreach (GameObject type in types) type.SetActive(false);
    }
    public void ClickButton(int index)
    {
        foreach (GameObject item in items) item.SetActive(false);
        foreach (GameObject type in types) type.SetActive(false);
        baseRobot.SetActive(true);
        items[index].SetActive(true);
        if (index == 2) baseRobot.SetActive(false);
        types[index].SetActive(true);
    }

}
