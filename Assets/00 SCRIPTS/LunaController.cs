using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private Button CTA;
    [SerializeField] private Button endCard;

    private void Awake()
    {
        musicSource.clip = BGM;
        CTA.onClick.AddListener(ClickCTA);
        endCard.onClick.AddListener(ClickCTA);
    }
    private void Start()
    {
        musicSource.Play();
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
