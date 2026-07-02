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

        [Header("References")]
        [SerializeField] private PlayerAction _playerAction;
        [SerializeField] private MonsterAction _monsterAction;
        [SerializeField] private Button _actionButton;
        [SerializeField] private TMP_Text _instructionText;
        [SerializeField] private GameObject _tapHintRoot;
        [SerializeField] private Transform _handHint;

        [Header("Prompt Text")]
        [SerializeField] private string _transformPrompt = "TAP TO TRANSFORM";
        [SerializeField] private string _attackPrompt = "TAP TO ATTACK";
        [SerializeField] private string _roarPrompt = "TAP TO ROAR";

        [Header("Hint Animation")]
        [SerializeField] private float _handPressScale = 0.85f;
        [SerializeField] private float _handPressDuration = 0.25f;

        [Header("Flow Timing")]
        [SerializeField] private float _postAttackDelay = 0.25f;
        [SerializeField] private float _postRoarDelay = 0.8f;

        private GameStep _currentStep;
        private Tween _handPressTween;
        private Tween _stepDelayTween;
        private Vector3 _handStartScale = Vector3.one;

        private void Awake()
        {
            if (_handHint != null)
            {
                _handStartScale = _handHint.localScale;
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
            _playerAction.PlayTransform();

            _stepDelayTween?.Kill();
            _stepDelayTween = DOVirtual.DelayedCall(_playerAction.TransformDuration, () =>
            {
                _playerAction.FinishTransform();
                _playerAction.MoveTo(_monsterAction != null ? _monsterAction.AttackPoint : null, () =>
                {
                    SetStep(GameStep.TapToAttack, _attackPrompt);
                });
            });
        }

        private void HandleAttackStep()
        {
            if (_playerAction == null)
            {
                return;
            }

            SetStep(GameStep.ResolvingAttack, string.Empty);
            _playerAction.PlayAttack();

            if (_monsterAction != null)
            {
                _monsterAction.PlayHitAndHide();
            }

            float delay = Mathf.Max(_playerAction.AttackDuration, (_monsterAction != null ? _monsterAction.HideDelay : 0f)) + _postAttackDelay;
            _stepDelayTween?.Kill();
            _stepDelayTween = DOVirtual.DelayedCall(delay, () =>
            {
                SetStep(GameStep.TapToRoar, _roarPrompt);
            });
        }

        private void HandleRoarStep()
        {
            if (_playerAction == null)
            {
                return;
            }

            SetStep(GameStep.ResolvingRoar, string.Empty);
            _playerAction.PlayRoar();

            _stepDelayTween?.Kill();
            _stepDelayTween = DOVirtual.DelayedCall(_playerAction.RoarDuration + _postRoarDelay, () =>
            {
                _currentStep = GameStep.Complete;
                HidePrompt();
                GameManager.Instance.ShowWinPanel();
            });
        }

        private void SetStep(GameStep step, string prompt)
        {
            _currentStep = step;

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

        private void ShowPrompt(string prompt)
        {
            if (_instructionText != null)
            {
                _instructionText.text = prompt;
            }

            if (_tapHintRoot != null)
            {
                _tapHintRoot.SetActive(true);
            }

            PlayHandPressEffect();
        }

        private void HidePrompt()
        {
            if (_tapHintRoot != null)
            {
                _tapHintRoot.SetActive(false);
            }

            StopHandPressEffect();
        }

        private void PlayHandPressEffect()
        {
            if (_handHint == null)
            {
                return;
            }

            _handPressTween?.Kill();
            _handHint.localScale = _handStartScale;
            _handPressTween = _handHint
                .DOScale(_handStartScale * _handPressScale, _handPressDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _handPressTween = null);
        }

        private void StopHandPressEffect()
        {
            _handPressTween?.Kill();

            if (_handHint != null)
            {
                _handHint.localScale = _handStartScale;
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
