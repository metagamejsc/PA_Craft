using UnityEngine;

public class UIController : MonoBehaviour
{
    [Header("Model Game")]
    [SerializeField] private Transform model;
    [SerializeField] private Vector3 PPos;
    [SerializeField] private Vector3 LPos;

    [Header("Flexible UI")]
    [SerializeField] private GameObject p;
    [SerializeField] private GameObject l;
    [SerializeField] private RectTransform title;
    [SerializeField] private RectTransform logo;
    [SerializeField] private RectTransform CTA;
    [SerializeField] RectTransform OK;

    [Header("Position")]
    [SerializeField] private Vector2 pTitlePos;
    [SerializeField] private Vector2 lTitlePos;

    [SerializeField] private Vector2 pLogoPos;
    [SerializeField] private Vector2 lLogoPos;

    [SerializeField] private Vector2 pCTAPos;
    [SerializeField] private Vector2 lCTAPos;
    [SerializeField] private Vector2 pOKPos;
    [SerializeField] private Vector2 lOKPos;

    

    private float oldRatio;

    void Start()
    {
        Fit();
    }


    void Update()
    {
        Fit();
    }
    private void Fit()
    {
        float ratio = (float)Screen.width / Screen.height;
        if (ratio == oldRatio) return;

        if (ratio > 1.5)
        {
            p.SetActive(false);
            l.SetActive(true);

            title.anchoredPosition = lTitlePos;
            CTA.anchoredPosition = lCTAPos;
            logo.anchoredPosition = lLogoPos;
            OK.anchoredPosition = lOKPos;

            model.transform.position = LPos;
        }
        else
        {
            l.SetActive(false);
            p.SetActive(true);
            title.anchoredPosition = ratio < 0.5 ? pTitlePos : pTitlePos + new Vector2(0, 70);
            CTA.anchoredPosition = pCTAPos;
            logo.anchoredPosition = pLogoPos;
            OK.anchoredPosition = pOKPos;

            model.transform.position = PPos;
        }
    }
}
