using System;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    public static GameController ins;

    public PlayerChar playerChar;
    public Transform posSpawnPlayer;
    public bool isPauseGame;

    public Button btnRestart;
    public bool canRestart;
    public int countPlayerDie = 0;
    
    public List<MonsterController> listMonsterControllers;
    public Transform tranformMonster1, tranformMonster2, tranformMonster3;

    [Header("Black Screen")]
    public GameObject blackImage; // Image/Panel màn đen (full screen)

    [Header("Black Fade (IN/OUT)")]
    public float blackFadeIn = 0.25f;
    public float blackHold = 0.05f;     // giữ đen 1 chút (tuỳ chọn)
    public float blackFadeOut = 0.25f;

    private CanvasGroup blackGroup;
    private Sequence blackSeq;

    private bool monster1DeathSequencePlayed;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        btnRestart.onClick.AddListener(RestartGame);
        canRestart = LunaManager.ins.canReplay >= 1;

        SetupBlackUI();
    }

    private void OnDestroy()
    {
        blackSeq?.Kill();
        blackGroup?.DOKill();
    }
    
    private void SetupBlackUI()
    {
        if (blackImage == null) return;

        blackGroup = blackImage.GetComponent<CanvasGroup>();
        if (blackGroup == null) blackGroup = blackImage.AddComponent<CanvasGroup>();

        blackGroup.alpha = 0f;
        blackGroup.blocksRaycasts = false;
        blackGroup.interactable = false;
        blackImage.SetActive(false);
    }
    

    public void StartGame()
    {
        playerChar.OnStartRespawn();
        playerChar.transform.position = posSpawnPlayer.position;
        
        HideBlackInstant(); // reset màn đen nếu đang hiện
    }

    public void RestartGame()
    {
        if (canRestart)
        {
            if (countPlayerDie >= 1)
            {
                LunaManager.ins.OnClickEndCard();
                return;
            }
        }
        else
        {
            LunaManager.ins.OnClickEndCard();
            return;
        }

        LunaManager.ins.ReplayGame();
        StartGame();
        countPlayerDie++;
    }

    public void ShowListMonster()
    {
        foreach (var monster in listMonsterControllers)
            monster.gameObject.SetActive(true);
    }

    // ====== Monster 1 chết: Fade IN đen -> bật quái -> Fade OUT đen ======

    /// Fade in -> chạy action ở giữa -> fade out
    private void FadeBlackInOut(Action midAction, Action onComplete = null)
    {
        if (blackImage == null || blackGroup == null)
        {
            midAction?.Invoke();
            onComplete?.Invoke();
            return;
        }

        blackSeq?.Kill();
        blackGroup.DOKill();

        blackImage.SetActive(true);
        blackGroup.alpha = 0f;

        // muốn chặn thao tác lúc đang đen thì để true, không chặn thì để false
        blackGroup.blocksRaycasts = true;
        blackGroup.interactable = true;

        blackSeq = DOTween.Sequence();
        blackSeq.Append(blackGroup.DOFade(1f, blackFadeIn));
        blackSeq.AppendCallback(() => midAction?.Invoke());
        if (blackHold > 0f) blackSeq.AppendInterval(blackHold);
        blackSeq.Append(blackGroup.DOFade(0f, blackFadeOut));

        blackSeq.OnComplete(() =>
        {
            blackGroup.blocksRaycasts = false;
            blackGroup.interactable = false;
            blackImage.SetActive(false);
            onComplete?.Invoke();
        });
    }

    private void HideBlackInstant()
    {
        if (blackImage == null || blackGroup == null) return;

        blackSeq?.Kill();
        blackGroup.DOKill();

        blackGroup.alpha = 0f;
        blackGroup.blocksRaycasts = false;
        blackGroup.interactable = false;
        blackImage.SetActive(false);
    }
}
