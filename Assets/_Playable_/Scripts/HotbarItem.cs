using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class HotbarItem : MonoBehaviour
    {
        [SerializeField] private Monster _prefab;
        [SerializeField] private Button _button;
        [SerializeField] private GameObject _selectedIndicator;

        private IMonsterSelector _selector;

        /// <summary>RectTransform của nút, dùng để MapController trỏ tay tutorial tới.</summary>
        public RectTransform ButtonRect => _button != null ? (RectTransform)_button.transform : null;

        private void Start()
        {
            _button.onClick.AddListener(OnClick);
        }

        public void Init(IMonsterSelector selector)
        {
            _selector = selector;
        }

        private void OnClick()
        {
            _selector.SelectMonster(_prefab, this);
            _selectedIndicator.SetActive(true);
        }

        public void DeselectMonster()
        {
            _selectedIndicator.SetActive(false);
        }
    }
}