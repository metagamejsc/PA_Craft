using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Line : MonoBehaviour
{
    public int id;
    public bool isLeft,isRight;
    public Transform zombieLeft, zombieRight;
    public bool hasZombie=> isLeft || isRight;
    
    public void Start()
    {
        ActiveZombie();
    }
    public void ActiveZombie()
    {
        zombieLeft.gameObject.SetActive(isLeft);
        zombieRight.gameObject.SetActive(isRight);
    }

    public void OnCreate(int id,bool isLeft, bool isRight)
    {
        this.id = id;
        ActiveZombie();
    }
}
