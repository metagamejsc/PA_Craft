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
            WaitingToChase
        }

        [Header("Movement")]
        [SerializeField] private float _moveSpeed = 3.5f;
        [SerializeField] private float _rotationSpeed = 10f;
        [SerializeField] private float _attackDistance = 1.5f;
        [SerializeField, Min(0f)] private float _chaseDelay = 1f;

        [Header("Animation")]
        [SerializeField] private Animator _animator;
        [SerializeField] private string _isRunningParam = "IsRun";
        [SerializeField] private string _attackTriggerParam = "Attack";

        private Transform _target;
        private float _chaseDelayRemaining;
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
            // Luna returns an empty array for Animator.parameters. Use the configured
            // parameter names instead so animation commands are not silently skipped.
            _hasRunParameter = _animator != null && !string.IsNullOrEmpty(_isRunningParam);
            _hasAttackParameter = _animator != null && !string.IsNullOrEmpty(_attackTriggerParam);
        }

        private void Update()
        {
            if (State == MonsterState.WaitingToChase)
            {
                if (_target == null)
                {
                    Stop();
                    return;
                }

                _chaseDelayRemaining = Mathf.Max(0f, _chaseDelayRemaining - Time.deltaTime);
                if (_chaseDelayRemaining > 0f) return;

                State = MonsterState.Chasing;
                SetRunning(true);
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
            if (target == null)
            {
                Stop();
                return;
            }

            _target = target;
            _chaseDelayRemaining = Mathf.Max(0f, _chaseDelay);
            State = _chaseDelayRemaining > 0f ? MonsterState.WaitingToChase : MonsterState.Chasing;
            SetRunning(State == MonsterState.Chasing);
        }

        public void Stop()
        {
            _target = null;
            _chaseDelayRemaining = 0f;
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

    }
}
