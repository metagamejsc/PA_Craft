using DG.Tweening;
using UnityEngine;

public class FailPanel : MonoBehaviour
{
    [SerializeField] private GameObject _title;
    [SerializeField] private GameObject _button;
    [SerializeField] private float _titleStartScale = 1.2f;
    [SerializeField] private float _titleHoldDuration = 0.15f;
    [SerializeField] private float _titleShrinkScale = 0.9f;
    [SerializeField] private float _titleShrinkDuration = 0.18f;
    [SerializeField] private float _titleReturnDuration = 0.16f;
    [SerializeField] private float _buttonPulseScale = 1.12f;
    [SerializeField] private float _buttonPulseDuration = 0.4f;

    private Tween _titleTween;
    private Tween _buttonTween;

    public void Show()
    {
        gameObject.SetActive(true);
        // PlayTitleImpact();
        // PlayButtonPulse();
    }

    private void PlayTitleImpact()
    {
        if (_title == null)
        {
            return;
        }

        _titleTween?.Kill();
        _title.transform.localScale = Vector3.one;
        _titleTween = DOTween.Sequence()
            .Append(_title.transform.DOScale(_titleStartScale, 0f))
            .AppendInterval(_titleHoldDuration)
            .Append(_title.transform.DOScale(_titleShrinkScale, _titleShrinkDuration).SetEase(Ease.InExpo))
            .Append(_title.transform.DOScale(Vector3.one, _titleReturnDuration).SetEase(Ease.OutBack))
            .OnKill(() => _titleTween = null)
            .OnComplete(() => _titleTween = null);
    }

    private void PlayButtonPulse()
    {
        if (_button == null)
        {
            return;
        }

        _buttonTween?.Kill();
        _button.transform.localScale = Vector3.one;
        _buttonTween = _button.transform
            .DOScale(_buttonPulseScale, _buttonPulseDuration)
            .SetEase(Ease.InOutSine)
            .SetLoops(-1, LoopType.Yoyo)
            .OnKill(() => _buttonTween = null);
    }

    private void OnDisable()
    {
        _titleTween?.Kill();
        _titleTween = null;
        _buttonTween?.Kill();
        _buttonTween = null;
    }
}
