
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Image = UnityEngine.UI.Image;

public class DescriptionPanel : MonoBehaviour
{
    public Image gallary;
    public TextMeshProUGUI type;
    public TextMeshProUGUI name2;
    public TextMeshProUGUI des;
    public Button btnDownload;
    public ModData data=>GameManager.ins.modData[GameManager.ins.modDataSelection];
    
    public void SetValue(ModData data)
    {
        gallary.sprite = data.gallary;
        type.text= data.type;
        name2.text = data.nameMod;
        des.text = data.des;
    }

    private void Start()
    {
        SetValue(data);
        btnDownload.onClick.AddListener(() =>
        {
            Tutorial.ins.NextStep();
            Tutorial.ins.ShowNextStep();
        });
    }
}
