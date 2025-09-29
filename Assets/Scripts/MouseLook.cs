using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;
    public LayerMask groundLayer;
    public GameObject blockPrefab;

    public float timeHold = 0;
    public bool isHold = false;
    public Transform posCam;

    public Inventory inv;
    private Vector2 previousPointerPosition;
    private void Awake()
    {
        ins= this;
    }

    public float mouseSensitivity = 180;

    public Transform playerBody;
    public Camera cameraMain;

    private float xRotation = 0f;
    public Action onClick;
    
    // Start is called before the first frame update
    void Start()
    {
        //Cursor.lockState = CursorLockMode.Locked;
        //Cursor.visible = false;

        /*mouseSensitivity = 180;

        if(Application.isEditor)
            mouseSensitivity = 400;*/
    }

    float mx;
    
    public void OnDrag(PointerEventData eventData)
    {
        /*float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        if(Mathf.Abs(mouseX) > 20 || Mathf.Abs(mouseY) > 20)
            return;

        //camera's x rotation (look up and down)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);

        cameraMain.transform.localRotation = Quaternion.Euler(xRotation, 0, 0);

        //mx = Input.GetAxis("Mouse X");
        
        //player body's y rotation (turn left and right)
        playerBody.Rotate(Vector3.up * mouseX);*/
        
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        //StopAllCoroutines();
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        //StartCoroutine(DestroyBlock());
        //DesTroyBlock();
    }
    public void Update()
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
#if UNITY_EDITOR
        if (Input.GetMouseButtonDown(0))
        {
           
            previousPointerPosition = Input.mousePosition;
        }
        else if (Input.GetMouseButton(0))
        {
            Vector2 delta = (Vector2)Input.mousePosition - previousPointerPosition;
            if (delta.x > 10f)
            {
                MovePlayer(false);
            }
            if (delta.x < -10f)
            {
                MovePlayer(true);
            }
            
        }
#else
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Began)
            {
                previousPointerPosition = touch.position;
            }
            else if (touch.phase == TouchPhase.Moved)
            {
                Vector2 delta = (Vector2)Input.mousePosition - previousPointerPosition;
                if (delta.x > 10f)
                {
                    MovePlayer(false);
                }
                if (delta.x < -10f)
                {
                    MovePlayer(true);
                }
            }
        }
#endif
        
    }

    public void MovePlayer(bool MoveLeft)
    {
        if (MoveLeft)
        {
            playerBody.transform.DOMoveX(-0.5f, 1f);
        }
        else
        {
            playerBody.transform.DOMoveX(0.5f, 1f);
        }
    }
}
