using DG.Tweening;
using UnityEngine;

public class TutController : MonoBehaviour
{
    [SerializeField] private Transform leftCard;
    [SerializeField] private Transform rightCard;
    [SerializeField] private Vector2 leftPos;
    [SerializeField] private Vector2 rightPos;
    [SerializeField] private RectTransform tut;
    [SerializeField] private float timeMove;
    [SerializeField] private float timeDelay;
    private Sequence sequence;
    void Start()
    {
        sequence = DOTween.Sequence();
        sequence
                .Append(tut.transform.DOScale(0.8f, 0.3f))
                .AppendCallback(() => ScaleCard(leftCard, 1.1f))
                .AppendCallback(() => ScaleCard(rightCard, 1f))
                .Append(tut.transform.DOScale(1f, 0.3f))
                .Append(tut.transform.DOLocalMove(rightPos, timeMove))

                .Append(tut.transform.DOScale(0.8f, 0.3f))
                .AppendCallback(() => ScaleCard(rightCard, 1.1f))
                .AppendCallback(() => ScaleCard(leftCard, 1f))

                .Append(tut.transform.DOScale(1f, 0.3f))
                .Append(tut.transform.DOLocalMove(leftPos, timeMove))
                .SetLoops(-1, LoopType.Restart);
    }
    private void ScaleCard(Transform card, float scale)
    {
        card.transform.DOScale(scale, 0.5f);
    }
}
