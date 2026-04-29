using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class HandPointerController : MonoBehaviour
{
    public static HandPointerController instance;
    public RectTransform handPointer;
    public Transform inventoryPanel;
    public float moveDuration = 0.5f;
    public float delayBetweenMoves = 1f;
    public RectTransform[] slots;

    private Coroutine moveRoutine;

    private void Awake()
    {
        instance = this;
    }

    private void Start()
    {
        foreach (var slot in slots)
        {
            if (slot == null)
            {
                continue;
            }

            var button = slot.GetComponent<Button>();
            if (button != null)
            {
                button.onClick.AddListener(StopHandPointer);
            }
        }

        moveRoutine = StartCoroutine(BeginAfterLayoutReady());
    }

    private IEnumerator BeginAfterLayoutReady()
    {
        yield return null;
        yield return new WaitForEndOfFrame();

        if (inventoryPanel != null)
        {
            LayoutRebuilder.ForceRebuildLayoutImmediate(inventoryPanel as RectTransform);
        }

        if (handPointer != null && slots != null && slots.Length > 0 && slots[0] != null)
        {
            handPointer.position = slots[0].position;
        }

        moveRoutine = StartCoroutine(MoveHandToSlots());
    }

    private IEnumerator MoveHandToSlots()
    {
        if (handPointer == null || slots == null || slots.Length == 0)
        {
            yield break;
        }

        handPointer.gameObject.SetActive(true);

        while (true)
        {
            foreach (var slot in slots)
            {
                if (slot == null)
                {
                    continue;
                }

                yield return MoveHandToPoint(slot);
                yield return new WaitForSeconds(delayBetweenMoves);
            }
        }
    }

    private IEnumerator MoveHandToPoint(RectTransform target)
    {
        ResetSlotVisuals();

        var startPosition = handPointer.position;
        var endPosition = target.position;
        var elapsed = 0f;

        while (elapsed < moveDuration)
        {
            elapsed += Time.deltaTime;
            handPointer.position = Vector3.Lerp(startPosition, endPosition, elapsed / moveDuration);
            yield return null;
        }

        var image = target.GetComponent<Image>();
        if (image != null)
        {
            //image.color = Color.green;
        }

        target.localScale = Vector3.one * 1.2f;
        handPointer.position = endPosition;
    }

    public void StopHandPointer()
    {
        if (moveRoutine != null)
        {
            StopCoroutine(moveRoutine);
            moveRoutine = null;
        }

        StopAllCoroutines();
        ResetSlotVisuals();

        if (handPointer != null)
        {
            handPointer.gameObject.SetActive(false);
        }
    }

    private void ResetSlotVisuals()
    {
        if (slots == null)
        {
            return;
        }

        foreach (var slot in slots)
        {
            if (slot == null)
            {
                continue;
            }

            var image = slot.GetComponent<Image>();
            if (image != null)
            {
                //image.color = Color.white;
            }

            slot.localScale = Vector3.one;
        }
    }
}
