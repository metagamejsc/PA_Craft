using System;
using UnityEngine;
using UnityEngine.Serialization;

namespace Playable
{
    public interface IPlayerAttackHandler
    {
        void BeginAttack(PlayerController controller);
        void EndAttack(PlayerController controller);
    }

    [DisallowMultipleComponent]
    [RequireComponent(typeof(CharacterController))]
    [RequireComponent(typeof(PlayerInput))]
    public sealed class PlayerController : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private CharacterController _characterController;

        [SerializeField] private Rigidbody _rigidbody;
        [SerializeField] private PlayerInput _playerInput;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;

        [Header("Ground Movement")] [SerializeField, Min(0f)]
        private float _moveSpeed = 8f;

        [SerializeField, Min(0f)] private float _sprintMultiplier = 1.5f;
        [SerializeField, Min(0f)] private float _groundAcceleration = 18f;
        [SerializeField, Min(0f)] private float _groundDeceleration = 22f;
        [SerializeField, Min(0f)] private float _rotationSmooth = 12f;
        [SerializeField, Range(0f, 89f)] private float _maxStableSlopeAngle = 45f;
        [SerializeField, Min(0f)] private float _steepSlopeSlideSpeed = 5f;
        [SerializeField, Min(0f)] private float _stepOffset = 0.35f;
        [SerializeField] private bool _autoJumpLowObstacles = true;
        [SerializeField, Min(0f)] private float _maxAutoJumpHeight = 1.05f;
        [SerializeField, Min(0f)] private float _autoJumpCooldown = 0.25f;

        [Header("Rough Ground Detection")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField, Range(0.1f, 1f)] private float _groundProbeRadiusScale = 0.9f;
        [SerializeField, Min(0.001f)] private float _groundProbeStartOffset = 0.08f;
        [SerializeField, Min(0f)] private float _groundCheckDistance = 0.25f;
        [SerializeField, Min(0f)] private float _groundSnapDistance = 0.3f;
        [SerializeField, Min(0f)] private float _groundNormalSharpness = 20f;
        [SerializeField] private float _groundedStickForce = -2f;

        [Header("Air Movement")] [SerializeField, Min(0f)]
        private float _airMoveSpeed = 8f;

        [SerializeField, Min(0f)] private float _airAcceleration = 15f;
        [SerializeField, Range(0f, 1f)] private float _airControlMultiplier = 0.6f;
        [SerializeField] private float _gravity = -25f;
        [SerializeField, Min(0f)] private float _terminalVelocity = 45f;

        [Header("Jump")] [SerializeField, Min(0f)]
        private float _jumpHeight = 2f;

        [SerializeField, Min(0f)] private float _jumpBufferTime = 0.12f;
        [SerializeField, Min(0f)] private float _coyoteTime = 0.12f;

        [Header("Fly")] [SerializeField, Min(0f)]
        private float _flySpeed = 10f;

        [SerializeField, Min(0f)] private float _flyAcceleration = 15f;
        [SerializeField, Min(0f)] private float _flyTakeoffSpeed = 4f;
        [SerializeField] private float _maxFlyHeight;

        [Header("Attack")] [SerializeField, Min(0f)]
        private float _attackCooldown = 0.15f;

        [FormerlySerializedAs("_faceMovementReferenceWhileAttacking")]
        [SerializeField] private bool _faceCameraWhileAttacking = true;

        [Header("Transformation")] [SerializeField]
        private GameObject _normalFormRoot;

        [SerializeField] private GameObject _transformedFormRoot;
        [SerializeField] private bool _startTransformed;

        [Header("Animation Parameters")] [SerializeField]
        private string _speedParam = "Speed";

        [SerializeField] private string _isJumpParam = "isJump";
        [SerializeField] private string _isFlyingParam = "isFlying";
        [SerializeField] private string _isAttackingParam = "isAttacking";
        [SerializeField] private string _isTransformedParam = "isTransformed";
        [SerializeField] private string _jumpTriggerParam = "Jump";
        [SerializeField] private string _attackTriggerParam = "Attack";

        private readonly RaycastHit[] _groundHits = new RaycastHit[8];

