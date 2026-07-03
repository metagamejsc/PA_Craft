using UnityEngine;

namespace Playable
{
    [ExecuteAlways]
    [RequireComponent(typeof(Camera))]
    public sealed class CameraFieldOfViewAdapter : MonoBehaviour
    {
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private Vector2 _referenceResolution = new Vector2(1080f, 1920f);
        [SerializeField] private float _referenceFieldOfView = 60f;

        private int _lastScreenWidth;
        private int _lastScreenHeight;

        private void Reset()
        {
            _targetCamera = GetComponent<Camera>();
            ApplyFieldOfView();
        }

        private void Awake()
        {
            if (_targetCamera == null)
            {
                _targetCamera = GetComponent<Camera>();
            }

            ApplyFieldOfView();
        }

        private void OnEnable()
        {
            ApplyFieldOfView();
        }

        private void OnValidate()
        {
            if (_targetCamera == null)
            {
                _targetCamera = GetComponent<Camera>();
            }

            ApplyFieldOfView();
        }

        private void Update()
        {
            if (Screen.width == _lastScreenWidth && Screen.height == _lastScreenHeight)
            {
                return;
            }

            ApplyFieldOfView();
        }

        public void ApplyFieldOfView()
        {
            if (_targetCamera == null || _targetCamera.orthographic)
            {
                return;
            }

            if (_referenceResolution.x <= 0f || _referenceResolution.y <= 0f || Screen.width <= 0 || Screen.height <= 0)
            {
                return;
            }

            float referenceAspect = _referenceResolution.x / _referenceResolution.y;
            float currentAspect = Screen.width / (float)Screen.height;

            float referenceHorizontal = 2f * Mathf.Atan(
                Mathf.Tan(_referenceFieldOfView * 0.5f * Mathf.Deg2Rad) * referenceAspect);

            float newFieldOfView = 2f * Mathf.Atan(
                Mathf.Tan(referenceHorizontal * 0.5f) / currentAspect) * Mathf.Rad2Deg;

            _targetCamera.fieldOfView = newFieldOfView;
            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;
        }
    }
}
