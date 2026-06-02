using UnityEngine;
using UnityEngine.UI;

// Start-of-game weapon picker.
// Flow: tap a weapon button -> that weapon appears on the player's hand and the button
// is highlighted (preview only). Tap Play -> the previewed weapon is locked in, the
// panel hides, and attacking unlocks.
//
// Wire one weapon button per weapon; the button index must match the matching entry in
// PlayerController.weapons.
public class WeaponSelectionController : MonoBehaviour
{
    [Tooltip("Player whose weapon gets previewed/equipped.")]
    public PlayerController player;

    [Tooltip("UI panel shown until the player presses Play. Hidden after Play.")]
    public GameObject selectionPanel;

    [Tooltip("One button per weapon. Index matches PlayerController.weapons.")]
    public Button[] weaponButtons;

    [Tooltip("Pressing this confirms the previewed weapon and starts the game.")]
    public Button playButton;

    [Header("Selected-button highlight")]
    [Tooltip("Optional highlight object per weapon button (frame, checkmark, glow). Index matches weaponButtons. The selected one is enabled, the rest disabled.")]
    public GameObject[] selectedIndicators;
    [Tooltip("Scale applied to the currently selected button. Set to 1 to disable scaling.")]
    public float selectedScale = 1.15f;
    [Tooltip("Scale applied to non-selected buttons.")]
    public float normalScale = 1f;

    [Tooltip("Play a UI sound when previewing a weapon.")]
    public bool playSelectSound = true;
    [Tooltip("If Play is pressed without choosing a weapon, auto-select the first one instead of doing nothing.")]
    public bool autoSelectFirstOnPlay = true;

    private int selectedIndex = -1;

    void Start()
    {
        if (selectionPanel != null)
        {
            selectionPanel.SetActive(true);
        }

        if (weaponButtons != null)
        {
            for (int i = 0; i < weaponButtons.Length; i++)
            {
                if (weaponButtons[i] == null)
                {
                    continue;
                }

                int index = i;
                weaponButtons[i].onClick.AddListener(() => PreviewWeapon(index));
            }
        }

        if (playButton != null)
        {
            playButton.onClick.AddListener(OnPlay);
        }

        UpdateHighlight();
    }

    // Hook this from a weapon Button's OnClick (pass the weapon index) if you prefer not
    // to use the weaponButtons array.
    public void PreviewWeapon(int index)
    {
        if (player != null)
        {
            player.SelectWeapon(index);
        }

        selectedIndex = index;
        UpdateHighlight();

        if (playSelectSound && AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundBuy();
        }
    }

    // Hook this from the Play Button's OnClick.
    public void OnPlay()
    {
        if (selectedIndex < 0 && autoSelectFirstOnPlay)
        {
            PreviewWeapon(0);
        }

        if (player != null && !player.ConfirmWeapon())
        {
            // No weapon previewed and auto-select is off — keep the panel open.
            return;
        }

        if (selectionPanel != null)
        {
            selectionPanel.SetActive(false);
        }
    }

    void UpdateHighlight()
    {
        if (weaponButtons != null)
        {
            for (int i = 0; i < weaponButtons.Length; i++)
            {
                if (weaponButtons[i] == null)
                {
                    continue;
                }

                float scale = i == selectedIndex ? selectedScale : normalScale;
                weaponButtons[i].transform.localScale = Vector3.one * scale;
            }
        }

        if (selectedIndicators != null)
        {
            for (int i = 0; i < selectedIndicators.Length; i++)
            {
                if (selectedIndicators[i] != null)
                {
                    selectedIndicators[i].SetActive(i == selectedIndex);
                }
            }
        }
    }
}
