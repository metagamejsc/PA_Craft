using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    public class TouchController : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
    {
        [SerializeField] private float _dragSensitivity = 1f;
        [SerializeField] private bool _useUnscaledDelta = true;

        private int _pointerId = int.MinValue;
        private Vector2 _lastPointerPosition;

        public event Action<Vector2> OnLookDelta;

        public void OnPointerDown(PointerEventData eventData)
        {
            _pointerId = eventData.pointerId;
            _lastPointerPosition = eventData.position;
        }

        public void OnDrag(PointerEventData eventData)
        {
            if (eventData.pointerId != _pointerId)
            {
                return;
            }

            Vector2 pointerDelta = eventData.position - _lastPointerPosition;
            _lastPointerPosition = eventData.position;

            float deltaTime = _useUnscaledDelta
                ? Mathf.Max(Time.unscaledDeltaTime, 0.0001f)
                : Mathf.Max(Time.deltaTime, 0.0001f);

            Vector2 normalizedDelta = pointerDelta * (_dragSensitivity / (deltaTime * 60f));
            OnLookDelta?.Invoke(normalizedDelta);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            if (eventData.pointerId != _pointerId)
            {
                return;
            }

            _pointerId = int.MinValue;
        }
    }
}
