using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    // Only the four feedable animals receive this component.
    [DisallowMultipleComponent]
    public class PetNeeds : MonoBehaviour
    {
        private static readonly List<PetNeeds> ActivePets = new List<PetNeeds>();
        public static bool AnyHungry
        {
            get
            {
                for (int i = 0; i < ActivePets.Count; i++)
                    if (ActivePets[i] != null && ActivePets[i].IsHungry) return true;
                return false;
            }
        }

        private void OnEnable() { ActivePets.Add(this); }
        private float _hungerDelay = 3f;
        [SerializeField] private PetStatusView _status;
        [SerializeField] private Renderer[] _bodyRenderers;
        [SerializeField] private Material _whiteFlashMaterial;
        [SerializeField] private ParticleSystem _hearts;
        [SerializeField] private Animator _animator;
        [SerializeField] private bool _hasEatAnimation;
        private Material[][] _normalMaterials, _flashMaterials;
        private float _hungryAt, _eatUntil;
        private bool _flashing, _initialized, _countedForGoal;
        private AnimalAudio _audio;
        public const int MealsToFill = 3;
        public int Food { get; private set; }
        public bool IsHungry { get; private set; }
        public bool IsFull => Food >= MealsToFill;
        public bool IsEating => Time.time < _eatUntil;

        private void Awake()
        {
            _audio = GetComponent<AnimalAudio>();
            _normalMaterials = new Material[_bodyRenderers.Length][];
            _flashMaterials = new Material[_bodyRenderers.Length][];
            for (int i = 0; i < _bodyRenderers.Length; i++)
            {
                _normalMaterials[i] = _bodyRenderers[i].sharedMaterials;
                _flashMaterials[i] = new Material[_normalMaterials[i].Length];
                for (int j = 0; j < _flashMaterials[i].Length; j++)
                    _flashMaterials[i][j] = _whiteFlashMaterial;
            }
            _initialized = true;
        }

        public void SetCamera(Camera camera) { if (_status != null) _status.SetCamera(camera); }

        public void SetHungerDelay(float seconds) { _hungerDelay = Mathf.Max(0f, seconds); }

        public void ResetNeeds()
        {
            Food = 0;
            IsHungry = false;
            _eatUntil = 0;
            _hungryAt = Time.time + _hungerDelay;
            _countedForGoal = false;
            SetFlash(false);
            if (_hearts != null) _hearts.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            RefreshStatus();
        }

        private void Update()
        {
            if (!IsHungry && !IsFull && Time.time >= _hungryAt)
            {
                Food = 0;
                IsHungry = true;
                if (_audio != null) _audio.OnHungry();
                RefreshStatus();
            }
            SetFlash(IsHungry && !IsEating && Mathf.Repeat(Time.time, 0.8f) < 0.3f);
        }

        public bool TryFeed()
        {
            if (!IsHungry || Food >= MealsToFill) return false;
            Food++;
            if (_audio != null) _audio.OnFed();
            _eatUntil = Time.time + 0.4f;
            SetFlash(false);
            if (_hasEatAnimation && _animator != null) _animator.SetTrigger("Eat");
            if (Food == MealsToFill)
            {
                IsHungry = false;
                if (_hearts != null) _hearts.Play(true);
                if (!_countedForGoal)
                {
                    _countedForGoal = true;
                    if (GameManager.Instance != null) GameManager.Instance.CountEvent();
                }
            }
            RefreshStatus();
            return true;
        }

        private void RefreshStatus() { if (_status != null) _status.Refresh(Food, IsHungry); }

        private void SetFlash(bool white)
        {
            if (!_initialized || _whiteFlashMaterial == null || _flashing == white) return;
            _flashing = white;
            for (int i = 0; i < _bodyRenderers.Length; i++)
                if (_bodyRenderers[i] != null)
                    _bodyRenderers[i].sharedMaterials = white ? _flashMaterials[i] : _normalMaterials[i];
        }

        private void OnDisable()
        {
            ActivePets.Remove(this);
            SetFlash(false);
        }
    }
}
