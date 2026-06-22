using DG.Tweening;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [SerializeField] private GameObject _boxClose;
    [SerializeField] private GameObject _boxOpen;
    [SerializeField] private Button _btnTap;
    [SerializeField] private List<Button> _buttons = new List<Button>();
    [SerializeField] private List<GameObject> _blinkObjects = new List<GameObject>();
    [SerializeField] private float _blinkScaleDuration = 0.45f;
    [SerializeField] private float _blinkScaleMultiplier = 1.08f;
    [SerializeField] private AudioSource _audioBox;
    [SerializeField] private AudioSource _audioCat1;
    [SerializeField] private AudioSource _audioCat2;
    private int _countTap = 0;
    private readonly Dictionary<Transform, Vector3> _blinkStartScales = new Dictionary<Transform, Vector3>();

    private void Start()
    {
        _btnTap.onClick.AddListener(HandleTap);
        foreach (var b in _buttons)
        {
            b.onClick.AddListener(LunaManager.ins.CheckClickShowEndCard);
        }

        StartBlinkEffects();
    }

    private void OnDisable()
    {
        StopBlinkEffects();
    }

    private void HandleTap()
    {
        _countTap++;
        if (_countTap >= 2)
        {
            _boxClose.SetActive(false);
            _boxOpen.SetActive(true);
            _audioBox.Stop();
            _audioCat1.Stop();
            _audioCat2.Play();
            foreach (var b in _buttons)
            {
                b.gameObject.SetActive(true);
            }
        }
    }

    private void StartBlinkEffects()
    {
        StopBlinkEffects();

        foreach (GameObject blinkObject in _blinkObjects)
        {
            if (blinkObject == null)
            {
                continue;
            }

            Transform targetTransform = blinkObject.transform;
            _blinkStartScales[targetTransform] = targetTransform.localScale;
            targetTransform.DOKill();
            targetTransform.localScale = _blinkStartScales[targetTransform];
            targetTransform
                .DOScale(_blinkStartScales[targetTransform] * _blinkScaleMultiplier, _blinkScaleDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);
        }
    }

    private void StopBlinkEffects()
    {
        foreach (KeyValuePair<Transform, Vector3> pair in _blinkStartScales)
        {
            if (pair.Key == null)
            {
                continue;
            }

            pair.Key.DOKill();
            pair.Key.localScale = pair.Value;
        }

        _blinkStartScales.Clear();
    }
}