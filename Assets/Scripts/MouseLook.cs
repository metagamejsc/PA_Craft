using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class MouseLook : MonoBehaviour, IPointerUpHandler, IPointerDownHandler,IDragHandler
{
    public static MouseLook ins;
    public float timeHoldFire = 0f;
    public Transform target;
    [Header("Mượt hoá khi nhìn theo target")]
    public float lookAtSmoothSpeed = 5f;   // tăng lên quay nhanh hơn, giảm xuống quay chậm/mượt hơn


    private void Awake()
    {
        ins = this;
    }

    public float mouseSensitivity = 180;

    public Transform playerBody;
    public Camera cameraMain;

    // ===== THÊM GIỚI HẠN XOAY THEO X VÀ Y =====
    [Header("Giới hạn xoay theo trục X (ngẩng/cúi)")]
    public float minVertical = -60f;   // xuống tối đa
    public float maxVertical = 60f;    // ngẩng tối đa

    [Header("Giới hạn xoay theo trục Y (quay trái/phải)")]
    public float minHorizontal = -90f; // quay trái tối đa
    public float maxHorizontal = 90f;  // quay phải tối đa

    private float xRotation = 0f;      // pitch
    private float yRotation = 0f;        // yaw
    public Action onClick;

    void Start()
    {
        // Lấy góc ban đầu của camera & player để bắt đầu tính
        Vector3 camEuler = cameraMain.transform.localEulerAngles;
        xRotation = camEuler.x;
        if (xRotation > 180f) xRotation -= 360f;  // chuyển về khoảng -180..180

        Vector3 bodyEuler = playerBody.eulerAngles;
        yRotation = bodyEuler.y;
        if (yRotation > 180f) yRotation -= 360f;  // chuyển về khoảng -180..180
    }

    float mx;

    // ===== SỬA HÀM OnDrag ĐỂ XOAY CÓ GIỚI HẠN =====
    public void OnDrag(PointerEventData eventData)
    {
        if (GameController.ins.isEndGame)
        {
            return;
        }
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        // tránh giật value bất thường
        if (Mathf.Abs(mouseX) > 20 || Mathf.Abs(mouseY) > 20)
            return;

        // cập nhật góc xoay
        xRotation -= mouseY;  // trục X (ngẩng/cúi)
        yRotation += mouseX;  // trục Y (quay trái/phải)

        // clamp trong khoảng cho phép
        xRotation = Mathf.Clamp(xRotation, minVertical, maxVertical);
        yRotation = Mathf.Clamp(yRotation, minHorizontal, maxHorizontal);

        // áp dụng cho camera (chỉ pitch trên trục X)
        cameraMain.transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);

        // áp dụng yaw cho thân nhân vật
        playerBody.rotation = Quaternion.Euler(0f, yRotation, 0f);
    }

    private void Update()
    {
        if (target)
        {
            UpdateCameraLookAt(target);
        }

        if (GameController.ins != null && GameController.ins.isEndGame)
        {
            return;
        }
    }

    public void OnPointerUp(PointerEventData eventData)
    {
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (GameController.ins.isEndGame)
        {
            return;
        }
    }

    private void OnDisable()
    {
        timeHoldFire = 0f;
    }

    public void UpdateCameraLookAt(Transform target)
    {
        if (target == null || cameraMain == null || playerBody == null) return;

        // Hướng từ camera tới target
        Vector3 dir = (target.position - cameraMain.transform.position).normalized;

        Vector3 dirHorizontal = new Vector3(dir.x, 0f, dir.z);
        if (dirHorizontal.sqrMagnitude < 0.0001f) return;

        float yaw = Mathf.Atan2(dirHorizontal.x, dirHorizontal.z) * Mathf.Rad2Deg;
        float pitch = Mathf.Atan2(dir.y, dirHorizontal.magnitude) * Mathf.Rad2Deg;

        // hệ đang dùng: xRotation = -pitch
        float targetX = -pitch;
        float targetY = yaw;

        // clamp góc mục tiêu
        targetX = Mathf.Clamp(targetX, minVertical, maxVertical);
        targetY = Mathf.Clamp(targetY, minHorizontal, maxHorizontal);

        // LERP góc hiện tại -> góc mục tiêu cho mượt
        float t = lookAtSmoothSpeed * Time.deltaTime;
        xRotation = Mathf.LerpAngle(xRotation, targetX, t);
        yRotation = Mathf.LerpAngle(yRotation, targetY, t);

        // áp dụng rotation
        cameraMain.transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        playerBody.rotation = Quaternion.Euler(0f, yRotation, 0f);
    }

}
