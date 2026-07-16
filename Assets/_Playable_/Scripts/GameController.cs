using UnityEngine;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine.UI;
using TMPro;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private List<Block> _blocks = new List<Block>();
        [SerializeField] private float _cameraLookDuration = 0.4f;
        [SerializeField] private GameObject _text;
        [SerializeField] private GameObject _hand;
        [SerializeField] private float _handPressScale = 0.85f;
        [SerializeField] private float _handPressDuration = 0.25f;
        [SerializeField] private Image _bar;
        [SerializeField] private TMP_Text _countText;
        [SerializeField] private float _barFillDuration = 0.25f;
        [SerializeField] private List<TMP_Text> _stepTexts = new List<TMP_Text>();
        [SerializeField] private List<Image> _stepSelectImages = new List<Image>();
        [SerializeField] private AudioClip _soundBuild;
        private int _countBlocks = 0;
        private bool _isComplete;
        private Tween _cameraLookTween;
        private Tween _handPressTween;
        private Tween _barTween;
        private Vector3 _handStartScale = Vector3.one;
        private List<int> _stepValues = new List<int>();
        private int _currentStepTextIndex;

        private void Awake()
        {
            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;
            }

            if (_hand != null)
            {
                _handStartScale = _hand.transform.localScale;
            }

            InitializeStepTexts();
        }

        private void Start()
        {
            UpdateProgressUI(true);
            LookAtCurrentBlock();
            PlayHandPressEffect();
            _blocks[_countBlocks].Select();
        }

        private void Update()
        {
            if (Input.GetMouseButtonDown(0) && !_isComplete)
            {
                AudioManager.Instance.PlaySound(_soundBuild);
                StopHandPressEffect();
                _blocks[_countBlocks].SetSolidAndPlayBoxEffect();
                _countBlocks++;
                ConsumeStepValue();
                UpdateProgressUI();
                if (_countBlocks >= 20)
                {
                    _isComplete = true;
                    DOVirtual.DelayedCall(1, () => { GameManager.Instance.EndGame(); });
                }
                else
                {
                    LookAtCurrentBlock();
                    _blocks[_countBlocks].Select();
                }
            }
        }

        private void LookAtCurrentBlock(bool instant = false)
        {
            if (_targetCamera == null || _blocks == null || _blocks.Count == 0)
            {
                return;
            }

            int blockIndex = Mathf.Clamp(_countBlocks, 0, _blocks.Count - 1);
            Block currentBlock = _blocks[blockIndex];

            if (currentBlock == null)
            {
                return;
            }

            Vector3 lookDirection = currentBlock.transform.position - _targetCamera.transform.position;

            if (lookDirection.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            Quaternion targetRotation = Quaternion.LookRotation(lookDirection.normalized, Vector3.up);
            _cameraLookTween?.Kill();

            if (instant)
            {
                _targetCamera.transform.rotation = targetRotation;
                return;
            }

            _cameraLookTween = _targetCamera.transform
                .DORotateQuaternion(targetRotation, _cameraLookDuration)
                .SetEase(Ease.InOutSine)
                .OnKill(() => _cameraLookTween = null)
                .OnComplete(() => _cameraLookTween = null);
        }

        private void PlayHandPressEffect()
        {
            if (_hand == null)
            {
                return;
            }

            _handPressTween?.Kill();
            _hand.transform.localScale = _handStartScale;
            _handPressTween = _hand.transform
                .DOScale(_handStartScale * _handPressScale, _handPressDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _handPressTween = null);
        }

        private void StopHandPressEffect()
        {
            _handPressTween?.Kill();

            if (_hand != null)
            {
                _hand.transform.localScale = _handStartScale;
                _hand.SetActive(false);
            }

            if (_text != null)
            {
                _text.SetActive(false);
            }
        }

        private void InitializeStepTexts()
        {
            _stepValues.Clear();
            _currentStepTextIndex = 0;

            for (int i = 0; i < _stepTexts.Count; i++)
            {
                int stepValue = 0;
                TMP_Text stepText = _stepTexts[i];

                if (stepText != null)
                {
                    int.TryParse(stepText.text, out stepValue);
                    stepText.text = stepValue.ToString();
                }

                _stepValues.Add(stepValue);
            }

            UpdateStepSelectionVisual();
        }

        private void ConsumeStepValue()
        {
            if (_stepValues.Count == 0)
            {
                return;
            }

            while (_currentStepTextIndex < _stepValues.Count && _stepValues[_currentStepTextIndex] <= 0)
            {
                _currentStepTextIndex++;
            }

            UpdateStepSelectionVisual();

            if (_currentStepTextIndex >= _stepValues.Count)
            {
                return;
            }

            _stepValues[_currentStepTextIndex] = Mathf.Max(0, _stepValues[_currentStepTextIndex] - 1);

            TMP_Text currentText = _stepTexts[_currentStepTextIndex];
            if (currentText != null)
            {
                currentText.text = _stepValues[_currentStepTextIndex].ToString();
            }

            if (_stepValues[_currentStepTextIndex] == 0)
            {
                _currentStepTextIndex++;
            }

            UpdateStepSelectionVisual();
        }

        private void UpdateStepSelectionVisual()
        {
            for (int i = 0; i < _stepSelectImages.Count; i++)
            {
                if (_stepSelectImages[i] == null)
                {
                    continue;
                }

                bool isActive = i == _currentStepTextIndex && _currentStepTextIndex < _stepValues.Count;
                _stepSelectImages[i].gameObject.SetActive(isActive);
            }
        }

        private void UpdateProgressUI(bool instant = false)
        {
            int totalBlocks = _blocks != null ? _blocks.Count : 0;
            int currentCount = Mathf.Clamp(_countBlocks, 0, totalBlocks);

            if (_countText != null)
            {
                _countText.text = currentCount + "/" + totalBlocks;
            }

            if (_bar == null)
            {
                return;
            }

            float targetFill = totalBlocks > 0 ? currentCount / (float)totalBlocks : 0f;
            _barTween?.Kill();

            if (instant)
            {
                _bar.fillAmount = targetFill;
                return;
            }

            _barTween = _bar
                .DOFillAmount(targetFill, _barFillDuration)
                .SetEase(Ease.OutSine)
                .OnKill(() => _barTween = null)
                .OnComplete(() => _barTween = null);
        }

        private void OnDestroy()
        {
            _cameraLookTween?.Kill();
            _handPressTween?.Kill();
            _barTween?.Kill();
        }
    }
}
