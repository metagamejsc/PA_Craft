using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Events;
using UnityEngine.UI;

namespace Playable
{
    [DisallowMultipleComponent]
    public sealed class PlayerInput : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private CameraController _cameraController;

        [SerializeField] private UltimateJoystick _movementJoystick;
        [SerializeField] private TouchController _touchController;
        [SerializeField] private bool _autoFindSceneInput = true;
        [SerializeField, Min(0.1f)] private float _referenceSearchInterval = 0.5f;

        [Header("UI Buttons")] [SerializeField]
        private Button _jumpButton;

        [SerializeField] private Button _flyButton;
        [SerializeField] private Button _flyUpButton;
        [SerializeField] private Button _flyDownButton;
        [SerializeField] private Button _transformButton;
        [SerializeField] private Button _attackButton;
        [SerializeField] private Button _sprintButton;
        [SerializeField] private Button _cameraViewButton;
        [SerializeField] private bool _showFlyVerticalButtonsOnlyWhileFlying = true;

        [Header("Pointer Attack")] [SerializeField]
        private bool _enablePointerAttack = true;

        [SerializeField, Range(0, 2)] private int _attackMouseButton;
        [SerializeField] private bool _ignorePointerAttackOverUi = true;
        [SerializeField, Min(0f)] private float _clickedAttackDuration = 0.1f;

        [Header("Editor Input")] [SerializeField]
        private bool _enableEditorInput = true;

        [SerializeField] private KeyCode _moveForwardKey = KeyCode.W;
        [SerializeField] private KeyCode _moveBackwardKey = KeyCode.S;
        [SerializeField] private KeyCode _moveLeftKey = KeyCode.A;
        [SerializeField] private KeyCode _moveRightKey = KeyCode.D;
        [SerializeField] private KeyCode _jumpKey = KeyCode.Space;
        [SerializeField] private KeyCode _flyToggleKey = KeyCode.F;
        [SerializeField] private KeyCode _transformKey = KeyCode.T;
        [SerializeField] private KeyCode _flyUpKey = KeyCode.E;
        [SerializeField] private KeyCode _flyDownKey = KeyCode.Q;
        [SerializeField] private KeyCode _sprintKey = KeyCode.LeftShift;
        [SerializeField, Range(0, 2)] private int _lookMouseButton = 1;
        [SerializeField, Min(0f)] private float _editorMouseLookScale = 1f;

        private PlayerController _playerController;
        private PlayerController _subscribedPlayerController;
        private CameraController _boundCameraController;
        private TouchController _boundTouchController;
        private float _nextReferenceSearchTime;
        private float _clickedAttackReleaseTime = -1f;
        private bool _sprintButtonHeld;
        private bool _flyUpButtonHeld;
        private bool _flyDownButtonHeld;
        private bool _pointerAttackHeld;
        private bool _uiAttackHeld;
        private bool _buttonsBound;
        private HoldButtonBinding _flyUpBinding;
        private HoldButtonBinding _flyDownBinding;
        private HoldButtonBinding _sprintBinding;

        private sealed class HoldButtonBinding
        {
            public EventTrigger Trigger;
            public EventTrigger.Entry PointerDown;
            public EventTrigger.Entry PointerUp;
        }

#if UNITY_EDITOR
        private Vector2 _lastMousePosition;
        private bool _hasMousePosition;
#endif

        private void Reset()
        {
            _cameraController = GetComponentInChildren<CameraController>(true);
        }

        private void Awake()
        {
            PlayerController controller = GetComponent<PlayerController>();

            if (controller != null)
            {
                controller.SetPlayerInput(this);
            }
        }

        private void OnEnable()
        {
            _nextReferenceSearchTime = 0f;
            SubscribeToPlayerController();
            BindUIButtons();
            RefreshFlyButtonVisibility();
        }

        private void Start()
        {
            ResolveSceneReferences();
            BindReferences();
            RefreshButtonBindings();
            RefreshFlyButtonVisibility();
        }

