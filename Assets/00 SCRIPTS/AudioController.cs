using System.Collections.Generic;
using UnityEngine;

public class AudioController : MonoBehaviour
{
    [SerializeField] private AudioClip BGM;
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private AudioClip effectSound1;
    [SerializeField] private AudioClip effectSound2;
    [SerializeField] private Transform SFXPool;
    [LunaPlaygroundField("Music Volume")] public float MusicVolume;
    private List<AudioSource> SFXSources;

    private void Awake()
    {
        InitPool();
    }
    private void Start()
    {
        GameController.Ins.OnSwitchItem += PlaySFX;
        musicSource.clip = BGM;
        musicSource.loop = true;
        musicSource.volume = MusicVolume;
        musicSource.Play();
    }
    private void InitPool()
    {
        SFXSources = new List<AudioSource>();
        CreateSFXSource();
        CreateSFXSource();
        CreateSFXSource();
        CreateSFXSource();
        CreateSFXSource();
    }
    private AudioSource CreateSFXSource()
    {
        AudioSource s = new GameObject().AddComponent<AudioSource>();
        SFXSources.Add(s);
        s.transform.SetParent(SFXPool);
        return s;
    }

    private AudioSource GetFreeSFXSources()
    {
        foreach (var s in SFXSources)
        {
            if (!s.isPlaying) return s;
        }
        return CreateSFXSource();
    }
    private void PlaySFX()
    {
        GetFreeSFXSources().PlayOneShot(effectSound1);
        GetFreeSFXSources().PlayOneShot(effectSound2);
    }
}
