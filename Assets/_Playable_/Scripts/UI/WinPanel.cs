using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class WinPanel : MonoBehaviour
    {
        [SerializeField] private GameObject _title;
        [SerializeField] private GameObject _button;
        [SerializeField] private float _titlePulseScale = 1.08f;
        [SerializeField] private float _titlePulseDuration = 0.45f;
        [SerializeField] private float _buttonPulseScale = 1.12f;
        [SerializeField] private float _buttonPulseDuration = 0.4f;

        private Tween _titleTween;
        private Tween _buttonTween;

        public void Show()
        {
            gameObject.SetActive(true);
            // PlayTitlePulse();
            // PlayButtonPulse();
        }

        private void PlayTitlePulse()
        {
            if (_title == null)
            {
                return;
            }

            _titleTween?.Kill();
            _title.transform.localScale = Vector3.one;
            _titleTween = _title.transform
                .DOScale(_titlePulseScale, _titlePulseDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _titleTween = null);
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
}