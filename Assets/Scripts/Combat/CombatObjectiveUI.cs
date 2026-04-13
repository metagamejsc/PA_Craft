using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public sealed class CombatObjectiveUI : MonoBehaviour
{
    [Serializable]
    private sealed class TargetBinding
    {
        public DamageableTarget target;
        public int order;
        public float indicatorHeightOffset = 0.25f;
    }

    [Serializable]
    private sealed class EnemyIconBinding
    {
        public EnemyAgent enemy;
        public int order;
        public Sprite backgroundSprite;
        public Sprite iconSprite;
        public RectTransform cardRoot;
        public Image backgroundImage;
        public Image iconImage;
        public Image killMarkerImage;
    }

    private const float CardSpacing = 170f;
    private const float ArrowBounceAmplitude = 8f;
    private const float ArrowBounceSpeed = 5f;
    private const float ArrowVerticalOffset = 48f;
    private const float ArrowClampPadding = 32f;
    private const float KillMarkerSize = 42f;

    private static Sprite builtInSprite;

    [Header("Scene References")]
    [SerializeField] private Canvas targetCanvas;
    [SerializeField] private Camera defaultViewCamera;
    [SerializeField] private Camera crosshairViewCamera;
    [SerializeField] private RectTransform enemyCardTemplate;
    [SerializeField] private bool autoDiscoverEnemyIconsWhenListEmpty = true;
    [SerializeField] private bool useEnemyIconsAsTargetsWhenTargetListEmpty = true;
    [SerializeField] private bool autoDiscoverEnemyTargetsWhenTargetListEmpty = true;

    [Header("Sprites")]
    [SerializeField] private Sprite defaultCardBackgroundSprite;
    [SerializeField] private Sprite targetArrowSprite;
    [SerializeField] private Sprite killMarkerSprite;
    [SerializeField] private Color targetArrowColor = Color.white;

    [Header("Manual Targets")]
    [SerializeField] private List<TargetBinding> targetBindings = new List<TargetBinding>();

    [Header("Manual Enemy Icons")]
    [SerializeField] private List<EnemyIconBinding> enemyIconBindings = new List<EnemyIconBinding>();

    private RectTransform canvasRect;
    private Camera renderCamera;
    private RectTransform targetArrow;
    private bool initialized;

    private readonly List<TargetEntry> targetEntries = new List<TargetEntry>();
    private readonly List<EnemyIconEntry> enemyEntries = new List<EnemyIconEntry>();

    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
    private static void Bootstrap()
    {
        if (FindObjectOfType<CombatObjectiveUI>() != null)
        {
            return;
        }

        GameObject controller = new GameObject(nameof(CombatObjectiveUI));
        controller.AddComponent<CombatObjectiveUI>();
    }

    private void Start()
    {
        TryInitialize();
    }

    private void LateUpdate()
    {
        if (!initialized && !TryInitialize())
        {
            return;
        }

        UpdateArrow();
    }

    private void OnDestroy()
    {
        DisposeEntries();
    }

    private bool TryInitialize()
    {
        if (initialized)
        {
            return true;
        }

        if (targetCanvas == null)
        {
            targetCanvas = FindObjectOfType<Canvas>();
        }

        renderCamera = ResolveCamera();
        if (targetCanvas == null || renderCamera == null)
        {
            return false;
        }

        canvasRect = targetCanvas.transform as RectTransform;
        if (canvasRect == null)
        {
            return false;
        }

        if (enemyCardTemplate == null)
        {
            enemyCardTemplate = FindEnemyCardTemplate(canvasRect);
        }

        BuildArrow();
        BuildEntries();
        initialized = targetEntries.Count > 0 || enemyEntries.Count > 0;
        return initialized;
    }

    private void DisposeEntries()
    {
        for (int i = 0; i < enemyEntries.Count; i++)
        {
            enemyEntries[i].Dispose();
        }

        enemyEntries.Clear();
        targetEntries.Clear();
    }

    private Camera ResolveCamera()
    {
        CameraDragRotate controller = CameraDragRotate.ActiveController;
        if (controller != null)
        {
            if (controller.IsDragging)
            {
                if (crosshairViewCamera != null)
                {
                    return crosshairViewCamera;
                }

                Camera controllerCamera = controller.GetComponent<Camera>();
                if (controllerCamera != null)
                {
                    return controllerCamera;
                }
            }
        }

        if (defaultViewCamera != null)
        {
            return defaultViewCamera;
        }

        if (crosshairViewCamera != null)
        {
            return crosshairViewCamera;
        }

        return Camera.main;
    }

    private void BuildEntries()
    {
        if (enemyEntries.Count == 0)
        {
            BuildEnemyEntries();
        }

        if (targetEntries.Count == 0)
        {
            BuildTargetEntries();
        }
    }

    private void BuildTargetEntries()
    {
        if (HasManualTargetBindings())
        {
            BuildManualTargets();
            return;
        }

        if (useEnemyIconsAsTargetsWhenTargetListEmpty && enemyEntries.Count > 0)
        {
            for (int i = 0; i < enemyEntries.Count; i++)
            {
                EnemyIconEntry enemyEntry = enemyEntries[i];
                if (enemyEntry.Target == null)
                {
                    continue;
                }

                targetEntries.Add(new TargetEntry(enemyEntry.Target, enemyEntry.Priority, 0f));
            }

            return;
        }

        if (autoDiscoverEnemyTargetsWhenTargetListEmpty)
        {
            BuildAutoTargets();
        }
    }

    private bool HasManualTargetBindings()
    {
        for (int i = 0; i < targetBindings.Count; i++)
        {
            TargetBinding binding = targetBindings[i];
            if (binding != null && binding.target != null)
            {
                return true;
            }
        }

        return false;
    }

    private void BuildManualTargets()
    {
        List<TargetBinding> validBindings = new List<TargetBinding>();
        for (int i = 0; i < targetBindings.Count; i++)
        {
            TargetBinding binding = targetBindings[i];
            if (binding != null && binding.target != null)
            {
                validBindings.Add(binding);
            }
        }

        validBindings.Sort((left, right) => left.order.CompareTo(right.order));

        for (int i = 0; i < validBindings.Count; i++)
        {
            TargetBinding binding = validBindings[i];
            targetEntries.Add(new TargetEntry(binding.target, binding.order, binding.indicatorHeightOffset));
        }
    }

    private void BuildAutoTargets()
    {
        EnemyAgent[] enemies = FindObjectsOfType<EnemyAgent>();
        if (enemies == null || enemies.Length == 0)
        {
            return;
        }

        Array.Sort(enemies, CompareEnemiesForDisplay);

        for (int i = 0; i < enemies.Length; i++)
        {
            EnemyAgent enemy = enemies[i];
            if (enemy == null)
            {
                continue;
            }

            targetEntries.Add(new TargetEntry(enemy, enemy.ObjectivePriority, 0f));
        }
    }

    private void BuildEnemyEntries()
    {
        if (HasManualEnemyIconBindings())
        {
            BuildManualEnemyEntries();
            return;
        }

        if (autoDiscoverEnemyIconsWhenListEmpty)
        {
            BuildAutoEnemyEntries();
        }
    }

    private bool HasManualEnemyIconBindings()
    {
        for (int i = 0; i < enemyIconBindings.Count; i++)
        {
            EnemyIconBinding binding = enemyIconBindings[i];
            if (binding != null && binding.enemy != null)
            {
                return true;
            }
        }

        return false;
    }

    private void BuildManualEnemyEntries()
    {
        List<EnemyIconBinding> validBindings = new List<EnemyIconBinding>();
        for (int i = 0; i < enemyIconBindings.Count; i++)
        {
            EnemyIconBinding binding = enemyIconBindings[i];
            if (binding != null && binding.enemy != null)
            {
                validBindings.Add(binding);
            }
        }

        validBindings.Sort((left, right) => left.order.CompareTo(right.order));

        for (int i = 0; i < validBindings.Count; i++)
        {
            EnemyIconBinding binding = validBindings[i];
            EnemyCardView cardView = CreateCardView(binding, i);
            cardView.SetBackground(binding.backgroundSprite);
            cardView.SetIcon(binding.iconSprite);
            cardView.SetKilled(binding.enemy.IsDead);
            enemyEntries.Add(new EnemyIconEntry(binding.enemy, cardView, binding.order));
        }
    }

    private void BuildAutoEnemyEntries()
    {
        EnemyAgent[] enemies = FindObjectsOfType<EnemyAgent>();
        if (enemies == null || enemies.Length == 0)
        {
            return;
        }

        Array.Sort(enemies, CompareEnemiesForDisplay);

        for (int i = 0; i < enemies.Length; i++)
        {
            EnemyAgent enemy = enemies[i];
            if (enemy == null)
            {
                continue;
            }

            EnemyCardView cardView = CreateCardView(null, i);
            cardView.SetKilled(enemy.IsDead);
            enemyEntries.Add(new EnemyIconEntry(enemy, cardView, enemy.ObjectivePriority));
        }
    }

    private EnemyCardView CreateCardView(EnemyIconBinding binding, int index)
    {
        if (binding != null && binding.cardRoot != null)
        {
            binding.cardRoot.gameObject.SetActive(true);
            return EnemyCardView.Capture(
                binding.cardRoot,
                binding.backgroundImage,
                binding.iconImage,
                binding.killMarkerImage,
                defaultCardBackgroundSprite,
                killMarkerSprite);
        }

        if (enemyCardTemplate != null)
        {
            RectTransform cardRoot = Instantiate(enemyCardTemplate, enemyCardTemplate.parent);
            cardRoot.gameObject.name = enemyCardTemplate.gameObject.name + " Runtime " + (index + 1);
            cardRoot.anchoredPosition = enemyCardTemplate.anchoredPosition + new Vector2(0f, -CardSpacing * index);
            cardRoot.gameObject.SetActive(true);
            return EnemyCardView.Capture(cardRoot, null, null, null, defaultCardBackgroundSprite, killMarkerSprite);
        }

        return CreateFallbackCard(index);
    }

    private EnemyCardView CreateFallbackCard(int index)
    {
        GameObject rootObject = new GameObject("Enemy Objective Card", typeof(RectTransform), typeof(Image));
        RectTransform root = rootObject.GetComponent<RectTransform>();
        root.SetParent(canvasRect, false);
        root.anchorMin = new Vector2(1f, 1f);
        root.anchorMax = new Vector2(1f, 1f);
        root.pivot = new Vector2(1f, 1f);
        root.anchoredPosition = new Vector2(-20f, -20f - CardSpacing * index);
        root.sizeDelta = new Vector2(150f, 150f);

        Image background = rootObject.GetComponent<Image>();
        background.sprite = defaultCardBackgroundSprite != null ? defaultCardBackgroundSprite : GetBuiltInSprite();
        background.color = new Color(0.21f, 0.35f, 0.67f, 0.95f);
        background.raycastTarget = false;

        Image icon = CreateImage("Icon", root, new Vector2(0f, 0f), new Vector2(130f, 130f), Color.white, Vector2.one * 0.5f, Vector2.one * 0.5f, null);
        return EnemyCardView.Capture(root, background, icon, null, defaultCardBackgroundSprite, killMarkerSprite);
    }

    private void BuildArrow()
    {
        if (targetArrow != null)
        {
            return;
        }

        GameObject arrowObject = new GameObject("Target Arrow", typeof(RectTransform));
        targetArrow = arrowObject.GetComponent<RectTransform>();
        targetArrow.SetParent(canvasRect, false);
        targetArrow.anchorMin = new Vector2(0.5f, 0.5f);
        targetArrow.anchorMax = new Vector2(0.5f, 0.5f);
        targetArrow.pivot = new Vector2(0.5f, 0.5f);
        targetArrow.sizeDelta = new Vector2(48f, 64f);
        targetArrow.gameObject.SetActive(false);

        if (targetArrowSprite != null)
        {
            Image arrowImage = arrowObject.AddComponent<Image>();
            arrowImage.sprite = targetArrowSprite;
            arrowImage.color = targetArrowColor;
            arrowImage.preserveAspect = true;
            arrowImage.raycastTarget = false;
            targetArrow.sizeDelta = new Vector2(64f, 64f);
            return;
        }

        CreateImage("Shadow Stem", targetArrow, new Vector2(0f, -8f), new Vector2(8f, 24f), new Color(0f, 0f, 0f, 0.35f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
        Image shadowHead = CreateImage("Shadow Head", targetArrow, new Vector2(0f, 10f), new Vector2(18f, 18f), new Color(0f, 0f, 0f, 0.35f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
        shadowHead.rectTransform.localRotation = Quaternion.Euler(0f, 0f, 45f);

        CreateImage("Stem", targetArrow, new Vector2(0f, -10f), new Vector2(6f, 26f), new Color(1f, 0.86f, 0.24f, 1f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
        Image head = CreateImage("Head", targetArrow, new Vector2(0f, 10f), new Vector2(16f, 16f), new Color(1f, 0.92f, 0.35f, 1f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
        head.rectTransform.localRotation = Quaternion.Euler(0f, 0f, 45f);
    }

    private void UpdateArrow()
    {
        renderCamera = ResolveCamera();
        DamageableTarget target = GetCurrentTarget();
        if (target == null || renderCamera == null)
        {
            if (targetArrow != null)
            {
                targetArrow.gameObject.SetActive(false);
            }

            return;
        }

        Vector3 screenPoint = renderCamera.WorldToScreenPoint(GetIndicatorWorldPosition(target));
        if (screenPoint.z <= 0f)
        {
            targetArrow.gameObject.SetActive(false);
            return;
        }

        Vector2 canvasPoint;
        Camera uiCamera = targetCanvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : renderCamera;
        if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect, screenPoint, uiCamera, out canvasPoint))
        {
            targetArrow.gameObject.SetActive(false);
            return;
        }

        Vector2 clampedPoint = ClampToCanvas(canvasPoint);
        clampedPoint.y += ArrowVerticalOffset + Mathf.Sin(Time.unscaledTime * ArrowBounceSpeed) * ArrowBounceAmplitude;
        targetArrow.anchoredPosition = clampedPoint;
        targetArrow.gameObject.SetActive(true);
    }

    private DamageableTarget GetCurrentTarget()
    {
        DamageableTarget bestTarget = null;
        int bestPriority = int.MaxValue;
        float bestDistanceSqr = float.MaxValue;
        Vector3 cameraPosition = renderCamera != null ? renderCamera.transform.position : Vector3.zero;

        for (int i = 0; i < targetEntries.Count; i++)
        {
            DamageableTarget target = targetEntries[i].Target;
            if (target == null || target.IsDead)
            {
                continue;
            }

            int priority = targetEntries[i].Priority;
            float distanceSqr = (target.transform.position - cameraPosition).sqrMagnitude;
            if (bestTarget == null || priority < bestPriority || (priority == bestPriority && distanceSqr < bestDistanceSqr))
            {
                bestTarget = target;
                bestPriority = priority;
                bestDistanceSqr = distanceSqr;
            }
        }

        return bestTarget;
    }

    private Vector3 GetIndicatorWorldPosition(DamageableTarget target)
    {
        if (target == null)
        {
            return Vector3.zero;
        }

        for (int i = 0; i < targetEntries.Count; i++)
        {
            if (targetEntries[i].Target == target)
            {
                return targetEntries[i].GetIndicatorWorldPosition();
            }
        }

        if (target is EnemyAgent enemy)
        {
            return enemy.IndicatorWorldPosition;
        }

        return target.GetIndicatorWorldPosition(0.25f);
    }

    private Vector2 ClampToCanvas(Vector2 canvasPoint)
    {
        Vector2 size = canvasRect.rect.size * 0.5f;
        return new Vector2(
            Mathf.Clamp(canvasPoint.x, -size.x + ArrowClampPadding, size.x - ArrowClampPadding),
            Mathf.Clamp(canvasPoint.y, -size.y + ArrowClampPadding, size.y - ArrowClampPadding));
    }

    private static RectTransform FindEnemyCardTemplate(RectTransform root)
    {
        RectTransform[] rects = root.GetComponentsInChildren<RectTransform>(true);
        for (int i = 0; i < rects.Length; i++)
        {
            RectTransform rect = rects[i];
            if (rect == null || rect == root || rect.gameObject.activeSelf)
            {
                continue;
            }

            if (FindDescendant(rect, "Icon") == null)
            {
                continue;
            }

            return rect;
        }

        return null;
    }

    private static int CompareEnemiesForDisplay(EnemyAgent left, EnemyAgent right)
    {
        if (left == null)
        {
            return right == null ? 0 : 1;
        }

        if (right == null)
        {
            return -1;
        }

        int priorityComparison = left.ObjectivePriority.CompareTo(right.ObjectivePriority);
        if (priorityComparison != 0)
        {
            return priorityComparison;
        }

        int nameComparison = string.Compare(left.DisplayName, right.DisplayName, StringComparison.Ordinal);
        if (nameComparison != 0)
        {
            return nameComparison;
        }

        int xComparison = left.transform.position.x.CompareTo(right.transform.position.x);
        if (xComparison != 0)
        {
            return xComparison;
        }

        return left.transform.position.z.CompareTo(right.transform.position.z);
    }

    private static Transform FindDescendant(Transform parent, string childName)
    {
        for (int i = 0; i < parent.childCount; i++)
        {
            Transform child = parent.GetChild(i);
            if (child.name == childName)
            {
                return child;
            }

            Transform nested = FindDescendant(child, childName);
            if (nested != null)
            {
                return nested;
            }
        }

        return null;
    }

    private static Image CreateImage(
        string objectName,
        RectTransform parent,
        Vector2 anchoredPosition,
        Vector2 size,
        Color color,
        Vector2 anchorMin,
        Vector2 anchorMax,
        Sprite sprite)
    {
        GameObject imageObject = new GameObject(objectName, typeof(RectTransform), typeof(Image));
        RectTransform rect = imageObject.GetComponent<RectTransform>();
        rect.SetParent(parent, false);
        rect.anchorMin = anchorMin;
        rect.anchorMax = anchorMax;
        rect.pivot = new Vector2(0.5f, 0.5f);
        rect.anchoredPosition = anchoredPosition;
        rect.sizeDelta = size;

        Image image = imageObject.GetComponent<Image>();
        image.sprite = sprite != null ? sprite : GetBuiltInSprite();
        image.color = color;
        image.preserveAspect = sprite != null;
        image.raycastTarget = false;
        return image;
    }

    private static Sprite GetBuiltInSprite()
    {
        if (builtInSprite == null)
        {
            builtInSprite = (Sprite)Resources.GetBuiltinResource(typeof(Sprite), "UI/Skin/UISprite.psd");
        }

        return builtInSprite;
    }

    private sealed class TargetEntry
    {
        public TargetEntry(DamageableTarget target, int priority, float indicatorHeightOffset)
        {
            Target = target;
            Priority = priority;
            IndicatorHeightOffset = indicatorHeightOffset;
        }

        public DamageableTarget Target { get; }
        public int Priority { get; }
        private float IndicatorHeightOffset { get; }

        public Vector3 GetIndicatorWorldPosition()
        {
            if (Target == null)
            {
                return Vector3.zero;
            }

            EnemyAgent enemy = Target as EnemyAgent;
            if (enemy != null)
            {
                return enemy.IndicatorWorldPosition;
            }

            return Target.GetIndicatorWorldPosition(IndicatorHeightOffset);
        }
    }

    private sealed class EnemyIconEntry
    {
        public EnemyIconEntry(EnemyAgent target, EnemyCardView cardView, int priority)
        {
            Target = target;
            CardView = cardView;
            Priority = priority;

            if (Target != null)
            {
                Target.Died += OnDied;
                CardView.SetKilled(Target.IsDead);
            }
        }

        public EnemyAgent Target { get; }
        public int Priority { get; }
        private EnemyCardView CardView { get; }

        public void Dispose()
        {
            if (Target == null)
            {
                return;
            }

            Target.Died -= OnDied;
        }

        private void OnDied(DamageableTarget _, Transform attacker)
        {
            CardView.SetKilled(true);
        }
    }

    private sealed class EnemyCardView
    {
        private readonly Image background;
        private readonly Image icon;
        private readonly GameObject killMarkerObject;

        private EnemyCardView(Image background, Image icon, GameObject killMarkerObject)
        {
            this.background = background;
            this.icon = icon;
            this.killMarkerObject = killMarkerObject;
        }

        public static EnemyCardView Capture(
            RectTransform root,
            Image providedBackground,
            Image providedIcon,
            Image providedKillMarker,
            Sprite defaultBackgroundSprite,
            Sprite defaultKillMarkerSprite)
        {
            Image background = providedBackground != null ? providedBackground : root.GetComponent<Image>();
            Image icon = providedIcon != null ? providedIcon : FindGraphic(root, "Icon");

            RectTransform iconRoot = icon != null ? icon.rectTransform : root;
            GameObject killMarkerObject = ResolveKillMarker(root, iconRoot, providedKillMarker, defaultKillMarkerSprite);
            EnemyCardView cardView = new EnemyCardView(background, icon, killMarkerObject);
            if (defaultBackgroundSprite != null)
            {
                cardView.SetBackground(defaultBackgroundSprite);
            }

            return cardView;
        }

        public void SetBackground(Sprite sprite)
        {
            if (background == null || sprite == null)
            {
                return;
            }

            background.sprite = sprite;
            background.preserveAspect = false;
        }

        public void SetIcon(Sprite sprite)
        {
            if (icon == null || sprite == null)
            {
                return;
            }

            icon.sprite = sprite;
            icon.preserveAspect = true;
        }

        public void SetKilled(bool killed)
        {
            if (killMarkerObject != null)
            {
                killMarkerObject.SetActive(killed);
            }
        }

        private static Image FindGraphic(Transform root, string childName)
        {
            Transform child = FindDescendant(root, childName);
            return child != null ? child.GetComponent<Image>() : null;
        }

        private static GameObject ResolveKillMarker(
            RectTransform root,
            RectTransform iconRoot,
            Image providedKillMarker,
            Sprite defaultKillMarkerSprite)
        {
            if (providedKillMarker != null)
            {
                if (defaultKillMarkerSprite != null && providedKillMarker.sprite == null)
                {
                    providedKillMarker.sprite = defaultKillMarkerSprite;
                    providedKillMarker.preserveAspect = true;
                }

                providedKillMarker.raycastTarget = false;
                return providedKillMarker.gameObject;
            }

            Transform existingMarker = FindDescendant(root, "Killed Marker");
            if (existingMarker != null)
            {
                return existingMarker.gameObject;
            }

            return CreateKillMarker(iconRoot, defaultKillMarkerSprite);
        }

        private static GameObject CreateKillMarker(RectTransform iconRoot, Sprite markerSprite)
        {
            if (iconRoot == null)
            {
                return null;
            }

            GameObject markerObject = new GameObject("Killed Marker", typeof(RectTransform));
            RectTransform markerRect = markerObject.GetComponent<RectTransform>();
            markerRect.SetParent(iconRoot, false);
            markerRect.anchorMin = new Vector2(1f, 1f);
            markerRect.anchorMax = new Vector2(1f, 1f);
            markerRect.pivot = new Vector2(0.5f, 0.5f);
            markerRect.anchoredPosition = new Vector2(-8f, -8f);
            markerRect.sizeDelta = new Vector2(KillMarkerSize, KillMarkerSize);

            if (markerSprite != null)
            {
                Image markerImage = markerObject.AddComponent<Image>();
                markerImage.sprite = markerSprite;
                markerImage.preserveAspect = true;
                markerImage.raycastTarget = false;
            }
            else
            {
                Image badge = CreateImage("Badge", markerRect, Vector2.zero, Vector2.one * KillMarkerSize, new Color(0f, 0f, 0f, 0.42f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
                badge.rectTransform.localRotation = Quaternion.Euler(0f, 0f, 45f);

                Image slashA = CreateImage("Slash A", markerRect, Vector2.zero, new Vector2(8f, 34f), new Color(1f, 0.88f, 0.3f, 1f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
                slashA.rectTransform.localRotation = Quaternion.Euler(0f, 0f, 45f);
                Image slashB = CreateImage("Slash B", markerRect, Vector2.zero, new Vector2(8f, 34f), new Color(1f, 0.88f, 0.3f, 1f), new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), null);
                slashB.rectTransform.localRotation = Quaternion.Euler(0f, 0f, -45f);
            }

            markerObject.SetActive(false);
            return markerObject;
        }
    }
}
