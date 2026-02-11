using System;
using UnityEngine;
using UnityEngine.UI;

public class SkinSwitcher : MonoBehaviour
{
    [SerializeField] private GameObject[] targets;
    [SerializeField] private Button[] buttons;

    private void Start()
    {
        /*
        for (int i = 0; i < buttons.Length; i++)
        {
            buttons[i].onClick.AddListener(() => ChangeSkin(Array.IndexOf(buttons, UnityEngine.EventSystems.EventSystem.current.currentSelectedGameObject.GetComponent<Button>())));
        }
        */
        
        //targets[0].SetActive(true);
        //buttons[0].transform.GetChild(2).GetComponent<Image>().gameObject.SetActive(true);
    }

    public void ChangeSkin(int skinIndex)
    {
        LunaManager.ins.CheckClickShowEndCard();
        for (int i = 0; i < targets.Length; i++)
        {
            targets[i].SetActive(i==skinIndex);
            buttons[i].transform.GetChild(2).GetComponent<Image>().gameObject.SetActive(i==skinIndex);
        }
    }

    // Nếu bạn thích gắn button kiểu “không tham số”:
    public void Skin0() => ChangeSkin(0);
    public void Skin1() => ChangeSkin(1);
    public void Skin2() => ChangeSkin(2);
}