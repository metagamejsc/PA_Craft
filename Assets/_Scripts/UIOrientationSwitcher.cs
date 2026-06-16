using UnityEngine;

public class UIOrientationSwitcher : MonoBehaviour
{
    public GameObject landscapeUI;
    public GameObject portraitUI;

    void Start()
    {
        CheckOrientation();
    }

    void Update()
    {
        CheckOrientation();
    }

    void CheckOrientation()
    {
        if (Screen.width > Screen.height) // Landscape
        {
            landscapeUI.SetActive(true);
            portraitUI.SetActive(false);
        }
        else // Portrait
        {
            landscapeUI.SetActive(false);
            portraitUI.SetActive(true);
        }
    }
}