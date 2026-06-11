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
        sound.PlayOneShot(audioClip,1);
    }
    
    public void PlaySoundLoop(AudioClip audioClip)
    {
        sound.clip = audioClip;
        sound.loop = true;
        sound.Play();
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
    public void PlaySoundBuild()
    {
        sound.PlayOneShot(buildSound,1);
    }
    public void PlayMiningSound()
    {
        sound.PlayOneShot(miningSound,1);
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
        music.clip = winSound;
        music.Play();
    }
    public void PlayMusic()
    {
        music.Stop();
        music.loop = true;
        music.clip = bgSound;
        music.Play();
    }
}
