using UnityEngine;

public class LayoutController : MonoBehaviour
{
    [SerializeField] private Transform optionV;
    [SerializeField] private Transform optionH;
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
        if (ratio < 1)
        {
            optionV.transform.localScale = Vector3.one * 0.5f;
            optionH.transform.localScale = Vector3.zero;
            return;
        }
        if (ratio < 1.5f)
        {
            optionH.transform.localScale = Vector3.one * 0.65f;
        }
        else
        {
            optionH.transform.localScale = Vector3.one;
        }
        optionV.transform.localScale = Vector3.zero;
    }

}
