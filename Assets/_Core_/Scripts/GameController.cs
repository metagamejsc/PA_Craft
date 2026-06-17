using DG.Tweening;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;

[System.Serializable]
public class OrientationRectLayout
{
    public RectTransform target;
    public RectTransform landscapeReference;
    public RectTransform portraitReference;
}

[System.Serializable]
public class OrientationHandSize
{
    public Vector2 landscapeSizeDelta;
    public Vector2 portraitSizeDelta;
}


public class GameController : MonoBehaviour
{
    [SerializeField] private RectTransform _hand;
    [SerializeField] private RectTransform _rumi;
    [SerializeField] private RectTransform[] _optionPoints = new RectTransform[2];
    [SerializeField] private GameObject[] _shaderPoints = new GameObject[2];
    [SerializeField] private GameObject _landscapeBackground;
    [SerializeField] private GameObject _portraitBackground;
    [SerializeField] private OrientationRectLayout[] _rectLayouts;
    [SerializeField] private OrientationHandSize _handSize;
    [SerializeField] private float _moveDuration = 0.35f;
    [SerializeField] private float _delayAtPoint = 0.5f;
    [SerializeField] private float _characterJumpHeight = 18f;
    [SerializeField] private float _characterJumpDuration = 0.45f;
    [SerializeField] private float _focusedScaleMultiplier = 1.15f;
    [SerializeField] private float _scaleDuration = 0.2f;
    [SerializeField] private float _handScaleMultiplier = 1.12f;
    [SerializeField] private float _handScaleDuration = 0.12f;
    [SerializeField] private float _rumiHeightOffsetOnSquash = -24f;
    [SerializeField] private float _rumiScaleDuration = 0.35f;
    [SerializeField] private float _rumiYOffsetOnSquash = -8f;

    private Sequence _handSequence;
    private Tween _handMoveTween;
    private Tween _handScaleTween;
    private Tween[] _characterJumpTweens;
    private Tween _rumiScaleTween;
    private Vector2[] _baseAnchoredPositions;
    private Vector3[] _baseScales;
    private Vector3 _handBaseScale;
    private Vector3 _rumiBaseScale;
    private Vector2 _rumiBaseAnchoredPosition;
    private Vector2 _rumiBaseSizeDelta;
    private int _currentPointIndex = -1;
    private bool _isLandscape;
    private Vector2Int _lastScreenSize;
    private Coroutine _refreshLayoutCoroutine;

    private void Awake()
    {
        CacheOptionStates();
    }

    private void Start()
    {
        ApplyOrientationLayout(true);
        LunaManager.ins.CheckClickShowEndCard();
    }

    private void OnDisable()
    {
        StopHandLoop();
        StopCharacterBouncing();
        StopRumiScale();
        ResetOptionVisuals();

        if (_refreshLayoutCoroutine != null)
        {
            StopCoroutine(_refreshLayoutCoroutine);
            _refreshLayoutCoroutine = null;
        }
    }

    private void Update()
    {
        if (_lastScreenSize.x == Screen.width && _lastScreenSize.y == Screen.height)
        {
            return;
        }

        ApplyOrientationLayout();
    }

    public void StartHandLoop()
    {
        if (_hand == null || !HasEnoughPoints())
        {
            return;
        }

        StopHandLoop();

        _currentPointIndex = 0;
        _hand.gameObject.SetActive(true);
        Vector2 handAnchoredPosition = _hand.anchoredPosition;
        Vector2 optionPositionInHandParent = GetPositionInParentSpace(_optionPoints[_currentPointIndex], _hand.parent as RectTransform);
        _hand.anchoredPosition = new Vector2(optionPositionInHandParent.x, handAnchoredPosition.y);
        _hand.localScale = _handBaseScale;
        SetFocusedOption(_currentPointIndex);
        SetShaderState(_currentPointIndex, true);

        _handSequence = DOTween.Sequence()
            .SetLink(gameObject, LinkBehaviour.KillOnDisable)
            .SetLoops(-1, LoopType.Restart);

        _handSequence.AppendCallback(() => MoveToPoint(1));
        _handSequence.AppendInterval(_moveDuration + _delayAtPoint);
        _handSequence.AppendCallback(() => MoveToPoint(0));
        _handSequence.AppendInterval(_moveDuration + _delayAtPoint);
    }