        private IPlayerAttackHandler _attackHandler;
        private Vector3 _moveDirection;
        private Vector3 _planarVelocity;
        private Vector3 _flyVelocity;
        private Vector3 _smoothedGroundNormal = Vector3.up;
        private Vector3 _desiredFacingDirection;
        private RaycastHit _groundHit;
        private float _verticalVelocity;
        private float _flyVerticalInput;
        private float _lastGroundedTime = float.NegativeInfinity;
        private float _lastJumpRequestTime = float.NegativeInfinity;
        private float _nextAttackTime;
        private float _nextAutoJumpTime;
        private bool _isGrounded;
        private bool _isOnStableGround;
        private bool _isFlying;
        private bool _isSprinting;
        private bool _isAttacking;
        private bool _isTransformed;
        private bool _hasAnimator;

        private int _speedParamHash;
        private int _isJumpParamHash;
        private int _isFlyingParamHash;
        private int _isAttackingParamHash;
        private int _isTransformedParamHash;
        private int _jumpTriggerParamHash;
        private int _attackTriggerParamHash;

        public event Action Landed;
        public event Action LeftGround;
        public event Action Jumped;
        public event Action<bool> FlyingChanged;
        public event Action AttackStarted;
        public event Action AttackEnded;
        public event Action<bool> TransformationChanged;

        public bool IsGrounded => _isGrounded;
        public bool IsOnStableGround => _isOnStableGround;
        public bool IsFlying => _isFlying;
        public bool IsAttacking => _isAttacking;
        public bool IsTransformed => _isTransformed;
        public Vector3 Velocity { get; private set; }
        public Vector3 GroundNormal => _smoothedGroundNormal;
        public PlayerInput PlayerInput => _playerInput;

        private void Reset()
        {
            _characterController = GetComponent<CharacterController>();
            _rigidbody = GetComponent<Rigidbody>();
            _playerInput = GetComponent<PlayerInput>();
            _animator = GetComponentInChildren<Animator>();
        }

        private void Awake()
        {
            ResolveReferences();
            ConfigurePhysicsComponents();
            CacheAnimatorParameters();
            SetTransformed(_startTransformed, true);
            ConfigureOwnedComponents();

            ProbeGround(out _groundHit, out _isOnStableGround);
            _isGrounded = _isOnStableGround || _characterController.isGrounded;

            if (_isGrounded)
            {
                _lastGroundedTime = Time.time;
            }
        }

        private void OnDisable()
        {
            StopAttack();
            _moveDirection = Vector3.zero;
            _flyVerticalInput = 0f;
            _isSprinting = false;
        }

        private void Update()
        {
            float deltaTime = Time.deltaTime;

            if (deltaTime <= 0f || _characterController == null ||
                !_characterController.enabled)
            {
                return;
            }

            UpdateGroundState(deltaTime);
            TryConsumeJumpRequest();

            Vector3 frameVelocity = _isFlying
                ? CalculateFlyVelocity(deltaTime)
                : CalculateGroundAndAirVelocity(deltaTime);

            UpdateRotation(deltaTime);
            _characterController.Move(frameVelocity * deltaTime);

            if (!_isFlying)
            {
                SnapToGround();
            }

            Velocity = _characterController.velocity;
            UpdateGroundState(deltaTime);
            UpdateAnimator();
        }

        private void OnControllerColliderHit(ControllerColliderHit hit)
        {
#if UNITY_LUNA
            return;
#else
            if (hit.collider == null)
            {
                return;
            }

            Vector3 up = transform.up;
            float surfaceAngle = Vector3.Angle(hit.normal, up);

            if (surfaceAngle > _maxStableSlopeAngle)
            {
                _planarVelocity = Vector3.ProjectOnPlane(
                    Vector3.ProjectOnPlane(_planarVelocity, hit.normal),
                    up);
            }

            TryRequestAutoJump(hit, surfaceAngle);
#endif
        }

