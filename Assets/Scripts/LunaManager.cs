using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop=0;
    public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative=30;
    [LunaPlaygroundAsset("Bg Texture")] public Texture bgTexture;
    [LunaPlaygroundField("Bg color")] public Color bgColor=Color.white;
    [LunaPlaygroundAsset("Icon Texture")] public Texture iconTexture;
    [LunaPlaygroundField("Icon color")] public Color iconColor=Color.white;
    [LunaPlaygroundAsset("Music Audio")] public AudioClip musicClip;
    [LunaPlaygroundField("Music Volum")] public float musicVolume;
    public AudioSource musicSource;
    

    public RawImage bgImage;
    public RawImage iconImage;
    
    public bool isCretivePause;
    
    private void Awake()
    {
        ins = this;

    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    


 
    void Start()
    {
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        EndCard.SetActive(false);
        Invoke(nameof(ShowEndCard),timeEndCreative);
        
        if (bgImage!=null)
        {
            if (bgTexture!=null)
            {
                SetTexture(bgImage,bgTexture);
            }
            bgImage.color = bgColor;
        }
        if (iconImage!=null)
        {
            if (iconTexture!=null)
            {
                SetTexture(iconImage,iconTexture,true);
            }
            iconImage.color = iconColor;
        }
        
        if (musicClip!=null)
        {
            musicSource.clip = musicClip;
            musicSource.volume = musicVolume;
            musicSource.Play();
        }
        
        //textRect.anchoredPosition = positionText;
        /*rawImageMonster.sprite = SpriteFromTexture(textureMonster);
        rawImageMonster.color = colorMonster;*/
    }

    Sprite SpriteFromTexture(Texture2D tex)
{
    if (tex == null) return null;
    return Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), Vector2.one * 0.5f);
}
public void SetTexture(RawImage raw,Texture tex,bool removeOpaqueBackground=false)
{
    var fitter = raw.GetComponent<AspectRatioFitter>();

    raw.texture = removeOpaqueBackground ? CreateTransparentTextureIfNeeded(tex) : tex;

    if (tex != null)
    {
        if (fitter!=null)
        {
            fitter.aspectRatio = (float)tex.width / tex.height;
        }
    }
}

private Texture CreateTransparentTextureIfNeeded(Texture tex)
{
    var source = tex as Texture2D;
    if (source==null)
    {
        return tex;
    }

    Color32[] pixels;
    try
    {
        pixels = source.GetPixels32();
    }
    catch (Exception)
    {
        return tex;
    }

    if (pixels.Length==0 || HasAlpha(pixels))
    {
        return tex;
    }

    if (!TryGetBackgroundColor(pixels,source.width,source.height,out var background))
    {
        return tex;
    }

    var outputPixels = new Color32[pixels.Length];
    var changedPixels = 0;

    for (var i = 0; i < pixels.Length; i++)
    {
        var pixel = pixels[i];
        var diff = ColorDifference(pixel,background);
        var alpha = Mathf.InverseLerp(42f,90f,diff);
        var output = pixel;
        output.a = (byte)Mathf.RoundToInt(alpha * 255f);
        outputPixels[i] = output;

        if (output.a < 255)
        {
            changedPixels++;
        }
    }

    if (changedPixels==0)
    {
        return tex;
    }

    var transparentTexture = new Texture2D(source.width,source.height,TextureFormat.RGBA32,false);
    transparentTexture.name = source.name + "_Transparent";
    transparentTexture.wrapMode = source.wrapMode;
    transparentTexture.filterMode = source.filterMode;
    transparentTexture.SetPixels32(outputPixels);
    transparentTexture.Apply(false,false);
    return transparentTexture;
}

private bool HasAlpha(Color32[] pixels)
{
    for (var i = 0; i < pixels.Length; i++)
    {
        if (pixels[i].a < 250)
        {
            return true;
        }
    }

    return false;
}

private bool TryGetBackgroundColor(Color32[] pixels,int width,int height,out Color32 background)
{
    var topLeft = pixels[(height - 1) * width];
    var topRight = pixels[height * width - 1];
    var bottomLeft = pixels[0];
    var bottomRight = pixels[width - 1];
    background = new Color32(0,0,0,255);

    if (ColorDifference(topLeft,topRight) > 60f ||
        ColorDifference(topLeft,bottomLeft) > 60f ||
        ColorDifference(topLeft,bottomRight) > 60f)
    {
        return false;
    }

    background = new Color32(
        (byte)((topLeft.r + topRight.r + bottomLeft.r + bottomRight.r) / 4),
        (byte)((topLeft.g + topRight.g + bottomLeft.g + bottomRight.g) / 4),
        (byte)((topLeft.b + topRight.b + bottomLeft.b + bottomRight.b) / 4),
        255
    );
    return true;
}

private float ColorDifference(Color32 a,Color32 b)
{
    return Mathf.Abs(a.r - b.r) + Mathf.Abs(a.g - b.g) + Mathf.Abs(a.b - b.b);
}
    public void CheckClickShowEndCard()
    {
        countDrop++;
        if (countDrop>=countDropFinal && isCretivePause==false)
        {
            isCretivePause = true;
            ShowEndCard();
        }
    }
    


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
        //AudioManager.ins.PlaySoundReward();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
