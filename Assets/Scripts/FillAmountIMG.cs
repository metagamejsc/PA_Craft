using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class FillAmountIMG : MonoBehaviour
{
    [SerializeField] private float duration = 1.0f;
    private Image img;
    private Tween tween;
    float startFill = 0f;
    void Awake()
    {
        img = GetComponent<Image>();
        startFill = img.fillAmount;
    }
    void OnEnable()
    {
        img.fillAmount = 0f;
        tween?.Kill();
        tween = DOTween.To(
                () => img.fillAmount,
                x => img.fillAmount = x,
                startFill,
                duration
            )
            .SetEase(Ease.Linear);
    }
}
