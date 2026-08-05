using UnityEngine;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody))]
    [RequireComponent(typeof(CapsuleCollider))]
    public class PlayerController : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Rigidbody _rigidbody;

        [SerializeField] private CapsuleCollider _capsuleCollider;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;

        [Header("Animation")] [SerializeField] private string _speedParam = "Speed";
        [SerializeField] private string _isJumpParam = "isJump";

        [Header("Movement")] [SerializeField] private float _moveSpeed = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckRadius = 0.3f;

        private Vector2 _moveInput;
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
            if (_rigidbody == null)
            {
                _rigidbody = GetComponent<Rigidbody>();
            }

            if (_capsuleCollider == null)
            {
                _capsuleCollider = GetComponent<CapsuleCollider>();
            }

            _rigidbody.useGravity = true;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotation;

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;

            if (_hasAnimator)
            {
                _speedParamHash = Animator.StringToHash(_speedParam);
                // _isJumpParamHash = Animator.StringToHash(_isJumpParam);
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

            _moveInput = _moveJoystick != null
                ? new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis)
                : Vector2.zero;

            if (_moveInput.sqrMagnitude < _inputDeadZone * _inputDeadZone)
            {
                _moveInput = Vector2.zero;
            }

#if UNITY_EDITOR
            _moveInput = ApplyEditorKeyboardInput(_moveInput);
#endif

            UpdateAnimator();
        }

        private void FixedUpdate()
        {
            CheckGround();
            HandleJump();
            ApplyGravity();
            Move(_moveInput);
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
            Transform playerTransform = transform;
            Vector3 worldCenter = playerTransform.TransformPoint(_capsuleCollider.center);
            float worldHeight = _capsuleCollider.height * Mathf.Abs(playerTransform.lossyScale.y);
            Vector3 capsuleBottom = worldCenter - playerTransform.up * (worldHeight * 0.5f);
            Vector3 checkPosition = capsuleBottom + playerTransform.up * _groundCheckRadius;

            _isGrounded = Physics.CheckSphere(
                checkPosition,
                _groundCheckRadius,
                _groundMask,
                QueryTriggerInteraction.Ignore);

            if (_isGrounded && _verticalVelocity.y < 0f)
            {
                _verticalVelocity.y = 0f;
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
                _isGrounded = false;
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

            _rigidbody.linearVelocity = motion;
            Velocity = motion;
        }

        private void RotateTowards(Vector3 moveDirection)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection, Vector3.up);
            Quaternion smoothedRotation = Quaternion.Slerp(
                _rigidbody.rotation,
                targetRotation,
                Time.fixedDeltaTime * _rotationSmooth);

            _rigidbody.MoveRotation(smoothedRotation);
        }

        private void ApplyGravity()
        {
            if (!_isGrounded)
            {
                _verticalVelocity.y += _gravity * Time.fixedDeltaTime;
            }
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
        }
    }
}