using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class HandPointerController : MonoBehaviour
{
    public RectTransform handPointer; // Đối tượng hình bàn tay
    public Transform inventoryPanel;  // Panel chứa các ô inventory
    public float moveDuration = 0.5f; // Thời gian di chuyển giữa các ô
    public float delayBetweenMoves = 1f; // Khoảng cách giữa các lần di chuyển
    public bool enableSlotScaling = true; // Bật/tắt scale khi di chuyển

    public RectTransform[] slots; // Mảng các ô inventory
    public GameObject[] effect;

    private int currentSlotIndex = 0; // Theo dõi slot hiện tại

    void Start()
    {
        // Bắt đầu từ slot đầu tiên
        handPointer.position = slots[0].position;

        if (enableSlotScaling)
        {
            slots[0].localScale = Vector3.one * 1.2f;
        }

        StartCoroutine(MoveHandToSlots());
    }

    private IEnumerator MoveHandToSlots()
    {
        handPointer.gameObject.SetActive(true);
        yield return new WaitForSeconds(delayBetweenMoves);

        while (true)
        {
            int nextSlotIndex = (currentSlotIndex + 1) % slots.Length;

            // Scale và tắt effect của slot hiện tại
            if (enableSlotScaling)
            {
                slots[currentSlotIndex].localScale = Vector3.one;
            }

            if (effect != null && effect.Length > currentSlotIndex && effect[currentSlotIndex] != null)
            {
                effect[currentSlotIndex].SetActive(false); // ❌ Tắt effect cũ
            }

            // Di chuyển tay tới slot mới
            yield return MoveHandToPoint(slots[nextSlotIndex]);

            // Scale và bật effect cho slot mới
            if (enableSlotScaling)
            {
                slots[nextSlotIndex].localScale = Vector3.one * 1.2f;
            }

            if (effect != null && effect.Length > nextSlotIndex && effect[nextSlotIndex] != null)
            {
                effect[nextSlotIndex].SetActive(true); // ✅ Bật effect mới
            }

            currentSlotIndex = nextSlotIndex;

            yield return new WaitForSeconds(delayBetweenMoves);
        }
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
