using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{
    public static UIManager ins;

    [SerializeField] public Button btnStartCard;
    [SerializeField] public float timeCurrent=59;
    [SerializeField] public TextMeshProUGUI txtTime;
    [SerializeField] public TextMeshProUGUI txtIronCount;
    private void Awake()
    {
        ins = this;
    }

    private void Update()
    {
        /*if (timeCurrent>=0)
        {
            timeCurrent -= Time.deltaTime;
            txtTime.text = "00:" + (int)timeCurrent;
        }
        else
        {
            txtTime.text = "00:00";
        }*/
    }
    public void updateironCount(int count)
    {
        txtIronCount.text = "x"+count.ToString();
    }
    private void Start()
    {
        //btnRetry.onClick.AddListener(ReStart);
        //losePanel.SetActive(false);f
        btnStartCard.gameObject.SetActive(true);
        btnStartCard.onClick.AddListener(() =>
        {
            btnStartCard.gameObject.SetActive(false);
        });
        updateironCount(GameController.ins.ironCount);
    }
}