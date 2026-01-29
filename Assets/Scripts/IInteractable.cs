using System.Collections;

public interface IInteractable
{
    bool CanInteract(PlayerInteractionController player);
    IEnumerator Interact(PlayerInteractionController player);
}
