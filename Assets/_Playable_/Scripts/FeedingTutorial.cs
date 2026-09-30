using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(1000)]
    public class FeedingTutorial : MonoBehaviour
    {
        [SerializeField] private MapController _map;
        [SerializeField] private Camera _worldCamera;
        [SerializeField] private TutorialPointer _hand;
        [SerializeField] private Vector3 _feetOffset = Vector3.zero;
        [SerializeField, Min(0f)] private float _handClearance = 55f;
        private PetNeeds _target;
        private RectTransform _handRect;
        private RectTransform _handParent;
        private Canvas _canvas;
        private int _screenWidth, _screenHeight;

        private void Awake()
        {
            if (_hand == null) return;
            _handRect = (RectTransform)_hand.transform;
            _handParent = _handRect.parent as RectTransform;
            var canvas = _hand.GetComponentInParent<Canvas>();
            if (canvas != null) _canvas = canvas.rootCanvas;
        }
        private bool _completed;

        private void OnEnable()
        {
            PetNeeds.Fed += OnFed;
        }

        private void OnDisable()
        {
            PetNeeds.Fed -= OnFed;
            Hide();
        }

        private void OnFed(PetNeeds pet)
        {
            _completed = true;
            _target = null;
            Hide();
        }

        private void LateUpdate()
        {
            if (_completed || _map == null || _map.CurrentPhase != Phase.Gameplay || _worldCamera == null)
            {
                Hide();
                return;
            }

            if (_target == null || !_target.isActiveAndEnabled || !_target.IsHungry)
            {
                _target = PetNeeds.FindVisibleHungry(_worldCamera);
            }
            if (_target == null || _hand == null)
            {
                Hide();
                return;
            }

            if (_canvas == null || _handParent == null) return;
            // Flush layout only on resize, before converting to the current canvas coordinates.
            if (_screenWidth != Screen.width || _screenHeight != Screen.height)
            {
                _screenWidth = Screen.width;
                _screenHeight = Screen.height;
                Canvas.ForceUpdateCanvases();
            }
            Vector3 screen = _worldCamera.WorldToScreenPoint(_target.transform.position + _feetOffset);
            Rect viewport = _worldCamera.pixelRect;
            if (screen.z <= 0 || !viewport.Contains(new Vector2(screen.x, screen.y)))
            {
                Hide();
                return;
            }

            var uiCamera = _canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : _canvas.worldCamera;
            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(
                    _handParent, screen, uiCamera, out Vector2 localPoint)) return;
            // Offset in UI units, never scaled screen pixels. Stay locked to the ground/root,
            // rather than skinned bounds which fluctuate as the pet animates.
            localPoint.y -= _handClearance;
            _handRect.localPosition = new Vector3(localPoint.x, localPoint.y, 0);
            if (!_hand.IsPlaying) _hand.ShowFollowing();
        }

        private void Hide()
        {
            if (_hand != null && _hand.IsPlaying) _hand.Stop();
        }
    }
}
