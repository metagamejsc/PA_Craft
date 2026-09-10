using System.Collections;
using TMPro;
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
    [SerializeField] private TextMeshProUGUI header;

    [Header("Option 1")]
    [LunaPlaygroundAsset("Option 1 (500x500)")] public Texture2D MainOption1Tex;
    [LunaPlaygroundField("Color BG Option 1")] public Color BGOption1Color;
    [LunaPlaygroundField("Option 1 Name")] public string Option1Name;
    [LunaPlaygroundField("Color Option 1 Name")] public Color Option1NameColor;

    [SerializeField] private Image BGOption1ImageP;
    [SerializeField] private RawImage mainOption1ImageP;
    [SerializeField] private TextMeshProUGUI option1NameTextP;

    [SerializeField] private Image BGOption1ImageL;
    [SerializeField] private RawImage mainOption1ImageL;
    [SerializeField] private TextMeshProUGUI option1NameTextL;

    [Header("Option 2")]
    [LunaPlaygroundAsset("Option 2 (500x500)")] public Texture2D MainOption2Tex;
    [LunaPlaygroundField("Color BG Option 2")] public Color BGOption2Color;
    [LunaPlaygroundField("Option 2 Name")] public string Option2Name;
    [LunaPlaygroundField("Color Option 2 Name")] public Color Option2NameColor;
    [SerializeField] private Image BGOption2ImageP;
    [SerializeField] private RawImage mainOption2ImageP;
    [SerializeField] private TextMeshProUGUI option2NameTextP;

    [SerializeField] private Image BGOption2ImageL;
    [SerializeField] private RawImage mainOption2ImageL;
    [SerializeField] private TextMeshProUGUI option2NameTextL;

    [Header("EndCard")]
    [SerializeField] private Button endCard;
    private void Init()
    {
        BGImage.texture = BGTex;
        musicSource.clip = BGM;
        header.text = HeaderText;
        header.color = HeaderTextColor;

        BGOption1ImageL.color = BGOption1Color;
        BGOption1ImageP.color = BGOption1Color;
        mainOption1ImageL.texture = MainOption1Tex;
        mainOption1ImageP.texture = MainOption1Tex;
        option1NameTextL.text = Option1Name;
        option1NameTextL.color = Option1NameColor;
        option1NameTextP.text = Option1Name;
        option1NameTextP.color = Option1NameColor;

        BGOption2ImageL.color = BGOption2Color;
        BGOption2ImageP.color = BGOption2Color;
        mainOption2ImageL.texture = MainOption2Tex;
        mainOption2ImageP.texture = MainOption2Tex;
        option2NameTextL.text = Option2Name;
        option2NameTextL.color = Option2NameColor;
        option2NameTextP.text = Option2Name;
        option2NameTextP.color = Option2NameColor;
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
