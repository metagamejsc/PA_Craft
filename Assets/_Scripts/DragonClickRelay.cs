using UnityEngine;

public class DragonClickRelay : MonoBehaviour
{
    private EggController eggController;

    public void Init(EggController owner)
    {
        eggController = owner;
    }

    private void OnMouseDown()
    {
        eggController?.ClickDragon();
    }
}
