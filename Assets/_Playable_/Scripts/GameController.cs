using UnityEngine;
using System.Collections.Generic;
using DG.Tweening;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private List<Block> _blocks = new List<Block>();
        [SerializeField] private float _cameraLookDuration = 0.4f;
        [SerializeField] private GameObject _text;
        [SerializeField] private GameObject _hand;
        [SerializeField] private float _handPressScale = 0.85f;
        [SerializeField] private float _handPressDuration = 0.25f;
        private int _countBlocks = 0;
        private bool _isComplete;
        private Tween _cameraLookTween;
        private Tween _handPressTween;
        private Vector3 _handStartScale = Vector3.one;

        private void Awake()
        {
            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;
            }

            if (_hand != null)
            {
                _handStartScale = _hand.transform.localScale;
            }
        }

        private void Start()
        {
            LookAtCurrentBlock();
            PlayHandPressEffect();
        }

        private void Update()
        {
            if (Input.GetMouseButtonDown(0) && !_isComplete)
            {
                StopHandPressEffect();
                _blocks[_countBlocks].SetSolidAndPlayBoxEffect();
                _countBlocks++;
                if (_countBlocks >= _blocks.Count)
                {
                    _isComplete = true;
                    DOVirtual.DelayedCall(1, () => { GameManager.Instance.EndGame(); });
                }
                else
                {
                    LookAtCurrentBlock();
                    _blocks[_countBlocks].Select();
                }
            }
        }

        private void LookAtCurrentBlock(bool instant = false)
        {
            if (_targetCamera == null || _blocks == null || _blocks.Count == 0)
            {
                return;
            }

            int blockIndex = Mathf.Clamp(_countBlocks, 0, _blocks.Count - 1);
            Block currentBlock = _blocks[blockIndex];

            if (currentBlock == null)
            {
                return;
            }

            Vector3 lookDirection = currentBlock.transform.position - _targetCamera.transform.position;

            if (lookDirection.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            Quaternion targetRotation = Quaternion.LookRotation(lookDirection.normalized, Vector3.up);
            _cameraLookTween?.Kill();

            if (instant)
            {
                _targetCamera.transform.rotation = targetRotation;
                return;
            }

            _cameraLookTween = _targetCamera.transform
                .DORotateQuaternion(targetRotation, _cameraLookDuration)
                .SetEase(Ease.InOutSine)
                .OnKill(() => _cameraLookTween = null)
                .OnComplete(() => _cameraLookTween = null);
        }

        private void PlayHandPressEffect()
        {
            if (_hand == null)
            {
                return;
            }

            _handPressTween?.Kill();
            _hand.transform.localScale = _handStartScale;
            _handPressTween = _hand.transform
                .DOScale(_handStartScale * _handPressScale, _handPressDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .OnKill(() => _handPressTween = null);
        }

        private void StopHandPressEffect()
        {
            _handPressTween?.Kill();

            if (_hand != null)
            {
                _hand.transform.localScale = _handStartScale;
                _hand.SetActive(false);
            }

            if (_text != null)
            {
                _text.SetActive(false);
            }
        }

        private void OnDestroy()
        {
            _cameraLookTween?.Kill();
            _handPressTween?.Kill();
        }
    }
}
