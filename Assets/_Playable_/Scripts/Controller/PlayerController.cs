using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody))]
    [RequireComponent(typeof(CapsuleCollider))]
    public class PlayerController : MonoBehaviour
    {
        [SerializeField] private bool _isWorking = true;

        [Header("References")] [SerializeField]
        private Rigidbody _rigidbody;

        [SerializeField] private CapsuleCollider _capsuleCollider;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;

        [Header("Animation")] [SerializeField] private string _isJumpParam = "isJump";
        [SerializeField] private string _speedParam = "speed";

        [Header("Input")] [SerializeField] private Button _btnJump;

        [Header("Movement")] [SerializeField] private float _moveRate = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField, Min(1f)] private float _fallGravityMultiplier = 2f;
        [SerializeField] private float _maxFallRate = 25f;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckDistance = 0.1f;


        private Vector2 _moveInput;
        private Vector3 _verticalVelocity;
        private bool _isGrounded;
        private int _isJumpParamHash;
        private int _speedParamHash;
        private bool _hasAnimator;
        private float _scaledGroundRadius;
        private float _scaledCapsuleHeight;
        private bool _appliedJump;
        private bool _jumpRequested;
        private bool _followCameraYaw;
        private float _cameraYaw;

        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }

        public bool IsWorking
        {
            get => _isWorking;
            set
            {
                _isWorking = value;
                if (_isWorking) return;

                _moveInput = Vector2.zero;
                _jumpRequested = false;

                // Giữ lại vận tốc trục y để nhân vật không treo lơ lửng nếu đang ở trên không.
                Vector3 stopped = _rigidbody.linearVelocity;
                stopped.x = 0f;
                stopped.z = 0f;
                _rigidbody.linearVelocity = stopped;
                Velocity = stopped;

                // Update() sẽ không chạy nữa, phải ép animator về idle ngay tại đây.
                UpdateAnimator();
            }
        }


        private void Awake()
        {
            if (_rigidbody == null) _rigidbody = GetComponent<Rigidbody>();
            if (_capsuleCollider == null) _capsuleCollider = GetComponent<CapsuleCollider>();

            _rigidbody.useGravity = false;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotation;

            if (_animator == null) _animator = GetComponentInChildren<Animator>();
            _hasAnimator = _animator != null;
            if (_hasAnimator)
            {
                _isJumpParamHash = Animator.StringToHash(_isJumpParam);
                _speedParamHash = Animator.StringToHash(_speedParam);
            }

            Vector3 scale = transform.lossyScale;
            _scaledGroundRadius = _capsuleCollider.radius * Mathf.Max(scale.x, scale.z);
            _scaledCapsuleHeight = _capsuleCollider.height * scale.y;
        }

        private void Start()
        {
            if (_btnJump != null) _btnJump.onClick.AddListener(OnJumpButtonPressed);
        }

        private void Update()
        {
            if (!_isWorking) return;

#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.Space)) OnJumpButtonPressed();
#endif

            _moveInput = _moveJoystick != null
                ? new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis)
                : Vector2.zero;

            if (_moveInput.sqrMagnitude < _inputDeadZone * _inputDeadZone)
            {
                _moveInput = Vector2.zero;
            }

#if UNITY_EDITOR
            Vector2 keyboardInput = new Vector2(
                Input.GetAxisRaw("Horizontal"),
                Input.GetAxisRaw("Vertical"));
            if (keyboardInput.sqrMagnitude > 0.0001f) _moveInput = keyboardInput;
