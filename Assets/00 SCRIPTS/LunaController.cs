using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [Header("Time")]
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;

    [Header("Background")]
    [LunaPlaygroundAsset("BG (1920x1080)")] public Texture2D BGTex;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;
    [LunaPlaygroundField("Header Text")] public string HeaderText;
    [LunaPlaygroundField("Color Header Text")] public Color HeaderTextColor;

    [SerializeField] private RawImage BGImage;
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private Text header;

    [Header("Character 1")]
    [LunaPlaygroundAsset("Character 1 (317x453)")] public Texture2D Character1Tex;
    [LunaPlaygroundField("Color BG Character 1")] public Color BGChar1Color;
    [LunaPlaygroundField("Character 1 Name")] public string Character1Name;
    [LunaPlaygroundField("Color Character 1 Name")] public Color Character1NameColor;

    [SerializeField] private RawImage character1Image;
    [SerializeField] private Image BGChar1Image;
    [SerializeField] private Text character1NameText;

    [Header("Character 2")]
    [LunaPlaygroundAsset("Character 2 (317x453)")] public Texture2D Character2Tex;
    [LunaPlaygroundField("Color BG Character 2")] public Color BGChar2Color;
    [LunaPlaygroundField("Character 2 Name")] public string Character2Name;
    [LunaPlaygroundField("Color Character 2 Name")] public Color Character2NameColor;

    [SerializeField] private RawImage character2Image;
    [SerializeField] private Image BGChar2Image;
    [SerializeField] private Text character2NameText;

    [Header("EndCard")]
    [SerializeField] private Button endCard;
    private void Init()
    {
        BGImage.texture = BGTex;
        musicSource.clip = BGM;
        header.text = HeaderText;
        header.color = HeaderTextColor;

        character1Image.texture = Character1Tex;
        BGChar1Image.color = BGChar1Color;
        character1NameText.text = Character1Name;
        character1NameText.color = Character1NameColor;

        character2Image.texture = Character2Tex;
        BGChar2Image.color = BGChar2Color;
        character2NameText.text = Character2Name;
        character2NameText.color = Character2NameColor;
    }
    private void Awake()
    {
        Init();
        endCard.onClick.AddListener(ClickCTA);
    }
    private void Start()
    {
        musicSource.Play();
        StartCoroutine(EndGame());
    }
    private void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(TimePlay);
        Luna.Unity.LifeCycle.GameEnded();
        if (LimitTimePlay) ClickCTA();
    }
}
