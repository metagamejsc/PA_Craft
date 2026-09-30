using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable
{
    public class PetStatusView : MonoBehaviour
    {
        [SerializeField] private Image _fill;
        [SerializeField, Min(0.1f)] private float _fillSpeed = 2f;
        [SerializeField] private TMP_Text _feedingText;
        private float _targetProgress;
        private Transform _camera;
        public void SetCamera(Camera camera) { _camera = camera != null ? camera.transform : null; }

        public void Refresh(int food, bool hungry)
        {
            bool showFeedingHint = hungry && food == 0;
            if (showFeedingHint && _feedingText == null && _fill != null)
            {
                var label = new GameObject("Feed it", typeof(RectTransform), typeof(TextMeshProUGUI));
                label.layer = gameObject.layer;
                label.transform.SetParent(_fill.transform.parent, false);
                _feedingText = label.GetComponent<TextMeshProUGUI>();
                var rect = _feedingText.rectTransform;
                rect.anchorMin = new Vector2(0, 1);
                rect.anchorMax = Vector2.one;
                rect.pivot = new Vector2(0.5f, 0);
                rect.anchoredPosition = new Vector2(0, 0.08f);
                rect.sizeDelta = new Vector2(0, 0.4f);
                _feedingText.fontSize = 0.3f;
                _feedingText.alignment = TextAlignmentOptions.Center;
                _feedingText.raycastTarget = false;
            }
            if (_feedingText != null)
            {
                _feedingText.text = "Feed it";
                _feedingText.gameObject.SetActive(showFeedingHint);
            }
            _targetProgress = Mathf.Clamp01((float)food / PetNeeds.MealsToFill);
            if (_fill != null && (!Application.isPlaying || food == 0))
                _fill.fillAmount = _targetProgress;
        }

        private void LateUpdate()
        {
            if (_fill != null)
                _fill.fillAmount = Mathf.MoveTowards(_fill.fillAmount, _targetProgress, _fillSpeed * Time.deltaTime);
            if (_camera != null) transform.rotation = _camera.rotation;
        }
    }
}
