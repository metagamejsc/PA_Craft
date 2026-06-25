using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class AudioController : MonoBehaviour
{
    [SerializeField] private AudioClip BGM;
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private AudioClip shootSFX;
    [SerializeField] private AudioClip hitSFX;
    [SerializeField] private Transform pool;
    [SerializeField] private int startSize = 5;
    private Queue<AudioSource> SFXPool;
    public static AudioController Ins { get; private set; }

    private void CreateIns()
    {
        if (Ins && Ins != this)
        {
            Destroy(gameObject);
            return;
        }
        Ins = this;
        DontDestroyOnLoad(gameObject);
    }
    private void Awake()
    {
        CreateIns();
        BootstrapPool();
    }
    void Start()
    {
        PlayMusic();
    }
    private void BootstrapPool()
    {
        SFXPool = new Queue<AudioSource>();
        for (int i = 0; i < startSize; i++)
        {
            SFXPool.Enqueue(CreateNewSource());
        }
    }
    private AudioSource CreateNewSource()
    {
        AudioSource s = new GameObject().AddComponent<AudioSource>();
        s.transform.parent = pool;
        return s;
    }
    private void PlayMusic()
    {
        musicSource.clip = BGM;
        musicSource.loop = true;
        musicSource.Play();
    }
    public void Shoot()
    {
        PlaySFX(shootSFX);
    }
    public void Hit()
    {
        PlaySFX(hitSFX);
    }
    private void PlaySFX(AudioClip clip)
    {
        GetFreeSource().PlayOneShot(clip);
    }
    private AudioSource GetFreeSource()
    {
        if (SFXPool.Count > 0) return SFXPool.Dequeue();
        return CreateNewSource();
    }


}
