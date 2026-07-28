using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Hand Tutorial")] [SerializeField]
        private GameObject _hand;

        [SerializeField] private Transform _pos1;
        [SerializeField] private Transform _pos2;
        [SerializeField] private Transform _pos3;
        [SerializeField] private GameObject _obj1;
        [SerializeField] private GameObject _obj2;
        [SerializeField] private GameObject _obj3;
        [SerializeField] private float _handMoveDuration = 0.4f;
        [SerializeField] private float _handPressDuration = 0.2f;
        [SerializeField, Range(0.1f, 1f)] private float _handPressScale = 0.8f;
        [SerializeField] private float _delayBetweenPositions = 0.15f;

        private Sequence _handTutorialSequence;
        private Vector3 _handStartScale;
        private int _lastScreenWidth;
        private int _lastScreenHeight;

        private void Start()
        {
            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;
            Canvas.ForceUpdateCanvases();
            PlayHandTutorial();
        }

        private void LateUpdate()
        {
            if (_lastScreenWidth == Screen.width &&
                _lastScreenHeight == Screen.height)
            {
                return;
            }

            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;

            Canvas.ForceUpdateCanvases();
            PlayHandTutorial();
        }

        private void PlayHandTutorial()
        {
            if (_hand == null)
            {
                return;
            }

            _handTutorialSequence?.Kill();
            _hand.SetActive(true);
            _handStartScale = _hand.transform.localScale;

            Transform[] positions = { _pos1, _pos2, _pos3 };
            GameObject[] objects = { _obj1, _obj2, _obj3 };
            int[] tutorialOrder = { 0, 1, 2, 1 };

            SetAllTutorialObjectsActive(objects, false);

            if (_pos1 != null)
            {
                Vector3 handPosition = _hand.transform.localPosition;
                handPosition.y = GetTargetLocalY(_pos1);
                _hand.transform.localPosition = handPosition;
            }

            _handTutorialSequence = DOTween.Sequence();

            for (int i = 0; i < tutorialOrder.Length; i++)
            {
                int targetIndex = tutorialOrder[i];
                Transform targetPosition = positions[targetIndex];
                if (targetPosition == null)
                {
                    continue;
                }

              
                if (i > 0)
                {
                    _handTutorialSequence.Append(_hand.transform
                        .DOLocalMoveY(GetTargetLocalY(targetPosition), _handMoveDuration)
                        .SetEase(Ease.InOutSine));
                }

                _handTutorialSequence
                    .AppendCallback(() => SetTutorialObjectActive(objects, targetIndex, true))
                    .Append(_hand.transform
                        .DOScale(_handStartScale * _handPressScale, _handPressDuration)
                        .SetEase(Ease.InOutSine)
                        .SetLoops(2, LoopType.Yoyo))
                    .AppendCallback(() => SetTutorialObjectActive(objects, targetIndex, false))
                    .AppendInterval(_delayBetweenPositions);
            }

            if (_pos1 != null)
            {
                _handTutorialSequence.Append(_hand.transform
                    .DOLocalMoveY(GetTargetLocalY(_pos1), _handMoveDuration)
                    .SetEase(Ease.InOutSine));
            }

            _handTutorialSequence
                .SetLoops(-1, LoopType.Restart)
                .OnKill(() =>
                {
                    SetAllTutorialObjectsActive(objects, false);
                    _hand.transform.localScale = _handStartScale;
                    _handTutorialSequence = null;
                });
        }

        private float GetTargetLocalY(Transform target)
        {
            Transform handParent = _hand.transform.parent;
            if (handParent == null)
            {
                return target.position.y;
            }

            return handParent.InverseTransformPoint(target.position).y;
        }

        private static void SetTutorialObjectActive(
            GameObject[] objects,
            int index,
            bool isActive)
        {
            if (index < 0 || index >= objects.Length || objects[index] == null)
            {
                return;
            }

            objects[index].SetActive(isActive);
        }

        private static void SetAllTutorialObjectsActive(
            GameObject[] objects,
            bool isActive)
        {
            for (int i = 0; i < objects.Length; i++)
            {
                if (objects[i] != null)
                {
                    objects[i].SetActive(isActive);
                }
            }
        }

        private void OnDestroy()
        {
            _handTutorialSequence?.Kill();
        }
    }
}