        public void SetMoveInput(Vector2 input)
        {
            Vector2 clampedInput = Vector2.ClampMagnitude(input, 1f);
            Transform cameraYaw =
                _cameraController != null ? _cameraController.YawPivot : null;
            Vector3 up = transform.up;

            Vector3 forward =
                cameraYaw != null ? cameraYaw.forward : transform.forward;
            Vector3 right =
                cameraYaw != null ? cameraYaw.right : transform.right;
            forward = Vector3.ProjectOnPlane(forward, up).normalized;
            right = Vector3.ProjectOnPlane(right, up).normalized;

            SetMoveDirection((forward * clampedInput.y) + (right * clampedInput.x));
        }

        public void SetMoveDirection(Vector3 worldDirection)
        {
            Vector3 planarDirection = Vector3.ProjectOnPlane(worldDirection, transform.up);
            _moveDirection = Vector3.ClampMagnitude(planarDirection, 1f);

            if (_moveDirection.sqrMagnitude > 0.0001f)
            {
                _desiredFacingDirection = _moveDirection.normalized;
            }
        }

        public void StopMoving()
        {
            _moveDirection = Vector3.zero;
        }

        public void SetSprinting(bool value)
        {
            _isSprinting = value;
        }

        public void RequestJump()
        {
            if (_isFlying)
            {
                return;
            }

            _lastJumpRequestTime = Time.time;
        }

        public void OnJumpButtonPressed()
        {
            RequestJump();
        }

        public void SetFlying(bool value)
        {
            if (_isFlying == value)
            {
                return;
            }

            _isFlying = value;
            _lastJumpRequestTime = float.NegativeInfinity;

            if (_isFlying)
            {
                _flyVelocity = _planarVelocity +
                               (transform.up * Mathf.Max(_flyTakeoffSpeed, _verticalVelocity));
                _verticalVelocity = 0f;
                SetGrounded(false, false);
            }
            else
            {
                _planarVelocity = Vector3.ProjectOnPlane(_flyVelocity, transform.up);
                _verticalVelocity = Vector3.Dot(_flyVelocity, transform.up);
                _flyVelocity = Vector3.zero;
            }

            FlyingChanged?.Invoke(_isFlying);
        }

        public void ToggleFlying()
        {
            SetFlying(!_isFlying);
        }

        public void SetFlyVerticalInput(float input)
        {
            _flyVerticalInput = Mathf.Clamp(input, -1f, 1f);
        }

        public bool StartAttack()
        {
            if (_isAttacking || Time.time < _nextAttackTime)
            {
                return false;
            }

            _isAttacking = true;
            _nextAttackTime = Time.time + _attackCooldown;

            if (_faceCameraWhileAttacking && _cameraController != null)
            {
                SetFacingDirection(_cameraController.YawPivot.forward);
            }

            _attackHandler?.BeginAttack(this);
            SetAnimatorBool(_isAttackingParamHash, true);
            SetAnimatorTrigger(_attackTriggerParamHash);
            AttackStarted?.Invoke();
            return true;
        }

        public void StopAttack()
        {
            if (!_isAttacking)
            {
                return;
            }

            _attackHandler?.EndAttack(this);
            _isAttacking = false;
            SetAnimatorBool(_isAttackingParamHash, false);
            AttackEnded?.Invoke();
        }

        public void ToggleTransformation()
        {
            SetTransformed(!_isTransformed);
        }

        public void SetTransformed(bool value)
        {
            SetTransformed(value, false);
        }

        public void SetFacingDirection(Vector3 worldDirection)
        {
            Vector3 planarDirection = Vector3.ProjectOnPlane(worldDirection, transform.up);

            if (planarDirection.sqrMagnitude > 0.0001f)
            {
                _desiredFacingDirection = planarDirection.normalized;
            }
        }

        public void SetCameraController(CameraController cameraController)
        {
            _cameraController = cameraController;

            if (_cameraController != null)
            {
                _cameraController.SetTarget(this);
            }

            _playerInput?.SetCameraController(_cameraController);
        }

        public void SetPlayerInput(PlayerInput playerInput)
        {
            _playerInput = playerInput;
            _playerInput?.Initialize(this, _cameraController);
        }

        public void Teleport(Vector3 position)
        {
            SetPose(position, transform.rotation);
        }

        public void Teleport(Vector3 position, Quaternion rotation)
        {
            SetPose(position, rotation);
        }

