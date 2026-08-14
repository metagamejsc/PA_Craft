using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Hand Tutorial")] [SerializeField]
        private RectTransform _handTutorial;

        [SerializeField] private List<Button> _hotbarButtons = new List<Button>();
        [SerializeField] private float _handMoveDuration = 0.6f;
        [SerializeField] private float _handPressScale = 0.85f;
        [SerializeField] private float _ctaScaleMultiplier = 1.15f;
        [SerializeField] private float _pressDuration = 0.15f;
        [SerializeField] private List<Button> _btnCTA = new List<Button>();
        [SerializeField] private GameObject _cta;

        private readonly List<Vector3> _buttonPositions = new List<Vector3>();
        private Sequence _handSequence;
        private Tween _ctaTween;
        private Coroutine _layoutCoroutine;
        private Vector3 _handInitialScale;
        private Vector2Int _lastScreenSize;

        private void Start()
        {
            if (_handTutorial != null)
            {
                _handInitialScale = _handTutorial.localScale;
            }

            _cta.transform.DOScale(1.2f,1).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);

            _lastScreenSize = new Vector2Int(Screen.width, Screen.height);
            ScheduleTutorial();

            foreach (Button button in _btnCTA)
            {
                button.onClick.AddListener(() => { GameManager.Instance.EndGame(); });
            }
        }

        private void Update()
        {
            Vector2Int screenSize = new Vector2Int(Screen.width, Screen.height);
            if (screenSize == _lastScreenSize)
            {
                return;
            }

            _lastScreenSize = screenSize;
            ScheduleTutorial();
        }

        private void ScheduleTutorial()
        {
            _handSequence?.Kill();

            if (_layoutCoroutine != null)
            {
                StopCoroutine(_layoutCoroutine);
            }

            _layoutCoroutine = StartCoroutine(StartTutorialAfterLayout());
        }

        private IEnumerator StartTutorialAfterLayout()
        {
            yield return new WaitForEndOfFrame();
            Canvas.ForceUpdateCanvases();
            StartHandTutorial();
            _layoutCoroutine = null;
        }

        private void StartHandTutorial()
        {
            if (_handTutorial == null || _handTutorial.parent == null)
            {
                return;
            }

            Transform handParent = _handTutorial.parent;
            _buttonPositions.Clear();

            for (int index = 0; index < _hotbarButtons.Count; index++)
            {
                Button button = _hotbarButtons[index];
                if (button != null && button.gameObject.activeInHierarchy)
                {
                    _buttonPositions.Add(handParent.InverseTransformPoint(button.transform.position));
                }
            }

            if (_buttonPositions.Count == 0)
            {
                _handTutorial.gameObject.SetActive(false);
                return;
            }

            _handTutorial.gameObject.SetActive(true);
            _handTutorial.localPosition = _buttonPositions[0];
            _handTutorial.localScale = _handInitialScale;

            _handSequence = DOTween.Sequence();
            _handSequence.Append(CreateHandPressTween());

            for (int index = 1; index < _buttonPositions.Count; index++)
            {
                _handSequence
                    .Append(_handTutorial.DOLocalMove(_buttonPositions[index], _handMoveDuration)
                        .SetEase(Ease.InOutSine))
                    .Append(CreateHandPressTween());
            }

            if (_buttonPositions.Count > 1)
            {
                _handSequence.Append(_handTutorial.DOLocalMove(_buttonPositions[0], _handMoveDuration)
                    .SetEase(Ease.InOutSine));
            }

            _handSequence.SetLoops(-1).SetUpdate(true);
        }

        private Tween CreateHandPressTween()
        {
            return _handTutorial
                .DOScale(_handInitialScale * _handPressScale, _pressDuration)
                .SetLoops(2, LoopType.Yoyo)
                .SetEase(Ease.InOutSine);
        }
        

        private void OnDestroy()
        {
            _handSequence?.Kill();
            _ctaTween?.Kill();
            

            if (_layoutCoroutine != null)
            {
                StopCoroutine(_layoutCoroutine);
            }
        }
    }
}
