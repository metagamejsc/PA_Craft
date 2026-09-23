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
            Attacking
        }

        [Header("Movement")]
        [SerializeField] private float _moveSpeed = 3.5f;
        [SerializeField] private float _rotationSpeed = 10f;
        [SerializeField] private float _attackDistance = 1.5f;

        [Header("Animation")]
        [SerializeField] private Animator _animator;
        [SerializeField] private string _isRunningParam = "IsRun";
        [SerializeField] private string _attackTriggerParam = "Attack";

        private Transform _target;
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

            _isRunningHash = Animator.StringToHash(_isRunningParam);
            _attackTriggerHash = Animator.StringToHash(_attackTriggerParam);
            _hasRunParameter = HasParameter(_isRunningHash);
            _hasAttackParameter = HasParameter(_attackTriggerHash);
        }

        private void Update()
        {
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

        public void Stop()
        {
            _target = null;
            State = MonsterState.Idle;
            SetRunning(false);
        }

        public void ResetMonster(Vector3 position, Quaternion rotation)
        {
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
