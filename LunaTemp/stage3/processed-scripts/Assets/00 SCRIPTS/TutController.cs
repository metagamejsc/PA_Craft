using DG.Tweening;
using UnityEngine;

public class TutController : MonoBehaviour
{
    [SerializeField] private RectTransform optionL;
    [SerializeField] private RectTransform optionR;

    [SerializeField] private Vector3 posL;
    [SerializeField] private Vector3 posR;

    [SerializeField] private float fromScale;
    [SerializeField] private float toScale;

    [SerializeField] private float scaleTime;
    [SerializeField] private float moveTime;

    private Sequence sequence;
    private void Start()
    {
        sequence = DOTween.Sequence();
        sequence.AppendCallback(() => optionL.DOScale(0.8f, scaleTime))
                .Append(transform.DOScale(toScale, scaleTime))
                .AppendCallback(() => optionL.DOScale(0.75f, scaleTime))
                .Append(transform.DOScale(fromScale, scaleTime))
                .Append(transform.DOLocalMove(posR, moveTime))

                .AppendCallback(() => optionR.DOScale(0.8f, scaleTime))
                .Append(transform.DOScale(toScale, scaleTime))
                .AppendCallback(() => optionR.DOScale(0.75f, scaleTime))
                .Append(transform.DOScale(fromScale, scaleTime))
                .Append(transform.DOLocalMove(posL, moveTime))

                .SetLoops(-1, LoopType.Restart);
    }
}
