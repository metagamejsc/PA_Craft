using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent, RequireComponent(typeof(AudioSource))]
    public class AnimalAudio : MonoBehaviour
    {
        [SerializeField] private AudioSource _source;
        [SerializeField] private AudioClip[] _calls;
        [SerializeField] private Vector2 _wanderInterval = new Vector2(7f, 12f);
        [SerializeField] private Vector2 _hungryInterval = new Vector2(4f, 6f);
        [SerializeField, Range(0f, 1f)] private float _volume = 0.55f;
        [SerializeField] private float _maxCallDuration = 1.5f;
        private PetNeeds _needs;
        private float _nextCall, _stopAt, _lastCall = -100f;
        private static float _ambientAllowedAt;

        private void Awake()
        {
            if (_source == null) _source = GetComponent<AudioSource>();
            _needs = GetComponent<PetNeeds>();
            _source.playOnAwake = false;
            _source.loop = false;
        }

        private void OnEnable() { _nextCall = Time.time + Random.Range(0.1f, 0.6f); }

        private void Update()
        {
            if (_source.isPlaying && Time.time >= _stopAt) _source.Stop();
            if (Time.time < _nextCall) return;
            if (Time.time < _ambientAllowedAt) { _nextCall = _ambientAllowedAt + Random.Range(0.1f, 0.5f); return; }
            if (PlayCall()) _ambientAllowedAt = Time.time + 0.8f;
            ScheduleNext();
        }

        public void OnHungry() { _nextCall = Mathf.Min(_nextCall, Time.time + Random.Range(0f, 0.4f)); }

        public void OnFed()
        {
            // A successful feed responds immediately, without restarting on rapid taps.
            PlayCall();
            ScheduleNext();
        }

        private bool PlayCall()
        {
            if (_calls == null || _calls.Length == 0 || _source.isPlaying || Time.time - _lastCall < 0.35f) return false;
            var clip = _calls[Random.Range(0, _calls.Length)];
            if (clip == null) return false;
            _source.clip = clip;
            _source.volume = _volume;
            _source.pitch = Random.Range(0.95f, 1.05f);
            _source.Play();
            _lastCall = Time.time;
            _stopAt = Time.time + Mathf.Min(clip.length / _source.pitch, _maxCallDuration);
            return true;
        }

        private void ScheduleNext()
        {
            Vector2 interval = _needs != null && _needs.IsHungry ? _hungryInterval : _wanderInterval;
            _nextCall = Time.time + Random.Range(interval.x, interval.y);
        }

        private void OnDisable()
        {
            if (_source != null) _source.Stop();
            _lastCall = -100f;
        }
    }
}
