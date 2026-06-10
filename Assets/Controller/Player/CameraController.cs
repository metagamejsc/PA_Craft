using UnityEngine;

namespace Controller.Player
{
    public class CameraController : MonoBehaviour
    {
        [SerializeField] private TouchController _touchController;
        [SerializeField] private float _minPitch = -80f;
        [SerializeField] private float _maxPitch = 80f;

        private Transform _pitchTarget;
        private float _pitch;

        private void Awake()
        {

            if (_pitchTarget == null)
            {
                _pitchTarget = transform;
            }

            _pitch = NormalizeAngle(_pitchTarget.localEulerAngles.x);
        }

        private void LateUpdate()
        {
            if (_touchController == null)
            {
                return;
            }

            Vector2 lookDelta = _touchController.ConsumeLookDelta();
            if (lookDelta.sqrMagnitude <= 0f)
            {
                return;
            }

            ApplyLookDelta(lookDelta);
        }

        private void ApplyLookDelta(Vector2 delta)
        {
            _pitch -= delta.y;
            _pitch = Mathf.Clamp(_pitch, _minPitch, _maxPitch);
            _pitchTarget.localRotation = Quaternion.Euler(_pitch, 0f, 0f);
        }

        private static float NormalizeAngle(float angle)
        {
            if (angle > 180f)
            {
                angle -= 360f;
            }

            return angle;
        }
    }
}