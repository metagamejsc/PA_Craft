using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [SerializeField] private PlayerController _playerController;
        [SerializeField] private Camera _interactionCamera;
        [SerializeField] private Button _exitButton;
        [SerializeField] private Arrow _motorbikeArrow;
        [SerializeField] private MotorbikeController[] _motorbikes;
        [SerializeField, Min(0.1f)] private float _interactionDistance = 4f;
        [SerializeField] private float _tapMaxMovement = 25f;
        [SerializeField] private float _tapMaxDuration = 0.4f;
        [Header("Tutorial Bike Tap")]
        [SerializeField, Min(0f), Tooltip("Extra tap area around the bike, in pixels at a 1080px screen short side.")]
        private float _tutorialTapPadding = 60f;
        [SerializeField, Min(0f)] private float _tutorialMinTapSize = 120f;
        private Collider[] _tutorialBikeColliders;
        private readonly RaycastHit[] _tutorialHits = new RaycastHit[32];
        private MotorbikeController _nearest, _mounted;
        private bool _tracking, _dragged, _startedOnUI;
        private int _fingerId;
        private Vector2 _tapStart;
        private float _tapTime;
        private readonly List<RaycastResult> _uiHits = new List<RaycastResult>();
        private PointerEventData _pointer;
        public PlayerController PlayerController => _playerController;
        public bool IsInCar => _mounted != null;
        public bool IsUsingTreadmill => false;
        public event Action CarEntered;
        private void Awake()
        {
            if (_playerController == null) _playerController = GetComponent<PlayerController>();
            if (_interactionCamera == null && _playerController.CameraController != null) _interactionCamera = _playerController.CameraController.OutputCamera;
            if (_interactionCamera == null) _interactionCamera = Camera.main;
            if (_motorbikes == null) _motorbikes = new MotorbikeController[0];
            _tutorialBikeColliders = new Collider[_motorbikes.Length];
            for (int i = 0; i < _motorbikes.Length; i++)
                if (_motorbikes[i] != null) _tutorialBikeColliders[i] = _motorbikes[i].GetComponent<Collider>();
            if (_exitButton != null) _exitButton.onClick.AddListener(UseMotorbike);
        }
        private void OnDestroy()
        {
            if (_exitButton != null) _exitButton.onClick.RemoveListener(UseMotorbike);
        }
        private void Update()
        {
            if (_mounted != null && _mounted.Rider != _playerController) _mounted = null;
            FindNearestMotorbike();
            if (_exitButton != null) _exitButton.gameObject.SetActive(_mounted != null);
            if (_mounted == null && ReadTap(out Vector2 screen)) TryTapBike(screen);
        }
        private void FindNearestMotorbike()
        {
            _nearest = null; float best = float.PositiveInfinity;
            MotorbikeController guide = null;
            if (!_playerController.IsRiding && _playerController.IsWorking)
                foreach (var bike in _motorbikes)
                {
                    if (bike == null || !bike.isActiveAndEnabled || bike.IsDriven) continue;
                    float distance = (bike.transform.position - transform.position).sqrMagnitude;
                    if (distance >= best) continue;
                    guide = bike; best = distance;
                }
            if (best <= _interactionDistance * _interactionDistance) _nearest = guide;
            if (_motorbikeArrow != null)
            {
                _motorbikeArrow.SetTarget(guide != null ? guide.transform : null, _interactionCamera);
                _motorbikeArrow.gameObject.SetActive(guide != null);
            }
        }
        public void UseMotorbike()
        {
            if (_mounted != null) { _mounted.RequestDismount(); return; }
            FindNearestMotorbike();
            if (_nearest != null && _nearest.TryMount(_playerController))
            {
                _mounted = _nearest;
                if (_motorbikeArrow != null) _motorbikeArrow.gameObject.SetActive(false);
                CarEntered?.Invoke();
            }
        }
        public bool TryMountFromTutorial(Vector2 screen)
        {
            if (_mounted != null) return true;
            _tracking = false;
            TryTapBike(screen, true, true);
            if (_mounted == null) TryTutorialTapArea(screen);
            return _mounted != null;
        }

        private void TryTutorialTapArea(Vector2 screen)
        {
            if (_interactionCamera == null || !_interactionCamera.pixelRect.Contains(screen)) return;
            float scale = Mathf.Min(Screen.width, Screen.height) / 1080f;
            float padding = _tutorialTapPadding * scale;
            float minSize = _tutorialMinTapSize * scale;
            MotorbikeController selected = null;
            float best = float.PositiveInfinity;
            for (int i = 0; i < _motorbikes.Length; i++)
            {
                var bike = _motorbikes[i];
                var collider = _tutorialBikeColliders[i];
                if (bike == null || !bike.isActiveAndEnabled || bike.IsDriven || collider == null || !collider.enabled) continue;
                Bounds bounds = collider.bounds;
                Vector3 center = _interactionCamera.WorldToScreenPoint(bounds.center);
                if (center.z <= _interactionCamera.nearClipPlane || center.z > 100f) continue;
                Vector2 min = new Vector2(center.x, center.y), max = min;
                bool clipped = false;
                for (int corner = 0; corner < 8; corner++)
                {
                    Vector3 point = bounds.center + Vector3.Scale(bounds.extents,
                        new Vector3((corner & 1) == 0 ? -1 : 1, (corner & 2) == 0 ? -1 : 1, (corner & 4) == 0 ? -1 : 1));
                    Vector3 projected = _interactionCamera.WorldToScreenPoint(point);
                    if (projected.z <= _interactionCamera.nearClipPlane) { clipped = true; break; }
                    min = Vector2.Min(min, projected);
                    max = Vector2.Max(max, projected);
                }
                if (clipped) continue;
                Vector2 rectCenter = (min + max) * 0.5f;
                Vector2 halfSize = Vector2.Max((max - min) * 0.5f + Vector2.one * padding, Vector2.one * (minSize * 0.5f));
                if (Mathf.Abs(screen.x - rectCenter.x) > halfSize.x || Mathf.Abs(screen.y - rectCenter.y) > halfSize.y) continue;
                float distance = (screen - rectCenter).sqrMagnitude;
                if (distance >= best || !IsTutorialBikeVisible(bike, bounds.center)) continue;
                selected = bike; best = distance;
            }
            if (selected == null || !selected.TryMount(_playerController, true)) return;
            _mounted = selected;
            if (_motorbikeArrow != null) _motorbikeArrow.gameObject.SetActive(false);
            CarEntered?.Invoke();
        }

        private bool IsTutorialBikeVisible(MotorbikeController bike, Vector3 center)
        {
            Ray ray = _interactionCamera.ScreenPointToRay(_interactionCamera.WorldToScreenPoint(center));
            int count = Physics.RaycastNonAlloc(ray, _tutorialHits, Vector3.Distance(ray.origin, center) + 0.1f, ~0, QueryTriggerInteraction.Ignore);
            if (count == _tutorialHits.Length) return false;
            float closest = float.PositiveInfinity;
            Transform hitTransform = null;
            for (int i = 0; i < count; i++)
            {
                var hit = _tutorialHits[i];
                if (hit.collider.transform.IsChildOf(transform) || hit.distance >= closest) continue;
                closest = hit.distance; hitTransform = hit.collider.transform;
            }
            return hitTransform != null && hitTransform.IsChildOf(bike.transform);
        }

        private void TryTapBike(Vector2 screen, bool ignoreDistance = false, bool tutorialPress = false)
        {
            // The tutorial/joystick overlay must not consume a press on the bike.
            if (_interactionCamera == null || (!tutorialPress && IsOverControls(screen))) return;
            var hits = Physics.RaycastAll(_interactionCamera.ScreenPointToRay(screen), 100f, ~0, QueryTriggerInteraction.Ignore);
            Array.Sort(hits, (a, b) => a.distance.CompareTo(b.distance));
            foreach (var hit in hits)
            {
                if (hit.collider.transform.IsChildOf(transform)) continue;
                var bike = hit.collider.GetComponentInParent<MotorbikeController>();
                if (bike != null && (ignoreDistance || (bike.transform.position - transform.position).sqrMagnitude <= _interactionDistance * _interactionDistance) && bike.TryMount(_playerController, ignoreDistance))
                {
                    _mounted = bike;
                    if (_motorbikeArrow != null) _motorbikeArrow.gameObject.SetActive(false);
                    CarEntered?.Invoke();
                }
                break; // A wall in front of the bike blocks interaction.
            }
        }
        private bool IsOverControls(Vector2 screen)
        {
            if (EventSystem.current == null) return false;
            if (_pointer == null) _pointer = new PointerEventData(EventSystem.current);
            _pointer.position = screen; _uiHits.Clear();
            EventSystem.current.RaycastAll(_pointer, _uiHits);
            foreach (var hit in _uiHits)
            {
                if (hit.gameObject.GetComponentInParent<Selectable>() != null || hit.gameObject.GetComponentInParent<UltimateJoystick>() != null) return true;
            }
            return false;
        }
        private void BeginTap(Vector2 position, int finger)
        {
            _tracking = true; _dragged = false; _tapStart = position;
            _tapTime = Time.unscaledTime; _fingerId = finger; _startedOnUI = IsOverControls(position);
        }
        private bool ReadTap(out Vector2 screen)
        {
            screen = Vector2.zero;
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                {
                    var touch = Input.GetTouch(i);
                    if (!_tracking && touch.phase == TouchPhase.Began) BeginTap(touch.position, touch.fingerId);
                    if (!_tracking || touch.fingerId != _fingerId) continue;
                    _dragged |= (touch.position - _tapStart).sqrMagnitude > _tapMaxMovement * _tapMaxMovement;
                    if (touch.phase == TouchPhase.Canceled) { _tracking = false; return false; }
                    if (touch.phase != TouchPhase.Ended) continue;
                    _tracking = false; screen = touch.position;
                    return !_startedOnUI && !_dragged && Time.unscaledTime - _tapTime <= _tapMaxDuration;
                }
                return false;
            }
            if (Input.GetMouseButtonDown(0)) BeginTap(Input.mousePosition, -1);
            if (!_tracking) return false;
            _dragged |= ((Vector2)Input.mousePosition - _tapStart).sqrMagnitude > _tapMaxMovement * _tapMaxMovement;
            if (!Input.GetMouseButtonUp(0)) return false;
            _tracking = false; screen = Input.mousePosition;
            return !_startedOnUI && !_dragged && Time.unscaledTime - _tapTime <= _tapMaxDuration;
        }
        private void OnDisable()
        {
            _tracking = false;
            if (_motorbikeArrow != null) _motorbikeArrow.gameObject.SetActive(false);
        }
    }
}
