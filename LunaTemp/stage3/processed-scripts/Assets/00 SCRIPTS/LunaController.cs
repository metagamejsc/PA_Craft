using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;
    [LunaPlaygroundField("Pixel Art?")] public bool UsePixelArt;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;
    [SerializeField] private GameObject normalLeft;
    [SerializeField] private GameObject pixelLeft;
    [SerializeField] private GameObject normalRight;
    [SerializeField] private GameObject pixelRight;

    [SerializeField] private AudioSource musicSource;
    [SerializeField] private Button endCard;
    private void Start()
    {
        if (UsePixelArt)
        {
            pixelLeft.SetActive(true);
            pixelRight.SetActive(true);
        }
        else
        {
            normalLeft.SetActive(true);
            normalRight.SetActive(true);
        }
        endCard.onClick.AddListener(ClickCTA);
        musicSource.clip = BGM;
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
