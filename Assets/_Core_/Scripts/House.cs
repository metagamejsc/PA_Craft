using UnityEngine;

public class House : MonoBehaviour
{
    [SerializeField] private GameObject _dog;
    [SerializeField] private GameObject _bird;
    [SerializeField] private GameObject _meat;
    [SerializeField] private GameObject _eggs;
    [SerializeField] private AudioClip _dogSound;
    [SerializeField] private AudioClip _birdSound;
    [SerializeField] private AudioSource _audio;

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
        _audio.Play();
    }

    public void ShowMeat()
    {
        _meat.SetActive(true);
        _audio.Play();
    }

    public void ShowEggs()
    {
        _eggs.SetActive(true);
        _audio.Play();
    }

    public void ShowBird()
    {
        _bird.SetActive(true);
        PlayAnimalSound(_birdSound);
        _audio.Play();
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