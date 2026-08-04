using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Gameplay References")] [SerializeField]
        private Transform _player;

        [SerializeField] private Animator _playerAnimator;
        [SerializeField] private Transform _ball;
        [SerializeField] private Camera _gameCamera;

        [Header("UI References")] [SerializeField]
        private GameObject _gameplayUi;

        [SerializeField] private Image _progressImage;
        [SerializeField] private Button _kickButton;
        [SerializeField] private TMP_Text _tapToKickText;
        [SerializeField] private Button _openButton;
        [SerializeField] private RectTransform _hand;

        [Header("Tap Text Animation")]
        [SerializeField] private float _tapTextScaleMultiplier = 1.08f;
        [SerializeField] private float _tapTextScaleDuration = 0.5f;

        [Header("Hand Settings")] [SerializeField]
        private Vector2 _handOffset = new Vector2(55f, -45f);

        [SerializeField] private float _handScaleAmount = 0.12f;
        [SerializeField] private float _handScaleDuration = 0.45f;

        [Header("Kick Settings")] [SerializeField]
        private string _kickAnimationStateName = "Kick";

        [SerializeField] private float _kickAnimationDelay = 0.2f;
        [SerializeField] private float _minimumDistance = 5f;
        [SerializeField] private float _maximumDistance = 30f;
        [SerializeField] private float _jumpPower = 5f;
        [SerializeField] private float _ballFlightDuration = 1.5f;
        [SerializeField] private float _progressCycleDuration = 1.25f;
        [SerializeField] private float _ballStartOffset = 1.2f;

        [Header("Camera Settings")] [SerializeField]
        private Vector3 _ballCameraOffset = new Vector3(-7f, 4f, 0f);

        [SerializeField] private Vector3 _ballCameraEulerAngles = new Vector3(15f, 90f, 0f);
        [SerializeField] private float _cameraFollowSpeed = 8f;
        [SerializeField] private float _cameraLookHeight = 0.5f;

        [Header("Landing Settings")] [SerializeField]
        private float _landingBouncePower = 1.25f;

        [SerializeField] private float _landingBounceDuration = 0.6f;
        [SerializeField, Min(1)] private int _landingBounceCount = 4;
        [SerializeField, Range(0.1f, 0.9f)] private float _landingBounceDecay = 0.55f;
        [SerializeField] private float _landingBounceDurationMultiplier = 1.1f;
        [SerializeField] private Vector3 _landingCameraEulerAngles = new Vector3(15f, 90f, 0f);
        [SerializeField] private float _landingCameraRotateDuration = 0.5f;
        [SerializeField] private AudioClip _soundKick;
        [SerializeField] private AudioClip _soundVictory;

        private Tween _progressTween;
        private Tween _kickDelayTween;
        private Tween _ballTween;
        private Tween _handTween;
        private Tween _tapTextTween;
        private Tween _landingCameraRotationTween;
        private Tween _landingBounceTween;
        private float _progressValue;
        private bool _isBallFlying;
        private bool _hasKicked;
        private Vector3 _kickDirection;
        private Quaternion _ballCameraRotation;

        private void Awake()
        {
            DisablePlayerCameraController();
            ConfigureUi();
        }

        private void Start()
        {
            PlaceBallInFrontOfPlayer();
            StartProgressLoop();
            StartHandAnimation();
            StartTapTextAnimation();
        }

        private void LateUpdate()
        {
            if (_isBallFlying)
            {
                FollowBall();
            }
        }

        private void OnDestroy()
        {
            _kickButton?.onClick.RemoveListener(Kick);
            _openButton?.onClick.RemoveListener(OpenGame);
            _progressTween?.Kill();
            _kickDelayTween?.Kill();
            _ballTween?.Kill();
            _handTween?.Kill();
            _tapTextTween?.Kill();
            _landingCameraRotationTween?.Kill();
            _landingBounceTween?.Kill();
        }


        private void DisablePlayerCameraController()
        {
            if (_player == null)
            {
                return;
            }

            CameraController cameraController = _player.GetComponentInChildren<CameraController>(true);

            if (cameraController != null)
            {
                cameraController.enabled = false;
            }
        }

        private void ConfigureUi()
        {
            if (_gameplayUi != null)
            {
                _gameplayUi.SetActive(true);
            }

            if (_progressImage == null || _kickButton == null || _tapToKickText == null ||
                _openButton == null)
            {
                Debug.LogError("GameController could not initialize the gameplay UI.", this);
                enabled = false;
                return;
            }

            _progressImage.type = Image.Type.Filled;
            _progressImage.fillMethod = Image.FillMethod.Vertical;
            _progressImage.fillOrigin = 0;
            _progressImage.fillAmount = 0f;

            _kickButton.onClick.RemoveListener(Kick);
            _kickButton.onClick.AddListener(Kick);
            _kickButton.interactable = true;

            _openButton.onClick.RemoveListener(OpenGame);
            _openButton.onClick.AddListener(OpenGame);
            _openButton.gameObject.SetActive(false);
        }

        private void StartProgressLoop()
        {
            _progressTween?.Kill();
            _progressImage.fillAmount = 0f;
            _progressTween = _progressImage.DOFillAmount(1f, _progressCycleDuration)
                .SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);
        }

        private void StartTapTextAnimation()
        {
            if (_tapToKickText == null)
            {
                return;
            }

            _tapTextTween?.Kill();
            Transform textTransform = _tapToKickText.transform;
            Vector3 startScale = textTransform.localScale;
            textTransform.localScale = startScale;
            _tapTextTween = textTransform
                .DOScale(startScale * _tapTextScaleMultiplier, _tapTextScaleDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);
        }

        private void StartHandAnimation()
        {
            if (_hand == null || _kickButton == null)
            {
                return;
            }

            _handTween?.Kill();
            _hand.SetParent(_kickButton.transform, false);
            _hand.anchorMin = new Vector2(0.5f, 0.5f);
            _hand.anchorMax = new Vector2(0.5f, 0.5f);
            _hand.anchoredPosition = _handOffset;
            _hand.localScale = Vector3.one;
            _hand.gameObject.SetActive(true);
            _handTween = _hand.DOScale(_handScaleAmount, _handScaleDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);
        }

        private void Kick()
        {
            if (_hasKicked || _player == null || _ball == null)
            {
                return;
            }

            _hasKicked = true;
            _kickButton.interactable = false;
            _kickButton.gameObject.SetActive(false);
            _tapTextTween?.Kill();
            _tapToKickText.gameObject.SetActive(false);
            _handTween?.Kill();
            if (_hand != null)
            {
                _hand.gameObject.SetActive(false);
            }

            _progressValue = _progressImage.fillAmount;
            _progressTween?.Kill();

            PlayKickAnimation();
            _kickDelayTween = DOVirtual.DelayedCall(_kickAnimationDelay, LaunchBall);
        }

        private void PlayKickAnimation()
        {
            if (_playerAnimator == null || string.IsNullOrWhiteSpace(_kickAnimationStateName))
            {
                return;
            }

            _playerAnimator.Play(_kickAnimationStateName, 0, 0f);
        }

        private void LaunchBall()
        {
            AudioManager.Instance.PlaySound(_soundKick);
            float distance = Mathf.Lerp(_minimumDistance, _maximumDistance, _progressValue);
            _kickDirection = Vector3.right;
            Vector3 startPosition = _ball.position;
            Vector3 destination = new Vector3(
                startPosition.x + distance,
                startPosition.y,
                startPosition.z);

            _ballCameraRotation = Quaternion.Euler(_ballCameraEulerAngles);
            _gameCamera.transform.rotation = _ballCameraRotation;
            _isBallFlying = true;
            _ballTween = _ball.DOJump(destination, _jumpPower, 1, _ballFlightDuration)
                .SetEase(Ease.Linear)
                .OnComplete(OnBallLanded);
        }

        private void OnBallLanded()
        {
            AudioManager.Instance.PlaySound(_soundVictory);
            _isBallFlying = false;
            _progressImage.transform.parent.gameObject.SetActive(false);

            Vector3 landingPosition = _ball.position;
            _landingCameraRotationTween?.Kill();
            _landingCameraRotationTween = _gameCamera.transform
                .DORotate(_landingCameraEulerAngles, _landingCameraRotateDuration)
                .SetEase(Ease.InOutSine);

            _openButton.gameObject.SetActive(true);

            _landingBounceTween?.Kill();
            Sequence bounceSequence = DOTween.Sequence();
            float bouncePower = _landingBouncePower;
            float bounceDuration = _landingBounceDuration;

            for (int bounceIndex = 0; bounceIndex < _landingBounceCount; bounceIndex++)
            {
                bounceSequence.Append(
                    _ball.DOJump(landingPosition, bouncePower, 1, bounceDuration)
                        .SetEase(Ease.Linear));
                bouncePower *= _landingBounceDecay;
                bounceDuration *= _landingBounceDurationMultiplier;
            }

            _landingBounceTween = bounceSequence
                .OnComplete(() => _ball.position = landingPosition);
        }

        private void OpenGame()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.EndGame();
            }
        }

        private void PlaceBallInFrontOfPlayer()
        {
            if (_player == null || _ball == null)
            {
                return;
            }

            _kickDirection = Vector3.right;
        }


        private void FollowBall()
        {
            Vector3 desiredPosition = _ball.position +
                                      _kickDirection * _ballCameraOffset.x +
                                      Vector3.up * _ballCameraOffset.y +
                                      Vector3.forward * _ballCameraOffset.z;
            float followFactor = 1f - Mathf.Exp(-_cameraFollowSpeed * Time.deltaTime);

            _gameCamera.transform.position = Vector3.Lerp(
                _gameCamera.transform.position,
                desiredPosition,
                followFactor);

            Vector3 lookDirection = _ball.position - _gameCamera.transform.position;
            if (lookDirection.sqrMagnitude > 0.0001f)
            {
                Quaternion lookRotation = Quaternion.LookRotation(lookDirection, Vector3.up);
                _gameCamera.transform.rotation = Quaternion.Slerp(
                    _gameCamera.transform.rotation,
                    lookRotation,
                    followFactor);
            }
        }
    }
}
