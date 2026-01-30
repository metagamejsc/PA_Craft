using System.Collections;
using UnityEngine;

public interface IInteractable
{
    bool CanInteract(PlayerInteractionController player);
    IEnumerator Interact(PlayerInteractionController player);
    Transform GetTransform(); // optional
}
