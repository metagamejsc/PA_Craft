using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public static GameController Instance;

        [Header("References")] [SerializeField]
        private Transform _cameraShakeTarget;

        [SerializeField] private TMP_Text _countdownText;
        [SerializeField] private List<EnemyController> _enemies = new List<EnemyController>();

        [Header("Countdown")] [SerializeField] private float _delayBeforeShake = 10f;
        [SerializeField] private Color _normalTextColor = Color.white;
        [SerializeField] private Color _warningTextColor = Color.red;
        [SerializeField] private float _warningThreshold = 5f;
        [SerializeField] private float _warningScale = 1.2f;
        [SerializeField] private float _warningPulseDuration = 0.25f;

        [Header("Shake")] [SerializeField] private float _shakeDuration = 1f;
        [SerializeField] private float _shakeStrength = 0.2f;

        private Coroutine _countdownCoroutine;
        private Tween _warningTween;
        private Vector3 _countdownDefaultScale = Vector3.one;
        private bool _isSafe;
        private bool _hasStartedEnemyMove;

        public bool IsSafe
        {
            get => _isSafe;
            set => _isSafe = value;
        }

        private void Awake()
        {
            Instance = this;

            if (_countdownText != null)
            {
                _countdownDefaultScale = _countdownText.transform.localScale;
            }
        }

        private void Start()
        {
            StartShakeCountdown();
        }

        private void Update()
        {
            if (_hasStartedEnemyMove)
            {
                return;
            }

            if (HasTapInput())
            {
                StartAllEnemyMove();
            }
        }

        public void StartShakeCountdown()
        {
            StopShakeCountdown();
            _countdownCoroutine = StartCoroutine(IEShakeCountdown());
        }

        public void StartAllEnemyMove()
        {
            if (_enemies == null || _enemies.Count == 0)
            {
                return;
            }

            _hasStartedEnemyMove = true;

            for (int i = 0; i < _enemies.Count; i++)
            {
                if (_enemies[i] == null)
                {
                    continue;
                }

                _enemies[i].Move();
            }
        }

        public void StopShakeCountdown()
        {
            if (_countdownCoroutine != null)
            {
                StopCoroutine(_countdownCoroutine);
                _countdownCoroutine = null;
            }

            StopWarningEffect();
            SetCountdownText(0f);
        }

        private IEnumerator IEShakeCountdown()
        {
            float remainingTime = _delayBeforeShake;

            while (remainingTime > 0f)
            {
                SetCountdownText(remainingTime);

                if (remainingTime <= _warningThreshold)
                {
                    PlayWarningEffect();
                }
                else
                {
                    StopWarningEffect();
                }

                remainingTime -= Time.deltaTime;
                yield return null;
            }

            SetCountdownText(0f);
            StopWarningEffect();
            _countdownCoroutine = null;

            PlayCameraShake();
        }

        private void SetCountdownText(float remainingTime)
        {
            if (_countdownText == null)
            {
                return;
            }

            int displayTime = Mathf.CeilToInt(Mathf.Max(remainingTime, 0f));
            _countdownText.text = displayTime.ToString();
            _countdownText.color = remainingTime <= _warningThreshold ? _warningTextColor : _normalTextColor;
        }

        private void PlayWarningEffect()
        {
            if (_countdownText == null || _warningTween != null)
            {
                return;
            }

            _countdownText.transform.localScale = _countdownDefaultScale;
            _warningTween = _countdownText.transform
                .DOScale(_countdownDefaultScale * _warningScale, _warningPulseDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _warningTween = null);
        }

        private void StopWarningEffect()
        {
            if (_countdownText != null)
            {
                _countdownText.color = _normalTextColor;
                _countdownText.transform.localScale = _countdownDefaultScale;
            }

            _warningTween?.Kill();
            _warningTween = null;
        }

        private void PlayCameraShake()
        {
            if (_cameraShakeTarget == null)
            {
                return;
            }

            _cameraShakeTarget.DOComplete();
            _cameraShakeTarget.DOShakePosition(
                _shakeDuration,
                _shakeStrength).OnComplete(() =>
            {
                if (_isSafe)
                {
                    GameManager.Instance.ShowWinPanel();
                }
                else
                {
                    GameManager.Instance.ShowFailPanel();
                }

                GameManager.Instance.EndGame();
            });
        }

        private bool HasTapInput()
        {
            if (Input.touchCount > 0)
            {
                return Input.GetTouch(0).phase == TouchPhase.Began;
            }

#if UNITY_EDITOR || UNITY_STANDALONE
            return Input.GetMouseButtonDown(0);
#else
            return false;
#endif
        }

        private void OnDisable()
        {
            StopShakeCountdown();
        }
    }
}
