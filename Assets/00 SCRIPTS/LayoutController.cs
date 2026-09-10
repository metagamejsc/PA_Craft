using UnityEngine;

public class LayoutController : MonoBehaviour
{
    [SerializeField] private RectTransform cardP;
    [SerializeField] private RectTransform cardL;

    private float oldRatio;
    private bool isP;
    private void Start()
    {
        isP = true;
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
        if (ratio < 1)
        {
            if (isP) return;
            isP = true;
            cardL.gameObject.SetActive(false);
            cardP.gameObject.SetActive(true);
        }
        else
        {
            if (isP)
            {
                isP = false;
                cardP.gameObject.SetActive(false);
                cardL.gameObject.SetActive(true);
            }

            cardL.localScale = ratio < 1.3f ? Vector3.one : Vector3.one * 1.3f;
        }
    }
}
