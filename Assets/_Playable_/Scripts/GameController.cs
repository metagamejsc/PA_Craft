using UnityEngine;
using System;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine.UI;
using TMPro;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Serializable]
        private class HouseBuildData
        {
            [SerializeField] private GameObject _houseRoot;
            [SerializeField] private Transform _orbitTarget;
            [SerializeField] private List<Block> _blocks = new List<Block>();
            [SerializeField] private Button _selectButton;
            [SerializeField] private List<int> _stepCounts = new List<int>();
            [SerializeField] private List<Sprite> _stepIcons = new List<Sprite>();

            public GameObject HouseRoot => _houseRoot;
            public Transform OrbitTarget => _orbitTarget;
            public Button SelectButton => _selectButton;
            public List<int> StepCounts => _stepCounts;
            public List<Sprite> StepIcons => _stepIcons;

            public List<Block> GetBlocks()
            {
                if (_blocks != null && _blocks.Count > 0)
                {
                    return new List<Block>(_blocks);
                }

                return _houseRoot != null
                    ? new List<Block>(_houseRoot.GetComponentsInChildren<Block>(true))
                    : new List<Block>();
            }
        }

        [Header("Build")] [SerializeField] private Camera _targetCamera;
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
        [Tooltip("The actual hotbar icon Images. Do not assign the selection/highlight Images here.")]
        [SerializeField] private List<Image> _stepIconImages = new List<Image>();
        [SerializeField] private List<Image> _stepSelectImages = new List<Image>();

        [Header("House Orbit")] [SerializeField]
        private Transform _houseTarget;

        [Tooltip("The first house root. It is deactivated after selecting a next house.")]
        [SerializeField] private GameObject _initialHouseRoot;
        [SerializeField] private float _houseOrbitDuration = 6f;
        [SerializeField] private int _houseOrbitTurns = 2;
        [SerializeField] private float _houseLookHeight = 1.5f;
        [SerializeField] private Vector3 _houseOrbitCameraOffset = new Vector3(0f, 2.5f, -5f);
        [SerializeField] private GameObject _vfx;
        [SerializeField] private AudioClip _soundBuild;

        [Header("Next Houses")]
        [Tooltip("Set Size = 2. These are alternative houses: the player builds only the selected house.")]
        [SerializeField]
        private List<HouseBuildData> _nextHouses = new List<HouseBuildData>();

        [SerializeField] private Transform _completePanel;
        [SerializeField] private Transform _houseSelectionPanel;
        [SerializeField] private Button _installButton;
        [SerializeField] private float _panelScaleDuration = 0.35f;
        [SerializeField] private Ease _panelScaleEase = Ease.OutBack;

        private int _countBlocks = 0;
        private bool _isComplete;
        private bool _isHouseOrbiting;
        private Tween _cameraLookTween;
        private Tween _houseOrbitTween;
        private Tween _handPressTween;
        private Tween _barTween;
        private Sequence _panelSequence;
        private Vector3 _handStartScale = Vector3.one;
        private Vector3 _completePanelScale = Vector3.one;
        private Vector3 _houseSelectionPanelScale = Vector3.one;
        private Vector3 _cameraStartPosition;
        private Quaternion _cameraStartRotation;
        private bool _hasSavedCameraPose;
        private List<int> _stepValues = new List<int>();
        private readonly List<int> _initialStepValues = new List<int>();
        private readonly List<Sprite> _initialStepIcons = new List<Sprite>();
        private bool _hasSelectedNextHouse;
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

            if (_targetCamera != null)
            {
                _cameraStartPosition = _targetCamera.transform.position;
                _cameraStartRotation = _targetCamera.transform.rotation;
                _hasSavedCameraPose = true;
            }

            if (_initialHouseRoot == null && _houseTarget != null)
            {
                _initialHouseRoot = _houseTarget.gameObject;
            }

            InitializeStepTexts(true);
            CaptureInitialStepIcons();
            ApplyStepUI(_initialStepValues, _initialStepIcons);
            PreparePanel(_completePanel, ref _completePanelScale);
            PreparePanel(_houseSelectionPanel, ref _houseSelectionPanelScale);

            if (_installButton != null)
            {
                _installButton.onClick.AddListener(EndGame);
            }

            for (int i = 0; i < _nextHouses.Count; i++)
            {
                HouseBuildData house = _nextHouses[i];
                if (house != null && house.HouseRoot != null)
                {
                    house.HouseRoot.SetActive(false);
                }

                if (house != null && house.SelectButton != null)
                {
                    int houseIndex = i;
                    house.SelectButton.onClick.AddListener(() => SelectNextHouse(houseIndex));
                }
            }
        }

        private void Start()
        {
            PlayHandPressEffect();
            BeginCurrentHouseBuild();
        }

        private void Update()
        {
            if (Input.GetMouseButtonDown(0) && !_isComplete && HasCurrentBlock())
            {
                if (AudioManager.Instance != null && _soundBuild != null)
                {
                    AudioManager.Instance.PlaySound(_soundBuild);
                }

                StopHandPressEffect();
                _blocks[_countBlocks].SetSolidAndPlayBoxEffect();
                _countBlocks++;
                ConsumeStepValue();
                UpdateProgressUI();
                if (_countBlocks >= (_blocks != null ? _blocks.Count : 0))
                {
                    _isComplete = true;

                    if (_hasSelectedNextHouse)
                    {
                        EndGame();
                    }
                    else
                    {
                        StartHouseOrbit();
                    }
                }
                else
                {
                    LookAtCurrentBlock();
                    if (_blocks[_countBlocks] != null)
                    {
                        _blocks[_countBlocks].Select();
                    }
                }
            }
        }

        private void LookAtCurrentBlock(bool instant = false)
        {
            if (_targetCamera == null || _blocks == null || _blocks.Count == 0 || _isHouseOrbiting)
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

        private void StartHouseOrbit()
        {
            ShowCompletePanelDuringOrbit();

            if (_targetCamera == null)
            {
                ShowPostBuildPanels();
                return;
            }

            if (_vfx != null)
            {
                _vfx.SetActive(true);
            }

            _isHouseOrbiting = true;
            _cameraLookTween?.Kill();
            _houseOrbitTween?.Kill();

            if (!_hasSavedCameraPose)
            {
                _cameraStartPosition = _targetCamera.transform.position;
                _cameraStartRotation = _targetCamera.transform.rotation;
                _hasSavedCameraPose = true;
            }

            Transform orbitTarget = _houseTarget;
            if (orbitTarget == null && _blocks != null && _blocks.Count > 0 && _blocks[0] != null)
            {
                orbitTarget = _blocks[0].transform;
            }

            if (orbitTarget == null)
            {
                RestoreCameraPose();
                _isHouseOrbiting = false;
                ShowPostBuildPanels();
                return;
            }

            Vector3 housePosition = orbitTarget.position + Vector3.up * _houseLookHeight;
            Vector3 orbitStartOffset = _houseOrbitCameraOffset;
            Vector3 flatOffset = new Vector3(orbitStartOffset.x, 0f, orbitStartOffset.z);

            if (flatOffset.sqrMagnitude < 0.01f)
            {
                flatOffset = new Vector3(0f, 0f, -5f);
            }

            orbitStartOffset = new Vector3(flatOffset.x, orbitStartOffset.y, flatOffset.z);
            _targetCamera.transform.position = housePosition + orbitStartOffset;
            _targetCamera.transform.LookAt(housePosition);

            int orbitTurns = Mathf.Max(1, _houseOrbitTurns);
            float angle = 0f;
            _houseOrbitTween = DOTween.To(() => angle, value =>
                {
                    angle = value;
                    Quaternion rotation = Quaternion.Euler(0f, angle, 0f);
                    Vector3 orbitOffset = rotation * orbitStartOffset;
                    orbitOffset.y = orbitStartOffset.y;
                    _targetCamera.transform.position = housePosition + orbitOffset;
                    _targetCamera.transform.LookAt(housePosition);
                }, 360f * orbitTurns, _houseOrbitDuration)
                .SetEase(Ease.Linear)
                .OnComplete(() =>
                {
                    RestoreCameraPose();
                    _isHouseOrbiting = false;
                    _houseOrbitTween = null;
                    ShowPostBuildPanels();
                })
                .OnKill(() => _houseOrbitTween = null);
        }

        private void RestoreCameraPose()
        {
            if (_targetCamera == null)
            {
                return;
            }

            if (_vfx != null)
            {
                _vfx.SetActive(false);
            }

            _targetCamera.transform.SetPositionAndRotation(_cameraStartPosition, _cameraStartRotation);
        }

        private void ShowCompletePanelDuringOrbit()
        {
            _panelSequence?.Kill();

            if (_completePanel == null)
            {
                return;
            }

            _completePanel.gameObject.SetActive(true);
            _completePanel.localScale = Vector3.zero;
            _panelSequence = DOTween.Sequence()
                .Append(_completePanel.DOScale(_completePanelScale, _panelScaleDuration)
                    .SetEase(_panelScaleEase))
                .OnComplete(() => _panelSequence = null)
                .OnKill(() => _panelSequence = null);
        }

        private void ShowPostBuildPanels()
        {
            _panelSequence?.Kill();
            _panelSequence = DOTween.Sequence();

            if (_completePanel != null && _completePanel.gameObject.activeSelf)
            {
                _panelSequence
                    .Append(_completePanel.DOScale(Vector3.zero, _panelScaleDuration)
                        .SetEase(Ease.InBack))
                    .AppendCallback(() => _completePanel.gameObject.SetActive(false));
            }

            if (HasAvailableNextHouse() && _houseSelectionPanel != null)
            {
                _panelSequence
                    .AppendCallback(() =>
                    {
                        _houseSelectionPanel.gameObject.SetActive(true);
                        _houseSelectionPanel.localScale = Vector3.zero;
                    })
                    .Append(_houseSelectionPanel.DOScale(_houseSelectionPanelScale, _panelScaleDuration)
                        .SetEase(_panelScaleEase));
            }
            else
            {
                _panelSequence.AppendCallback(EndGame);
            }

            _panelSequence
                .OnComplete(() => _panelSequence = null)
                .OnKill(() => _panelSequence = null);
        }

        /// <summary>
        /// Assign this to a Build Now button when Select Button is not configured.
        /// houseIndex starts at 0.
        /// </summary>
        public void SelectNextHouse(int houseIndex)
        {
            if (!_isComplete || _hasSelectedNextHouse ||
                houseIndex < 0 || houseIndex >= _nextHouses.Count)
            {
                return;
            }

            HouseBuildData nextHouse = _nextHouses[houseIndex];
            if (nextHouse == null)
            {
                return;
            }

            List<Block> nextBlocks = nextHouse.GetBlocks();
            nextBlocks.RemoveAll(block => block == null);
            if (nextBlocks.Count == 0)
            {
                Debug.LogWarning($"House {houseIndex} has no Block to build.", this);
                return;
            }

            _hasSelectedNextHouse = true;
            for (int i = 0; i < _nextHouses.Count; i++)
            {
                HouseBuildData house = _nextHouses[i];
                if (house != null && house.SelectButton != null)
                {
                    house.SelectButton.interactable = false;
                }
            }

            _panelSequence?.Kill();
            HidePanelImmediately(_completePanel, _completePanelScale);
            HidePanelImmediately(_houseSelectionPanel, _houseSelectionPanelScale);

            if (_initialHouseRoot != null)
            {
                _initialHouseRoot.SetActive(false);
            }

            if (nextHouse.HouseRoot != null)
            {
                nextHouse.HouseRoot.SetActive(true);
            }

            _blocks = nextBlocks;
            _houseTarget = nextHouse.OrbitTarget != null
                ? nextHouse.OrbitTarget
                : nextHouse.HouseRoot != null
                    ? nextHouse.HouseRoot.transform
                    : nextBlocks[0].transform;
            _countBlocks = 0;
            _isComplete = false;
            _isHouseOrbiting = false;

            ApplyStepUI(nextHouse.StepCounts, nextHouse.StepIcons);
            UpdateProgressUI(true);
            LookAtCurrentBlock();

            if (HasCurrentBlock())
            {
                _blocks[_countBlocks].Select();
            }
        }

        private void BeginCurrentHouseBuild()
        {
            UpdateProgressUI(true);
            LookAtCurrentBlock();

            if (HasCurrentBlock())
            {
                _blocks[_countBlocks].Select();
            }
        }

        private bool HasCurrentBlock()
        {
            return _blocks != null && _countBlocks >= 0 && _countBlocks < _blocks.Count &&
                   _blocks[_countBlocks] != null;
        }

        private bool HasAvailableNextHouse()
        {
            if (_hasSelectedNextHouse)
            {
                return false;
            }

            for (int i = 0; i < _nextHouses.Count; i++)
            {
                HouseBuildData house = _nextHouses[i];
                if (house != null && house.GetBlocks().Count > 0)
                {
                    return true;
                }
            }

            return false;
        }

        private static void PreparePanel(Transform panel, ref Vector3 visibleScale)
        {
            if (panel == null)
            {
                return;
            }

            visibleScale = panel.localScale;
            panel.gameObject.SetActive(false);
        }

        private static void HidePanelImmediately(Transform panel, Vector3 visibleScale)
        {
            if (panel == null)
            {
                return;
            }

            panel.gameObject.SetActive(false);
            panel.localScale = visibleScale;
        }

        private static void EndGame()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.EndGame();
            }
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

        private void InitializeStepTexts(bool captureInitialValues = false)
        {
            _stepValues.Clear();
            _currentStepTextIndex = 0;

            if (captureInitialValues)
            {
                _initialStepValues.Clear();
            }

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
                if (captureInitialValues)
                {
                    _initialStepValues.Add(stepValue);
                }
            }

            UpdateStepSelectionVisual();
        }

        private void CaptureInitialStepIcons()
        {
            _initialStepIcons.Clear();

            for (int i = 0; i < _stepIconImages.Count; i++)
            {
                Image iconImage = _stepIconImages[i];
                _initialStepIcons.Add(iconImage != null ? iconImage.sprite : null);
            }
        }

        private void ApplyStepUI(List<int> stepCounts, List<Sprite> stepIcons)
        {
            List<int> activeStepCounts = stepCounts != null && stepCounts.Count > 0
                ? stepCounts
                : _initialStepValues;
            List<Sprite> activeStepIcons = stepIcons != null && stepIcons.Count > 0
                ? stepIcons
                : _initialStepIcons;

            _stepValues.Clear();
            _currentStepTextIndex = 0;

            for (int i = 0; i < _stepTexts.Count; i++)
            {
                bool hasStep = i < activeStepCounts.Count &&
                               activeStepCounts[i] > 0;
                int value = hasStep
                    ? Mathf.Max(0, activeStepCounts[i])
                    : 0;
                _stepValues.Add(value);

                if (_stepTexts[i] != null)
                {
                    _stepTexts[i].gameObject.SetActive(hasStep);

                    if (hasStep)
                    {
                        _stepTexts[i].text = value.ToString();
                    }
                }
            }

            for (int i = 0; i < _stepIconImages.Count; i++)
            {
                Image iconImage = _stepIconImages[i];
                if (iconImage == null)
                {
                    continue;
                }

                bool hasStep = i < activeStepCounts.Count &&
                               activeStepCounts[i] > 0 &&
                               i < _stepTexts.Count &&
                               _stepTexts[i] != null;
                iconImage.gameObject.SetActive(hasStep);

                if (!hasStep)
                {
                    continue;
                }

                Sprite icon = i < activeStepIcons.Count ? activeStepIcons[i] : null;
                if (icon != null)
                {
                    iconImage.sprite = icon;
                }
            }

            while (_currentStepTextIndex < _stepValues.Count &&
                   _stepValues[_currentStepTextIndex] <= 0)
            {
                _currentStepTextIndex++;
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
            if (_installButton != null)
            {
                _installButton.onClick.RemoveListener(EndGame);
            }

            _cameraLookTween?.Kill();
            _houseOrbitTween?.Kill();
            _handPressTween?.Kill();
            _barTween?.Kill();
            _panelSequence?.Kill();
        }
    }
}
