using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.PlayerLoop;

public class RopeRotate : MonoBehaviour
{
    public Vector3 rotationSpeed = new Vector3(0f, 0f, 0f);
    public Transform rotateObject;
    
    void Start()
    {
        rotationSpeed = new Vector3(0, 0, LunaManager.ins.rotateSpeed);
    }
    void FixedUpdate()
    {
        rotateObject.Rotate(rotationSpeed * Time.fixedDeltaTime);
    }

}
