
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Image = UnityEngine.UI.Image;

public class DescriptionPanel : MonoBehaviour
{
    public Image gallary;
    public TextMeshProUGUI type;
    public TextMeshProUGUI name;
    public TextMeshProUGUI des;
    public Button btnDownload;
    
    public void SetValue(ModData data)
    {
        gallary.sprite = data.gallary;
        type.text= data.type;
        name.text = data.name;
        des.text = data.des;
    }

    private void Start()
    {
        SetValue(GameManager.ins.modData[GameManager.ins.modDataSelection]);
        btnDownload.onClick.AddListener(() =>
        {
            Tutorial.ins.NextStep();
            Tutorial.ins.ShowNextStep();
        });
    }
}
