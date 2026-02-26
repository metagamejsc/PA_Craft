using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections.Generic;

public class UIBreakManual : MonoBehaviour, IPointerDownHandler, IDragHandler
{
    public List<Image> blocks = new List<Image>();
    public GameObject tutorialHand;

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
                Destroy(blocks[i].gameObject);
                blocks.RemoveAt(i);
                if (i==0)
                {
                    LunaManager.ins.OnClickEndCard();
                    LunaManager.ins.ShowEndCard();
                }
            }
        }
    }
}