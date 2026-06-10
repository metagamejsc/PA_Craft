using System;
using UnityEngine;
using UnityEngine.UI;

namespace Controller.Player
{
    public class PlayerInput : MonoBehaviour
    {
        [SerializeField] private UltimateJoystick _joystick;
        [SerializeField] private PlayerController _playerController;
        [SerializeField] private Button _btnJump;
        [SerializeField] private Button _btnUseItem;

        private bool _jumpRequested;

        public event Action UseItemPressed;

        public Vector2 MoveDirection
        {
            get
            {
                Vector2 moveDirection = _joystick == null
                    ? Vector2.zero
                    : new Vector2(_joystick.HorizontalAxis, _joystick.VerticalAxis);

#if UNITY_EDITOR
                Vector2 editorDirection = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
                if (editorDirection.sqrMagnitude > 1f)
                {
                    editorDirection.Normalize();
                }

                moveDirection += editorDirection;
                if (moveDirection.sqrMagnitude > 1f)
                {
                    moveDirection.Normalize();
                }
#endif

                return moveDirection;
            }
        }

        private void Start()
        {
            if (_playerController == null)
            {
                _playerController = GetComponent<PlayerController>();
            }

            if (_btnJump != null)
            {
                _btnJump.onClick.AddListener(RequestJump);
            }

            if (_btnUseItem != null)
            {
                _btnUseItem.onClick.AddListener(UseHeldItem);
            }
        }

        private void Update()
        {
#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.Space))
            {
                RequestJump();
            }
#endif
        }

        private void RequestJump()
        {
            _jumpRequested = true;
        }

        public bool ConsumeJump()
        {
            if (!_jumpRequested)
            {
                return false;
            }

            _jumpRequested = false;
            return true;
        }

        public void SetUseButtonInteractable(bool isInteractable)
        {
            if (_btnUseItem != null)
            {
                _btnUseItem.interactable = isInteractable;
            }
        }

        private void UseHeldItem()
        {
            UseItemPressed?.Invoke();

            if (_playerController != null)
            {
                _playerController.UseHeldItem();
            }
        }
    }
}
