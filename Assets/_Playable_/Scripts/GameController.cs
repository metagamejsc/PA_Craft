using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        [Header("Moving Blocks")] [SerializeField]
        private List<GameObject> _blocks = new List<GameObject>();

        [SerializeField] private float _moveDistanceX = 1f;
        [SerializeField] private float _moveDuration = 1f;
        [SerializeField] private GameObject _objRank;

        private readonly List<Tween> _blockTweens = new List<Tween>();
        private RectTransform _rankRectTransform;
        private Vector2 _rankInitialPosition;
        private Vector2 _rankInitialAnchorMin;
        private Vector2 _rankInitialAnchorMax;
        private Vector2Int _lastScreenSize;

        private void Start()
        {
            CacheRankPosition();
            UpdateRankPosition();
            StartBlockMovement();
        }

        private void Update()
        {
            Vector2Int screenSize = new Vector2Int(Screen.width, Screen.height);
            if (screenSize == _lastScreenSize)
            {
                return;
            }

            UpdateRankPosition();
        }

        private void CacheRankPosition()
        {
            if (_objRank == null)
            {
                return;
            }

            _rankRectTransform = _objRank.GetComponent<RectTransform>();
            if (_rankRectTransform != null)
            {
                _rankInitialPosition = _rankRectTransform.anchoredPosition;
                _rankInitialAnchorMin = _rankRectTransform.anchorMin;
                _rankInitialAnchorMax = _rankRectTransform.anchorMax;
            }
        }

        private void UpdateRankPosition()
        {
            _lastScreenSize = new Vector2Int(Screen.width, Screen.height);

            if (_rankRectTransform == null)
            {
                return;
            }

            bool isPortrait = Screen.height > Screen.width;

            Vector2 anchorMin = isPortrait
                ? new Vector2(0.5f, _rankInitialAnchorMin.y)
                : _rankInitialAnchorMin;
            Vector2 anchorMax = isPortrait
                ? new Vector2(0.5f, _rankInitialAnchorMax.y)
                : _rankInitialAnchorMax;

            _rankRectTransform.anchorMin = anchorMin;
            _rankRectTransform.anchorMax = anchorMax;

            Vector2 position = _rankRectTransform.anchoredPosition;
            position.x = isPortrait ? 0f : _rankInitialPosition.x;
            _rankRectTransform.anchoredPosition = position;
        }

        private void StartBlockMovement()
        {
            for (int index = 0; index < _blocks.Count; index++)
            {
                GameObject block = _blocks[index];
                if (block == null)
                {
                    continue;
                }

                float initialX = block.transform.position.x;
                bool isEvenIndex = index % 2 == 0;
                float firstTargetX = initialX + (isEvenIndex ? -_moveDistanceX : _moveDistanceX);
                float oppositeTargetX = initialX + (isEvenIndex ? _moveDistanceX : -_moveDistanceX);

                Tween initialMove = block.transform
                    .DOMoveX(firstTargetX, _moveDuration)
                    .SetEase(Ease.Linear)
                    .OnComplete(() => StartBlockOscillation(block.transform, oppositeTargetX));

                _blockTweens.Add(initialMove);
            }
        }

        private void StartBlockOscillation(Transform block, float targetX)
        {
            if (block == null)
            {
                return;
            }

            Tween oscillation = block
                .DOMoveX(targetX, _moveDuration * 2f)
                .SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);

            _blockTweens.Add(oscillation);
        }

        private void OnDestroy()
        {
            for (int index = 0; index < _blockTweens.Count; index++)
            {
                _blockTweens[index]?.Kill();
            }

            _blockTweens.Clear();
        }
    }
}