        private void Update()
        {
            if (_playerController == null)
            {
                return;
            }

            SearchForLateSceneInput();
            BindReferences();

            Vector2 movement = ReadJoystickMovement();
            bool sprinting = _sprintButtonHeld;
            float flyVertical = ReadFlyButtonInput();

#if UNITY_EDITOR
            if (_enableEditorInput)
            {
                Vector2 editorMovement = ReadEditorMovement();

                if (editorMovement.sqrMagnitude > 0f)
                {
                    movement = editorMovement;
                }

                sprinting |= Input.GetKey(_sprintKey);
                flyVertical = Mathf.Clamp(
                    flyVertical +
                    (Input.GetKey(_flyUpKey) ? 1f : 0f) -
                    (Input.GetKey(_flyDownKey) ? 1f : 0f),
                    -1f,
                    1f);

                ReadEditorButtons();
                ReadEditorCamera();
            }
#endif

            ReadPointerAttack();
            ReleaseClickedAttackWhenReady();

            _playerController.SetMoveInput(movement);
            _playerController.SetSprinting(sprinting);
            _playerController.SetFlyVerticalInput(flyVertical);
        }

        private void OnDisable()
        {
            UnsubscribeFromPlayerController();
            UnbindUIButtons();

            if (_playerController != null)
            {
                _playerController.StopMoving();
                _playerController.SetSprinting(false);
                _playerController.SetFlyVerticalInput(0f);
                _playerController.StopAttack();
            }

            if (_boundCameraController != null)
            {
                _boundCameraController.SetTouchController(null);
            }

            _boundCameraController = null;
            _boundTouchController = null;
            _sprintButtonHeld = false;
            _flyUpButtonHeld = false;
            _flyDownButtonHeld = false;
            _pointerAttackHeld = false;
            _uiAttackHeld = false;
            _clickedAttackReleaseTime = -1f;
            SetFlyVerticalButtonsActive(false);

#if UNITY_EDITOR
            _hasMousePosition = false;
#endif
        }

        public void Initialize(
            PlayerController playerController,
            CameraController cameraController)
        {
            if (_playerController != playerController)
            {
                UnsubscribeFromPlayerController();
            }

            _playerController = playerController;
            _cameraController = cameraController;
            SubscribeToPlayerController();
            BindReferences();
            RefreshFlyButtonVisibility();
        }

        public void SetMovementJoystick(UltimateJoystick movementJoystick)
        {
            _movementJoystick = movementJoystick;
        }

        public void SetCameraController(CameraController cameraController)
        {
            _cameraController = cameraController;
            BindReferences();
        }

        public void SetTouchController(TouchController touchController)
        {
            _touchController = touchController;
            BindReferences();
        }

        public void RefreshButtonBindings()
        {
            UnbindUIButtons();

            if (isActiveAndEnabled)
            {
                BindUIButtons();
            }

            RefreshFlyButtonVisibility();
        }

        public void OnJumpPressed()
        {
            _playerController?.RequestJump();
        }

        public void OnFlyPressed()
        {
            _playerController?.ToggleFlying();
        }

        public void OnFlyEnabled()
        {
            _playerController?.SetFlying(true);
        }

        public void OnFlyDisabled()
        {
            _playerController?.SetFlying(false);
        }

        public void OnFlyUpPressed()
        {
            _flyUpButtonHeld = true;
        }

        public void OnFlyUpReleased()
        {
            _flyUpButtonHeld = false;
        }

        public void OnFlyDownPressed()
        {
            _flyDownButtonHeld = true;
        }

        public void OnFlyDownReleased()
        {
            _flyDownButtonHeld = false;
        }

        public void OnSprintPressed()
        {
            _sprintButtonHeld = true;
        }

        public void OnSprintReleased()
        {
            _sprintButtonHeld = false;
        }

