using System;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [SerializeField] private GameObject _gameplay;
        [SerializeField] private GameObject _titleCTA;
        [SerializeField] private GameObject _btnCTA;
        [SerializeField] private TMP_Text _title;
        [SerializeField] private GameObject _tut;
        [SerializeField] private List<ObjectActive> _objects;
        [Header("Tutorial")] [SerializeField] private float _tutMoveDuration = 0.5f;
        [SerializeField] private float _tutPressScale = 0.8f;
        [SerializeField] private float _tutPressDuration = 0.15f;

        [Header("Camera End Pose")] [SerializeField]
        private Transform _cameraTransform;

        [SerializeField] private Vector3 _cameraEndPosition;
        [SerializeField] private Vector3 _cameraEndRotation;
        [SerializeField] private float _cameraMoveDuration = 1f;

        [Header("CTA")] [SerializeField] private float _gameplayToCtaDelay = 1.5f;
        [SerializeField] private Vector3 _ctaPunchScale = new Vector3(1.2f, 1.2f, 1.2f);
        [SerializeField] private float _ctaScaleUpDuration = 0.5f;
        [SerializeField] private float _ctaScaleDownDuration = 0.15f;

        private Sequence _tutorialSequence;
        private Sequence _cameraSequence;
        private Sequence _ctaSequence;
        private Tween _ctaDelayTween;
        private readonly HashSet<Button> _clickedButtons = new HashSet<Button>();
        private int _buttonCount;
        private Vector3 _tutOriginalScale;
        private Vector3 _tutPressedScale;
        private int _lastScreenWidth;
        private int _lastScreenHeight;

        private void Start()
        {
            _title.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 1f).SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);
            foreach (var t in _objects)
            {
                if (t.BtnActive != null)
                {
                    _buttonCount++;
                }

                ActiveObject(t);
            }

            PlayTutorial();

            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;
        }

        private void Update()
        {
            if (Screen.width == _lastScreenWidth && Screen.height == _lastScreenHeight)
            {
                return;
            }

            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;
            RestartTutorialAfterScreenChange();
        }

        private void PlayTutorial()
        {
            if (_tut == null || _buttonCount == 0)
            {
                MoveCameraToEndPose();
                return;
            }

            Canvas.ForceUpdateCanvases();
            Transform tutTransform = _tut.transform;
            _tutOriginalScale = tutTransform.localScale;
            _tutPressedScale = _tutOriginalScale * _tutPressScale;

            CreateTutorialPass(tutTransform, _tutOriginalScale, _tutPressedScale, true, false);
        }

        private void RestartTutorialAfterScreenChange()
        {
            if (_tut == null || !_tut.activeSelf)
            {
                return;
            }

            _tutorialSequence?.Kill();
            Canvas.ForceUpdateCanvases();
            Transform tutTransform = _tut.transform;
            tutTransform.localScale = _tutOriginalScale;

            CreateTutorialPass(tutTransform, _tutOriginalScale, _tutPressedScale, true, false);
        }

        private void CreateTutorialPass(Transform tutTransform, Vector3 originalScale, Vector3 pressedScale,
            bool moveForward, bool skipFirstButton)
        {
            _tutorialSequence = DOTween.Sequence();
            int startIndex = moveForward ? 0 : _objects.Count - 1;
            int endIndex = moveForward ? _objects.Count : -1;
            int step = moveForward ? 1 : -1;
            bool skippedFirstButton = false;

            for (int index = startIndex; index != endIndex; index += step)
            {
                ObjectActive objectActive = _objects[index];
                if (objectActive.BtnActive == null)
                {
                    continue;
                }

                if (skipFirstButton && _buttonCount > 1 && !skippedFirstButton)
                {
                    skippedFirstButton = true;
                    continue;
                }

                Button button = objectActive.BtnActive;
                _tutorialSequence.Append(CreateTutMoveTween(tutTransform, button));
                _tutorialSequence.Append(tutTransform.DOScale(pressedScale, _tutPressDuration)
                    .SetEase(Ease.InOutQuad)
                    .SetLoops(2, LoopType.Yoyo));
            }

            _tutorialSequence.OnComplete(() =>
                CreateTutorialPass(tutTransform, originalScale, pressedScale, !moveForward, true));
        }

        private Tween CreateTutMoveTween(Transform tutTransform, Button button)
        {
            if (!(tutTransform is RectTransform tutRect) || !(button.transform is RectTransform buttonRect) ||
                !(tutRect.parent is RectTransform tutParent))
            {
                return tutTransform.DOMove(button.transform.position, _tutMoveDuration)
                    .SetEase(Ease.InOutQuad);
            }

            Canvas buttonCanvas = button.GetComponentInParent<Canvas>();
            Canvas tutCanvas = tutRect.GetComponentInParent<Canvas>();
            Camera buttonCamera = buttonCanvas != null && buttonCanvas.renderMode != RenderMode.ScreenSpaceOverlay
                ? buttonCanvas.worldCamera
                : null;
            Camera tutCamera = tutCanvas != null && tutCanvas.renderMode != RenderMode.ScreenSpaceOverlay
                ? tutCanvas.worldCamera
                : null;
            Vector2 screenPosition = RectTransformUtility.WorldToScreenPoint(buttonCamera, buttonRect.position);

            RectTransformUtility.ScreenPointToLocalPointInRectangle(
                tutParent,
                screenPosition,
                tutCamera,
                out Vector2 localPosition);

            return tutRect.DOLocalMove(
                    new Vector3(localPosition.x, localPosition.y, tutRect.localPosition.z),
                    _tutMoveDuration)
                .SetEase(Ease.InOutQuad);
        }

        private void MoveCameraToEndPose()
        {
            Transform cameraTransform = _cameraTransform != null
                ? _cameraTransform
                : Camera.main != null
                    ? Camera.main.transform
                    : null;

            if (cameraTransform == null)
            {
                return;
            }

            if (_gameplay != null)
            {
                _gameplay.SetActive(false);
            }

            _cameraSequence = DOTween.Sequence();
            _cameraSequence.Join(
                cameraTransform.DOMove(_cameraEndPosition, _cameraMoveDuration).SetEase(Ease.InOutQuad));
            _cameraSequence.Join(cameraTransform.DORotate(_cameraEndRotation, _cameraMoveDuration)
                .SetEase(Ease.InOutQuad));
            _cameraSequence.OnComplete(PlayCTASequence);
        }

        private void PlayCTASequence()
        {
            _ctaDelayTween = DOVirtual.DelayedCall(_gameplayToCtaDelay, () =>
            {
                _ctaSequence = DOTween.Sequence();
                AppendCtaPunch(_ctaSequence, _titleCTA);
                AppendCtaPunch(_ctaSequence, _btnCTA);
                _ctaSequence.OnComplete(() =>
                {
                    DOVirtual.DelayedCall(0.25f, () => { GameManager.Instance.EndGame(); });
                });
            });
        }

        private void AppendCtaPunch(Sequence sequence, GameObject cta)
        {
            if (cta == null)
            {
                return;
            }

            cta.SetActive(true);
            Transform ctaTransform = cta.transform;
            ctaTransform.localScale = Vector3.zero;
            sequence.Append(ctaTransform.DOScale(_ctaPunchScale, _ctaScaleUpDuration).SetEase(Ease.OutBack));
            sequence.Append(ctaTransform.DOScale(Vector3.one, _ctaScaleDownDuration).SetEase(Ease.OutBack));
        }

        private void OnDestroy()
        {
            _tutorialSequence?.Kill();
            _cameraSequence?.Kill();
            _ctaSequence?.Kill();
            _ctaDelayTween?.Kill();
        }

        private void ActiveObject(ObjectActive obj)
        {
            if (obj.BtnActive == null)
            {
                return;
            }

            obj.BtnActive.onClick.AddListener(() =>
            {
                _tutorialSequence?.Kill();
                if (_tut != null)
                {
                    _tut.SetActive(false);
                }

                foreach (ObjectActive objectActive in _objects)
                {
                    if (objectActive.Chose != null)
                    {
                        objectActive.Chose.SetActive(false);
                    }
                }

                if (obj.Chose != null)
                {
                    obj.Chose.SetActive(true);
                }

                bool activatedObject = false;
                foreach (GameObject objectToActivate in obj.Objects)
                {
                    if (objectToActivate == null || objectToActivate.activeSelf)
                    {
                        continue;
                    }

                    objectToActivate.SetActive(true);
                }


                OnButtonClicked(obj.BtnActive);
            });
        }

        private void OnButtonClicked(Button button)
        {
            if (!_clickedButtons.Add(button) || _clickedButtons.Count < _buttonCount)
            {
                return;
            }

            MoveCameraToEndPose();
        }
    }

    [Serializable]
    public struct ObjectActive
    {
        public Button BtnActive;
        public GameObject Chose;
        public List<GameObject> Objects;
    }
}