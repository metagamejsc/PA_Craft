using System;
using UnityEngine;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private PlayerController _playerController;

        [SerializeField] private Camera _interactionCamera;
        [SerializeField] private GameObject _playerVisual;
        [SerializeField] private Collider _playerCollider;
        [SerializeField] private Animator _animator;

        [Header("Interaction")] [SerializeField]
        private LayerMask _interactionMask = ~0;

        [SerializeField] private LayerMask _gymInteractionMask = ~0;
        [SerializeField, Min(0.1f)] private float _interactionDistance = 6f;
        [SerializeField, Min(1f)] private float _tapMaxMovement = 25f;
        [SerializeField, Min(0.05f)] private float _tapMaxDuration = 0.4f;
        [SerializeField] private Collider _carInteraction;

        [Header("Car")] [SerializeField] private Transform _carExitPoint;

        [Header("Gym")] [SerializeField] private GymFurniture[] _gymFurniture;
        [SerializeField] private string _isGymParam = "IsGym";

        private bool _canInteract;
        private bool _isInCar;
        private bool _isUsingTreadmill;
        private GymFurniture _activeGymFurniture;
        private GymFurniture _blockedGymFurniture;
        private int _isGymParamHash;
        private bool _hasUsedAnyGymFurniture;
        private bool _isTrackingTap;
        private int _trackedFingerId = -1;
        private Vector2 _tapStartPosition;
        private float _tapStartTime;

        public event Action CarEntered;
        public event Action TreadmillUsed;
        public PlayerController PlayerController => _playerController;
        public bool IsInCar => _isInCar;
        public bool IsUsingTreadmill => _isUsingTreadmill;

        private void Awake()
        {
            if (_playerController == null) _playerController = GetComponent<PlayerController>();
            if (_playerCollider == null) _playerCollider = GetComponent<Collider>();
            if (_animator == null) _animator = GetComponentInChildren<Animator>();
            if (_interactionCamera == null) _interactionCamera = Camera.main;
            _isGymParamHash = Animator.StringToHash(_isGymParam);
            if (_playerController != null) _playerController.MovementRequested += StopUsingTreadmill;
        }

        private void OnDestroy()
        {
            if (_playerController != null) _playerController.MovementRequested -= StopUsingTreadmill;
        }

        private void Update()
        {
            if (!_canInteract || _isInCar) return;

            if (_blockedGymFurniture != null && !_blockedGymFurniture.ContainsPoint(transform.position))
            {
                _blockedGymFurniture = null;
            }

            if (_isUsingTreadmill)
            {
                return;
            }

            if (TryGetCompletedTap(out Vector2 tapPosition)) TryInteract(tapPosition);
        }

        public void SetInteractionEnabled(bool enabled)
        {
            _canInteract = enabled;
            if (!enabled) _isTrackingTap = false;
        }

        public void SetInteractionCamera(Camera interactionCamera)
        {
            _interactionCamera = interactionCamera;
        }

        public void SetGymFurniture(GymFurniture[] gymFurniture)
        {
            _gymFurniture = gymFurniture;
        }

      

        public void ExitCar()
        {
            if (!_isInCar) return;

            _isInCar = false;
            if (_carExitPoint != null)
            {
                transform.SetPositionAndRotation(_carExitPoint.position, _carExitPoint.rotation);
            }

            SetPlayerAvailable(true);
        }

        public void StopUsingTreadmill()
        {
            if (!_isUsingTreadmill) return;

            _isUsingTreadmill = false;
            _blockedGymFurniture = _activeGymFurniture;
            _activeGymFurniture = null;
            SetPlayerAvailable(true);
            if (_animator != null) _animator.SetBool(_isGymParamHash, false);
        }

        private void TryInteract(Vector2 screenPosition)
        {
            if (_interactionCamera == null) return;

            Ray ray = _interactionCamera.ScreenPointToRay(screenPosition);
            if (Physics.Raycast(ray, out RaycastHit interactionHit, _interactionCamera.farClipPlane,
                    _interactionMask, QueryTriggerInteraction.Collide)
                && BelongsTo(interactionHit.collider, _carInteraction))
            {
                if (!IsWithinInteractionDistance(_carInteraction)) return;
                EnterCar();
                return;
            }

            if (!Physics.Raycast(ray, out RaycastHit gymHit, _interactionCamera.farClipPlane,
                    _gymInteractionMask, QueryTriggerInteraction.Collide)) return;

            GymFurniture gymFurniture = FindGymFurniture(gymHit.collider);
            if (_blockedGymFurniture == null
                && gymFurniture != null
                && IsWithinInteractionDistance(gymHit.collider))
            {
                UseGymFurniture(gymFurniture);
            }
        }

        private bool IsWithinInteractionDistance(Collider interactionCollider)
        {
            if (interactionCollider == null) return false;

            Vector3 closestPoint = interactionCollider.ClosestPoint(transform.position);
            return (closestPoint - transform.position).sqrMagnitude
                   <= _interactionDistance * _interactionDistance;
        }

        private void EnterCar()
        {
            _isInCar = true;
            SetPlayerAvailable(false);
            CarEntered?.Invoke();
        }

        private void UseGymFurniture(GymFurniture gymFurniture)
        {
            if (!_hasUsedAnyGymFurniture)
            {
                _hasUsedAnyGymFurniture = true;
                DeactivateAllGymArrows();
            }

            _isUsingTreadmill = true;
            _activeGymFurniture = gymFurniture;
            if (_playerController != null) _playerController.IsWorking = false;

            if (gymFurniture.PosPlayer != null)
            {
                if (_playerController != null)
                {
                    _playerController.Teleport(gymFurniture.PosPlayer);
                }
                else
                {
                    transform.SetPositionAndRotation(gymFurniture.PosPlayer.position, gymFurniture.PosPlayer.rotation);
                }
            }

            if (_animator != null)
            {
                _animator.SetBool(_isGymParamHash, true);
            }

            TreadmillUsed?.Invoke();
        }

        private void DeactivateAllGymArrows()
        {
            if (_gymFurniture == null) return;

            foreach (GymFurniture gymFurniture in _gymFurniture)
            {
                if (gymFurniture != null) gymFurniture.DeactivateArrow();
            }
        }

        private GymFurniture FindGymFurniture(Collider hitCollider)
        {
            if (_gymFurniture == null) return null;

            foreach (GymFurniture gymFurniture in _gymFurniture)
            {
                if (gymFurniture != null && gymFurniture.Contains(hitCollider)) return gymFurniture;
            }

            return null;
        }

        private void SetPlayerAvailable(bool available)
        {
            if (_playerController != null) _playerController.IsWorking = available;
            if (_playerCollider != null) _playerCollider.enabled = available;
            if (_playerVisual != null) _playerVisual.SetActive(available);
        }

        private static bool BelongsTo(Collider hitCollider, Collider interactionCollider)
        {
            if (hitCollider == null || interactionCollider == null) return false;
            return hitCollider == interactionCollider
                   || hitCollider.transform.IsChildOf(interactionCollider.transform)
                   || interactionCollider.transform.IsChildOf(hitCollider.transform);
        }

        private bool TryGetCompletedTap(out Vector2 tapPosition)
        {
            tapPosition = Vector2.zero;
#if UNITY_EDITOR || UNITY_STANDALONE
            if (Input.GetMouseButtonDown(0))
            {
                BeginTap(Input.mousePosition, -1);
            }

            if (!Input.GetMouseButtonUp(0) || !_isTrackingTap) return false;

            tapPosition = Input.mousePosition;
            return CompleteTap(tapPosition);
#else
            for (int touchIndex = 0; touchIndex < Input.touchCount; touchIndex++)
            {
                Touch touch = Input.GetTouch(touchIndex);
                if (!_isTrackingTap && touch.phase == TouchPhase.Began)
                {
                    BeginTap(touch.position, touch.fingerId);
                    continue;
                }

                if (!_isTrackingTap || touch.fingerId != _trackedFingerId) continue;
                if (touch.phase == TouchPhase.Canceled)
                {
                    _isTrackingTap = false;
                    return false;
                }

                if (touch.phase != TouchPhase.Ended) continue;
                tapPosition = touch.position;
                return CompleteTap(tapPosition);
            }

            return false;
#endif
        }

        private void BeginTap(Vector2 position, int fingerId)
        {
            _isTrackingTap = true;
            _trackedFingerId = fingerId;
            _tapStartPosition = position;
            _tapStartTime = Time.unscaledTime;
        }

        private bool CompleteTap(Vector2 position)
        {
            _isTrackingTap = false;
            float maxMovementSqr = _tapMaxMovement * _tapMaxMovement;
            return (position - _tapStartPosition).sqrMagnitude <= maxMovementSqr
                   && Time.unscaledTime - _tapStartTime <= _tapMaxDuration;
        }
    }
}
