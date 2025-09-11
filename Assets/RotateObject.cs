using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RotateObject : MonoBehaviour
{
    public float rotationSpeed = 10f;
    public Vector3 vecterRotate;
    public Transform objectRotate;
   
    void Update()
    {
        objectRotate.Rotate(vecterRotate * rotationSpeed * Time.deltaTime);
    }

    public void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            collision.gameObject.GetComponent<Rigidbody>().AddForce(new Vector3(rotationSpeed*vecterRotate.normalized.z,0,0));
        }
    }
}
