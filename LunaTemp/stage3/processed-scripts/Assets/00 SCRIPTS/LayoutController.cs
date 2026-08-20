using UnityEngine;

public class LayoutController : MonoBehaviour
{
    [SerializeField] private RectTransform cardParent;
    [SerializeField] private RectTransform leftCard;
    [SerializeField] private RectTransform rightCard;

    [SerializeField] private Vector2 origin;
    [SerializeField] private Vector2 smallSize;
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
        if (ratio < 1)
        {
            leftCard.anchoredPosition = new Vector2(-smallSize.x, smallSize.y);
            rightCard.anchoredPosition = smallSize;
            if (ratio < 0.7f)
            {
                cardParent.localScale = Vector3.one * 0.7f;
            }
            return;
        }
        cardParent.localScale = Vector3.one *0.9f;
        leftCard.anchoredPosition = new Vector2(-origin.x, origin.y);
        rightCard.anchoredPosition = origin;
    }
}
