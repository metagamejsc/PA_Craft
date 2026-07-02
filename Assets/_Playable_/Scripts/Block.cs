using UnityEngine;
using DG.Tweening;

namespace Playable
{
    public class Block : MonoBehaviour
    {
        [SerializeField] private Color _color;
        [SerializeField] private float _blur;
        [SerializeField] private GameObject _box;
        [SerializeField] private float _scaleMultiplier = 1.2f;
        [SerializeField] private float _effectDuration = 0.35f;
        [SerializeField] private GameObject _boxSelect;
        [SerializeField] private MeshRenderer _blockRenderer;
        
        private Material _blockMaterialInstance;
        private bool _ownsBlockMaterialInstance;
        private MeshRenderer _boxRenderer;
        private Material _boxMaterialInstance;
        private Sequence _boxEffectSequence;
        private Vector3 _boxStartScale;
        private static readonly int ColorPropertyId = Shader.PropertyToID("_Color");

        private void Awake()
        {
            if (_blockRenderer != null)
            {
                _blockMaterialInstance = _blockRenderer.material;
                _ownsBlockMaterialInstance = true;
            }

            ApplyBlockVisual(_blur);

            if (_box == null)
            {
                return;
            }

            _boxStartScale = _box.transform.localScale;
            _boxRenderer = _box.GetComponent<MeshRenderer>();

            if (_boxRenderer == null)
            {
                return;
            }

            _boxMaterialInstance = _boxRenderer.material;
            SetMaterialAlpha(1f);
        }

        public void Select()
        {
            _boxSelect.SetActive(true);
        }

        public void SetSolidAndPlayBoxEffect()
        {
            _boxSelect.SetActive(false);
            ApplyBlockVisual(1f);
            PlayBoxEffect();
        }

        private void PlayBoxEffect()
        {
            if (_box == null || _boxMaterialInstance == null)
            {
                return;
            }

            _boxEffectSequence?.Kill();

            _box.SetActive(true);
            _box.transform.localScale = _boxStartScale;
            SetMaterialAlpha(1f);

            _boxEffectSequence = DOTween.Sequence()
                .Join(_box.transform.DOScale(_boxStartScale * _scaleMultiplier, _effectDuration))
                .Join(DOTween.To(
                    () => _boxMaterialInstance.color.a,
                    SetMaterialAlpha,
                    0f,
                    _effectDuration))
                .OnComplete(() =>
                {
                    _box.SetActive(false);
                    _boxEffectSequence = null;
                })
                .OnKill(() => _boxEffectSequence = null);
        }

        private void ApplyBlockVisual(float alpha)
        {
            if (_blockMaterialInstance == null)
            {
                return;
            }

            Color blockColor = _color;
            blockColor.a = alpha;
            _blockMaterialInstance.color = blockColor;
        }

        private void SetMaterialAlpha(float alpha)
        {
            if (_boxMaterialInstance == null)
            {
                return;
            }

            Color color = Color.white;

            if (_boxMaterialInstance.HasProperty(ColorPropertyId))
            {
                color = _boxMaterialInstance.GetColor(ColorPropertyId);
            }

            color.r = 1f;
            color.g = 1f;
            color.b = 1f;
            color.a = alpha;
            _boxMaterialInstance.color = color;
        }

        private void OnDestroy()
        {
            _boxEffectSequence?.Kill();

            if (_ownsBlockMaterialInstance && _blockMaterialInstance != null)
            {
                Destroy(_blockMaterialInstance);
            }

            if (_boxMaterialInstance != null)
            {
                Destroy(_boxMaterialInstance);
            }
        }
    }
}