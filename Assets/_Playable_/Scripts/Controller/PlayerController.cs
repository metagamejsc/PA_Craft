using System;
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
        [SerializeField, Min(0f)] private float _airborneAnimationDelay = 0.08f;

        [Header("Input")] [SerializeField] private Button _btnJump;

        [Header("Movement")] [SerializeField] private float _moveRate = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField, Min(1f)] private float _fallGravityMultiplier = 2f;
        [SerializeField] private float _maxFallRate = 25f;
        [SerializeField, Min(0f)] private float _jumpGroundIgnoreDuration = 0.12f;
        [SerializeField, Min(0f)] private float _jumpBufferDuration = 0.12f;
        [SerializeField, Min(0f)] private float _coyoteTime = 0.1f;

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
        private float _lastGroundContactTime = float.NegativeInfinity;
        private float _lastGroundedTime;
        private float _lastJumpRequestTime = float.NegativeInfinity;
        private float _ignoreGroundUntil = float.NegativeInfinity;

        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }
        public event Action MovementRequested;

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
#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.Space))
            {
                if (!_isWorking) MovementRequested?.Invoke();
                else OnJumpButtonPressed();
            }
#endif

            Vector2 requestedInput = _moveJoystick != null
                ? new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis)
                : Vector2.zero;

            if (requestedInput.sqrMagnitude < _inputDeadZone * _inputDeadZone)
            {
                requestedInput = Vector2.zero;
            }

#if UNITY_EDITOR
            Vector2 keyboardInput = new Vector2(
                Input.GetAxisRaw("Horizontal"),
                Input.GetAxisRaw("Vertical"));
            if (keyboardInput.sqrMagnitude > 0.0001f) requestedInput = keyboardInput;
#endif

            if (!_isWorking)
            {
                if (requestedInput.sqrMagnitude > 0.0001f) MovementRequested?.Invoke();
                return;
            }

            _moveInput = requestedInput;

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

        private void OnCollisionEnter(Collision collision)
        {
            RegisterGroundContact(collision);
        }

        private void OnCollisionStay(Collision collision)
        {
            RegisterGroundContact(collision);
        }

        public void OnJumpButtonPressed()
        {
            if (!_isWorking)
            {
                MovementRequested?.Invoke();
                return;
            }

            _jumpRequested = true;
            _lastJumpRequestTime = Time.time;
        }

        public void SetMoveJoystick(UltimateJoystick joystick)
        {
            _moveJoystick = joystick;
        }

        public void SetCameraController(CameraController cameraController)
        {
            _cameraController = cameraController;
        }

        public void Teleport(Transform destination)
        {
            if (destination == null) return;

            _moveInput = Vector2.zero;
            _verticalVelocity = Vector3.zero;
            _jumpRequested = false;
            _rigidbody.linearVelocity = Vector3.zero;
            _rigidbody.angularVelocity = Vector3.zero;
            _rigidbody.position = destination.position;
            _rigidbody.rotation = destination.rotation;
            transform.SetPositionAndRotation(destination.position, destination.rotation);
            Velocity = Vector3.zero;
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
            if (Time.time < _ignoreGroundUntil)
            {
                _isGrounded = false;
                return;
            }

            bool hasRecentGroundContact = Time.time - _lastGroundContactTime <= Time.fixedDeltaTime * 1.5f;
            bool grounded = hasRecentGroundContact || ProbeGround();
            if (grounded)
            {
                if (_verticalVelocity.y < 0f) _verticalVelocity.y = 0f;

                Vector3 velocity = _rigidbody.linearVelocity;
                if (velocity.y > 0f && !_jumpRequested)
                {
                    velocity.y = 0f;
                    _rigidbody.linearVelocity = velocity;
                }
            }

            _isGrounded = grounded;
            if (_isGrounded) _lastGroundedTime = Time.time;
        }

        private void RegisterGroundContact(Collision collision)
        {
            if (Time.time < _ignoreGroundUntil) return;

            for (int index = 0; index < collision.contactCount; index++)
            {
                if (Vector3.Dot(collision.GetContact(index).normal, Vector3.up) < 0.55f) continue;

                _lastGroundContactTime = Time.time;
                _verticalVelocity.y = 0f;
                _isGrounded = true;
                _lastGroundedTime = Time.time;

                Vector3 velocity = _rigidbody.linearVelocity;
                if (velocity.y < 0f)
                {
                    velocity.y = 0f;
                    _rigidbody.linearVelocity = velocity;
                }

                return;
            }
        }

        private bool ProbeGround()
        {
            if (_verticalVelocity.y > 0f) return false;

            Vector3 center = transform.TransformPoint(_capsuleCollider.center);
            float bottom = _scaledCapsuleHeight * 0.5f - _scaledGroundRadius;
            Vector3 origin = center + Vector3.down * bottom + Vector3.up * 0.02f;
            float radius = _scaledGroundRadius * 0.85f;

            // Không cộng thêm quãng đường rơi của frame hiện tại vào tầm quét.
            // Nếu cộng, nhân vật bị coi là "đã chạm đất" khi vẫn còn lơ lửng cách mặt đất
            // vài chục cm, vận tốc rơi bị xoá giữa không trung, rồi frame sau lại rơi tiếp
            // -> isJump bật true thêm một lần nữa ngay sau khi vừa tiếp đất.
            // Rigidbody đã dùng CollisionDetectionMode.Continuous nên không lo xuyên đất,
            // và OnCollisionEnter vẫn bắt được thời điểm chạm đất thật.
            return Physics.SphereCast(
                origin,
                radius,
                Vector3.down,
                out _,
                _groundCheckDistance + 0.05f,
                _groundMask,
                QueryTriggerInteraction.Ignore);
        }

        private void HandleJump()
        {
            if (!_jumpRequested) return;

            if (Time.time - _lastJumpRequestTime > _jumpBufferDuration)
            {
                _jumpRequested = false;
                return;
            }

            bool canJump = _isGrounded || Time.time - _lastGroundedTime <= _coyoteTime;
            if (!canJump) return;

            _jumpRequested = false;
            _verticalVelocity.y = Mathf.Sqrt(_jumpHeight * -2f * _gravity);
            _isGrounded = false;
            _lastGroundContactTime = float.NegativeInfinity;
            _ignoreGroundUntil = Time.time + _jumpGroundIgnoreDuration;
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

            bool isRising = _verticalVelocity.y > 0.1f;
            bool hasBeenAirborneLongEnough = Time.time - _lastGroundedTime >= _airborneAnimationDelay;
            bool isJumping = !_isGrounded && (isRising || hasBeenAirborneLongEnough);
            if (_appliedJump == isJumping) return;

            _appliedJump = isJumping;
            _animator.SetBool(_isJumpParamHash, isJumping);
        }
    }
}
