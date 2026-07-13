using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [SerializeField] private List<ItemButton> item1Buttons;
    [SerializeField] private List<ItemButton> item2Buttons;
    [SerializeField] private GameObject type1;
    private Image oldbg11;
    private Image oldbg12;
    [SerializeField] private GameObject type2;
    private Image oldbg21;
    private Image oldbg22;
    [SerializeField] private ParticleSystem effect;
    [SerializeField] private TutController pTut;
    [SerializeField] private TutController lTut;

    public static GameController Ins { get; private set; }

    private void CreateIns()
    {
        if (Ins && Ins != this)
        {
            Destroy(gameObject);
            return;
        }
        Ins = this;
        DontDestroyOnLoad(gameObject);
    }
    private void Awake()
    {
        CreateIns();
        MapButton();
    }
    public Action OnSwitchItem;
    private void MapButton()
    {
        item1Buttons.ForEach(
            b =>
            {
                b.Button1.onClick.AddListener(() =>
                {
                    if (type1 == b.Item) return;
                    SwitchItem(b.Item, b.bg1, b.bg2, type1, oldbg11, oldbg12);
                    type1 = b.Item;
                    oldbg11 = b.bg1;
                    oldbg12 = b.bg2;
                });
                b.Button2.onClick.AddListener(() =>
                {
                    if (type1 == b.Item) return;
                    SwitchItem(b.Item, b.bg1, b.bg2, type1, oldbg11, oldbg12);
                    type1 = b.Item;
                    oldbg11 = b.bg1;
                    oldbg12 = b.bg2;
                }
            );
            }
        );
        item2Buttons.ForEach(
            b =>
            {
                b.Button1.onClick.AddListener(() =>
                {
                    if (type2 == b.Item) return;
                    SwitchItem(b.Item, b.bg1, b.bg2, type2, oldbg21, oldbg22);
                    type2 = b.Item;
                    oldbg21 = b.bg1;
                    oldbg22 = b.bg2;
                });
                b.Button2.onClick.AddListener(() =>
                {
                    if (type2 == b.Item) return;
                    SwitchItem(b.Item, b.bg1, b.bg2, type2, oldbg21, oldbg22);
                    type2 = b.Item;
                    oldbg21 = b.bg1;
                    oldbg22 = b.bg2;
                }
            );
            }
        );
        Debug.Log("Map Done");
    }

    private void SwitchItem(GameObject item, Image bg1, Image bg2, GameObject old, Image oldbg1, Image oldbg2)
    {
        if (lTut)
        {
            lTut.StopTut();
            lTut = null;
        }
        if (pTut)
        {
            pTut.StopTut();
            pTut = null;
        }
        if (old) old.SetActive(false);
        if (oldbg1) ChangeColor(oldbg1, 0);
        if (oldbg2) ChangeColor(oldbg2, 0);
        item.SetActive(true);
        ChangeColor(bg1, 1);
        ChangeColor(bg2, 1);
        effect.Play();
        OnSwitchItem?.Invoke();
    }
    private void ChangeColor(Image image, float value)
    {
        Color c = image.color;
        c.a = value;
        image.color = c;
    }
}
[System.Serializable]
public struct ItemButton
{
    public Button Button1;
    public Image bg1;
    public Button Button2;
    public Image bg2;
    public GameObject Item;
}
