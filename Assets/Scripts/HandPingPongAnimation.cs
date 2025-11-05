using UnityEngine;
using DG.Tweening;
using UnityEngine.UI;

public class HandPingPongAnimation : MonoBehaviour
{
    [Header("Targets")]
    public RectTransform hand;
    public RectTransform imageA;
    public RectTransform imageB;

    [Header("Animation Settings")]
    public float moveDuration = 1.0f;
    public float scaleUpSize = 1.2f;
    public float scaleDownSize = 0.85f;
    public float scaleDuration = 0.2f;
    public int loopCount = -1; // vô hạn

    private Sequence seq;

    private void Start()
    {
        PlayHandAnimation();
    }

    private void PlayHandAnimation()
    {
        seq = DOTween.Sequence();
        seq.SetLoops(loopCount, LoopType.Yoyo);

        seq.Append(CreateStep(imageA))
            .AppendInterval(0.1f)
            .Append(CreateStep(imageB))
            .AppendInterval(0.1f);
    }

    private Sequence CreateStep(RectTransform targetImage)
    {
        var step = DOTween.Sequence();

        Vector3 targetPos = new Vector3(
            targetImage.position.x,
            targetImage.position.y,
            hand.position.z
        );

        // Hand move
        step.Append(hand.DOMove(targetPos, moveDuration).SetEase(Ease.InOutSine));

        // Hand scale effect
        step.Join(hand.DOScale(scaleDownSize, scaleDuration).SetLoops(2, LoopType.Yoyo));

        // Image scale effect
        step.Join(targetImage.DOScale(scaleUpSize, scaleDuration).SetLoops(2, LoopType.Yoyo));

        return step;
    }
}