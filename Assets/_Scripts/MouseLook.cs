using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler
{
    public static MouseLook ins;

    public Transform target;
    public Transform cameraPivot;
    public bool allowInput = true;
    public Action onMouseUpShoot;
    public float rotationSpeed = 0.2f;
    public List<GameObject> tutorialUI;

    private PlayerChar playerChar;
    private Quaternion startCameraLocalRotation;
    private float pitchAngle;

    private void Awake()
    {
        ins = this;
    }

    private void Start()
    {
        if (target != null)
        {
            playerChar = target.GetComponent<PlayerChar>();
        }

        if (cameraPivot == null && Camera.main != null)
        {
            cameraPivot = Camera.main.transform;
        }

        if (cameraPivot != null)
        {
            startCameraLocalRotation = cameraPivot.localRotation;
            pitchAngle = NormalizeAngle(cameraPivot.localEulerAngles.x);
        }
    }

    public void SnapToDirection(Vector3 direction)
    {
        if (target == null) return;

        Vector3 flatDirection = new Vector3(direction.x, 0f, direction.z);
        if (flatDirection.sqrMagnitude <= 0.001f) return;

        target.rotation = Quaternion.LookRotation(flatDirection.normalized, Vector3.up);
        playerChar?.RotateModelToDirection(flatDirection, 1000f);
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (!allowInput || target == null) return;

        float deltaX = eventData.delta.x * rotationSpeed;
        float deltaY = eventData.delta.y * rotationSpeed;

        target.Rotate(Vector3.up, deltaX, Space.World);
        playerChar?.RotateModelToDirection(target.forward, 20f);

        if (cameraPivot != null)
        {
            pitchAngle = Mathf.Clamp(pitchAngle - deltaY, -80f, 80f);
            cameraPivot.localRotation = Quaternion.Euler(
                pitchAngle,
                startCameraLocalRotation.eulerAngles.y,
                startCameraLocalRotation.eulerAngles.z);
        }
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (!allowInput) return;
        foreach (var VARIABLE in tutorialUI)
        {
            if (VARIABLE != null)
            {
                VARIABLE.SetActive(false);
            }
        }
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!allowInput) return;
        //onMouseUpShoot?.Invoke();
    }

    private float NormalizeAngle(float angle)
    {
        angle %= 360f;
        if (angle > 180f) angle -= 360f;
        return angle;
    }
}
