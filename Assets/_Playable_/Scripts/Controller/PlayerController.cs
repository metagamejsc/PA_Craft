using UnityEngine;

namespace Playable
{
    public class PlayerController : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Rigidbody _rigidbody;

        [SerializeField] private CameraController _cameraController;

        [Header("Move")] [SerializeField] private float _moveSpeed = 4.5f;
        [SerializeField] private float _rotateSmooth = 12f;
        [SerializeField] private float _inputDeadzone = 0.1f;
        [SerializeField] private float _acceleration = 30f;

        [Header("Jump / Gravity")]
        [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _extraGravity = -25f;
        [SerializeField] private float _fallMultiplier = 2.5f;

        [Header("Ground Check")] [SerializeField]
        private Transform _groundCheckPoint;

        [SerializeField] private float _groundCheckRadius = 0.25f;
        [SerializeField] private LayerMask _groundMask = ~0;

        [Header("Editor Debug Input")] [SerializeField]
        private bool _allowKeyboardInEditor = true;

        private Vector2 _moveInput;
        private bool _jumpRequested;
        private bool _isGrounded;
        private float _currentYaw;

        public bool IsGrounded => _isGrounded;
        public Vector2 MoveInput => _moveInput;

        private void Awake()
        {
            if (_rigidbody == null)
            {
                _rigidbody = GetComponent<Rigidbody>();
            }

            _rigidbody.freezeRotation = true;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;

            _rigidbody.useGravity = false;
        }

        private void Update()
        {
            ReadEditorInput();
        }

        private void FixedUpdate()
        {
            CheckGrounded();
            Move();
            ConsumeJumpRequest();
            ApplyExtraGravity();
        }

        // ---------- INPUT PUBLIC API (gọi từ joystick UI / button UI) ----------

        /// <summary>Gọi khi joystick kéo. Giá trị x,y trong khoảng -1..1.</summary>
        public void SetMoveInput(Vector2 input)
        {
            _moveInput = Vector2.ClampMagnitude(input, 1f);
        }

        /// <summary>Gọi khi thả joystick.</summary>
        public void ResetMoveInput()
        {
            _moveInput = Vector2.zero;
        }

        /// <summary>Gọi từ nút Jump (OnPointerDown).</summary>
        public void Jump()
        {
            _jumpRequested = true;
        }

        // ---------- EDITOR FALLBACK (WASD / Arrow + Space) ----------

        private void ReadEditorInput()
        {
#if UNITY_EDITOR || UNITY_STANDALONE
            if (!_allowKeyboardInEditor)
            {
                return;
            }

            float h = Input.GetAxisRaw("Horizontal");
            float v = Input.GetAxisRaw("Vertical");

            if (Mathf.Abs(h) > 0.01f || Mathf.Abs(v) > 0.01f)
            {
                _moveInput = new Vector2(h, v);
            }
            else
            {
                _moveInput = Vector2.zero;
            }

            if (Input.GetKeyDown(KeyCode.Space))
            {
                _jumpRequested = true;
            }
#endif
        }

        // ---------- CORE MOVEMENT ----------

        private void CheckGrounded()
        {
            Vector3 checkPos = _groundCheckPoint != null
                ? _groundCheckPoint.position
                : transform.position;

            _isGrounded = Physics.CheckSphere(
                checkPos,
                _groundCheckRadius,
                _groundMask,
                QueryTriggerInteraction.Ignore);
        }

        private void ApplyExtraGravity()
        {
            if (_isGrounded && _rigidbody.linearVelocity.y <= 0f)
            {
                // Ghì nhân vật xuống đất, tránh nảy nhẹ khi đi qua dốc/bậc thang
                Vector3 v = _rigidbody.linearVelocity;
                v.y = -2f; // một lực nhỏ giữ bám đất
                _rigidbody.linearVelocity = v;
                return;
            }

            // Đang rơi xuống -> nhân thêm _fallMultiplier để rơi nhanh, dứt khoát hơn
            // Đang bay lên -> giữ nguyên gia tốc bình thường
            float multiplier = _rigidbody.linearVelocity.y < 0f ? _fallMultiplier : 1f;
            Vector3 gravityForce = Vector3.up * (Physics.gravity.y * multiplier + _extraGravity);
            _rigidbody.AddForce(gravityForce, ForceMode.Acceleration);
        }

        private void ConsumeJumpRequest()
        {
            if (_jumpRequested && _isGrounded)
            {
                float jumpVelocity = Mathf.Sqrt(_jumpHeight * -2f * (Physics.gravity.y + _extraGravity));

                Vector3 v = _rigidbody.linearVelocity;
                v.y = jumpVelocity;
                _rigidbody.linearVelocity = v;
            }

            _jumpRequested = false;
        }

        private void Move()
        {
            Vector2 input = _moveInput;

            if (input.magnitude < _inputDeadzone)
            {
                input = Vector2.zero;
            }

            Vector3 moveDir = Vector3.zero;

            if (input.sqrMagnitude > 0.0001f)
            {
                Transform camYaw = _cameraController != null ? _cameraController.YawPivot : transform;

                Vector3 forward = camYaw.forward;
                Vector3 right = camYaw.right;
                forward.y = 0f;
                right.y = 0f;
                forward.Normalize();
                right.Normalize();

                moveDir = (forward * input.y + right * input.x);

                if (moveDir.sqrMagnitude > 0.0001f)
                {
                    _currentYaw = Mathf.LerpAngle(
                        transform.eulerAngles.y,
                        Quaternion.LookRotation(moveDir).eulerAngles.y,
                        Time.deltaTime * _rotateSmooth);

                    transform.rotation = Quaternion.Euler(0f, _currentYaw, 0f);
                }
            }

            Vector3 targetHorizontalVelocity = moveDir * _moveSpeed;
            Vector3 currentVelocity = _rigidbody.linearVelocity;
            Vector3 currentHorizontalVelocity = new Vector3(currentVelocity.x, 0f, currentVelocity.z);

            Vector3 newHorizontalVelocity = Vector3.MoveTowards(
                currentHorizontalVelocity,
                targetHorizontalVelocity,
                _acceleration * Time.fixedDeltaTime);

            _rigidbody.linearVelocity =
                new Vector3(newHorizontalVelocity.x, currentVelocity.y, newHorizontalVelocity.z);
        }
    }
}
