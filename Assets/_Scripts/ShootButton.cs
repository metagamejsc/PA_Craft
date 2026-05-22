using UnityEngine;
using UnityEngine.EventSystems;

public class ShootButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public PlayerController playerController;

    [Tooltip("true = giữ để bắn liên tục | false = mỗi lần nhấn bắn 1 phát")]
    public bool holdToShoot = true;

    private bool isHeld;

    public void OnPointerDown(PointerEventData eventData)
    {
        isHeld = true;
        if (!holdToShoot)
            playerController?.TryShoot();
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        isHeld = false;
    }

    void Update()
    {
        if (holdToShoot && isHeld)
            playerController?.TryShoot();
    }
}
