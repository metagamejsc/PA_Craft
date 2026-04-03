using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class HandPointerController : MonoBehaviour
{
    public RectTransform handPointer;
    public Transform inventoryPanel;
    public float moveDuration = 0.5f;
    public float delayBetweenMoves = 1f;
    public ItemButtonManager itemButtonManager;

    public RectTransform[] slots;

    void Start()
    {
        handPointer.position = slots[0].position;
        itemButtonManager.ShowItemWithoutSecondClick(0);
        StartCoroutine(MoveHandToSlots());
    }

    void CollectSlots()
    {
    }

    private IEnumerator MoveHandToSlots()
    {
        handPointer.gameObject.SetActive(true);
        yield return new WaitForSeconds(delayBetweenMoves);

        for (int i = 0; i < slots.Length; i++)
        {
            yield return MoveHandToPoint(slots[i]);
            itemButtonManager.ShowItemWithoutSecondClick(i);
            yield return new WaitForSeconds(delayBetweenMoves);
        }

        StartCoroutine(MoveHandToSlots());
    }

    IEnumerator MoveHandToPoint(RectTransform target)
    {
        Vector3 startPosition = handPointer.position;
        Vector3 endPosition = target.position;
        float elapsed = 0f;

        while (elapsed < moveDuration)
        {
            elapsed += Time.deltaTime;
            handPointer.position = Vector3.Lerp(startPosition, endPosition, elapsed / moveDuration);
            yield return null;
        }

        handPointer.position = endPosition;
    }
}
