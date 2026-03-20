using UnityEngine;
using UnityEngine.UI;

public class ModelSwitcher : MonoBehaviour
{
    public GameObject[] models; // 3 model
    public Button[] buttons;    // 3 button
public GameObject handPointer; // Đối tượng hình bàn tay
    void Start()
    {
        for (int i = 0; i < buttons.Length; i++)
        {
            int index = i; // tránh lỗi closure
            buttons[i].onClick.AddListener(() => ShowModel(index));
            buttons[i].onClick.AddListener(CheckClick);
        }

        ShowModel(0); // mặc định hiện model đầu tiên
    }

    public void ShowModel(int index)
    {
        for (int i = 0; i < models.Length; i++)
        {
            models[i].SetActive(i == index);
        }
    }

    public void CheckClick()
    {
        handPointer.SetActive(false);
        AudioManager.ins.PlaySoundBuy();
        LunaManager.ins.CheckClickShowEndCard();
    }
}