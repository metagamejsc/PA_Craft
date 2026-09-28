using UnityEngine;

namespace Playable
{
    // A small shared pool: detached effects outlive a dying/despawned monster.
    public sealed class MonsterBattleEffects : MonoBehaviour
    {
        private const int Capacity = 24;
        private static MonsterBattleEffects _instance;
        private readonly GameObject[] _prefabs = new GameObject[Capacity];
        private readonly GameObject[] _objects = new GameObject[Capacity];
        private readonly ParticleSystem[][] _particles = new ParticleSystem[Capacity][];
        private readonly float[] _expires = new float[Capacity];
        private readonly AudioSource[] _voices = new AudioSource[8];
        private float _nextSoundTime;

        private static MonsterBattleEffects Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new GameObject("Monster battle effects").AddComponent<MonsterBattleEffects>();
                return _instance;
            }
        }

        public static void Play(GameObject prefab, Vector3 position, Quaternion rotation, float duration = 1.5f)
        {
            if (prefab == null) return;
            Instance.PlayEffect(prefab, position, rotation, duration);
        }

        private void PlayEffect(GameObject prefab, Vector3 position, Quaternion rotation, float duration)
        {
            int slot = -1;
            for (int i = 0; i < Capacity; i++)
            {
                if (_expires[i] > Time.time) continue;
                if (_prefabs[i] == prefab) { slot = i; break; }
                if (slot < 0) slot = i;
            }
            if (slot < 0) return; // Cosmetic budget only; gameplay still resolves.
            if (_prefabs[slot] != prefab || _objects[slot] == null)
            {
                if (_objects[slot] != null) Destroy(_objects[slot]);
                _objects[slot] = Instantiate(prefab, transform);
                _prefabs[slot] = prefab;
                _particles[slot] = _objects[slot].GetComponentsInChildren<ParticleSystem>(true);
            }
            GameObject effect = _objects[slot];
            effect.transform.SetPositionAndRotation(position, rotation);
            effect.SetActive(true);
            for (int i = 0; i < _particles[slot].Length; i++)
            {
                _particles[slot][i].Clear();
                _particles[slot][i].Play(true);
            }
            _expires[slot] = Time.time + Mathf.Max(0.1f, duration);
        }

        public static void Sound(AudioClip clip, float volume = 0.5f)
        {
            if (clip == null) return;
            MonsterBattleEffects pool = Instance;
            if (Time.time < pool._nextSoundTime) return;
            for (int i = 0; i < pool._voices.Length; i++)
            {
                AudioSource voice = pool._voices[i];
                if (voice != null && voice.isPlaying) continue;
                if (voice == null)
                {
                    voice = pool.gameObject.AddComponent<AudioSource>();
                    voice.playOnAwake = false;
                    voice.spatialBlend = 0f;
                    pool._voices[i] = voice;
                }
                voice.clip = clip;
                voice.volume = volume;
                voice.pitch = Random.Range(0.95f, 1.05f);
                voice.Play();
                pool._nextSoundTime = Time.time + 0.04f;
                return;
            }
        }

        private void Update()
        {
            for (int i = 0; i < Capacity; i++)
            {
                if (_expires[i] <= 0f || Time.time < _expires[i]) continue;
                if (_objects[i] != null) _objects[i].SetActive(false);
                _expires[i] = 0f;
            }
        }

        private void OnDestroy() { if (_instance == this) _instance = null; }
    }
}
