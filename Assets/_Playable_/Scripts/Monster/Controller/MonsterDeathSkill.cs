using UnityEngine;

namespace Playable
{
    // Source death actions, without voxel destruction, world queries or source AI dependencies.
    public sealed class MonsterDeathSkill : MonoBehaviour
    {
        public GameObject effect;
        public AudioClip sound;
        public float radius = 6f;
        public float damage = 45f;
        private Monster _self;
        private float _remaining;
        private float _tick;
        private bool _active;
        private Vector3 _scale;
        private Material[] _blinkMaterials;
        private Color[] _originalColors;

        public void Begin(Monster self)
        {
            _self = self;
            _scale = transform.localScale;
            _remaining = self.Type == MonsterType.Creeper ? 1.1f : 2f;
            _tick = 0f;
            _active = true;
            if (self.Type == MonsterType.Creeper && _blinkMaterials == null)
            {
                Renderer[] renderers = GetComponentsInChildren<SkinnedMeshRenderer>(true);
                _blinkMaterials = new Material[renderers.Length];
                _originalColors = new Color[renderers.Length];
                for (int i = 0; i < renderers.Length; i++)
                {
                    _blinkMaterials[i] = renderers[i].material;
                    if (_blinkMaterials[i] != null) _originalColors[i] = _blinkMaterials[i].color;
                }
            }
            self.SetRunning(false);
            MonsterBattleEffects.Sound(sound);
            if (self.Type == MonsterType.Enderman)
                MonsterBattleEffects.Play(effect, self.Position, Quaternion.identity, _remaining);
        }

        private void Update()
        {
            if (!_active) return;
            _remaining -= Time.deltaTime;
            if (_self.Type == MonsterType.Enderman)
            {
                _tick -= Time.deltaTime;
                bool hit = _tick <= 0f;
                MonsterAreaAttack.Apply(_self, _self.Position, radius, hit ? damage : 0f,
                    0f, hit ? 0.25f : 0f, 360f, 5f * Time.deltaTime);
                if (hit) _tick = 0.25f;
            }
            else
            {
                float pulse = 1f + 0.12f * Mathf.Abs(Mathf.Sin(_remaining * 24f));
                transform.localScale = _scale * pulse;
                SetBlink(Mathf.PingPong(_remaining * 8f, 1f));
            }
            if (_remaining > 0f) return;
            _active = false;
            SetBlink(0f);
            transform.localScale = _scale;
            if (_self.Type == MonsterType.Creeper)
            {
                MonsterBattleEffects.Play(effect, _self.Position, Quaternion.identity, 2f);
                MonsterBattleEffects.Sound(sound, 0.6f);
                MonsterAreaAttack.Apply(_self, _self.Position, radius, damage, 2f, 0.6f, 360f, 0f, 0f, 0f, 2f);
            }
            _self.CompleteDeath();
        }

        private void SetBlink(float amount)
        {
            if (_blinkMaterials == null) return;
            for (int i = 0; i < _blinkMaterials.Length; i++)
                if (_blinkMaterials[i] != null) _blinkMaterials[i].color = Color.Lerp(_originalColors[i], Color.red, amount);
        }
        private void OnDisable() { _active = false; SetBlink(0f); }
        private void OnDestroy()
        {
            if (_blinkMaterials == null) return;
            for (int i = 0; i < _blinkMaterials.Length; i++)
                if (_blinkMaterials[i] != null) Destroy(_blinkMaterials[i]);
        }
    }
}
