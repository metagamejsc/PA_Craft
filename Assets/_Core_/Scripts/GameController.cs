using DG.Tweening;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [Header("Texture")] [LunaPlaygroundAsset("Texture Mode 1")] [SerializeField]
    private Texture2D textureMode1;

    [LunaPlaygroundAsset("Texture Mode 2")] [SerializeField]
    private Texture2D textureMode2;

    [LunaPlaygroundAsset("Texture Mode 3")] [SerializeField]
    private Texture2D textureMode3;

    [LunaPlaygroundAsset("Texture Mode 4")] [SerializeField]
    private Texture2D textureMode4;

    [Header("References")] [SerializeField]
    private RectTransform handRect;

    [SerializeField] private List<Button> buttons = new List<Button>();
    [SerializeField] private List<Image> icons = new List<Image>();
    [SerializeField] private Transform titleObject;
    [SerializeField] private Transform playButtonObject;

    [Header("Move")] [SerializeField] private Vector2 handOffset = new Vector2(0f, 60f);
    [SerializeField] private float moveDuration = 0.35f;
    [SerializeField] private float delayBeforeClick = 0.1f;
    [SerializeField] private float delayAfterClick = 0.2f;

    [Header("Hand Click")] [SerializeField]
    private float handPressDistance = 18f;

    [SerializeField] private float handPressDuration = 0.12f;
    [SerializeField] private float handScaleDown = 0.9f;

    [Header("Button Click")] [SerializeField]
    private float buttonPunchScale = 0.12f;

    [SerializeField] private float buttonPunchDuration = 0.2f;
    [SerializeField] private int buttonPunchVibrato = 8;

    [Header("Loop Scale")] [SerializeField]
    private float idleScaleMultiplier = 1.08f;

    [SerializeField] private float idleScaleDuration = 0.55f;

    private int currentIndex;
    private Vector3 handStartScale;
    private Vector3 titleStartScale;
    private Vector3 playButtonStartScale;
    private Sequence loopSequence;
    private Tween handMoveTween;
    private readonly Dictionary<Button, Vector3> buttonStartScales = new Dictionary<Button, Vector3>();

    private void Awake()
    {
        if (handRect == null)
        {
            handRect = transform as RectTransform;
        }

        if (handRect != null)
        {
            handStartScale = handRect.localScale;
        }

        if (titleObject != null)
        {
            titleStartScale = titleObject.localScale;
        }

        if (playButtonObject != null)
        {
            playButtonStartScale = playButtonObject.localScale;
        }

        CacheButtonScales();
    }

    private void Start()
    {
        StartIdleScaleEffects();
        StartLoop();

        foreach (Button button in buttons)
        {
            if (button != null)
            {
                button.onClick.AddListener(() => LunaManager.ins.CheckClickShowEndCard());
            }
        }

        List<Texture2D> t = new List<Texture2D>();
        t.Add(textureMode1);
        t.Add(textureMode2);
        t.Add(textureMode3);
        t.Add(textureMode4);

        for (int i = 0; i < t.Count; i++)
        {
            icons[i].sprite = CreateSprite(t[i]);
        }
    }

    private void OnDisable()
    {
        StopLoop();
        StopIdleScaleEffects();
    }

    public void StartLoop()
    {
        StopLoop();

        if (handRect == null || GetStepCount() == 0)
        {
            Debug.LogWarning("GameController: missing handRect or buttons.");
            return;
        }

        currentIndex = Mathf.Clamp(currentIndex, 0, GetStepCount() - 1);
        RectTransform firstTarget =
            buttons[currentIndex] != null ? buttons[currentIndex].transform as RectTransform : null;
        if (firstTarget != null)
        {
            handRect.anchoredPosition = GetTargetAnchorPosition(firstTarget);
        }

        PlayStep();
    }

    public void StopLoop()
    {
        if (loopSequence != null)
        {
            loopSequence.Kill();
            loopSequence = null;
        }

        if (handMoveTween != null)
        {
            handMoveTween.Kill();
            handMoveTween = null;
        }

        if (handRect != null)
        {
            handRect.DOKill();
            handRect.DOComplete();
            handRect.localScale = handStartScale;
        }

        foreach (Button button in buttons)
        {
            if (button != null)
            {
                button.transform.DOKill();
                button.transform.localScale = GetButtonStartScale(button);
            }
        }
    }

    private void StartIdleScaleEffects()
    {
        if (titleObject != null)
        {
            titleObject.DOKill();
            titleObject.localScale = titleStartScale;
            titleObject
                .DOScale(titleStartScale * idleScaleMultiplier, idleScaleDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);
        }

        if (playButtonObject != null)
        {
            playButtonObject.DOKill();
            playButtonObject.localScale = playButtonStartScale;
            playButtonObject
                .DOScale(playButtonStartScale * idleScaleMultiplier, idleScaleDuration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo);
        }
    }

    private void StopIdleScaleEffects()
    {
        if (titleObject != null)
        {
            titleObject.DOKill();
            titleObject.localScale = titleStartScale;
        }

        if (playButtonObject != null)
        {
            playButtonObject.DOKill();
            playButtonObject.localScale = playButtonStartScale;
        }
    }

    private void PlayStep()
    {
        int stepCount = GetStepCount();
        if (stepCount == 0)
        {
            return;
        }

        int targetIndex = GetNextValidIndex();
        if (targetIndex < 0)
        {
            return;
        }

        Button targetButton = GetButtonAtIndex(targetIndex);
        RectTransform targetRect = targetButton != null ? targetButton.transform as RectTransform : null;
        if (targetRect == null)
        {
            return;
        }

        loopSequence = DOTween.Sequence();
        loopSequence.AppendCallback(() => MoveToPoint(targetRect, false));
        loopSequence.AppendInterval(moveDuration);
        loopSequence.AppendInterval(delayBeforeClick);
        loopSequence.AppendCallback(() => PlayClickEffect(targetButton));
        loopSequence.AppendInterval(handPressDuration * 2f + delayAfterClick);
        loopSequence.OnComplete(() =>
        {
            currentIndex = (targetIndex + 1) % stepCount;
            PlayStep();
        });
    }

    private int GetNextValidIndex()
    {
        int stepCount = GetStepCount();
        if (stepCount == 0)
        {
            return -1;
        }

        for (int i = 0; i < stepCount; i++)
        {
            int index = (currentIndex + i) % stepCount;
            if (buttons[index] != null && buttons[index].transform is RectTransform)
            {
                return index;
            }
        }

        return -1;
    }

    private void PlayClickEffect(Button targetButton)
    {
        if (handRect == null || targetButton == null)
        {
            return;
        }

        handRect.DOKill();
        handRect.localScale = handStartScale;

        Vector2 startAnchorPos = handRect.anchoredPosition;
        Vector2 pressOffset = Vector2.down * handPressDistance;
        Sequence handClickSequence = DOTween.Sequence();
        handClickSequence.Append(handRect.DOAnchorPos(startAnchorPos + pressOffset, handPressDuration)
            .SetEase(Ease.InQuad));
        handClickSequence.Join(handRect.DOScale(handStartScale * handScaleDown, handPressDuration)
            .SetEase(Ease.InQuad));
        handClickSequence.Append(handRect.DOAnchorPos(startAnchorPos, handPressDuration).SetEase(Ease.OutQuad));
        handClickSequence.Join(handRect.DOScale(handStartScale, handPressDuration).SetEase(Ease.OutQuad));

        targetButton.transform.DOKill();
        targetButton.transform.localScale = GetButtonStartScale(targetButton);
        targetButton.transform.DOPunchScale(Vector3.one * buttonPunchScale, buttonPunchDuration, buttonPunchVibrato,
            0.9f);
    }

    private void MoveToPoint(RectTransform targetPoint, bool tapOnArrive)
    {
        if (handRect == null || targetPoint == null)
        {
            return;
        }

        if (handMoveTween != null)
        {
            handMoveTween.Kill();
        }

        handMoveTween = handRect.DOAnchorPos(GetTargetAnchorPosition(targetPoint), moveDuration)
            .SetEase(Ease.Linear)
            .OnComplete(() =>
            {
                handMoveTween = null;

                if (tapOnArrive)
                {
                    Button targetButton = targetPoint.GetComponent<Button>();
                    if (targetButton != null)
                    {
                        PlayClickEffect(targetButton);
                    }
                }
            });
    }

    private Vector2 GetTargetAnchorPosition(RectTransform target)
    {
        RectTransform parentRect = handRect.parent as RectTransform;
        if (parentRect == null)
        {
            return target.anchoredPosition + handOffset;
        }

        Canvas canvas = handRect.GetComponentInParent<Canvas>();
        Camera uiCamera = null;
        if (canvas != null && canvas.renderMode != RenderMode.ScreenSpaceOverlay)
        {
            uiCamera = canvas.worldCamera;
        }

        Vector2 localPoint;
        Vector2 screenPoint = RectTransformUtility.WorldToScreenPoint(uiCamera, target.position);
        RectTransformUtility.ScreenPointToLocalPointInRectangle(parentRect, screenPoint, uiCamera, out localPoint);
        return localPoint + handOffset;
    }

    private int GetStepCount()
    {
        return buttons.Count;
    }

    private Button GetButtonAtIndex(int index)
    {
        if (index < 0 || index >= buttons.Count)
        {
            return null;
        }

        return buttons[index];
    }

    private void CacheButtonScales()
    {
        buttonStartScales.Clear();

        foreach (Button button in buttons)
        {
            if (button != null && !buttonStartScales.ContainsKey(button))
            {
                buttonStartScales.Add(button, button.transform.localScale);
            }
        }
    }

    private Vector3 GetButtonStartScale(Button button)
    {
        if (button == null)
        {
            return Vector3.one;
        }

        if (buttonStartScales.TryGetValue(button, out Vector3 scale))
        {
            return scale;
        }

        return button.transform.localScale;
    }

    private static Sprite CreateSprite(Texture2D texture)
    {
        return Sprite.Create(
            texture,
            new Rect(0f, 0f, texture.width, texture.height),
            new Vector2(0.5f, 0.5f));
    }
}