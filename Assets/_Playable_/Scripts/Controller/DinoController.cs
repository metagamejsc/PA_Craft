using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class DinoController : MonoBehaviour
    {
        [SerializeField] private Animator _anim;
        [SerializeField] private GameObject _vfx;
        [SerializeField] private float _vfxDelay = 0.1f;
        [SerializeField] private float _vfxActiveDuration = 0.3f;
        [SerializeField] private float _afterFireDelay = 1f;
        [SerializeField] private AudioClip _audio;

        private Tween _fireTween;

        private void Start()
        {
            Fire();
        }

        private void Fire()
        {
            _fireTween?.Kill();

            if (_anim != null)
            {
                _anim.SetTrigger("Roar");
            }

            _vfx.SetActive(false);

            _fireTween = DOTween.Sequence()
                .AppendInterval(_vfxDelay)
                .AppendCallback(() =>
                {
                    _vfx.SetActive(true);
                    AudioManager.Instance.PlaySound(_audio);
                })
                .AppendInterval(_vfxActiveDuration)
                .AppendCallback(() =>
                {
                    _vfx.SetActive(false);
                    AudioManager.Instance.StopSound();
                })
                .AppendInterval(_afterFireDelay)
                .OnComplete(Fire)
                .SetLink(gameObject)
                .OnKill(() => _fireTween = null);
        }

        private void OnDisable()
        {
            _fireTween?.Kill();
            _fireTween = null;

            if (_vfx != null)
            {
                _vfx.SetActive(false);
            }
        }
    }
}