    public void StopHandLoop()
    {
        if (_handSequence != null)
        {
            _handSequence.Kill();
            _handSequence = null;
        }

        if (_hand != null)
        {
            if (_handMoveTween != null)
            {
                _handMoveTween.Kill();
                _handMoveTween = null;
            }

            if (_handScaleTween != null)
            {
                _handScaleTween.Kill();
                _handScaleTween = null;
            }

            _hand.localScale = _handBaseScale;
        }
    }

    private void MoveToPoint(int pointIndex)
    {
        if (_hand == null || pointIndex < 0 || pointIndex >= _optionPoints.Length || _optionPoints[pointIndex] == null)
        {
            return;
        }

        int previousPointIndex = _currentPointIndex;
        _currentPointIndex = pointIndex;

        ResetOptionScale(previousPointIndex);
        SetShaderState(previousPointIndex, false);
        if (_handMoveTween != null)
        {
            _handMoveTween.Kill();
        }

        Vector2 optionPositionInHandParent = GetPositionInParentSpace(_optionPoints[pointIndex], _hand.parent as RectTransform);
        _handMoveTween = _hand.DOAnchorPosX(optionPositionInHandParent.x, _moveDuration)
            .SetEase(Ease.Linear)
            .OnComplete(() =>
            {
                SetFocusedOption(_currentPointIndex);
                SetShaderState(_currentPointIndex, true);
                AnimateHandFocus();
            });
    }

    private void CacheOptionStates()
    {
        if (_optionPoints == null)
        {
            return;
        }

        if (_hand != null)
        {
            _handBaseScale = _hand.localScale;
        }

        if (_rumi != null)
        {
            _rumiBaseScale = _rumi.localScale;
            _rumiBaseAnchoredPosition = _rumi.anchoredPosition;
            _rumiBaseSizeDelta = _rumi.sizeDelta;
        }

        int count = _optionPoints.Length;
        _characterJumpTweens = new Tween[count];
        _baseAnchoredPositions = new Vector2[count];
        _baseScales = new Vector3[count];

        for (int i = 0; i < count; i++)
        {
            if (_optionPoints[i] == null)
            {
                continue;
            }

            _baseAnchoredPositions[i] = _optionPoints[i].anchoredPosition;
            _baseScales[i] = _optionPoints[i].localScale;
        }
    }

    private void ApplyOrientationLayout(bool force = false)
    {
        Vector2Int currentScreenSize = new Vector2Int(Screen.width, Screen.height);
        bool shouldLandscape = Screen.width >= Screen.height;

        if (!force && currentScreenSize == _lastScreenSize && shouldLandscape == _isLandscape)
        {
            return;
        }

        _lastScreenSize = currentScreenSize;
        _isLandscape = shouldLandscape;

        if (_refreshLayoutCoroutine != null)
        {
            StopCoroutine(_refreshLayoutCoroutine);
        }

        _refreshLayoutCoroutine = StartCoroutine(RefreshLayoutAfterOrientationChange());
    }

    private void ApplyRectLayouts(bool isLandscape)
    {
        if (_rectLayouts == null)
        {
            return;
        }

        for (int i = 0; i < _rectLayouts.Length; i++)
        {
            OrientationRectLayout layout = _rectLayouts[i];
            if (layout == null || layout.target == null)
            {
                continue;
            }

            RectTransform reference = isLandscape
                ? layout.landscapeReference
                : layout.portraitReference;

            if (reference == null)
            {
                continue;
            }

            layout.target.anchorMin = reference.anchorMin;
            layout.target.anchorMax = reference.anchorMax;
            layout.target.pivot = reference.pivot;
            layout.target.anchoredPosition3D = reference.anchoredPosition3D;
            layout.target.localRotation = reference.localRotation;

            layout.target.anchoredPosition = GetPositionInParentSpace(reference, layout.target.parent as RectTransform);
        }
    }

