using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DelayDestroyObject : MonoBehaviour
{
    public float timeDestroy=2;
    void Start()
    {
        Destroy(gameObject,timeDestroy);
    }
}
