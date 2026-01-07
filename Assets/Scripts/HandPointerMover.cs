using System.Collections;
using UnityEngine;

public class HandPointerMover : MonoBehaviour
{
    public RectTransform[] targets;
    public float moveSpeed = 2f;
    public Vector3 selectedScale = new Vector3(1.2f, 1.2f, 1f);
    public Vector3 normalScale = Vector3.one;

    private int currentTarget = 0;

    void Start()
    {
        StartCoroutine(MoveLoop());
    }

    IEnumerator MoveLoop()
    {
        while (true)
        {
            // Reset scale tất cả
            for (int i = 0; i < targets.Length; i++)
            {
                targets[i].localScale = (i == currentTarget) ? selectedScale : normalScale;
            }

            // Di chuyển tới target
            RectTransform target = targets[currentTarget];
            while (Vector3.Distance(transform.position, target.position) > 0.1f)
            {
                transform.position = Vector3.Lerp(transform.position, target.position, Time.deltaTime * moveSpeed);
                yield return null;
            }

            // Chờ 0.5s rồi chuyển sang target tiếp theo
            yield return new WaitForSeconds(0.5f);
            currentTarget = (currentTarget + 1) % targets.Length;
        }
    }
}