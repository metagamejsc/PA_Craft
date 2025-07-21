using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using Random = System.Random;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;
    public LayerMask groundLayer;
    public GameObject blockPrefab;
    public GameObject blockPrefab2;
    public float timeHold = 0;
    public bool isHold = false;
    public Transform posCam;
    public TextMeshProUGUI textMeshProUGUI;
    public bool isLeft = true;

    public Inventory inv;
    private void Awake()
    {
        ins= this;
        isLeft=UnityEngine.Random.Range(0, 2) == 0; // Randomly choose left or right
        textMeshProUGUI.text= isLeft ? "Swipe Left to Attack" : "Swipe Right to Attack";
    }

    private void FixedUpdate()
    {
        if (enemyBody==null)
        {
            if (GameObject.FindGameObjectWithTag("Enemy")!=null)
            {
                enemyBody= GameObject.FindGameObjectWithTag("Enemy").transform;
            }
        }
    }

    public float mouseSensitivity = 180;

    public Transform playerBody;
    public Transform enemyBody;
    public Camera cameraMain;

    private float xRotation = 0f;
    public Action onClick;
    private Vector2 startTouchPosition;
    private Vector2 endTouchPosition;
    
    public void OnPointerDown(PointerEventData eventData)
    {
        // Ghi lại vị trí bắt đầu
        startTouchPosition = eventData.position;
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        // Ghi lại vị trí kết thúc
        endTouchPosition = eventData.position;

        // Kiểm tra hướng swipe
        CheckSwipeDirection();
    }

    private void CheckSwipeDirection()
    {
        float deltaX = endTouchPosition.x - startTouchPosition.x;

        if (Mathf.Abs(deltaX) > 1) // Ngưỡng để xác định swipe
        {
            if (deltaX > 0)
            {
                if (!isLeft)
                {
                    OnWin();
                }
                else
                {
                    Lose();
                }
            }
            else
            {
                if (isLeft)
                {
                    OnWin();
                }
                else
                {
                    Lose();
                }
            }
        }
    }
    float mx;

    public void OnWin()
    {
        Vector3 directionToEnemy = (enemyBody.position - playerBody.position).normalized;
// Rotate the player body to face the enemy
        Quaternion lookRotation = Quaternion.LookRotation(new Vector3(directionToEnemy.x, 0, directionToEnemy.z));
        playerBody.rotation = lookRotation;
// Adjust the camera to look at the enemy
        cameraMain.transform.rotation = Quaternion.LookRotation(directionToEnemy);

        Debug.Log("Swipe sang phải - Camera hướng đến enemy");
        enemyBody.GetComponent<ZombieChar>().SetDead();
        playerBody.GetComponent<PlayerChar>().HandleAttack();
        Invoke(nameof(Win),1f);
    }

    public void Win()
    {
        LunaManager.ins.ShowWinCard();
    }
    public void Lose()
    {
        LunaManager.ins.OnClickEndCard();
    }
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
