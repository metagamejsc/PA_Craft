using UnityEngine;

namespace Controller.Player
{
    public class PlayerAnimation : MonoBehaviour
    {
        [SerializeField] private Animator _animator;
        [SerializeField] private PlayerMovement _movement;
        [SerializeField] private string _speedParameter = "Speed";
        [SerializeField] private float _runThreshold = 0.1f;

        private int _speedHash;
        private float _lastSpeed = -1f;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            if (_movement == null)
            {
                _movement = GetComponent<PlayerMovement>();
            }

            _speedHash = Animator.StringToHash(_speedParameter);
        }

        private void Update()
        {
            if (_animator == null || _movement == null)
            {
                return;
            }

            float speed = _movement.CurrentSpeed > _runThreshold ? _movement.CurrentSpeed : 0f;

            if (Mathf.Approximately(_lastSpeed, speed))
            {
                return;
            }

            _animator.SetFloat(_speedHash, speed);
            _lastSpeed = speed;
        }
    }
}
