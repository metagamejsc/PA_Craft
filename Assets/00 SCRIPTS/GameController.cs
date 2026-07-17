using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [SerializeField] private GameObject phase1;
    [SerializeField] private AudioClip click1;

    [SerializeField] private GameObject phase2;
    [SerializeField] private Color defaultColor;
    [SerializeField] private Color selectedColor;
    [SerializeField] private AudioClip click2;
    [SerializeField] private GameObject tut2;

    [SerializeField] private List<ModelOption> models;
    [SerializeField] private List<ItemOption> items;

    private ItemOption currentItem;
    private void Awake()
    {
        InitModelOption();
        InitItemOption();
    }
    private void InitModelOption()
    {
        models.ForEach(m => m.Button.onClick.AddListener(() =>
        {
            AudioController.Ins.PlaySFX(click1);
            phase1.SetActive(false);
            phase2.SetActive(true);
            m.Model.SetActive(true);
        }));
    }
    private void InitItemOption()
    {
        items.ForEach(i => i.Button.onClick.AddListener(() =>
            {
                if (tut2) Destroy(tut2);
                AudioController.Ins.PlaySFX(click2);
                if (currentItem.Item)
                {
                    currentItem.Item.SetActive(false);
                    currentItem.BG.color = defaultColor;
                }
                currentItem = i;
                currentItem.Item.SetActive(true);
                currentItem.BG.color = selectedColor;
            }));
    }
}
[System.Serializable]
public struct ModelOption
{
    public Button Button;
    public GameObject Model;
}

[System.Serializable]
public struct ItemOption
{
    public Button Button;
    public GameObject Item;
    public Image BG;
}
