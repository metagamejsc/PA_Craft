using UnityEngine;
using UnityEngine.UI;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop = 0;
    public int countDropFinal;
    [LunaPlaygroundField("Time")] public int timeEndCreative = 30;
    [LunaPlaygroundField("Time")] public bool isLock = true;
    public GameObject[] listLock;
    public GameObject[] listUnLock;
    //public Light directionalLight    public bool isCretivePause;
    //public GameObject btnRestart;
    private void Awake()
    {
        ins = this;
    }
    public Button[] lstBtnInstall;
    public GameObject EndCard;
    //public GameObject WinCard;
    public RectTransform target;
    //----------------------------------------------

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
        Invoke(nameof(ShowEndCard), timeEndCreative);
        CheckLock();
    }
    void Update()
    {
        AdjustUI();
    }
    void CheckLock()
    {
        foreach (var item in listLock)
        {
            item.SetActive(isLock);
        }
        foreach (var item in listUnLock)
        {
            item.SetActive(!isLock);
        }
    }
    public void ReplayGame()
    {
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
        if (countDrop >= countDropFinal)
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
        EndCard.SetActive(true);
        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void ShowWinCard()
    {
        //WinCard.SetActive(true);
        Debug.Log("Show win card");
        Luna.Unity.LifeCycle.GameEnded();
    }
    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }
    void AdjustUI()
    {
        if (Screen.width > Screen.height)
        {
            target.sizeDelta = new Vector2(1594, 1038);
            target.localScale = Vector3.one * 1.5f;
        }
        else
        {
            target.sizeDelta = new Vector2(1080, 1300);
            target.localScale = Vector3.one;
        }
    }

}
