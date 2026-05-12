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
    public AudioClip winSound;
    public AudioClip buySound;
    public AudioClip noCoinSound;
    public AudioClip getCoinSound;
    public AudioClip fireSound;
    public AudioClip openBlockSelectSound;
    public AudioClip selectBlockItemSound;
    public List<AudioClip> lstMoveSound;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        bgSound=LunaManager.ins.bgMusic;
        PlayMusic();
    }

    public void PlaySound(AudioClip audioClip)
    {
        if (audioClip == null || sound == null)
        {
            return;
        }

        sound.PlayOneShot(audioClip,1);
    }

    public void PlaySoundMerge()
    {
        sound.PlayOneShot(lstMergeSound[Random.Range(0,lstMergeSound.Count)],1);
    }
    public void PlaySoundFire()
    {
        sound.PlayOneShot(fireSound,1);
    }
    public void PlaySoundMove()
    {
        sound.PlayOneShot(lstMoveSound[Random.Range(0,lstMoveSound.Count)],1);
    }
    public void PlaySoundReward()
    {
        sound.PlayOneShot(rewardSound,1);
    }
    public void PlaySoundGetCoin()
    {
        sound.PlayOneShot(getCoinSound,1);
    }
    public void PlaySoundBuy()
    {
        sound.PlayOneShot(buySound,1);
    }
    public void PlaySoundNotEnough()
    {
        sound.PlayOneShot(noCoinSound,1);
    }
    public void PlaySoundBomb()
    {
        sound.PlayOneShot(bombSound,1);
    }

    public void PlaySoundXixi()
    {
        PlaySoundBomb();
    }

    public void PlaySoundXixi(Vector3 position)
    {
        if (bombSound == null)
        {
            return;
        }

        AudioSource.PlayClipAtPoint(bombSound, position, sound != null ? sound.volume : 1f);
    }

    public void PlaySoundBuild()
    {
        sound.PlayOneShot(buildSound,1);
    }
    public void PlayMiningSound()
    {
        sound.PlayOneShot(miningSound,1);
    }

    public void PlayOpenBlockSelectSound()
    {
        PlaySound(openBlockSelectSound);
    }

    public void PlaySelectBlockItemSound()
    {
        PlaySound(selectBlockItemSound);
    }

    public void PlayMusicLose()
    {
        music.Stop();
        music.loop = false;
        music.clip = loseSound;
        music.Play();
    }
    public void PlayMusicWin()
    {
        music.Stop();
        music.loop = false;
        if (winSound != null)
        {
            music.clip = winSound;
            music.Play();
        }
        
    }
    public void PlayMusic()
    {
        music.Stop();
        music.loop = true;
        music.clip = bgSound;
        music.Play();
    }
}