    private void StartCharacterBouncing()
    {
        if (_optionPoints == null || _characterJumpTweens == null)
        {
            return;
        }

        for (int i = 0; i < _optionPoints.Length; i++)
        {
            RectTransform option = _optionPoints[i];
            if (option == null)
            {
                continue;
            }

            option.DOKill();
            option.anchoredPosition = _baseAnchoredPositions[i];
            option.localScale = _baseScales[i];

            _characterJumpTweens[i] = option
                .DOAnchorPosY(_baseAnchoredPositions[i].y + _characterJumpHeight, _characterJumpDuration)
                .SetEase(Ease.OutQuad)
                .SetLoops(-1, LoopType.Yoyo)
                .SetDelay(i * _characterJumpDuration)
                .SetLink(option.gameObject, LinkBehaviour.KillOnDisable);
        }
    }

    private void StopCharacterBouncing()
    {
        if (_characterJumpTweens == null)
        {
            return;
        }

        for (int i = 0; i < _characterJumpTweens.Length; i++)
        {
            if (_characterJumpTweens[i] != null)
            {
                _characterJumpTweens[i].Kill();
                _characterJumpTweens[i] = null;
            }
        }
    }

    private void SetFocusedOption(int focusedIndex, int previousIndex = -1)
    {
        if (_optionPoints == null || _baseScales == null)
        {
            return;
        }

        if (previousIndex >= 0 && previousIndex < _optionPoints.Length && _optionPoints[previousIndex] != null)
        {
            ResetOptionScale(previousIndex);
        }

        if (focusedIndex >= 0 && focusedIndex < _optionPoints.Length && _optionPoints[focusedIndex] != null)
        {
            _optionPoints[focusedIndex]
                .DOScale(_baseScales[focusedIndex] * _focusedScaleMultiplier, _scaleDuration)
                .SetEase(Ease.OutBack);
        }
    }

    private void ResetOptionVisuals()
    {
        if (_optionPoints == null || _baseAnchoredPositions == null || _baseScales == null)
        {
            return;
        }

        for (int i = 0; i < _optionPoints.Length; i++)
        {
            RectTransform option = _optionPoints[i];
            if (option == null)
            {
                continue;
            }

            option.DOKill();
            option.anchoredPosition = _baseAnchoredPositions[i];
            option.localScale = _baseScales[i];
            SetShaderState(i, false);
        }
    }

    private bool HasEnoughPoints()
    {
        return _optionPoints != null
               && _optionPoints.Length >= 2
               && _optionPoints[0] != null
               && _optionPoints[1] != null;
    }

    private void AnimateHandFocus()
    {
        if (_hand == null)
        {
            return;
        }

        if (_handScaleTween != null)
        {
            _handScaleTween.Kill();
        }

        _hand.localScale = _handBaseScale;
        _handScaleTween = DOTween.Sequence()
            .Append(_hand.DOScale(_handBaseScale * _handScaleMultiplier, _handScaleDuration).SetEase(Ease.OutQuad))
            .Append(_hand.DOScale(_handBaseScale, _handScaleDuration).SetEase(Ease.InQuad));
    }

    private void ResetOptionScale(int optionIndex)
    {
        if (_optionPoints == null || _baseScales == null)
        {
            return;
        }

        if (optionIndex < 0 || optionIndex >= _optionPoints.Length || _optionPoints[optionIndex] == null)
        {
            return;
        }

        _optionPoints[optionIndex]
            .DOScale(_baseScales[optionIndex], _scaleDuration)
            .SetEase(Ease.OutQuad);
    }

    private void SetShaderState(int optionIndex, bool isActive)
    {
        if (_shaderPoints == null)
        {
            return;
        }

        if (optionIndex < 0 || optionIndex >= _shaderPoints.Length || _shaderPoints[optionIndex] == null)
        {
            return;
        }

        _shaderPoints[optionIndex].SetActive(isActive);
    }

