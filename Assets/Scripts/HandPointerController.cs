using System.Collections;
using UnityEngine;

public class HandPointerController : MonoBehaviour
{
    public RectTransform handPointer;
    public Transform inventoryPanel;
    public float moveDuration = 0.5f;
    public float delayBetweenMoves = 1f;
    public bool enableSlotScaling = true;

    public RectTransform[] slots;
    public GameObject[] effect;
    public float scaleFactor = 1.1f;

    private int currentSlotIndex = 0;
    private Coroutine moveCoroutine;

    private void Start()
    {
        ResetHandPointer();
    }

    public void ResetHandPointer()
    {
        if (moveCoroutine != null)
        {
            StopCoroutine(moveCoroutine);
            moveCoroutine = null;
        }

        if (handPointer == null || slots == null || slots.Length == 0 || slots[0] == null)
            return;

        currentSlotIndex = 0;
        handPointer.gameObject.SetActive(true);
        handPointer.position = slots[0].position;

        for (int i = 0; i < slots.Length; i++)
        {
            if (slots[i] != null)
                slots[i].localScale = enableSlotScaling && i == 0 ? Vector3.one * scaleFactor : Vector3.one;

            if (effect != null && effect.Length > i && effect[i] != null)
                effect[i].SetActive(i == 0);
        }

        moveCoroutine = StartCoroutine(MoveHandToSlots());
    }

    public void HideHandPointer()
    {
        if (moveCoroutine != null)
        {
            StopCoroutine(moveCoroutine);
            moveCoroutine = null;
        }

        if (slots != null)
        {
            for (int i = 0; i < slots.Length; i++)
            {
                if (slots[i] != null)
                    slots[i].localScale = Vector3.one;

                if (effect != null && effect.Length > i && effect[i] != null)
                    effect[i].SetActive(false);
            }
        }

        if (handPointer != null)
            handPointer.gameObject.SetActive(false);
    }

    private IEnumerator MoveHandToSlots()
    {
        handPointer.gameObject.SetActive(true);
        yield return new WaitForSeconds(delayBetweenMoves);

        while (true)
        {
            int nextSlotIndex = (currentSlotIndex + 1) % slots.Length;

            if (enableSlotScaling)
            {
                slots[currentSlotIndex].localScale = Vector3.one;
            }

            if (effect != null && effect.Length > currentSlotIndex && effect[currentSlotIndex] != null)
            {
                effect[currentSlotIndex].SetActive(false);
            }

            yield return MoveHandToPoint(slots[nextSlotIndex]);

            if (enableSlotScaling)
            {
                slots[nextSlotIndex].localScale = Vector3.one * scaleFactor;
            }

            if (effect != null && effect.Length > nextSlotIndex && effect[nextSlotIndex] != null)
            {
                effect[nextSlotIndex].SetActive(true);
            }

            currentSlotIndex = nextSlotIndex;

            yield return new WaitForSeconds(delayBetweenMoves);
        }
    }

    private IEnumerator MoveHandToPoint(RectTransform target)
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
