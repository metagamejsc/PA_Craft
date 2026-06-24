using System;
using DG.Tweening;
using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    public class Player : MonoBehaviour
    {
        [SerializeField] private List<BowEntry> _bows = new List<BowEntry>();
        [SerializeField] private float _arrowSpeed;
        [SerializeField] private float _idleBounceAngle = 5f;
        [SerializeField] private float _idleBounceDuration = 0.45f;
        [SerializeField] private Vector3 _angleShoot;
        [SerializeField] private float _rotateToShootDuration = 0.25f;
        
        

        private Bow _currentBow;
        private Tween _idleBounceTween;
        private Tween _rotateTween;
        private Quaternion _initialLocalRotation;

        private void Awake()
        {
            _initialLocalRotation = transform.localRotation;
        }

        public void SelectBow(BowType bowType)
        {
            foreach (BowEntry bowEntry in _bows)
            {
                if (bowEntry.Type != bowType) continue;
                _currentBow = bowEntry.Bow;
                _currentBow.gameObject.SetActive(true);
                break;
            }
        }

        public void StartIdleBounce()
        {
            _rotateTween?.Kill();
            _rotateTween = null;

            Vector3 initialEuler = _initialLocalRotation.eulerAngles;
            transform.localRotation = _initialLocalRotation;
            _idleBounceTween = transform.DOLocalRotate(
                    new Vector3(initialEuler.x + _idleBounceAngle, initialEuler.y, initialEuler.z - _idleBounceAngle),
                    _idleBounceDuration)
                .SetLoops(-1, LoopType.Yoyo)
                .SetEase(Ease.InOutSine);
        }

        private void StopIdleBounce()
        {
            _idleBounceTween?.Kill();
            _idleBounceTween = null;
        }

        public void RotateToShootAngle(Action monsterAttack, Action monsterDeath)
        {
            StopIdleBounce();

            _rotateTween?.Kill();
            _rotateTween = transform.DOLocalRotate(_angleShoot, _rotateToShootDuration)
                .SetEase(Ease.OutSine)
                .OnKill(() => _rotateTween = null)
                .OnComplete(() =>
                {
                    _rotateTween = null;
                    if (_currentBow.Type == BowType.BowVip)
                    {
                        _currentBow.Shoot(1, monsterDeath);
                    }
                    else
                    {
                        _currentBow.Shoot(3, monsterAttack);
                    }
                });
        }

        private void OnDisable()
        {
            _rotateTween?.Kill();
            _rotateTween = null;
        }
    }
}