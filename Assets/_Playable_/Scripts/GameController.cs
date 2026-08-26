using System;
using DG.Tweening;
using JetBrains.Annotations;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Serializable]
        private class MapOption
        {
            public Button selectButton;
            public GameObject mapRoot;
            public GameObject playerRoot;
            public PlayerAction playerAction;
            public PlayerController cameraTarget;
            public Transform cameraFollowTarget;
            public float cameraInitialYaw;
            public float cameraInitialPitch;
            public Sprite avt;
            public bool useCustomLayout;
            public RectTransform optionRect;
            public Vector2 portraitPosition;
            public Vector2 portraitSize;
            public Vector2 landscapePosition;
            public Vector2 landscapeSize;
        }

        [Header("Map Selection")] [SerializeField]
        private GameObject _selectionPanel;

        [SerializeField] private TMP_Text _selectionText;
        [SerializeField] private string _selectionMessage = "Please choose a map.";
        [SerializeField] private MapOption _carOption;
        [SerializeField] private MapOption _gymOption;
        [SerializeField] private float _selectPulseScale = 1.08f;
        [SerializeField] private float _selectPulseDuration = 0.55f;

        [Header("Shared Controllers")] [SerializeField]
        private CameraController _cameraController;

        [SerializeField] private TouchController _touchController;

        [Header("Game UI")] [SerializeField] private GameObject _gamePanel;

        [SerializeField] private Image _avt;
        [SerializeField] private GameObject _playerControlUi;
        [SerializeField] private GameObject _infinityTut;
        [SerializeField] private GameObject _textTut;
        [SerializeField] private TMP_Text _instructionText;
        [SerializeField] private string _carInstruction = "Tap to drive the car";
        [SerializeField] private string _gymInstruction = "Tap to use the machine.";
        [SerializeField] private float _tutorialPulseScale = 1.08f;
        [SerializeField] private float _tutorialPulseDuration = 0.55f;

        [LunaPlaygroundField("Show End Card On Car Or Gym")] [SerializeField]
        private bool _endGameOnCarOrGymInteraction;


        [Header("Car Option")] [SerializeField]
        private CarController _carController;

        [SerializeField] private GameObject _carDrivingUi;
        [SerializeField] [NotNull] private GameObject _carDrivingTut1;
        [SerializeField] [NotNull] private GameObject _carDrivingTut2;

        [Header("Gym Option")] [SerializeField]
        private GymFurniture[] _gymFurniture;

        private Tween _carButtonTween;
        private Tween _gymButtonTween;
        private Tween _instructionTween;
        private Tween _carDrivingTut1Tween;
        private Tween _carDrivingTut2Tween;
        private PlayerAction _activePlayerAction;
        private MapOption _activeOption;
        private bool _mapSelected;
        private bool _waitingToDismissInfinityTut;
        private bool _waitingToDismissCarDrivingTut;
        private bool _hasDismissedCarDrivingTut;
        private int _carDrivingTutShownFrame = -1;
        private int _lastScreenWidth = -1;
        private int _lastScreenHeight = -1;
        private bool _hasEndedFromInteraction;

        private void Start()
        {
            PrepareSelection();
        }

        private void Update()
        {
            UpdateSelectionLayout();
            if (!WasScreenPressed()) return;

            if (_waitingToDismissInfinityTut)
            {
                _waitingToDismissInfinityTut = false;
                if (_infinityTut != null) _infinityTut.SetActive(false);
                if (_textTut != null) _textTut.SetActive(false);
            }

            if (_waitingToDismissCarDrivingTut && Time.frameCount > _carDrivingTutShownFrame)
            {
                _waitingToDismissCarDrivingTut = false;
                _hasDismissedCarDrivingTut = true;
                KillCarDrivingTutorialTweens();
                _carDrivingTut1.SetActive(false);
                _carDrivingTut2.SetActive(false);
            }
        }

        private void OnDestroy()
        {
            if (_carOption?.selectButton != null) _carOption.selectButton.onClick.RemoveListener(SelectCarMap);
            if (_gymOption?.selectButton != null) _gymOption.selectButton.onClick.RemoveListener(SelectGymMap);
            if (_carController != null) _carController.ExitRequested -= ExitCar;
            UnsubscribePlayer();
            KillSelectionTweens();
            KillTutorialTweens();
        }

        public void SelectCarMap()
        {
            if (_mapSelected) return;

            _avt.sprite = _carOption.avt;
            ActivateOption(_carOption, _gymOption);
            ShowInstruction(_carInstruction);
            SetCarUi(false);
            SetPlayerUi(true);

            if (_carController != null)
            {
                _carController.SetDrivingEnabled(false);
                _carController.ExitRequested -= ExitCar;
                _carController.ExitRequested += ExitCar;
            }
        }

        public void SelectGymMap()
        {
            if (_mapSelected) return;

            _avt.sprite = _gymOption.avt;
            ActivateOption(_gymOption, _carOption);
            if (_activePlayerAction != null)
            {
                GymFurniture[] gymFurniture = _gymFurniture;
                if ((gymFurniture == null || gymFurniture.Length == 0) && _gymOption?.mapRoot != null)
                {
                    gymFurniture = _gymOption.mapRoot.GetComponentsInChildren<GymFurniture>(true);
                }

                _activePlayerAction.SetGymFurniture(gymFurniture);
            }

            ShowInstruction(_gymInstruction);
            SetCarUi(false);
            SetPlayerUi(true);
        }

        private void PrepareSelection()
        {
            _mapSelected = false;
            SetOptionActive(_carOption, false);
            SetOptionActive(_gymOption, false);
            SetCarUi(false);
            SetPlayerUi(false);
            _waitingToDismissInfinityTut = false;
            if (_infinityTut != null) _infinityTut.SetActive(false);
            if (_textTut != null) _textTut.SetActive(false);
            _waitingToDismissCarDrivingTut = false;
            _hasDismissedCarDrivingTut = false;
            KillTutorialTweens();
            _carDrivingTut1.SetActive(false);
            _carDrivingTut2.SetActive(false);
            if (_gamePanel != null) _gamePanel.SetActive(false);
            if (_selectionPanel != null) _selectionPanel.SetActive(true);
            if (_selectionText != null) _selectionText.text = _selectionMessage;

            BindSelectionButton(_carOption?.selectButton, SelectCarMap);
            BindSelectionButton(_gymOption?.selectButton, SelectGymMap);
            UpdateSelectionLayout(true);
            StartSelectionTweens();
        }

        private void UpdateSelectionLayout(bool force = false)
        {
            if (!force && Screen.width == _lastScreenWidth && Screen.height == _lastScreenHeight) return;

            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;
            bool isPortrait = Screen.height >= Screen.width;
            ApplyOptionLayout(_carOption, isPortrait);
            ApplyOptionLayout(_gymOption, isPortrait);
        }

        private static void ApplyOptionLayout(MapOption option, bool isPortrait)
        {
            if (option == null || !option.useCustomLayout || option.optionRect == null) return;

            Vector2 position = isPortrait ? option.portraitPosition : option.landscapePosition;
            Vector2 size = isPortrait ? option.portraitSize : option.landscapeSize;
            option.optionRect.anchoredPosition = position;
            option.optionRect.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, size.x);
            option.optionRect.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, size.y);
        }

        private void ActivateOption(MapOption selected, MapOption other)
        {
            _mapSelected = true;
            SetOptionActive(other, false);
            SetOptionActive(selected, true);
            if (_selectionPanel != null) _selectionPanel.SetActive(false);
            if (_gamePanel != null) _gamePanel.SetActive(true);
            if (_infinityTut != null) _infinityTut.SetActive(true);
            if (_textTut != null) _textTut.SetActive(true);
            _waitingToDismissInfinityTut = true;
            KillSelectionTweens();

            UnsubscribePlayer();
            _activeOption = selected;
            _activePlayerAction = selected?.playerAction;
            if (_activePlayerAction == null && selected?.playerRoot != null)
            {
                _activePlayerAction = selected.playerRoot.GetComponentInChildren<PlayerAction>(true);
            }

            if (_activePlayerAction != null)
            {
                _activePlayerAction.SetInteractionEnabled(true);
                _activePlayerAction.CarEntered += EnterCar;
                _activePlayerAction.TreadmillUsed += OnTreadmillUsed;
            }

            if (_cameraController != null)
            {
                PlayerController cameraTarget = selected?.cameraTarget;
                if (cameraTarget == null && _activePlayerAction != null)
                {
                    cameraTarget = _activePlayerAction.PlayerController;
                }

                _cameraController.FollowPlayer(
                    cameraTarget,
                    selected?.cameraFollowTarget,
                    selected != null ? selected.cameraInitialYaw : 0f,
                    selected != null ? selected.cameraInitialPitch : 0f);
                _cameraController.SetTouchController(_touchController);
            }
        }

        private void EnterCar()
        {
            if (_carController == null) return;

            HideCarTutorial();
            SetCarUi(true);
            SetPlayerUi(false);
            ShowCarDrivingTutorial();
            _carController.SetDrivingEnabled(true);
            if (_cameraController != null)
            {
                _cameraController.FollowVehicle(_carController);
            }

            EndGameFromInteractionIfNeeded();
        }

        private void ExitCar()
        {
            if (_activePlayerAction == null) return;

            _carController.SetDrivingEnabled(false);
            _activePlayerAction.ExitCar();
            SetCarUi(false);
            SetPlayerUi(true);
            KillCarDrivingTutorialTweens();
            _carDrivingTut1.SetActive(false);
            _carDrivingTut2.SetActive(false);
            if (_cameraController != null)
            {
                _cameraController.FollowPlayer(
                    _activePlayerAction.PlayerController,
                    _activeOption?.cameraFollowTarget,
                    _activeOption != null ? _activeOption.cameraInitialYaw : 0f,
                    _activeOption != null ? _activeOption.cameraInitialPitch : 0f);
            }
        }

        private void OnTreadmillUsed()
        {
            ShowInstruction(string.Empty);
            EndGameFromInteractionIfNeeded();
        }

        private void EndGameFromInteractionIfNeeded()
        {
            if (!_endGameOnCarOrGymInteraction || _hasEndedFromInteraction || GameManager.Instance == null) return;

            _hasEndedFromInteraction = true;
            GameManager.Instance.EndGame();
        }

        private void ShowInstruction(string message)
        {
            if (_instructionText == null) return;

            _instructionTween?.Kill();
            _instructionTween = null;
            _instructionText.transform.localScale = Vector3.one;
            _instructionText.text = message;
            _instructionText.gameObject.SetActive(!string.IsNullOrEmpty(message));
            if (!string.IsNullOrEmpty(message))
            {
                _instructionTween = CreateTutorialTween(_instructionText.transform);
            }
        }

        private void HideCarTutorial()
        {
            _carController.DeActiveArrow();
            if (_instructionText != null)
            {
                _instructionTween?.Kill();
                _instructionTween = null;
                _instructionText.transform.localScale = Vector3.one;
                _instructionText.gameObject.SetActive(false);
            }
        }

        private void ShowCarDrivingTutorial()
        {
            if (_hasDismissedCarDrivingTut) return;

            KillCarDrivingTutorialTweens();

            _carDrivingTut1.SetActive(true);
            _carDrivingTut2.SetActive(true);
            _carDrivingTut1.transform.localScale = Vector3.one;
            _carDrivingTut2.transform.localScale = Vector3.one;
            _carDrivingTut1Tween = CreateTutorialTween(_carDrivingTut1.transform);
            _carDrivingTut2Tween = CreateTutorialTween(_carDrivingTut2.transform);
            _waitingToDismissCarDrivingTut = true;
            _carDrivingTutShownFrame = Time.frameCount;
        }

        private void SetCarUi(bool active)
        {
            if (_carDrivingUi != null) _carDrivingUi.SetActive(active);
        }

        private void SetPlayerUi(bool active)
        {
            if (_playerControlUi != null) _playerControlUi.SetActive(active);
        }

        private static void SetOptionActive(MapOption option, bool active)
        {
            if (option == null) return;
            if (option.mapRoot != null) option.mapRoot.SetActive(active);
            if (option.playerRoot != null) option.playerRoot.SetActive(active);
            if (option.playerAction != null) option.playerAction.SetInteractionEnabled(active);
        }

        private static void BindSelectionButton(Button button, UnityEngine.Events.UnityAction action)
        {
            if (button == null) return;
            button.onClick.RemoveListener(action);
            button.onClick.AddListener(action);
        }

        private void StartSelectionTweens()
        {
            KillSelectionTweens();
            _carButtonTween = CreateSelectionTween(_carOption?.selectButton, 0f);
            _gymButtonTween = CreateSelectionTween(_gymOption?.selectButton, _selectPulseDuration * 0.5f);
        }

        private Tween CreateSelectionTween(Button button, float delay)
        {
            if (button == null) return null;
            button.transform.localScale = Vector3.one;
            return button.transform
                .DOScale(_selectPulseScale, Mathf.Max(0.05f, _selectPulseDuration))
                .SetDelay(delay)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .SetUpdate(true);
        }

        private void KillSelectionTweens()
        {
            _carButtonTween?.Kill();
            _gymButtonTween?.Kill();
            _carButtonTween = null;
            _gymButtonTween = null;
        }

        private Tween CreateTutorialTween(Transform target)
        {
            if (target == null) return null;
            target.localScale = Vector3.one;
            return target
                .DOScale(_tutorialPulseScale, Mathf.Max(0.05f, _tutorialPulseDuration))
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .SetUpdate(true);
        }

        private void KillTutorialTweens()
        {
            _instructionTween?.Kill();
            _instructionTween = null;
            if (_instructionText != null) _instructionText.transform.localScale = Vector3.one;
            KillCarDrivingTutorialTweens();
        }

        private void KillCarDrivingTutorialTweens()
        {
            _carDrivingTut1Tween?.Kill();
            _carDrivingTut2Tween?.Kill();
            _carDrivingTut1Tween = null;
            _carDrivingTut2Tween = null;
            if (_carDrivingTut1 != null) _carDrivingTut1.transform.localScale = Vector3.one;
            if (_carDrivingTut2 != null) _carDrivingTut2.transform.localScale = Vector3.one;
        }

        private void UnsubscribePlayer()
        {
            if (_activePlayerAction == null) return;
            _activePlayerAction.CarEntered -= EnterCar;
            _activePlayerAction.TreadmillUsed -= OnTreadmillUsed;
            _activePlayerAction = null;
        }

        private static bool WasScreenPressed()
        {
#if UNITY_EDITOR || UNITY_STANDALONE
            return Input.GetMouseButtonDown(0);
#else
            return Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began;
#endif
        }
    }
}