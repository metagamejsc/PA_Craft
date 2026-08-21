using DG.Tweening;
using TMPro;
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
        [SerializeField] private GameObject _text;
        [SerializeField] private GameObject _infinity;

        [Header("Diamond")] [SerializeField] private TMP_Text _diamondText;

        private Tween _lavaTween;
        private Tween _winDelayTween;
        private int _diamondCount;
        private bool _isInfinite;

        private void Start()
        {
            if (_playerAction != null) _playerAction.OnFired += StopLava;
            UpdateDiamondText();

            if (!_lava || !_targetLava) return;

            float duration = Mathf.Max(0.1f, GameManager.Instance.EndTime);

            _lavaTween = _lava
                .DOMoveY(_targetLava.position.y, duration)
                .OnComplete(OnLavaArrived);
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
            if (monster != null && monster.PlayDeath())
            {
                AddDiamonds(monster.DiamondReward);
            }

            _winDelayTween?.Kill();
            _winDelayTween = DOVirtual
                .DelayedCall(_winPanelDelay, () =>
                {
                    if (GameManager.Instance) GameManager.Instance.ShowWinPanel();
                })
                .OnKill(() => _winDelayTween = null);
        }

        private void AddDiamonds(int amount)
        {
            _diamondCount += Mathf.Max(0, amount);
            UpdateDiamondText();
        }

        private void UpdateDiamondText()
        {
            if (_diamondText != null) _diamondText.text = _diamondCount.ToString();
        }

        private void Update()
        {
            if (Input.GetMouseButton(0) && !_isInfinite)
            {
                _isInfinite = true;

                _hand.gameObject.SetActive(true);
                _text.gameObject.SetActive(true);
                _hand.transform.DOScale(1.2f, 0.5f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Yoyo);
                _infinity.SetActive(false);
            }
        }
    }
}