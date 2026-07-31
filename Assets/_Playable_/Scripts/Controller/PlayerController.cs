using UnityEngine;

namespace Playable
{
    [RequireComponent(typeof(CharacterController))]
    public class PlayerController : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private CharacterController _characterController;

        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;

        [Header("Animation")] [SerializeField] private string _speedParam = "Speed";
        [SerializeField] private string _isJumpParam = "isJump";

        [Header("Movement")] [SerializeField] private float _moveSpeed = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField] private float _groundedStickForce = -2f;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckDistance = 0.2f;

        private Vector3 _verticalVelocity;
        private bool _isGrounded;
        private bool _jumpRequested;
        private int _speedParamHash;
        private int _isJumpParamHash;
        private bool _hasAnimator;

        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }

        private void Awake()
        {
            if (_characterController == null)
            {
                _characterController = GetComponent<CharacterController>();
            }

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;

            if (_hasAnimator)
            {
                _speedParamHash = Animator.StringToHash(_speedParam);
                _isJumpParamHash = Animator.StringToHash(_isJumpParam);
            }
        }

        private void Update()
        {
#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.Space))
            {
                _jumpRequested = true;
            }
#endif

            CheckGround();
            HandleJump();

            Vector2 moveInput = _moveJoystick != null
                ? new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis)
                : Vector2.zero;

#if UNITY_EDITOR
            moveInput = ApplyEditorKeyboardInput(moveInput);
#endif

            Move(moveInput);
            ApplyGravity();
            UpdateAnimator();
        }

#if UNITY_EDITOR
        private Vector2 ApplyEditorKeyboardInput(Vector2 moveInput)
        {
            Vector2 keyboardInput = new Vector2(
                Input.GetAxisRaw("Horizontal"),
                Input.GetAxisRaw("Vertical"));

            if (keyboardInput.sqrMagnitude > 0.0001f)
            {
                moveInput = keyboardInput;
            }

            return moveInput;
        }
#endif

        public void OnJumpButtonPressed()
        {
            _jumpRequested = true;
        }

        public void SetMoveJoystick(UltimateJoystick joystick)
        {
            _moveJoystick = joystick;
        }

        public void SetCameraController(CameraController cameraController)
        {
            _cameraController = cameraController;
        }

        private void CheckGround()
        {
            _isGrounded = _characterController.isGrounded;

            if (!_isGrounded)
            {
                Vector3 origin = transform.position + Vector3.up * 0.1f;
                _isGrounded = Physics.SphereCast(
                    origin,
                    _characterController.radius * 0.9f,
                    Vector3.down,
                    out _,
                    _groundCheckDistance + 0.1f,
                    _groundMask,
                    QueryTriggerInteraction.Ignore);
            }

            if (_isGrounded && _verticalVelocity.y < 0f)
            {
                _verticalVelocity.y = _groundedStickForce;
            }
        }

        private void HandleJump()
        {
            if (!_jumpRequested)
            {
                return;
            }

            _jumpRequested = false;

            if (_isGrounded)
            {
                _verticalVelocity.y = Mathf.Sqrt(_jumpHeight * -2f * _gravity);
            }
        }

        private void Move(Vector2 input)
        {
            Vector3 moveDirection = Vector3.zero;

            if (input.sqrMagnitude > 0.0001f)
            {
                Transform yawPivot = _cameraController != null ? _cameraController.YawPivot : null;

                Vector3 forward = yawPivot != null ? yawPivot.forward : transform.forward;
                Vector3 right = yawPivot != null ? yawPivot.right : transform.right;
                forward.y = 0f;
                right.y = 0f;
                forward.Normalize();
                right.Normalize();

                moveDirection = (forward * input.y) + (right * input.x);

                if (moveDirection.sqrMagnitude > 1f)
                {
                    moveDirection.Normalize();
                }

                RotateTowards(moveDirection);
            }

            float control = _isGrounded ? 1f : _airControlMultiplier;
            Vector3 horizontalMotion = moveDirection * (_moveSpeed * control);
            Vector3 motion = horizontalMotion + _verticalVelocity;

            _characterController.Move(motion * Time.deltaTime);
            Velocity = motion;
        }

        private void RotateTowards(Vector3 moveDirection)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection, Vector3.up);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                targetRotation,
                Time.deltaTime * _rotationSmooth);
        }

        private void ApplyGravity()
        {
            _verticalVelocity.y += _gravity * Time.deltaTime;
        }

        private void UpdateAnimator()
        {
            if (!_hasAnimator)
            {
                return;
            }

            Vector3 horizontalVelocity = new Vector3(Velocity.x, 0f, Velocity.z);
            float speed = horizontalVelocity.magnitude;

            _animator.SetFloat(_speedParamHash, speed);
            // _animator.SetBool(_isJumpParamHash, !_isGrounded);
        }
    }
}