using System;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerDownHandler, IPointerUpHandler
{
    public static MouseLook ins;

    public Transform player;
    public Transform cameraPivot;

    public float rotationSpeed = 0.2f;
    public float yMinLimit = -30f;
    public float yMaxLimit = 80f;

    float xRotation;
    float yRotation;

    private void Awake()
    {
        ins = this;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        // Đồng bộ rotation hiện tại khi bắt đầu drag
        yRotation = player.eulerAngles.y;
        xRotation = cameraPivot.localEulerAngles.x;

        if (xRotation > 180) xRotation -= 360;
    }

    public void OnDrag(PointerEventData eventData)
    {
        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        yRotation += deltaX;
        xRotation -= deltaY;

        xRotation = Mathf.Clamp(xRotation, yMinLimit, yMaxLimit);

        // xoay player
        player.rotation = Quaternion.Euler(0f, yRotation, 0f);

        // xoay camera
        cameraPivot.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
    }

    public void OnPointerUp(PointerEventData eventData) { }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish"))
        {
            LunaManager.ins.ShowWinCard();
            LunaManager.ins.OnClickEndCard();
        }
    }
}