using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ModView : MonoBehaviour
{
    public int ID;
    public Image icon,gallary;
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
        if (icon != null) icon.sprite = data.icon;
        
        if (gallary != null) gallary.sprite = data.gallary;
        
        if (txtType != null) txtType.text = data.type;
        
        if (txtName != null) txtName.text = data.nameMod;

        if (txtDes != null)
        {
            string processedText = data.des;
            processedText=ReplaceDoubleSpaceWithNewline(processedText);
            Debug.Log(processedText);
            txtDes.text= processedText;
        }

        if (txtPercent != null) txtPercent.text = data.percent;

        if (txtDownload != null) txtDownload.text = data.download;

        if (txtView != null) txtView.text = data.view;

        if (txtPublished != null) txtPublished.text = data.published;
    }
    string ReplaceDoubleSpaceWithNewline(string input)
    {
        return input.Replace("  ", "\n");
    }
    public void OnClickButton()
    {
        GameManager.ins.modDataSelection = ID;
        Tutorial.ins.NextStep();
        Tutorial.ins.ShowNextStep();
    }
}
