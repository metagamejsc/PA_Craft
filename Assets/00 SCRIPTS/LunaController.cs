using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Show End Card?")] public bool ShowEndCard;
    [LunaPlaygroundField("Use Max Click?")] public bool UseMaxClick;
    [LunaPlaygroundField("Max Click")] public int MaxClick;
    [LunaPlaygroundField("Time Play")] public float TimePlay;

    [SerializeField] private List<Button> CTA;
    [SerializeField] private Button endCard;
    private int count;
    void Start()
    {
        //CTA.ForEach(b => b.onClick.AddListener(ClickCTA));
        endCard.onClick.AddListener(ClickCTA);
        GameController.Ins.OnClick += CountClick;
        StartCoroutine(EndGame());
    }
    private void CountClick()
    {
        if (!UseMaxClick) return;
        count++;
        if (count >= MaxClick && ShowEndCard) Show();
    }
    private void Show()
    {
        if (!ShowEndCard) return;
        endCard.gameObject.SetActive(true);
    }
    private void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(TimePlay);
        Luna.Unity.LifeCycle.GameEnded();
        Show();
    }
}
