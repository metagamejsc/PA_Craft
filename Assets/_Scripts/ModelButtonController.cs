using UnityEngine;

public class ModelButtonController : MonoBehaviour
{
    public GameObject[] models;      // 3 model
    public GameObject[] effects;     // effect của từng model
    public GameObject otherObject;   // object hiện sau lần click đầu

    private bool firstClick = false;

    public void ShowModel(int index)
    {
        AudioManager.ins.PlaySoundBuy();
        LunaManager.ins.CheckClickShowEndCard();
        HandPointerController.ins.StopHandPointer();
        for (int i = 0; i < models.Length; i++)
        {
            if (i == index)
            {
                models[i].SetActive(true);

                if (effects[i] != null)
                {
                    effects[i].SetActive(true);
                }
            }
            else
            {
                models[i].SetActive(false);

                if (effects[i] != null)
                {
                    effects[i].SetActive(false);
                }
            }
        }

        // hiển thị object khác sau lần click đầu
        if (!firstClick)
        {
            firstClick = true;
            otherObject.SetActive(true);
        }
    }
}