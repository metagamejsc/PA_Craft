using UnityEngine;

namespace Controller.Player
{
    public class PlayerMovement : MonoBehaviour
    {
        [SerializeField] private Transform _cameraTransform;
        [SerializeField] private Rigidbody _rigidbody;

        private PlayerInfo _playerInfo;
        private PlayerInput _playerInput;
        private bool _isInitialized;
        private bool _isGrounded;
        private float _verticalVelocity;
        private Vector3 _velocity;

        public float CurrentSpeed { get; private set; }
        public bool IsJumping { get; private set; }

        private void Awake()
        {
            if (_rigidbody == null)
            {
                _rigidbody = GetComponent<Rigidbody>();
            }
        }

        public void Initialize(PlayerInfo playerInfo, PlayerInput playerInput)
        {
            _playerInfo = playerInfo;
            _playerInput = playerInput;

            if (_cameraTransform == null && Camera.main != null)
            {
                _cameraTransform = Camera.main.transform;
            }

            if (_rigidbody != null)
            {
                _rigidbody.useGravity = false;
                _rigidbody.freezeRotation = true;
            }

            _isInitialized = true;
        }

        private Vector2 GetDirection()
        {
            return _playerInput == null ? Vector2.zero : _playerInput.MoveDirection;
        }

        private void FixedUpdate()
        {
            if (!_isInitialized || _rigidbody == null)
            {
                return;
            }

            Move();
        }

        private void Move()
        {
            Vector3 direction = new Vector3(GetDirection().x, 0f, GetDirection().y);

            if (_cameraTransform != null)
            {
                _velocity = _cameraTransform.TransformDirection(direction);
            }
            else
            {
                _velocity = direction;
            }

            UpdateCurrentSpeed();
            _velocity.y = 0f;
            _velocity.x *= _playerInfo.speed;
            _velocity.z *= _playerInfo.speed;

            if (_isGrounded && _verticalVelocity <= 0f)
            {
                _verticalVelocity = 0f;
            }

            if (_isGrounded && _playerInput != null && _playerInput.ConsumeJump())
            {
                _verticalVelocity = _playerInfo.jumpForce;
                _isGrounded = false;
                IsJumping = true;
            }
            else if (!_isGrounded)
            {
                _verticalVelocity += _playerInfo.gravity * Time.fixedDeltaTime;
            }

            _velocity.y = _verticalVelocity;
            _rigidbody.linearVelocity = _velocity;
        }

        private void UpdateCurrentSpeed()
        {
            Vector2 inputDirection = GetDirection();
            CurrentSpeed = inputDirection.sqrMagnitude > 0.0001f ? _playerInfo.speed : 0f;
        }

        private void OnCollisionEnter(Collision other)
        {
            if (!other.gameObject.CompareTag("Ground"))
            {
                return;
            }

            _isGrounded = true;
            if (_verticalVelocity <= 0f)
            {
                IsJumping = false;
            }
        }

        private void OnCollisionStay(Collision other)
        {
            if (!other.gameObject.CompareTag("Ground"))
            {
                return;
            }

            _isGrounded = true;
            if (_verticalVelocity <= 0f)
            {
                IsJumping = false;
            }
        }

        private void OnCollisionExit(Collision other)
        {
            if (!other.gameObject.CompareTag("Ground"))
            {
                return;
            }

            _isGrounded = false;
        }
    }
}
