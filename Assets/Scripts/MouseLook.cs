using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using Random = System.Random;

public class MouseLook : MonoBehaviour
{
    public static MouseLook ins;
    public TextMeshProUGUI textMeshProUGUI;


    public Inventory inv;
    private void Awake()
    {
        ins= this;
     
    }
    
    public float mouseSensitivity = 180;

    public void OnDrag(PointerEventData eventData)
    {
        /*float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;
        //camera's x rotation (look up and down)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);
        cameraMain.transform.localRotation = Quaternion.Euler(xRotation, 0, 0);
        playerBody.Rotate(Vector3.up * mouseX);*/
    }
}