        public void SetPose(Vector3 position, Quaternion rotation)
        {
            bool controllerWasEnabled = _characterController.enabled;
            _characterController.enabled = false;
            transform.SetPositionAndRotation(position, rotation);
            _characterController.enabled = controllerWasEnabled;

            ResetMotion();
            UpdateGroundState(0f);
        }

        public void SetPosition(Vector3 position)
        {
            SetPose(position, transform.rotation);
        }

        public void SetRotation(Quaternion rotation)
        {
            SetPose(transform.position, rotation);
        }

        public void AddVelocity(Vector3 velocity)
        {
            if (_isFlying)
            {
                _flyVelocity += velocity;
                return;
            }

            Vector3 up = transform.up;
            _planarVelocity += Vector3.ProjectOnPlane(velocity, up);
            _verticalVelocity += Vector3.Dot(velocity, up);
        }

        public void ResetMotion()
        {
            _planarVelocity = Vector3.zero;
            _flyVelocity = Vector3.zero;
            _verticalVelocity = 0f;
            Velocity = Vector3.zero;
            _lastJumpRequestTime = float.NegativeInfinity;
        }

        private void ResolveReferences()
        {
            if (_characterController == null)
            {
                _characterController = GetComponent<CharacterController>();
            }

            if (_rigidbody == null)
            {
                _rigidbody = GetComponent<Rigidbody>();
            }

            if (_playerInput == null)
            {
                _playerInput = GetComponent<PlayerInput>();
            }

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }
        }

        private void ConfigureOwnedComponents()
        {
            if (_cameraController != null)
            {
                _cameraController.SetTarget(this);
            }

            _playerInput?.Initialize(this, _cameraController);
        }

        private void SetTransformed(bool value, bool force)
        {
            if (!force && _isTransformed == value)
            {
                return;
            }

            _isTransformed = value;

            if (_normalFormRoot != null)
            {
                _normalFormRoot.SetActive(!_isTransformed);
            }

            if (_transformedFormRoot != null)
            {
                _transformedFormRoot.SetActive(_isTransformed);
            }

            SetAnimatorBool(_isTransformedParamHash, _isTransformed);
            TransformationChanged?.Invoke(_isTransformed);
        }

        private void ConfigurePhysicsComponents()
        {
#if !UNITY_LUNA
            _characterController.stepOffset = GetValidStepOffset();
            _characterController.slopeLimit = _maxStableSlopeAngle;
#endif

            if (_rigidbody != null)
            {
                _rigidbody.isKinematic = true;
                _rigidbody.useGravity = false;
            }
        }

        private Vector3 CalculateGroundAndAirVelocity(float deltaTime)
        {
            Vector3 up = transform.up;
            float speedMultiplier = _isSprinting ? _sprintMultiplier : 1f;

            if (_isGrounded && _isOnStableGround)
            {
                Vector3 targetDirection = ReorientDirectionOnGround(
                    _moveDirection,
                    _smoothedGroundNormal,
                    up);
                Vector3 targetVelocity = targetDirection * (_moveSpeed * speedMultiplier);
                float sharpness = targetVelocity.sqrMagnitude > _planarVelocity.sqrMagnitude
                    ? _groundAcceleration
                    : _groundDeceleration;

                _planarVelocity = Vector3.Lerp(
                    _planarVelocity,
                    targetVelocity,
                    ExponentialLerpFactor(sharpness, deltaTime));
                _verticalVelocity = _groundedStickForce;
            }
            else
            {
                Vector3 targetAirVelocity =
                    _moveDirection * (_airMoveSpeed * speedMultiplier * _airControlMultiplier);
                _planarVelocity = Vector3.MoveTowards(
                    _planarVelocity,
                    targetAirVelocity,
                    _airAcceleration * deltaTime);

                if (_groundHit.collider != null && !_isOnStableGround)
                {
                    Vector3 slideDirection =
                        Vector3.ProjectOnPlane(Vector3.down, _groundHit.normal).normalized;
                    _planarVelocity += slideDirection * (_steepSlopeSlideSpeed * deltaTime);
                }

                _verticalVelocity = Mathf.Max(
                    _verticalVelocity + (_gravity * deltaTime),
                    -_terminalVelocity);
            }

            return _planarVelocity + (up * _verticalVelocity);
        }

        private Vector3 CalculateFlyVelocity(float deltaTime)
        {
            Vector3 up = transform.up;
            Vector3 flyInput = _moveDirection + (up * _flyVerticalInput);

            if (_maxFlyHeight > 0f &&
                transform.position.y >= _maxFlyHeight &&
                Vector3.Dot(flyInput, up) > 0f)
            {
                flyInput = Vector3.ProjectOnPlane(flyInput, up);
            }

            flyInput = Vector3.ClampMagnitude(flyInput, 1f);
            float speedMultiplier = _isSprinting ? _sprintMultiplier : 1f;
            Vector3 targetVelocity = flyInput * (_flySpeed * speedMultiplier);

            _flyVelocity = Vector3.Lerp(
                _flyVelocity,
                targetVelocity,
                ExponentialLerpFactor(_flyAcceleration, deltaTime));
            return _flyVelocity;
        }

        private void TryConsumeJumpRequest()
        {
            bool hasBufferedJump =
                Time.time - _lastJumpRequestTime <= _jumpBufferTime;
            bool isInsideCoyoteTime =
                Time.time - _lastGroundedTime <= _coyoteTime;

            if (!hasBufferedJump || !isInsideCoyoteTime || _isFlying)
            {
                return;
            }

            float gravityMagnitude = Mathf.Max(0.01f, Mathf.Abs(_gravity));
            _verticalVelocity = Mathf.Sqrt(2f * gravityMagnitude * _jumpHeight);
            _lastJumpRequestTime = float.NegativeInfinity;
            _lastGroundedTime = float.NegativeInfinity;
            SetGrounded(false, false);
            SetAnimatorTrigger(_jumpTriggerParamHash);
            Jumped?.Invoke();
        }

        private void TryRequestAutoJump(
            ControllerColliderHit movementHit,
            float surfaceAngle)
        {
#if UNITY_LUNA
            return;
#else
            if (!_autoJumpLowObstacles ||
                _isFlying ||
                !_isGrounded ||
                _moveDirection.sqrMagnitude <= 0.0001f ||
                Time.time < _nextAutoJumpTime ||
                surfaceAngle <= _maxStableSlopeAngle)
            {
                return;
            }

            float movingIntoObstacle =
                Vector3.Dot(_moveDirection.normalized, -movementHit.normal);

            if (movingIntoObstacle < 0.5f)
            {
                return;
            }

            Vector3 up = transform.up;
            Vector3 worldCenter =
                transform.TransformPoint(_characterController.center);
            Vector3 feetPosition =
                worldCenter - (up * (_characterController.height * 0.5f));
            Vector3 probeOrigin =
                movementHit.point -
                (movementHit.normal * (_characterController.skinWidth + 0.02f)) +
                (up * _maxAutoJumpHeight);

            if (!Physics.Raycast(
                    probeOrigin,
                    -up,
                    out RaycastHit topHit,
                    _maxAutoJumpHeight + _groundCheckDistance,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                return;
            }

            float obstacleHeight = Vector3.Dot(
                topHit.point - feetPosition,
                up);
            float topSlopeAngle = Vector3.Angle(topHit.normal, up);

            if (obstacleHeight <= GetValidStepOffset() +
                _characterController.skinWidth ||
                obstacleHeight > _maxAutoJumpHeight ||
                topSlopeAngle > _maxStableSlopeAngle)
            {
                return;
            }

            _nextAutoJumpTime = Time.time + _autoJumpCooldown;
            RequestJump();
#endif
        }

        private void UpdateGroundState(float deltaTime)
        {
            bool foundGround = ProbeGround(out _groundHit, out bool stableGround);
            float distanceToGround = foundGround
                ? Mathf.Max(0f, _groundHit.distance - _groundProbeStartOffset)
                : float.PositiveInfinity;
            float allowedGroundDistance = _isGrounded
                ? _groundSnapDistance
                : _groundCheckDistance;
            bool groundIsCloseEnough =
                _characterController.isGrounded ||
                distanceToGround <= allowedGroundDistance;
            bool canUseGround = !_isFlying &&
                                _verticalVelocity <= 0f &&
                                groundIsCloseEnough &&
                                (stableGround || _characterController.isGrounded);

            _isOnStableGround = canUseGround && stableGround;

            if (foundGround)
            {
                float factor = deltaTime <= 0f
                    ? 1f
                    : ExponentialLerpFactor(_groundNormalSharpness, deltaTime);
                _smoothedGroundNormal = Vector3.Slerp(
                    _smoothedGroundNormal,
                    _groundHit.normal,
                    factor).normalized;
            }
            else
            {
                _smoothedGroundNormal = Vector3.Slerp(
                    _smoothedGroundNormal,
                    transform.up,
                    deltaTime <= 0f
                        ? 1f
                        : ExponentialLerpFactor(_groundNormalSharpness, deltaTime));
            }

            SetGrounded(canUseGround, stableGround);

            if (_isGrounded)
            {
                _lastGroundedTime = Time.time;
#if !UNITY_LUNA
                _characterController.stepOffset = GetValidStepOffset();
#endif
            }
            else
            {
#if !UNITY_LUNA
                _characterController.stepOffset = 0f;
#endif
            }
        }

        private bool ProbeGround(out RaycastHit closestHit, out bool stableGround)
        {
            Vector3 up = transform.up;
            float radius = Mathf.Max(
                0.02f,
                _characterController.radius * _groundProbeRadiusScale);
            Vector3 worldCenter = transform.TransformPoint(_characterController.center);
            float bottomOffset = Mathf.Max(
                0f,
                (_characterController.height * 0.5f) - _characterController.radius);
            Vector3 capsuleBottom = worldCenter - (up * bottomOffset);
            Vector3 origin = capsuleBottom + (up * _groundProbeStartOffset);
            float castDistance =
                _groundProbeStartOffset + _groundCheckDistance + _groundSnapDistance;

            int hitCount = Physics.SphereCastNonAlloc(
                origin,
                radius,
                -up,
                _groundHits,
                castDistance,
                _groundMask,
                QueryTriggerInteraction.Ignore);

            closestHit = default;
            float closestDistance = float.PositiveInfinity;

            for (int i = 0; i < hitCount; i++)
            {
                RaycastHit candidate = _groundHits[i];

                if (candidate.collider == null ||
                    candidate.collider == _characterController ||
                    candidate.transform.IsChildOf(transform))
                {
                    continue;
                }

                if (candidate.distance < closestDistance)
                {
                    closestDistance = candidate.distance;
                    closestHit = candidate;
                }
            }

            if (closestHit.collider == null)
            {
                stableGround = false;
                return false;
            }

            float slopeAngle = Vector3.Angle(closestHit.normal, up);
#if UNITY_LUNA
            stableGround = slopeAngle <= _maxStableSlopeAngle;
#else
            stableGround = slopeAngle <=
                           Mathf.Min(_maxStableSlopeAngle, _characterController.slopeLimit);
#endif
            return true;
        }

        private void SnapToGround()
        {
            if (!_isGrounded || _verticalVelocity > 0f ||
                !ProbeGround(out RaycastHit hit, out bool stableGround) ||
                !stableGround)
            {
                return;
            }

            float snapDistance = Mathf.Max(
                0f,
                hit.distance - _groundProbeStartOffset);

            if (snapDistance <= 0f || snapDistance > _groundSnapDistance)
            {
                return;
            }

            _characterController.Move(-transform.up * snapDistance);
        }

        private void SetGrounded(bool grounded, bool stableGround)
        {
            bool wasGrounded = _isGrounded;
            _isGrounded = grounded;
            _isOnStableGround = grounded && stableGround;

            if (!wasGrounded && _isGrounded)
            {
                _verticalVelocity = _groundedStickForce;
                Landed?.Invoke();
            }
            else if (wasGrounded && !_isGrounded)
            {
                LeftGround?.Invoke();
            }
        }

        private void UpdateRotation(float deltaTime)
        {
            Vector3 facingDirection = _desiredFacingDirection;

            if (_isAttacking &&
                _faceCameraWhileAttacking &&
                _cameraController != null)
            {
                facingDirection = Vector3.ProjectOnPlane(
                    _cameraController.YawPivot.forward,
                    transform.up);
            }

            if (facingDirection.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            Quaternion targetRotation = Quaternion.LookRotation(
                facingDirection.normalized,
                transform.up);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                targetRotation,
                ExponentialLerpFactor(_rotationSmooth, deltaTime));
        }

        private void CacheAnimatorParameters()
        {
            _hasAnimator = _animator != null;
            _speedParamHash = Animator.StringToHash(_speedParam);
            _isJumpParamHash = Animator.StringToHash(_isJumpParam);
            _isFlyingParamHash = Animator.StringToHash(_isFlyingParam);
            _isAttackingParamHash = Animator.StringToHash(_isAttackingParam);
            _isTransformedParamHash = Animator.StringToHash(_isTransformedParam);
            _jumpTriggerParamHash = Animator.StringToHash(_jumpTriggerParam);
            _attackTriggerParamHash = Animator.StringToHash(_attackTriggerParam);
        }

        private void UpdateAnimator()
        {
            if (!_hasAnimator)
            {
                return;
            }

            float referenceSpeed = _isFlying ? _flySpeed : _moveSpeed;
            float normalizedSpeed = referenceSpeed > 0f
                ? Vector3.ProjectOnPlane(Velocity, transform.up).magnitude /
                  referenceSpeed
                : 0f;

            SetAnimatorFloat(_speedParamHash, normalizedSpeed);
            SetAnimatorBool(_isJumpParamHash, !_isGrounded && !_isFlying);
            SetAnimatorBool(_isFlyingParamHash, _isFlying);
            SetAnimatorBool(_isAttackingParamHash, _isAttacking);
            SetAnimatorBool(_isTransformedParamHash, _isTransformed);
        }

        private void SetAnimatorFloat(int parameterHash, float value)
        {
            if (_hasAnimator && parameterHash != 0 &&
                HasAnimatorParameter(parameterHash, AnimatorControllerParameterType.Float))
            {
                _animator.SetFloat(parameterHash, value);
            }
        }

        private void SetAnimatorBool(int parameterHash, bool value)
        {
            if (_hasAnimator && parameterHash != 0 &&
                HasAnimatorParameter(parameterHash, AnimatorControllerParameterType.Bool))
            {
                _animator.SetBool(parameterHash, value);
            }
        }

        private void SetAnimatorTrigger(int parameterHash)
        {
            if (_hasAnimator && parameterHash != 0 &&
                HasAnimatorParameter(parameterHash, AnimatorControllerParameterType.Trigger))
            {
                _animator.SetTrigger(parameterHash);
            }
        }

        private bool HasAnimatorParameter(
            int parameterHash,
            AnimatorControllerParameterType parameterType)
        {
            foreach (AnimatorControllerParameter parameter in _animator.parameters)
            {
                if (parameter.nameHash == parameterHash &&
                    parameter.type == parameterType)
                {
                    return true;
                }
            }

            return false;
        }

        private static Vector3 ReorientDirectionOnGround(
            Vector3 direction,
            Vector3 groundNormal,
            Vector3 characterUp)
        {
            if (direction.sqrMagnitude <= 0.0001f)
            {
                return Vector3.zero;
            }

            Vector3 inputRight = Vector3.Cross(direction, characterUp);
            Vector3 reorientedDirection =
                Vector3.Cross(groundNormal, inputRight).normalized;
            return reorientedDirection * direction.magnitude;
        }

        private static float ExponentialLerpFactor(float sharpness, float deltaTime)
        {
            return sharpness <= 0f
                ? 1f
                : 1f - Mathf.Exp(-sharpness * deltaTime);
        }

        private float GetValidStepOffset()
        {
            return Mathf.Min(
                _stepOffset,
                Mathf.Max(
                    0f,
                    _characterController.height -
                    (_characterController.radius * 2f)));
        }

#if UNITY_EDITOR
        private void OnValidate()
        {
            ResolveReferences();

            if (_characterController != null)
            {
                _stepOffset = GetValidStepOffset();
            }
        }
#endif
    }
}
