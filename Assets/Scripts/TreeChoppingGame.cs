using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class TreeChoppingGame : MonoBehaviour
{
    public ForestEscapeGame gameManager;
    public Button[] treeButtons;
    public TextMeshProUGUI instructionText;

    void Start()
    {
        SetupTreeButtons();
    }

    void SetupTreeButtons()
    {
        for (int i = 0; i < treeButtons.Length; i++)
        {
            int treeIndex = i; // Capture for closure
            treeButtons[i].onClick.AddListener(() => ChopTree(treeIndex));
        }
    }

    void ChopTree(int treeIndex)
    {
        // Disable button after clicking
        treeButtons[treeIndex].interactable = false;
        
        // Visual feedback (optional)
        treeButtons[treeIndex].GetComponent<Image>().color = Color.gray;
        
        // Notify game manager
        gameManager.OnTreeChopped();
        
        // Update instruction
        instructionText.text = "Cây đã chặt! Còn lại: " + 
            (3 - GetChoppedTreesCount()) + " cây";
    }

    int GetChoppedTreesCount()
    {
        int count = 0;
        foreach (var button in treeButtons)
        {
            if (!button.interactable)
                count++;
        }
        return count;
    }
}