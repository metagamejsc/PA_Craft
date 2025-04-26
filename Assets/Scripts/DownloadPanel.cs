using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Image = UnityEngine.UI.Image;
public class DownloadPanel : MonoBehaviour
{
    public Image gallary;
    public TextMeshProUGUI des;
    public Button btnOpenGame;
    
    public void SetValue(ModData data)
    {
        gallary.sprite = data.gallary;
        des.text = data.des;
    }

    private void Start()
    {
        SetValue(GameManager.ins.modData[GameManager.ins.modDataSelection]);
        btnOpenGame.onClick.AddListener(() =>
        {
            Tutorial.ins.NextStep();
            Tutorial.ins.ShowNextStep();
        });
    }
}
