using System;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Serializable]
        private class OptionStep
        {
            public RectTransform Button;
            public GameObject TargetObject;
        }

        [Header("References")] [SerializeField]
        private RectTransform _hand;

        [SerializeField] private OptionStep[] _options = new OptionStep[3];

        [Header("Timing")] [SerializeField] private float _moveDuration = 0.35f;
        [SerializeField] private float _pressDuration = 0.12f;
        [SerializeField] private float _stepDelay = 0.2f;

        [Header("Press")] [SerializeField] private float _buttonPressedScale = 0.9f;
        [SerializeField] private Ease _moveEase = Ease.InOutSine;
        [SerializeField] private Ease _pressEase = Ease.OutQuad;

        private Sequence _demoSequence;
        private Vector2 _handStartAnchoredPosition;
        private Vector3 _handStartLocalScale = Vector3.one;
        private Vector3[] _buttonStartScales;

        private void Awake()
        {
            CacheInitialState();
            DeactivateAllTargets();
            ResetTransforms();
        }

        private void Start()
        {
            PlayHandDemo();
        }

        public void PlayHandDemo()
        {
            if (_hand == null || _options == null || _options.Length == 0)
            {
                return;
            }

            _demoSequence?.Kill();
            ResetTransforms();
            DeactivateAllTargets();

            _demoSequence = DOTween.Sequence()
                .SetLoops(-1, LoopType.Yoyo)
                .SetLink(gameObject)
                .OnKill(() => _demoSequence = null);

            for (int i = 0; i < _options.Length; i++)
            {
                OptionStep step = _options[i];
                if (step == null || step.Button == null)
                {
                    continue;
                }

                step.Button.transform.GetComponent<Button>().onClick.AddListener(() =>
                {
                    GameManager.Instance.EndGame();
                });

                int index = i;
                RectTransform button = step.Button;

                _demoSequence.Append(_hand.DOAnchorPos(button.anchoredPosition, _moveDuration).SetEase(_moveEase));
                _demoSequence.Append(button
                    .DOScale(_buttonStartScales[index] * _buttonPressedScale, _pressDuration * 0.5f)
                    .SetEase(_pressEase));
                _demoSequence.AppendCallback(() => ActivateTargetOnly(index));
                _demoSequence.Append(button.DOScale(_buttonStartScales[index], _pressDuration * 0.5f)
                    .SetEase(_pressEase));
                _demoSequence.AppendInterval(_stepDelay);
            }
        }

        public void StopHandDemo()
        {
            _demoSequence?.Kill();
            _demoSequence = null;
            ResetTransforms();
            DeactivateAllTargets();
        }

        private void CacheInitialState()
        {
            if (_hand != null)
            {
                _handStartAnchoredPosition = _hand.anchoredPosition;
                _handStartLocalScale = _hand.localScale;
            }

            _buttonStartScales = new Vector3[_options.Length];
            for (int i = 0; i < _options.Length; i++)
            {
                OptionStep step = _options[i];
                if (step != null && step.Button != null)
                {
                    _buttonStartScales[i] = step.Button.localScale;
                }
                else
                {
                    _buttonStartScales[i] = Vector3.one;
                }
            }
        }

        private void ResetTransforms()
        {
            if (_hand != null)
            {
                _hand.anchoredPosition = _handStartAnchoredPosition;
                _hand.localScale = _handStartLocalScale;
            }

            for (int i = 0; i < _options.Length; i++)
            {
                OptionStep step = _options[i];
                if (step == null || step.Button == null)
                {
                    continue;
                }

                step.Button.localScale = _buttonStartScales[i];
            }
        }

        private void ActivateTargetOnly(int activeIndex)
        {
            DeactivateAllTargets();

            for (int i = 0; i < _options.Length; i++)
            {
                OptionStep step = _options[i];
                if (step == null || step.Button == null)
                {
                    continue;
                }

                bool isActive = i == activeIndex;
                if (isActive && step.TargetObject != null)
                {
                    step.TargetObject.SetActive(isActive);
                }
            }
        }

        private void DeactivateAllTargets()
        {
            if (_options == null)
            {
                return;
            }

            for (int i = 0; i < _options.Length; i++)
            {
                OptionStep step = _options[i];
                if (step?.TargetObject != null)
                {
                    step.TargetObject.SetActive(false);
                }
            }
        }

        private void OnDisable()
        {
            _demoSequence?.Kill();
            _demoSequence = null;
            ResetTransforms();
            DeactivateAllTargets();
        }
    }
}