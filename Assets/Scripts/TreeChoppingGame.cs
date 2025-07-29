using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class TreeChoppingGame : MonoBehaviour
{
    public ForestEscapeGame gameManager;
    public Button[] treeButtons;
    public Image[] treeImageButtons;
    public TextMeshProUGUI instructionText;
    public AnimationCurve chopEase;

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
        Sequence sequence = DOTween.Sequence();
        sequence.Append(treeImageButtons[treeIndex].DOFillAmount(0.66f, 0.33f).SetEase(chopEase).OnComplete(() =>
        {
            AudioManager.ins.PlaySoundChop();
        }));
        sequence.Append(treeImageButtons[treeIndex].DOFillAmount(0.33f, 0.33f).SetEase(chopEase).OnComplete(() =>
        {
            AudioManager.ins.PlaySoundChop();
        }));
        sequence.Append(treeImageButtons[treeIndex].DOFillAmount(0f, 0.33f).SetEase(chopEase).OnComplete(() =>
        {
            AudioManager.ins.PlaySoundChop();
        }));
        sequence.Play();
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