using UnityEngine;
using UnityEngine.EventSystems;
using System;

namespace Controller.Player
{
    public class TouchController : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
    {
        [SerializeField] private Transform _yawTarget;
        [SerializeField] private float _horizontalSensitivity = 0.2f;
        [SerializeField] private float _verticalSensitivity = 0.2f;
#if UNITY_EDITOR
        [SerializeField] private int _editorMouseButton = 1;
        [SerializeField] private float _editorMouseMultiplier = 10f;
#endif

        private int _activePointerId = int.MinValue;
        private Vector2 _frameLookDelta;
        private bool _isInteractable = true;

        public bool HasInteracted { get; private set; }
        public event Action Interacted;


        private void Update()
        {
#if UNITY_EDITOR
            UpdateEditorInput();
#endif
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            if (!_isInteractable)
            {
                return;
            }

            if (_activePointerId != int.MinValue)
            {
                return;
            }

            _activePointerId = eventData.pointerId;
            NotifyInteraction();
        }

        public void OnDrag(PointerEventData eventData)
        {
            if (!_isInteractable)
            {
                return;
            }

            if (eventData.pointerId != _activePointerId)
            {
                return;
            }

            ApplyDelta(eventData.delta);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            if (!_isInteractable)
            {
                return;
            }

            if (eventData.pointerId != _activePointerId)
            {
                return;
            }

            _activePointerId = int.MinValue;
        }

        public Vector2 ConsumeLookDelta()
        {
            Vector2 delta = _frameLookDelta;
            _frameLookDelta = Vector2.zero;
            return delta;
        }

        public void SetInteractable(bool isInteractable)
        {
            _isInteractable = isInteractable;

            if (!isInteractable)
            {
                _activePointerId = int.MinValue;
                _frameLookDelta = Vector2.zero;
            }
        }

        private void ApplyDelta(Vector2 rawDelta)
        {
            float yawDelta = rawDelta.x * _horizontalSensitivity;
            if (_yawTarget != null && !Mathf.Approximately(yawDelta, 0f))
            {
                _yawTarget.Rotate(0f, yawDelta, 0f, Space.World);
            }

            _frameLookDelta.y += rawDelta.y * _verticalSensitivity;
        }

        private void NotifyInteraction()
        {
            if (HasInteracted)
            {
                return;
            }

            HasInteracted = true;
            Interacted?.Invoke();
        }

#if UNITY_EDITOR
        private void UpdateEditorInput()
        {
            if (!_isInteractable)
            {
                return;
            }

            if (!Input.GetMouseButton(_editorMouseButton))
            {
                return;
            }

            float mouseX = Input.GetAxisRaw("Mouse X");
            float mouseY = Input.GetAxisRaw("Mouse Y");
            if (Mathf.Approximately(mouseX, 0f) && Mathf.Approximately(mouseY, 0f))
            {
                return;
            }

            NotifyInteraction();
            ApplyDelta(new Vector2(mouseX, mouseY) * _editorMouseMultiplier);
        }
#endif
    }
}
