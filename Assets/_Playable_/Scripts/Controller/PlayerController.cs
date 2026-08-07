using System;
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
        [SerializeField] private Animator _animatorHorse;

        [Header("Animation")] [SerializeField] private string _speedParam = "Speed";
        [SerializeField] private string _isJumpParam = "isJump";
        [SerializeField] private string _isFlyParam = "isFly";
        [SerializeField] private string _isTransformParam = "isTransform";

        [Header("Input")] [SerializeField] private Button _btnJump;
        [SerializeField] private Button _btnFly;
        [SerializeField] private GameObject _btnFlyUp;
        [SerializeField] private GameObject _btnFlyDown;
        [SerializeField] private Button _btnSpeed;
        [SerializeField] private Button _btnTransform;

        [Header("Button Icons")]
        [Tooltip("Image con của ButtonFly. Bỏ trống thì tự lấy Image đầu tiên trong con của nút")]
        [SerializeField]
        private Image _iconFly;

        [SerializeField] private Sprite _iconFlyNormal;
        [SerializeField] private Sprite _iconFlyActive;

        [Tooltip("Image con của ButtonTransform. Bỏ trống thì tự lấy Image đầu tiên trong con của nút")]
        [SerializeField]
        private Image _iconTransform;

        [SerializeField] private Sprite _iconTransformNormal;
        [SerializeField] private Sprite _iconTransformActive;

        [Header("Movement")] [SerializeField] private float _moveSpeed = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField] private float _coyoteTime = 0.15f;
        [SerializeField] private float _jumpBufferTime = 0.15f;
        [SerializeField] private float _groundStickForce = 2f;

        [Tooltip("Phải rời đất lâu hơn ngần này mới bật anim jump. Chống nhấp nháy khi chạy qua mấp mô")]
        [SerializeField]
        private float _jumpAnimGrace = 0.12f;

        [Tooltip("Bật khi Animator ĐÃ có transition Run <-> Jump. Tắt thì ép Speed = 0 lúc bay để vào được state Jump")]
        [SerializeField]
        private bool _keepSpeedWhileAirborne = false;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckDistance = 0.1f;
        [SerializeField] private float _groundCheckRadius = 0.3f;

        [Tooltip("Raycast 1 tia trước, chỉ SphereCast khi tia trượt. SphereCast vào MeshCollider rất đắt")]
        [SerializeField]
        private bool _cheapGroundCheck = true;

        [Header("Physics")]
        [Tooltip("Continuous rất nặng khi va chạm MeshCollider. Player đi 4 m/s thì Discrete là đủ")]
        [SerializeField]
        private bool _useContinuousCollision = false;

        [Tooltip("Đứng yên trên đất thì ngừng ghi velocity để Rigidbody được ngủ")] [SerializeField]
        private bool _allowSleepWhenIdle = true;

        [Tooltip(
            "Tia dò tường để trượt dọc mặt dốc. Tắt vì PhysX đã tự trượt, và tia này đọc hit.normal gây lỗi trên Luna")]
        [SerializeField]
        private bool _wallSlideCheck = false;

        [Header("Fly")] [SerializeField] private float _flyHeight = 2f;
        [SerializeField] private float _flySpeed = 3f;
        [SerializeField] private float _minFlyAboveGround = 0.3f;
        [SerializeField] private float _flyGroundSampleInterval = 0.1f;

        [Header("Speed Boost")] [SerializeField]
        private float _speedMultiplier = 2f;

        [Header("Transform")] [SerializeField] private GameObject _horse;
        [SerializeField] private Transform _modelPlayer;
        [SerializeField] private Transform _mountPoint;

        private Transform _transform;
        private Vector2 _moveInput;
        private Vector3 _verticalVelocity;
        private bool _isGrounded;
        private int _speedParamHash;
        private int _isJumpParamHash;
        private int _isFlyParamHash;
        private int _isTransformParamHash;
        private bool _hasAnimator;
        private bool _hasHorseAnimator;
        private float _scaledGroundRadius;
        private float _scaledCapsuleHeight;
        private float _appliedSpeed = -1f;
        private bool _appliedJump;
        private bool _appliedFly;
        private bool _appliedTransform;
        private float _flyGroundHeight;
        private float _flyGroundSampleTime;
        private bool _isFlying;
        private bool _isLanding;
        private bool _flyUp;
        private bool _flyDown;
        private float _coyoteTimer;
        private float _jumpBufferTimer;
        private float _airborneTime;
        private float _flyStartHeight;
        private float _currentFlyHeight;
        private bool _isSpeedBoost;
        private bool _isTakingOff;
        private bool _isTransformed;
        private bool _isResting;
        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }

        /// <summary>Bắn đúng 1 lần khi player transform (cưỡi ngựa) chuyển từ tắt sang bật.</summary>
        public event Action OnTransformedOn;

        private float CurrentSpeedMultiplier =>
            _isSpeedBoost ? _speedMultiplier : 1f;

        private void Awake()
        {
            _transform = transform;

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
            _rigidbody.collisionDetectionMode = _useContinuousCollision
                ? CollisionDetectionMode.Continuous
                : CollisionDetectionMode.Discrete;
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotation;

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;
            _hasHorseAnimator = _animatorHorse != null;

            if (_hasAnimator)
            {
                _speedParamHash = Animator.StringToHash(_speedParam);
                _isJumpParamHash = Animator.StringToHash(_isJumpParam);
                _isFlyParamHash = Animator.StringToHash(_isFlyParam);
                _isTransformParamHash = Animator.StringToHash(_isTransformParam);
            }

            CacheCapsuleSize();
        }

        /// <summary>
        /// Scale của player không đổi lúc chạy nên tính sẵn 1 lần, khỏi đọc lossyScale mỗi FixedUpdate.
        /// </summary>
        private void CacheCapsuleSize()
        {
            Vector3 scale = _transform.lossyScale;

            _scaledGroundRadius = _capsuleCollider.radius * Mathf.Max(scale.x, scale.z);
            _scaledCapsuleHeight = _capsuleCollider.height * scale.y;
        }

        private void Start()
        {
            if (_btnJump != null) _btnJump.onClick.AddListener(OnJumpButtonPressed);
            if (_btnFly != null) _btnFly.onClick.AddListener(ToggleFly);
            if (_btnSpeed != null) _btnSpeed.onClick.AddListener(ToggleSpeed);
            if (_btnTransform != null)
            {
                _btnTransform.onClick.AddListener(ToggleTransform);
            }

            if (_horse != null)
            {
                _horse.SetActive(false);
            }

            ResolveIconTargets();
            RefreshFlyIcon();
            RefreshTransformIcon();
        }

        /// <summary>
        /// Tự tìm Image icon trong con của nút nếu chưa gán tay trong Inspector.
        /// Bỏ qua Image của chính nút (background) bằng cách chỉ lấy Image nằm ở con.
        /// </summary>
        private void ResolveIconTargets()
        {
            if (_iconFly == null && _btnFly != null)
            {
                _iconFly = FindChildIcon(_btnFly.transform);
            }

            if (_iconTransform == null && _btnTransform != null)
            {
                _iconTransform = FindChildIcon(_btnTransform.transform);
            }
        }

        private Image FindChildIcon(Transform buttonTransform)
        {
            Image[] images = buttonTransform.GetComponentsInChildren<Image>(true);

            for (int i = 0; i < images.Length; i++)
            {
                if (images[i].transform != buttonTransform)
                {
                    return images[i];
                }
            }

            return null;
        }

        private void RefreshFlyIcon()
        {
            ApplyIcon(_iconFly, _iconFlyNormal, _iconFlyActive, _isFlying);
        }

        private void RefreshTransformIcon()
        {
            ApplyIcon(_iconTransform, _iconTransformNormal, _iconTransformActive, _isTransformed);
        }

        private void ApplyIcon(Image target, Sprite normalSprite, Sprite activeSprite, bool isActive)
        {
            if (target == null)
            {
                return;
            }

            Sprite sprite = isActive ? activeSprite : normalSprite;

            // Gán sprite làm dirty canvas -> chỉ gán khi thật sự đổi.
            if (sprite != null && target.sprite != sprite)
            {
                target.sprite = sprite;
            }
        }

        private void Update()
        {
#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.Space))
            {
                OnJumpButtonPressed();
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
            if (_isFlying)
            {
                FlyUpdate();
            }
            else
            {
                CheckGround();
                HandleJump();
                ApplyGravity();
            }

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

        private void CheckGround()
        {
            if (_isFlying)
            {
                _isGrounded = false;
                return;
            }

            if (_verticalVelocity.y > 0f)
            {
                _isGrounded = false;
            }
            else
            {
                _isGrounded = ProbeGround();
            }
            
            if (_isGrounded)
            {
                _coyoteTimer = _coyoteTime;
                _airborneTime = 0f;

                if (_verticalVelocity.y < 0f)
                    _verticalVelocity.y = -_groundStickForce;
            }
            else
            {
                _coyoteTimer -= Time.fixedDeltaTime;
                _airborneTime += Time.fixedDeltaTime;
            }
        }


        private bool ProbeGround()
        {
            if (_verticalVelocity.y > 0.05f)
                return false;

            Vector3 center = _transform.TransformPoint(_capsuleCollider.center);

            float radius = _capsuleCollider.radius * 0.95f;

            float castDistance = _groundCheckDistance;

            float bottomOffset = (_capsuleCollider.height * 0.5f) - _capsuleCollider.radius;

            Vector3 origin = center + Vector3.up * 0.02f;

            return Physics.SphereCast(
                origin,
                radius,
                Vector3.down,
                out _,
                bottomOffset + castDistance,
                _groundMask,
                QueryTriggerInteraction.Ignore);
        }

        private void HandleJump()
        {
            if (_isFlying) return;
            _jumpBufferTimer -= Time.fixedDeltaTime;

            if (_jumpBufferTimer <= 0f)
                return;

            if (_coyoteTimer <= 0f)
                return;
            Debug.Log(1);

            _jumpBufferTimer = 0f;
            _coyoteTimer = 0f;

            _verticalVelocity.y = Mathf.Sqrt(_jumpHeight * -2f * _gravity);

            _isGrounded = false;

            _airborneTime = _jumpAnimGrace;
        }

        private void Move(Vector2 input)
        {
            bool hasInput = input.sqrMagnitude > 0.0001f;

            if (_allowSleepWhenIdle && !hasInput && _isGrounded && !_isFlying)
            {
                if (!_isResting)
                {
                    _isResting = true;

                    Vector3 restVelocity = _rigidbody.linearVelocity;
                    restVelocity.x = 0f;
                    restVelocity.z = 0f;

                    _rigidbody.linearVelocity = restVelocity;
                    Velocity = restVelocity;
                }

                return;
            }

            _isResting = false;

            Vector3 moveDirection = Vector3.zero;

            if (hasInput)
            {
                Transform yawPivot = _cameraController != null ? _cameraController.YawPivot : null;

                Vector3 forward = yawPivot != null ? yawPivot.forward : _transform.forward;
                Vector3 right = yawPivot != null ? yawPivot.right : _transform.right;
                forward.y = 0f;
                right.y = 0f;
                forward.Normalize();
                right.Normalize();

                moveDirection = (forward * input.y) + (right * input.x);

                if (moveDirection.sqrMagnitude > 1f)
                {
                    moveDirection.Normalize();
                }

                // Rigidbody capsule đã tự trượt dọc tường nhờ PhysX, tia này gần như thừa.
                // Nó lại đọc hit.normal -> lại dựng RaycastHit -> lại nổ trên Luna.
                if (_wallSlideCheck && Physics.Raycast(
                        _transform.position + Vector3.up * 0.5f,
                        moveDirection,
                        out RaycastHit hit,
                        0.35f,
                        _groundMask,
                        QueryTriggerInteraction.Ignore))
                {
                    if (Vector3.Dot(hit.normal, Vector3.up) < 0.2f)
                    {
                        moveDirection = Vector3.ProjectOnPlane(moveDirection, hit.normal).normalized;
                    }
                }

                RotateTowards(moveDirection);
            }

            float control = _isGrounded ? 1f : _airControlMultiplier;
            Vector3 horizontalMotion =
                moveDirection * (_moveSpeed * CurrentSpeedMultiplier * control);
            Vector3 velocity = _rigidbody.linearVelocity;

            velocity.x = horizontalMotion.x;
            velocity.z = horizontalMotion.z;
            if (!_isFlying)
            {
                velocity.y = _verticalVelocity.y;
            }
            else
            {
                velocity.y = 0f;
            }

            _rigidbody.linearVelocity = velocity;

            Velocity = velocity;
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

        /// <summary>
        /// Chỉ đẩy param xuống Animator khi giá trị thật sự đổi - mỗi lệnh Set* là 1 lần gọi native.
        /// </summary>
        private void UpdateAnimator()
        {
            if (!_hasAnimator)
            {
                return;
            }

            // isJump chỉ bật khi đã rời đất đủ lâu. Chạy nhanh trên map block hay mất tiếp đất
            // 1-2 frame; nếu bật ngay thì Animator liên tục nhảy Run -> Idle -> Jump -> Idle -> Run.
            bool isJumping = !_isFlying && _airborneTime >= _jumpAnimGrace;

            float speed = 0f;

            if (_isGrounded || (_keepSpeedWhileAirborne && !_isFlying))
            {
                Vector3 velocity = Velocity;
                speed = Mathf.Sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            }

            bool useHorse = _isTransformed && _hasHorseAnimator;

            if (!Mathf.Approximately(speed, _appliedSpeed))
            {
                _appliedSpeed = speed;

                if (useHorse) _animatorHorse.SetFloat(_speedParamHash, speed);
                else _animator.SetFloat(_speedParamHash, speed);
            }

            if (_appliedFly != _isFlying)
            {
                _appliedFly = _isFlying;
                _animator.SetBool(_isFlyParamHash, _isFlying);
            }

            if (_appliedTransform != _isTransformed)
            {
                _appliedTransform = _isTransformed;
                _animator.SetBool(_isTransformParamHash, _isTransformed);
            }

            if (_appliedJump != isJumping)
            {
                _appliedJump = isJumping;

                if (useHorse) _animatorHorse.SetBool(_isJumpParamHash, isJumping);
                else _animator.SetBool(_isJumpParamHash, isJumping);
            }
        }

        private void ToggleFly()
        {
            _isFlying = !_isFlying;

            if (_isTransformed) ToggleTransform();

            if (_isFlying)
            {
                _isFlying = true;
                _isTakingOff = true;
                _isLanding = false;

                _flyStartHeight = _transform.position.y;
                _currentFlyHeight = _flyStartHeight;
                _flyGroundSampleTime = 0f;
                _btnFlyUp.SetActive(true);
                _btnFlyDown.SetActive(true);
                _btnJump.gameObject.SetActive(false);
            }
            else
            {
                _isLanding = true;

                _flyUp = false;
                _flyDown = false;
                _btnFlyUp.SetActive(false);
                _btnFlyDown.SetActive(false);
                _btnJump.gameObject.SetActive(true);
            }

            RefreshFlyIcon();
        }

        private void FlyUpdate()
        {
            float flySpeed = _flySpeed * CurrentSpeedMultiplier;

            if (_isLanding)
            {
                if (Physics.Raycast(
                        _transform.position,
                        Vector3.down,
                        out RaycastHit hit,
                        100f,
                        _groundMask,
                        QueryTriggerInteraction.Ignore))
                {
                    float minHeight = hit.point.y;

                    _currentFlyHeight = Mathf.Max(
                        _currentFlyHeight,
                        minHeight);

                    if (Mathf.Abs(_currentFlyHeight - hit.point.y) <= 0.02f)
                    {
                        _currentFlyHeight = hit.point.y;

                        _isFlying = false;
                        _isLanding = false;

                        _verticalVelocity.y = 0f;
                    }
                }
            }
            else
            {
                if (_isTakingOff)
                {
                    float target = _flyStartHeight + _flyHeight;

                    _currentFlyHeight = Mathf.MoveTowards(
                        _currentFlyHeight,
                        target,
                        flySpeed * Time.fixedDeltaTime);

                    if (Mathf.Abs(_currentFlyHeight - target) < 0.02f)
                    {
                        _currentFlyHeight = target;
                        _isTakingOff = false;
                    }
                }
                else
                {
                    if (_flyUp)
                        _currentFlyHeight += flySpeed * Time.fixedDeltaTime;

                    if (_flyDown)
                        _currentFlyHeight -= flySpeed * Time.fixedDeltaTime;

                    if (TryGetFlyGroundHeight(out float groundHeight))
                    {
                        float minAllowedHeight = groundHeight + _minFlyAboveGround;
                        _currentFlyHeight = Mathf.Max(_currentFlyHeight, minAllowedHeight);
                    }
                }
            }

            Vector3 position = _rigidbody.position;
            position.y = _currentFlyHeight;

            _rigidbody.MovePosition(position);

            _verticalVelocity.y = 0f;
        }

        /// <summary>
        /// Lấy cao độ mặt đất khi bay. Chỉ raycast lại mỗi _flyGroundSampleInterval giây
        /// thay vì mỗi FixedUpdate (50 lần/giây).
        /// </summary>
        private bool TryGetFlyGroundHeight(out float groundHeight)
        {
            if (Time.time < _flyGroundSampleTime)
            {
                groundHeight = _flyGroundHeight;
                return true;
            }

            if (Physics.Raycast(
                    _transform.position,
                    Vector3.down,
                    out RaycastHit hit,
                    100f,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                _flyGroundHeight = hit.point.y;
                _flyGroundSampleTime = Time.time + _flyGroundSampleInterval;

                groundHeight = _flyGroundHeight;
                return true;
            }

            groundHeight = 0f;
            return false;
        }

        public void OnFlyUpDown()
        {
            _flyUp = true;
        }

        public void OnFlyUpUp()
        {
            _flyUp = false;
        }

        public void OnFlyDownDown()
        {
            _flyDown = true;
        }

        public void OnFlyDownUp()
        {
            _flyDown = false;
        }

        private void ToggleSpeed()
        {
            _isSpeedBoost = !_isSpeedBoost;
        }

        private void ToggleTransform()
        {
            _isTransformed = !_isTransformed;

            // Đổi animator đích -> ép đẩy lại toàn bộ param ở frame kế tiếp.
            _appliedSpeed = -1f;
            _appliedJump = !_appliedJump;

            RefreshTransformIcon();

            if (_isTransformed)
            {
                _horse.SetActive(true);
                _horse.transform.localPosition = Vector3.zero;

                _modelPlayer.SetParent(_mountPoint);

                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;

                OnTransformedOn?.Invoke();
            }
            else
            {
                _modelPlayer.SetParent(transform);
                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;
                _horse.SetActive(false);
            }
        }
    }
}