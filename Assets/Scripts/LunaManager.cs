using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    [LunaPlaygroundField("Time")]           public int timeEndCreative=30;
    [LunaPlaygroundAsset("Video")]          public VideoClip videoClip;
    [LunaPlaygroundAsset("Background")]     public Texture2D backgroundTexture;
    [LunaPlaygroundField("Background Color")]     public Color bgColor=Color.white;
    [LunaPlaygroundField("Text")]           public string stringEndCreative;
    [LunaPlaygroundField("Text Color")]     public Color colorTextEndCreative;
    [LunaPlaygroundField("Text Position")]     public Vector2 positionTextEndCreative;
    [LunaPlaygroundField("Text Size")]      public float sizeTextEndCreative;
    [LunaPlaygroundField("Text Style")]     public FontStyles fontStyleTextEndCreative;
    [LunaPlaygroundField("Time Show Select Weapon")]     public float timeShowSelectWeapon=2f;
    public TextMeshProUGUI txtEndCreative;
    public RawImage backgroundRawImage;

    public bool isCretivePause;
    public VideoPlayer video;
    private void Awake()
    {
        ins = this;
    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;

    // Start is called before the first frame update
    void Start()
    {
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        EndCard.SetActive(false);
        //SetupField();
        Invoke(nameof(ShowEndCard),timeEndCreative);
        video.clip = videoClip;
        txtEndCreative.text = stringEndCreative;
        txtEndCreative.color = colorTextEndCreative;
        txtEndCreative.fontSize = sizeTextEndCreative;
        txtEndCreative.fontStyle = fontStyleTextEndCreative;
        txtEndCreative.rectTransform.anchoredPosition = positionTextEndCreative;
        ApplyBackgroundTexture();
    }
    
    // Update is called once per frame
    public void PauseGameplay()
    {
        Debug.Log("Pause game");
        Time.timeScale = 0;
    }

    public void ResumeGameplay()
    {
        Debug.Log("Load game");
        Time.timeScale = 1;
    }

    public void ShowEndCard()
    {
        isCretivePause = true;
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

    private void ApplyBackgroundTexture()
    {
        if (backgroundRawImage == null)
        {
            return;
        }

        if (backgroundTexture != null)
        {
            backgroundRawImage.texture = backgroundTexture;
            backgroundRawImage.color =bgColor;
        }

        ApplyBackgroundAspectRatio();
    }

    private void ApplyBackgroundAspectRatio()
    {
        if (backgroundRawImage == null || backgroundRawImage.texture == null)
        {
            return;
        }

        RectTransform rawRect = backgroundRawImage.rectTransform;
        float textureWidth = backgroundRawImage.texture.width;
        float textureHeight = backgroundRawImage.texture.height;

        if (textureWidth <= 0 || textureHeight <= 0)
        {
            return;
        }

        rawRect.anchorMin = new Vector2(0.5f, 0.5f);
        rawRect.anchorMax = new Vector2(0.5f, 0.5f);
        rawRect.pivot = new Vector2(0.5f, 0.5f);
        rawRect.anchoredPosition = Vector2.zero;

        AspectRatioFitter aspectRatioFitter = backgroundRawImage.GetComponent<AspectRatioFitter>();
        if (aspectRatioFitter == null)
        {
            aspectRatioFitter = backgroundRawImage.gameObject.AddComponent<AspectRatioFitter>();
        }

        aspectRatioFitter.aspectMode = AspectRatioFitter.AspectMode.EnvelopeParent;
        aspectRatioFitter.aspectRatio = textureWidth / textureHeight;
    }
}
