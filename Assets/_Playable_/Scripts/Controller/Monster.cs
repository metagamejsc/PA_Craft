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

        [Header("Death")] [SerializeField] private Transform _deathPoint;
        [SerializeField] private float _deathDuration = 0.45f;
        [SerializeField] private float _deathFlipAngle = -95f;
        [SerializeField] private ParticleSystem _vfxBlood;

        [Header("Sound")] [SerializeField] private AudioClip _soundMonsterJump;
        [SerializeField] private AudioClip _soundMonsterRoar;
        [SerializeField] private AudioClip _soundMonsterMoving;

        private Tween _moveTween;
        private Tween _deathTween;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }
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
            // _vfxBlood.Play();
            AudioManager.Instance.PlaySound(_soundMonsterRoar);
            _deathTween?.Kill();
            _moveTween?.Kill();
            SetAnimationState(isRun: false, isAttack: false);

            Vector3 deathTargetPosition = _deathPoint != null ? _deathPoint.position : transform.position;
            Vector3 deathTargetRotation = new Vector3(_deathFlipAngle, 0f, 0f);

            _deathTween = DOTween.Sequence()
                .Append(transform.DOMove(deathTargetPosition, _deathDuration).SetEase(Ease.OutExpo))
                .Join(transform.DORotate(deathTargetRotation, _deathDuration, RotateMode.FastBeyond360)
                    .SetEase(Ease.OutQuad))
                .OnComplete(() =>
                {
                    _deathTween = null;
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