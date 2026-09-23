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

        [Tooltip("Finish flag. Reach or pass within Home Distance while carrying the egg to win.")] [SerializeField]
        private Transform _home;

        [Header("UI")] [SerializeField] private Button _stealButton;
        [SerializeField] private GameObject _runUI;

        [Header("Distances")] [SerializeField] private float _homeDistance = 2f;

        [Header("Restart")]
        [SerializeField, Min(0f)] private float _restartDelay = 1f;


        [Header("Tutorial")] [Tooltip("Guide from Player to Egg, then to the finish flag (Home).")] [SerializeField]
        private TutorialLineIndicator _tutorialLineIndicator;

        private Vector3 _playerStartPosition;
        private Quaternion _playerStartRotation;
        private Vector3 _monsterStartPosition;
        private Quaternion _monsterStartRotation;
        private Transform _playerTransform;
        private Rigidbody _playerBody;
        private bool _initialized;
        private bool _started;
        private Vector3 _previousEscapePosition;
        private float _restartTimer;

        public GameState State { get; private set; }

        private void Awake()
        {
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
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
            RefreshTutorial();
        }

        private void Start()
        {
            _started = true;
            ResetGame();
        }

        private void OnDisable()
        {
            HideTutorial();
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

            if (State == GameState.Lost)
            {
                _restartTimer -= Time.deltaTime;
                if (_restartTimer <= 0f) ResetGame();
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
            SetActiveIfChanged(_home.gameObject, true);
            _monster.StartChasing(_playerTransform);
            _previousEscapePosition = _playerTransform.position;
            SetState(GameState.Escaping);
            CheckFinishFlag();
        }

        public void ResetGame()
        {
            // Start runs after Player/Monster Awake, avoiding initialization-order dependencies.
            if (!_initialized || !_started || _player == null || _monster == null || _egg == null) return;

            _restartTimer = 0f;
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
            _player.ResetPlayer(_playerStartPosition, _playerStartRotation);
            _player.IsWorking = true;
            _previousEscapePosition = _playerTransform.position;
            _monster.ResetMonster(_monsterStartPosition, _monsterStartRotation);

            _egg.ResetEgg();
            _monster.StartPatrolling(_egg.transform);
            HideTutorial();
            SetState(GameState.LookingForEgg);
            RefreshUI();
            RefreshTutorial();
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
            _restartTimer = Mathf.Max(0f, _restartDelay);
            StopPlayer();
            // The monster remains in Attacking until the round resets.
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
            RefreshTutorial();
        }

        private void RefreshTutorial()
        {
            if (_tutorialLineIndicator == null) return;

            Transform target = null;
            if (_initialized && _started && isActiveAndEnabled && _playerTransform != null)
            {
                if (State == GameState.LookingForEgg || State == GameState.CanStealEgg)
                    target = _egg != null ? _egg.transform : null;
                else if (State == GameState.Escaping)
                    target = _home;
            }

            if (target != null) _tutorialLineIndicator.StartDraw(target, _playerTransform);
            else _tutorialLineIndicator.StopDraw();
        }

        private void HideTutorial()
        {
            if (_tutorialLineIndicator != null) _tutorialLineIndicator.StopDraw();
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
            if (_tutorialLineIndicator == null)
                _tutorialLineIndicator = GetComponentInChildren<TutorialLineIndicator>(true);
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
