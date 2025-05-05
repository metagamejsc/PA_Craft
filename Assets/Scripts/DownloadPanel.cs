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
        if (des != null)
        {
            string processedText = data.des;
            processedText=ReplaceDoubleSpaceWithNewline(processedText);
            Debug.Log(processedText);
            des.text= processedText;
        }
    }
    string ReplaceDoubleSpaceWithNewline(string input)
    {
        input=input.Replace(": ", ":\n");
        return input.Replace("  ", "\n");
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
