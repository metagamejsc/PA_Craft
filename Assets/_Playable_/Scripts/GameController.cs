using System;
using DG.Tweening;
using TMPro;
using UnityEngine;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public static GameController Instance;
        [SerializeField] private GameObject _panel;
        [SerializeField] private GameObject _objPhase1;
        [SerializeField] private GameObject _objPhase2;
        [Header("Phase 1")] [SerializeField] private float _timeDelayGirlMove;
        [SerializeField] private Animator _animGirl;
        [SerializeField] private Transform _posCenter;
        [SerializeField] private float _durationMoveCenter;
        [Header("Phase 2")] [SerializeField] private TMP_Text _txtTitle;
        [SerializeField] private GameObject _hand;
        [SerializeField] private GameObject _blur;
        [SerializeField] private Transform _hotbarItem;
        [SerializeField] private Transform _btnBuild;
        [SerializeField] private GameObject _objInfi;

        [LunaPlaygroundField("Text Tut")] [SerializeField]
        private string _strtut;

        private bool _isComplete;

        private void OnEnable()
        {
            EventBus.Subscribe<CollectItemEvent>(BuildBlock);
        }

        private void OnDisable()
        {
            EventBus.Unsubscribe<CollectItemEvent>(BuildBlock);
        }

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            DOVirtual.DelayedCall(_timeDelayGirlMove, GirlMoveToCenter);
        }

        private void GirlMoveToCenter()
        {
            Transform girl = _animGirl.transform;
            Vector3 targetPos = new Vector3(_posCenter.position.x, girl.position.y, _posCenter.position.z);
            girl.DORotate(new Vector3(0, 180, 0), 1).SetEase(Ease.Linear).OnComplete(() =>
            {
                _animGirl.SetBool("IsWalk", true);
                girl.DOMove(targetPos, _durationMoveCenter).SetEase(Ease.Linear).OnComplete(SetupPhase2);
            });
        }

        private void SetupPhase2()
        {
            _animGirl.SetBool("IsWalk", false);
            _panel.SetActive(true);
            _objPhase1.SetActive(false);
            _objPhase2.SetActive(true);
            SelectBlock();
        }

        private void SelectBlock()
        {
            if (_isComplete) return;
            _hand.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.5f).SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);
            _hand.transform.SetParent(_hotbarItem);
            _hand.transform.localPosition = Vector3.zero;
            _txtTitle.text = "Tap to select the block";
        }

        private void BuildBlock(CollectItemEvent eventData)
        {
            if (_isComplete) return;
            var c = _btnBuild.GetComponent<Canvas>();
            if (c != null) c.sortingOrder = 2;
            _hand.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.5f).SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);
            _hand.transform.SetParent(_btnBuild);
            _hand.transform.localPosition = Vector3.zero;
            _txtTitle.text = "Tap to place the block";
        }

        public void CompleteTut()
        {
            if (_isComplete) return;
            _objInfi.SetActive(true);
            _isComplete = true;
            _blur.SetActive(false);
            _hand.SetActive(false);
            _txtTitle.text = _strtut;
        }

        private void Update()
        {
            if (Input.GetMouseButton(0) && _objInfi.activeSelf)
            {
                _objInfi.SetActive(false);
            }
        }
    }
}