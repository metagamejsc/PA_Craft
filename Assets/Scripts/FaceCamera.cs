using UnityEngine;

public class FaceCamera : MonoBehaviour
{
    public Camera cam;
    void LateUpdate()
    {
        if (!cam) return;

        transform.LookAt(cam.transform);

        // Nếu bị “quay lưng” (mesh mặt trước ngược hướng), thử bật dòng dưới:
        // transform.Rotate(0f, 180f, 0f);
    }
}