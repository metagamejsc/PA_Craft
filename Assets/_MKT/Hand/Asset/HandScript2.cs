using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HandScript2 : MonoBehaviour
{
    private Animator _anim;

    void Start()
    {
        _anim = this.gameObject.GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 _mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        transform.localPosition = new Vector3(_mousePos.x, _mousePos.y, 0f);

        if (Input.GetMouseButtonDown(0))
        {
            _anim.SetTrigger("TouchDown");

            //Debug.Log("err");
        }

        if (Input.GetMouseButtonUp(0))
        {
            _anim.SetTrigger("TouchUp");
            //Debug.Log("haizz");
        }
    }
}
