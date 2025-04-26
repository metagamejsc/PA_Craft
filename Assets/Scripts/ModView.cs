using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ModView : MonoBehaviour
{
    public int ID;
    public Image icon;
    public TextMeshProUGUI txtType,txtName,txtDes,txtPercent,txtDownload,txtView,txtPublished;

    private void Start()
    {
        GetComponent<Button>().onClick.AddListener(OnClickButton);
    }

    public void SetValue(Sprite sp,string type,string name, string des, string percent, string download, string view, string published)
    {
        icon.sprite = sp;
        txtType.text= type;
        txtName.text = name;
        txtDes.text = des;
        txtPercent.text = percent;
        txtDownload.text = download;
        txtView.text = view;
        txtPublished.text = published;
    }
    public void SetValue(ModData data)
    {
        icon.sprite = data.icon;
        txtType.text= data.type;
        txtName.text = data.name;
        txtDes.text = data.des;
        txtPercent.text = data.percent;
        txtDownload.text = data.download;
        txtView.text = data.view;
        txtPublished.text = data.published;
    }

    public void OnClickButton()
    {
        GameManager.ins.modDataSelection = ID;
        Tutorial.ins.NextStep();
        Tutorial.ins.ShowNextStep();
    }
}
