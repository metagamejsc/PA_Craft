using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class LunaManager : MonoBehaviour
{
    public Button[] lstBtnInstall;
    public GameObject EndCard;

    //----------------------------------LUNA----------------------------

    public int countPlay = 0;

    [LunaPlaygroundField("CountDrop")] public float countPlayFinal;
    [LunaPlaygroundField("TimeDrop")] public float timeDropFinal;
    //---------------------------------
    [LunaPlaygroundField("ColorBG")] public Color colorBG;
    [LunaPlaygroundAsset("BG")] public Texture2D texture2D;
    // [LunaPlaygroundAsset("IMG1")] public Texture2D img1;
    [LunaPlaygroundAsset("Video")] public VideoClip videoClip;
    [LunaPlaygroundAsset("IMG2")] public Texture2D img2;
    //[LunaPlaygroundField("ColorText")] public Color colorText;
    public RawImage rawImageBG;
    // public RawImage rawImg1;
    public RawImage rawImg2;
    //public TextMeshProUGUI textTap;
    //---------------------------------

    // [LunaPlaygroundAsset("LogoGame")] public Texture2D logoGame;
    // public RawImage imgRawLogoGame;
    //---------------------------------
    public VideoPlayer video;
    public TextMeshProUGUI txtEndCreative;
    public Transform handTrans;
    [LunaPlaygroundField("Text")] public string stringEndCreative;
    [LunaPlaygroundField("Text Color")] public Color colorTextEndCreative;
    [LunaPlaygroundField("Text Position")] public Vector2 positionTextEndCreative;
    [LunaPlaygroundField("Text Size")] public float sizeTextEndCreative;
    [LunaPlaygroundField("Text Style")] public FontStyles fontStyleTextEndCreative;

    [LunaPlaygroundField("Hand Position")] public Vector2 handPos;
    //----------------------------------LUNA----------------------------
    public static LunaManager ins;
    private void Awake()
    {
        ins = this;
    }


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
        SetupField();
        Invoke(nameof(ShowEndCard), timeDropFinal);
    }
    public void SetupField()
    {
        rawImageBG.texture = texture2D;
        rawImageBG.color = colorBG;
        //        rawImg1.texture = img1;
        rawImg2.texture = img2;
        // rawImageTable.texture = textureTable;
        // rawImageTable.color = colorTable;
        // imgRawLogoGame.texture = logoGame;
        txtEndCreative.text = stringEndCreative;
        txtEndCreative.color = colorTextEndCreative;
        txtEndCreative.fontSize = sizeTextEndCreative;
        txtEndCreative.fontStyle = fontStyleTextEndCreative;
        txtEndCreative.rectTransform.anchoredPosition = positionTextEndCreative;
        handTrans.transform.localPosition = handPos;
        video.clip = videoClip;
    }
    public void CountPlay()
    {
        countPlay++;
        //GameController.instance.IQFill.AddValue();
        if (countPlay >= countPlayFinal)
        {
            ShowEndCard();
        }
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
