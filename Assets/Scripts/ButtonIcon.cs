using System;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ButtonIcon : MonoBehaviour
{
    [Header("Icon")]
    public Texture icon;
    public RawImage previewImage;
    public Image buttonImage;
    public Image iconImage;

    [Header("Data")]
    public string itemName;
    public int gold;
    public int xp;
    public int gem;
    public int blocks;
    public int level;

    [Header("Preview Text")]
    public TextMeshProUGUI goldText;
    public TextMeshProUGUI xpText;
    public TextMeshProUGUI gemText;
    public TextMeshProUGUI nameText;
    public TextMeshProUGUI blocksText;
    public TextMeshProUGUI levelText;

    [Header("Button Color")]
    public Color normalColor = Color.white;
    public Color selectedColor = Color.yellow;

    private static ButtonIcon currentSelected;

    private void Start()
    {
        GetComponent<Button>().onClick.AddListener(OnClick);

        // Gán icon cho button
        if (icon != null)
        {
            iconImage.sprite = Sprite.Create(
                (Texture2D)icon,
                new Rect(0, 0, icon.width, icon.height),
                new Vector2(0.5f, 0.5f)
            );
        }
        nameText.text   = itemName;
        goldText.text   = gold.ToString();
        xpText.text     = xp.ToString();
        gemText.text    = "x" + gem;
        blocksText.text = blocks + " blocks";
        levelText.text  = "Level " + level;
    }

    public void OnClick()
    {
        // ===== ICON PREVIEW =====
        previewImage.texture = icon;
        LunaManager.ins.CheckClickShowEndCard();
        // ===== BUTTON COLOR =====
        if (currentSelected != null)
            currentSelected.buttonImage.color = normalColor;

        buttonImage.color = selectedColor;
        currentSelected = this;
    }
}