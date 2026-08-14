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

        private readonly List<Tween> _blockTweens = new List<Tween>();

        private void Start()
        {
            StartBlockMovement();
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
