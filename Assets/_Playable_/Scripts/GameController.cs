using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [SerializeField] private GameObject _objAnimal;
        [SerializeField] private Button _btnDog;
        [SerializeField] private Button _btnCat;
        [SerializeField] private GameObject _objDog;
        [SerializeField] private Button _btnHouseDog1;
        [SerializeField] private Button _btnHouseDog2;
        [SerializeField] private GameObject _objCat;
        [SerializeField] private Button _btnHouseCat1;
        [SerializeField] private Button _btnHouseCat2;
        [SerializeField] private GameObject _hand;
        [SerializeField] private float _duration;
        [SerializeField] private float _pressScale = 0.9f;
        [SerializeField] private float _pressDuration = 0.2f;
        [SerializeField] private float _buttonPressedScale = 1.1f;
        [SerializeField] private float _buttonScaleDuration = 0.12f;
        [SerializeField] private AudioClip _clickSound;
        [SerializeField] private List<Transform> _texts;

        private Vector3 _handDefaultScale;
        private Sequence _handSequence;
        private Transform _handStart;
        private Transform _handEnd;
        private int _screenWidth;
        private int _screenHeight;
        private Coroutine _refreshHandCoroutine;

        private void Awake()
        {
            _handDefaultScale = _hand.transform.localScale;
        }

        private void Start()
        {
            _btnCat.onClick.AddListener(HandleClickCat);
            _btnDog.onClick.AddListener(HandleClickDog);
            AddButtonScaleEffect(_btnCat);
            AddButtonScaleEffect(_btnDog);
            _screenWidth = Screen.width;
            _screenHeight = Screen.height;
            AnimateHand(_btnCat.transform, _btnDog.transform);
            foreach (var t in _texts)
            {
                DoScaleText(t);
            }
        }

        private void DoScaleText(Transform text)
        {
            text.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.5f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Yoyo);
        }

        private void Update()
        {
            if (_screenWidth == Screen.width && _screenHeight == Screen.height)
            {
                return;
            }

            _screenWidth = Screen.width;
            _screenHeight = Screen.height;

            if (_refreshHandCoroutine == null)
            {
                _refreshHandCoroutine = StartCoroutine(RefreshHandPosition());
            }
        }

        private void HandleClickDog()
        {
            AudioManager.Instance.PlaySound(_clickSound);
            _objAnimal.SetActive(false);
            _objDog.SetActive(true);
            _btnHouseDog1.onClick.AddListener(() =>
            {
                AudioManager.Instance.PlaySound(_clickSound);
                GameManager.Instance.EndGame();
            });
            _btnHouseDog2.onClick.AddListener(() =>
            {
                AudioManager.Instance.PlaySound(_clickSound);
                GameManager.Instance.EndGame();
            });
            AnimateHand(_btnHouseDog2.transform, _btnHouseDog1.transform);
        }

        private void HandleClickCat()
        {
            AudioManager.Instance.PlaySound(_clickSound);
            _objAnimal.SetActive(false);
            _objCat.SetActive(true);
            _btnHouseCat1.onClick.AddListener(() =>
            {
                AudioManager.Instance.PlaySound(_clickSound);
                GameManager.Instance.EndGame();
            });
            _btnHouseCat2.onClick.AddListener(() =>
            {
                AudioManager.Instance.PlaySound(_clickSound);
                GameManager.Instance.EndGame();
            });
            AnimateHand(_btnHouseCat2.transform, _btnHouseCat1.transform);
        }

        private void AnimateHand(Transform start, Transform end)
        {
            _handSequence?.Kill();
            _handStart = start;
            _handEnd = end;

            Transform handTransform = _hand.transform;
            handTransform.position = start.position;
            handTransform.localScale = _handDefaultScale;

            _handSequence = DOTween.Sequence()
                .Append(CreateHandPressTween(handTransform))
                .Append(handTransform.DOMove(end.position, _duration).SetEase(Ease.InOutSine))
                .Append(CreateHandPressTween(handTransform))
                .Append(handTransform.DOMove(start.position, _duration).SetEase(Ease.InOutSine))
                .SetLoops(-1, LoopType.Restart);
        }

        private IEnumerator RefreshHandPosition()
        {
            yield return new WaitForEndOfFrame();
            Canvas.ForceUpdateCanvases();

            if (_handStart != null && _handEnd != null)
            {
                AnimateHand(_handStart, _handEnd);
            }

            _refreshHandCoroutine = null;
        }

        private Sequence CreateHandPressTween(Transform handTransform)
        {
            float halfDuration = _pressDuration * 0.5f;
            Vector3 pressedScale = _handDefaultScale * _pressScale;

            return DOTween.Sequence()
                .Append(handTransform.DOScale(pressedScale, halfDuration).SetEase(Ease.InOutSine))
                .Append(handTransform.DOScale(_handDefaultScale, halfDuration).SetEase(Ease.InOutSine));
        }

        private void AddButtonScaleEffect(Button button)
        {
            Transform buttonTransform = button.transform;
            Vector3 defaultScale = buttonTransform.localScale;
            EventTrigger eventTrigger = button.GetComponent<EventTrigger>();

            if (eventTrigger == null)
            {
                eventTrigger = button.gameObject.AddComponent<EventTrigger>();
            }

            if (eventTrigger.triggers == null)
            {
                eventTrigger.triggers = new List<EventTrigger.Entry>();
            }

            AddEventTrigger(eventTrigger, EventTriggerType.PointerDown, () =>
            {
                buttonTransform.DOKill();
                buttonTransform.DOScale(defaultScale * _buttonPressedScale, _buttonScaleDuration)
                    .SetEase(Ease.OutBack);
            });
            AddEventTrigger(eventTrigger, EventTriggerType.PointerUp, () =>
            {
                buttonTransform.DOKill();
                buttonTransform.DOScale(defaultScale, _buttonScaleDuration)
                    .SetEase(Ease.OutSine);
            });
        }

        private static void AddEventTrigger(EventTrigger eventTrigger, EventTriggerType eventType,
            UnityEngine.Events.UnityAction action)
        {
            EventTrigger.Entry entry = new EventTrigger.Entry
            {
                eventID = eventType
            };
            entry.callback.AddListener(_ => action());
            eventTrigger.triggers.Add(entry);
        }

        private void OnDestroy()
        {
            _handSequence?.Kill();

            if (_refreshHandCoroutine != null)
            {
                StopCoroutine(_refreshHandCoroutine);
            }
        }
    }
}