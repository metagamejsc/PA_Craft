using System;
using UnityEngine;

namespace Playable
{
    public class Monster : MonoBehaviour
    {
        public enum MonsterState
        {
            Idle,
            Chasing,
            Attacking,
            Patrolling
        }

        [Header("Movement")]
        [SerializeField] private float _moveSpeed = 3.5f;
        [SerializeField] private float _rotationSpeed = 10f;
        [SerializeField] private float _attackDistance = 1.5f;

        [Header("Patrol")]
        [SerializeField, Min(0.1f)] private float _patrolRadius = 3f;
        [SerializeField, Min(0f)] private float _patrolSpeed = 1.5f;

        [Header("Animation")]
        [SerializeField] private Animator _animator;
        [SerializeField] private string _isRunningParam = "IsRun";
        [SerializeField] private string _attackTriggerParam = "Attack";

        private Transform _target;
        private float _patrolAngle;
        private int _isRunningHash;
        private int _attackTriggerHash;
        private bool _hasRunParameter;
        private bool _hasAttackParameter;

        public MonsterState State { get; private set; } = MonsterState.Idle;
        public float AttackDistance => _attackDistance;
        public event Action OnPlayerReached;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            if (_animator != null)
            {
                // Movement is driven by this controller, not animation root motion.
                _animator.applyRootMotion = false;
            }

            _isRunningHash = Animator.StringToHash(_isRunningParam);
            _attackTriggerHash = Animator.StringToHash(_attackTriggerParam);
            _hasRunParameter = HasParameter(_isRunningHash);
            _hasAttackParameter = HasParameter(_attackTriggerHash);
        }

        private void Update()
        {
            if (State == MonsterState.Patrolling)
            {
                UpdatePatrol();
                return;
            }

            if (State != MonsterState.Chasing || _target == null)
            {
                return;
            }

            Vector3 offset = _target.position - transform.position;
            offset.y = 0f;

            if (offset.sqrMagnitude <= _attackDistance * _attackDistance)
            {
                Attack();
                return;
            }

            Vector3 direction = offset.normalized;
            transform.position += direction * (_moveSpeed * Time.deltaTime);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                _rotationSpeed * Time.deltaTime);
        }

        public void StartChasing(Transform target)
        {
            _target = target;
            State = MonsterState.Chasing;
            SetRunning(true);
        }

        public void StartPatrolling(Transform egg)
        {
            if (egg == null)
            {
                Stop();
                return;
            }

            _target = egg;
            Vector3 offset = transform.position - egg.position;
            _patrolAngle = Mathf.Atan2(offset.z, offset.x);
            State = MonsterState.Patrolling;
            SetRunning(_patrolSpeed > 0f);
        }

        private void UpdatePatrol()
        {
            if (_target == null)
            {
                Stop();
                return;
            }

            float radius = Mathf.Max(0.1f, _patrolRadius);
            Vector3 destination = _target.position +
                                  new Vector3(Mathf.Cos(_patrolAngle), 0f, Mathf.Sin(_patrolAngle)) * radius;
            destination.y = transform.position.y;
            Vector3 offset = destination - transform.position;

            if (offset.sqrMagnitude <= 0.01f)
            {
                _patrolAngle = Mathf.Repeat(_patrolAngle + Mathf.PI / 4f, Mathf.PI * 2f);
                return;
            }

            float speed = Mathf.Max(0f, _patrolSpeed);
            SetRunning(speed > 0f);
            if (speed <= 0f) return;

            transform.position = Vector3.MoveTowards(transform.position, destination, speed * Time.deltaTime);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(offset),
                _rotationSpeed * Time.deltaTime);
        }

        public void Stop()
        {
            _target = null;
            State = MonsterState.Idle;
            SetRunning(false);
        }

        public void ResetMonster(Vector3 position, Quaternion rotation)
        {
            if (_animator != null && _animator.runtimeAnimatorController != null)
            {
                // Attack may have no outgoing transition; restore the default state and parameters.
                _animator.Rebind();
                if (_animator.isActiveAndEnabled) _animator.Update(0f);
            }

            Stop();
            transform.SetPositionAndRotation(position, rotation);
        }

        private void Attack()
        {
            State = MonsterState.Attacking;
            SetRunning(false);

            if (_hasAttackParameter)
            {
                _animator.SetTrigger(_attackTriggerHash);
            }

            OnPlayerReached?.Invoke();
        }

        private void SetRunning(bool isRunning)
        {
            if (_hasRunParameter)
            {
                _animator.SetBool(_isRunningHash, isRunning);
            }
        }

        private bool HasParameter(int parameterHash)
        {
            if (_animator == null)
            {
                return false;
            }

            AnimatorControllerParameter[] parameters = _animator.parameters;

            for (int i = 0; i < parameters.Length; i++)
            {
                if (parameters[i].nameHash == parameterHash)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
