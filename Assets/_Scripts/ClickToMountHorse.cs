using UnityEngine;

public class ClickToMountHorse : MonoBehaviour
{
    public Camera cam;
    public LayerMask horseLayer;
    public GameObject handPointer; // Đối tượng hình bàn tay

    void Update()
    {
        if (!Input.GetMouseButtonDown(0)) return;

        Ray ray = cam.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;
   
        if (Physics.Raycast(ray, out hit, 100f, horseLayer))
        {
            HorseMount horse = hit.collider.GetComponentInParent<HorseMount>();
            if (horse != null)
            {
                handPointer.SetActive(false);
                horse.TryMount();
            }
        }
    }
}