using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody))]
    public class CarController : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Rigidbody _rigidbody;

        [SerializeField] private Transform _cameraTarget;
        [SerializeField] private Vector3 _cameraOffset = new Vector3(0f, 2.2f, -5.5f);
        [SerializeField] private float _cameraInitialYaw;
        [SerializeField, Range(-89f, 89f)] private float _cameraInitialPitch = 12f;
        [SerializeField] private Transform _rearDrivePoint;
        [SerializeField] private Transform _frontSteeringPoint;
        [SerializeField] private Transform[] _frontWheels = new Transform[0];
        [SerializeField] private Transform[] _rearWheels = new Transform[0];

        [Header("UI")] [SerializeField] private Button _forwardButton;
        [SerializeField] private Button _reverseButton;
        [SerializeField] private Button _leftButton;
        [SerializeField] private Button _rightButton;
        [SerializeField] private Button _brakeButton;
        [SerializeField] private Button _exitButton;

        [Header("Audio")]
        [SerializeField] private AudioSource _engineAudioSource;
        [SerializeField] private AudioClip _engineClip;
        [SerializeField, Range(0.1f, 3f)] private float _engineIdlePitch = 0.8f;
        [SerializeField, Range(0.1f, 3f)] private float _engineDrivingPitch = 1.2f;
        [SerializeField, Range(0f, 1f)] private float _engineIdleVolume = 0.25f;
        [SerializeField, Range(0f, 1f)] private float _engineDrivingVolume = 0.45f;
        [SerializeField, Min(0.01f)] private float _engineBlendSpeed = 2.5f;

        [Header("Movement")] [SerializeField, Min(0f)]
        private float _acceleration = 18f;

        [SerializeField, Min(0f)] private float _reverseAcceleration = 6f;
        [SerializeField, Min(0f)] private float _maxForwardSpeed = 14f;
        [SerializeField, Min(0f)] private float _maxReverseSpeed = 6f;
        [SerializeField, Min(0f)] private float _brakeStrength = 40f;
        [SerializeField, Min(0f)] private float _engineBraking = 2.5f;
        [SerializeField, Min(0f)] private float _dragCoefficient = 0.02f;

        [Header("Steering")] [SerializeField, Range(0f, 60f)]
        private float _maxSteeringAngle = 32f;

        [SerializeField, Min(1f)] private float _steeringSpeed = 90f;
        [SerializeField, Min(1f)] private float _steeringReturnSpeed = 160f;
        [SerializeField, Range(0.1f, 1f)] private float _highSpeedSteerFactor = 0.45f;
        [SerializeField, Min(0f)] private float _turnSpeed = 75f;
        [SerializeField, Min(0.01f)] private float _steeringInputAcceleration = 2.5f;
        [SerializeField, Min(0.01f)] private float _steeringInputDeceleration = 4f;

        [Header("Wheels")] [SerializeField, Min(0.01f)]
        private float _wheelRadius = 0.32f;

        [SerializeField] private Vector3 _wheelRollAxis = Vector3.right;
        [Header("Tut")] [SerializeField] private Arrow _arrow;

        private bool _canDrive;
        private bool _forwardPressed;
        private bool _reversePressed;
        private bool _leftPressed;
        private bool _rightPressed;
        private bool _brakePressed;

        private float _speed;
        private float _steeringAngle;
        private float _smoothedSteering;
        private float _wheelRollAngle;
        private float _engineDrivingBlend;

        private float _wheelBase = 2.6f;
        private float _track = 1.6f;
        private float _frontAxleOffset = 1.3f;
        private float _rearAxleOffset = -1.3f;

        private float[] _frontWheelLocalX;
        private Quaternion[] _frontWheelBaseRotations;
        private Quaternion[] _rearWheelBaseRotations;
        private Transform _cachedTransform;
        private Camera _uiCamera;

        public event Action ExitRequested;
        public Transform CameraTarget => _cameraTarget != null ? _cameraTarget : transform;
        public Vector3 CameraOffset => _cameraOffset;
        public float CameraInitialYaw => _cameraInitialYaw;
        public float CameraInitialPitch => _cameraInitialPitch;
        public bool CanDrive => _canDrive;

        private void Awake()
        {
            if (_rigidbody == null) _rigidbody = GetComponent<Rigidbody>();

            _cachedTransform = transform;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
            _rigidbody.isKinematic = true;
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;

            CacheGeometry();
            _frontWheelBaseRotations = CacheLocalRotations(_frontWheels);
            _rearWheelBaseRotations = CacheLocalRotations(_rearWheels);
            CacheUiCamera();

            if (_engineAudioSource != null)
            {
                if (_engineClip == null) _engineClip = _engineAudioSource.clip;
                _engineAudioSource.playOnAwake = false;
                _engineAudioSource.loop = true;
                _engineAudioSource.clip = _engineClip;
            }

            if (_exitButton != null) _exitButton.onClick.AddListener(RequestExit);
        }

        private void OnDestroy()
        {
            if (_exitButton != null) _exitButton.onClick.RemoveListener(RequestExit);
            StopEngineAudio();
        }

        private void Update()
        {
            if (_canDrive) ReadInput();
            UpdateWheelVisuals(Time.deltaTime);
            UpdateEngineAudio(Time.deltaTime);
        }

        private void FixedUpdate()
        {
            if (!_canDrive || _rigidbody.isKinematic) return;

            float deltaTime = Time.fixedDeltaTime;
            float throttle = (_forwardPressed ? 1f : 0f) - (_reversePressed ? 1f : 0f);
            float rawSteering = (_rightPressed ? 1f : 0f) - (_leftPressed ? 1f : 0f);

            _speed = ReadSpeedFromRigidbody();
            UpdateSmoothedSteering(rawSteering, deltaTime);
            UpdateSteeringAngle(_smoothedSteering, deltaTime);
            UpdateSpeed(throttle, deltaTime);
            ApplyCarMovement(_smoothedSteering);
        }

        public void SetDrivingEnabled(bool enabled)
        {
            if (_canDrive == enabled) return;

            StopImmediately();
            _canDrive = enabled;
            _rigidbody.isKinematic = !enabled;
            if (enabled) StartEngineAudio();
            else StopEngineAudio();
        }

        public void StopImmediately()
        {
            ResetInput();
            _speed = 0f;
            _steeringAngle = 0f;
            _smoothedSteering = 0f;
            if (_rigidbody.isKinematic) return;

            _rigidbody.linearVelocity = Vector3.zero;
            _rigidbody.angularVelocity = Vector3.zero;
        }

        private void StartEngineAudio()
        {
            if (_engineAudioSource == null || _engineClip == null) return;

            _engineDrivingBlend = 0f;
            _engineAudioSource.clip = _engineClip;
            _engineAudioSource.loop = true;
            _engineAudioSource.pitch = _engineIdlePitch;
            _engineAudioSource.volume = _engineIdleVolume;
            _engineAudioSource.Play();
        }

        private void UpdateEngineAudio(float deltaTime)
        {
            if (!_canDrive || _engineAudioSource == null || !_engineAudioSource.isPlaying) return;

            bool isPressingThrottle = _forwardPressed || _reversePressed;
            float speedRatio = Mathf.Clamp01(Mathf.Abs(_speed) / Mathf.Max(_maxForwardSpeed, 0.01f));
            float targetBlend = isPressingThrottle ? Mathf.Lerp(0.65f, 1f, speedRatio) : 0f;
            _engineDrivingBlend = Mathf.MoveTowards(
                _engineDrivingBlend,
                targetBlend,
                _engineBlendSpeed * deltaTime);

            _engineAudioSource.pitch = Mathf.Lerp(
                _engineIdlePitch,
                _engineDrivingPitch,
                _engineDrivingBlend);
            _engineAudioSource.volume = Mathf.Lerp(
                _engineIdleVolume,
                _engineDrivingVolume,
                _engineDrivingBlend);
        }

        private void StopEngineAudio()
        {
            _engineDrivingBlend = 0f;
            if (_engineAudioSource != null) _engineAudioSource.Stop();
        }

        // Reads the speed PhysX actually ended up with. If a collision cancelled our
        // velocity last frame this returns ~0, so the car stops instead of tunnelling.
        private float ReadSpeedFromRigidbody()
        {
            Vector3 velocity = _rigidbody.linearVelocity;
            velocity.y = 0f;
            Vector3 forward = _cachedTransform.forward;
            forward.y = 0f;
            return forward.sqrMagnitude > 0.0001f
                ? Vector3.Dot(velocity, forward.normalized)
                : 0f;
        }

        private void UpdateSteeringAngle(float steering, float deltaTime)
        {
            float speedRatio = Mathf.InverseLerp(0f, Mathf.Max(_maxForwardSpeed, 0.01f), Mathf.Abs(_speed));
            float targetAngle = steering * _maxSteeringAngle * Mathf.Lerp(1f, _highSpeedSteerFactor, speedRatio);
            float rate = Mathf.Abs(steering) > 0.01f ? _steeringSpeed : _steeringReturnSpeed;
            _steeringAngle = Mathf.MoveTowards(_steeringAngle, targetAngle, rate * deltaTime);
        }

        private void UpdateSmoothedSteering(float rawSteering, float deltaTime)
        {
            bool isApplyingSteering = Mathf.Abs(rawSteering) > 0.01f;
            float responseSpeed = isApplyingSteering
                ? _steeringInputAcceleration
                : _steeringInputDeceleration;

            _smoothedSteering = Mathf.MoveTowards(
                _smoothedSteering,
                rawSteering,
                responseSpeed * deltaTime);
        }

        private void UpdateSpeed(float throttle, float deltaTime)
        {
            if (_brakePressed)
            {
                _speed = Mathf.MoveTowards(_speed, 0f, _brakeStrength * deltaTime);
                return;
            }

            if (Mathf.Abs(throttle) > 0.01f)
            {
                if (_speed * throttle < -0.01f)
                {
                    _speed = Mathf.MoveTowards(_speed, 0f, _brakeStrength * deltaTime);
                    return;
                }

                float acceleration = throttle > 0f ? _acceleration : _reverseAcceleration;
                _speed = Mathf.Clamp(
                    _speed + throttle * acceleration * deltaTime,
                    -_maxReverseSpeed,
                    _maxForwardSpeed);
                return;
            }

            float deceleration = _engineBraking + _dragCoefficient * _speed * _speed;
            _speed = Mathf.MoveTowards(_speed, 0f, deceleration * deltaTime);
        }

        private void ApplyCarMovement(float steering)
        {
            Vector3 forward = _cachedTransform.forward;
            forward.y = 0f;
            if (forward.sqrMagnitude < 0.0001f) return;
            forward.Normalize();

            Vector3 velocity = forward * _speed;
            velocity.y = _rigidbody.linearVelocity.y;
            _rigidbody.linearVelocity = velocity;

            float maxSpeed = _speed >= 0f ? _maxForwardSpeed : _maxReverseSpeed;
            float speedRatio = Mathf.Clamp01(Mathf.Abs(_speed) / Mathf.Max(maxSpeed, 0.01f));
            float driveDirection = Mathf.Abs(_speed) > 0.02f ? Mathf.Sign(_speed) : 0f;
            float yawRate = steering * _turnSpeed * speedRatio * driveDirection;
            _rigidbody.angularVelocity = new Vector3(0f, yawRate * Mathf.Deg2Rad, 0f);
        }

        private void UpdateWheelVisuals(float deltaTime)
        {
            if (Mathf.Abs(_speed) > 0.02f)
            {
                _wheelRollAngle = Mathf.Repeat(
                    _wheelRollAngle + _speed / _wheelRadius * Mathf.Rad2Deg * deltaTime,
                    360f);
            }

            Quaternion roll = Quaternion.AngleAxis(_wheelRollAngle, _wheelRollAxis);
            for (int index = 0; index < _rearWheels.Length; index++)
            {
                if (_rearWheels[index] != null)
                {
                    _rearWheels[index].localRotation = _rearWheelBaseRotations[index] * roll;
                }
            }

            bool isSteering = Mathf.Abs(_steeringAngle) > 0.05f;
            float turnRadius = isSteering ? _wheelBase / Mathf.Tan(_steeringAngle * Mathf.Deg2Rad) : 0f;
            float angleLimit = _maxSteeringAngle * 1.6f;

            for (int index = 0; index < _frontWheels.Length; index++)
            {
                if (_frontWheels[index] == null) continue;

                // Inner wheel needs a tighter angle than the outer one.
                float angle = _steeringAngle;
                if (isSteering)
                {
                    float armLength = turnRadius - _frontWheelLocalX[index];
                    if (Mathf.Abs(armLength) > 0.01f)
                    {
                        angle = Mathf.Clamp(
                            Mathf.Atan(_wheelBase / armLength) * Mathf.Rad2Deg,
                            -angleLimit,
                            angleLimit);
                    }
                }

                // Steering is applied in the parent frame so a rotated wheel prefab still
                // pivots around the car's up axis; the roll then spins the wheel's own axle.
                _frontWheels[index].localRotation = Quaternion.Euler(0f, angle, 0f)
                                                    * _frontWheelBaseRotations[index]
                                                    * roll;
            }
        }

        private void ReadInput()
        {
            ResetInput();
#if UNITY_EDITOR || UNITY_STANDALONE
            if (Input.GetMouseButton(0)) ApplyPointerInput(Input.mousePosition);
#else
            for (int index = 0; index < Input.touchCount; index++)
            {
                Touch touch = Input.GetTouch(index);
                if (touch.phase != TouchPhase.Ended && touch.phase != TouchPhase.Canceled)
                {
                    ApplyPointerInput(touch.position);
                }
            }
#endif

#if UNITY_EDITOR
            if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)) _forwardPressed = true;
            if (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow)) _reversePressed = true;
            if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) _leftPressed = true;
            if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) _rightPressed = true;
            if (Input.GetKey(KeyCode.Space)) _brakePressed = true;
