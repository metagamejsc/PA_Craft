using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [SerializeField] private Transform _lava;
        [SerializeField] private Transform _targetLava;
        [SerializeField] private PlayerAction _playerAction;
        [SerializeField, Min(0f)] private float _winPanelDelay = 1.5f;
        [SerializeField] private GameObject _hand;
        [SerializeField] private GameObject _infinity;

        private Tween _lavaTween;
        private Tween _winDelayTween;

        private void Start()
        {
            if (_playerAction != null) _playerAction.OnFired += StopLava;

            if (!_lava || !_targetLava) return;

            float duration = Mathf.Max(0.1f, GameManager.Instance.EndTime);

            _lavaTween = _lava
                .DOMoveY(_targetLava.position.y, duration)
                .OnComplete(OnLavaArrived);
            _hand.transform.DOScale(1.2f, 0.5f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Yoyo);
        }

        private void OnDestroy()
        {
            if (_playerAction != null) _playerAction.OnFired -= StopLava;

            _lavaTween?.Kill();
            _winDelayTween?.Kill();
        }

        private void StopLava()
        {
            _lavaTween?.Kill();
            _lavaTween = null;
        }

        private void OnLavaArrived()
        {
            if (_playerAction != null && _playerAction.HasFired) return;

            if (GameManager.Instance) GameManager.Instance.ShowFailPanel();
        }

        public void PlayWinSequence(Monster monster)
        {
            monster?.PlayDeath();

            _winDelayTween?.Kill();
            _winDelayTween = DOVirtual
                .DelayedCall(_winPanelDelay, () =>
                {
                    if (GameManager.Instance) GameManager.Instance.ShowWinPanel();
                })
                .OnKill(() => _winDelayTween = null);
        }

        private void Update()
        {
            if (Input.GetMouseButton(0))
            {
                _hand.transform.DOKill();
                _hand.SetActive(false);
                _infinity.SetActive(false);
            }
        }
    }
}