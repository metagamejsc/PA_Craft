using UnityEngine;

public class LayouController : MonoBehaviour
{
    [SerializeField] private RectTransform shootBtn;
    [SerializeField] private float pScale;
    [SerializeField] private float lScale;
    [SerializeField] private Vector2 pPos;
    [SerializeField] private Vector2 lPos;
    private float oldRatio;
    void Update()
    {
        Fit();
    }
    private void Fit()
    {
        float ratio = (float)Screen.width / Screen.height;
        if (ratio == oldRatio) return;
        oldRatio = ratio;
        if (ratio > 1.3)
        {
            shootBtn.transform.localScale = Vector3.one * lScale;
            shootBtn.anchoredPosition = lPos;
        }
        else
        {
            shootBtn.transform.localScale = Vector3.one * pScale;
            shootBtn.anchoredPosition = pPos;
        }
    }
}