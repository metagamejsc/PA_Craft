using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[DisallowMultipleComponent]
public class AutoFightInventoryRandomizer : MonoBehaviour
{
    [SerializeField] private AutoFightArenaManager arenaManager;
    [SerializeField] private AutoFightCharacter player;
    [SerializeField] private List<AutoFightInventoryItem> inventoryItems = new List<AutoFightInventoryItem>();
    [SerializeField] private bool autoRollOnStart = true;
    [SerializeField] private float idleBeforeRoll = 0.5f;
    [SerializeField] private int minPreviewSteps = 10;
    [SerializeField] private int maxPreviewSteps = 18;
    [SerializeField] private float minPreviewDelay = 0.05f;
    [SerializeField] private float maxPreviewDelay = 0.18f;
    [SerializeField] private float delayBeforeBattle = 0.4f;

    private Coroutine rollRoutine;
    private int selectedIndex = -1;
    private bool waitForManualStart;

    private void Awake()
    {
        if (arenaManager != null)
        {
            arenaManager.SetStartLocked(true);
        }
    }

    private void Start()
    {
        if (arenaManager == null || inventoryItems.Count == 0)
        {
            Debug.LogWarning("AutoFightInventoryRandomizer is missing references.");
            return;
        }

        arenaManager.SetStartLocked(true);
        arenaManager.CancelAutoStart();
        arenaManager.ResetBattle();
        SetAllHighlighted(-1);

        if (autoRollOnStart && !waitForManualStart)
        {
            rollRoutine = StartCoroutine(RollRoutine());
        }
    }

    public void HoldUntilManualStart()
    {
        waitForManualStart = true;

        if (rollRoutine != null)
        {
            StopCoroutine(rollRoutine);
            rollRoutine = null;
        }

        if (arenaManager != null)
        {
            arenaManager.SetStartLocked(true);
            arenaManager.CancelAutoStart();
        }
    }

    public void StartRandomRoll()
    {
        if (arenaManager == null || inventoryItems.Count == 0)
        {
            Debug.LogWarning("AutoFightInventoryRandomizer is missing references.");
            return;
        }

        waitForManualStart = false;

        if (rollRoutine != null)
        {
            StopCoroutine(rollRoutine);
        }

        arenaManager.SetStartLocked(true);
        arenaManager.CancelAutoStart();
        arenaManager.ResetBattle();
        rollRoutine = StartCoroutine(RollRoutine());
    }

    private IEnumerator RollRoutine()
    {
        SetInteractable(false);
        yield return new WaitForSeconds(idleBeforeRoll);

        var previewSteps = Random.Range(minPreviewSteps, maxPreviewSteps + 1);
        var previousIndex = -1;

        for (var step = 0; step < previewSteps; step++)
        {
            var previewIndex = GetRandomIndex(previousIndex);
            previousIndex = previewIndex;
            SetAllHighlighted(previewIndex);

            var lerpValue = previewSteps <= 1 ? 1f : step / (float)(previewSteps - 1);
            var previewDelay = Mathf.Lerp(minPreviewDelay, maxPreviewDelay, lerpValue);
            yield return new WaitForSeconds(previewDelay);
        }

        selectedIndex = GetRandomIndex(previousIndex);
        EquipSelectedItem(selectedIndex);
        SetAllHighlighted(selectedIndex);

        yield return new WaitForSeconds(delayBeforeBattle);
        arenaManager.SetStartLocked(false);
        arenaManager.BeginBattle();
        rollRoutine = null;
    }

    private void EquipSelectedItem(int itemIndex)
    {
        var targetPlayer = GetControlledPlayer();
        if (targetPlayer == null)
        {
            Debug.LogWarning("AutoFightInventoryRandomizer could not find a player character to equip.");
            return;
        }

        if (itemIndex < 0 || itemIndex >= inventoryItems.Count)
        {
            return;
        }

        var selectedItem = inventoryItems[itemIndex];
        targetPlayer.SetWeaponDamageBonus(selectedItem.DamageBonus);
        targetPlayer.EquipWeapon(
            selectedItem.WeaponPrefab,
            selectedItem.EquipLocalPosition,
            selectedItem.EquipLocalEulerAngles,
            selectedItem.EquipLocalScale);
    }

    private AutoFightCharacter GetControlledPlayer()
    {
        if (arenaManager != null && arenaManager.Player != null)
        {
            return arenaManager.Player;
        }

        return player;
    }

    private int GetRandomIndex(int previousIndex)
    {
        if (inventoryItems.Count <= 1)
        {
            return 0;
        }

        var randomIndex = Random.Range(0, inventoryItems.Count);
        while (randomIndex == previousIndex)
        {
            randomIndex = Random.Range(0, inventoryItems.Count);
        }

        return randomIndex;
    }

    private void SetAllHighlighted(int highlightedIndex)
    {
        for (var i = 0; i < inventoryItems.Count; i++)
        {
            if (inventoryItems[i] == null)
            {
                continue;
            }

            inventoryItems[i].SetHighlighted(i == highlightedIndex);
        }
    }

    private void SetInteractable(bool isInteractable)
    {
        foreach (var item in inventoryItems)
        {
            if (item == null)
            {
                continue;
            }

            item.SetInteractable(isInteractable);
        }
    }
}
