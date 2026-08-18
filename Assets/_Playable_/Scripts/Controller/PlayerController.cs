using UnityEngine;
using UnityEngine.UI;

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

        [Header("Animation")] [SerializeField] private string _isJumpParam = "isJump";

        [Header("Input")] [SerializeField] private Button _btnJump;

        [Header("Movement")] [SerializeField] private float _moveRate = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField] private float _coyoteTime = 0.15f;
        [SerializeField] private float _jumpBufferTime = 0.15f;
        [SerializeField] private float _maxFallRate = 25f;
        [SerializeField] private float _jumpAnimGrace = 0.12f;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckDistance = 0.1f;

        [Header("Physics")] [SerializeField] private bool _useContinuousCollision;
        [SerializeField] private bool _allowSleepWhenIdle = true;

        private Vector2 _moveInput;
        private Vector3 _verticalVelocity;
        private bool _isGrounded;
        private int _isJumpParamHash;
        private bool _hasAnimator;
        private float _scaledGroundRadius;
        private float _scaledCapsuleHeight;
        private bool _appliedJump;
        private float _coyoteTimer;
        private float _jumpBufferTimer;
        private float _airborneTime;
        private bool _followCameraYaw;
        private float _cameraYaw;

        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }


        private void Awake()
        {
            if (_rigidbody == null) _rigidbody = GetComponent<Rigidbody>();
            if (_capsuleCollider == null) _capsuleCollider = GetComponent<CapsuleCollider>();

            _rigidbody.useGravity = true;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = _useContinuousCollision
                ? CollisionDetectionMode.Continuous
                : CollisionDetectionMode.Discrete;
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotation;

            if (_animator == null) _animator = GetComponentInChildren<Animator>();
            _hasAnimator = _animator != null;
            if (_hasAnimator) _isJumpParamHash = Animator.StringToHash(_isJumpParam);

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
            HandleJump();
            ApplyGravity();
            Move(_moveInput);
        }

        public void OnJumpButtonPressed()
        {
            _jumpBufferTimer = _jumpBufferTime;
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
                _coyoteTimer = _coyoteTime;
                _airborneTime = 0f;
                if (_verticalVelocity.y < 0f) _verticalVelocity.y = 0f;
            }
            else
            {
                _coyoteTimer -= Time.fixedDeltaTime;
                _airborneTime += Time.fixedDeltaTime;
            }

            _isGrounded = grounded;
        }

        private bool ProbeGround()
        {
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
            _jumpBufferTimer -= Time.fixedDeltaTime;
            if (_jumpBufferTimer <= 0f || _coyoteTimer <= 0f) return;

            _jumpBufferTimer = 0f;
            _coyoteTimer = 0f;
            _verticalVelocity.y = Mathf.Sqrt(_jumpHeight * -2f * _gravity);
            _isGrounded = false;
            _airborneTime = _jumpAnimGrace;
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
                if (_allowSleepWhenIdle && alreadyAtRest)
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

            _verticalVelocity.y += _gravity * Time.fixedDeltaTime;
            _verticalVelocity.y = Mathf.Max(_verticalVelocity.y, -_maxFallRate);
        }

        private void UpdateAnimator()
        {
            if (!_hasAnimator) return;

            bool isJumping = _airborneTime >= _jumpAnimGrace;
            if (_appliedJump == isJumping) return;

            _appliedJump = isJumping;
            _animator.SetBool(_isJumpParamHash, isJumping);
        }
    }
}