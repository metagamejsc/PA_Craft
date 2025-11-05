using UnityEngine;
using DG.Tweening;

public class HandBottomEdgeAnimator : MonoBehaviour
{
    [Header("Refs")]
    public RectTransform hand;     // ảnh bàn tay
    public RectTransform imageA;
    public RectTransform imageB;

    [Header("Movement")]
    public float moveDuration = 0.9f;
    [Tooltip("Khoảng cách so với mép dưới của ảnh (px), >0 nghĩa là ở phía trong ảnh")]
    public float bottomInset = 12f;
    public float pauseAfterStep = 0.1f;

    [Header("Scales")]
    [Tooltip("Hand scale nhỏ khi chạm")]
    public float handDownScale = 0.85f;
    [Tooltip("Image scale to khi chạm")]
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

        // đảm bảo scale về 1 lúc đầu
        hand.localScale = Vector3.one;
        imageA.localScale = Vector3.one;
        imageB.localScale = Vector3.one;

        BuildLoop();
    }

    void OnDisable()
    {
        loopSeq?.Kill();
    }

    void BuildLoop()
    {
        loopSeq = DOTween.Sequence().SetAutoKill(false);

        loopSeq.Append(StepTo(imageA));
        loopSeq.AppendInterval(pauseAfterStep);
        loopSeq.Append(StepTo(imageB));
        loopSeq.AppendInterval(pauseAfterStep);

        loopSeq.SetLoops(-1, LoopType.Restart);
    }

    Sequence StepTo(RectTransform target)
    {
        var step = DOTween.Sequence();

        // Tính vị trí ở sát mép dưới (bên trong ảnh) theo không gian parent của hand
        Vector2 localTarget = GetBottomLocalPointForHandParent(target, hand.parent as RectTransform, bottomInset);

        // 1) Di chuyển tay tới vị trí đó
        step.Append(hand.DOAnchorPos(localTarget, moveDuration).SetEase(Ease.InOutSine));

        // 2) Khi di chuyển xong: hand scale xuống & image scale lên (rồi cả hai về 1)
        step.AppendCallback(() =>
        {
            // Play đồng thời
            DOTween.Kill(hand);   // tránh chồng tween scale cũ
            DOTween.Kill(target);

            // Hand: xuống rồi về 1
            hand.DOScale(handDownScale, scaleDuration)
                .OnComplete(() => hand.DOScale(1f, scaleDuration * 0.9f));

            // Image: lên rồi về 1
            target.DOScale(imageUpScale, scaleDuration)
                  .OnComplete(() => target.DOScale(1f, scaleDuration * 0.9f));
        });

        // Chờ đúng bằng tổng thời gian của “nhấn”
        step.AppendInterval(scaleDuration + scaleDuration * 0.9f);

        return step;
    }

    /// <summary>
    /// Lấy điểm ở mép dưới (bên trong ảnh) của target, trả về toạ độ local theo parent của hand.
    /// </summary>
    Vector2 GetBottomLocalPointForHandParent(RectTransform target, RectTransform handParent, float inset)
    {
        // điểm ở tâm theo chiều ngang, mép dưới + inset px
        Vector3 localInTarget = new Vector3(0f, -target.rect.height * 0.5f + inset, 0f);
        Vector3 world = target.TransformPoint(localInTarget);
        Vector3 localInParent = handParent.InverseTransformPoint(world);
        return new Vector2(localInParent.x, localInParent.y);
    }
}