#endif
        }

        private void ApplyPointerInput(Vector2 screenPosition)
        {
            if (ContainsPointer(_forwardButton, screenPosition)) _forwardPressed = true;
            if (ContainsPointer(_reverseButton, screenPosition)) _reversePressed = true;
            if (ContainsPointer(_leftButton, screenPosition)) _leftPressed = true;
            if (ContainsPointer(_rightButton, screenPosition)) _rightPressed = true;
            if (ContainsPointer(_brakeButton, screenPosition)) _brakePressed = true;
        }

        private void ResetInput()
        {
            _forwardPressed = false;
            _reversePressed = false;
            _leftPressed = false;
            _rightPressed = false;
            _brakePressed = false;
        }

        private void RequestExit()
        {
            if (_canDrive) ExitRequested?.Invoke();
        }

        private bool ContainsPointer(Button button, Vector2 screenPosition)
        {
            if (button == null || !button.IsInteractable()) return false;

            return RectTransformUtility.RectangleContainsScreenPoint(
                button.transform as RectTransform,
                screenPosition,
                _uiCamera);
        }

        private void CacheGeometry()
        {
            _frontAxleOffset = ResolveAxleOffset(_frontSteeringPoint, _frontWheels, 1.3f);
            _rearAxleOffset = ResolveAxleOffset(_rearDrivePoint, _rearWheels, -1.3f);
            _wheelBase = Mathf.Max(_frontAxleOffset - _rearAxleOffset, 0.5f);

            _frontWheelLocalX = new float[_frontWheels.Length];
            float widest = 0f;
            for (int index = 0; index < _frontWheels.Length; index++)
            {
                if (_frontWheels[index] == null) continue;
                _frontWheelLocalX[index] = _cachedTransform.InverseTransformPoint(_frontWheels[index].position).x;
                widest = Mathf.Max(widest, Mathf.Abs(_frontWheelLocalX[index]));
            }

            _track = widest > 0.05f ? widest * 2f : 1.6f;
        }

        private float ResolveAxleOffset(Transform customPoint, Transform[] wheels, float fallback)
        {
            if (customPoint != null) return _cachedTransform.InverseTransformPoint(customPoint.position).z;

            float total = 0f;
            int count = 0;
            for (int index = 0; index < wheels.Length; index++)
            {
                if (wheels[index] == null) continue;
                total += _cachedTransform.InverseTransformPoint(wheels[index].position).z;
                count++;
            }

            return count > 0 ? total / count : fallback;
        }

        private void CacheUiCamera()
        {
            Button referenceButton = _forwardButton != null ? _forwardButton : _exitButton;
            if (referenceButton == null) return;

            Canvas canvas = referenceButton.GetComponentInParent<Canvas>();
            if (canvas != null && canvas.renderMode != RenderMode.ScreenSpaceOverlay)
            {
                _uiCamera = canvas.worldCamera;
            }
        }

        private static Quaternion[] CacheLocalRotations(Transform[] transforms)
        {
            if (transforms == null) return new Quaternion[0];

            Quaternion[] rotations = new Quaternion[transforms.Length];
            for (int index = 0; index < transforms.Length; index++)
            {
                rotations[index] = transforms[index] != null ? transforms[index].localRotation : Quaternion.identity;
            }

            return rotations;
        }

        public void DeActiveArrow()
        {
            _arrow.gameObject.SetActive(false);
        }
    }
}
