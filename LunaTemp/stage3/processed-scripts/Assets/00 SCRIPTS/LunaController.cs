using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundField("Count Play")] public int CountPlay;
    [LunaPlaygroundAsset("Logo Game")] public Texture2D LogoGame;
    [LunaPlaygroundField("BG Color")] public Color BGColor;
    [LunaPlaygroundField("Title Text Color")] public Color TitleTextColor;
    [LunaPlaygroundField("OK Text Color")] public Color OKTextColor;
    [SerializeField] private RawImage logo;
    [SerializeField] private SpriteRenderer BG;
    [SerializeField] private Text titleText;
    [SerializeField] private Text OKText;
    [SerializeField] private Button endCard;
    [SerializeField] private List<Button> CTA;
    private int count;
    void Start()
    {
        GameController.Ins.OnSwitchItem += UpdateCount;
        logo.texture = LogoGame;
        BG.color = BGColor;
        titleText.color = TitleTextColor;
        OKText.color = OKTextColor;
        endCard.onClick.AddListener(ClickCTA);
        foreach (var e in CTA)
        {
            e.onClick.AddListener(ClickCTA);
        }
        StartCoroutine(EndGame());
    }
    private void UpdateCount()
    {
        count++;
        if (count >= CountPlay) endCard.gameObject.SetActive(true);
    }
    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(TimePlay);
        End();
    }
    private void End()
    {
        endCard.gameObject.SetActive(true);
        Luna.Unity.LifeCycle.GameEnded();
    }
    private void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
}
