using UnityEngine;
using DG.Tweening;
using UnityEngine.UI;
using TMPro;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        private enum GameStep
        {
            TapToTransform,
            MovingToMonster,
            TapToAttack,
            ResolvingAttack,
            TapToRoar,
            ResolvingRoar,
            Complete
        }

        [Header("References")] [SerializeField]
        private PlayerAction _playerAction;

        [SerializeField] private MonsterAction _monsterAction;
        [SerializeField] private Button _actionButton;
        [SerializeField] private Image[] _stepIcons;
        [SerializeField] private TMP_Text _instructionText;
        [SerializeField] private Transform _hand;

        [Header("Prompt Text")] [SerializeField]
        private string _transformPrompt = "TAP TO TRANSFORM";

        [SerializeField] private string _attackPrompt = "TAP TO ATTACK";
        [SerializeField] private string _roarPrompt = "TAP TO ROAR";

        [Header("Hint Animation")] [SerializeField]
        private float _handPressScale = 0.85f;

        [SerializeField] private float _handPressDuration = 0.25f;

        [Header("Flow Timing")] [SerializeField]
        private float _postAttackDelay = 0.25f;

        [SerializeField] private float _postRoarDelay = 0.8f;

        private GameStep _currentStep;
        private Tween _handPressTween;
        private Tween _stepDelayTween;
        private Vector3 _handStartScale = Vector3.one;

        private void Awake()
        {
            if (_hand != null)
            {
                _handStartScale = _hand.localScale;
            }

            if (_actionButton != null)
            {
                _actionButton.onClick.AddListener(OnActionPressed);
            }
        }

        private void Start()
        {
            if (_playerAction != null)
            {
                _playerAction.SetHumanState();
            }

            if (_monsterAction != null)
            {
                _monsterAction.ResetState();
            }

            SetStep(GameStep.TapToTransform, _transformPrompt);
        }

        public void OnActionPressed()
        {
            switch (_currentStep)
            {
                case GameStep.TapToTransform:
                    HandleTransformStep();
                    break;
                case GameStep.TapToAttack:
                    HandleAttackStep();
                    break;
                case GameStep.TapToRoar:
                    HandleRoarStep();
                    break;
            }
        }

        private void HandleTransformStep()
        {
            if (_playerAction == null)
            {
                return;
            }

            SetStep(GameStep.MovingToMonster, string.Empty);
            _playerAction.Transform();
            _instructionText.gameObject.SetActive(false);

            _stepDelayTween?.Kill();
            _stepDelayTween = DOVirtual.DelayedCall(1,
                () =>
                {
                    _playerAction.MoveTo(_monsterAction != null ? _monsterAction.AttackPoint : null,
                        () => { SetStep(GameStep.TapToAttack, _attackPrompt); });
                });
        }

        private void HandleAttackStep()
        {
            if (_playerAction == null)
            {
                return;
            }

            SetStep(GameStep.ResolvingAttack, string.Empty);
            _playerAction.PlayRoar();
            _instructionText.gameObject.SetActive(false);
            DOVirtual.DelayedCall(2.7f, () =>
            {
                _playerAction.PlayAttack();

                DOVirtual.DelayedCall(1f, () => { _monsterAction.PlayHitAndHide(); });

                float delay =
                    Mathf.Max(_playerAction.AttackDuration, (_monsterAction != null ? _monsterAction.HideDelay : 0f)) +
                    _postAttackDelay;
                _stepDelayTween?.Kill();
                _stepDelayTween = DOVirtual.DelayedCall(delay, () => { SetStep(GameStep.TapToRoar, _roarPrompt); });
            });
        }

        private void HandleRoarStep()
        {
            GameManager.Instance.EndGame();
        }

        private void SetStep(GameStep step, string prompt)
        {
            _instructionText.gameObject.SetActive(true);
            _currentStep = step;
            UpdateStepIcons();

            bool showPrompt = step == GameStep.TapToTransform
                              || step == GameStep.TapToAttack
                              || step == GameStep.TapToRoar;

            if (showPrompt)
            {
                ShowPrompt(prompt);
            }
            else
            {
                HidePrompt();
            }
        }

        private void UpdateStepIcons()
        {
            int activeIndex = -1;

            switch (_currentStep)
            {
                case GameStep.TapToTransform:
                    activeIndex = 0;
                    break;
                case GameStep.TapToAttack:
                    activeIndex = 1;
                    break;
                case GameStep.TapToRoar:
                    activeIndex = 2;
                    break;
            }

            if (_stepIcons == null)
            {
                return;
            }

            for (int i = 0; i < _stepIcons.Length; i++)
            {
                if (_stepIcons[i] == null)
                {
                    continue;
                }

                _stepIcons[i].gameObject.SetActive(i == activeIndex);
            }
        }

        private void ShowPrompt(string prompt)
        {
            if (_instructionText != null)
            {
                _instructionText.text = prompt;
            }

            _hand.gameObject.SetActive(true);

            PlayHandPressEffect();
        }

        private void HidePrompt()
        {
            _hand.gameObject.SetActive(false);

            StopHandPressEffect();
        }

        private void PlayHandPressEffect()
        {
            if (_hand == null)
            {
                return;
            }

            _handPressTween?.Kill();
            _hand.localScale = _handStartScale;
            _handPressTween = _hand
                .DOScale(_handStartScale * _handPressScale, _handPressDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _handPressTween = null);
        }

        private void StopHandPressEffect()
        {
            _handPressTween?.Kill();

            if (_hand != null)
            {
                _hand.localScale = _handStartScale;
            }
        }

        private void OnDestroy()
        {
            _handPressTween?.Kill();
            _stepDelayTween?.Kill();

            if (_actionButton != null)
            {
                _actionButton.onClick.RemoveListener(OnActionPressed);
            }
        }
    }
}