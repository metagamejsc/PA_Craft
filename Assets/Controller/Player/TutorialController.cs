using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Controller.Player
{
    public class TutorialController : MonoBehaviour
    {
        private enum TutorialStep
        {
            Move = 0,
            Look = 1,
            Use = 2,
            Completed = 3
        }

        [Header("References")]
        [SerializeField] private UltimateJoystick _joystick;
        [SerializeField] private TouchController _touchController;
        [SerializeField] private PlayerInput _playerInput;
        [SerializeField] private Image _joystickHand;
        [SerializeField] private Image _touchHand;
        [SerializeField] private Image _useHand;
        [SerializeField] private GameObject _stepTextObject;
        [SerializeField] private TMP_Text _stepText;

        [Header("Step Texts")]
        [SerializeField] private string _moveStepText = "Drag to move";
        [SerializeField] private string _lookStepText = "Touch to see";
        [SerializeField] private string _useStepText = "Press the button to plant flower";

        [Header("Joystick Hand")]
        [SerializeField] private Vector2 _joystickSwipeOffset = new Vector2(90f, 0f);
        [SerializeField] private float _joystickSwipeDuration = 0.8f;
        [SerializeField] private float _joystickLoopDelay = 0.2f;

        [Header("Touch Hand")]
        [SerializeField] private Vector2 _touchSwipeOffset = new Vector2(0f, -120f);
        [SerializeField] private float _touchSwipeDuration = 0.8f;
        [SerializeField] private float _touchLoopDelay = 0.2f;

        [Header("Use Hand")]
        [SerializeField] private Vector2 _useSwipeOffset = new Vector2(0f, -80f);
        [SerializeField] private float _useSwipeDuration = 0.8f;
        [SerializeField] private float _useLoopDelay = 0.2f;

        private RectTransform _joystickHandRect;
        private RectTransform _touchHandRect;
        private RectTransform _useHandRect;
        private Vector2 _joystickHandStartPosition;
        private Vector2 _touchHandStartPosition;
        private Vector2 _useHandStartPosition;
        private Sequence _joystickSequence;
        private Sequence _touchSequence;
        private Sequence _useSequence;
        private TutorialStep _currentStep;

        private void Awake()
        {
            _joystickHandRect = _joystickHand != null ? _joystickHand.rectTransform : null;
            _touchHandRect = _touchHand != null ? _touchHand.rectTransform : null;
            _useHandRect = _useHand != null ? _useHand.rectTransform : null;

            if (_joystickHandRect != null)
            {
                _joystickHandStartPosition = _joystickHandRect.anchoredPosition;
            }

            if (_touchHandRect != null)
            {
                _touchHandStartPosition = _touchHandRect.anchoredPosition;
            }

            if (_useHandRect != null)
            {
                _useHandStartPosition = _useHandRect.anchoredPosition;
            }
        }

        private void OnEnable()
        {
            if (_joystick != null)
            {
                _joystick.OnPointerDownCallback += HandleJoystickStepCompleted;
            }

            if (_touchController != null)
            {
                _touchController.Interacted += HandleTouchStepCompleted;
            }

            if (_playerInput != null)
            {
                _playerInput.UseItemPressed += HandleUseStepCompleted;
            }

            InitializeTutorial();
        }

        private void OnDisable()
        {
            if (_joystick != null)
            {
                _joystick.OnPointerDownCallback -= HandleJoystickStepCompleted;
            }

            if (_touchController != null)
            {
                _touchController.Interacted -= HandleTouchStepCompleted;
            }

            if (_playerInput != null)
            {
                _playerInput.UseItemPressed -= HandleUseStepCompleted;
            }

            KillSequences();
        }

        private void InitializeTutorial()
        {
            _currentStep = TutorialStep.Move;

            if (_touchController != null)
            {
                _touchController.SetInteractable(false);
            }

            if (_playerInput != null)
            {
                _playerInput.SetUseButtonInteractable(false);
            }

            SetHandVisible(_joystickHand, true);
            SetHandVisible(_touchHand, false);
            SetHandVisible(_useHand, false);

            PlayJoystickLoop();
            UpdateStepText(_moveStepText, true);
        }

        private void HandleJoystickStepCompleted()
        {
            if (_currentStep != TutorialStep.Move)
            {
                return;
            }

            _currentStep = TutorialStep.Look;
            _joystickSequence?.Kill();
            SetHandVisible(_joystickHand, false);

            if (_touchController != null)
            {
                _touchController.SetInteractable(true);
            }

            SetHandVisible(_touchHand, true);
            PlayTouchLoop();
            UpdateStepText(_lookStepText, true);
        }

        private void HandleTouchStepCompleted()
        {
            if (_currentStep != TutorialStep.Look)
            {
                return;
            }

            _currentStep = TutorialStep.Use;
            _touchSequence?.Kill();
            SetHandVisible(_touchHand, false);

            if (_touchController != null)
            {
                _touchController.SetInteractable(true);
            }

            if (_playerInput != null)
            {
                _playerInput.SetUseButtonInteractable(true);
            }

            SetHandVisible(_useHand, true);
            PlayUseLoop();
            UpdateStepText(_useStepText, true);
        }

        private void HandleUseStepCompleted()
        {
            if (_currentStep != TutorialStep.Use)
            {
                return;
            }

            _currentStep = TutorialStep.Completed;
            _useSequence?.Kill();
            SetHandVisible(_useHand, false);
            UpdateStepText(string.Empty, false);
        }

        private void PlayJoystickLoop()
        {
            if (_joystickHandRect == null)
            {
                return;
            }

            _joystickSequence?.Kill();
            _joystickHandRect.anchoredPosition = _joystickHandStartPosition;

            _joystickSequence = DOTween.Sequence();
            _joystickSequence.Append(_joystickHandRect.DOAnchorPos(_joystickHandStartPosition + _joystickSwipeOffset, _joystickSwipeDuration).SetEase(Ease.Linear));
            _joystickSequence.AppendInterval(_joystickLoopDelay);
            _joystickSequence.SetLoops(-1, LoopType.Yoyo);
            _joystickSequence.SetLink(gameObject);
        }

        private void PlayTouchLoop()
        {
            if (_touchHandRect == null)
            {
                return;
            }

            _touchSequence?.Kill();
            _touchHandRect.anchoredPosition = _touchHandStartPosition;

            _touchSequence = DOTween.Sequence();
            _touchSequence.Append(_touchHandRect.DOAnchorPos(_touchHandStartPosition + _touchSwipeOffset, _touchSwipeDuration).SetEase(Ease.Linear));
            _touchSequence.AppendInterval(_touchLoopDelay);
            _touchSequence.SetLoops(-1, LoopType.Yoyo);
            _touchSequence.SetLink(gameObject);
        }

        private void PlayUseLoop()
        {
            if (_useHandRect == null)
            {
                return;
            }

            _useSequence?.Kill();
            _useHandRect.anchoredPosition = _useHandStartPosition;

            _useSequence = DOTween.Sequence();
            _useSequence.Append(_useHandRect.DOAnchorPos(_useHandStartPosition + _useSwipeOffset, _useSwipeDuration).SetEase(Ease.Linear));
            _useSequence.AppendInterval(_useLoopDelay);
            _useSequence.SetLoops(-1, LoopType.Yoyo);
            _useSequence.SetLink(gameObject);
        }

        private void UpdateStepText(string content, bool isVisible)
        {
            if (_stepText != null)
            {
                _stepText.text = content;
            }

            if (_stepTextObject != null)
            {
                _stepTextObject.SetActive(isVisible);
            }
            else if (_stepText != null)
            {
                _stepText.gameObject.SetActive(isVisible);
            }
        }

        private void KillSequences()
        {
            _joystickSequence?.Kill();
            _touchSequence?.Kill();
            _useSequence?.Kill();
            _joystickSequence = null;
            _touchSequence = null;
            _useSequence = null;
        }

        private static void SetHandVisible(Image hand, bool isVisible)
        {
            if (hand != null)
            {
                hand.gameObject.SetActive(isVisible);
            }
        }
    }
}
