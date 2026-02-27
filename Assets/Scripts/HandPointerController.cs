using UnityEngine;
using DG.Tweening;

public class HandBottomEdgeAnimator : MonoBehaviour
{
    [Header("Refs")]
    public RectTransform hand;
    public RectTransform imageA;
    public RectTransform imageB;

    [Header("Movement")]
    public float moveDuration = 0.9f;
    [Tooltip("Khoảng cách so với mép dưới của ảnh (px), >0 nghĩa là ở phía trong ảnh")]
    public float bottomInset = 12f;
    public float pauseAfterStep = 0.1f;

    [Header("Scales")]
    public float handDownScale = 0.85f;
    public float imageUpScale = 1.18f;
    public float scaleDuration = 0.18f;

    private Sequence loopSeq;

    void Start()
    {
        if (hand == null || imageA == null || imageB == null)
        {
            Debug.LogError("[HandBottomEdgeAnimator] Chưa gán đủ references!");
            return;
        }

        hand.localScale = Vector3.one;
        imageA.localScale = Vector3.one;
        imageB.localScale = Vector3.one;

        // ✅ Đặt tay đứng sẵn ở A (KHÔNG click)
        var handParent = hand.parent as RectTransform;
        hand.anchoredPosition = GetBottomLocalPointForHandParent(imageA, handParent, bottomInset);

        BuildLoop();
    }

    void BuildLoop()
    {
        loopSeq?.Kill();

        loopSeq = DOTween.Sequence().SetAutoKill(false);

        // ✅ Chỉ chạy B -> A để không bị click A 2 lần
        loopSeq.Append(StepTo(imageB));
        loopSeq.AppendInterval(pauseAfterStep);

        loopSeq.Append(StepTo(imageA));
        loopSeq.AppendInterval(pauseAfterStep);

        // ✅ Kết thúc ở A, Restart cũng bắt đầu từ A => không nhảy
        loopSeq.SetLoops(-1, LoopType.Restart);
    }

    void OnDisable()
    {
        loopSeq?.Kill();
        loopSeq = null;
    }

    Sequence StepTo(RectTransform target)
    {
        var step = DOTween.Sequence();

        Vector2 localTarget = GetBottomLocalPointForHandParent(
            target,
            hand.parent as RectTransform,
            bottomInset
        );

        step.Append(hand.DOAnchorPos(localTarget, moveDuration).SetEase(Ease.InOutSine));

        step.AppendCallback(() =>
        {
            // Kill tween scale cũ (nếu có) để không chồng scale
            DOTween.Kill(hand);
            DOTween.Kill(target);

            hand.DOScale(handDownScale, scaleDuration)
                .OnComplete(() => hand.DOScale(1f, scaleDuration * 0.9f));

            target.DOScale(imageUpScale, scaleDuration)
                .OnComplete(() => target.DOScale(1f, scaleDuration * 0.9f));
        });

        step.AppendInterval(scaleDuration + scaleDuration * 0.9f);
        return step;
    }

    Vector2 GetBottomLocalPointForHandParent(RectTransform target, RectTransform handParent, float inset)
    {
        Vector3 localInTarget = new Vector3(0f, -target.rect.height * 0.5f + inset, 0f);
        Vector3 world = target.TransformPoint(localInTarget);
        Vector3 localInParent = handParent.InverseTransformPoint(world);
        return new Vector2(localInParent.x, localInParent.y);
    }
}