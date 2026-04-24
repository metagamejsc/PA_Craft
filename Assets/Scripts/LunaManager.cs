using UnityEngine;
using UnityEngine.UI;

public class LunaManager : MonoBehaviour
{
    public static LunaManager ins;

    public int countDrop = 0;

    [LunaPlaygroundField("Count enemy to store")] public int countDropFinal;
    [LunaPlaygroundField("CountDrop")] public int count;
    [LunaPlaygroundField("Player HP")] public float playerHealth = 100f;
    [LunaPlaygroundField("Enemy HP")] public float enemyHealth = 10f;
    [LunaPlaygroundField("Boss HP")] public float bossHealth = 30f;
    [LunaPlaygroundField("Enemy Speed")] public float enemySpeed = 2f;
    [LunaPlaygroundField("Initial Fire Speed")] public float initialShotsPerSecond = 5f;
    [LunaPlaygroundField("Time")] public int timeEndCreative = 30;
    [LunaPlaygroundField("Time hold to Store")] public int timeHoldStore = 10;
    [LunaPlaygroundField("lightIntensity")] public float lightIntensity;
    [LunaPlaygroundField("Color light")] public Color lightColor;

    public Light directionalLight;
    public bool isCretivePause;
    public Button[] lstBtnInstall;
    public GameObject EndCard;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        Luna.Unity.LifeCycle.OnPause += PauseGameplay;
        Luna.Unity.LifeCycle.OnResume += ResumeGameplay;

        foreach (Button button in lstBtnInstall)
        {
            if (button != null)
            {
                button.onClick.AddListener(OnClickEndCard);
            }
        }

        if (EndCard != null)
        {
            EndCard.SetActive(false);
        }

        ApplyTunableValues();
        Invoke(nameof(ShowEndCard), timeEndCreative);
    }

    public void CheckClickShowEndCard()
    {
        countDrop++;
        if (countDrop >= countDropFinal && !isCretivePause)
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
        isCretivePause = true;
        AudioManager.ins?.PlaySoundReward();

        if (EndCard != null)
        {
            EndCard.SetActive(true);
        }

        Debug.Log("Show end card");
        Luna.Unity.LifeCycle.GameEnded();
    }

    public void OnClickEndCard()
    {
        Debug.Log("Click end card");
        Luna.Unity.Playable.InstallFullGame();
    }

    public void DelayCallEndCard(float time)
    {
        if (GameController.ins != null && GameController.ins.isEndGame)
        {
            return;
        }

        if (GameController.ins != null)
        {
            GameController.ins.isEndGame = true;
        }

        Invoke(nameof(OnClickEndCard), time);
        Invoke(nameof(ShowEndCard), time);
    }

    private void ApplyTunableValues()
    {
        if (directionalLight != null)
        {
            directionalLight.intensity = lightIntensity;
            directionalLight.color = lightColor;
        }

        GameController gameController = GameController.ins != null ? GameController.ins : FindObjectOfType<GameController>();
        if (gameController != null)
        {
            gameController.bossHealth = bossHealth;
        }

        PlayerChar playerChar = gameController != null && gameController.playerChar != null
            ? gameController.playerChar
            : FindObjectOfType<PlayerChar>();
        if (playerChar != null && playerHealth > 0f)
        {
            playerChar.health = playerHealth;
        }

        IceGun iceGun = gameController != null && gameController.playerGun != null
            ? gameController.playerGun
            : FindObjectOfType<IceGun>();
        if (iceGun != null)
        {
            iceGun.SetInitialShotsPerSecond(initialShotsPerSecond);
        }
    }
}
