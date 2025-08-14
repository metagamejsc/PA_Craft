using System;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class TwoFingerTouchController : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    [SerializeField] private Image touchZone1;
    [SerializeField] private Image touchZone2;
    [SerializeField] private HoldHandSheep holdHandSheep;
    [SerializeField] private TextMeshProUGUI txt1, txt2,txtTime;
    [SerializeField] private float timeCurrent;

    private bool isTouching1 = false;
    private bool isTouching2 = false;
    private bool isHolding = false;

    public void OnPointerDown(PointerEventData eventData)
    {
        // Kiểm tra xem ngón tay chạm vào GameObject nào
        if (eventData.pointerCurrentRaycast.gameObject == touchZone1.gameObject)
        {
           
            isTouching1 = true;
            txt1.gameObject.SetActive(false);
            if (isTouching1 && isTouching2)
            {
                txt2.gameObject.SetActive(true);
            }
        }
        else if (eventData.pointerCurrentRaycast.gameObject == touchZone2.gameObject)
        {
            
            isTouching2 = true;
            txt1.gameObject.SetActive(false);
            if (isTouching1 && isTouching2)
            {
                txt2.gameObject.SetActive(true);
            }
        }

        CheckAndStartHold();
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        // Khi thả, kiểm tra xem ngón tay ban đầu nhấn vào cái gì
        // Dùng eventData.pointerPress để biết nút nào được nhấn ban đầu
        if (eventData.pointerPress != touchZone1.gameObject)
        {
            isTouching1 = false;
        }
        if (eventData.pointerPress != touchZone2.gameObject)
        {
            isTouching2 = false;
        }

        CheckAndStopHold();
    }

    private void Update()
    {
        if (txt2.gameObject.activeSelf)
        {
            if (timeCurrent>0)
            {
                timeCurrent-= Time.deltaTime;
                txtTime.text ="Time left: "+ timeCurrent.ToString("F2");
            }else
            {
                txtTime.text = "Time left: 0.00";
                if (LunaManager.ins.isCretivePause==false)
                {
                    if (isHolding)
                    {
                        holdHandSheep.StopRotatePlayer();
                        isHolding = false;
                    }
                    LunaManager.ins.ShowEndCard();
                }
            }
        }

        if (Input.GetKeyDown(KeyCode.Q))
        {
            isTouching1 = true;
            txt1.gameObject.SetActive(false);
            if (isTouching1 && isTouching2)
            {
                txt2.gameObject.SetActive(true);
            }
        }
        if (Input.GetKeyDown(KeyCode.W))
        {
            isTouching2 = true;
            txt1.gameObject.SetActive(false);
            if (isTouching1 && isTouching2)
            {
                txt2.gameObject.SetActive(true);
            }
        }
        if (Input.GetKeyUp(KeyCode.E))
        {
            CheckAndStartHold();
        }
        
        if (Input.GetKeyDown(KeyCode.R))
        {
            isTouching1 = false;
        }
        if (Input.GetKeyDown(KeyCode.T))
        {
            isTouching2 = false;
        }
        if (Input.GetKeyUp(KeyCode.Y))
        {
            CheckAndStopHold();
        }
    }

    private void CheckAndStartHold()
    {
        if (isTouching1 && isTouching2 && !isHolding && holdHandSheep != null)
        {
            holdHandSheep.StartRotatePlayer();
            isHolding = true;
        }
    }

    private void CheckAndStopHold()
    {
        if ((!isTouching1 || !isTouching2) && isHolding && holdHandSheep != null)
        {
            holdHandSheep.StopRotatePlayer();
            isHolding = false;
        }
    }
}