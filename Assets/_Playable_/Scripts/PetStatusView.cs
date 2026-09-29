using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class PetStatusView : MonoBehaviour
    {
        [SerializeField] private Image _fill;
        [SerializeField, Min(0.1f)] private float _fillSpeed = 2f;
        private float _targetProgress;
        private Transform _camera;
        public void SetCamera(Camera camera) { _camera = camera != null ? camera.transform : null; }

        public void Refresh(int food, bool hungry)
        {
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
