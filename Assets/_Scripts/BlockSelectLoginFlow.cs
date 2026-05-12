using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class BlockSelectLoginFlow : MonoBehaviour
{
    public static event System.Action OnFlowCompleted;

    [Header("References")]
    [SerializeField] private TutorialBuildBlock legacyTutorial;
    [SerializeField] private GameObject blockSelectPanel;
    [SerializeField] private RectTransform handPointer;
    [SerializeField] private List<Button> tabButtons = new List<Button>();
    [SerializeField] private List<Image> tabIconImages = new List<Image>();
    [SerializeField] private List<Image> tabHighlightImages = new List<Image>();
    [SerializeField] private List<Image> blockSlotImages = new List<Image>();
    [SerializeField] private List<Sprite> blockSprites = new List<Sprite>();

    [Header("Flow")]
    [SerializeField] private bool playOnStart = true;
    [SerializeField] private bool hidePanelOnAwake = true;
    [SerializeField] private float openDelay = 3f;
    [SerializeField] private int guidedSelectionCount = 3;
    [SerializeField] private Vector2 handOffset = new Vector2(56f, -44f);
    [SerializeField] private float handMoveDuration = 0.25f;
    [SerializeField] private bool showEndCardOnComplete = false;

    [Header("Feedback")]
    [SerializeField] private float wrongFlashDuration = 0.12f;
    [SerializeField] private Color wrongSlotColor = new Color(0.82f, 0.24f, 0.2f, 0.85f);
    [SerializeField] private Color targetSlotColor = new Color(1f, 0.92f, 0.45f, 1f);
    [SerializeField] private float targetSlotScale = 1.12f;

    private readonly List<Sprite> spritePool = new List<Sprite>();
    private readonly List<Button> blockSlotButtons = new List<Button>();
    private readonly List<Image> blockSlotHighlightImages = new List<Image>();
    private readonly List<Color> blockSlotHighlightBaseColors = new List<Color>();
    private readonly List<Vector3> blockSlotHighlightBaseScales = new List<Vector3>();

    private CanvasGroup panelCanvasGroup;
    private Coroutine handRoutine;
    private Coroutine slotHighlightRoutine;
    private bool isFlowActive;
    private bool isTransitioning;
    private int currentSelectionCount;
    private int currentTargetSlotIndex = -1;
    private bool cachedAllowInput = true;
    private float cachedTimeScale = 1f;

    private void Reset()
    {
        legacyTutorial = GetComponent<TutorialBuildBlock>();
    }

    private void Awake()
    {
        if (legacyTutorial == null)
        {
            legacyTutorial = GetComponent<TutorialBuildBlock>();
        }

        CacheSpritePool();
        AutoFillMissingReferences();
        CachePanelCanvasGroup();
        CacheBlockSlotButtons();

        if (hidePanelOnAwake)
        {
            SetPanelVisible(false);
        }

        if (handPointer != null)
        {
            handPointer.gameObject.SetActive(false);
        }
    }

    private void Start()
    {
        if (!playOnStart || !CanRunFlow())
        {
            return;
        }

        DisableLegacyTutorial();
        BindSlotListeners();
        StartCoroutine(BeginFlow());
    }

    private void OnDisable()
    {
        RestoreGameplayState();
    }

    private void OnDestroy()
    {
        RestoreGameplayState();
    }

    private IEnumerator BeginFlow()
    {
        yield return new WaitForSeconds(openDelay);

        if (LunaManager.ins != null && LunaManager.ins.isCretivePause)
        {
            yield break;
        }

        OpenBlockSelect();
    }

    private void OpenBlockSelect()
    {
        if (!CanRunFlow())
        {
            return;
        }

        SetPanelVisible(true);
        AudioManager.ins?.PlayOpenBlockSelectSound();

        cachedTimeScale = Time.timeScale;
        Time.timeScale = 0f;

        if (MouseLook.ins != null)
        {
            cachedAllowInput = MouseLook.ins.allowInput;
            MouseLook.ins.allowInput = false;
        }

        isFlowActive = true;
        isTransitioning = false;
        currentSelectionCount = 0;
        currentTargetSlotIndex = -1;

        RandomizeBlockSlots();
        PickNextTargetSlot();
    }

    private void CloseBlockSelect()
    {
        isFlowActive = false;
        isTransitioning = false;
        currentSelectionCount = 0;
        currentTargetSlotIndex = -1;

        if (handRoutine != null)
        {
            StopCoroutine(handRoutine);
            handRoutine = null;
        }

        if (slotHighlightRoutine != null)
        {
            StopCoroutine(slotHighlightRoutine);
            slotHighlightRoutine = null;
        }

        if (handPointer != null)
        {
            handPointer.gameObject.SetActive(false);
        }

        RestoreSlotColors();
        SetPanelVisible(false);
        RestoreGameplayState();
    }

    private void RestoreGameplayState()
    {
        Time.timeScale = cachedTimeScale;

        if (MouseLook.ins != null)
        {
            MouseLook.ins.allowInput = cachedAllowInput;
        }
    }

    private bool CanRunFlow()
    {
        return blockSelectPanel != null
            && blockSlotImages.Count > 0
            && spritePool.Count > 0;
    }

    private void DisableLegacyTutorial()
    {
        if (legacyTutorial == null)
        {
            return;
        }

        if (legacyTutorial.lstStep != null)
        {
            foreach (GameObject step in legacyTutorial.lstStep)
            {
                if (step != null)
                {
                    step.SetActive(false);
                }
            }
        }

        legacyTutorial.enabled = false;
    }

    private void CacheSpritePool()
    {
        spritePool.Clear();

        foreach (Sprite sprite in blockSprites)
        {
            if (sprite != null && !spritePool.Contains(sprite))
            {
                spritePool.Add(sprite);
            }
        }
    }

    private void AutoFillMissingReferences()
    {
        if (handPointer == null)
        {
            handPointer = FindHandPointer();
        }
    }

    private void CachePanelCanvasGroup()
    {
        if (blockSelectPanel == null)
        {
            return;
        }

        panelCanvasGroup = blockSelectPanel.GetComponent<CanvasGroup>();
        if (panelCanvasGroup == null)
        {
            panelCanvasGroup = blockSelectPanel.AddComponent<CanvasGroup>();
        }
    }

    private void CacheBlockSlotButtons()
    {
        blockSlotButtons.Clear();
        blockSlotHighlightImages.Clear();
        blockSlotHighlightBaseColors.Clear();
        blockSlotHighlightBaseScales.Clear();

        foreach (Image blockSlotImage in blockSlotImages)
        {
            if (blockSlotImage == null)
            {
                blockSlotButtons.Add(null);
                blockSlotHighlightImages.Add(null);
                blockSlotHighlightBaseColors.Add(Color.white);
                blockSlotHighlightBaseScales.Add(Vector3.one);
                continue;
            }

            Button button = blockSlotImage.GetComponent<Button>();
            if (button == null)
            {
                button = blockSlotImage.GetComponentInParent<Button>();
            }

            if (button == null)
            {
                button = blockSlotImage.gameObject.AddComponent<Button>();
                button.targetGraphic = blockSlotImage;
            }

            blockSlotButtons.Add(button);

            Image highlightImage = ResolveHighlightImage(blockSlotImage, button);
            blockSlotHighlightImages.Add(highlightImage);
            blockSlotHighlightBaseColors.Add(highlightImage != null ? highlightImage.color : Color.white);
            blockSlotHighlightBaseScales.Add(highlightImage != null ? highlightImage.rectTransform.localScale : Vector3.one);
        }
    }

    private void BindSlotListeners()
    {
        for (int i = 0; i < blockSlotButtons.Count; i++)
        {
            Button blockSlotButton = blockSlotButtons[i];
            if (blockSlotButton == null)
            {
                continue;
            }

            int slotIndex = i;
            blockSlotButton.onClick.AddListener(() => OnBlockSlotClicked(slotIndex));
        }
    }

    private void RandomizeBlockSlots()
    {
        for (int i = 0; i < blockSlotImages.Count; i++)
        {
            Image blockSlotImage = blockSlotImages[i];
            if (blockSlotImage == null)
            {
                continue;
            }

            blockSlotImage.sprite = spritePool[Random.Range(0, spritePool.Count)];
        }
    }

    private void PickNextTargetSlot()
    {
        List<int> validSlots = new List<int>();
        for (int i = 0; i < blockSlotImages.Count; i++)
        {
            if (blockSlotImages[i] != null && blockSlotImages[i].gameObject.activeInHierarchy)
            {
                validSlots.Add(i);
            }
        }

        if (validSlots.Count == 0)
        {
            CloseBlockSelect();
            return;
        }

        currentTargetSlotIndex = validSlots[Random.Range(0, validSlots.Count)];
        StartTargetSlotHighlight();
        FocusCurrentSlot();
    }

    private void OnBlockSlotClicked(int slotIndex)
    {
        if (!isFlowActive || isTransitioning || currentTargetSlotIndex < 0)
        {
            return;
        }

        AudioManager.ins?.PlaySelectBlockItemSound();

        if (slotIndex != currentTargetSlotIndex)
        {
            StartCoroutine(FlashWrongSlot(slotIndex));
            return;
        }

        StartCoroutine(HandleCorrectSlot());
    }

    private IEnumerator HandleCorrectSlot()
    {
        isTransitioning = true;
        currentSelectionCount++;

        yield return new WaitForSecondsRealtime(0.15f);

        if (currentSelectionCount >= guidedSelectionCount)
        {
            CompleteFlow();
            yield break;
        }

        RandomizeBlockSlots();
        PickNextTargetSlot();
        isTransitioning = false;
    }

    private void CompleteFlow()
    {
        CloseBlockSelect();
        OnFlowCompleted?.Invoke();

        if (showEndCardOnComplete && LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
        }
    }

    private IEnumerator FlashWrongSlot(int slotIndex)
    {
        if (slotIndex < 0 || slotIndex >= blockSlotImages.Count)
        {
            yield break;
        }

        Image blockSlotImage = blockSlotImages[slotIndex];
        if (blockSlotImage == null)
        {
            yield break;
        }

        Image highlightImage = slotIndex < blockSlotHighlightImages.Count ? blockSlotHighlightImages[slotIndex] : null;
        if (highlightImage == null)
        {
            yield break;
        }

        Color baseColor = slotIndex < blockSlotHighlightBaseColors.Count ? blockSlotHighlightBaseColors[slotIndex] : Color.white;
        highlightImage.color = wrongSlotColor;
        yield return new WaitForSecondsRealtime(wrongFlashDuration);
        highlightImage.color = slotIndex == currentTargetSlotIndex ? targetSlotColor : baseColor;
    }

    private void FocusCurrentSlot()
    {
        if (handPointer == null || currentTargetSlotIndex < 0 || currentTargetSlotIndex >= blockSlotImages.Count)
        {
            return;
        }

        Image targetSlot = blockSlotImages[currentTargetSlotIndex];
        if (targetSlot == null)
        {
            return;
        }

        if (handRoutine != null)
        {
            StopCoroutine(handRoutine);
        }

        handPointer.gameObject.SetActive(true);
        handRoutine = StartCoroutine(AnimateHand(targetSlot.rectTransform));
    }

    private IEnumerator AnimateHand(RectTransform target)
    {
        if (handPointer == null || target == null)
        {
            yield break;
        }

        Vector3 startPosition = handPointer.position;
        Vector3 endPosition = target.position + (Vector3)handOffset;
        float elapsed = 0f;

        while (elapsed < handMoveDuration)
        {
            elapsed += Time.unscaledDeltaTime;
            float progress = Mathf.Clamp01(elapsed / handMoveDuration);
            handPointer.position = Vector3.Lerp(startPosition, endPosition, progress);
            yield return null;
        }

        while (isFlowActive && target != null)
        {
            //float bob = Mathf.Sin(Time.unscaledTime * 8f) * 12f;
            //handPointer.position = endPosition + Vector3.up * bob;
            yield return null;
        }
    }

    private void RestoreSlotColors()
    {
        for (int i = 0; i < blockSlotHighlightImages.Count; i++)
        {
            Image highlightImage = blockSlotHighlightImages[i];
            if (highlightImage == null)
            {
                continue;
            }

            highlightImage.color = i < blockSlotHighlightBaseColors.Count ? blockSlotHighlightBaseColors[i] : Color.white;
            highlightImage.rectTransform.localScale = i < blockSlotHighlightBaseScales.Count ? blockSlotHighlightBaseScales[i] : Vector3.one;
        }
    }

    private void StartTargetSlotHighlight()
    {
        if (slotHighlightRoutine != null)
        {
            StopCoroutine(slotHighlightRoutine);
            slotHighlightRoutine = null;
        }

        RestoreSlotColors();

        if (currentTargetSlotIndex < 0 || currentTargetSlotIndex >= blockSlotHighlightImages.Count)
        {
            return;
        }

        Image highlightImage = blockSlotHighlightImages[currentTargetSlotIndex];
        if (highlightImage == null)
        {
            return;
        }

        slotHighlightRoutine = StartCoroutine(BlinkTargetSlot(currentTargetSlotIndex));
    }

    private IEnumerator BlinkTargetSlot(int slotIndex)
    {
        Image highlightImage = blockSlotHighlightImages[slotIndex];
        if (highlightImage == null)
        {
            yield break;
        }

        Color baseColor = slotIndex < blockSlotHighlightBaseColors.Count
            ? blockSlotHighlightBaseColors[slotIndex]
            : Color.white;
        Vector3 baseScale = slotIndex < blockSlotHighlightBaseScales.Count
            ? blockSlotHighlightBaseScales[slotIndex]
            : Vector3.one;

        while (isFlowActive && currentTargetSlotIndex == slotIndex && highlightImage != null)
        {
            float pulse = 0.5f + 0.5f * Mathf.Sin(Time.unscaledTime * 8f);
            highlightImage.color = Color.Lerp(baseColor, targetSlotColor, pulse);
            highlightImage.rectTransform.localScale = Vector3.Lerp(baseScale, baseScale * targetSlotScale, pulse);
            yield return null;
        }

        if (highlightImage != null)
        {
            highlightImage.color = baseColor;
            highlightImage.rectTransform.localScale = baseScale;
        }
    }

    private RectTransform FindHandPointer()
    {
        foreach (Image image in GetComponentsInChildren<Image>(true))
        {
            if (image.sprite == null)
            {
                continue;
            }

            string spriteName = image.sprite.name.ToLowerInvariant();
            string textureName = image.sprite.texture != null ? image.sprite.texture.name.ToLowerInvariant() : string.Empty;
            if (spriteName.Contains("hand") || textureName.Contains("hand"))
            {
                return image.rectTransform;
            }
        }

        return null;
    }

    private void SetPanelVisible(bool visible)
    {
        if (blockSelectPanel == null)
        {
            return;
        }

        if (!blockSelectPanel.activeSelf)
        {
            blockSelectPanel.SetActive(true);
        }

        if (panelCanvasGroup == null)
        {
            CachePanelCanvasGroup();
        }

        if (panelCanvasGroup != null)
        {
            panelCanvasGroup.alpha = visible ? 1f : 0f;
            panelCanvasGroup.blocksRaycasts = visible;
            panelCanvasGroup.interactable = visible;
        }
    }

    private static Image ResolveHighlightImage(Image blockSlotImage, Button button)
    {
        if (button != null && button.image != null && button.image != blockSlotImage)
        {
            return button.image;
        }

        Transform current = blockSlotImage != null ? blockSlotImage.transform.parent : null;
        while (current != null)
        {
            Image parentImage = current.GetComponent<Image>();
            if (parentImage != null && parentImage != blockSlotImage)
            {
                return parentImage;
            }

            current = current.parent;
        }

        return blockSlotImage;
    }
}
