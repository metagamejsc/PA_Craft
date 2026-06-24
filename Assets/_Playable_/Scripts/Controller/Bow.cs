using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class Bow : MonoBehaviour
    {
        private static readonly int IsDrawHash = Animator.StringToHash("IsDraw");
        private static readonly int IsFireHash = Animator.StringToHash("IsFire");

        [SerializeField] private BowType _type;
        [SerializeField] private Arrow _arrow;
        [SerializeField] private float _speedArrow;
        [SerializeField] private Animator _animator;
        [SerializeField] private Transform _target;

        [SerializeField] private AudioClip _soundRubberStretching;
        [SerializeField] private AudioClip _soundArrowFlying;

        private Tween _shootTween;

        public BowType Type => _type;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }
        }

        public void Shoot(int loop, Action callback = null)
        {
            if (loop <= 0)
            {
                SetAnimationState(isDraw: false, isFire: false);
                _shootTween = null;
                callback?.Invoke();
                return;
            }

            _animator.Play("Base");
            SetAnimationState(isDraw: false, isFire: false);

            _shootTween?.Kill();
            SetAnimationState(isDraw: true, isFire: false);
            AudioManager.Instance.PlaySound(_soundRubberStretching);

            _shootTween = DOVirtual.DelayedCall(1, () =>
                {
                    SetAnimationState(isDraw: false, isFire: true);
                    AudioManager.Instance.PlaySound(_soundArrowFlying);
                    _arrow.Launch(_speedArrow, _target, () =>
                    {
                        SetAnimationState(isDraw: false, isFire: false);
                        Shoot(loop - 1, callback);
                    });
                })
                .OnKill(() => _shootTween = null)
                .OnComplete(() => _shootTween = null);
        }

        private void OnDisable()
        {
            _shootTween?.Kill();
            _shootTween = null;
        }

        private void SetAnimationState(bool isDraw, bool isFire)
        {
            if (_animator == null)
            {
                return;
            }

            _animator.SetBool(IsDrawHash, isDraw);
            _animator.SetBool(IsFireHash, isFire);
        }
    }

    public enum BowType
    {
        Bow,
        CrossBow,
        BowVip
    }

    [Serializable]
    public struct BowEntry
    {
        [SerializeField] private BowType _type;
        [SerializeField] private Bow _bow;

        public BowType Type => _type;
        public Bow Bow => _bow;
    }
}