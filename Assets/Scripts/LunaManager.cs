using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;
    public int countDrop = 0;
    // [LunaPlaygroundField("Số lần chết ra store")] public int countReSpawnFinal = 3;
    // [LunaPlaygroundField("Số cầu kính vợt qua ra store")] public int countPassGlassMax = 5;
    public int countPassGlas = 0;
    // [LunaPlaygroundField("Time")] public int timeEndCreative = 30;
    // [LunaPlaygroundAsset("Video")] public VideoClip videoPlayable;
    // public VideoPlayer videoPlayer;
    // public VideoPlayer videoPlayerBlur;
    public bool isCretiveEnd;
    private void Awake()
    {
        ins = this;
        //SetUpVideo();
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
        // Invoke(nameof(ShowEndCard), timeEndCreative);

        ShowEndCard();
    }
    // public void SetUpVideo()
    // {
    //     videoPlayerBlur.clip = videoPlayable;
    //     videoPlayer.clip = videoPlayable;
    //     videoPlayer.Play();
    //     videoPlayerBlur.Play();
    // }
    public void CheckClickShowEndCard()
    {
        countPassGlas++;
        // if (countPassGlas >= countPassGlassMax && isCretiveEnd == false)
        // {
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
        if (!isCretiveEnd)
        {
            isCretiveEnd = true;
            AudioManager.ins.PlaySoundReward();
            EndCard.SetActive(true);
            Debug.Log("Show end card");
            Luna.Unity.LifeCycle.GameEnded();
        }
    }

    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

}
