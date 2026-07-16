using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundField("Limit Time Play")] public bool LimitTimePlay;
    [LunaPlaygroundField("BG Color")] public Color BGColor;
    [SerializeField] private Image BGImage;
    [SerializeField] private Button endCard;
    private void Awake()
    {
        BGImage.color = BGColor;
        endCard.onClick.AddListener(ClickCTA);
    }
    private void Start()
    {
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