        public void OnAttackPressed()
        {
            _uiAttackHeld = true;
            _clickedAttackReleaseTime = -1f;
            _playerController?.StartAttack();
        }

        public void OnAttackReleased()
        {
            _uiAttackHeld = false;
            StopAttackIfNoSourceIsHeld();
        }

        public void OnAttackClicked()
        {
            if (_playerController == null || !_playerController.StartAttack())
            {
                return;
            }

            _clickedAttackReleaseTime =
                Time.unscaledTime + Mathf.Max(_clickedAttackDuration, 0.01f);
        }

        public void OnTransformPressed()
        {
            _playerController?.ToggleTransformation();
        }

        public void OnCameraViewPressed()
        {
            _cameraController?.ToggleView();
        }

        public void RefreshFlyButtonVisibility()
        {
            bool shouldShow =
                !_showFlyVerticalButtonsOnlyWhileFlying ||
                (_playerController != null && _playerController.IsFlying);
            SetFlyVerticalButtonsActive(shouldShow);
        }

        private void SubscribeToPlayerController()
        {
            if (!isActiveAndEnabled ||
                _playerController == null ||
                _subscribedPlayerController == _playerController)
            {
                return;
            }

            UnsubscribeFromPlayerController();
            _subscribedPlayerController = _playerController;
            _subscribedPlayerController.FlyingChanged += HandleFlyingChanged;
        }

        private void UnsubscribeFromPlayerController()
        {
            if (_subscribedPlayerController == null)
            {
                return;
            }

            _subscribedPlayerController.FlyingChanged -= HandleFlyingChanged;
            _subscribedPlayerController = null;
        }

        private void HandleFlyingChanged(bool isFlying)
        {
            SetFlyVerticalButtonsActive(
                !_showFlyVerticalButtonsOnlyWhileFlying || isFlying);
        }

        private void SetFlyVerticalButtonsActive(bool active)
        {
            SetButtonActive(_flyUpButton, active);
            SetButtonActive(_flyDownButton, active);

            if (!active)
            {
                _flyUpButtonHeld = false;
                _flyDownButtonHeld = false;
                _playerController?.SetFlyVerticalInput(0f);
            }
        }

        private static void SetButtonActive(Button button, bool active)
        {
            if (button != null && button.gameObject.activeSelf != active)
            {
                button.gameObject.SetActive(active);
            }
        }

        private void BindUIButtons()
        {
            if (_buttonsBound)
            {
                return;
            }

            AddButtonListener(_jumpButton, OnJumpPressed);
            AddButtonListener(_flyButton, OnFlyPressed);
            AddButtonListener(_transformButton, OnTransformPressed);
            AddButtonListener(_attackButton, OnAttackClicked);
            AddButtonListener(_cameraViewButton, OnCameraViewPressed);

            _flyUpBinding = CreateHoldBinding(
                _flyUpButton,
                HandleFlyUpPointerDown,
                HandleFlyUpPointerUp);
            _flyDownBinding = CreateHoldBinding(
                _flyDownButton,
                HandleFlyDownPointerDown,
                HandleFlyDownPointerUp);
            _sprintBinding = CreateHoldBinding(
                _sprintButton,
                HandleSprintPointerDown,
                HandleSprintPointerUp);

            _buttonsBound = true;
        }

        private void UnbindUIButtons()
        {
            if (!_buttonsBound)
            {
                return;
            }

            RemoveButtonListener(_jumpButton, OnJumpPressed);
            RemoveButtonListener(_flyButton, OnFlyPressed);
            RemoveButtonListener(_transformButton, OnTransformPressed);
            RemoveButtonListener(_attackButton, OnAttackClicked);
            RemoveButtonListener(_cameraViewButton, OnCameraViewPressed);

            RemoveHoldBinding(_flyUpBinding);
            RemoveHoldBinding(_flyDownBinding);
            RemoveHoldBinding(_sprintBinding);
            _flyUpBinding = null;
            _flyDownBinding = null;
            _sprintBinding = null;
            _buttonsBound = false;
        }