#endif

            UpdateAnimator();
        }

        private void FixedUpdate()
        {
            CheckGround();
            ApplyGravity();

            if (!_isWorking)
            {
                ApplyLockedVelocity();
                return;
            }

            HandleJump();
            Move(_moveInput);
        }

        public void OnJumpButtonPressed()
        {
            if (_isWorking) _jumpRequested = true;
        }

        public void SetMoveJoystick(UltimateJoystick joystick)
        {
            _moveJoystick = joystick;
        }

        public void SetCameraController(CameraController cameraController)
        {
            _cameraController = cameraController;
        }

        public void SetCameraYaw(float yaw)
        {
            _followCameraYaw = true;
            _cameraYaw = yaw;
        }

        public void StopFollowingCameraYaw()
        {
            _followCameraYaw = false;
        }

        private void CheckGround()
        {
            bool grounded = ProbeGround();
            if (grounded)
            {
                if (_verticalVelocity.y < 0f) _verticalVelocity.y = 0f;
            }

            _isGrounded = grounded;
        }

        private bool ProbeGround()
        {
            if (_verticalVelocity.y > 0f) return false;

            Vector3 center = transform.TransformPoint(_capsuleCollider.center);
            float bottom = _scaledCapsuleHeight * 0.5f - _scaledGroundRadius;
            Vector3 origin = center + Vector3.down * bottom + Vector3.up * 0.02f;
            float radius = _scaledGroundRadius * 0.85f;
            float fallDistance = Mathf.Max(0f, -_verticalVelocity.y) * Time.fixedDeltaTime;

            return Physics.SphereCast(
                origin,
                radius,
                Vector3.down,
                out _,
                _groundCheckDistance + 0.05f + fallDistance,
                _groundMask,
                QueryTriggerInteraction.Ignore);
        }

        private void HandleJump()
        {
            if (!_jumpRequested) return;

            _jumpRequested = false;
            if (!_isGrounded) return;

            _verticalVelocity.y = Mathf.Sqrt(_jumpHeight * -2f * _gravity);
            _isGrounded = false;
        }

        private void Move(Vector2 input)
        {
            bool hasInput = input.sqrMagnitude > 0.0001f;

            if (_followCameraYaw)
            {
                RotateTowards(Quaternion.Euler(0f, _cameraYaw, 0f));
            }

            if (!hasInput && _isGrounded)
            {
                Vector3 velocity = _rigidbody.linearVelocity;
                bool alreadyAtRest = velocity.x == 0f && velocity.y == 0f && velocity.z == 0f;
                if (alreadyAtRest)
                {
                    Velocity = velocity;
                    return;
                }

                velocity = Vector3.zero;
                _rigidbody.linearVelocity = velocity;
                Velocity = velocity;
                return;
            }

            Vector3 moveDirection = ComputeMoveDirection(input);
            if (!_followCameraYaw && hasInput)
            {
                RotateTowards(Quaternion.LookRotation(moveDirection, Vector3.up));
            }

            float control = _isGrounded ? 1f : _airControlMultiplier;
            Vector3 horizontalMotion = moveDirection * (_moveRate * control);
            Vector3 velocityToApply = _rigidbody.linearVelocity;
            velocityToApply.x = horizontalMotion.x;
            velocityToApply.z = horizontalMotion.z;
            velocityToApply.y = _isGrounded ? 0f : _verticalVelocity.y;

            _rigidbody.linearVelocity = velocityToApply;
            Velocity = velocityToApply;
        }

        private Vector3 ComputeMoveDirection(Vector2 input)
        {
            if (input.sqrMagnitude <= 0.0001f) return Vector3.zero;

            Transform yawPivot = _cameraController != null ? _cameraController.YawPivot : null;
            Vector3 forward = yawPivot != null ? yawPivot.forward : transform.forward;
            Vector3 right = yawPivot != null ? yawPivot.right : transform.right;
            forward.y = 0f;
            right.y = 0f;
            forward.Normalize();
            right.Normalize();

            Vector3 moveDirection = forward * input.y + right * input.x;
            if (moveDirection.sqrMagnitude > 1f) moveDirection.Normalize();
            return moveDirection;
        }

        private void RotateTowards(Quaternion targetRotation)
        {
            Quaternion smoothedRotation = Quaternion.Slerp(
                _rigidbody.rotation,
                targetRotation,
                Time.fixedDeltaTime * _rotationSmooth);
            _rigidbody.MoveRotation(smoothedRotation);
        }

        private void ApplyGravity()
        {
            if (_isGrounded)
            {
                _verticalVelocity.y = 0f;
                return;
            }

            float gravityMultiplier = _verticalVelocity.y < 0f ? _fallGravityMultiplier : 1f;
            _verticalVelocity.y += _gravity * gravityMultiplier * Time.fixedDeltaTime;
            _verticalVelocity.y = Mathf.Max(_verticalVelocity.y, -_maxFallRate);
        }

        private void ApplyLockedVelocity()
        {
            Vector3 velocity = _rigidbody.linearVelocity;
            velocity.x = 0f;
            velocity.z = 0f;
            velocity.y = _isGrounded ? 0f : _verticalVelocity.y;

            _rigidbody.linearVelocity = velocity;
            Velocity = velocity;
        }

        private void UpdateAnimator()
        {
            if (!_hasAnimator) return;

            Vector3 horizontalVelocity = Velocity;
            horizontalVelocity.y = 0f;
            _animator.SetFloat(_speedParamHash, horizontalVelocity.magnitude);

            bool isJumping = !_isGrounded;
            if (_appliedJump == isJumping) return;

            _appliedJump = isJumping;
            _animator.SetBool(_isJumpParamHash, isJumping);
        }
    }
}
