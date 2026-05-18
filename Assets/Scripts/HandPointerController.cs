using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class HandPointerController : MonoBehaviour
{
    public RectTransform handPointer;

    [Header("Infinity Movement")]
    public bool playInfinityMovement = true;
    public Vector2 infinitySize = new Vector2(220f, 110f);
    public float infinityLoopDuration = 1.8f;
    public bool useCurrentPositionAsCenter = true;
    public Vector2 infinityCenter;

    [Header("Slot Movement")]
    public float moveDuration = 0.5f;
    public float delayBetweenMoves = 1f;
    public RectTransform[] slots;

    public Color defaultColor = Color.black;
    public Color highlightColor = Color.cyan;

    private RectTransform currentSlot;
    private Vector2 infinityStartPosition;

    private void Start()
    {
        if (handPointer == null)
        {
            handPointer = GetComponent<RectTransform>();
        }

        if (handPointer == null)
        {
            Debug.LogWarning($"{nameof(HandPointerController)} needs a RectTransform hand pointer.", this);
            enabled = false;
            return;
        }

        infinityStartPosition = useCurrentPositionAsCenter ? handPointer.anchoredPosition : infinityCenter;

        if (playInfinityMovement)
        {
            StartCoroutine(MoveHandInfinity());
            return;
        }

        if (slots == null || slots.Length == 0 || slots[0] == null)
        {
            return;
        }

        handPointer.position = slots[0].position;
        HighlightSlot(slots[0]);
        currentSlot = slots[0];

        StartCoroutine(MoveHandToSlots());
    }

    private IEnumerator MoveHandInfinity()
    {
        handPointer.gameObject.SetActive(true);

        float duration = Mathf.Max(0.01f, infinityLoopDuration);

        while (true)
        {
            float angle = (Time.time / duration) * Mathf.PI * 2f;
            float x = Mathf.Sin(angle) * infinitySize.x * 0.5f;
            float y = Mathf.Sin(angle * 2f) * infinitySize.y * 0.5f;

            handPointer.anchoredPosition = infinityStartPosition + new Vector2(x, y);
            yield return null;
        }
    }

    private IEnumerator MoveHandToSlots()
    {
        handPointer.gameObject.SetActive(true);
        yield return new WaitForSeconds(delayBetweenMoves);

        while (true)
        {
            foreach (RectTransform slot in slots)
            {
                if (slot == null)
                {
                    continue;
                }

                ChangeSlotColor(slot);
                yield return MoveHandToPoint(slot);
                yield return new WaitForSeconds(delayBetweenMoves);
            }
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

    private void ChangeSlotColor(RectTransform newSlot)
    {
        if (currentSlot != null)
        {
            currentSlot.localScale = Vector3.one;
            SetSlotColor(currentSlot, defaultColor);
        }

        HighlightSlot(newSlot);
        currentSlot = newSlot;
    }

    private void HighlightSlot(RectTransform slot)
    {
        slot.localScale = Vector3.one * 1.2f;
        SetSlotColor(slot, highlightColor);
    }

    private void SetSlotColor(RectTransform slot, Color color)
    {
        Image img = slot.GetComponent<Image>();
        if (img != null)
        {
            img.color = color;
        }
    }
}
