using TMPro;
using UnityEngine;
using UnityEngine.Serialization;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("First Person Camera")] [SerializeField]
        private Camera _playerCamera;

        [Header("Intro")] [FormerlySerializedAs("_introText")] [SerializeField]
        private TMP_Text _gameplayText;

        [SerializeField, Min(1)] private int _introTurnCount = 5;
        [SerializeField] private float _introMinYawAngle = 25f;
        [SerializeField] private float _introMaxYawAngle = 40f;
        [SerializeField] private float _introTurnDuration = 0.5f;
        [SerializeField] private float _introTurnDelay = 0.2f;

        [Header("Steve Pressure Motion")] [SerializeField]
        private Transform[] _steveObjects;

        [SerializeField] private float _steveScalePulse = 0.025f;
        [SerializeField] private float _steveMotionSpeed = 3.5f;
        [SerializeField, Range(0f, 1f)] private float _steveGameplayIntensity = 0.65f;

        [Header("Gameplay UI")] [SerializeField]
        private GameObject _buttons;

        [SerializeField] private Button[] _weaponButtons;

        [Header("Hand Tutorial")] [SerializeField]
        private RectTransform _handTutorial;

        [SerializeField] private Vector2 _handOffset = new Vector2(35f, -35f);
        [SerializeField] private float _handMoveDuration = 0.55f;
        [SerializeField] private float _handPressDuration = 0.3f;
        [SerializeField] private float _handPauseDuration = 0.2f;
        [SerializeField, Range(0.05f, 0.5f)] private float _handPressScale = 0.15f;
        [SerializeField] private AudioClip _breathingSound;

        private enum HandPhase
        {
            Move,
            Press,
            Pause
        }

        private Transform _cameraTransform;
        private Vector3 _cameraStartLocalPosition;
        private Quaternion _cameraStartLocalRotation;
        private Vector3 _handMoveStartPosition;
        private Vector3 _handStartScale;
        private Vector3[] _steveStartScales;
        private float _introSegmentTimer;
        private float _introDelayTimer;
        private float _introStartYaw;
        private float _introTargetYaw;
        private float _handPhaseTimer;
        private int _introTurnIndex;
        private int _handTargetIndex;
        private HandPhase _handPhase;
        private bool _introWaitingForNextTurn;
        private bool _introReturningToCenter;
        private bool _introFinished;
        private bool _hasSelectedWeapon;

        private void Awake()
        {
            if (_playerCamera == null)
            {
                _playerCamera = Camera.main;
            }

            if (_playerCamera != null)
            {
                _cameraTransform = _playerCamera.transform;
                _cameraStartLocalPosition = _cameraTransform.localPosition;
                _cameraStartLocalRotation = _cameraTransform.localRotation;
            }

            CacheSteveTransforms();
            ConfigureUi();
            ConfigureButtons();
        }

        private void Start()
        {
            StartIntro();
            AudioManager.Instance.PlaySound(_breathingSound, true);
        }

        private void Update()
        {
            UpdateStevePressure();

            if (!_introFinished)
            {
                UpdateIntro();
                return;
            }


            if (!_hasSelectedWeapon)
            {
                UpdateHandTutorial();
            }
        }

        private void OnDestroy()
        {
            if (_weaponButtons == null)
            {
                return;
            }

            foreach (Button weaponButton in _weaponButtons)
            {
                if (weaponButton != null)
                {
                    weaponButton.onClick.RemoveListener(SelectWeapon);
                }
            }
        }

        private void ConfigureUi()
        {
            if (_gameplayText != null)
            {
                _gameplayText.text = "Can you survive this?";
                _gameplayText.gameObject.SetActive(true);
            }

            if (_handTutorial != null)
            {
                _handStartScale = _handTutorial.localScale;
                _handTutorial.gameObject.SetActive(false);
            }
        }

        private void ConfigureButtons()
        {
            if (_weaponButtons == null)
            {
                return;
            }

            foreach (Button weaponButton in _weaponButtons)
            {
                if (weaponButton == null)
                {
                    continue;
                }

                weaponButton.onClick.RemoveListener(SelectWeapon);
                weaponButton.onClick.AddListener(SelectWeapon);
                weaponButton.interactable = true;
            }
        }

        private void StartIntro()
        {
            _introSegmentTimer = 0f;
            _introDelayTimer = 0f;
            _introStartYaw = 0f;
            _introTurnIndex = 0;
            _introWaitingForNextTurn = false;
            _introReturningToCenter = false;
            _introFinished = false;

            if (_cameraTransform == null || _introTurnDuration <= 0f || _introTurnCount <= 0)
            {
                FinishIntro();
                return;
            }

            _introTargetYaw = GetRandomIntroYaw(_introTurnIndex);
        }

        private void UpdateIntro()
        {
            if (_introWaitingForNextTurn)
            {
                ApplyIntroCameraRotation(_introTargetYaw);
                _introDelayTimer += Time.deltaTime;

                if (_introDelayTimer >= _introTurnDelay)
                {
                    AdvanceIntroTurn();
                }

                return;
            }

            _introSegmentTimer += Time.deltaTime;
            float progress = Mathf.Clamp01(_introSegmentTimer / _introTurnDuration);
            float smoothProgress = progress * progress * (3f - 2f * progress);
            float yaw = Mathf.Lerp(_introStartYaw, _introTargetYaw, smoothProgress);

            ApplyIntroCameraRotation(yaw);

            if (progress < 1f)
            {
                return;
            }

            _introWaitingForNextTurn = true;
            _introDelayTimer = 0f;
        }

        private void AdvanceIntroTurn()
        {
            _introWaitingForNextTurn = false;

            if (_introReturningToCenter)
            {
                FinishIntro();
                return;
            }

            _introTurnIndex++;
            _introSegmentTimer = 0f;
            _introStartYaw = _introTargetYaw;

            if (_introTurnIndex >= _introTurnCount)
            {
                _introReturningToCenter = true;
                _introTargetYaw = 0f;
                return;
            }

            _introTargetYaw = GetRandomIntroYaw(_introTurnIndex);
        }

        private void ApplyIntroCameraRotation(float yaw)
        {
            _cameraTransform.localPosition = _cameraStartLocalPosition;
            _cameraTransform.localRotation = _cameraStartLocalRotation *
                                             Quaternion.Euler(0f, yaw, 0f);
        }

        private float GetRandomIntroYaw(int turnIndex)
        {
            float minimumAngle = Mathf.Min(
                Mathf.Abs(_introMinYawAngle),
                Mathf.Abs(_introMaxYawAngle));
            float maximumAngle = Mathf.Max(
                Mathf.Abs(_introMinYawAngle),
                Mathf.Abs(_introMaxYawAngle));
            float randomAngle = Random.Range(minimumAngle, maximumAngle);
            bool lookLeft = turnIndex % 2 == 0;
            return lookLeft ? -randomAngle : randomAngle;
        }

        private void FinishIntro()
        {
            _introFinished = true;

            if (_cameraTransform != null)
            {
                _cameraTransform.localPosition = _cameraStartLocalPosition;
                _cameraTransform.localRotation = _cameraStartLocalRotation;
            }

            if (_gameplayText != null)
            {
                _gameplayText.text = "Pick item to survive";
            }

            _buttons.SetActive(true);

            StartHandTutorial();
        }


        private void CacheSteveTransforms()
        {
            if (_steveObjects == null)
            {
                return;
            }

            _steveStartScales = new Vector3[_steveObjects.Length];

            for (int index = 0; index < _steveObjects.Length; index++)
            {
                Transform steve = _steveObjects[index];
                if (steve == null)
                {
                    continue;
                }

                _steveStartScales[index] = steve.localScale;
            }
        }

        private void UpdateStevePressure()
        {
            if (_steveObjects == null || _steveStartScales == null)
            {
                return;
            }

            float intensity = _introFinished ? _steveGameplayIntensity : 1f;

            for (int index = 0; index < _steveObjects.Length; index++)
            {
                Transform steve = _steveObjects[index];
                if (steve == null)
                {
                    continue;
                }

                float phase = Time.time * _steveMotionSpeed + index * 1.73f;
                float scalePulse = 1f + Mathf.Abs(Mathf.Sin(phase * 0.8f)) *
                    _steveScalePulse * intensity;
                steve.localScale = _steveStartScales[index] * scalePulse;
            }
        }


        private void StartHandTutorial()
        {
            if (_handTutorial == null || !HasValidWeaponButton())
            {
                return;
            }

            _handTargetIndex = FindNextValidButtonIndex(-1);
            _handPhase = HandPhase.Move;
            _handPhaseTimer = 0f;
            _handMoveStartPosition = _handTutorial.position;
            _handTutorial.localScale = _handStartScale;
            _handTutorial.gameObject.SetActive(true);
        }

        private void UpdateHandTutorial()
        {
            if (_handTutorial == null || _weaponButtons == null || _handTargetIndex < 0)
            {
                return;
            }

            RectTransform target = _weaponButtons[_handTargetIndex].transform as RectTransform;
            if (target == null)
            {
                MoveToNextButton();
                return;
            }

            _handPhaseTimer += Time.deltaTime;

            if (_handPhase == HandPhase.Move)
            {
                float progress = Mathf.Clamp01(_handPhaseTimer / Mathf.Max(0.01f, _handMoveDuration));
                float smoothProgress = progress * progress * (3f - 2f * progress);
                Vector3 targetPosition = target.TransformPoint(_handOffset);
                _handTutorial.position = Vector3.Lerp(
                    _handMoveStartPosition,
                    targetPosition,
                    smoothProgress);

                if (progress >= 1f)
                {
                    SetHandPhase(HandPhase.Press);
                }

                return;
            }

            if (_handPhase == HandPhase.Press)
            {
                float progress = Mathf.Clamp01(_handPhaseTimer / Mathf.Max(0.01f, _handPressDuration));
                float pulse = Mathf.Sin(progress * Mathf.PI) * _handPressScale;
                _handTutorial.localScale = _handStartScale * (1f - pulse);

                if (progress >= 1f)
                {
                    _handTutorial.localScale = _handStartScale;
                    SetHandPhase(HandPhase.Pause);
                }

                return;
            }

            if (_handPhaseTimer >= _handPauseDuration)
            {
                MoveToNextButton();
            }
        }

        private void MoveToNextButton()
        {
            _handTargetIndex = FindNextValidButtonIndex(_handTargetIndex);
            _handMoveStartPosition = _handTutorial.position;
            SetHandPhase(HandPhase.Move);
        }

        private void SetHandPhase(HandPhase phase)
        {
            _handPhase = phase;
            _handPhaseTimer = 0f;
        }

        private bool HasValidWeaponButton()
        {
            return FindNextValidButtonIndex(-1) >= 0;
        }

        private int FindNextValidButtonIndex(int currentIndex)
        {
            if (_weaponButtons == null || _weaponButtons.Length == 0)
            {
                return -1;
            }

            for (int offset = 1; offset <= _weaponButtons.Length; offset++)
            {
                int index = (currentIndex + offset) % _weaponButtons.Length;
                if (_weaponButtons[index] != null)
                {
                    return index;
                }
            }

            return -1;
        }

        private void SelectWeapon()
        {
            if (_hasSelectedWeapon)
            {
                return;
            }

            _hasSelectedWeapon = true;

            if (_handTutorial != null)
            {
                _handTutorial.gameObject.SetActive(false);
            }

            if (_weaponButtons != null)
            {
                foreach (Button weaponButton in _weaponButtons)
                {
                    if (weaponButton != null)
                    {
                        weaponButton.interactable = false;
                    }
                }
            }

            if (GameManager.Instance != null)
            {
                GameManager.Instance.EndGame();
            }
        }
    }
}
