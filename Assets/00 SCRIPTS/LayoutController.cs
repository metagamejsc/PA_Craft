using UnityEngine;

public class LayoutController : MonoBehaviour
{
    [SerializeField] private RectTransform infoUI;
    [SerializeField] private RectTransform eventUI;

    [SerializeField] private RectTransform inventoryUI;

    [SerializeField] private RectTransform moveUI;
    [SerializeField] private RectTransform actionUI;

    private float oldRatio;
    private void Start()
    {
        Fit();
    }


    private void Update()
    {
        Fit();
    }
    private void Fit()
    {
        float ratio = (float)Screen.width / Screen.height;
        if (ratio == oldRatio) return;
        oldRatio = ratio;

        if (ratio < 1.2f) FooterFitP();
        else FooterFitL();

        if (ratio < 0.9f) HeaderFitP();
        else HeaderFitL();
    }
    private void HeaderFitP()
    {
        infoUI.localScale = Vector3.one * 0.6f;
        eventUI.localScale = Vector3.one * 0.6f;
    }
    private void HeaderFitL()
    {
        infoUI.localScale = Vector3.one;
        eventUI.localScale = Vector3.one;
    }
    private void FooterFitP()
    {
        inventoryUI.localScale = Vector3.one * 0.8f;

        moveUI.localScale = Vector3.one;
        actionUI.localScale = Vector3.one;
    }
    private void FooterFitL()
    {
        inventoryUI.localScale = Vector3.one;

        moveUI.localScale = Vector3.one * 1.5f;
        actionUI.localScale = Vector3.one * 1.5f;
    }
}
