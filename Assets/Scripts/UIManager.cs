using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{
    [Header("Reward Popup")]
    public GameObject rewardPopup;
    public Image popupIcon;
    public float popupInDuration = 0.3f;
    public float popupHoldDuration = 0.5f;
    public float popupOutDuration = 0.3f;

    [Header("Flying Icon")]
    public RectTransform flyIcon; // prefab UI Image dùng để bay
    public Canvas canvas;
    public float flyDuration = 0.6f;

    [Header("Item Slots")]
    public ItemSlot[] itemSlots;

    [Header("Final Panel")]
    public GameObject finalPanel;
    public Image displayImage;
    public float displayTime = 1.5f;

    private Coroutine loopCoroutine;

    // Gọi khi đã mở 1 rương xong
    public IEnumerator ShowRewardPopupAndMoveToSlot(Item item, ItemSlot targetSlot)
    {
        // 1. Hiện popup
        rewardPopup.SetActive(true);
        popupIcon.sprite = item.icon;
        //popupIcon.SetNativeSize();
AudioManager.ins.PlaySoundReward();
        yield return StartCoroutine(PopIn(rewardPopup.transform, popupInDuration));
        yield return new WaitForSeconds(popupHoldDuration);

        // 2. Icon bay vào slot
        Image flying = Instantiate(flyIcon.gameObject, canvas.transform).GetComponent<Image>();
        flying.sprite = item.icon;
        flying.transform.position = popupIcon.transform.position;

        Vector3 targetPos = targetSlot.GetComponent<RectTransform>().position;
        Vector3 startPos = flying.transform.position;

        float time = 0f;
        while (time < flyDuration)
        {
            time += Time.deltaTime;
            float t = time / flyDuration;
            flying.transform.position = Vector3.Lerp(startPos, targetPos, t);
            yield return null;
        }

        Destroy(flying.gameObject);

        // 3. Gán item vào slot
        targetSlot.SetItem(item);

        yield return new WaitForSeconds(0.1f);
        yield return StartCoroutine(PopOut(rewardPopup.transform, popupOutDuration));
    }

    // Final panel hiển thị sau khi đủ 3 item
    public void ShowFinalResult(List<Item> obtainedItems)
    {
        LunaManager.ins.ShowEndCard();
        finalPanel.SetActive(true);
        finalPanel.transform.localScale = Vector3.zero;

        if (loopCoroutine != null)
            StopCoroutine(loopCoroutine);

        loopCoroutine = StartCoroutine(AnimateFinalPanel(obtainedItems));
    }

    private IEnumerator AnimateFinalPanel(List<Item> items)
    {
        yield return StartCoroutine(PopIn(finalPanel.transform, popupInDuration));

        while (true)
        {
            foreach (var item in items)
            {
                displayImage.sprite = item.icon;
                //displayImage.SetNativeSize();
                yield return new WaitForSeconds(displayTime);
            }
        }
    }

    // Popup in (scale từ 0 lên 1)
    public IEnumerator PopIn(Transform target, float duration)
    {
        target.localScale = Vector3.zero;
        float time = 0f;
        while (time < duration)
        {
            time += Time.deltaTime;
            float t = time / duration;
            float scale = Mathf.SmoothStep(0f, 1f, t);
            target.localScale = Vector3.one * scale;
            yield return null;
        }
        target.localScale = Vector3.one;
    }

    // Popup out (scale từ 1 về 0)
    public IEnumerator PopOut(Transform target, float duration)
    {
        float time = 0f;
        while (time < duration)
        {
            time += Time.deltaTime;
            float t = time / duration;
            float scale = Mathf.SmoothStep(1f, 0f, t);
            target.localScale = Vector3.one * scale;
            yield return null;
        }
        target.gameObject.SetActive(false);
    }
}
