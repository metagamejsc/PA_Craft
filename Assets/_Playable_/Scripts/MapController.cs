using System.Collections.Generic;
using TMPro;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public enum Phase
    {
        Tutorial,
        Gameplay
    }

    public class MapController : MonoBehaviour, IMonsterSelector
    {
        private enum TutorialStep
        {
            WaitTransform,
            WaitHotbar0,
            WaitSpawn0,
            WaitHotbar1,
            WaitSpawn1,
            Done
        }

        [SerializeField] private List<HotbarItem> _hotbarItems = new List<HotbarItem>();
        [SerializeField] private Monster _prefabMonster;

        [Header("Spawn Monster")]
        [Tooltip("2 vị trí cố định (đặt sẵn trong Editor) để hand tutorial trỏ tới và player tap vào để spawn")]
        [SerializeField]
        private List<RectTransform> _spawnPoints = new List<RectTransform>();

        [SerializeField] private float _rayMaxDistance = 500f;
        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private GameObject _vfxSpawn;

        [Tooltip("Ngón tay/chuột di chuyển quá khoảng cách này (pixel) trước khi nhấc lên thì tính là vuốt " +
                 "(look/swipe), không spawn quái")]
        [SerializeField]
        private float _swipeThreshold = 30f;

        [Tooltip("Camera dùng để raycast/quy đổi tọa độ UI -> ground. " +
                 "Bỏ trống sẽ lấy Camera.main (yêu cầu camera có tag MainCamera)")]
        [SerializeField]
        private Camera _worldCamera;

        [SerializeField] private float _monsterWanderRadius = 3f;

        [Header("Animal Feeding")]
        [Tooltip("Thời gian từ lúc spawn đến khi đói, tính bằng giây; áp dụng cho tất cả animal.")]
        [LunaPlaygroundField("Time Animal Hungry")]
        [SerializeField, Min(0f)]
        private float _animalHungerDelay = 3f;

        [Header("Tutorial UI")]
        [Tooltip("Canvas chứa các spawn point. Bỏ trống sẽ tự tìm từ spawn point đầu tiên")]
        [SerializeField]
        private Canvas _uiCanvas;

        [Tooltip("Màn blur - bật 1 lần lúc bắt đầu tutorial, tắt 1 lần lúc tutorial xong")] [SerializeField]
        private GameObject _blur;

        [Tooltip("Component điều khiển animation bàn tay hướng dẫn (hand + efx)")] [SerializeField]
        private TutorialPointer _tutorialPointer;

        [Tooltip("Lệch vị trí bàn tay so với tâm target")] [SerializeField]
        private Vector2 _handOffset = Vector2.zero;

        [Tooltip("Bán kính tap phụ (pixel) ngoài vùng spawn point. 0 = chỉ nhận tap trong RectTransform")]
        [SerializeField]
        private float _extraTapRadius = 100f;

        [Tooltip("PlayerController của player, dùng để biết khi nào player transform xong")] [SerializeField]
        private PlayerController _playerController;


        [Tooltip("RectTransform của nút Transform trên player, để trỏ tay tutorial tới")] [SerializeField]
        private RectTransform _transformButtonTarget;

        [Tooltip("Canvas của nút Transform - chỉnh sortingOrder để nút nổi lên trên màn blur. " +
                 "Canvas phải để sẵn overrideSorting = true.")]
        [SerializeField]
        private Canvas _transformButtonCanvas;

        [Tooltip("SortingOrder khi nút Transform được highlight. Khi tắt highlight, khôi phục thứ tự ban đầu của Canvas.")] [SerializeField]
        private int _transformButtonHighlightSortingOrder = 3;

        [Header("Tutorial Hint Text")]
        [Tooltip("Text hướng dẫn dùng chung cho tutorial và lời nhắc cho thú ăn trong gameplay")]
        [SerializeField]
        private TMP_Text _hintText;

        [Tooltip("Text hiện khi tay trỏ tới nút hotbar (bước chọn quái)")] [SerializeField]
        private string _selectHotbarHintText = "Select another monster to summon";

        [Tooltip("Màu tên quái trong text \"Tap to spawn <tên quái>\" (chữ nghiêng)")] [SerializeField]
        private Color _monsterNameHintColor = Color.yellow;

        [Header("Movement Tutorial")]
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private Vector2 _joystickDragOffset = new Vector2(70f, 45f);
        private bool _movementTutorialActive;

        [Header("Camera Follow")]
        [Tooltip("Camera bám player nên cùng điểm màn hình sẽ trỏ tới chỗ khác trên ground. " +
                 "Bật để VFX luôn nằm đúng chỗ quái sẽ rơi")]
        [SerializeField]
        private bool _refreshWhileCameraMoves = true;

        [SerializeField] private float _refreshInterval = 0.1f;


        private readonly List<RaycastResult> _raycastResults = new List<RaycastResult>();

        private HotbarItem _selectedHotbarItem;
        private RectTransform _currentHandTarget;
        private Phase _currentPhase = Phase.Tutorial;
        private TutorialStep _tutorialStep;
        private Plane _groundPlane;
        private Camera _uiCamera;
        private Transform _worldCameraTransform;
        private PointerEventData _pointerEventData;
        private int _currentSpawnIndex;
        private Vector3 _posSpawnTutorial;
        private float _refreshTime;
        private Vector3 _lastCameraPosition;
        private Quaternion _lastCameraRotation;
        private int _transformButtonNormalSortingOrder;
        private Tween _feedingHintTween;
        private bool _gameplaySpawnGuide;
        private Vector2 _spawnGuideViewport;

        private Vector2 _pointerDownPosition;
        private bool _isPointerDown;
        private bool _isSwipe;
        private bool _pointerStartedOverUI;


        public Phase CurrentPhase => _currentPhase;

        private void Awake()
        {
            if (_transformButtonCanvas != null)
                _transformButtonNormalSortingOrder = _transformButtonCanvas.sortingOrder;
        }

        private void Start()
        {
            foreach (var hotbarItem in _hotbarItems)
            {
                hotbarItem.Init(this);
                hotbarItem.SetSelected(false);
                hotbarItem.TurnOnCanvas(false);
            }

            // Ưu tiên camera gán tay trong Inspector. Scene có thể không gắn tag MainCamera
            // cho camera thật (vd. camera nằm trong prefab Player), nên Camera.main chỉ là fallback.
            if (_worldCamera == null)
            {
                _worldCamera = Camera.main;
            }

            if (_worldCamera != null)
            {
                _worldCameraTransform = _worldCamera.transform;
            }

            _groundPlane = new Plane(Vector3.up, Vector3.zero);

            ResolveUiCamera();

            // Thiếu 1 trong các điều kiện dưới thì không chạy được đủ chuỗi tutorial
            // (transform -> hotbar[0] -> spawn[0] -> hotbar[1] -> spawn[1]). Bỏ qua thẳng
            // vào gameplay, không kẹt tutorial.
            if (_spawnPoints.Count < 2 || _hotbarItems.Count < 2 || _transformButtonTarget == null)
            {
                EnterGameplay();
                return;
            }

            if (_playerController != null)
            {
                _playerController.OnTransformedOn += HandlePlayerTransformed;
            }

            if (_blur != null)
            {
                _blur.SetActive(true);
            }

            // Start order is unspecified: StartsMounted also covers PlayerController.Start running later.
            if (_playerController != null && (_playerController.IsMounted || _playerController.StartsMounted))
            {
                SetTransformButtonHighlighted(false);
                GoToHotbarStep(0);
            }
            else GoToTransformStep();
        }

        private void Update()
        {
            if (_movementTutorialActive) UpdateMovementTutorial();
            if (_currentPhase == Phase.Gameplay && _gameplaySpawnGuide)
                RefreshGameplaySpawnGuide();
            if (_currentPhase == Phase.Tutorial)
            {
                // Bám vị trí target mỗi frame - bù resize màn hình (xem giải thích ở ShowHandAt).
                RefreshHandPosition();

                if (IsSpawnWaitStep())
                {
                    RefreshTutorialPointPosition();
                }
            }

            if (!TryGetTapPosition(out Vector2 screenPosition))
            {
                return;
            }

            // A tap on a creature is always consumed, including non-feedable companions.
            if (!IsPointerOverUI(screenPosition) && TryInteractWithPet(screenPosition)) return;

            if (_currentPhase == Phase.Tutorial)
            {
                HandleTutorialTap(screenPosition);
            }
            else
            {
                HandleTap(screenPosition);
            }
        }

        private void OnDestroy()
        {
            StopFeedingHintPulse();
            if (_tutorialPointer != null) _tutorialPointer.Stop();

            if (_playerController != null)
            {
                _playerController.OnTransformedOn -= HandlePlayerTransformed;
            }
        }

        public void SelectMonster(Monster monster, HotbarItem source)
        {
            // Bấm lại đúng hotbar đang chọn -> bỏ chọn, không còn quái nào để spawn cho tới khi chọn
            // lại 1 hotbar khác.
            if (_selectedHotbarItem == source)
            {
                _selectedHotbarItem = null;
                _prefabMonster = null;
                source.SetSelected(false);
                if (_currentPhase == Phase.Gameplay)
                {
                    _gameplaySpawnGuide = false;
                    HideVfx();
                }
                return;
            }

            if (_selectedHotbarItem != null)
            {
                _selectedHotbarItem.SetSelected(false);
            }

            _prefabMonster = monster;
            _selectedHotbarItem = source;
            source.SetSelected(true);

            if (_currentPhase != Phase.Tutorial)
            {
                ShowGameplaySpawnGuide();
                return;
            }

            // Chỉ advance tutorial khi đúng hotbar đang được tay chỉ tới. Chọn sai hotbar vẫn
            // đổi _prefabMonster như bình thường, nhưng step không đi tiếp.
            int index = _hotbarItems.IndexOf(source);

            if (_tutorialStep == TutorialStep.WaitHotbar0 && index == 0)
            {
                _hotbarItems[0].TurnOnCanvas(false);
                GoToSpawnStep(0);
            }
            else if (_tutorialStep == TutorialStep.WaitHotbar1 && index == 1)
            {
                _hotbarItems[1].TurnOnCanvas(false);
                GoToSpawnStep(1);
            }
        }

        #region Tutorial

        private bool IsSpawnWaitStep()
        {
            return _tutorialStep == TutorialStep.WaitSpawn0 || _tutorialStep == TutorialStep.WaitSpawn1;
        }

        private void GoToTransformStep()
        {
            _tutorialStep = TutorialStep.WaitTransform;
            SetTransformButtonHighlighted(true);
            ShowHandAt(_transformButtonTarget);
            HideHintText();
        }

        private void HandlePlayerTransformed()
        {
            if (_tutorialStep != TutorialStep.WaitTransform)
            {
                return;
            }

            SetTransformButtonHighlighted(false);
            GoToHotbarStep(0);
        }

        private void SetTransformButtonHighlighted(bool active)
        {
            if (_transformButtonCanvas != null)
            {
                _transformButtonCanvas.sortingOrder = active
                    ? _transformButtonHighlightSortingOrder
                    : (_currentPhase == Phase.Tutorial ? 0 : _transformButtonNormalSortingOrder);
            }
        }

        private void GoToHotbarStep(int index)
        {
            HotbarItem hotbar = index >= 0 && index < _hotbarItems.Count ? _hotbarItems[index] : null;

            if (hotbar == null)
            {
                FinishTutorial();
                return;
            }

            hotbar.TurnOnCanvas(true);

            _tutorialStep = index == 0 ? TutorialStep.WaitHotbar0 : TutorialStep.WaitHotbar1;
            ShowHandAt(hotbar.ButtonRect);
            ShowHintText(_selectHotbarHintText);
        }

        private void GoToSpawnStep(int index)
        {
            _tutorialStep = index == 0 ? TutorialStep.WaitSpawn0 : TutorialStep.WaitSpawn1;
            _currentSpawnIndex = index;

            RectTransform point = GetSpawnPoint(index);

            if (point == null)
            {
                AdvanceAfterSpawnFailure(index);
                return;
            }

            if (!TryGetGroundPoint(point, out _posSpawnTutorial))
            {
                // Không tìm được ground cho point này thì bỏ qua, không kẹt tutorial.
                Debug.LogWarning($"[MapController] Spawn point {index} không raycast được xuống ground");
                AdvanceAfterSpawnFailure(index);
                return;
            }

            ShowVfx(_posSpawnTutorial);
            ShowHandAt(point);
            ShowSpawnHintText();

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }

        private void AdvanceAfterSpawnFailure(int index)
        {
            if (index == 0)
            {
                GoToHotbarStep(1);
            }
            else
            {
                FinishTutorial();
            }
        }

        private void FinishTutorial()
        {
            _tutorialStep = TutorialStep.Done;
            EnterGameplay();
            if (_moveJoystick == null) return;

            // This is a passive guide: gameplay and all other controls stay available.
            _movementTutorialActive = true;
            _currentHandTarget = _moveJoystick.JoystickBase;
            RefreshHandPosition();
            if (_tutorialPointer != null) _tutorialPointer.ShowDrag(_joystickDragOffset);
        }

        private void UpdateMovementTutorial()
        {
            RefreshHandPosition();
            if (_moveJoystick == null || !_moveJoystick.isActiveAndEnabled || !_moveJoystick.Interactable)
                return;

            var input = new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis);
            if (!_moveJoystick.InputActive || input.sqrMagnitude <= 0.04f) return;

            _movementTutorialActive = false;
            _currentHandTarget = null;
            // Do not reset hints, selection or spawn VFX belonging to ongoing gameplay.
            if (_tutorialPointer != null) _tutorialPointer.Stop();
        }

        /// <summary>
        /// Di chuyển bàn tay tutorial tới đúng vị trí 1 RectTransform (nút Transform, nút hotbar,
        /// hoặc spawn point cố định) rồi hiện lên.
        /// </summary>
        private void ShowHandAt(RectTransform target)
        {
            if (target == null || _tutorialPointer == null)
            {
                return;
            }

            // Lưu lại target để Update() tự bám vị trí mỗi frame (xem RefreshHandPosition) - vị trí
            // world của target có thể đổi ngay cả khi RectTransform của nó không di chuyển gì (vd.
            // resize màn hình làm Canvas reflow lại anchor), nếu chỉ set 1 lần ở đây thì bàn tay sẽ
            // đứng yên tại chỗ cũ trong khi nút/spawn point đã dời sang vị trí khác.
            _currentHandTarget = target;
            RefreshHandPosition();

            _tutorialPointer.Show();
        }

        /// <summary>
        /// Đặt lại vị trí bàn tay theo đúng _currentHandTarget - gọi mỗi frame trong Update() lúc tutorial
        /// đang chạy, để bàn tay luôn bám đúng nút/spawn point kể cả khi màn hình đổi kích thước.
        /// </summary>
        private void RefreshHandPosition()
        {
            if (_currentHandTarget == null || _tutorialPointer == null)
            {
                return;
            }

            var pointerRect = (RectTransform)_tutorialPointer.transform;
            pointerRect.position = _currentHandTarget.position;

            if (_handOffset != Vector2.zero)
            {
                pointerRect.anchoredPosition += _handOffset;
            }
        }

        private void HandleTutorialTap(Vector2 screenPosition)
        {
            if (!IsSpawnWaitStep())
            {
                return;
            }

            if (!IsTapOnTarget(screenPosition))
            {
                return;
            }

            // Vị trí spawn lấy từ raycast đã tính sẵn cho point này, đúng chỗ VFX đang đứng.
            if (!TrySpawnMonster(_posSpawnTutorial))
            {
                return;
            }

            HideVfx();
            HideHintText();

            if (_tutorialStep == TutorialStep.WaitSpawn0)
            {
                GoToHotbarStep(1);
            }
            else
            {
                FinishTutorial();
            }
        }

        /// <summary>
        /// Text "Select another monster to summon" - hiện lúc tay trỏ vào nút hotbar.
        /// </summary>
        private void ShowHintText(string text)
        {
            if (_hintText == null)
            {
                return;
            }

            _hintText.text = text;

            if (text == "Feed your pet")
            {
                if (_feedingHintTween == null || !_feedingHintTween.IsActive())
                {
                    _hintText.rectTransform.localScale = Vector3.one;
                    _feedingHintTween = _hintText.rectTransform.DOScale(1.2f, 0.5f)
                        .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
                }
            }
            else StopFeedingHintPulse();

            if (!_hintText.gameObject.activeSelf)
            {
                _hintText.gameObject.SetActive(true);
            }
        }

        /// <summary>
        /// Text "Tap to spawn &lt;tên quái&gt;" (tên quái tô màu + nghiêng) - hiện lúc tay trỏ tới spawn
        /// point, dùng đúng quái đang chọn (_prefabMonster, đã set khi player bấm hotbar).
        /// </summary>
        private void ShowSpawnHintText()
        {
            if (_prefabMonster == null)
            {
                return;
            }

            string colorHex = ColorUtility.ToHtmlStringRGB(_monsterNameHintColor);

            ShowHintText($"Tap to spawn <color=#{colorHex}><i>{_prefabMonster.name}</i></color>");
        }

        private void HideHintText()
        {
            StopFeedingHintPulse();
            if (_hintText != null && _hintText.gameObject.activeSelf)
            {
                _hintText.gameObject.SetActive(false);
            }
        }

        /// <summary>
        /// Tap phải nằm trong RectTransform của spawn point hiện tại (hoặc trong bán kính phụ) mới tính.
        /// </summary>
        private void StopFeedingHintPulse()
        {
            if (_feedingHintTween == null) return;
            _feedingHintTween.Kill();
            _feedingHintTween = null;
            if (_hintText != null) _hintText.rectTransform.localScale = Vector3.one;
        }

        private void OnDisable()
        {
            StopFeedingHintPulse();
            _gameplaySpawnGuide = false;
            HideVfx();
        }

        private bool IsTapOnTarget(Vector2 screenPosition)
        {
            RectTransform tapArea = GetSpawnPoint(_currentSpawnIndex);

            if (tapArea == null)
            {
                return false;
            }

            if (RectTransformUtility.RectangleContainsScreenPoint(tapArea, screenPosition, _uiCamera))
            {
                return true;
            }

            if (_extraTapRadius <= 0f)
            {
                return false;
            }

            Vector2 center = RectTransformUtility.WorldToScreenPoint(_uiCamera, tapArea.position);

            return (center - screenPosition).sqrMagnitude <= _extraTapRadius * _extraTapRadius;
        }

        private void EnterGameplay()
        {
            _currentPhase = Phase.Gameplay;
            SetTransformButtonHighlighted(false);
            foreach (var hotbarItem in _hotbarItems)
                hotbarItem.RestoreCanvasSortingOrder();

            _tutorialPointer?.Stop();

            // The existing hint belongs to the tutorial blur. Keep this same text visible
            // in gameplay after the blur is hidden, preserving its screen position.
            if (_hintText != null && _uiCanvas != null && _blur != null &&
                _hintText.transform.IsChildOf(_blur.transform))
                _hintText.transform.SetParent(_uiCanvas.transform, true);

            if (_blur != null)
            {
                _blur.SetActive(false);
            }

            HideVfx();
            HideHintText();
        }

        /// <summary>
        /// Player di chuyển -> camera đổi -> cùng điểm màn hình trỏ tới chỗ khác trên ground.
        /// Bắn lại raycast để VFX bám đúng chỗ. Camera đứng yên thì không tốn raycast nào.
        /// </summary>
        private void RefreshTutorialPointPosition()
        {
            if (!_refreshWhileCameraMoves || _refreshInterval <= 0f || Time.time < _refreshTime)
            {
                return;
            }

            _refreshTime = Time.time + _refreshInterval;

            if (_worldCameraTransform == null
                || (_worldCameraTransform.position == _lastCameraPosition
                    && _worldCameraTransform.rotation == _lastCameraRotation))
            {
                return;
            }

            CacheCameraState();

            RectTransform point = GetSpawnPoint(_currentSpawnIndex);

            if (point == null || !TryGetGroundPoint(point, out _posSpawnTutorial))
            {
                return;
            }

            ShowVfx(_posSpawnTutorial);
        }

        private void CacheCameraState()
        {
            if (_worldCameraTransform == null)
            {
                return;
            }

            _lastCameraPosition = _worldCameraTransform.position;
            _lastCameraRotation = _worldCameraTransform.rotation;
        }

        #endregion

        #region Gameplay

        private void ShowGameplaySpawnGuide()
        {
            _gameplaySpawnGuide = false;
            HideVfx();
            if (_worldCamera == null || _prefabMonster == null) return;
            // Keep the suggestion away from screen edges and the bottom hotbar.
            for (int i = 0; i < 32; i++)
            {
                _spawnGuideViewport = new Vector2(Random.Range(0.2f, 0.8f), Random.Range(0.3f, 0.65f));
                if (!TryGetSpawnGuidePoint(out Vector3 point)) continue;
                _gameplaySpawnGuide = true;
                ShowVfx(point);
                return;
            }
        }

        private bool TryGetSpawnGuidePoint(out Vector3 point)
        {
            point = Vector3.zero;
            if (_worldCamera == null) return false;
            Vector2 screen = _worldCamera.ViewportToScreenPoint(_spawnGuideViewport);
            if (IsPointerOverUI(screen)) return false;
            Ray ray = _worldCamera.ScreenPointToRay(screen);
            // Use real ground for the suggestion, never a creature or a point beyond the map.
            if (!Physics.Raycast(ray, out RaycastHit hit, _rayMaxDistance, _groundMask,
                    QueryTriggerInteraction.Ignore) || hit.normal.y < 0.5f ||
                hit.collider.GetComponentInParent<Monster>() != null ||
                (_playerController != null && hit.transform.IsChildOf(_playerController.transform))) return false;
            point = hit.point;
            return true;
        }

        private void RefreshGameplaySpawnGuide()
        {
            if (TryGetSpawnGuidePoint(out Vector3 point)) ShowVfx(point);
            else ShowGameplaySpawnGuide();
        }

        /// <summary>
        /// Tap trúng widget tương tác thật (Button...) thì bỏ qua (tránh vừa bấm UI vừa spawn). Tap
        /// trúng map thì bắn raycast từ điểm tap xuống ground, spawn quái đang chọn đúng tại điểm chạm.
        /// </summary>
        private void HandleTap(Vector2 screenPosition)
        {
            if (_prefabMonster == null || IsPointerOverUI(screenPosition))
            {
                return;
            }

            if (!TryGetGroundPoint(screenPosition, out Vector3 worldPosition))
            {
                return;
            }

            if (TrySpawnMonster(worldPosition))
            {
                _gameplaySpawnGuide = false;
                HideVfx();
            }
        }

        private void LateUpdate()
        {
            if (_currentPhase != Phase.Gameplay) return;
            if (PetNeeds.AnyHungry)
            {
                if (_hintText != null && (!_hintText.gameObject.activeSelf || _hintText.text != "Feed your pet"
                    || _feedingHintTween == null || !_feedingHintTween.IsActive()))
                    ShowHintText("Feed your pet");
            }
            else HideHintText();
        }

        private bool TryInteractWithPet(Vector2 screenPosition)
        {
            if (_worldCamera == null) return false;
            Ray ray = _worldCamera.ScreenPointToRay(screenPosition);
            RaycastHit[] hits = Physics.RaycastAll(ray, _rayMaxDistance, ~0, QueryTriggerInteraction.Collide);
            Collider closest = null;
            float distance = float.MaxValue;
            foreach (RaycastHit hit in hits)
            {
                // In third person the player's own capsule can sit between camera and pet.
                if (_playerController != null &&
                    hit.collider.transform.IsChildOf(_playerController.transform)) continue;
                if (hit.distance >= distance) continue;
                distance = hit.distance;
                closest = hit.collider;
            }

            if (closest == null) return false;
            Monster creature = closest.GetComponentInParent<Monster>();
            if (creature == null) return false;
            PetNeeds pet = creature.GetComponent<PetNeeds>();
            if (pet != null) pet.TryFeed();
            return true;
        }

        #endregion

        #region Spawn

        /// <summary>
        /// Spawn quái đang chọn tại vị trí world. Chưa chọn quái thì không spawn.
        /// </summary>
        private bool TrySpawnMonster(Vector3 worldPosition)
        {
            if (_prefabMonster == null)
            {
                return false;
            }

            Monster monster = Instantiate(_prefabMonster);
            PetNeeds pet = monster.GetComponent<PetNeeds>();
            if (pet != null) pet.SetHungerDelay(_animalHungerDelay);
            monster.SetPlayer(_playerController != null ? _playerController.transform : null, _worldCamera);
            monster.Spawn(worldPosition, _monsterWanderRadius);
            if (GameManager.Instance != null) GameManager.Instance.CountEvent();

            return true;
        }

        /// <summary>
        /// Hiện hiệu ứng tại vị trí spawn trong tutorial.
        /// </summary>
        private void ShowVfx(Vector3 worldPosition)
        {
            if (_vfxSpawn == null)
            {
                return;
            }

            _vfxSpawn.transform.position = worldPosition;

            if (!_vfxSpawn.activeSelf)
            {
                _vfxSpawn.SetActive(true);
            }
        }

        private void HideVfx()
        {
            if (_vfxSpawn != null && _vfxSpawn.activeSelf)
            {
                _vfxSpawn.SetActive(false);
            }
        }

        #endregion

        #region Input / Raycast

        /// <summary>
        /// Tap chỉ được tính khi nhấc tay lên (Ended/mouse up) VÀ trong lúc chạm không di chuyển quá
        /// _swipeThreshold. Nếu di chuyển quá ngưỡng thì coi là vuốt (look/swipe qua TouchController) -
        /// không spawn quái. Không thể quyết định ngay lúc chạm xuống vì lúc đó chưa biết ngón tay có
        /// vuốt hay không.
        /// </summary>
        private bool TryGetTapPosition(out Vector2 screenPosition)
        {
            screenPosition = Vector2.zero;

            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                switch (touch.phase)
                {
                    case TouchPhase.Began:
                        BeginPointerTracking(touch.position);
                        return false;

                    case TouchPhase.Ended:
                        return EndPointerTracking(touch.position, out screenPosition);

                    case TouchPhase.Canceled:
                        _isPointerDown = false;
                        _isSwipe = false;
                        return false;

                    default:
                        UpdateSwipeState(touch.position);
                        return false;
                }
            }

            if (Input.GetMouseButtonDown(0))
            {
                BeginPointerTracking(Input.mousePosition);
                return false;
            }

            if (Input.GetMouseButtonUp(0))
            {
                return EndPointerTracking(Input.mousePosition, out screenPosition);
            }

            if (_isPointerDown && Input.GetMouseButton(0))
            {
                UpdateSwipeState(Input.mousePosition);
            }

            return false;
        }

        private void BeginPointerTracking(Vector2 position)
        {
            _pointerDownPosition = position;
            _pointerStartedOverUI = IsPointerOverUI(position);
            _isPointerDown = true;
            _isSwipe = false;
        }

        private void UpdateSwipeState(Vector2 currentPosition)
        {
            if (!_isPointerDown || _isSwipe)
            {
                return;
            }

            _isSwipe = (currentPosition - _pointerDownPosition).sqrMagnitude
                       > _swipeThreshold * _swipeThreshold;
        }

        private bool EndPointerTracking(Vector2 position, out Vector2 screenPosition)
        {
            screenPosition = Vector2.zero;

            if (!_isPointerDown)
            {
                return false;
            }

            UpdateSwipeState(position);

            bool wasSwipe = _isSwipe;
            _isPointerDown = false;
            _isSwipe = false;

            if (wasSwipe || _pointerStartedOverUI)
            {
                return false;
            }

            screenPosition = position;
            return true;
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

            for (int i = 0; i < _raycastResults.Count; i++)
            {
                GameObject hitObject = _raycastResults[i].gameObject;

                if (hitObject.GetComponentInParent<Selectable>() != null)
                {
                    return true;
                }

                if (IsBlockedUiHandler(ExecuteEvents.GetEventHandler<IPointerDownHandler>(hitObject)) ||
                    IsBlockedUiHandler(ExecuteEvents.GetEventHandler<IDragHandler>(hitObject)) ||
                    IsBlockedUiHandler(ExecuteEvents.GetEventHandler<IPointerClickHandler>(hitObject)))
                {
                    return true;
                }
            }

            return false;
        }

        private static bool IsBlockedUiHandler(GameObject handlerObject)
        {
            return handlerObject != null && handlerObject.GetComponent<TouchController>() == null;
        }

        private void ResolveUiCamera()
        {
            if (_uiCanvas == null)
            {
                RectTransform reference = GetSpawnPoint(0);

                if (reference != null)
                {
                    _uiCanvas = reference.GetComponentInParent<Canvas>();
                }
            }

            // Screen Space - Overlay bắt buộc truyền camera null cho RectTransformUtility.
            _uiCamera = _uiCanvas != null && _uiCanvas.renderMode != RenderMode.ScreenSpaceOverlay
                ? _uiCanvas.worldCamera
                : null;
        }

        private RectTransform GetSpawnPoint(int index)
        {
            return index >= 0 && index < _spawnPoints.Count ? _spawnPoints[index] : null;
        }

        private bool TryGetGroundPoint(RectTransform rect, out Vector3 worldPosition)
        {
            worldPosition = Vector3.zero;

            if (rect == null)
            {
                return false;
            }

            Vector2 screenPosition = RectTransformUtility.WorldToScreenPoint(_uiCamera, rect.position);

            return TryGetGroundPoint(screenPosition, out worldPosition);
        }

        private bool TryGetGroundPoint(Vector2 screenPosition, out Vector3 worldPosition)
        {
            worldPosition = Vector3.zero;

            if (_worldCamera == null)
            {
                return false;
            }

            Ray ray = _worldCamera.ScreenPointToRay(screenPosition);

            bool hitCollider = Physics.Raycast(
                ray,
                out RaycastHit hit,
                _rayMaxDistance,
                _groundMask,
                QueryTriggerInteraction.Ignore);

            bool hitPlane = false;

            if (hitCollider)
            {
                worldPosition = hit.point;
            }
            else
            {
                hitPlane = _groundPlane.Raycast(ray, out float distance);

                if (hitPlane)
                {
                    worldPosition = ray.GetPoint(distance);
                }
            }


            return hitCollider || hitPlane;
        }

        #endregion
    }
}