        private static void AddButtonListener(
            Button button,
            UnityAction listener)
        {
            if (button != null)
            {
                button.onClick.AddListener(listener);
            }
        }

        private static void RemoveButtonListener(
            Button button,
            UnityAction listener)
        {
            if (button != null)
            {
                button.onClick.RemoveListener(listener);
            }
        }

        private static HoldButtonBinding CreateHoldBinding(
            Button button,
            UnityAction<BaseEventData> onPointerDown,
            UnityAction<BaseEventData> onPointerUp)
        {
            if (button == null)
            {
                return null;
            }

            EventTrigger trigger = button.GetComponent<EventTrigger>();

            if (trigger == null)
            {
                trigger = button.gameObject.AddComponent<EventTrigger>();
            }

            if (trigger.triggers == null)
            {
                trigger.triggers = new System.Collections.Generic.List<EventTrigger.Entry>();
            }

            EventTrigger.Entry pointerDown = new EventTrigger.Entry
            {
                eventID = EventTriggerType.PointerDown
            };
            pointerDown.callback.AddListener(onPointerDown);

            EventTrigger.Entry pointerUp = new EventTrigger.Entry
            {
                eventID = EventTriggerType.PointerUp
            };
            pointerUp.callback.AddListener(onPointerUp);

            trigger.triggers.Add(pointerDown);
            trigger.triggers.Add(pointerUp);

            return new HoldButtonBinding
            {
                Trigger = trigger,
                PointerDown = pointerDown,
                PointerUp = pointerUp
            };
        }

        private static void RemoveHoldBinding(HoldButtonBinding binding)
        {
            if (binding?.Trigger == null || binding.Trigger.triggers == null)
            {
                return;
            }

            binding.Trigger.triggers.Remove(binding.PointerDown);
            binding.Trigger.triggers.Remove(binding.PointerUp);
        }

        private void HandleFlyUpPointerDown(BaseEventData eventData)
        {
            OnFlyUpPressed();
        }

        private void HandleFlyUpPointerUp(BaseEventData eventData)
        {
            OnFlyUpReleased();
        }

        private void HandleFlyDownPointerDown(BaseEventData eventData)
        {
            OnFlyDownPressed();
        }

        private void HandleFlyDownPointerUp(BaseEventData eventData)
        {
            OnFlyDownReleased();
        }

        private void HandleSprintPointerDown(BaseEventData eventData)
        {
            OnSprintPressed();
        }

        private void HandleSprintPointerUp(BaseEventData eventData)
        {
            OnSprintReleased();
        }

        private void ResolveSceneReferences()
        {
            if (!_autoFindSceneInput)
            {
                return;
            }

            if (_movementJoystick == null)
            {
#pragma warning disable CS0618
                // Keep the legacy lookup because Luna supports this Unity API.
                _movementJoystick = FindObjectOfType<UltimateJoystick>();
#pragma warning restore CS0618
            }

            if (_touchController == null)
            {
#pragma warning disable CS0618
                // Keep the legacy lookup because Luna supports this Unity API.
                _touchController = FindObjectOfType<TouchController>();
#pragma warning restore CS0618
            }
        }

        private void SearchForLateSceneInput()
        {
            if (!_autoFindSceneInput || Time.unscaledTime < _nextReferenceSearchTime)
            {
                return;
            }

            _nextReferenceSearchTime =
                Time.unscaledTime + Mathf.Max(_referenceSearchInterval, 0.1f);

            if (_movementJoystick == null || _touchController == null)
            {
                ResolveSceneReferences();
            }

            BindReferences();
        }

