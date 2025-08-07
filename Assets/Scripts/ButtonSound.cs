using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonSound : MonoBehaviour
{
    public Button btn;

    private void Start()
    {
        btn= GetComponent<Button>();
        btn.onClick.AddListener(() =>
        {
            AudioManager.ins.PlaySoundBuild();
        });
    }
}
