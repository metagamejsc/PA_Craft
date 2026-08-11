using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        /// <summary>
        /// Một loại quái trên hotbar. Tap vào ô hotbar để chọn loại quái sẽ spawn.
        /// </summary>
        [Serializable]
        public class MonsterKind
        {
            [Tooltip("Tên để dễ nhìn trong inspector")]
            public string Name;

            [Tooltip("Prefab quái của loại này. Để trống sẽ dùng Monster Prefab mặc định")]
            public Monster Prefab;

            [Tooltip("Ô hotbar tương ứng (RectTransform). Tap vào đây để chọn loại quái này")]
            public RectTransform HotbarSlot;

            [Tooltip("Object highlight bật khi ô hotbar này đang được chọn. " +
                     "Bỏ trống sẽ tự tìm object con tên 'Chose' trong Hotbar Slot")]
            public GameObject SelectedIndicator;

            [Tooltip("Số quái tạo sẵn lúc load (inactive) để lần tap đầu không bị khựng")]
            public int PrewarmCount = 1;

            [NonSerialized] public List<Monster> Pool;
        }

        /// <summary>
        /// Một bước tutorial: vị trí trên màn hình mà player phải tap để spawn quái.
        /// </summary>
        [Serializable]
        public class MonsterSpawnPoint
        {
            [Tooltip("Vị trí trên màn hình của bước này (RectTransform trong Canvas UI). " +
                     "Image mục tiêu và bàn tay sẽ được di chuyển tới đây")]
            public RectTransform ScreenZone;

            [Tooltip("Bù trừ vị trí world sau khi raycast từ điểm tap xuống ground")]
            public Vector3 WorldOffset;

            [Tooltip("Bán kính tap phụ (pixel) ngoài vùng image mục tiêu, 0 = chỉ nhận tap trong image")]
            public float ExtraTapRadius = 0f;

            [Tooltip("Tắt (mặc định): spawn loại quái đang chọn trên hotbar. " +
                     "Bật: buộc bước này spawn loại quái theo Forced Monster Index")]
            public bool ForceMonster;

            [Tooltip("Index loại quái trong Monster Kinds, chỉ dùng khi Force Monster được bật")]
            public int ForcedMonsterIndex;

            [NonSerialized] public bool IsUsed;

            [NonSerialized] public Vector3 CachedWorldPosition;
        }

        private enum Phase
        {
            /// <summary>Đang đi qua từng MonsterSpawnPoint, chỉ nhận tap đúng vào image mục tiêu.</summary>
            Guided,

            /// <summary>Đã xong hết spawn point, cho tap tự do lên màn hình để spawn quái.</summary>
            FreeTap,

            /// <summary>Đã spawn đủ số lượng yêu cầu.</summary>
            Completed
        }

        private struct ActiveMonster
        {
            public Monster Instance;
            public int KindIndex;
        }

        private struct ActiveVfx
        {
            public GameObject Instance;
            public float ReleaseTime;
        }

        [Header("References")] [SerializeField]
        private Camera _worldCamera;

        [SerializeField] private Canvas _uiCanvas;

        [Tooltip("Prefab mặc định dùng cho loại quái không gán Prefab riêng")] [SerializeField]
        private Monster _monsterPrefab;

        [SerializeField] private Transform _monsterParent;

        [Header("Monster Kinds (hotbar)")] [Tooltip("4 loại quái tương ứng 4 ô trên hotbar")] [SerializeField]
        private List<MonsterKind> _monsterKinds = new List<MonsterKind>();

        [Tooltip("Loại quái được chọn sẵn khi vào game")] [SerializeField]
        private int _defaultMonsterIndex = 0;

        [Tooltip("Tên object con dùng làm highlight, tự tìm khi Selected Indicator bỏ trống")] [SerializeField]
        private string _selectedIndicatorChildName = "Chose";

        [Header("Spawn Points (screen -> world)")] [SerializeField]
        private List<MonsterSpawnPoint> _spawnPoints = new List<MonsterSpawnPoint>();

        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private float _groundHeight = 0f;
        [SerializeField] private float _rayMaxDistance = 500f;
        [SerializeField] private float _monsterWanderRadius = 3f;
        [SerializeField] private int _maxMonster = 12;

        [Tooltip("Prewarm dùng cho loại quái có Prewarm Count <= 0")] [SerializeField]
        private int _monsterPrewarmCount = 1;

        [Header("Tutorial Target")]
        [Tooltip("Image mục tiêu duy nhất, di chuyển tới spawn point hiện tại. Player phải tap đúng vào image này")]
        [SerializeField]
        private RectTransform _tapTargetImage;

        [Tooltip("Object bàn tay duy nhất, trỏ tới image mục tiêu")] [SerializeField]
        private RectTransform _tapHint;

        [Tooltip("Lệch vị trí bàn tay so với tâm image mục tiêu (đơn vị canvas)")] [SerializeField]
        private Vector2 _tapHintOffset = Vector2.zero;

        [Tooltip("Thời gian chờ trước khi hiện bàn tay (image mục tiêu hiện ngay từ đầu)")] [SerializeField]
        private float _hintStartDelay = 0.35f;

        [Header("Free Tap")]
        [Tooltip("Số quái phải spawn bằng tap tự do sau khi xong hết spawn point. 0 = không giới hạn")]
        [SerializeField]
        private int _freeTapSpawnCount = 3;

        [Tooltip("Bỏ qua tap tự do khi ngón tay đang ở trên UI khác (hotbar luôn được xử lý riêng)")] [SerializeField]
        private bool _ignoreFreeTapOverUI = true;

        [Header("VFX")] [SerializeField] private GameObject _spawnVfxPrefab;
        [SerializeField] private float _spawnVfxLifeTime = 2f;

        [Tooltip("Chỉ chạy VFX ở các bước tap vào image mục tiêu")] [SerializeField]
        private bool _vfxOnlyOnTargetSpawn = true;

        [SerializeField] private int _vfxPrewarmCount = 2;

        [SerializeField] private bool _showVfxAtGuidedPoint = true;

        [SerializeField] private float _guideVfxRestartInterval = 0f;

        [SerializeField] private float _guideVfxFollowInterval = 0.1f;

        [SerializeField] private Vector3 _spawnVfxRotationEuler = new Vector3(-90f, 0f, 0f);


        [SerializeField] private int _guideVfxStartFrameDelay = 2;

        [Header("Events")] [Tooltip("Gọi khi player đã spawn đủ số quái yêu cầu")] [SerializeField]
        private UnityEvent _onAllMonstersSpawned;

        private readonly List<ActiveMonster> _monsters = new List<ActiveMonster>();
        private readonly List<GameObject> _vfxPool = new List<GameObject>();
        private readonly List<ActiveVfx> _activeVfx = new List<ActiveVfx>();

        private readonly Dictionary<GameObject, ParticleSystem[]> _vfxParticles =
            new Dictionary<GameObject, ParticleSystem[]>();

        private readonly List<RaycastResult> _raycastResults = new List<RaycastResult>();
        private readonly List<Monster> _fallbackPool = new List<Monster>();

        private PointerEventData _pointerEventData;
        private Plane _groundPlane;
        private Camera _uiCamera;
        private Phase _phase = Phase.Guided;
        private int _guidedIndex;
        private int _selectedKindIndex;
        private int _freeTapSpawned;
        private float _hintDelayTimer;
        private bool _hintShown;
        private GameObject _guideVfx;
        private bool _guideVfxStarted;
        private float _guideVfxRestartTime;
        private float _guideVfxRefreshTime;
        private Vector2 _guideVfxScreenPosition;
        private Vector3 _guideVfxCameraPosition;
        private Quaternion _guideVfxCameraRotation;
        private Transform _worldCameraTransform;
        private Quaternion _spawnVfxRotation;
        private int _guideVfxStartFrame;

        /// <summary>Đang ở giai đoạn tap theo hướng dẫn (chưa xong hết MonsterSpawnPoint).</summary>
        public bool IsGuided => _phase == Phase.Guided;

        private void Awake()
        {
            if (_worldCamera == null)
            {
                _worldCamera = Camera.main;
            }

            if (_worldCamera != null)
            {
                _worldCameraTransform = _worldCamera.transform;
            }

            _uiCamera = _uiCanvas != null && _uiCanvas.renderMode != RenderMode.ScreenSpaceOverlay
                ? _uiCanvas.worldCamera
                : null;

            _groundPlane = new Plane(Vector3.up, new Vector3(0f, _groundHeight, 0f));
        }

        private void Start()
        {
            ResolveHotbarIndicators();

            _selectedKindIndex = ClampKindIndex(_defaultMonsterIndex);
            RefreshHotbarIndicators();

            _hintDelayTimer = _hintStartDelay;
            _phase = _spawnPoints.Count > 0 ? Phase.Guided : Phase.FreeTap;

            ShowHand(false);

            MoveTargetToCurrentPoint();

            CacheSpawnPoints();

            MonsterSpawnPoint point = GetSpawnPoint(_guidedIndex);

            if (point != null)
            {
                ShowGuideVfx(point);
            }

            _hintShown = _phase != Phase.Guided;
        }

        private void Update()
        {
            UpdateHintDelay();
            UpdateActiveVfx();
            UpdateGuideVfx();

            if (TryGetTapPosition(out Vector2 screenPosition))
            {
                HandleTap(screenPosition);
            }
        }

        #region Prewarm / Pool

        private void PrewarmPool(MonsterKind kind, List<Monster> pool, int count)
        {
            for (int i = 0; i < count; i++)
            {
                Monster monster = CreateMonster(kind);

                if (monster == null)
                {
                    break;
                }

                monster.gameObject.SetActive(false);
                pool.Add(monster);
            }
        }

        private Monster CreateMonster(MonsterKind kind)
        {
            Monster prefab = kind != null && kind.Prefab != null ? kind.Prefab : _monsterPrefab;

            return prefab != null
                ? Instantiate(prefab, _monsterParent)
                : null;
        }

        private Monster GetMonsterFromPool(int kindIndex)
        {
            MonsterKind kind = GetKind(kindIndex);
            List<Monster> pool;

            if (kind == null)
            {
                // Chưa cấu hình Monster Kinds: chạy bằng Monster Prefab mặc định.
                pool = _fallbackPool;
            }
            else
            {
                if (kind.Pool == null)
                {
                    kind.Pool = new List<Monster>();
                }

                pool = kind.Pool;
            }

            while (pool.Count > 0)
            {
                int lastIndex = pool.Count - 1;
                Monster pooled = pool[lastIndex];
                pool.RemoveAt(lastIndex);

                if (pooled == null)
                {
                    continue;
                }

                pooled.gameObject.SetActive(true);
                return pooled;
            }

            return CreateMonster(kind);
        }

        private void ReleaseMonster(ActiveMonster active)
        {
            if (active.Instance == null)
            {
                return;
            }

            active.Instance.Despawn();

            MonsterKind kind = GetKind(active.KindIndex);

            if (kind == null)
            {
                _fallbackPool.Add(active.Instance);
                return;
            }

            if (kind.Pool == null)
            {
                kind.Pool = new List<Monster>();
            }

            kind.Pool.Add(active.Instance);
        }

        #endregion

        #region Hotbar

        /// <summary>
        /// Tap vào ô hotbar nào thì chọn loại quái đó. Trả về true nếu tap đã bị hotbar tiêu thụ.
        /// </summary>
        private bool TrySelectKindFromHotbar(Vector2 screenPosition)
        {
            for (int i = 0; i < _monsterKinds.Count; i++)
            {
                MonsterKind kind = _monsterKinds[i];

                if (kind == null || kind.HotbarSlot == null)
                {
                    continue;
                }

                if (!RectTransformUtility.RectangleContainsScreenPoint(
                        kind.HotbarSlot,
                        screenPosition,
                        _uiCamera))
                {
                    continue;
                }

                SelectKind(i);
                return true;
            }

            return false;
        }

        /// <summary>
        /// Chọn loại quái sẽ spawn ở các lần tap tiếp theo. Có thể gọi từ Button OnClick trên hotbar.
        /// </summary>
        public void SelectKind(int kindIndex)
        {
            if (GetKind(kindIndex) == null || kindIndex == _selectedKindIndex)
            {
                return;
            }

            _selectedKindIndex = kindIndex;
            RefreshHotbarIndicators();
        }

        /// <summary>
        /// Ô hotbar nào chưa gán Selected Indicator thì tự lấy object con tên "Chose".
        /// Transform.Find tìm được cả object con đang tắt nên không cần bật sẵn trong prefab.
        /// </summary>
        private void ResolveHotbarIndicators()
        {
            if (string.IsNullOrEmpty(_selectedIndicatorChildName))
            {
                return;
            }

            for (int i = 0; i < _monsterKinds.Count; i++)
            {
                MonsterKind kind = _monsterKinds[i];

                if (kind == null || kind.SelectedIndicator != null || kind.HotbarSlot == null)
                {
                    continue;
                }

                Transform indicator = kind.HotbarSlot.Find(_selectedIndicatorChildName);

                if (indicator != null)
                {
                    kind.SelectedIndicator = indicator.gameObject;
                }
            }
        }

        private void RefreshHotbarIndicators()
        {
            for (int i = 0; i < _monsterKinds.Count; i++)
            {
                MonsterKind kind = _monsterKinds[i];

                if (kind == null || kind.SelectedIndicator == null)
                {
                    continue;
                }

                bool isSelected = i == _selectedKindIndex;

                if (kind.SelectedIndicator.activeSelf != isSelected)
                {
                    kind.SelectedIndicator.SetActive(isSelected);
                }
            }
        }

        private MonsterKind GetKind(int kindIndex)
        {
            return kindIndex >= 0 && kindIndex < _monsterKinds.Count ? _monsterKinds[kindIndex] : null;
        }

        private int ClampKindIndex(int kindIndex)
        {
            return _monsterKinds.Count == 0 ? -1 : Mathf.Clamp(kindIndex, 0, _monsterKinds.Count - 1);
        }

        #endregion

        #region Tutorial target / hand

        private void UpdateHintDelay()
        {
            if (_hintShown)
            {
                return;
            }

            _hintDelayTimer -= Time.deltaTime;

            if (_hintDelayTimer > 0f)
            {
                return;
            }

            _hintShown = true;
            MoveTargetToCurrentPoint();
        }

        /// <summary>
        /// Đưa image mục tiêu + bàn tay tới spawn point đang chờ tap.
        /// Bàn tay chỉ hiện sau khi hết Hint Start Delay.
        /// </summary>
        private void MoveTargetToCurrentPoint()
        {
            MonsterSpawnPoint spawnPoint = GetSpawnPoint(_guidedIndex);

            if (spawnPoint == null || spawnPoint.ScreenZone == null)
            {
                ShowTarget(false);
                ShowHand(false);
                HideGuideVfx();
                return;
            }

            // VFX đứng sẵn ngay tại chỗ quái sắp rơi xuống, cùng lúc với image mục tiêu.
            // Lần đầu (ở Start) bị bỏ qua vì camera/canvas chưa sẵn sàng; EnsureGuideVfxStarted
            // sẽ dựng lại ở Update đầu tiên khi mọi thứ đã đúng vị trí.
            if (_guideVfxStarted)
            {
                ShowGuideVfx(spawnPoint);
            }

            Vector3 targetPosition = spawnPoint.ScreenZone.position;

            if (_tapTargetImage != null)
            {
                _tapTargetImage.position = targetPosition;
                ShowTarget(true);
                targetPosition = _tapTargetImage.position;
            }

            if (_tapHint == null)
            {
                return;
            }

            _tapHint.position = targetPosition;

            if (_tapHintOffset != Vector2.zero)
            {
                _tapHint.anchoredPosition += _tapHintOffset;
            }

            ShowHand(_hintShown);
        }

        private void ShowTarget(bool show)
        {
            if (_tapTargetImage == null || _tapTargetImage.gameObject.activeSelf == show)
            {
                return;
            }

            _tapTargetImage.gameObject.SetActive(show);
        }

        private void ShowHand(bool show)
        {
            if (_tapHint == null || _tapHint.gameObject.activeSelf == show)
            {
                return;
            }

            _tapHint.gameObject.SetActive(show);
        }

        #endregion

        #region Input

        private bool TryGetTapPosition(out Vector2 screenPosition)
        {
            screenPosition = Vector2.zero;

            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                if (touch.phase != TouchPhase.Began)
                {
                    return false;
                }

                screenPosition = touch.position;
                return true;
            }

            if (Input.GetMouseButtonDown(0))
            {
                screenPosition = Input.mousePosition;
                return true;
            }

            return false;
        }

        private void HandleTap(Vector2 screenPosition)
        {
            // Hotbar được ưu tiên: đổi loại quái, không spawn.
            if (TrySelectKindFromHotbar(screenPosition))
            {
                return;
            }

            switch (_phase)
            {
                case Phase.Guided:
                    HandleGuidedTap(screenPosition);
                    break;

                case Phase.FreeTap:
                    HandleFreeTap(screenPosition);
                    break;
            }
        }

        /// <summary>
        /// Giai đoạn hướng dẫn: chỉ nhận tap đúng vào image mục tiêu, tap chỗ khác bị bỏ qua.
        /// </summary>
        private void HandleGuidedTap(Vector2 screenPosition)
        {
            MonsterSpawnPoint spawnPoint = GetSpawnPoint(_guidedIndex);

            if (spawnPoint == null)
            {
                EnterFreeTapPhase();
                return;
            }

            if (!ContainsScreenPoint(spawnPoint, screenPosition))
            {
                return;
            }

            SpawnAtPoint(spawnPoint);
        }

        private void HandleFreeTap(Vector2 screenPosition)
        {
            if (_ignoreFreeTapOverUI && IsPointerOverUI(screenPosition))
            {
                return;
            }

            if (!TryScreenToGround(screenPosition, out Vector3 worldPosition))
            {
                return;
            }

            Debug.Log(1);
            SpawnMonster(_selectedKindIndex, worldPosition);

            if (!_vfxOnlyOnTargetSpawn)
            {
                PlaySpawnVfx(worldPosition);
            }

            _freeTapSpawned++;

            if (_freeTapSpawnCount > 0 && _freeTapSpawned >= _freeTapSpawnCount)
            {
                Complete();
            }
        }

        private bool IsPointerOverUI(Vector2 screenPosition)
        {
            EventSystem eventSystem = EventSystem.current;

            if (eventSystem == null)
            {
                return false;
            }

            if (_pointerEventData == null)
            {
                _pointerEventData = new PointerEventData(eventSystem);
            }

            _pointerEventData.position = screenPosition;
            _raycastResults.Clear();
            eventSystem.RaycastAll(_pointerEventData, _raycastResults);

            return _raycastResults.Count > 0;
        }

        #endregion

        #region Phase

        private void SpawnAtPoint(MonsterSpawnPoint spawnPoint)
        {
            Vector3 worldPosition = spawnPoint.CachedWorldPosition;

            int kindIndex = spawnPoint.ForceMonster
                ? ClampKindIndex(spawnPoint.ForcedMonsterIndex)
                : _selectedKindIndex;

            SpawnMonster(kindIndex, worldPosition);

            HideGuideVfx();
            PlaySpawnVfx(worldPosition);

            spawnPoint.IsUsed = true;

            HideGuideVfx();

            PlaySpawnVfx(worldPosition);

            _guidedIndex++;

            if (_guidedIndex >= _spawnPoints.Count)
            {
                EnterFreeTapPhase();
                return;
            }

            MoveTargetToCurrentPoint();
            ShowGuideVfx(GetSpawnPoint(_guidedIndex));
        }

        /// <summary>
        /// Xong hết MonsterSpawnPoint: ẩn hướng dẫn, mở tap tự do lên màn hình.
        /// </summary>
        private void EnterFreeTapPhase()
        {
            _phase = Phase.FreeTap;
            _guidedIndex = _spawnPoints.Count;
            _hintShown = true;

            ShowTarget(false);
            ShowHand(false);
            HideGuideVfx();

            if (_freeTapSpawnCount <= 0)
            {
                return;
            }

            if (_freeTapSpawned >= _freeTapSpawnCount)
            {
                Complete();
            }
        }

        private void Complete()
        {
            if (_phase == Phase.Completed)
            {
                return;
            }

            _phase = Phase.Completed;
            _onAllMonstersSpawned?.Invoke();
        }

        #endregion

        #region Spawn

        private void SpawnMonster(int kindIndex, Vector3 worldPosition)
        {
            TrimMonsters();

            Monster monster = GetMonsterFromPool(kindIndex);

            if (monster == null)
            {
                Debug.LogWarning("[GameController] Chưa gán Monster Prefab cho loại quái index " + kindIndex);
                return;
            }

            monster.Spawn(worldPosition, _monsterWanderRadius);

            _monsters.Add(new ActiveMonster
            {
                Instance = monster,
                KindIndex = kindIndex
            });
        }

        private void TrimMonsters()
        {
            while (_maxMonster > 0 && _monsters.Count >= _maxMonster)
            {
                ActiveMonster oldest = _monsters[0];
                _monsters.RemoveAt(0);
                ReleaseMonster(oldest);
            }
        }

        /// <summary>
        /// Xác định vị trí world của quái ứng với vùng tap trên màn hình:
        /// bắn ray từ camera qua tâm vùng tap, cắt xuống ground.
        /// </summary>
        private Vector3 ResolveWorldPosition(MonsterSpawnPoint spawnPoint)
        {
            Vector2 screenPosition = GetZoneScreenPosition(spawnPoint);

            TryScreenToGround(screenPosition, out Vector3 worldPosition);

            return worldPosition + spawnPoint.WorldOffset;
        }

        private void CacheSpawnPoints()
        {
            for (int i = 0; i < _spawnPoints.Count; i++)
            {
                MonsterSpawnPoint point = _spawnPoints[i];

                if (point == null || point.ScreenZone == null)
                    continue;

                point.CachedWorldPosition = ResolveWorldPosition(point);
            }
        }

        private bool TryScreenToGround(Vector2 screenPosition, out Vector3 worldPosition)
        {
            if (_worldCamera == null)
            {
                worldPosition = Vector3.zero;
                return false;
            }

            Ray ray = _worldCamera.ScreenPointToRay(screenPosition);

            if (Physics.Raycast(
                    ray,
                    out RaycastHit hit,
                    _rayMaxDistance,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                worldPosition = hit.point;
                return true;
            }

            if (_groundPlane.Raycast(ray, out float distance))
            {
                worldPosition = ray.GetPoint(distance);
                return true;
            }

            worldPosition = Vector3.zero;
            return false;
        }

        /// <summary>
        /// Tap có nằm trong image mục tiêu của bước này hay không.
        /// </summary>
        private bool ContainsScreenPoint(MonsterSpawnPoint spawnPoint, Vector2 screenPosition)
        {
            RectTransform tapArea = _tapTargetImage != null ? _tapTargetImage : spawnPoint.ScreenZone;

            if (tapArea == null)
            {
                return false;
            }

            if (RectTransformUtility.RectangleContainsScreenPoint(tapArea, screenPosition, _uiCamera))
            {
                return true;
            }

            if (spawnPoint.ExtraTapRadius <= 0f)
            {
                return false;
            }

            Vector2 delta = GetZoneScreenPosition(spawnPoint) - screenPosition;

            return delta.sqrMagnitude <= spawnPoint.ExtraTapRadius * spawnPoint.ExtraTapRadius;
        }

        private Vector2 GetZoneScreenPosition(MonsterSpawnPoint spawnPoint)
        {
            return RectTransformUtility.WorldToScreenPoint(
                _uiCamera,
                spawnPoint.ScreenZone.position);
        }

        #endregion

        #region VFX

        private void PlaySpawnVfx(Vector3 worldPosition)
        {
            if (_spawnVfxPrefab == null)
            {
                return;
            }

            GameObject vfx = GetVfxFromPool(worldPosition);

            if (_spawnVfxLifeTime <= 0f)
            {
                return;
            }

            _activeVfx.Add(new ActiveVfx
            {
                Instance = vfx,
                ReleaseTime = Time.time + _spawnVfxLifeTime
            });
        }

        private GameObject GetVfxFromPool(Vector3 worldPosition)
        {
            int lastIndex = _vfxPool.Count - 1;
            GameObject vfx;

            if (lastIndex >= 0)
            {
                vfx = _vfxPool[lastIndex];
                _vfxPool.RemoveAt(lastIndex);
            }
            else
            {
                vfx = null;
            }

            if (vfx == null)
            {
                Debug.Log(4);
                vfx = Instantiate(_spawnVfxPrefab, worldPosition, Quaternion.identity);
            }
            else
            {
                vfx.transform.position = worldPosition;
                vfx.SetActive(true);
            }

            PlayParticles(vfx);
            return vfx;
        }

        /// <summary>
        /// ParticleSystem trong pool đã Awake sẵn lúc prewarm, nên SetActive(true) KHÔNG tự phát lại
        /// khi Play On Awake = false. Phải gọi Play() thủ công thì VFX mới hiện.
        /// </summary>
        private void PlayParticles(GameObject vfx)
        {
            if (vfx == null)
            {
                return;
            }

            if (!_vfxParticles.TryGetValue(vfx, out ParticleSystem[] systems))
            {
                systems = vfx.GetComponentsInChildren<ParticleSystem>(true);
                _vfxParticles[vfx] = systems;
            }

            for (int i = 0; i < systems.Length; i++)
            {
                systems[i].Clear();
                systems[i].Play();
            }
        }

        /// <summary>
        /// Dựng guide VFX cho point hiện tại ở Update đầu tiên. Tới đây mọi Start() đã chạy xong
        /// (camera đã snap vào player) và có thể ép canvas layout, nên raycast ra đúng vị trí ground.
        /// </summary>
        private void EnsureGuideVfxStarted()
        {
            if (_guideVfxStarted || _phase != Phase.Guided)
            {
                return;
            }

            _guideVfxStarted = true;

            // Ép UI layout xong trước khi đổi vị trí point trên màn hình sang world.
            Canvas.ForceUpdateCanvases();

            ShowGuideVfx(GetSpawnPoint(_guidedIndex));
        }

        /// <summary>
        /// Bật VFX ngay trên ground, tại đúng chỗ mà raycast từ camera qua điểm point sẽ chạm tới -
        /// tức là chỗ quái sẽ rơi xuống nếu player tap lúc này.
        /// Instance này KHÔNG vào _activeVfx nên không tự tắt theo Spawn Vfx Life Time.
        /// </summary>
        private void ShowGuideVfx(MonsterSpawnPoint spawnPoint)
        {
            if (!_showVfxAtGuidedPoint || _spawnVfxPrefab == null
                                       || spawnPoint == null || spawnPoint.ScreenZone == null)
            {
                return;
            }

            Vector3 worldPosition = spawnPoint.CachedWorldPosition;

            if (_guideVfx == null)
            {
                _guideVfx = GetVfxFromPool(worldPosition);
            }
            else
            {
                _guideVfx.transform.position = worldPosition;

                if (!_guideVfx.activeSelf)
                {
                    _guideVfx.SetActive(true);
                }

                PlayParticles(_guideVfx);
            }

            _guideVfxRestartTime = _guideVfxRestartInterval > 0f
                ? Time.time + _guideVfxRestartInterval
                : 0f;

            CacheGuideVfxSource(GetZoneScreenPosition(spawnPoint));
        }

        /// <summary>
        /// Camera bám theo player nên cùng một điểm trên màn hình sẽ trỏ tới chỗ khác trên ground
        /// khi player di chuyển. Bắn lại raycast để VFX luôn nằm đúng chỗ quái sẽ rơi.
        /// Chỉ bắn khi camera đã đổi hoặc layout canvas đã đổi, đứng yên thì không tốn raycast nào.
        /// </summary>
        private void RefreshGuideVfxPosition()
        {
            if (_guideVfx == null || _guideVfxFollowInterval <= 0f || Time.time < _guideVfxRefreshTime)
            {
                return;
            }

            _guideVfxRefreshTime = Time.time + _guideVfxFollowInterval;

            MonsterSpawnPoint spawnPoint = GetSpawnPoint(_guidedIndex);

            if (spawnPoint == null || spawnPoint.ScreenZone == null)
            {
                return;
            }

            Vector2 screenPosition = GetZoneScreenPosition(spawnPoint);

            bool cameraMoved = _worldCameraTransform != null
                               && (_worldCameraTransform.position != _guideVfxCameraPosition
                                   || _worldCameraTransform.rotation != _guideVfxCameraRotation);

            bool zoneMoved = (screenPosition - _guideVfxScreenPosition).sqrMagnitude > 0.25f;

            if (!cameraMoved && !zoneMoved)
            {
                return;
            }

            _guideVfx.transform.position = ResolveWorldPosition(spawnPoint);

            CacheGuideVfxSource(screenPosition);
        }

        private void CacheGuideVfxSource(Vector2 screenPosition)
        {
            _guideVfxScreenPosition = screenPosition;
            _guideVfxRefreshTime = Time.time + _guideVfxFollowInterval;

            if (_worldCameraTransform == null)
            {
                return;
            }

            _guideVfxCameraPosition = _worldCameraTransform.position;
            _guideVfxCameraRotation = _worldCameraTransform.rotation;
        }

        private void HideGuideVfx()
        {
            if (_guideVfx == null)
            {
                return;
            }

            _guideVfx.SetActive(false);
            _vfxPool.Add(_guideVfx);

            _guideVfx = null;
            _guideVfxRestartTime = 0f;
        }

        /// <summary>
        /// Prefab VFX kiểu bắn 1 phát rồi tắt thì cần bật lại định kỳ mới thấy liên tục.
        /// Prefab đã Looping thì để Guide Vfx Restart Interval = 0, hàm này không làm gì.
        /// </summary>
        private void UpdateGuideVfx()
        {
            RefreshGuideVfxPosition();

            if (_guideVfx == null || _guideVfxRestartTime <= 0f || Time.time < _guideVfxRestartTime)
            {
                return;
            }

            PlayParticles(_guideVfx);

            _guideVfxRestartTime = Time.time + _guideVfxRestartInterval;
        }

        private void UpdateActiveVfx()
        {
            if (_activeVfx.Count == 0)
            {
                return;
            }

            float now = Time.time;

            for (int i = _activeVfx.Count - 1; i >= 0; i--)
            {
                ActiveVfx entry = _activeVfx[i];

                if (now < entry.ReleaseTime)
                {
                    continue;
                }

                _activeVfx.RemoveAt(i);

                if (entry.Instance == null)
                {
                    continue;
                }

                entry.Instance.SetActive(false);
                _vfxPool.Add(entry.Instance);
            }
        }

        #endregion

        private MonsterSpawnPoint GetSpawnPoint(int index)
        {
            return index >= 0 && index < _spawnPoints.Count ? _spawnPoints[index] : null;
        }
    }
}