        private void BindReferences()
        {
            bool touchChanged =
                _boundCameraController != _cameraController ||
                _boundTouchController != _touchController;

            if (!touchChanged)
            {
                return;
            }

            if (_boundCameraController != null &&
                _boundCameraController != _cameraController)
            {
                _boundCameraController.SetTouchController(null);
            }

            _boundCameraController = _cameraController;
            _boundTouchController = _touchController;

            if (_boundCameraController != null)
            {
                _boundCameraController.SetTouchController(_boundTouchController);
            }
        }

        private Vector2 ReadJoystickMovement()
        {
            if (_movementJoystick == null)
            {
                return Vector2.zero;
            }

            return Vector2.ClampMagnitude(
                new Vector2(
                    _movementJoystick.HorizontalAxis,
                    _movementJoystick.VerticalAxis),
                1f);
        }

        private float ReadFlyButtonInput()
        {
            return Mathf.Clamp(
                (_flyUpButtonHeld ? 1f : 0f) -
                (_flyDownButtonHeld ? 1f : 0f),
                -1f,
                1f);
        }

        private void ReadPointerAttack()
        {
            if (!_enablePointerAttack)
            {
                return;
            }

            if (Input.GetMouseButtonDown(_attackMouseButton) &&
                !ShouldIgnorePointerAttack())
            {
                _pointerAttackHeld = true;
                _clickedAttackReleaseTime = -1f;
                _playerController.StartAttack();
            }

            if (Input.GetMouseButtonUp(_attackMouseButton))
            {
                _pointerAttackHeld = false;
                StopAttackIfNoSourceIsHeld();
            }
        }

        private bool ShouldIgnorePointerAttack()
        {
            if (!_ignorePointerAttackOverUi || EventSystem.current == null)
            {
                return false;
            }

#if UNITY_EDITOR
            return false;
#else
            return EventSystem.current.IsPointerOverGameObject();
#endif
        }

        private void ReleaseClickedAttackWhenReady()
        {
            if (_clickedAttackReleaseTime < 0f ||
                Time.unscaledTime < _clickedAttackReleaseTime)
            {
                return;
            }

            _clickedAttackReleaseTime = -1f;
            StopAttackIfNoSourceIsHeld();
        }

        private void StopAttackIfNoSourceIsHeld()
        {
            if (!_pointerAttackHeld && !_uiAttackHeld &&
                _clickedAttackReleaseTime < 0f)
            {
                _playerController?.StopAttack();
            }
        }

#if UNITY_EDITOR
        private Vector2 ReadEditorMovement()
        {
            float horizontal =
                (Input.GetKey(_moveRightKey) ? 1f : 0f) -
                (Input.GetKey(_moveLeftKey) ? 1f : 0f);
            float vertical =
                (Input.GetKey(_moveForwardKey) ? 1f : 0f) -
                (Input.GetKey(_moveBackwardKey) ? 1f : 0f);

            return Vector2.ClampMagnitude(new Vector2(horizontal, vertical), 1f);
        }

        private void ReadEditorButtons()
        {
            if (Input.GetKeyDown(_jumpKey))
            {
                OnJumpPressed();
            }

            if (Input.GetKeyDown(_flyToggleKey))
            {
                OnFlyPressed();
            }

            if (Input.GetKeyDown(_transformKey))
            {
                OnTransformPressed();
            }
        }

        private void ReadEditorCamera()
        {
            if (_cameraController == null)
            {
                return;
            }

            if (Input.GetMouseButtonDown(_lookMouseButton))
            {
                _lastMousePosition = Input.mousePosition;
                _hasMousePosition = true;
                return;
            }

            if (Input.GetMouseButtonUp(_lookMouseButton))
            {
                _hasMousePosition = false;
                return;
            }

            if (!Input.GetMouseButton(_lookMouseButton) || !_hasMousePosition)
            {
                return;
            }

            Vector2 mousePosition = Input.mousePosition;
            Vector2 mouseDelta = mousePosition - _lastMousePosition;
            _lastMousePosition = mousePosition;
            _cameraController.AddLookInput(mouseDelta * _editorMouseLookScale);
        }
#endif
    }
}