    private void SetBackgroundState(GameObject background, bool isActive)
    {
        if (background == null)
        {
            return;
        }

        background.SetActive(isActive);
    }

    private void ApplyHandSize(bool isLandscape)
    {
        if (_hand == null || _handSize == null)
        {
            return;
        }

        _hand.sizeDelta = isLandscape
            ? _handSize.landscapeSizeDelta
            : _handSize.portraitSizeDelta;
    }

    private IEnumerator RefreshLayoutAfterOrientationChange()
    {
        StopHandLoop();
        StopCharacterBouncing();
        ResetOptionVisuals();

        SetBackgroundState(_landscapeBackground, _isLandscape);
        SetBackgroundState(_portraitBackground, !_isLandscape);
        ApplyRectLayouts(_isLandscape);
        ApplyHandSize(_isLandscape);

        yield return null;
        Canvas.ForceUpdateCanvases();

        if (_rectLayouts != null)
        {
            for (int i = 0; i < _rectLayouts.Length; i++)
            {
                OrientationRectLayout layout = _rectLayouts[i];
                if (layout != null && layout.target != null)
                {
                    LayoutRebuilder.ForceRebuildLayoutImmediate(layout.target);
                }
            }
        }

        CacheOptionStates();
        StartCharacterBouncing();
        StartRumiScale();
        StartHandLoop();
        _refreshLayoutCoroutine = null;
    }

    private Vector2 GetPositionInParentSpace(RectTransform source, RectTransform targetParent)
    {
        if (source == null)
        {
            return Vector2.zero;
        }

        if (targetParent == null)
        {
            return source.anchoredPosition;
        }

        Canvas parentCanvas = targetParent.GetComponentInParent<Canvas>();
        Camera uiCamera = null;
        if (parentCanvas != null && parentCanvas.renderMode != RenderMode.ScreenSpaceOverlay)
        {
            uiCamera = parentCanvas.worldCamera;
        }

        Vector2 screenPoint = RectTransformUtility.WorldToScreenPoint(uiCamera, source.position);
        RectTransformUtility.ScreenPointToLocalPointInRectangle(targetParent, screenPoint, uiCamera, out Vector2 localPoint);
        return localPoint;
    }

    private void StartRumiScale()
    {
        if (_rumi == null)
        {
            return;
        }

        StopRumiScale();
        _rumi.localScale = _rumiBaseScale;
        _rumi.anchoredPosition = _rumiBaseAnchoredPosition;
        _rumi.sizeDelta = _rumiBaseSizeDelta;

        Sequence rumiSequence = DOTween.Sequence();
        rumiSequence.Append(_rumi.DOSizeDelta(
            new Vector2(_rumiBaseSizeDelta.x, _rumiBaseSizeDelta.y + _rumiHeightOffsetOnSquash),
            _rumiScaleDuration).SetEase(Ease.InOutSine));
        rumiSequence.Join(_rumi.DOAnchorPosY(_rumiBaseAnchoredPosition.y + _rumiYOffsetOnSquash, _rumiScaleDuration).SetEase(Ease.InOutSine));
        rumiSequence.Append(_rumi.DOSizeDelta(_rumiBaseSizeDelta, _rumiScaleDuration).SetEase(Ease.InOutSine));
        rumiSequence.Join(_rumi.DOAnchorPosY(_rumiBaseAnchoredPosition.y, _rumiScaleDuration).SetEase(Ease.InOutSine));

        _rumiScaleTween = rumiSequence
            .SetLoops(-1, LoopType.Restart)
            .SetLink(_rumi.gameObject, LinkBehaviour.KillOnDisable);
    }

    private void StopRumiScale()
    {
        if (_rumiScaleTween != null)
        {
            _rumiScaleTween.Kill();
            _rumiScaleTween = null;
        }

        if (_rumi != null)
        {
            _rumi.DOKill();
            _rumi.localScale = _rumiBaseScale;
            _rumi.anchoredPosition = _rumiBaseAnchoredPosition;
            _rumi.sizeDelta = _rumiBaseSizeDelta;
        }
    }
}
