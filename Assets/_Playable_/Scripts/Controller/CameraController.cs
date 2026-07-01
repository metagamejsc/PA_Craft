using UnityEngine;

namespace Playable
{
    public class CameraController : MonoBehaviour
    {
        public enum ViewMode
        {
            ThirdPerson,
            FirstPerson
        }

        [Header("References")]
        [SerializeField] private PlayerController _target;
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private TouchController _touchController;
        [SerializeField] private Transform _yawPivot;
        [SerializeField] private Transform _pitchPivot;
        [SerializeField] private Transform _followTarget;

        [Header("View")]
        [SerializeField] private ViewMode _viewMode = ViewMode.ThirdPerson;
        [SerializeField] private Vector3 _thirdPersonOffset = new Vector3(0f, 1.6f, -3.5f);
        [SerializeField] private Vector3 _firstPersonOffset = new Vector3(0f, 1.65f, 0f);
        [SerializeField] private float _followSmooth = 14f;

        [Header("Look")]
        [SerializeField] private float _lookSensitivity = 0.18f;
        [SerializeField] private float _pitchMin = -35f;
        [SerializeField] private float _pitchMax = 75f;

        private float _yaw;
        private float _pitch;

        public Transform YawPivot => _yawPivot != null ? _yawPivot : transform;
        public ViewMode CurrentViewMode => _viewMode;

        private void Awake()
        {
            if (_targetCamera == null)
            {
                _targetCamera = GetComponentInChildren<Camera>();
            }
        }

        private void OnEnable()
        {
            if (_touchController != null)
            {
                _touchController.OnLookDelta += OnLookDelta;
            }
        }

        private void Start()
        {
            if (_target != null)
            {
                SnapToTarget();
            }
        }

        private void LateUpdate()
        {
            if (_target == null)
            {
                return;
            }

            UpdateRigRotation();
            UpdateCameraPosition();
        }

        private void OnDisable()
        {
            if (_touchController != null)
            {
                _touchController.OnLookDelta -= OnLookDelta;
            }
        }

        public void SetTarget(PlayerController target)
        {
            _target = target;

            if (_target != null)
            {
                SnapToTarget();
            }
        }

        public void SetTouchController(TouchController touchController)
        {
            if (_touchController != null)
            {
                _touchController.OnLookDelta -= OnLookDelta;
            }

            _touchController = touchController;

            if (_touchController != null)
            {
                _touchController.OnLookDelta += OnLookDelta;
            }
        }

        public void ToggleView()
        {
            SetViewMode(_viewMode == ViewMode.FirstPerson ? ViewMode.ThirdPerson : ViewMode.FirstPerson);
        }

        public void SetViewMode(ViewMode viewMode)
        {
            _viewMode = viewMode;
            UpdateCameraPosition(true);
        }

        private void OnLookDelta(Vector2 delta)
        {
#if UNITY_EDITOR
            if (Input.GetMouseButton(1))
            {
                delta = new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")) * 20f;
            }
#endif

            _yaw += delta.x * _lookSensitivity;
            _pitch -= delta.y * _lookSensitivity;
            _pitch = Mathf.Clamp(_pitch, _pitchMin, _pitchMax);
        }

        private void SnapToTarget()
        {
            Transform anchor = GetFollowAnchor();
            Vector3 targetEuler = anchor.rotation.eulerAngles;
            _yaw = targetEuler.y;
            _pitch = 0f;
            UpdateRigRotation();
            UpdateCameraPosition(true);
        }

        private Transform GetFollowAnchor()
        {
            if (_followTarget != null)
            {
                return _followTarget;
            }

            return _target != null ? _target.transform : transform;
        }

        private void UpdateRigRotation()
        {
            Transform anchor = GetFollowAnchor();

            if (_yawPivot != null)
            {
                _yawPivot.position = anchor.position;
                _yawPivot.rotation = Quaternion.Euler(0f, _yaw, 0f);
            }

            if (_pitchPivot != null)
            {
                _pitchPivot.localRotation = Quaternion.Euler(_pitch, 0f, 0f);
            }
        }

        private void UpdateCameraPosition(bool instant = false)
        {
            if (_targetCamera == null)
            {
                return;
            }

            Transform anchor = _pitchPivot != null ? _pitchPivot : YawPivot;
            Vector3 localOffset = _viewMode == ViewMode.FirstPerson ? _firstPersonOffset : _thirdPersonOffset;
            Vector3 desiredPosition = anchor.TransformPoint(localOffset);
            Quaternion desiredRotation = anchor.rotation;
            float lerpFactor = instant ? 1f : Time.deltaTime * _followSmooth;

            _targetCamera.transform.position = Vector3.Lerp(
                _targetCamera.transform.position,
                desiredPosition,
                lerpFactor);

            _targetCamera.transform.rotation = Quaternion.Slerp(
                _targetCamera.transform.rotation,
                desiredRotation,
                lerpFactor);
        }
    }
}
