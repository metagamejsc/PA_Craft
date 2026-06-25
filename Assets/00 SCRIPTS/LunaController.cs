using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [SerializeField] private Button endCard;
    private void Start()
    {
        endCard.onClick.AddListener(ClickCTA);
        StartCoroutine(End());
        GameController.Ins.OnEnd += ShowEndCard;
    }
    private void ShowEndCard()
    {
        endCard.gameObject.SetActive(true);
    }
    private void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
    private IEnumerator End()
    {
        yield return new WaitForSeconds(TimePlay);
        ShowEndCard();
        Luna.Unity.LifeCycle.GameEnded();
        ClickCTA();
    }
}
