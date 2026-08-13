using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Serializable]
        private class HotbarItem
        {
            public Button button;
            public GameObject chosenObject;
            public GameObject weapon;
        }

        [Header("Monster")] [SerializeField] private Transform _monster;
        [SerializeField] private Transform _monsterPointA;
        [SerializeField] private Transform _monsterPointB;
        [SerializeField] private float _monsterMoveDuration = 2f;
        [SerializeField] private float _monsterDirectionToA;
        [SerializeField] private float _monsterDirectionToB = 80f;

        [Header("Hotbar")]
        [SerializeField] private List<HotbarItem> _hotbarItems = new List<HotbarItem>();

        [Header("Hand Tutorial")] [SerializeField]
        private RectTransform _handTutorial;

        [SerializeField] private float _handMoveDuration = 0.6f;
        [SerializeField] private float _pressScale = 0.85f;
        [SerializeField] private float _pressDuration = 0.15f;

        [Header("Game Flow")] [LunaPlaygroundField("End Game Delay")] [SerializeField]
        private float _endGameDelay = 5f;

        [LunaPlaygroundField("Color Text")] [SerializeField]
        private Color _colorText;

        [SerializeField] private TMP_Text _txtTitle;

        private Sequence _monsterSequence;
        private Sequence _handSequence;
        private Vector3 _handInitialScale;
        private Vector3 _handPositionOnButtonOne;
        private Vector3 _handPositionOnButtonTwo;
        private Coroutine _endGameCoroutine;
        private Coroutine _handLayoutCoroutine;
        private bool _hasSelectedWeapon;
        private readonly List<UnityAction> _hotbarCallbacks = new List<UnityAction>();
        private Vector2Int _lastScreenSize;

        private void Start()
        {
            CacheInitialValues();
            SetupWeaponButtons();
            StartMonsterPatrol();
            _txtTitle.color = _colorText;
            _lastScreenSize = new Vector2Int(Screen.width, Screen.height);
            ScheduleHandTutorial();
        }

        private void Update()
        {
            Vector2Int screenSize = new Vector2Int(Screen.width, Screen.height);
            if (screenSize == _lastScreenSize)
                return;

            _lastScreenSize = screenSize;

            if (!_hasSelectedWeapon)
                ScheduleHandTutorial();
        }

        private void CacheInitialValues()
        {
            if (_handTutorial)
                _handInitialScale = _handTutorial.localScale;
        }

        private void SetupWeaponButtons()
        {
            _hotbarCallbacks.Clear();

            for (int index = 0; index < _hotbarItems.Count; index++)
            {
                HotbarItem item = _hotbarItems[index];
                if (item.chosenObject) item.chosenObject.SetActive(false);
                if (item.weapon) item.weapon.SetActive(false);

                int selectedIndex = index;
                UnityAction callback = () => SelectHotbarItem(selectedIndex);
                _hotbarCallbacks.Add(callback);
                if (item.button) item.button.onClick.AddListener(callback);
            }
        }

        private void StartMonsterPatrol()
        {
            if (!_monster || !_monsterPointA || !_monsterPointB)
                return;

            _monster.position = _monsterPointA.position;
            SetMonsterDirection(_monsterDirectionToB);

            _monsterSequence = DOTween.Sequence()
                .Append(_monster.DOMove(_monsterPointB.position, _monsterMoveDuration).SetEase(Ease.Linear))
                .AppendCallback(() => SetMonsterDirection(_monsterDirectionToA))
                .Append(_monster.DOMove(_monsterPointA.position, _monsterMoveDuration).SetEase(Ease.Linear))
                .AppendCallback(() => SetMonsterDirection(_monsterDirectionToB))
                .SetLoops(-1);
        }

        private void SetMonsterDirection(float yRotation)
        {
            Vector3 eulerAngles = _monster.eulerAngles;
            eulerAngles.y = yRotation;
            _monster.rotation = Quaternion.Euler(eulerAngles);
        }


        private void StartHandTutorial()
        {
            if (!_handTutorial || _hotbarItems.Count < 2)
                return;

            Button buttonOne = _hotbarItems[0].button;
            Button buttonTwo = _hotbarItems[1].button;
            if (!buttonOne || !buttonTwo) return;

            Canvas.ForceUpdateCanvases();

            Transform handParent = _handTutorial.parent;
            _handPositionOnButtonOne = handParent.InverseTransformPoint(buttonOne.transform.position);
            _handPositionOnButtonTwo = handParent.InverseTransformPoint(buttonTwo.transform.position);

            _handTutorial.gameObject.SetActive(true);
            _handTutorial.localPosition = _handPositionOnButtonOne;
            _handTutorial.localScale = _handInitialScale;

            _handSequence = DOTween.Sequence()
                .Append(CreateHandPressTween())
                .Append(_handTutorial.DOLocalMove(_handPositionOnButtonTwo, _handMoveDuration)
                    .SetEase(Ease.InOutSine))
                .Append(CreateHandPressTween())
                .Append(_handTutorial.DOLocalMove(_handPositionOnButtonOne, _handMoveDuration)
                    .SetEase(Ease.InOutSine))
                .SetLoops(-1)
                .SetUpdate(true);
        }

        private void ScheduleHandTutorial()
        {
            _handSequence?.Kill();

            if (_handLayoutCoroutine != null)
                StopCoroutine(_handLayoutCoroutine);

            _handLayoutCoroutine = StartCoroutine(StartHandTutorialAfterLayout());
        }

        private IEnumerator StartHandTutorialAfterLayout()
        {
            Vector2Int screenSize;

            do
            {
                screenSize = new Vector2Int(Screen.width, Screen.height);
                yield return new WaitForEndOfFrame();
            }
            while (screenSize != new Vector2Int(Screen.width, Screen.height));

            if (_hasSelectedWeapon)
            {
                _handLayoutCoroutine = null;
                yield break;
            }

            StartHandTutorial();
            _handLayoutCoroutine = null;
        }

        private Tween CreateHandPressTween()
        {
            return DOTween.Sequence()
                .Append(_handTutorial.DOScale(_handInitialScale * _pressScale, _pressDuration))
                .Append(_handTutorial.DOScale(_handInitialScale, _pressDuration));
        }

        private void SelectHotbarItem(int selectedIndex)
        {
            if (selectedIndex < 0 || selectedIndex >= _hotbarItems.Count)
                return;

            for (int index = 0; index < _hotbarItems.Count; index++)
            {
                HotbarItem item = _hotbarItems[index];
                bool isSelected = index == selectedIndex;

                if (item.chosenObject) item.chosenObject.SetActive(isSelected);
                if (item.weapon) item.weapon.SetActive(isSelected);
            }

            StopHandTutorial();

            if (!_hasSelectedWeapon)
            {
                _hasSelectedWeapon = true;
                _endGameCoroutine = StartCoroutine(EndGameAfterDelay());
            }
        }

        private void StopHandTutorial()
        {
            if (_handLayoutCoroutine != null)
            {
                StopCoroutine(_handLayoutCoroutine);
                _handLayoutCoroutine = null;
            }

            _handSequence?.Kill();

            if (_handTutorial)
            {
                _handTutorial.localScale = _handInitialScale;
                _handTutorial.gameObject.SetActive(false);
            }
        }

        private IEnumerator EndGameAfterDelay()
        {
            yield return new WaitForSeconds(_endGameDelay);

            if (GameManager.Instance)
                GameManager.Instance.EndGame();
        }

        private void OnDestroy()
        {
            _monsterSequence?.Kill();
            _handSequence?.Kill();

            if (_endGameCoroutine != null)
                StopCoroutine(_endGameCoroutine);

            if (_handLayoutCoroutine != null)
                StopCoroutine(_handLayoutCoroutine);

            for (int index = 0; index < _hotbarItems.Count; index++)
            {
                if (_hotbarItems[index].button && index < _hotbarCallbacks.Count)
                    _hotbarItems[index].button.onClick.RemoveListener(_hotbarCallbacks[index]);
            }
        }
    }
}
