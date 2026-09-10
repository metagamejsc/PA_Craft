using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;
    [LunaPlaygroundField("Time Play")] public float TimePlay;

    [LunaPlaygroundAsset("BG")] public Texture2D BGTex;
    [SerializeField] private RawImage BGImage;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;
    [SerializeField] private AudioSource musicSource;
    
    [SerializeField] private Button endCard;
    private void Start()
    {
        endCard.onClick.AddListener(ClickCTA);

        BGImage.texture = BGTex;
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
