using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HandScript : MonoBehaviour
{
    // Start is called before the first frame update

    public Animator _anim;
    public float timeDelay = 0.5f;

    void Start()
    {
        _anim = this.gameObject.GetComponent<Animator>();
        StartCoroutine(PlayAnimation());
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 _mousePos = Input.mousePosition;
        transform.position = _mousePos;

        if (Input.GetMouseButtonDown(0))
        {
            _anim.SetTrigger("TouchDown");

            Debug.Log("err");
        }
        
        if (Input.GetMouseButtonUp(0))
        {
            _anim.SetTrigger("TouchUp");
            Debug.Log("haizz");
        }
    }
    IEnumerator PlayAnimation()
    {
        while (true)
        {
            _anim.SetTrigger("TouchDown");
            yield return new WaitForSeconds(timeDelay);
            _anim.SetTrigger("TouchUp");
        }
        
    }
}
