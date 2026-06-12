using UnityEngine;
using UnityEngine.EventSystems;

// Nút UI: bấm để cho dino đang được chỉ vào (tâm màn hình) ăn, nếu player đủ gần.
public class FeedButton : MonoBehaviour, IPointerDownHandler
{
    [Tooltip("Transform của player, dùng để đo khoảng cách feed")]
    public Transform player;
    [Tooltip("Layer của dino để raycast trúng")]
    public LayerMask dinoMask = ~0;

    private Camera cam;

    void Awake()
    {
        cam = Camera.main;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (cam == null)
            cam = Camera.main;

        Vector3 playerPosition = player != null
            ? player.position
            : (cam != null ? cam.transform.position : Vector3.zero);

        Dino target = Dino.GetFeedTarget(cam, playerPosition, dinoMask);
        if (target != null)
            target.Feed();
    }
}
