using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

public class SpinWheelGameplayController : MonoBehaviour
{
    [Serializable]
    public class WheelSlot
    {
        public Image iconImage;
        public Text nameText;
    }

    [Header("Wheel")]
    public RectTransform wheelRoot;
    public Button spinButton;
    public Sprite[] rewardSprites = new Sprite[12];
    public WheelSlot[] wheelSlots = new WheelSlot[12];
    public float minSpinDuration = 2f;
    public float maxSpinDuration = 5f;
    public int minExtraRounds = 5;
    public int maxExtraRounds = 8;

    [Header("Reward Popup")]
    public GameObject rewardPopup;
    public Image rewardPopupIcon;
    public Text rewardPopupText;

    [Header("Inventory")]
    public Image[] inventorySlots = new Image[3];

    [Header("Hand Pointer")]
    public RectTransform handPointer;

    [Header("End Card")]
    public int spinsBeforeEndCard = 3;

    [Header("Audio")]
    public AudioSource audioSource;
    public AudioClip spinClickSound;
    public AudioClip wheelTickSound;
    public AudioClip rewardPopupSound;
    public AudioClip itemMoveSound;
    public AudioClip endCardSound;

    private bool isSpinning;
    private int spinsCompleted;

    private void Awake()
    {
        ApplyRewardsToWheelSlots();

        if (spinButton != null)
        {
            spinButton.onClick.AddListener(Spin);
        }

        if (rewardPopup != null)
        {
            rewardPopup.SetActive(false);
        }

        ShowHandPointer();
    }

    private void OnDestroy()
    {
        if (spinButton != null)
        {
            spinButton.onClick.RemoveListener(Spin);
        }
    }

    private void OnValidate()
    {
        if (!Application.isPlaying)
        {
            ApplyRewardsToWheelSlots();
        }
    }

    [ContextMenu("Apply Rewards To Wheel Slots")]
    public void ApplyRewardsToWheelSlots()
    {
        if (rewardSprites == null || wheelSlots == null)
        {
            return;
        }

        int count = Mathf.Min(rewardSprites.Length, wheelSlots.Length);
        for (int i = 0; i < count; i++)
        {
            ApplyRewardToWheelSlot(wheelSlots[i], rewardSprites[i]);
        }
    }

    public void Spin()
    {
        if (isSpinning || wheelRoot == null || rewardSprites == null || rewardSprites.Length == 0)
        {
            return;
        }

        StartCoroutine(SpinRoutine(Random.Range(0, rewardSprites.Length)));
    }

    private IEnumerator SpinRoutine(int rewardIndex)
    {
        isSpinning = true;
        HideHandPointer();

        if (spinButton != null)
        {
            spinButton.interactable = false;
        }

        if (rewardPopup != null)
        {
            rewardPopup.SetActive(false);
        }

        PlaySound(spinClickSound);

        float itemAngle = 360f / rewardSprites.Length;
        float rewardCenterAngle = rewardIndex * itemAngle + itemAngle * 0.5f;
        float targetModulo = Mathf.Repeat(360f - rewardCenterAngle, 360f);
        float currentModulo = Mathf.Repeat(wheelRoot.localEulerAngles.z, 360f);
        float deltaToTarget = Mathf.Repeat(targetModulo - currentModulo, 360f);

        float startRotation = wheelRoot.localEulerAngles.z;
        float endRotation = startRotation + 360f * Random.Range(minExtraRounds, maxExtraRounds + 1) + deltaToTarget;
        float duration = Random.Range(minSpinDuration, maxSpinDuration);
        float elapsed = 0f;
        float tickTimer = 0f;

        while (elapsed < duration)
        {
            elapsed += Time.unscaledDeltaTime;
            tickTimer += Time.unscaledDeltaTime;

            float t = Mathf.Clamp01(elapsed / duration);
            float eased = 1f - Mathf.Pow(1f - t, 3f);
            wheelRoot.localEulerAngles = new Vector3(0f, 0f, Mathf.Lerp(startRotation, endRotation, eased));

            if (tickTimer >= 0.12f)
            {
                tickTimer = 0f;
                PlaySound(wheelTickSound);
            }

            yield return null;
        }

        wheelRoot.localEulerAngles = new Vector3(0f, 0f, endRotation);
        yield return ShowRewardRoutine(rewardIndex);
    }

    private IEnumerator ShowRewardRoutine(int rewardIndex)
    {
        // FinishSpinTurn must run no matter what happens inside the reward
        // sequence. On Luna/UnityPlayWork web builds a throw in a nested
        // coroutine (e.g. flying-icon creation) would otherwise kill the whole
        // chain and leave isSpinning stuck true forever.
        try
        {
            Sprite rewardSprite = rewardSprites[rewardIndex];

            if (rewardPopupIcon != null)
            {
                rewardPopupIcon.sprite = rewardSprite;
                rewardPopupIcon.enabled = rewardSprite != null;
            }

            if (rewardPopupText != null)
            {
                string rewardName = rewardSprite != null ? rewardSprite.name : "ITEM";
                //rewardPopupText.text = "YOU GOT " + rewardName.ToUpperInvariant();
            }

            if (rewardPopup != null)
            {
                rewardPopup.transform.localScale = Vector3.one * 0.2f;
                rewardPopup.SetActive(true);
            }

            PlaySound(rewardPopupSound);

            if (rewardPopup != null)
            {
                yield return ScaleTo(rewardPopup.transform, Vector3.one, 0.22f);
            }

            yield return WaitRealtime(0.55f);
            StartCoroutine(MoveRewardToInventory(rewardIndex));
            yield return WaitRealtime(0.3f);
            spinsCompleted++;

            if (spinsCompleted >= spinsBeforeEndCard)
            {
                yield return WaitRealtime(0.35f);
                PlaySound(endCardSound);

                if (LunaManager.ins != null)
                {
                    LunaManager.ins.ShowEndCard();
                }
            }
        }
        finally
        {
            FinishSpinTurn();
        }
    }

