using System;
using UnityEngine;
using UnityEngine.EventSystems;

public class BoatTurnButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public BoatAutoMoveController boatController;
    public bool isLeftButton;

    public void OnPointerDown(PointerEventData eventData)
    {
        if (boatController == null) return;

        if (isLeftButton)
            boatController.HoldLeft(true);
        else
            boatController.HoldRight(true);
    }
    public void OnPointerUp(PointerEventData eventData)
    {
        if (boatController == null) return;
        boatController.ReleaseTurn();
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.A))
        {
            boatController.HoldLeft(true);
        }
        if (Input.GetKeyDown(KeyCode.D))
        {
            boatController.HoldRight(true);
        }
        if (Input.GetKeyUp(KeyCode.A) || Input.GetKeyUp(KeyCode.D))
        {
            boatController.ReleaseTurn();
        }
    }
}