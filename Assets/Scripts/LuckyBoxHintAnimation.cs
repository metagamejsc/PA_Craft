using DG.Tweening;
using UnityEngine;

public class LuckyBoxHintAnimation : MonoBehaviour
{
    [Header("Box")]
    public Transform boxRoot;
    public float bounceHeight = 0.35f;
    public float groundDelayDuration = 0.35f;
    public float bounceUpDuration = 0.3f;
    public float bounceDownDuration = 0.24f;
    public float spinDuration = 1.6f;
    public float spinDegreesPerLoop = 360f;

    [Header("Audio")]
    public AudioSource soundSource;
    public AudioClip jumpUpSound;
    public AudioClip landSound;

    [Header("Hand UI")]
    public RectTransform handPointer;
    public Canvas rootCanvas;
    public Camera worldCamera;
    public Transform handTapTarget;
    public Vector2 handTapCanvasOffset = new Vector2(30f, -20f);
    public float handMoveDuration = 0.22f;
    public float handHoldDuration = 0.06f;
    public float handPauseDuration = 0.25f;
    [Range(0.5f, 1f)] public float handPressedScale = 0.9f;

    [Header("Tap Feedback")]
    public bool hideHandWithoutTarget = true;
    public float boxTapPunchScale = 0.08f;
    public float boxTapPunchDuration = 0.16f;

    private Vector3 _boxStartLocalPosition;
    private Quaternion _boxStartLocalRotation;
    private Vector3 _boxStartLocalScale;
    private Vector2 _handStartAnchoredPosition;
    private Vector3 _handStartLocalScale;
    private Sequence _boxBounceSequence;
    private Tween _boxSpinTween;
    private Sequence _handSequence;
    private Tween _boxPunchTween;
    private bool _hasInitialState;

    private void Reset()
    {
        if (boxRoot == null)
        {
            boxRoot = transform;
        }

        if (worldCamera == null)
        {
            worldCamera = Camera.main;
        }
    }

    private void OnValidate()
    {
        bounceHeight = Mathf.Max(0f, bounceHeight);
        groundDelayDuration = Mathf.Max(0f, groundDelayDuration);
        bounceUpDuration = Mathf.Max(0.01f, bounceUpDuration);
        bounceDownDuration = Mathf.Max(0.01f, bounceDownDuration);
        spinDuration = Mathf.Max(0.01f, spinDuration);
        handMoveDuration = Mathf.Max(0.01f, handMoveDuration);
        handHoldDuration = Mathf.Max(0f, handHoldDuration);
        handPauseDuration = Mathf.Max(0f, handPauseDuration);
        boxTapPunchScale = Mathf.Max(0f, boxTapPunchScale);
        boxTapPunchDuration = Mathf.Max(0.01f, boxTapPunchDuration);
    }

    private void Awake()
    {
        CacheInitialState();
    }

    private void OnEnable()
    {
        CacheInitialState();
        Play();
    }

    private void OnDisable()
    {
        StopAndReset();
    }

    public void Play()
    {
        CacheInitialState();
        KillTweens();
        StartBoxLoop();
        StartHandLoop();
    }

    public void StopAndReset()
    {
        KillTweens();

        if (!_hasInitialState)
        {
            return;
        }

        if (boxRoot != null)
        {
            boxRoot.localPosition = _boxStartLocalPosition;
            boxRoot.localRotation = _boxStartLocalRotation;
            boxRoot.localScale = _boxStartLocalScale;
        }

        if (handPointer != null)
        {
            handPointer.anchoredPosition = _handStartAnchoredPosition;
            handPointer.localScale = _handStartLocalScale;

            if (hideHandWithoutTarget)
            {
                handPointer.gameObject.SetActive(handTapTarget != null);
            }
        }
    }

    private void CacheInitialState()
    {
        if (boxRoot == null)
        {
            boxRoot = transform;
        }

        if (worldCamera == null)
        {
            worldCamera = Camera.main;
        }

        if (boxRoot != null)
        {
            _boxStartLocalPosition = boxRoot.localPosition;
            _boxStartLocalRotation = boxRoot.localRotation;
            _boxStartLocalScale = boxRoot.localScale;
        }

        if (handPointer != null)
        {
            _handStartAnchoredPosition = handPointer.anchoredPosition;
            _handStartLocalScale = handPointer.localScale;
        }

        _hasInitialState = true;
    }

