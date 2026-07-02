using UnityEngine;
using DG.Tweening;

namespace Playable
{
    public class MonsterAction : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private Animator _animator;
        [SerializeField] private GameObject _visualRoot;
        [SerializeField] private Transform _attackPoint;

        [Header("Animation Params")]
        [SerializeField] private string _hitTrigger = "Hit";

        [Header("Timing")]
        [SerializeField] private float _hideDelay = 0.35f;
        [SerializeField] private float _hideDuration = 0.25f;

        private Tween _hideTween;
        private int _hitTriggerHash;
        private Vector3 _startScale = Vector3.one;

        public Transform AttackPoint => _attackPoint != null ? _attackPoint : transform;
        public float HideDelay => _hideDelay;

        private void Awake()
        {
            _hitTriggerHash = Animator.StringToHash(_hitTrigger);

            if (_visualRoot == null)
            {
                _visualRoot = gameObject;
            }

            _startScale = _visualRoot.transform.localScale;
        }

        public void ResetState()
        {
            _hideTween?.Kill();
            _visualRoot.SetActive(true);
            _visualRoot.transform.localScale = _startScale;
        }

        public void PlayHitAndHide()
        {
            if (_animator != null)
            {
                _animator.SetTrigger(_hitTriggerHash);
            }

            _hideTween?.Kill();
            _hideTween = DOVirtual.DelayedCall(_hideDelay, () =>
                {
                    _visualRoot.transform
                        .DOScale(Vector3.zero, _hideDuration)
                        .SetEase(Ease.InBack)
                        .OnComplete(() =>
                        {
                            _visualRoot.SetActive(false);
                        });
                })
                .OnKill(() => _hideTween = null)
                .OnComplete(() => _hideTween = null);
        }

        private void OnDestroy()
        {
            _hideTween?.Kill();
        }
    }
}
