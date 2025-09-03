using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetSoundGun : MonoBehaviour
{
    public AudioSource audioSource;
    void Start()
    {
        audioSource.clip=LunaManager.ins.soundGun;
    }
}
