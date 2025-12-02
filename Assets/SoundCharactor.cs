using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class SoundCharactor : MonoBehaviour
{
    public AudioClip[] idleAudio;
    public AudioSource audioSource;

    private void Start()
    {
        StartCoroutine(IERandomSound());
    }

    public IEnumerator IERandomSound()
    {
        while (true)
        {
            float time = Random.Range(3f, 7f);
            yield return new WaitForSeconds(time);
            audioSource.PlayOneShot(idleAudio[Random.Range(0,idleAudio.Length)]);
        }
    }

}
