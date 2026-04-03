using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ItemButtonManager : MonoBehaviour
{
    [System.Serializable]
    public class ItemButton
    {
        public Button button;
        public GameObject itemObject;
        public GameObject objectToHideAfterShow;
    }

    [Header("Tutorial")]
    public GameObject handPointer;

    [Header("Items")]
    public List<ItemButton> itemButtons;

    [Header("Player Build")]
    public Transform player;
    public Animator playerAnimator;
    public string buildAnim = "Build";

    private int currentSelectedIndex = -1;
    private readonly HashSet<int> builtIndexes = new HashSet<int>();

    void Start()
    {
        if (playerAnimator == null && player != null)
        {
            playerAnimator = player.GetComponent<Animator>();
        }

        for (int i = 0; i < itemButtons.Count; i++)
        {
            int index = i;
            itemButtons[i].button.onClick.AddListener(() => OnItemButtonClick(index));
            itemButtons[i].itemObject.SetActive(false);
            SetOptionalObjectVisible(itemButtons[i].objectToHideAfterShow, true);
        }
    }

    void OnItemButtonClick(int index)
    {
        if (handPointer != null)
        {
            handPointer.SetActive(false);
        }

        currentSelectedIndex = index;
        SetButtonChildImageVisible(itemButtons[index].button, false);
        itemButtons[index].itemObject.SetActive(true);

        if (builtIndexes.Add(index))
        {
            SetOptionalObjectVisible(itemButtons[index].objectToHideAfterShow, false);
            PlayBuildFeedback();
            NotifyBuildCompleted();
        }
    }

    public void ShowItemWithoutSecondClick(int index)
    {
        if (currentSelectedIndex != index && currentSelectedIndex >= 0)
        {
            ItemButton previousItem = itemButtons[currentSelectedIndex];
            if (!builtIndexes.Contains(currentSelectedIndex))
            {
                previousItem.itemObject.SetActive(false);
                SetOptionalObjectVisible(previousItem.objectToHideAfterShow, true);
            }
        }

        currentSelectedIndex = index;
        ItemButton currentItem = itemButtons[index];
        currentItem.itemObject.SetActive(true);

        if (!builtIndexes.Contains(index))
        {
            SetOptionalObjectVisible(currentItem.objectToHideAfterShow, false);
        }
    }

    void NotifyBuildCompleted()
    {
        if (LunaManager.ins != null)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }
    }

    void PlayBuildFeedback()
    {
        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundBuild();
        }

        if (playerAnimator != null && !string.IsNullOrEmpty(buildAnim))
        {
            playerAnimator.Play(buildAnim);
        }
    }

    void SetButtonChildImageVisible(Button button, bool visible)
    {
        if (button == null || button.transform.childCount == 0)
        {
            return;
        }

        Image childImage = button.transform.GetChild(0).GetComponent<Image>();
        if (childImage != null)
        {
            childImage.gameObject.SetActive(visible);
        }
    }

    void SetOptionalObjectVisible(GameObject target, bool visible)
    {
        if (target != null)
        {
            target.SetActive(visible);
        }
    }
}
