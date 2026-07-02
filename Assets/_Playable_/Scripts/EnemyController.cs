using UnityEngine;
using System.Collections.Generic;

namespace Playable
{
    public class EnemyController : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Animator _animator;

        [SerializeField] private List<Transform> _movePoints = new List<Transform>();

        [Header("Animation")] [SerializeField] private string _speedParam = "Speed";

        [Header("Movement")] [SerializeField] private float _moveSpeed = 2.5f;
        [SerializeField] private float _rotationSmooth = 10f;
        [SerializeField] private float _stopDistance = 0.1f;

        private int _speedParamHash;
        private bool _hasAnimator;
        private bool _isMoving;
        private int _currentPointIndex;
        private Vector3 _lastPosition;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;

            if (_hasAnimator)
            {
                _speedParamHash = Animator.StringToHash(_speedParam);
            }

            _lastPosition = transform.position;
        }

        private void Update()
        {
            if (_isMoving)
            {
                UpdateMove();
            }

            UpdateAnimator();
            _lastPosition = transform.position;
        }

        public void Move()
        {
            if (_movePoints == null || _movePoints.Count == 0)
            {
                return;
            }

            _currentPointIndex = Mathf.Clamp(_currentPointIndex, 0, _movePoints.Count - 1);
            _isMoving = true;
        }

        public void StopMove()
        {
            _isMoving = false;
        }

        public void SetMovePoints(List<Transform> movePoints)
        {
            _movePoints = movePoints;
            _currentPointIndex = 0;
        }

        private void UpdateMove()
        {
            if (_movePoints == null || _movePoints.Count == 0)
            {
                _isMoving = false;
                return;
            }

            Transform targetPoint = _movePoints[_currentPointIndex];

            if (targetPoint == null)
            {
                GoToNextPoint();
                return;
            }

            Vector3 targetPosition = targetPoint.position;
            Vector3 moveDirection = targetPosition - transform.position;
            moveDirection.y = 0f;

            if (moveDirection.sqrMagnitude <= _stopDistance * _stopDistance)
            {
                GoToNextPoint();
                return;
            }

            Vector3 direction = moveDirection.normalized;

            transform.position = Vector3.MoveTowards(
                transform.position,
                new Vector3(targetPosition.x, transform.position.y, targetPosition.z),
                _moveSpeed * Time.deltaTime);

            RotateTowards(direction);
        }

        private void RotateTowards(Vector3 direction)
        {
            if (direction.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            Quaternion targetRotation = Quaternion.LookRotation(direction, Vector3.up);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                targetRotation,
                Time.deltaTime * _rotationSmooth);
        }

        private void GoToNextPoint()
        {
            if (_movePoints.Count == 0)
            {
                _isMoving = false;
                return;
            }

            if (_currentPointIndex < _movePoints.Count - 1)
            {
                _currentPointIndex++;
            }
            else
            {
                _isMoving = false;
            }
        }

        private void UpdateAnimator()
        {
            if (!_hasAnimator)
            {
                return;
            }

            Vector3 frameVelocity = (transform.position - _lastPosition) / Mathf.Max(Time.deltaTime, 0.0001f);
            frameVelocity.y = 0f;

            _animator.SetFloat(_speedParamHash, frameVelocity.magnitude);
        }
    }
}