    private void StartBoxLoop()
    {
        if (boxRoot == null)
        {
            return;
        }

        _boxBounceSequence = DOTween.Sequence();
        _boxBounceSequence.AppendInterval(groundDelayDuration);
        _boxBounceSequence.AppendCallback(() => PlaySound(jumpUpSound));
        _boxBounceSequence.Append(
            boxRoot.DOLocalMoveY(_boxStartLocalPosition.y + bounceHeight, bounceUpDuration).SetEase(Ease.OutQuad));
        _boxBounceSequence.Append(
            boxRoot.DOLocalMoveY(_boxStartLocalPosition.y, bounceDownDuration).SetEase(Ease.InQuad));
        _boxBounceSequence.AppendCallback(() => PlaySound(landSound));
        _boxBounceSequence.SetLoops(-1, LoopType.Restart);

        _boxSpinTween = boxRoot
            .DOLocalRotate(new Vector3(0f, spinDegreesPerLoop, 0f), spinDuration, RotateMode.LocalAxisAdd)
            .SetEase(Ease.Linear)
            .SetLoops(-1, LoopType.Restart);
    }

    private void StartHandLoop()
    {
        if (handPointer == null)
        {
            return;
        }

        if (hideHandWithoutTarget)
        {
            handPointer.gameObject.SetActive(handTapTarget != null);
        }
        else
        {
            handPointer.gameObject.SetActive(true);
        }

        if (handTapTarget == null || rootCanvas == null || worldCamera == null)
        {
            return;
        }

        PlayHandApproach();
    }

    private void PlayHandApproach()
    {
        if (!isActiveAndEnabled || handPointer == null || handTapTarget == null || rootCanvas == null || worldCamera == null)
        {
            return;
        }

        _handSequence?.Kill();

        float progress = 0f;
        _handSequence = DOTween.Sequence();
        _handSequence.Append(DOTween.To(
            () => progress,
            value =>
            {
                progress = value;

                if (!TryGetTargetAnchoredPosition(out var targetPosition))
                {
                    return;
                }

                handPointer.anchoredPosition =
                    Vector2.LerpUnclamped(_handStartAnchoredPosition, targetPosition, progress);
            },
            1f,
            handMoveDuration).SetEase(Ease.InOutSine));

        if (!Mathf.Approximately(handPressedScale, 1f))
        {
            _handSequence.Join(
                handPointer.DOScale(_handStartLocalScale * handPressedScale, handMoveDuration).SetEase(Ease.InOutSine));
        }

        _handSequence.AppendCallback(PlayTapFeedback);
        _handSequence.AppendInterval(handHoldDuration);
        _handSequence.OnComplete(PlayHandReturn);
    }

    private void PlayHandReturn()
    {
        if (!isActiveAndEnabled || handPointer == null)
        {
            return;
        }

        _handSequence?.Kill();

        Vector2 startAnchoredPosition = handPointer.anchoredPosition;
        float progress = 0f;

        _handSequence = DOTween.Sequence();
        _handSequence.Append(DOTween.To(
            () => progress,
            value =>
            {
                progress = value;
                handPointer.anchoredPosition =
                    Vector2.LerpUnclamped(startAnchoredPosition, _handStartAnchoredPosition, progress);
            },
            1f,
            handMoveDuration).SetEase(Ease.OutSine));

        if (!Mathf.Approximately(handPressedScale, 1f))
        {
            _handSequence.Join(handPointer.DOScale(_handStartLocalScale, handMoveDuration).SetEase(Ease.OutSine));
        }

        _handSequence.AppendInterval(handPauseDuration);
        _handSequence.OnComplete(PlayHandApproach);
    }

    private void PlayTapFeedback()
    {
        if (boxRoot == null || boxTapPunchScale <= 0f)
        {
            return;
        }

        _boxPunchTween?.Kill();
        boxRoot.localScale = _boxStartLocalScale;
        _boxPunchTween = boxRoot.DOPunchScale(Vector3.one * boxTapPunchScale, boxTapPunchDuration, 1, 0.5f);
    }

    private void PlaySound(AudioClip clip)
    {
        if (clip == null)
        {
            return;
        }

        if (soundSource != null)
        {
            soundSource.PlayOneShot(clip, 1f);
            return;
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySound(clip);
        }
    }

    private bool TryGetTargetAnchoredPosition(out Vector2 anchoredPosition)
    {
        anchoredPosition = _handStartAnchoredPosition;

        if (rootCanvas == null || handTapTarget == null || worldCamera == null)
        {
            return false;
        }

        RectTransform canvasRect = rootCanvas.transform as RectTransform;
        if (canvasRect == null)
        {
            return false;
        }

        Vector3 screenPoint = worldCamera.WorldToScreenPoint(handTapTarget.position);
        if (screenPoint.z <= 0f)
        {
            return false;
        }

        Camera canvasCamera = rootCanvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : rootCanvas.worldCamera;
        if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect, screenPoint, canvasCamera,
                out var localPoint))
        {
            return false;
        }

        anchoredPosition = localPoint + handTapCanvasOffset;
        return true;
    }

    private void KillTweens()
    {
        _boxBounceSequence?.Kill();
        _boxBounceSequence = null;

        _boxSpinTween?.Kill();
        _boxSpinTween = null;

        _handSequence?.Kill();
        _handSequence = null;

        _boxPunchTween?.Kill();
        _boxPunchTween = null;
    }
}
