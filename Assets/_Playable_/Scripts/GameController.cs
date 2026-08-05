using System.Collections;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Monster")] [SerializeField] private Transform _monster;
        [SerializeField] private Transform _monsterPointA;
        [SerializeField] private Transform _monsterPointB;
        [SerializeField] private Animator _monsterAnimator;
        [SerializeField] private float _monsterMoveDuration = 2f;

        [Header("Weapon Hotbar")] [SerializeField]
        private Button _weaponButtonOne;

        [SerializeField] private Button _weaponButtonTwo;
        [SerializeField] private GameObject _weaponOne;
        [SerializeField] private GameObject _weaponTwo;

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
        private Vector3 _buttonOneInitialScale;
        private Vector3 _buttonTwoInitialScale;
        private Coroutine _endGameCoroutine;
        private bool _hasSelectedWeapon;

        private void Start()
        {
            CacheInitialValues();
            SetupWeaponButtons();
            StartMonsterPatrol();
            StartHandTutorial();
            _txtTitle.color = _colorText;
        }

        private void CacheInitialValues()
        {
            if (_weaponButtonOne)
                _buttonOneInitialScale = _weaponButtonOne.transform.localScale;

            if (_weaponButtonTwo)
                _buttonTwoInitialScale = _weaponButtonTwo.transform.localScale;
        }

        private void SetupWeaponButtons()
        {
            if (_weaponOne)
                _weaponOne.SetActive(false);

            if (_weaponTwo)
                _weaponTwo.SetActive(false);

            if (_weaponButtonOne)
                _weaponButtonOne.onClick.AddListener(SelectWeaponOne);

            if (_weaponButtonTwo)
                _weaponButtonTwo.onClick.AddListener(SelectWeaponTwo);
        }

        private void SelectWeaponOne()
        {
            SelectWeapon(_weaponOne, _weaponTwo);
        }

        private void SelectWeaponTwo()
        {
            SelectWeapon(_weaponTwo, _weaponOne);
        }

        private void StartMonsterPatrol()
        {
            if (!_monster || !_monsterPointA || !_monsterPointB)
                return;

            _monster.position = _monsterPointA.position;
            SetMonsterDirection(_monsterPointB.position);

            _monsterSequence = DOTween.Sequence()
                .Append(_monster.DOMove(_monsterPointB.position, _monsterMoveDuration).SetEase(Ease.Linear))
                .AppendCallback(() => SetMonsterDirection(_monsterPointA.position))
                .Append(_monster.DOMove(_monsterPointA.position, _monsterMoveDuration).SetEase(Ease.Linear))
                .AppendCallback(() => SetMonsterDirection(_monsterPointB.position))
                .SetLoops(-1);
        }

        private void SetMonsterDirection(Vector3 targetPosition)
        {
            Vector3 direction = targetPosition - _monster.position;
            direction.y = 0f;

            if (direction.sqrMagnitude > 0.001f)
                _monster.rotation = Quaternion.LookRotation(direction);
        }


        private void StartHandTutorial()
        {
            if (!_handTutorial || !_weaponButtonOne || !_weaponButtonTwo)
                return;

            _handTutorial.gameObject.SetActive(true);
            _handTutorial.position = _weaponButtonOne.transform.position;

            _handSequence = DOTween.Sequence()
                .Append(CreateButtonPressTween(_weaponButtonOne.transform, _buttonOneInitialScale))
                .Append(_handTutorial.DOMove(_weaponButtonTwo.transform.position, _handMoveDuration)
                    .SetEase(Ease.InOutSine))
                .Append(CreateButtonPressTween(_weaponButtonTwo.transform, _buttonTwoInitialScale))
                .Append(_handTutorial.DOMove(_weaponButtonOne.transform.position, _handMoveDuration)
                    .SetEase(Ease.InOutSine))
                .SetLoops(-1);
        }

        private Tween CreateButtonPressTween(Transform buttonTransform, Vector3 initialScale)
        {
            return DOTween.Sequence()
                .Append(buttonTransform.DOScale(initialScale * _pressScale, _pressDuration))
                .Append(buttonTransform.DOScale(initialScale, _pressDuration));
        }

        private void SelectWeapon(GameObject selectedWeapon, GameObject otherWeapon)
        {
            if (_hasSelectedWeapon)
                return;

            _hasSelectedWeapon = true;

            if (selectedWeapon)
                selectedWeapon.SetActive(true);

            if (otherWeapon)
                otherWeapon.SetActive(false);

            StopHandTutorial();
            _endGameCoroutine = StartCoroutine(EndGameAfterDelay());
        }

        private void StopHandTutorial()
        {
            _handSequence?.Kill();

            if (_weaponButtonOne)
                _weaponButtonOne.transform.localScale = _buttonOneInitialScale;

            if (_weaponButtonTwo)
                _weaponButtonTwo.transform.localScale = _buttonTwoInitialScale;

            if (_handTutorial)
                _handTutorial.gameObject.SetActive(false);
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

            if (_weaponButtonOne)
                _weaponButtonOne.onClick.RemoveListener(SelectWeaponOne);

            if (_weaponButtonTwo)
                _weaponButtonTwo.onClick.RemoveListener(SelectWeaponTwo);
        }
    }
}