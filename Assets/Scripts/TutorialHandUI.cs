using UnityEngine;
using DG.Tweening;

public class TutorialHandWorld : MonoBehaviour
{
    [Header("References")]
    public RectTransform handUI;          // Image bàn tay (UI)
    public Transform[] rocketWorldPoints; // 8 vị trí rocket (world)
    public Camera worldCamera;            // Camera chính

    [Header("Settings")]
    public float moveDuration = 0.4f;
    public float waitTime = 0.2f;
    public float handScale = 1.1f;

    private Sequence seq;
    private Canvas canvas;

    void Start()
    {
        canvas = handUI.GetComponentInParent<Canvas>();

        if (worldCamera == null)
            worldCamera = Camera.main;

        PlayTutorial();
    }

    void PlayTutorial()
    {
        seq = DOTween.Sequence();
        seq.SetLoops(-1);

        // Scale pulse cho bàn tay
        handUI.DOScale(handScale, 0.5f)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);

        foreach (var worldPoint in rocketWorldPoints)
        {
            seq.AppendCallback(() =>
            {
                Vector2 screenPos;
                RectTransformUtility.ScreenPointToLocalPointInRectangle(
                    canvas.transform as RectTransform,
                    worldCamera.WorldToScreenPoint(worldPoint.position),
                    canvas.renderMode == RenderMode.ScreenSpaceOverlay
                        ? null
                        : worldCamera,
                    out screenPos
                );

                handUI.DOLocalMove(screenPos, moveDuration)
                    .SetEase(Ease.InOutSine);
            });

            seq.AppendInterval(moveDuration + waitTime);
        }
    }

    public void StopTutorial()
    {
        if (seq != null) seq.Kill();
        handUI.DOKill();
        handUI.gameObject.SetActive(false);
    }
}