using System;
using UnityEngine;
using System.Collections;

public class CameraMove : MonoBehaviour
{
    public Transform targetPosition; // Vị trí camera cần di chuyển đến
    public float duration = 2.0f;    // Thời gian di chuyển (tới và lui)

    private Vector3 startPosition;
    private Quaternion startRotation;

    private bool isMoving = false;
    private Action onComplete; // Hàm callback khi di chuyển hoàn tất

    void Start()
    {
        onComplete +=()=>
        {
            LunaManager.ins.startCard.SetActive(true);
        };
        // Lưu vị trí và góc xoay ban đầu của camera
        startPosition = transform.position;
        startRotation = transform.rotation;
        MoveToTargetAndBack();
    }

    // Hàm bắt đầu hiệu ứng di chuyển
    [ContextMenu("move")]
    public void MoveToTargetAndBack()
    {
        if (!isMoving)
            StartCoroutine(MoveCamera());
    }

    IEnumerator MoveCamera()
    {
        yield return new WaitForSeconds(1f);
        isMoving = true;

        Vector3 initialPos = transform.position;
        Quaternion initialRot = transform.rotation;

        // Thời gian đi tới mục tiêu
        float elapsed = 0f;

        while (elapsed < duration)
        {
            float t = elapsed / duration;

            transform.position = Vector3.Lerp(initialPos, targetPosition.position, t);
            transform.rotation = Quaternion.Slerp(initialRot, targetPosition.rotation, t);

            elapsed += Time.deltaTime;
            yield return null;
        }

        // Đảm bảo vị trí chính xác khi đến đích
        transform.position = targetPosition.position;
        transform.rotation = targetPosition.rotation;

        yield return new WaitForSeconds(0.2f);
        onComplete?.Invoke();
        transform.gameObject.SetActive(false);
        transform.position = startPosition;
        transform.rotation = startRotation;
        isMoving = false;
    }
}