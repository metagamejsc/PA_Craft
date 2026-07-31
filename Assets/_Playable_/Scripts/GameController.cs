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
        [SerializeField] private List<CharacterInfo> _characterInfos = new List<CharacterInfo>();
        [SerializeField] private Button _btnRight;
        [SerializeField] private Button _btnLeft;
        [SerializeField] private float _durationMove;
        [SerializeField] private TMP_Text _txtInfo;
        [SerializeField] private GameObject _title;
        [SerializeField] private Vector3 _targetScale = Vector3.one * 1.2f;
        [SerializeField] private float _duration = 0.5f;
        private int _currentCharacter;
        private Vector3 _originalScale = Vector3.one;
        private Tween _tween;
        private void Start()
        {
            _btnLeft.onClick.AddListener(MoveLeft);
            _btnRight.onClick.AddListener(MoveRight);
            Play();
        }

        private void MoveRight()
        {
            int count = _characterInfos.Count;
            Vector3[] originalPositions = CachePositions();
            _currentCharacter = (_currentCharacter + 1) % count;
            _txtInfo.text = _characterInfos[_currentCharacter].Info;
            for (int i = 0; i < count; i++)
            {
                int targetIndex = (i + 1) % count;
                _characterInfos[i].Obj.transform.DOMove(originalPositions[targetIndex], _durationMove)
                    .SetEase(Ease.Linear);
                _characterInfos[i].Name.SetActive(false);
            }

            _characterInfos[_currentCharacter].Name.SetActive(true);
            GameManager.Instance.CountEvent();
        }

        private void MoveLeft()
        {
            int count = _characterInfos.Count;
            Vector3[] originalPositions = CachePositions();
            _currentCharacter = (_currentCharacter - 1 + count) % count;
            _txtInfo.text = _characterInfos[_currentCharacter].Info;
            for (int i = 0; i < count; i++)
            {
                int targetIndex = (i - 1 + count) % count;
                _characterInfos[i].Obj.transform.DOMove(originalPositions[targetIndex], _durationMove)
                    .SetEase(Ease.Linear);
                _characterInfos[i].Name.SetActive(false);
            }

            _characterInfos[_currentCharacter].Name.SetActive(true);
            GameManager.Instance.CountEvent();
        }

        private Vector3[] CachePositions()
        {
            Vector3[] positions = new Vector3[_characterInfos.Count];
            for (int i = 0; i < _characterInfos.Count; i++)
            {
                positions[i] = _characterInfos[i].Obj.transform.position;
            }

            return positions;
        }
        
        private void Play()
        {
            _tween?.Kill();
            _title.transform.localScale = _originalScale;

            _tween = _title.transform.DOScale(_targetScale, _duration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);
        }
    }

    [Serializable]
    public struct CharacterInfo
    {
        public GameObject Obj;
        public GameObject Name;
        public string Info;
    }
}