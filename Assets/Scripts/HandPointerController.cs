using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class HandPointerController : MonoBehaviour
{
    public RectTransform handPointer; // Đối tượng hình bàn tay
    public Transform inventoryPanel;  // Panel chứa các ô inventory
    public float moveDuration = 0.5f; // Thời gian di chuyển giữa các ô
    public float delayBetweenMoves = 1f; // Khoảng cách giữa các lần di chuyển

    public RectTransform[] slots; // Mảng các ô inventory

    void Start()
    {
        //CollectSlots();
        StartCoroutine(MoveHandToSlots());
    }

    void CollectSlots()
    {
        //slots = new RectTransform[inventoryPanel.childCount];
        /*for (int i = 0; i < inventoryPanel.childCount; i++)
        {
            slots[i] = inventoryPanel.GetChild(i) as RectTransform;
        }*/
    }

    private IEnumerator MoveHandToSlots()
    {
        handPointer.position = slots[0].position;
        handPointer.gameObject.SetActive(true); // Bật bàn tay lên
        
        foreach (var slot in slots)
        {
            yield return MoveHandToPoint(slot);
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