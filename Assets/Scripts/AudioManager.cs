using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class AudioManager : MonoBehaviour
{
    public static AudioManager ins;
    public AudioSource sound;
    public AudioSource music;
    public List<AudioClip> lstMergeSound;
    public AudioClip rewardSound;
    public AudioClip bombSound;
    public AudioClip loseSound;
    public AudioClip bgSound;
    public AudioClip buildSound;
    public AudioClip miningSound;
    public AudioClip fireSound;
    public List<AudioClip> lstMoveSound;

    private void Awake()
    {
        ins = this;
        EnsureAudioSources();
    }

    private void OnEnable()
    {
        if (ins == null)
        {
            ins = this;
        }

        EnsureAudioSources();
    }

    private void Start()
    {
        PlayMusic();
    }

    public void PlaySound(AudioClip audioClip)
    {
        if (audioClip == null)
        {
            return;
        }

        EnsureAudioSources();
        if (sound == null)
        {
            return;
        }

        sound.PlayOneShot(audioClip,1);
    }

    public void PlaySoundMerge()
    {
        if (lstMergeSound == null || lstMergeSound.Count == 0)
        {
            return;
        }

        EnsureAudioSources();
        if (sound == null)
        {
            return;
        }

        sound.PlayOneShot(lstMergeSound[Random.Range(0,lstMergeSound.Count)],1);
    }
    public void PlaySoundMove()
    {
        if (lstMoveSound == null || lstMoveSound.Count == 0)
        {
            return;
        }

        EnsureAudioSources();
        if (sound == null)
        {
            return;
        }

        sound.PlayOneShot(lstMoveSound[Random.Range(0,lstMoveSound.Count)],1);
    }
    public void PlaySoundReward()
    {
        EnsureAudioSources();
        if (sound == null || rewardSound == null)
        {
            return;
        }

        sound.PlayOneShot(rewardSound,1);
    }
    public void PlaySoundFire()
    {
        EnsureAudioSources();
        if (sound == null || fireSound == null)
        {
            return;
        }

        sound.PlayOneShot(fireSound,1);
    }
    public void PlaySoundBomb()
    {
        EnsureAudioSources();
        if (sound == null || bombSound == null)
        {
            return;
        }

        sound.PlayOneShot(bombSound,1);
    }
    public void PlaySoundBuild()
    {
        EnsureAudioSources();
        if (sound == null || buildSound == null)
        {
            return;
        }

        sound.PlayOneShot(buildSound,1);
    }
    public void PlayMiningSound()
    {
        EnsureAudioSources();
        if (sound == null || miningSound == null)
        {
            return;
        }

        sound.PlayOneShot(miningSound,1);
    }
    public void PlayMusicLose()
    {
        EnsureAudioSources();
        if (music == null || loseSound == null)
        {
            return;
        }

        music.loop = false;
        music.clip = loseSound;
        music.Play();
    }
    public void PlayMusic()
    {
        EnsureAudioSources();
        if (music == null || bgSound == null)
        {
            return;
        }

        music.loop = true;
        music.clip = bgSound;
        music.Play();
    }

    public void SetMusicVolume(float volume)
    {
        EnsureAudioSources();
        if (music == null)
        {
            return;
        }

        music.volume = Mathf.Clamp01(volume);
    }

    private void EnsureAudioSources()
    {
        if (sound != null && music != null)
        {
            return;
        }

        AudioSource[] audioSources = GetComponentsInChildren<AudioSource>(true);
        if (audioSources.Length == 0)
        {
            audioSources = GetComponents<AudioSource>();
        }

        if (sound == null && audioSources.Length > 0)
        {
            sound = audioSources[0];
        }

        if (music == null)
        {
            if (audioSources.Length > 1)
            {
                music = audioSources[1];
            }
            else
            {
                music = sound;
            }
        }
    }
}
