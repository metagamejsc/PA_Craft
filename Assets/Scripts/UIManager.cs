using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{
    public static UIManager ins;

    [SerializeField] public Button btnStartCard;
    [SerializeField] public GameObject startCard;
    [SerializeField] public float timeCurrent=59;
    [SerializeField] public TextMeshProUGUI txtTime;
    [Header("Player HP UI")]
    [SerializeField] private GameObject playerHpRootOverride;
    [SerializeField] private Slider playerHpSliderOverride;
    [SerializeField] private TMP_Text playerHpTextOverride;
    [Header("Player Damage Flash UI")]
    [SerializeField] private GameObject playerDamageFlashRootOverride;
    [SerializeField] private CanvasGroup playerDamageFlashCanvasGroupOverride;
    [SerializeField] private Image playerDamageFlashImageOverride;
    [SerializeField] private float playerDamageFlashPeakAlpha = 0.45f;
    [SerializeField] private float playerDamageFlashFadeDuration = 0.25f;
    [Header("Boss Spawn Progress UI")]
    [SerializeField] private GameObject bossSpawnProgressRootOverride;
    [SerializeField] private Slider bossSpawnProgressSliderOverride;
    [SerializeField] private TMP_Text bossSpawnProgressTextOverride;
    [Header("Boss UI")]
    [SerializeField] private GameObject bossUiRootOverride;
    [SerializeField] private Image bossHpFillOverride;
    [SerializeField] private TMP_Text bossNameTextOverride;

    private GameObject playerHpRoot;
    private Slider playerHpSlider;
    private TMP_Text playerHpText;
    private GameObject bossSpawnProgressRoot;
    private Slider bossSpawnProgressSlider;
    private TMP_Text bossSpawnProgressText;
    private GameObject bossUiRoot;
    private Image bossHpFill;
    private Text bossNameText;
    private PlayerChar currentPlayer;
    private BaseCharacter currentBoss;
    private float currentPlayerMaxHealth = 1f;
    private float currentBossMaxHealth = 1f;
    private Coroutine playerDamageFlashCoroutine;

    private void Awake()
    {
        ins = this;
    }

    private void Update()
    {
        UpdatePlayerHpUi();

        if (currentBoss == null || currentBoss.isDead)
        {
            GameObject activeBossRoot = GetBossUiRoot();
            if (activeBossRoot != null && activeBossRoot.activeSelf)
            {
                activeBossRoot.SetActive(false);
            }
        }
        else
        {
            Image activeBossFill = GetBossHpFill();
            if (activeBossFill != null)
            {
                activeBossFill.fillAmount = Mathf.Clamp01(currentBoss.health / Mathf.Max(1f, currentBossMaxHealth));
            }
        }
    }

    private void Start()
    {
        //btnRetry.onClick.AddListener(ReStart);
        //losePanel.SetActive(false);f
        if (startCard != null)
        {
            startCard.SetActive(true);
        }

        if (btnStartCard != null)
        {
            btnStartCard.onClick.AddListener(() =>
            {
                if (startCard != null)
                {
                    startCard.SetActive(false);
                }
            });
        }

        GameObject activeBossRoot = GetBossUiRoot();
        if (activeBossRoot != null)
        {
            activeBossRoot.SetActive(false);
        }

        GameObject activeBossSpawnProgressRoot = GetBossSpawnProgressRoot();
        if (activeBossSpawnProgressRoot != null)
        {
            activeBossSpawnProgressRoot.SetActive(false);
        }

        HidePlayerDamageFlashImmediate();

        if (GameController.ins != null)
        {
            UpdateBossSpawnProgress(GameController.ins.countEnemyDefeat, GameController.ins.killsToSpawnBoss);
        }

        UpdatePlayerHpUi();
    }

    public void ShowBossUI(BaseCharacter boss, string bossName, float maxHealth)
    {
       
        GameObject activeBossRoot = GetBossUiRoot();
        if (activeBossRoot == null)
        {
            return;
        }

        currentBoss = boss;
        currentBossMaxHealth = Mathf.Max(1f, maxHealth);
        activeBossRoot.SetActive(true);
        SetBossName(bossName);

        Image activeBossFill = GetBossHpFill();
        if (activeBossFill != null)
        {
            activeBossFill.fillAmount = 1f;
        }
    }

    public void HideBossUI()
    {
        currentBoss = null;

        GameObject activeBossRoot = GetBossUiRoot();
        if (activeBossRoot != null)
        {
            activeBossRoot.SetActive(false);
        }
    }

    public void UpdateBossSpawnProgress(int currentKills, int killsRequired)
    {
        if (killsRequired <= 0)
        {
            HideBossSpawnProgress();
            return;
        }

        

        GameObject activeProgressRoot = GetBossSpawnProgressRoot();
        Slider activeProgressSlider = GetBossSpawnProgressSlider();
        TMP_Text activeProgressText = GetBossSpawnProgressText();

        if (activeProgressRoot == null || activeProgressSlider == null)
        {
            return;
        }

        int clampedKills = Mathf.Clamp(currentKills, 0, killsRequired);
        activeProgressRoot.SetActive(true);
        activeProgressSlider.minValue = 0f;
        activeProgressSlider.maxValue = killsRequired;
        activeProgressSlider.value = clampedKills;

        if (activeProgressText != null)
        {
            activeProgressText.text = $"Boss {clampedKills}/{killsRequired}";
        }
    }

    public void HideBossSpawnProgress()
    {
        GameObject activeProgressRoot = GetBossSpawnProgressRoot();
        if (activeProgressRoot != null)
        {
            activeProgressRoot.SetActive(false);
        }
    }

    public void ShowPlayerDamageFlash()
    {
        if (!HasAssignedPlayerDamageFlashUi())
        {
            return;
        }

        if (playerDamageFlashCoroutine != null)
        {
            StopCoroutine(playerDamageFlashCoroutine);
        }

        playerDamageFlashCoroutine = StartCoroutine(IePlayerDamageFlash());
    }

    private void UpdatePlayerHpUi()
    {
        ResolvePlayerReference();
        if (currentPlayer == null)
        {
            GameObject activePlayerHpRoot = GetPlayerHpRoot();
            if (activePlayerHpRoot != null)
            {
                activePlayerHpRoot.SetActive(false);
            }

            return;
        }
        GameObject activeRoot = GetPlayerHpRoot();
        Slider activeSlider = GetPlayerHpSlider();
        TMP_Text activeText = GetPlayerHpText();
        if (activeRoot == null || activeSlider == null)
        {
            return;
        }

        currentPlayerMaxHealth = Mathf.Max(currentPlayerMaxHealth, currentPlayer.health, 1f);
        activeRoot.SetActive(true);
        activeSlider.minValue = 0f;
        activeSlider.maxValue = currentPlayerMaxHealth;
        activeSlider.value = Mathf.Clamp(currentPlayer.health, 0f, currentPlayerMaxHealth);

        if (activeText != null)
        {
            activeText.text = $"HP {Mathf.CeilToInt(currentPlayer.health)}/{Mathf.CeilToInt(currentPlayerMaxHealth)}";
        }
    }

    

    private IEnumerator IePlayerDamageFlash()
    {
        GameObject activeRoot = GetPlayerDamageFlashRoot();
        if (activeRoot == null)
        {
            yield break;
        }

        activeRoot.SetActive(true);
        float duration = Mathf.Max(0.01f, playerDamageFlashFadeDuration);
        SetPlayerDamageFlashAlpha(Mathf.Clamp01(playerDamageFlashPeakAlpha));

        float elapsed = 0f;
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / duration);
            SetPlayerDamageFlashAlpha(Mathf.Lerp(playerDamageFlashPeakAlpha, 0f, t));
            yield return null;
        }

        HidePlayerDamageFlashImmediate();
        playerDamageFlashCoroutine = null;
    }

    private void HidePlayerDamageFlashImmediate()
    {
        SetPlayerDamageFlashAlpha(0f);

        GameObject activeRoot = GetPlayerDamageFlashRoot();
        if (activeRoot != null)
        {
            activeRoot.SetActive(false);
        }
    }

    private void SetPlayerDamageFlashAlpha(float alpha)
    {
        CanvasGroup activeCanvasGroup = GetPlayerDamageFlashCanvasGroup();
        if (activeCanvasGroup != null)
        {
            activeCanvasGroup.alpha = alpha;
        }

        Image activeImage = GetPlayerDamageFlashImage();
        if (activeImage != null && activeCanvasGroup == null)
        {
            Color color = activeImage.color;
            color.a = alpha;
            activeImage.color = color;
        }
    }

    private void ResolvePlayerReference()
    {
        if (currentPlayer != null)
        {
            return;
        }

        if (GameController.ins != null && GameController.ins.playerChar != null)
        {
            currentPlayer = GameController.ins.playerChar;
        }
        else
        {
            currentPlayer = FindObjectOfType<PlayerChar>();
        }

        if (currentPlayer != null)
        {
            currentPlayerMaxHealth = Mathf.Max(1f, currentPlayer.health);
        }
    }

    private Canvas GetScreenCanvas()
    {
        Canvas[] canvases = FindObjectsOfType<Canvas>();
        for (int i = 0; i < canvases.Length; i++)
        {
            if (canvases[i].renderMode != RenderMode.WorldSpace)
            {
                return canvases[i];
            }
        }

        return null;
    }

    private GameObject GetBossUiRoot()
    {
        return HasAssignedBossUi() ? bossUiRootOverride : bossUiRoot;
    }

    private GameObject GetPlayerDamageFlashRoot()
    {
        if (playerDamageFlashRootOverride != null)
        {
            return playerDamageFlashRootOverride;
        }

        if (playerDamageFlashCanvasGroupOverride != null)
        {
            return playerDamageFlashCanvasGroupOverride.gameObject;
        }

        if (playerDamageFlashImageOverride != null)
        {
            return playerDamageFlashImageOverride.gameObject;
        }

        return null;
    }

    private CanvasGroup GetPlayerDamageFlashCanvasGroup()
    {
        if (playerDamageFlashCanvasGroupOverride != null)
        {
            return playerDamageFlashCanvasGroupOverride;
        }

        GameObject activeRoot = GetPlayerDamageFlashRoot();
        return activeRoot != null ? activeRoot.GetComponent<CanvasGroup>() : null;
    }

    private Image GetPlayerDamageFlashImage()
    {
        if (playerDamageFlashImageOverride != null)
        {
            return playerDamageFlashImageOverride;
        }

        GameObject activeRoot = GetPlayerDamageFlashRoot();
        if (activeRoot == null)
        {
            return null;
        }

        Image rootImage = activeRoot.GetComponent<Image>();
        if (rootImage != null)
        {
            return rootImage;
        }

        return activeRoot.GetComponentInChildren<Image>(true);
    }

    private Image GetBossHpFill()
    {
        return HasAssignedBossUi() ? bossHpFillOverride : bossHpFill;
    }

    private GameObject GetBossSpawnProgressRoot()
    {
        return HasAssignedBossSpawnProgressUi() ? bossSpawnProgressRootOverride : bossSpawnProgressRoot;
    }

    private Slider GetBossSpawnProgressSlider()
    {
        return HasAssignedBossSpawnProgressUi() ? bossSpawnProgressSliderOverride : bossSpawnProgressSlider;
    }

    private TMP_Text GetBossSpawnProgressText()
    {
        return HasAssignedBossSpawnProgressUi() ? bossSpawnProgressTextOverride : bossSpawnProgressText;
    }

    private GameObject GetPlayerHpRoot()
    {
        if (playerHpRootOverride != null)
        {
            return playerHpRootOverride;
        }

        if (playerHpSliderOverride != null)
        {
            return playerHpSliderOverride.gameObject;
        }

        return playerHpRoot;
    }

    private Slider GetPlayerHpSlider()
    {
        return playerHpSliderOverride != null ? playerHpSliderOverride : playerHpSlider;
    }

    private TMP_Text GetPlayerHpText()
    {
        return playerHpTextOverride != null ? playerHpTextOverride : playerHpText;
    }

    private void SetBossName(string bossName)
    {
        if (HasAssignedBossUi() && bossNameTextOverride != null)
        {
            bossNameTextOverride.text = bossName;
            return;
        }

        if (bossNameText != null)
        {
            bossNameText.text = bossName;
        }
    }

    private bool HasAssignedBossUi()
    {
        return bossUiRootOverride != null && bossHpFillOverride != null;
    }

    private bool HasAssignedBossSpawnProgressUi()
    {
        return bossSpawnProgressRootOverride != null && bossSpawnProgressSliderOverride != null;
    }

    private bool HasAssignedPlayerHpUi()
    {
        return playerHpSliderOverride != null;
    }

    private bool HasAssignedPlayerDamageFlashUi()
    {
        return GetPlayerDamageFlashRoot() != null;
    }
}
