using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class ButtonObjectRevealGroup : MonoBehaviour
{
    [System.Serializable]
    public class RevealItem
    {
        public Button button;
        public GameObject targetObject;
    }

    public RevealItem[] revealItems = new RevealItem[3];
    public GameObject completeObject;
    public HandPointerController handPointerController;
    public AudioClip clickSound;
    public bool hideObjectsOnStart = true;
    [Range(0f, 1f)] public float clickedButtonAlpha = 0.5f;

    private bool[] clickedItems;
    private UnityAction[] buttonActions;
    private Vector3[] initialButtonScales;

    private void Start()
    {
        if (revealItems == null)
            revealItems = new RevealItem[0];

        clickedItems = new bool[revealItems.Length];
        buttonActions = new UnityAction[revealItems.Length];
        initialButtonScales = new Vector3[revealItems.Length];

        if (hideObjectsOnStart)
        {
            foreach (RevealItem item in revealItems)
            {
                if (item != null && item.targetObject != null)
                    item.targetObject.SetActive(false);
            }

            if (completeObject != null)
                completeObject.SetActive(false);
        }

        for (int i = 0; i < revealItems.Length; i++)
        {
            int itemIndex = i;
            RevealItem item = revealItems[itemIndex];
            if (item == null || item.button == null)
                continue;

            initialButtonScales[itemIndex] = item.button.transform.localScale;
            buttonActions[itemIndex] = () => RevealItemByIndex(itemIndex);
            item.button.onClick.AddListener(buttonActions[itemIndex]);
        }
    }

    private void OnDestroy()
    {
        if (revealItems == null)
            return;

        for (int i = 0; i < revealItems.Length; i++)
        {
            RevealItem item = revealItems[i];
            if (item != null && item.button != null && buttonActions != null && i < buttonActions.Length && buttonActions[i] != null)
                item.button.onClick.RemoveListener(buttonActions[i]);
        }
    }

    private void RevealItemByIndex(int itemIndex)
    {
        if (itemIndex < 0 || itemIndex >= revealItems.Length)
            return;

        PlayClickSound();

        RevealItem item = revealItems[itemIndex];
        if (item != null && item.button != null)
        {
            CanvasGroup buttonGroup = item.button.GetComponent<CanvasGroup>();
            if (buttonGroup != null)
                buttonGroup.alpha = clickedButtonAlpha;

            if (initialButtonScales != null && itemIndex < initialButtonScales.Length)
                item.button.transform.localScale = initialButtonScales[itemIndex];
        }

        if (handPointerController != null)
            handPointerController.HideHandPointer();

        if (item != null && item.targetObject != null)
            item.targetObject.SetActive(true);

        clickedItems[itemIndex] = true;

        if (AllItemsClicked() && completeObject != null)
            completeObject.SetActive(true);
    }

    private bool AllItemsClicked()
    {
        if (clickedItems == null || clickedItems.Length == 0)
            return false;

        for (int i = 0; i < clickedItems.Length; i++)
        {
            if (!clickedItems[i])
                return false;
        }

        return true;
    }

    private void PlayClickSound()
    {
        if (clickSound != null && AudioManager.ins != null)
            AudioManager.ins.PlaySound(clickSound);
    }
}