    private void FinishSpinTurn()
    {
        if (spinButton != null)
        {
            spinButton.interactable = true;
        }

        isSpinning = false;
        ShowHandPointer();
    }

    private IEnumerator MoveRewardToInventory(int rewardIndex)
    {
        if (inventorySlots == null || inventorySlots.Length == 0)
        {
            yield break;
        }

        int slotIndex = Mathf.Clamp(spinsCompleted, 0, inventorySlots.Length - 1);
        Image targetSlot = inventorySlots[slotIndex];
        if (targetSlot == null)
        {
            yield break;
        }

        Sprite rewardSprite = rewardSprites[rewardIndex];

        if (rewardPopup != null)
        {
            rewardPopup.SetActive(false);
        }

        PlaySound(itemMoveSound);

        if (rewardPopupIcon == null)
        {
            SetInventorySlot(targetSlot, rewardSprite);
            yield return ScaleTo(targetSlot.transform, Vector3.one, 0.18f);
            yield break;
        }

        Image flyingIcon = CreateFlyingRewardIcon(rewardSprite, rewardPopupIcon.rectTransform);
        if (flyingIcon == null)
        {
            SetInventorySlot(targetSlot, rewardSprite);
            yield return ScaleTo(targetSlot.transform, Vector3.one, 0.18f);
            yield break;
        }

        Vector3 start = rewardPopupIcon.transform.position;
        Vector3 end = targetSlot.transform.position;
        const float duration = 0.45f;
        float elapsed = 0f;

        while (elapsed < duration)
        {
            elapsed += Time.unscaledDeltaTime;
            float t = Mathf.Clamp01(elapsed / duration);
            float eased = 1f - Mathf.Pow(1f - t, 2f);
            flyingIcon.transform.position = Vector3.Lerp(start, end, eased);
            flyingIcon.transform.localScale = Vector3.Lerp(Vector3.one, Vector3.one * 0.65f, eased);
            yield return null;
        }

        SetInventorySlot(targetSlot, rewardSprite);
        Destroy(flyingIcon.gameObject);
        yield return ScaleTo(targetSlot.transform, Vector3.one, 0.18f);
    }

    private Image CreateFlyingRewardIcon(Sprite rewardSprite, RectTransform sourceRect)
    {
        Canvas canvas = sourceRect.GetComponentInParent<Canvas>();
        if (canvas == null)
        {
            Image firstSlot = inventorySlots != null && inventorySlots.Length > 0 ? inventorySlots[0] : null;
            canvas = firstSlot != null ? firstSlot.GetComponentInParent<Canvas>() : null;
        }

        if (canvas == null)
        {
            return null;
        }

        GameObject iconObject = new GameObject("Flying Reward Icon", typeof(RectTransform), typeof(CanvasRenderer), typeof(Image));
        RectTransform rect = iconObject.GetComponent<RectTransform>();
        rect.SetParent(canvas.transform, false);
        rect.position = sourceRect.position;
        rect.sizeDelta = sourceRect.rect.size;
        rect.localScale = Vector3.one;
        rect.SetAsLastSibling();

        Image image = iconObject.GetComponent<Image>();
        image.sprite = rewardSprite;
        image.enabled = rewardSprite != null;
        image.raycastTarget = false;
        image.preserveAspect = true;
        return image;
    }

    private void SetInventorySlot(Image targetSlot, Sprite rewardSprite)
    {
        targetSlot.sprite = rewardSprite;
        targetSlot.enabled = rewardSprite != null;
        targetSlot.transform.localScale = Vector3.one * 1.2f;
    }

    private IEnumerator ScaleTo(Transform target, Vector3 scale, float duration)
    {
        Vector3 startScale = target.localScale;
        float elapsed = 0f;

        while (elapsed < duration)
        {
            elapsed += Time.unscaledDeltaTime;
            float t = Mathf.Clamp01(elapsed / duration);
            target.localScale = Vector3.Lerp(startScale, scale, 1f - Mathf.Pow(1f - t, 2f));
            yield return null;
        }

        target.localScale = scale;
    }

    // Frame-accumulated unscaled wait. Avoids WaitForSecondsRealtime /
    // Time.realtimeSinceStartup, which can stall inside Luna/UnityPlayWork
    // web builds and freeze the spin sequence.
    private IEnumerator WaitRealtime(float seconds)
    {
        float elapsed = 0f;
        while (elapsed < seconds)
        {
            elapsed += Time.unscaledDeltaTime;
            yield return null;
        }
    }

    private void PlaySound(AudioClip clip)
    {
        if (clip != null && audioSource != null)
        {
            audioSource.PlayOneShot(clip);
        }
    }

    private void ShowHandPointer()
    {
        if (handPointer == null)
        {
            return;
        }

        handPointer.gameObject.SetActive(true);
    }

    private void HideHandPointer()
    {
        if (handPointer != null)
        {
            handPointer.gameObject.SetActive(false);
        }
    }

    private void ApplyRewardToWheelSlot(WheelSlot slot, Sprite rewardSprite)
    {
        if (slot == null)
        {
            return;
        }

        if (slot.iconImage != null)
        {
            slot.iconImage.sprite = rewardSprite;
            slot.iconImage.enabled = rewardSprite != null;
        }

        if (slot.nameText != null)
        {
            slot.nameText.text = rewardSprite != null ? rewardSprite.name : string.Empty;
        }
    }
}
