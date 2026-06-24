using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : GameBase
    {
        [Header("Gameplay")] [SerializeField] private SelectableItem[] _sourceItems;
        [SerializeField] private CloneDragItem _cloneItem;
        [SerializeField] private DropItemSlot[] _itemSlots;

        [Header("Monster Reveal")] [SerializeField]
        private Image _monster;

        [SerializeField] private int _flashLoopCount = 3;
        [SerializeField] private float _flashDuration = 0.12f;
        [SerializeField] private float _finalRevealDuration = 0.3f;

        private Tween _monsterTween;
        private bool _isCompleted;

        private void Awake()
        {
            if (_cloneItem != null)
            {
                _cloneItem.Initialize();
            }

            if (_sourceItems != null)
            {
                for (int i = 0; i < _sourceItems.Length; i++)
                {
                    if (_sourceItems[i] == null)
                    {
                        continue;
                    }

                    _sourceItems[i].Initialize(this);
                }
            }

            if (_itemSlots != null)
            {
                for (int i = 0; i < _itemSlots.Length; i++)
                {
                    if (_itemSlots[i] == null)
                    {
                        continue;
                    }

                    _itemSlots[i].Initialize(this);
                }
            }

            PrepareMonster();
        }

        private void OnDestroy()
        {
            _monsterTween?.Kill();
        }

        public void SelectSourceItem(SelectableItem sourceItem)
        {
            if (_cloneItem == null || sourceItem == null)
            {
                return;
            }

            _cloneItem.SetData(sourceItem.ItemId, sourceItem.ItemSprite);
        }

        public void TryPlaceItem(DropItemSlot slot, CloneDragItem dragItem)
        {
            if (_isCompleted || slot == null || dragItem == null || !dragItem.HasData)
            {
                return;
            }

            if (!slot.CanAccept(dragItem.CurrentItemId))
            {
                return;
            }

            slot.SetItem(dragItem.CurrentItemId, dragItem.CurrentSprite);

            if (AreAllSlotsFilled())
            {
                RevealMonster();
            }
        }

        private bool AreAllSlotsFilled()
        {
            if (_itemSlots == null || _itemSlots.Length == 0)
            {
                return false;
            }

            for (int i = 0; i < _itemSlots.Length; i++)
            {
                if (_itemSlots[i] == null || !_itemSlots[i].IsFilled)
                {
                    return false;
                }
            }

            return true;
        }

        private void PrepareMonster()
        {
            SetMonsterAlpha(0f);
            _monster.gameObject.SetActive(false);
        }

        private void RevealMonster()
        {
            if (_monster == null || _isCompleted)
            {
                return;
            }

            _isCompleted = true;
            _monsterTween?.Kill();

            _monster.gameObject.SetActive(true);
            SetMonsterAlpha(0f);

            Sequence sequence = DOTween.Sequence();
            for (int i = 0; i < Mathf.Max(1, _flashLoopCount); i++)
            {
                sequence.Append(_monster.DOFade(1f, _flashDuration));
                sequence.Append(_monster.DOFade(0.15f, _flashDuration));
            }

            sequence.Append(_monster.DOFade(1f, _finalRevealDuration));
            sequence.OnComplete(() =>
            {
                SetMonsterAlpha(1f);
                CountEvent();
            });

            _monsterTween = sequence;
        }

        private void SetMonsterAlpha(float alpha)
        {
            if (_monster != null)
            {
                Color color = _monster.color;
                color.a = alpha;
                _monster.color = color;
            }
        }
    }
}