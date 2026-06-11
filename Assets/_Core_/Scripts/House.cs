using System;
using UnityEngine;

public class House : MonoBehaviour
{
    [SerializeField] private GameObject _dog;
    [SerializeField] private GameObject _bird;
    [SerializeField] private GameObject _meat;
    [SerializeField] private GameObject _eggs;
    [SerializeField] private AudioClip _dogSound;
    [SerializeField] private AudioClip _birdSound;

    private void Start()
    {
        _dog.SetActive(false);
        _bird.SetActive(false);
        _meat.SetActive(false);
        _eggs.SetActive(false);
    }

    public void ShowDog()
    {
        _dog.SetActive(true);
        PlayAnimalSound(_dogSound);
    }

    public void ShowMeat()
    {
        _meat.SetActive(true);
    }

    public void ShowEggs()
    {
        _eggs.SetActive(true);
    }

    public void ShowBird()
    {
        _bird.SetActive(true);
        PlayAnimalSound(_birdSound);
    }

    private void PlayAnimalSound(AudioClip clip)
    {
        if (clip == null || AudioManager.ins == null)
        {
            return;
        }

        AudioManager.ins.PlaySoundLoop(clip);
    }
}