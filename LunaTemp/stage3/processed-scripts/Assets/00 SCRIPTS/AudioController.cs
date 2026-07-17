using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioController : MonoBehaviour
{
    [SerializeField] private Transform poolParent;
    [SerializeField] private int startSize;
    private Queue<AudioSource> SFXPool;

    public static AudioController Ins {get; private set;}
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
    
    private void BootstrapPool()
    {
        SFXPool = new Queue<AudioSource>();
        for (int i = 0; i < startSize; i++)
        {
            SFXPool.Enqueue(CreateNewSource());
        }
    }
    public void PlaySFX(AudioClip clip)
    {
        AudioSource s = GetFreeSource();
        s.PlayOneShot(clip);
        StartCoroutine(ReturnToPool(s));
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
    private IEnumerator ReturnToPool(AudioSource s)
    {
        yield return new WaitUntil(() => !s.isPlaying);
        SFXPool.Enqueue(s);
    }
}
