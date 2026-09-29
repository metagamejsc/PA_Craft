using UnityEngine;

namespace Playable
{
    // Peaceful locomotion shared by pets, Verity and Gugugaga.
    [DisallowMultipleComponent]
    public class Monster : MonoBehaviour
    {
        [SerializeField] private Animator _animator;
        [SerializeField] private string _isRunParam = "IsRun";
        [SerializeField] private float _moveSpeed = 1.5f;
        [SerializeField] private float _rotationSmooth = 8f;
        [SerializeField] private float _wanderRadius = 5f;
        [SerializeField] private Vector2 _idleDurationRange = new Vector2(0.6f, 1.8f);
        [SerializeField] private LayerMask _groundMask = 1024;
        [SerializeField] private float _maxStepHeight = 0.55f;
        [SerializeField] private float _followDistance = 1.5f;
        private Vector3 _home, _destination;
        private Vector3 _followOffset;
        private Transform _player;
        private PetNeeds _pet;
        private float _idleUntil, _moveUntil;
        private bool _spawned, _moving;
        private int _runHash;
        public bool IsMoving => _moving;
        public bool IsDead => false;

        private void Awake()
        {
            if (_animator == null) _animator = GetComponentInChildren<Animator>();
            _pet = GetComponent<PetNeeds>();
            _runHash = Animator.StringToHash(_isRunParam);
        }

        public void Spawn(Vector3 position, float wanderRadiusOverride = -1f)
        {
            if (wanderRadiusOverride > 0f) _wanderRadius = wanderRadiusOverride;
            if (Physics.Raycast(position + Vector3.up * 2f, Vector3.down, out RaycastHit hit,
                    4f, _groundMask, QueryTriggerInteraction.Ignore)) position = hit.point;
            transform.position = position;
            transform.rotation = Quaternion.Euler(0, Random.Range(0f, 360f), 0);
            _home = position;
            _followOffset = Quaternion.Euler(0, Random.Range(0f, 360f), 0) * Vector3.forward * _followDistance;
            _spawned = true;
            EnterIdle();
            if (_pet != null) _pet.ResetNeeds();
        }

        public void SetPlayer(Transform player, Camera worldCamera)
        {
            _player = player;
            if (_pet != null) _pet.SetCamera(worldCamera);
        }

        public void Despawn()
        {
            _spawned = false;
            SetMoving(false);
            gameObject.SetActive(false);
        }

        private void Update()
        {
            if (!_spawned) return;
            if (_pet != null && _pet.IsEating) { SetMoving(false); return; }
            if (_pet != null && _pet.IsHungry && _player != null)
            {
                Vector3 target = _player.position + _followOffset;
                Vector3 delta = target - transform.position;
                delta.y = 0;
                if (delta.sqrMagnitude <= 0.16f)
                {
                    SetMoving(false);
                    Vector3 facing = _player.position - transform.position;
                    facing.y = 0;
                    Face(facing);
                }
                else SetMoving(MoveTo(target));
                return;
            }
            if (!_moving)
            {
                if (Time.time < _idleUntil) return;
                for (int i = 0; i < 8; i++)
                {
                    Vector2 offset = Random.insideUnitCircle * _wanderRadius;
                    Vector3 target = _home + new Vector3(offset.x, 0, offset.y);
                    if (!TryGround(target, out _destination)) continue;
                    _moveUntil = Time.time + 7f;
                    SetMoving(true);
                    return;
                }
                EnterIdle();
                return;
            }
            Vector3 remaining = _destination - transform.position;
            remaining.y = 0;
            if (remaining.sqrMagnitude < 0.04f || Time.time > _moveUntil || !MoveTo(_destination))
                EnterIdle();
        }

        private bool MoveTo(Vector3 target)
        {
            Vector3 delta = target - transform.position;
            delta.y = 0;
            if (delta.sqrMagnitude < 0.001f) return false;
            Vector3 direction = delta.normalized;
            float step = Mathf.Min(_moveSpeed * Time.deltaTime, delta.magnitude);
            for (int i = 0; i < 3; i++)
            {
                Vector3 heading = i == 0 ? direction : Quaternion.Euler(0, i == 1 ? 65 : -65, 0) * direction;
                if (Physics.Raycast(transform.position + Vector3.up * 0.65f, heading,
                        step + 0.25f, _groundMask, QueryTriggerInteraction.Ignore)) continue;
                if (!TryGround(transform.position + heading * step, out Vector3 next)) continue;
                transform.position = next;
                Face(heading);
                return true;
            }
            return false;
        }

        private bool TryGround(Vector3 point, out Vector3 ground)
        {
            point.y = transform.position.y;
            if (Physics.Raycast(point + Vector3.up * (_maxStepHeight + 0.1f), Vector3.down,
                    out RaycastHit hit, _maxStepHeight * 2f + 0.2f, _groundMask,
                    QueryTriggerInteraction.Ignore) && hit.normal.y > 0.65f)
            {
                ground = hit.point;
                return true;
            }
            ground = point;
            return false;
        }

        private void Face(Vector3 direction)
        {
            if (direction.sqrMagnitude > 0.001f)
                transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction),
                    Time.deltaTime * _rotationSmooth);
        }

        private void EnterIdle()
        {
            SetMoving(false);
            _idleUntil = Time.time + Random.Range(_idleDurationRange.x, _idleDurationRange.y);
        }

        private void SetMoving(bool moving)
        {
            _moving = moving;
            if (_animator != null && _animator.runtimeAnimatorController != null)
                _animator.SetBool(_runHash, moving);
        }
    }
}
