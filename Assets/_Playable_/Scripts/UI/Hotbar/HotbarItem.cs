using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [Serializable]
    public class HotbarItemData
    {
        [SerializeField] private GameObject _itemPrefab;
        [SerializeField] private Sprite _icon;
        [SerializeField, Min(0)] private int _amount;

        public GameObject ItemPrefab => _itemPrefab;
        public Sprite Icon => _icon;
        public int Amount => _amount;

        public void ConsumeOne()
        {
            _amount = Mathf.Max(0, _amount - 1);
        }
    }

    [RequireComponent(typeof(Button))]
    public class HotbarItem : MonoBehaviour
    {
        [SerializeField] private Button _button;
        [SerializeField] private HotbarItemData _data = new HotbarItemData();
        [SerializeField] private Image _iconImage;
        [SerializeField] private TMP_Text _amountText;
        [SerializeField] private GameObject _objectChoose;

        private bool _isInfinite;

        public GameObject ItemPrefab => _data.ItemPrefab;
        public bool CanSpawn => _isInfinite || _data.Amount > 0;

        private void Awake()
        {
            if (_button == null)
            {
                _button = GetComponent<Button>();
            }

            _isInfinite = _data.Amount == 0;
            RefreshDataVisuals();
        }

        private void OnEnable()
        {
            _button.onClick.AddListener(CollectItem);
        }

        private void OnDisable()
        {
            _button.onClick.RemoveListener(CollectItem);
        }

        public void CollectItem()
        {
            if (_data.ItemPrefab == null)
            {
                return;
            }

            if (!CanSpawn)
            {
                return;
            }

            EventBus.Publish(new CollectItemEvent(this, _data.ItemPrefab));
        }

        public void ConsumeOne()
        {
            if (_isInfinite || _data.Amount <= 0)
            {
                return;
            }

            _data.ConsumeOne();
            RefreshDataVisuals();
        }

        public void SetSelected(bool isSelected)
        {
            if (_objectChoose != null)
            {
                _objectChoose.SetActive(isSelected);
            }
        }

        private void RefreshDataVisuals()
        {
            if (_iconImage != null)
            {
                _iconImage.sprite = _data.Icon;
                _iconImage.enabled = _data.Icon != null;
            }

            if (_amountText != null)
            {
                _amountText.gameObject.SetActive(!_isInfinite);
                _amountText.text = _data.Amount.ToString();
            }
        }

#if UNITY_EDITOR
        private void OnValidate()
        {
            if (_button == null)
            {
                _button = GetComponent<Button>();
            }

            if (!Application.isPlaying)
            {
                _isInfinite = _data.Amount == 0;
                RefreshDataVisuals();
            }
        }
#endif
    }
}
