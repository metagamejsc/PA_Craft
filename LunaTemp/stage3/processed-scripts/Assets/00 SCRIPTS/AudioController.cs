using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioController : MonoBehaviour
{
    [LunaPlaygroundField("Music Volume 0->1")] public float MVolume;
    [SerializeField] private AudioClip BGM;
    [SerializeField] private AudioClip clickClip;
    [SerializeField] private AudioClip effectClip;
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private Transform poolParent;
    [SerializeField] private int startPoolSize;
    private Queue<AudioSource> SFXPool;
    private void Awake()
    {
        BootstrapSFXPool();
    }
    private void Start()
    {
        GameController.Ins.OnClick += PlaySFX;
        PlayMusic();
    }
    private void BootstrapSFXPool()
    {
        SFXPool = new Queue<AudioSource>();
        for (int i = 0; i < startPoolSize; i++)
        {
            SFXPool.Enqueue(CreateNewSource());
        }
    }

    public void PlayMusic()
    {
        musicSource.clip = BGM;
        musicSource.volume = MVolume;
        musicSource.Play();
    }
    public void PlaySFX()
    {
        PlayOneShot(clickClip);
        PlayOneShot(effectClip);
    }
    private void PlayOneShot(AudioClip clip)
    {
        AudioSource s = GetFreeSource();
        s.PlayOneShot(clip);
        StartCoroutine(ReturnPool(s));
    }
    private AudioSource GetFreeSource()
    {
        if (SFXPool.Count > 0) return SFXPool.Dequeue();
        return CreateNewSource();
    }
    private AudioSource CreateNewSource()
    {
        AudioSource s = new GameObject().AddComponent<AudioSource>();
        s.transform.SetParent(poolParent);
        return s;
    }
    private IEnumerator ReturnPool(AudioSource s)
    {
        yield return new WaitUntil(() => !s.isPlaying);
        SFXPool.Enqueue(s);
    }
}
