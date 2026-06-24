using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class Arrow : MonoBehaviour
    {
        private Tween _flyTween;
        private Transform _initialParent;
        private Vector3 _initialLocalPosition;
        private Quaternion _initialLocalRotation;

        private void Awake()
        {
            _initialParent = transform.parent;
            _initialLocalPosition = transform.localPosition;
            _initialLocalRotation = transform.localRotation;
        }

        public void Launch(float moveSpeed, Transform target, Action callback = null)
        {
            gameObject.SetActive(true);
            ResetState();

            if (target == null)
            {
                Debug.LogWarning($"Arrow {name}: missing target reference.", this);
                return;
            }

            Vector3 targetPosition = target.position;

            transform.SetParent(null, true);

            _flyTween = transform.DOMove(targetPosition, moveSpeed)
                .SetEase(Ease.Linear).OnComplete(() =>
                {
                    gameObject.SetActive(false);
                    callback?.Invoke();
                });
        }

        private void ResetState()
        {
            _flyTween?.Kill();
            _flyTween = null;

            transform.SetParent(_initialParent, false);
            transform.localPosition = _initialLocalPosition;
            transform.localRotation = _initialLocalRotation;
        }
    }
}