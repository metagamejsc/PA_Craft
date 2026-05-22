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
    public AudioSource aimLoopSource;
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
    public AudioClip aimHoldSound;
    public List<AudioClip> lstMoveSound;

    private void Awake()
    {
        ins = this;

        if (aimLoopSource == null)
        {
            aimLoopSource = gameObject.AddComponent<AudioSource>();
            aimLoopSource.playOnAwake = false;
            aimLoopSource.loop = true;
            aimLoopSource.spatialBlend = 0f;
            aimLoopSource.volume = sound != null ? sound.volume : 1f;
        }
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

    public void PlaySoundMerge()
    {
        sound.PlayOneShot(lstMergeSound[Random.Range(0,lstMergeSound.Count)],1);
    }
    public void PlaySoundFire()
    {
        PlaySoundFire(fireSound);
    }

    public void PlaySoundFire(AudioClip clip)
    {
        AudioClip selectedClip = clip != null ? clip : fireSound;
        if (selectedClip == null)
        {
            return;
        }

        sound.PlayOneShot(selectedClip,1);
    }
    public void StartAimHold()
    {
        if (aimHoldSound == null || aimLoopSource == null)
        {
            return;
        }

        aimLoopSource.clip = aimHoldSound;
        if (!aimLoopSource.isPlaying)
        {
            aimLoopSource.Play();
        }
    }
    public void StopAimHold()
    {
        if (aimLoopSource == null)
        {
            return;
        }

        if (aimLoopSource.isPlaying)
        {
            aimLoopSource.Stop();
        }
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
