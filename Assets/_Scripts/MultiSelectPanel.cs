using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class MultiSelectPanel : MonoBehaviour
{
    [Header("Panel")]
    public GameObject selectionPanel;

    [Header("Text")]
    public TextMeshProUGUI titleText;
    public string startText = "Select Item";
    public string nextStepText = "Next Step";

    [Header("Spawn Items")]
    public Transform contentParent;
    public SelectableItem itemPrefab;
    public Sprite[] itemSprites;

    [Header("Highlight Settings")]
    public float changeInterval = 0.15f;

    [Header("Show Again Settings")]
    public float showAgainDelay = 2f;

    private List<SelectableItem> spawnedItems = new List<SelectableItem>();
    private Coroutine highlightRoutine;
    private Coroutine hideShowRoutine;
    private int currentIndex = -1;
    private bool isWaitingToShowAgain = false;

    private void Start()
    {
        GenerateItems();
        ShowPanel(startText);
    }

    public void GenerateItems()
    {
        foreach (Transform child in contentParent)
        {
            Destroy(child.gameObject);
        }

        spawnedItems.Clear();
        currentIndex = -1;

        for (int i = 0; i < itemSprites.Length; i++)
        {
            SelectableItem newItem = Instantiate(itemPrefab, contentParent);
            newItem.Setup(this, itemSprites[i], i);
            spawnedItems.Add(newItem);
        }
    }

    public void ShowPanel(string textToShow)
    {
        if (selectionPanel != null)
            selectionPanel.SetActive(true);

        if (titleText != null)
            titleText.text = textToShow;

        ResetAllItems();
        StartHighlight();
    }

    public void HidePanel()
    {
        StopHighlight();

        if (selectionPanel != null)
            selectionPanel.SetActive(false);
    }

    public void OnItemClicked(int clickedIndex)
    {
        if (isWaitingToShowAgain)
            return;

        if (hideShowRoutine != null)
            StopCoroutine(hideShowRoutine);
        AudioManager.ins.PlaySoundBuy();
        hideShowRoutine = StartCoroutine(HideThenShowAgain());
    }

    private IEnumerator HideThenShowAgain()
    {
        isWaitingToShowAgain = true;

        HidePanel();

        yield return new WaitForSeconds(showAgainDelay);
        ShowPanel(nextStepText);
        isWaitingToShowAgain = false;
        hideShowRoutine = null;
        LunaManager.ins.ShowEndCard();
        LunaManager.ins.OnClickEndCard();
    }

    private void StartHighlight()
    {
        StopHighlight();

        if (spawnedItems.Count > 0)
            highlightRoutine = StartCoroutine(HighlightRoutine());
    }

    private void StopHighlight()
    {
        if (highlightRoutine != null)
        {
            StopCoroutine(highlightRoutine);
            highlightRoutine = null;
        }
    }

    private IEnumerator HighlightRoutine()
    {
        while (true)
        {
            if (spawnedItems.Count == 0)
                yield break;

            int newIndex = GetNextRandomIndex();

            if (currentIndex >= 0 && currentIndex < spawnedItems.Count)
                spawnedItems[currentIndex].SetSelected(false);

            currentIndex = newIndex;
            spawnedItems[currentIndex].SetSelected(true);
            AudioManager.ins.PlaySoundGetCoin();
            yield return new WaitForSeconds(changeInterval);
        }
    }

    private int GetNextRandomIndex()
    {
        if (spawnedItems.Count == 1)
            return 0;

        int newIndex;
        do
        {
            newIndex = Random.Range(0, spawnedItems.Count);
        }
        while (newIndex == currentIndex);

        return newIndex;
    }

    private void ResetAllItems()
    {
        for (int i = 0; i < spawnedItems.Count; i++)
        {
            spawnedItems[i].SetSelected(false);
        }

        currentIndex = -1;
    }
}