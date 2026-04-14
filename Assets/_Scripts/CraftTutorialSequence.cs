using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class CraftTutorialSequence : MonoBehaviour
{
    private sealed class RuntimeItem
    {
        public RectTransform target;
        public Graphic graphic;
        public Button button;
        public UnityAction clickAction;
        public bool revealed;
    }
    [Header("References")]
    [SerializeField] private RectTransform[] itemTargets;
    [SerializeField] private RectTransform hand;
    [SerializeField] private GameObject tutorialPanel;
    [SerializeField] private GameObject craftedPanel;

    [Header("Colors")]
    [SerializeField] private Color hiddenColor = Color.black;
    [SerializeField] private Color revealedColor = Color.white;

    [Header("Audio")]
    [SerializeField] private AudioClip itemClickSound;
    [SerializeField] private AudioClip craftSound;
    [SerializeField] private AudioClip hideUiSound;
    [SerializeField] private AudioSource audioSourceOverride;

    [Header("Timing")]
    [SerializeField] private bool playOnStart = true;
    [SerializeField] [Min(0f)] private float startDelay = 0.15f;
    [SerializeField] [Min(0f)] private float handMoveDuration = 0.3f;
    [SerializeField] [Min(0f)] private float delayBeforeNextItem = 0.15f;
    [SerializeField] [Min(0f)] private float hideUiDelay = 1.5f;

    private readonly List<RuntimeItem> runtimeItems = new List<RuntimeItem>();
    private Coroutine moveHandCoroutine;
    private Coroutine finishCoroutine;
    private int currentItemIndex;
    private bool sequenceActive;

    private void Start()
    {
        BuildRuntimeItems();
        ApplyHiddenState();

        if (craftedPanel != null)
        {
            craftedPanel.SetActive(false);
        }

        if (playOnStart)
        {
            StartSequence();
            return;
        }

        if (hand != null)
        {
            hand.gameObject.SetActive(false);
        }
    }

    private void OnDestroy()
    {
        ClearRuntimeListeners();
    }

    public void StartSequence()
    {
        StopActiveCoroutines();
        BuildRuntimeItems();
        ApplyHiddenState();

        if (runtimeItems.Count == 0)
        {
            Debug.LogWarning("CraftTutorialSequence needs at least one item target.", this);
            return;
        }

        currentItemIndex = 0;
        sequenceActive = true;

        if (tutorialPanel != null)
        {
            tutorialPanel.SetActive(true);
        }

        if (craftedPanel != null)
        {
            craftedPanel.SetActive(false);
        }

        if (hand != null)
        {
            hand.gameObject.SetActive(true);
        }

        moveHandCoroutine = StartCoroutine(BeginSequence());
    }

    public void HideTutorialUi()
    {
        sequenceActive = false;
        StopActiveCoroutines();
        PlayClip(hideUiSound);

        if (tutorialPanel != null)
        {
            tutorialPanel.SetActive(false);
        }
        else
        {
            for (int i = 0; i < runtimeItems.Count; i++)
            {
                if (runtimeItems[i].target != null)
                {
                    runtimeItems[i].target.gameObject.SetActive(false);
                }
            }
        }

        if (craftedPanel != null)
        {
            craftedPanel.SetActive(false);
        }

        if (hand != null)
        {
            hand.gameObject.SetActive(false);
        }
        LunaManager.ins.ShowEndCard();
    }

    private IEnumerator BeginSequence()
    {
        if (startDelay > 0f)
        {
            yield return new WaitForSecondsRealtime(startDelay);
        }

        yield return MoveHandToCurrentItem();
        moveHandCoroutine = null;
    }

    private void BuildRuntimeItems()
    {
        ClearRuntimeListeners();
        runtimeItems.Clear();

        if (itemTargets == null)
        {
            return;
        }

        for (int i = 0; i < itemTargets.Length; i++)
        {
            RectTransform itemTarget = itemTargets[i];
            if (itemTarget == null)
            {
                continue;
            }

            Button button = itemTarget.GetComponent<Button>();
            Graphic graphic = ResolveGraphic(itemTarget, button);

            if (button == null)
            {
                button = itemTarget.gameObject.AddComponent<Button>();
            }

            if (button.targetGraphic == null && graphic != null)
            {
                button.targetGraphic = graphic;
            }

            RuntimeItem runtimeItem = new RuntimeItem
            {
                target = itemTarget,
                graphic = graphic,
                button = button
            };

            int itemIndex = runtimeItems.Count;
            runtimeItem.clickAction = () => HandleItemClicked(itemIndex);
            runtimeItem.button.onClick.AddListener(runtimeItem.clickAction);
            runtimeItems.Add(runtimeItem);
        }
    }

    private void ClearRuntimeListeners()
    {
        for (int i = 0; i < runtimeItems.Count; i++)
        {
            RuntimeItem runtimeItem = runtimeItems[i];
            if (runtimeItem.button != null && runtimeItem.clickAction != null)
            {
                runtimeItem.button.onClick.RemoveListener(runtimeItem.clickAction);
            }
        }
    }

    private void ApplyHiddenState()
    {
        for (int i = 0; i < runtimeItems.Count; i++)
        {
            RuntimeItem runtimeItem = runtimeItems[i];
            runtimeItem.revealed = false;

            if (runtimeItem.target != null)
            {
                runtimeItem.target.gameObject.SetActive(true);
            }

            if (runtimeItem.graphic != null)
            {
                runtimeItem.graphic.color = hiddenColor;
            }
        }
    }

    private Graphic ResolveGraphic(RectTransform itemTarget, Button button)
    {
        Image selfImage = itemTarget.GetComponent<Image>();
        if (selfImage != null)
        {
            return selfImage;
        }

        if (button != null && button.targetGraphic != null)
        {
            return button.targetGraphic;
        }

        Image childImage = itemTarget.GetComponentInChildren<Image>(true);
        if (childImage != null)
        {
            return childImage;
        }

        return itemTarget.GetComponentInChildren<Graphic>(true);
    }

    private void HandleItemClicked(int itemIndex)
    {
        if (!sequenceActive)
        {
            return;
        }

        if (itemIndex != currentItemIndex)
        {
            return;
        }

        RuntimeItem currentItem = runtimeItems[itemIndex];
        if (currentItem.revealed)
        {
            return;
        }

        currentItem.revealed = true;
        if (currentItem.graphic != null)
        {
            currentItem.graphic.color = revealedColor;
        }

        PlayClip(itemClickSound);
        StopMoveHandCoroutine();

        currentItemIndex++;
        if (currentItemIndex >= runtimeItems.Count)
        {
            finishCoroutine = StartCoroutine(FinishSequence());
            return;
        }

        moveHandCoroutine = StartCoroutine(MoveToNextItem());
    }

    private IEnumerator MoveToNextItem()
    {
        if (delayBeforeNextItem > 0f)
        {
            yield return new WaitForSecondsRealtime(delayBeforeNextItem);
        }

        yield return MoveHandToCurrentItem();
        moveHandCoroutine = null;
    }

    private IEnumerator MoveHandToCurrentItem()
    {
        if (hand == null)
        {
            yield break;
        }

        if (currentItemIndex < 0 || currentItemIndex >= runtimeItems.Count)
        {
            yield break;
        }

        Vector3 startPosition = hand.position;
        Vector3 endPosition = runtimeItems[currentItemIndex].target.position;

        if (handMoveDuration <= 0f)
        {
            hand.position = endPosition;
            yield break;
        }

        float elapsed = 0f;
        while (elapsed < handMoveDuration)
        {
            elapsed += Time.unscaledDeltaTime;
            float progress = Mathf.Clamp01(elapsed / handMoveDuration);
            hand.position = Vector3.Lerp(startPosition, endPosition, progress);
            yield return null;
        }

        hand.position = endPosition;
    }

    private IEnumerator FinishSequence()
    {
        sequenceActive = false;

        if (hand != null)
        {
            hand.gameObject.SetActive(false);
        }

        if (craftedPanel != null)
        {
            craftedPanel.SetActive(true);
        }

        PlayClip(craftSound);

        if (hideUiDelay > 0f)
        {
            yield return new WaitForSecondsRealtime(hideUiDelay);
        }

        HideTutorialUi();
        finishCoroutine = null;
    }

    private void StopActiveCoroutines()
    {
        StopMoveHandCoroutine();

        if (finishCoroutine != null)
        {
            StopCoroutine(finishCoroutine);
            finishCoroutine = null;
        }
    }

    private void StopMoveHandCoroutine()
    {
        if (moveHandCoroutine != null)
        {
            StopCoroutine(moveHandCoroutine);
            moveHandCoroutine = null;
        }
    }

    private void PlayClip(AudioClip clip)
    {
        if (clip == null)
        {
            return;
        }

        if (audioSourceOverride != null)
        {
            audioSourceOverride.PlayOneShot(clip, 1f);
            return;
        }

        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySound(clip);
        }
    }
}
