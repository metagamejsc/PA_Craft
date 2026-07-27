using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Player")] [SerializeField] private Animator _playerAnimator;
        [SerializeField] private string _kickAnimTrigger = "Kick";
        [SerializeField] private float _kickAnimDelay = 0.4f;

        [Header("Power Bar")] [SerializeField] private Image _powerBarFill;
        [SerializeField] private float _powerSpeed = 1.2f;
        private float _currentPower;
        private bool _isChargingPower = true;

        [Header("Tap To Kick UI")] [SerializeField]
        private RectTransform _tapText;

        [SerializeField] private RectTransform _handTut;
        [SerializeField] private CanvasGroup _tapToKickGroup;
        [SerializeField] private Button _kickButton;

        [Header("Ball")] [SerializeField] private Transform _ball;
        [SerializeField] private float _minDistance = 5f;
        [SerializeField] private float _maxDistance = 20f;
        [SerializeField] private float _minHeight = 1f;
        [SerializeField] private float _maxHeight = 5f;
        [SerializeField] private float _flightDuration = 1.2f;

        [Header("Camera")] [SerializeField] private Transform _cameraTransform;
        [SerializeField] private Vector3 _cameraOffset = new Vector3(0f, 3f, -6f);
        [SerializeField] private float _cameraFollowSpeed = 4f;
        private bool _isFollowingBall;

        [Header("Open Button")] [SerializeField]
        private GameObject _openButtonObject;

        [SerializeField] private Button _openButton;

        private Vector3 _ballStartPos;

        private void Start()
        {
            _ballStartPos = _ball.position;

            _kickButton.onClick.AddListener(OnKickPressed);
            _openButton.onClick.AddListener(() => GameManager.Instance.EndGame());
            _openButtonObject.SetActive(false);

            PlayTapTutAnim();
        }

        private void PlayTapTutAnim()
        {
            _tapText.DOScale(1.15f, 0.5f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
            _handTut.DOScale(0.85f, 0.4f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
        }

        private void Update()
        {
            if (_isChargingPower)
            {
                _currentPower = Mathf.PingPong(Time.time * _powerSpeed, 1f);
                _powerBarFill.fillAmount = _currentPower;
            }

            if (_isFollowingBall)
            {
                Vector3 desiredPos = _ball.position + _cameraOffset;
                _cameraTransform.position = Vector3.Lerp(_cameraTransform.position, desiredPos,
                    _cameraFollowSpeed * Time.deltaTime);
                _cameraTransform.LookAt(_ball);
            }
        }

        private void OnKickPressed()
        {
            _isChargingPower = false;
            _kickButton.gameObject.SetActive(false);
            _tapToKickGroup.DOFade(0f, 0.25f).OnComplete(() => _tapToKickGroup.gameObject.SetActive(false));

            if (_playerAnimator) _playerAnimator.SetTrigger(_kickAnimTrigger);

            DOVirtual.DelayedCall(_kickAnimDelay, LaunchBall);
        }

        private void LaunchBall()
        {
            float distance = Mathf.Lerp(_minDistance, _maxDistance, _currentPower);
            float height = Mathf.Lerp(_minHeight, _maxHeight, _currentPower);
            Vector3 targetPos = _ballStartPos + _ball.forward * distance;

            _isFollowingBall = true;

            DOVirtual.Float(0f, 1f, _flightDuration, t =>
            {
                Vector3 pos = Vector3.Lerp(_ballStartPos, targetPos, t);
                pos.y += height * 4f * t * (1f - t); // đường cong parabol
                _ball.position = pos;
            }).SetEase(Ease.Linear).OnComplete(OnBallLanded);
        }

        private void OnBallLanded()
        {
            _isFollowingBall = false;
            _openButtonObject.SetActive(true);
        }
    }
}