using System;
using UnityEngine;

namespace Playable
{
    public class Bullet : MonoBehaviour
    {
        [SerializeField] private float _maxLifetime = 5f;
        [SerializeField] private bool _faceTravelDirection = true;

        private Vector3 _targetPoint;
        private float _speed;
        private Action _onArrived;
        private bool _isFlying;
        private float _flyingTime;

        public void Launch(Vector3 targetPoint, float speed, Action onArrived)
        {
            _targetPoint = targetPoint;
            _speed = speed;
            _onArrived = onArrived;
            _flyingTime = 0f;
            _isFlying = true;

            if (_faceTravelDirection)
            {
                Vector3 direction = _targetPoint - transform.position;
                if (direction.sqrMagnitude > 0.0001f)
                {
                    transform.rotation = Quaternion.LookRotation(direction, Vector3.up);
                }
            }

            if (_speed <= 0f) Arrive();
        }

        private void Update()
        {
            if (!_isFlying) return;

            _flyingTime += Time.deltaTime;
            if (_flyingTime >= _maxLifetime)
            {
                Arrive();
                return;
            }

            float step = _speed * Time.deltaTime;
            Vector3 toTarget = _targetPoint - transform.position;

            if (toTarget.sqrMagnitude <= step * step)
            {
                transform.position = _targetPoint;
                Arrive();
                return;
            }

            transform.position += toTarget.normalized * step;
        }

        private void Arrive()
        {
            if (!_isFlying) return;

            _isFlying = false;
            Action callback = _onArrived;
            _onArrived = null;
            callback?.Invoke();

            Destroy(gameObject);
        }
    }
}