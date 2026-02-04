using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMoveAndRotate : MonoBehaviour
{
    public Transform startTransform;  // Vị trí bắt đầu (nếu cần set lại vị trí ban đầu)
    public Transform targetTransform; // Vị trí và rotation mục tiêu
    public float moveDuration = 2.0f; // Thời gian di chuyển
    public float delayBeforeMove = 1.0f; // Delay trước khi bắt đầu di chuyển
    public List<GameObject> objectToShow;

    private void Start()
    {
        // Nếu muốn set lại vị trí ban đầu cho camera, bật dòng dưới
        // transform.position = startTransform.position;
        // transform.rotation = startTransform.rotation;

        StartCoroutine(MoveAndRotate());
    }

    IEnumerator MoveAndRotate()
    {
        // Delay trước khi di chuyển
        yield return new WaitForSeconds(delayBeforeMove);

        Vector3 initialPosition = transform.position;
        Quaternion initialRotation = transform.rotation;

        Vector3 targetPosition = targetTransform.position;
        Quaternion targetRotation = targetTransform.rotation;

        float elapsedTime = 0f;

        while (elapsedTime < moveDuration)
        {
            float t = elapsedTime / moveDuration;

            // Di chuyển và xoay mượt mà
            transform.position = Vector3.Lerp(initialPosition, targetPosition, t);
            transform.rotation = Quaternion.Slerp(initialRotation, targetRotation, t);

            elapsedTime += Time.deltaTime;
            yield return null;
        }
        objectToShow.ForEach(obj => obj.SetActive(true));
        // Đảm bảo đúng vị trí cuối cùng
        transform.position = targetPosition;
        transform.rotation = targetRotation;
    }
}