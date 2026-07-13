using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class TutController : MonoBehaviour
{
    [SerializeField] private RectTransform rt;
    [SerializeField] private Image startItem;
    [SerializeField] private Image endItem;
    [SerializeField] private float speedMove;

    [SerializeField] private Image currentTarget;

    [SerializeField] private Vector2 startPos;
    [SerializeField] private Vector2 endPos;

    private Sequence sequence;

    void Start()
    {
        rt.anchoredPosition = startPos;
        sequence = DOTween.Sequence();
        sequence.AppendCallback(SI)
                .Append(rt.DOScale(0.8f, 0.5f))
                .Join(startItem.DOFade(1, 0.5f))
                .Append(rt.DOScale(1f, 0.5f))
                .Join(startItem.DOFade(0, 0.5f))
                .Append(rt.DOLocalMove(endPos, speedMove))
                .AppendCallback(EI)
                .Append(rt.DOScale(0.8f, 0.5f))
                .Join(endItem.DOFade(1, 0.5f))
                .Append(rt.DOScale(1f, 0.5f))
                .Join(endItem.DOFade(0, 0.5f))
                .Append(rt.DOLocalMove(startPos, speedMove))
                .SetLoops(-1, LoopType.Restart);
    }
    private void SI()
    {
        currentTarget = startItem;
    }
    private void EI()
    {
        currentTarget = endItem;
    }

    public void StopTut()
    {
        sequence.Kill();
        if (currentTarget)
        {
            Color c = currentTarget.color;
            c.a = 0;
            currentTarget.color = c;
        }
        Destroy(gameObject);
    }
}
