using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HoldHandSheep : MonoBehaviour
{
    public GameObject sheep, player;
    public Transform holdHandPoint;
    public float rotationSpeed = 5f;
    public float fireSpeed = 5f;
    
    private void Update()
    {
        if (sheep==null)
        {
            sheep = GameObject.FindGameObjectWithTag("Enemy");
        }
        player = GameObject.FindGameObjectWithTag("Player");
    }

    public void StartHoldHand()
    {
        sheep.transform.parent = holdHandPoint;
        sheep.transform.localPosition=Vector3.zero;
        sheep.GetComponent<ZombieChar>().HandleHoldHand();
    }
    [ContextMenu("StartRotatePlayer")]
    public void StartRotatePlayer()
    {
        StartHoldHand();
        Camera.main.transform.rotation= Quaternion.Euler(-20, 0, 0);
        StartCoroutine(RotatePlayer());
        
    }
    public IEnumerator RotatePlayer()
    {
        while (true)
        {
            player.transform.Rotate(new Vector3(0, rotationSpeed * Time.deltaTime, 0), Space.Self);
            yield return null;
        }
    }
    [ContextMenu("StopRotatePlayer")]
    public void StopRotatePlayer()
    {
        AudioManager.ins.PlaySoundBomb();
        StopAllCoroutines();
        sheep.transform.parent = null;
        sheep.GetComponent<Rigidbody>().isKinematic = false;
        sheep.GetComponentInChildren<AudioSource>().mute = true;
        sheep.GetComponent<Rigidbody>().AddForce(Camera.main.transform.forward * fireSpeed, ForceMode.Impulse);
    }
}
