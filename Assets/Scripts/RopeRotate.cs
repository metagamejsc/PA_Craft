using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.PlayerLoop;

public class RopeRotate : MonoBehaviour
{
    public Vector3 rotationSpeed = new Vector3(0f, 0f, 0f);
    public Transform rotateObject;
    
    void FixedUpdate()
    {
        rotateObject.Rotate(rotationSpeed * Time.fixedDeltaTime);
    }

}
