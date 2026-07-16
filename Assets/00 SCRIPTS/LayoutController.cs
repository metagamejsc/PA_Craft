using UnityEngine;

public class LayoutController : MonoBehaviour
{
    [SerializeField] private GameObject logo1;
    [SerializeField] private GameObject logo2;
    [SerializeField] private GameObject CTA1;
    [SerializeField] private GameObject CTA2;
    [SerializeField] private GameObject CTA3;
    private float oldRatio;
    private void Start()
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
        oldRatio = ratio;
        if (ratio < 0.9)
        {
            CTA3.SetActive(false);
            if (ratio < 0.7)
            {
                logo1.SetActive(true);
                CTA1.SetActive(true);

                logo2.SetActive(false);
                CTA2.SetActive(false);
                return;
            }
            logo1.SetActive(false);
            CTA1.SetActive(false);

            logo2.SetActive(true);
            CTA2.SetActive(true);
            return;
        }
        logo1.SetActive(false);
        CTA1.SetActive(false);

        logo2.SetActive(false);
        CTA2.SetActive(false);

        CTA3.SetActive(true);
    }
}
