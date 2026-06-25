using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class EnemySpawnOptionButton : MonoBehaviour
{
    private static readonly List<EnemySpawnOptionButton> Buttons = new List<EnemySpawnOptionButton>();

    public PlayerController playerController;
    public int choiceIndex;
    public Image eggImage;
    public Image enemyImage;
    public Graphic selectionGraphic;
    public Color selectedColor = Color.green;
    public Color normalColor = Color.white;
    public float selectedScale = 1.1f;

    private Button button;

    void Awake()
    {
        button = GetComponent<Button>();
        if (selectionGraphic == null)
        {
            selectionGraphic = button.targetGraphic;
        }

        button.onClick.AddListener(SelectEnemy);
        RefreshImages();
        RefreshSelectionVisual();
    }

    void OnEnable()
    {
        if (!Buttons.Contains(this))
        {
            Buttons.Add(this);
        }

        RefreshSelectionVisual();
    }

    void OnDisable()
    {
        Buttons.Remove(this);
    }

    void OnValidate()
    {
        RefreshImages();
        RefreshSelectionVisual();
    }

    public void SelectEnemy()
    {
        if (playerController == null)
        {
            return;
        }

        playerController.SelectEnemyToSpawn(choiceIndex);
        RefreshAllButtonsForPlayer(playerController);
    }

    public void RefreshImages()
    {
        if (playerController == null || playerController.enemySpawnChoices == null)
        {
            return;
        }

        if (choiceIndex < 0 || choiceIndex >= playerController.enemySpawnChoices.Length)
        {
            return;
        }

        PlayerController.EnemySpawnChoice choice = playerController.enemySpawnChoices[choiceIndex];
        if (choice == null)
        {
            return;
        }

        if (eggImage != null)
        {
            eggImage.sprite = choice.eggIcon;
            eggImage.enabled = choice.eggIcon != null;
        }

        if (enemyImage != null)
        {
            enemyImage.sprite = choice.enemyIcon;
            enemyImage.enabled = choice.enemyIcon != null;
        }
    }

    public void RefreshSelectionVisual()
    {
        bool isSelected = playerController != null && playerController.SelectedEnemySpawnIndex == choiceIndex;
        transform.localScale = Vector3.one * (isSelected ? selectedScale : 1f);

        if (selectionGraphic != null)
        {
            selectionGraphic.color = isSelected ? selectedColor : normalColor;
        }
    }

    private static void RefreshAllButtonsForPlayer(PlayerController targetPlayer)
    {
        for (int i = 0; i < Buttons.Count; i++)
        {
            if (Buttons[i] != null && Buttons[i].playerController == targetPlayer)
            {
                Buttons[i].RefreshSelectionVisual();
            }
        }
    }
}
