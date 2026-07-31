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

        [Header("Animation")] [SerializeField] private string _speedParam = "Speed";
        [SerializeField] private string _isJumpParam = "isJump";

        [Header("Movement")] [SerializeField] private float _moveSpeed = 4f;
        [SerializeField] private float _rotationSmooth = 15f;
        [SerializeField] private float _airControlMultiplier = 0.5f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.5f;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckDistance = 0.15f;

        [Header("Button")] [SerializeField] private Button _btnJump;
        private bool _isGrounded;
        private bool _jumpRequested;

        private Vector2 _moveInput;

        private int _speedHash;
        private int _jumpHash;
        private bool _hasAnimator;

        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity => _rigidbody.linearVelocity;

        private void Awake()
        {
            if (_rigidbody == null)
                _rigidbody = GetComponent<Rigidbody>();

            if (_capsuleCollider == null)
                _capsuleCollider = GetComponent<CapsuleCollider>();

            if (_animator == null)
                _animator = GetComponentInChildren<Animator>();

            _hasAnimator = _animator != null;

            if (_hasAnimator)
            {
                _speedHash = Animator.StringToHash(_speedParam);
                _jumpHash = Animator.StringToHash(_isJumpParam);
            }

            _rigidbody.useGravity = true;
            _rigidbody.freezeRotation = true;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
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

#if UNITY_EDITOR
            Vector2 keyboard = new Vector2(
                Input.GetAxisRaw("Horizontal"),
                Input.GetAxisRaw("Vertical"));

            if (keyboard.sqrMagnitude > 0.01f)
                _moveInput = keyboard;
#endif

            UpdateAnimator();
        }

        private void FixedUpdate()
        {
            CheckGround();
            HandleMovement();
            HandleJump();
        }

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
            Vector3 origin = transform.position + Vector3.up * 0.1f;

            float radius = _capsuleCollider.radius * 0.9f;

            float distance =
                (_capsuleCollider.height * 0.5f)
                - radius
                + _groundCheckDistance;

            _isGrounded = Physics.SphereCast(
                origin,
                radius,
                Vector3.down,
                out _,
                distance,
                _groundMask,
                QueryTriggerInteraction.Ignore);
        }

        private void HandleMovement()
        {
            Vector3 moveDirection = Vector3.zero;

            if (_moveInput.sqrMagnitude > 0.001f)
            {
                Transform yaw = _cameraController != null
                    ? _cameraController.YawPivot
                    : transform;

                Vector3 forward = yaw.forward;
                Vector3 right = yaw.right;

                forward.y = 0;
                right.y = 0;

                forward.Normalize();
                right.Normalize();

                moveDirection =
                    forward * _moveInput.y +
                    right * _moveInput.x;

                if (moveDirection.sqrMagnitude > 1f)
                    moveDirection.Normalize();

                RotateTowards(moveDirection);
            }

            float control = _isGrounded ? 1f : _airControlMultiplier;

            Vector3 targetVelocity = moveDirection * (_moveSpeed * control);

            Vector3 velocity = _rigidbody.linearVelocity;

            velocity.y = 0;
            velocity.x = targetVelocity.x;
            velocity.z = targetVelocity.z;

            _rigidbody.linearVelocity = velocity;
        }

        private void HandleJump()
        {
            if (!_jumpRequested)
                return;

            _jumpRequested = false;

            if (!_isGrounded)
                return;

            Vector3 velocity = _rigidbody.linearVelocity;
            velocity.y = 0;
            _rigidbody.linearVelocity = velocity;

            float jumpVelocity =
                Mathf.Sqrt(_jumpHeight * -2f * Physics.gravity.y);

            _rigidbody.AddForce(
                Vector3.up * jumpVelocity,
                ForceMode.VelocityChange);
        }

        private void RotateTowards(Vector3 moveDirection)
        {
            Quaternion targetRotation =
                Quaternion.LookRotation(moveDirection);

            Quaternion rotation = Quaternion.Slerp(
                _rigidbody.rotation,
                targetRotation,
                Time.fixedDeltaTime * _rotationSmooth);

            _rigidbody.MoveRotation(rotation);
        }

        private void UpdateAnimator()
        {
            if (!_hasAnimator)
                return;

            Vector3 horizontal =
                new Vector3(
                    _rigidbody.linearVelocity.x,
                    0,
                    _rigidbody.linearVelocity.z);

            _animator.SetFloat(_speedHash, horizontal.magnitude);
            // _animator.SetBool(_jumpHash, !_isGrounded);
        }
    }
}