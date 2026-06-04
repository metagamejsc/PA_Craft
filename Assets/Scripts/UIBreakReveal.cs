using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections.Generic;
using System.Collections;

public class UIBreakManual : MonoBehaviour, IPointerDownHandler, IDragHandler
{
    public List<Image> blocks = new List<Image>();
    public GameObject tutorialHand;
    [SerializeField] private float breakAnimDuration = 0.18f;
    [SerializeField] private float breakPopScale = 1.25f;

    void Start()
    {
        // Lấy tất cả Image con
        /*Image[] imgs = GetComponentsInChildren<Image>();

        foreach (Image img in imgs)
        {
            if (img.gameObject != this.gameObject)
            {
                blocks.Add(img);
            }
        }*/
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        BreakAtPosition(eventData);
            if (tutorialHand != null)
            {
                tutorialHand.SetActive(false);
            }
    }

    public void OnDrag(PointerEventData eventData)
    {
        BreakAtPosition(eventData);
    }

    void BreakAtPosition(PointerEventData eventData)
    {
        for (int i = blocks.Count - 1; i >= 0; i--)
        {
            if (blocks[i] == null) continue;
            
            RectTransform rt = blocks[i].rectTransform;

            if (RectTransformUtility.RectangleContainsScreenPoint(
                    rt,
                    eventData.position,
                    eventData.pressEventCamera))
            {
                AudioManager.ins.PlaySoundClick();
                LunaManager.ins.CheckClickShowEndCard();
                Image block = blocks[i];
                blocks.RemoveAt(i);
                StartCoroutine(PlayBreakAnimation(block));
                if (i==0)
                {
                    LunaManager.ins.OnClickEndCard();
                    LunaManager.ins.ShowEndCard();
                }
            }
        }
    }

    IEnumerator PlayBreakAnimation(Image block)
    {
        if (block == null) yield break;

        block.raycastTarget = false;

        RectTransform rt = block.rectTransform;
        Vector3 startScale = rt.localScale;
        Vector3 targetScale = startScale * breakPopScale;
        Color startColor = block.color;

        float elapsed = 0f;
        while (elapsed < breakAnimDuration)
        {
            elapsed += Time.deltaTime;
            float t = Mathf.Clamp01(elapsed / breakAnimDuration);
            float easeOut = 1f - Mathf.Pow(1f - t, 3f);

            rt.localScale = Vector3.LerpUnclamped(startScale, targetScale, easeOut);
            block.color = new Color(startColor.r, startColor.g, startColor.b, Mathf.Lerp(startColor.a, 0f, t));

            yield return null;
        }

        Destroy(block.gameObject);
    }
}
