using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class Monster : MonoBehaviour
    {
        private static readonly int IsRunHash = Animator.StringToHash("IsRun");
        private static readonly int IsAttackHash = Animator.StringToHash("IsAttack");

        [Header("Animation")] [SerializeField] private Animator _animator;

        [SerializeField] private Transform _posLanding;
        [SerializeField] private float _durationJump;
        [SerializeField] private ParticleSystem _vfxDust;

        [Header("Attack")] [SerializeField] private Transform _attackPoint;
        [SerializeField] private float _durationMoveToAttackPoint = 0.5f;

        [Header("Death")] [SerializeField] private float _deathHopPower = 0.5f;
        [SerializeField] private float _deathDuration = 0.45f;

        [Header("Sound")] [SerializeField] private AudioClip _soundMonsterJump;
        [SerializeField] private AudioClip _soundMonsterRoar;
        [SerializeField] private AudioClip _soundMonsterMoving;

        private Tween _moveTween;
        private Tween _deathTween;
        private Vector3 _initialScale;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _initialScale = transform.localScale;
        }

        public void JumpDown(Action callback)
        {
            _deathTween?.Kill();
            _moveTween?.Kill();
            transform.DOMoveY(_posLanding.position.y, _durationJump)
                .SetEase(Ease.InExpo)
                .OnComplete(() =>
                {
                    callback();
                    _vfxDust.Play();
                    AudioManager.Instance.PlaySound(_soundMonsterJump);
                });
        }

        public void Death(Action callback)
        {
            AudioManager.Instance.PlaySound(_soundMonsterRoar);
            _deathTween?.Kill();
            _moveTween?.Kill();
            SetAnimationState(isRun: false, isAttack: false);

            _deathTween = DOTween.Sequence()
                .Append(transform.DOJump(transform.position, _deathHopPower, 1, _deathDuration).SetEase(Ease.OutQuad))
                .Join(transform.DOScale(Vector3.zero, _deathDuration).SetEase(Ease.InBack))
                .OnComplete(() =>
                {
                    _deathTween = null;
                    gameObject.SetActive(false);
                    transform.localScale = _initialScale;
                    callback?.Invoke();
                });
        }

        public void Attack(Action callback = null)
        {
            _deathTween?.Kill();
            _moveTween?.Kill();

            if (_attackPoint == null)
            {
                Debug.LogWarning("Monster: missing attack point.");
                SetAnimationState(isRun: false, isAttack: true);
                return;
            }

            SetAnimationState(isRun: true, isAttack: false);
            AudioManager.Instance.PlaySound(_soundMonsterRoar, true);
            _moveTween = transform.DOMove(_attackPoint.position, _durationMoveToAttackPoint)
                .SetEase(Ease.Linear)
                .OnComplete(() =>
                {
                    AudioManager.Instance.PlaySound(_soundMonsterRoar);
                    _moveTween = null;
                    SetAnimationState(isRun: false, isAttack: true);
                    callback?.Invoke();
                });
        }

        private void OnDisable()
        {
            _moveTween?.Kill();
            _moveTween = null;
            _deathTween?.Kill();
            _deathTween = null;
        }

        private void SetAnimationState(bool isRun, bool isAttack)
        {
            if (_animator == null)
            {
                return;
            }

            _animator.SetBool(IsRunHash, isRun);
            _animator.SetBool(IsAttackHash, isAttack);
        }
    }
}