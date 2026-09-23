using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public enum GameState
        {
            LookingForEgg,
            CanStealEgg,
            Escaping,
            Lost,
            Won
        }

        [Header("Gameplay References")] [SerializeField]
        private PlayerController _player;

        [SerializeField] private Monster _monster;
        [SerializeField] private Egg _egg;
        [SerializeField] private Transform _eggHoldPoint;
        [Tooltip("Finish flag. Reach or pass within Home Distance while carrying the egg to win.")]
        [SerializeField] private Transform _home;

        [Header("UI")] [SerializeField] private Button _stealButton;
        [SerializeField] private GameObject _runUI;

        [Header("Distances")]
        [SerializeField] private float _homeDistance = 2f;


        [Header("Tutorial Trail")] [SerializeField]
        private bool _showTutorialTrail = true;

        [Tooltip("Optional scene TrailRenderer. A default trail is created when empty.")] [SerializeField]
        private TrailRenderer _tutorialTrail;

        [SerializeField, Min(0.1f)] private float _tutorialTrailSpeed = 8f;
        [SerializeField, Min(0.01f)] private float _tutorialTrailLifetime = 0.5f;
        [SerializeField, Min(0.01f)] private float _tutorialTrailWidth = 0.18f;
        [SerializeField] private float _tutorialTrailHeight = 0.3f;
        [SerializeField, Min(0f)] private float _tutorialTrailRepeatDelay = 0.3f;

        private Transform _tutorialTarget;
        private float _tutorialTravel;
        private float _tutorialWait;

        private Vector3 _playerStartPosition;
        private Quaternion _playerStartRotation;
        private Vector3 _monsterStartPosition;
        private Quaternion _monsterStartRotation;
        private Transform _playerTransform;
        private Rigidbody _playerBody;
        private bool _initialized;
        private bool _started;
        private Vector3 _previousEscapePosition;

        public GameState State { get; private set; }

        private void Awake()
        {
            CacheInitialState();
        }

        private void OnEnable()
        {
            if (!_initialized) return;
            _previousEscapePosition = _playerTransform.position;
            if (_stealButton != null)
            {
                _stealButton.onClick.AddListener(StealEgg);
            }

            if (_monster != null)
            {
                _monster.OnPlayerReached += HandlePlayerCaught;
            }

            _egg.RangeChanged += RefreshEggState;
            RefreshEggState();
            RefreshUI();
        }

        private void Start()
        {
            _started = true;
            ResetGame();
        }

        private void OnDisable()
        {
            HideTutorialTrail();
            if (_egg != null) _egg.RangeChanged -= RefreshEggState;
            if (_stealButton != null) SetActiveIfChanged(_stealButton.gameObject, false);
            if (_stealButton != null)
            {
                _stealButton.onClick.RemoveListener(StealEgg);
            }

            if (_monster != null)
            {
                _monster.OnPlayerReached -= HandlePlayerCaught;
            }
        }

        private void Update()
        {
            if (!_initialized || !_started)
            {
                return;
            }

            CheckFinishFlag();
        }

        private void CheckFinishFlag()
        {
            if (State != GameState.Escaping || _egg == null || !_egg.IsHeld ||
                _playerTransform == null || _home == null) return;

            Vector3 currentPosition = _playerTransform.position;
            bool reachedFlag = HorizontalSegmentSqrDistance(_previousEscapePosition, currentPosition, _home.position)
                               <= _homeDistance * _homeDistance;
            _previousEscapePosition = currentPosition;
            if (reachedFlag) Win();
        }

        public void StealEgg()
        {
            if (!_initialized || !_started || !isActiveAndEnabled ||
                State != GameState.CanStealEgg || _eggHoldPoint == null ||
                _egg == null || _player == null || _monster == null)
            {
                return;
            }

            if (!_egg.TryPickUp(_player, _eggHoldPoint))
            {
                RefreshEggState();
                return;
            }

            _player.SetCarryingEgg(true);
            _monster.StartChasing(_playerTransform);
            _previousEscapePosition = _playerTransform.position;
            SetState(GameState.Escaping);
            CheckFinishFlag();
        }

        public void ResetGame()
        {
            // Start runs after Player/Monster Awake, avoiding initialization-order dependencies.
            if (!_initialized || !_started || _player == null || _monster == null || _egg == null) return;

            _player.ResetPlayer(_playerStartPosition, _playerStartRotation);
            _player.IsWorking = true;
            _previousEscapePosition = _playerTransform.position;
            _monster.ResetMonster(_monsterStartPosition, _monsterStartRotation);

            _egg.ResetEgg();
            HideTutorialTrail();
            SetState(GameState.LookingForEgg);
            RefreshUI();
            RefreshTutorialTrail();
        }

        private void HandlePlayerCaught()
        {
            if (!_initialized || !_started || !isActiveAndEnabled || State != GameState.Escaping)
            {
                return;
            }

            // Resolve arrival first if the monster callback runs before our Update this frame.
            CheckFinishFlag();
            if (State != GameState.Escaping) return;
            SetState(GameState.Lost);
            StopPlayer();
            _monster.Stop();
            if (GameManager.Instance != null) GameManager.Instance.ShowFailPanel();
            else Debug.LogError("GameManager is required to show the lose panel.", this);
        }

        private void Win()
        {
            if (State != GameState.Escaping) return;
            SetState(GameState.Won);
            StopPlayer();
            _monster.Stop();
            if (GameManager.Instance != null) GameManager.Instance.ShowWinPanel();
            else Debug.LogError("GameManager is required to show the win panel.", this);
        }

        private void SetState(GameState newState)
        {
            if (State == newState) return;
            State = newState;
            RefreshUI();
            RefreshTutorialTrail();
        }

        private void LateUpdate()
        {
            RefreshTutorialTrail();
            if (_tutorialTarget == null || _tutorialTrail == null) return;

            if (_tutorialWait > 0f)
            {
                _tutorialWait -= Time.deltaTime;
                if (_tutorialWait > 0f) return;
                _tutorialTravel = 0f;
                _tutorialTrail.Clear();
            }

            Vector3 start = _playerTransform.position + Vector3.up * _tutorialTrailHeight;
            Vector3 end = _tutorialTarget.position;
            // Keep the guide at the player's feet, even if the egg pivot is raised.
            end.y = start.y;
            float distance = Vector3.Distance(start, end);
            _tutorialTravel += Mathf.Max(0.1f, _tutorialTrailSpeed) * Time.deltaTime;
            _tutorialTrail.transform.position = Vector3.Lerp(start, end,
                distance > 0.001f ? _tutorialTravel / distance : 1f);
            _tutorialTrail.emitting = true;
            if (_tutorialTravel >= distance)
            {
                _tutorialTrail.emitting = false;
                _tutorialWait = Mathf.Max(0.01f, _tutorialTrailLifetime + _tutorialTrailRepeatDelay);
            }
        }

        private void RefreshTutorialTrail()
        {
            Transform target = null;
            if (_showTutorialTrail && _initialized && _started && isActiveAndEnabled && _playerTransform != null)
            {
                if (State == GameState.LookingForEgg || State == GameState.CanStealEgg) target = _egg != null ? _egg.transform : null;
                else if (State == GameState.Escaping) target = _home;
            }

            if (target == null)
            {
                HideTutorialTrail();
                return;
            }

            if (_tutorialTrail == null)
            {
                var guide = new GameObject("Tutorial Trail");
                guide.transform.SetParent(transform, false);
                _tutorialTrail = guide.AddComponent<TrailRenderer>();
                _tutorialTrail.sharedMaterial = Resources.Load<Material>("TutorialTrail");
                _tutorialTrail.startColor = new Color(1f, 0.85f, 0.15f, 1f);
                _tutorialTrail.endColor = new Color(1f, 0.85f, 0.15f, 0f);
                _tutorialTrail.startWidth = _tutorialTrailWidth;
                _tutorialTrail.endWidth = 0f;
                _tutorialTrail.minVertexDistance = 0.05f;
                _tutorialTrail.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                _tutorialTrail.receiveShadows = false;
            }

            _tutorialTrail.autodestruct = false;
            _tutorialTrail.time = Mathf.Max(0.01f, _tutorialTrailLifetime);
            if (_tutorialTarget == target) return;
            _tutorialTarget = target;
            _tutorialTravel = 0f;
            _tutorialWait = 0f;
            _tutorialTrail.emitting = false;
            _tutorialTrail.Clear();
            _tutorialTrail.transform.position = _playerTransform.position + Vector3.up * _tutorialTrailHeight;
            _tutorialTrail.enabled = true;
        }

        private void HideTutorialTrail()
        {
            _tutorialTarget = null;
            if (_tutorialTrail == null) return;
            _tutorialTrail.emitting = false;
            _tutorialTrail.Clear();
            _tutorialTrail.enabled = false;
        }

        private void RefreshUI()
        {
            if (_stealButton != null)
            {
                SetActiveIfChanged(_stealButton.gameObject, State == GameState.CanStealEgg);
            }

            if (_runUI != null)
            {
                SetActiveIfChanged(_runUI, State == GameState.Escaping);
            }
        }

        private void CacheInitialState()
        {
            if (_player == null || _monster == null || _egg == null || _eggHoldPoint == null || _home == null)
            {
                Debug.LogError("GameController requires Player, Monster, Egg, Egg Hold Point and Home references.",
                    this);
                if (_stealButton != null) SetActiveIfChanged(_stealButton.gameObject, false);
                if (_runUI != null) SetActiveIfChanged(_runUI, false);
                enabled = false;
                return;
            }

            _playerTransform = _player.transform;
            _playerBody = _player.GetComponent<Rigidbody>();
            _playerStartPosition = _playerTransform.position;
            _playerStartRotation = _playerTransform.rotation;
            _monsterStartPosition = _monster.transform.position;
            _monsterStartRotation = _monster.transform.rotation;
            _egg.BindPlayer(_player);

            _initialized = true;
        }

        private void RefreshEggState()
        {
            if (!_initialized || !_started || !isActiveAndEnabled) return;
            if (State != GameState.LookingForEgg && State != GameState.CanStealEgg) return;
            SetState(_egg != null && _egg.CanSteal ? GameState.CanStealEgg : GameState.LookingForEgg);
        }

        private void StopPlayer()
        {
            if (_player != null) _player.IsWorking = false;
            if (_playerBody == null || _playerBody.isKinematic) return;
            // Stopping input alone leaves the last horizontal physics velocity active.
            Vector3 velocity = _playerBody.linearVelocity;
            velocity.x = 0f;
            velocity.z = 0f;
            _playerBody.linearVelocity = velocity;
        }

        private static void SetActiveIfChanged(GameObject target, bool active)
        {
            if (target.activeSelf != active) target.SetActive(active);
        }

        private void OnValidate()
        {
            _homeDistance = Mathf.Max(0f, _homeDistance);
        }

        private static float HorizontalSegmentSqrDistance(Vector3 start, Vector3 end, Vector3 point)
        {
            start.y = 0f;
            end.y = 0f;
            point.y = 0f;
            Vector3 segment = end - start;
            float lengthSquared = segment.sqrMagnitude;
            float t = lengthSquared > 0.000001f
                ? Mathf.Clamp01(Vector3.Dot(point - start, segment) / lengthSquared)
                : 0f;
            return (point - (start + segment * t)).sqrMagnitude;
        }
    }
}
