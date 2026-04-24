using UnityEngine;
using UnityEngine.UI;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop = 0;
    public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative = 30;
    [LunaPlaygroundField("Scene dừng để mở EndCard")] public int sceneEndCard = 1;
    [LunaPlaygroundField("ColorBG")] public Color colorBG;
    [LunaPlaygroundAsset("BG")] public Texture2D texture2D;
    public RawImage rawImageBG;
    //[LunaPlaygroundField("Có thể Replay (>=1 là true, 0 là false)")] public int canReplay = 0;
    //[LunaPlaygroundField("Show End Card")] public bool isEndCard = true;
    // [LunaPlaygroundField("Player Speed")] public float playerSpeed = 1.5f;
    // [LunaPlaygroundField("Player JumpForce")] public float playerJumpForce = 40f;
    // [LunaPlaygroundField("Lightning")] public float Lightning = 5;
    // [LunaPlaygroundField("Color Light")] public Color colorLight = Color.black;
    // public Light directionalLight;
    // public bool isCretivePause;
    public GameObject showEndCard;
    private void Awake()
    {
        ins = this;
    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    //public GameObject EndCardEmpty;
    public GameObject WinCard;



    // Start is called before the first frame update
    void Start()
    {
        // directionalLight.intensity = Lightning;
        // directionalLight.color = colorLight;
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;
        foreach (var VARIABLE in lstBtnInstall)
        {
            VARIABLE.onClick.AddListener(OnClickEndCard);
        }
        EndCard.SetActive(false);
        WinCard.SetActive(false);
        //btnRestart.SetActive(canReplay>=1);
        //SetupField();
        Invoke(nameof(ShowEndCard), timeEndCreative);
        //showEndCard.SetActive(isEndCard);
        rawImageBG.texture = texture2D;
        rawImageBG.color = colorBG;
    }
    public void ReplayGame()
    {
        //canReplay--;
        //btnRestart.SetActive(canReplay>=1);
        //isCretivePause = false;
        EndCard.SetActive(false);
        var timeEndCreativeRemaining = timeEndCreative - Time.realtimeSinceStartup;
        if (timeEndCreativeRemaining < 0)
        {
            timeEndCreativeRemaining = 5f;
        }
        Invoke(nameof(ShowEndCard), timeEndCreativeRemaining);
    }

    public void CheckClickShowEndCard()
    {
        countDrop++;
        // if (countDrop >= countDropFinal && isCretivePause == false)
        // {
        //     isCretivePause = true;
        //     ShowEndCard();
        // }
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
        // if (isCretivePause) return;
        // isCretivePause = true;
        //AudioManager.ins.PlayMusicLose();
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    // public void ShowEndCardEmpty()
    // {
    //     if (isCretivePause) return;
    //     TutorialBuildBlock.ins.HideAllTut();
    //     isCretivePause = true;
    //     // EndCardEmpty.SetActive(true);
    //     Debug.Log("Show end card");
    //     Luna.Unity.LifeCycle.GameEnded();
    // }
    public void ShowWinCard()
    {
        // if (isCretivePause) return;
        // isCretivePause = true;
        //AudioManager.ins.PlayMusicWin();
        WinCard.SetActive(true);
        Debug.Log("Show win card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }


    public void CheckShowEndCard(int scene)
    {
        if (scene == sceneEndCard)
        {
            ShowEndCard();
        }
    }
}
