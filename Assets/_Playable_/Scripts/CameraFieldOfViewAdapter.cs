using UnityEngine;
using UnityEngine.Serialization;

namespace Playable
{
    [ExecuteAlways]
    [RequireComponent(typeof(Camera))]
    public sealed class CameraFieldOfViewAdapter : MonoBehaviour
    {
        [SerializeField] private Camera _targetCamera;

        [Header("Portrait")]
        [FormerlySerializedAs("_referenceResolution")]
        [SerializeField] private Vector2 _portraitReferenceResolution = new Vector2(1080f, 1920f);
        [FormerlySerializedAs("_referenceFieldOfView")]
        [SerializeField, Range(1f, 179f)] private float _portraitFieldOfView = 60f;

        [Header("Landscape")]
        [SerializeField] private Vector2 _landscapeReferenceResolution = new Vector2(1920f, 1080f);
        [SerializeField, Range(1f, 179f)] private float _landscapeFieldOfView = 60f;

        private Vector2Int _lastScreenSize;
        private ScreenOrientation _lastOrientation;
        private Rect _lastPixelRect;

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
            if (!HasDisplayChanged())
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

            Vector2 currentResolution = GetCurrentResolution();
            if (currentResolution.x <= 0f || currentResolution.y <= 0f)
            {
                return;
            }

            bool isLandscape = currentResolution.x >= currentResolution.y;
            Vector2 referenceResolution = isLandscape
                ? _landscapeReferenceResolution
                : _portraitReferenceResolution;
            float referenceFieldOfView = isLandscape
                ? _landscapeFieldOfView
                : _portraitFieldOfView;

            if (referenceResolution.x <= 0f || referenceResolution.y <= 0f)
            {
                return;
            }

            float referenceAspect = referenceResolution.x / referenceResolution.y;
            float currentAspect = currentResolution.x / currentResolution.y;

            float referenceHorizontal = 2f * Mathf.Atan(
                Mathf.Tan(referenceFieldOfView * 0.5f * Mathf.Deg2Rad) * referenceAspect);

            float newFieldOfView = 2f * Mathf.Atan(
                Mathf.Tan(referenceHorizontal * 0.5f) / currentAspect) * Mathf.Rad2Deg;

            _targetCamera.fieldOfView = newFieldOfView;
            CacheDisplayState();
        }

        private Vector2 GetCurrentResolution()
        {
            if (_targetCamera != null && _targetCamera.pixelWidth > 0 && _targetCamera.pixelHeight > 0)
            {
                return new Vector2(_targetCamera.pixelWidth, _targetCamera.pixelHeight);
            }

            return new Vector2(Screen.width, Screen.height);
        }

        private bool HasDisplayChanged()
        {
            if (_targetCamera == null)
            {
                return false;
            }

            Vector2Int currentScreenSize = new Vector2Int(Screen.width, Screen.height);
            return currentScreenSize != _lastScreenSize
                   || Screen.orientation != _lastOrientation
                   || _targetCamera.pixelRect != _lastPixelRect;
        }

        private void CacheDisplayState()
        {
            _lastScreenSize = new Vector2Int(Screen.width, Screen.height);
            _lastOrientation = Screen.orientation;
            _lastPixelRect = _targetCamera != null ? _targetCamera.pixelRect : default(Rect);
        }
    }
}
