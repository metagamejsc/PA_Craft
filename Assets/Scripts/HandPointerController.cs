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
    public Animator handAnimator;
    public RectTransform[] slots; // Mảng các ô inventory
    public GameObject[] effect;
    public TrailRenderer trailRenderer;

    private int currentSlotIndex = 0; // Theo dõi slot hiện tại

    void Start()
    {
        // Bắt đầu từ slot đầu tiên
        //handPointer.position = slots[0].position;
       StartCoroutine(MoveHandToPoint(slots[0], true));
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

            if (enableSlotScaling)
            {
                slots[currentSlotIndex].localScale = Vector3.one;
            }

            // Di chuyển tay
            yield return MoveHandToPoint(slots[nextSlotIndex]);

            if (enableSlotScaling)
            {
                slots[nextSlotIndex].localScale = Vector3.one * 1.2f;
            }

            // ▶ chạy animation scratch
            handAnimator.SetTrigger("Scratch");
            //trailRenderer.Clear();
            //trailRenderer.gameObject.SetActive(true);
            // ⏳ đợi animation scratch chạy xong
            yield return new WaitUntil(() =>
                handAnimator.GetCurrentAnimatorStateInfo(0).IsName("Scratch")
            );
            
            yield return new WaitUntil(() =>
                handAnimator.GetCurrentAnimatorStateInfo(0).normalizedTime >= 1f
            );
            currentSlotIndex = nextSlotIndex;

            yield return new WaitForSeconds(delayBetweenMoves);
            //trailRenderer.gameObject.SetActive(false);
        }
    }

    IEnumerator MoveHandToPoint(RectTransform target, bool instant = false)
    {
        Vector3 startPosition = handPointer.position;

        // Lấy 4 góc của RectTransform
        Vector3[] corners = new Vector3[4];
        target.GetWorldCorners(corners);

        // corners:
        // 0 = bottom-left
        // 1 = top-left
        // 2 = top-right
        // 3 = bottom-right

        // Lấy vị trí bottom center
        Vector3 bottomCenter = (corners[0] + corners[3]) / 2f;

        Vector3 endPosition = target.position;
        if (instant)
        {
            handPointer.position = endPosition;
        }
        else
        {
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
    
}
