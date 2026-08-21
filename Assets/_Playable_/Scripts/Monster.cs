using UnityEngine;

namespace Playable
{
    public class Monster : MonoBehaviour
    {
        [SerializeField] private Animator _animator;
        [SerializeField] private string _deathParam = "IsDeath";
        [SerializeField, Min(0)] private int _diamondReward = 1;
        [SerializeField] private ParticleSystem _deathVfx;

        private int _deathParamHash;
        private bool _isDead;

        private void Awake()
        {
            if (_animator == null) _animator = GetComponent<Animator>();

            _deathParamHash = Animator.StringToHash(_deathParam);
        }

        public int DiamondReward => _diamondReward;

        public bool PlayDeath()
        {
            if (_isDead) return false;

            _isDead = true;
            if (_animator != null) _animator.SetBool(_deathParamHash, true);
            _animator.gameObject.SetActive(false);
            if (_deathVfx != null) _deathVfx.Play();

            return true;
        }
    }
}
