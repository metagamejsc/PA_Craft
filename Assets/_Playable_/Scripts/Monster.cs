using UnityEngine;

namespace Playable
{
    public class Monster : MonoBehaviour
    {
        [SerializeField] private Animator _animator;
        [SerializeField] private string _deathParam = "IsDeath";

        private int _deathParamHash;
        private bool _isDead;

        private void Awake()
        {
            if (_animator == null) _animator = GetComponent<Animator>();

            _deathParamHash = Animator.StringToHash(_deathParam);
        }

        public void PlayDeath()
        {
            if (_isDead) return;

            _isDead = true;
            if (_animator != null) _animator.SetBool(_deathParamHash, true);
        }
    }
}