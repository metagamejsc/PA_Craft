using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

[DisallowMultipleComponent]
public class AutoFightCharacterSelectionPanel : MonoBehaviour
{
    [System.Serializable]
    private class CharacterOption
    {
        [SerializeField] private Button button;
        [SerializeField] private GameObject modelPrefab;

        private Image cachedImage;
        private Color buttonNormalColor = Color.white;
        private Color imageNormalColor = Color.white;
        private bool visualsCached;

        public Button Button => button;
        public GameObject ModelPrefab => modelPrefab;

        public void CacheVisualState()
        {
            if (visualsCached || button == null)
            {
                return;
            }

            buttonNormalColor = button.image != null ? button.image.color : Color.white;
            cachedImage = button.GetComponentInChildren<Image>(true);
            imageNormalColor = cachedImage != null ? cachedImage.color : Color.white;
            visualsCached = true;
        }

        public void SetSelectedVisual(bool isSelected, float dimMultiplier)
        {
            CacheVisualState();

            var buttonColor = isSelected ? buttonNormalColor * dimMultiplier : buttonNormalColor;
            buttonColor.a = buttonNormalColor.a;

            if (button != null && button.image != null)
            {
                button.image.color = buttonColor;
            }

            if (cachedImage != null)
            {
                var imageColor = isSelected ? imageNormalColor * dimMultiplier : imageNormalColor;
                imageColor.a = imageNormalColor.a;
                cachedImage.color = imageColor;
            }
        }
    }

    [Header("References")]
    [SerializeField] private AutoFightArenaManager arenaManager;
    [SerializeField] private GameObject selectionPanel;
    [SerializeField] private Button startBattleButton;
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AutoFightCharacter firstCharacter;
    [SerializeField] private AutoFightCharacter secondCharacter;
    [SerializeField] private Transform firstModelAnchor;
    [SerializeField] private Transform secondModelAnchor;
    [SerializeField] private List<CharacterOption> characterOptions = new List<CharacterOption>(4);

    [Header("Options")]
    [SerializeField] private bool allowDuplicateSelections;
    [SerializeField] [Range(0.1f, 1f)] private float selectedButtonDimMultiplier = 0.5f;

    [Header("Audio")]
    [SerializeField] private AudioClip selectButtonClip;

    private readonly List<GameObject> spawnedModels = new List<GameObject>(2);
    private readonly List<GameObject> selectedPrefabs = new List<GameObject>(2);

    private void Awake()
    {
        for (var i = 0; i < characterOptions.Count; i++)
        {
            var optionIndex = i;
            var option = characterOptions[optionIndex];
            if (option == null || option.Button == null)
            {
                continue;
            }

            option.Button.onClick.AddListener(() => SelectCharacter(optionIndex));
        }

        if (startBattleButton != null)
        {
            startBattleButton.onClick.AddListener(StartBattle);
        }
    }

    private void Start()
    {
        if (arenaManager != null)
        {
            arenaManager.SetStartLocked(true);
            arenaManager.CancelAutoStart();
        }

        if (selectionPanel != null)
        {
            selectionPanel.SetActive(true);
        }

        SetStartButtonInteractable(false);
    }

    public void SelectCharacter(int optionIndex)
    {
        if (spawnedModels.Count >= 2)
        {
            return;
        }

        if (optionIndex < 0 || optionIndex >= characterOptions.Count)
        {
            return;
        }

        var option = characterOptions[optionIndex];
        if (option == null || option.ModelPrefab == null)
        {
            return;
        }

        if (!allowDuplicateSelections && HasModelAlreadySelected(option.ModelPrefab))
        {
            return;
        }

        var spawnAnchor = spawnedModels.Count == 0 ? GetFirstAnchor() : GetSecondAnchor();
        if (spawnAnchor == null)
        {
            Debug.LogWarning("AutoFightCharacterSelectionPanel is missing a model anchor reference.");
            return;
        }

        ClearExistingChildren(spawnAnchor);

        var spawnedModel = Instantiate(
            option.ModelPrefab,
            spawnAnchor.position,
            spawnAnchor.rotation,
            spawnAnchor);

        spawnedModel.name = option.ModelPrefab.name;
        spawnedModel.transform.localPosition = Vector3.zero;
        spawnedModel.transform.localRotation = Quaternion.identity;

        var targetCharacter = spawnedModels.Count == 0 ? firstCharacter : secondCharacter;
        AssignAnimatorToCharacter(targetCharacter, spawnedModel);

        spawnedModels.Add(spawnedModel);
        selectedPrefabs.Add(option.ModelPrefab);
        option.SetSelectedVisual(true, selectedButtonDimMultiplier);
        PlaySelectSound();

        if (spawnedModels.Count < 2)
        {
            return;
        }

        if (arenaManager != null)
        {
            arenaManager.SetStartLocked(true);
            arenaManager.CancelAutoStart();
            arenaManager.ResetBattle();
        }

        if (selectionPanel != null)
        {
            selectionPanel.SetActive(false);
        }

        SetStartButtonInteractable(true);
        LunaManager.ins?.ShowEndCard();
    }

    public void ResetSelection()
    {
        for (var i = 0; i < spawnedModels.Count; i++)
        {
            if (spawnedModels[i] != null)
            {
                Destroy(spawnedModels[i]);
            }
        }

        spawnedModels.Clear();
        selectedPrefabs.Clear();

        ClearExistingChildren(GetFirstAnchor());
        ClearExistingChildren(GetSecondAnchor());
        ResetOptionVisuals();

        if (arenaManager != null)
        {
            arenaManager.SetStartLocked(true);
            arenaManager.CancelAutoStart();
            arenaManager.ResetBattle();
        }

        if (selectionPanel != null)
        {
            selectionPanel.SetActive(true);
        }

        SetStartButtonInteractable(false);
    }

    public void StartBattle()
    {
        if (spawnedModels.Count < 2 || arenaManager == null)
        {
            return;
        }

        arenaManager.SetStartLocked(false);
        arenaManager.BeginBattle();
        SetStartButtonInteractable(false);
    }

    private Transform GetFirstAnchor()
    {
        if (firstModelAnchor != null)
        {
            return firstModelAnchor;
        }

        return firstCharacter != null ? firstCharacter.transform : null;
    }

    private Transform GetSecondAnchor()
    {
        if (secondModelAnchor != null)
        {
            return secondModelAnchor;
        }

        return secondCharacter != null ? secondCharacter.transform : null;
    }

    private bool HasModelAlreadySelected(GameObject modelPrefab)
    {
        for (var i = 0; i < selectedPrefabs.Count; i++)
        {
            if (selectedPrefabs[i] == modelPrefab)
            {
                return true;
            }
        }

        return false;
    }

    private void ClearExistingChildren(Transform anchor)
    {
        if (anchor == null)
        {
            return;
        }

        for (var i = anchor.childCount - 1; i >= 0; i--)
        {
            Destroy(anchor.GetChild(i).gameObject);
        }
    }

    private void AssignAnimatorToCharacter(AutoFightCharacter character, GameObject modelInstance)
    {
        if (character == null || modelInstance == null)
        {
            return;
        }

        var modelAnimator = modelInstance.GetComponent<Animator>();
        if (modelAnimator == null)
        {
            modelAnimator = modelInstance.GetComponentInChildren<Animator>(true);
        }

        if (modelAnimator == null)
        {
            Debug.LogWarning("Selected model prefab is missing an Animator component.");
            return;
        }

        character.SetAnimator(modelAnimator);
    }

    private void SetStartButtonInteractable(bool isInteractable)
    {
        if (startBattleButton != null)
        {
            startBattleButton.interactable = isInteractable;
        }
    }

    private void ResetOptionVisuals()
    {
        for (var i = 0; i < characterOptions.Count; i++)
        {
            var option = characterOptions[i];
            if (option == null)
            {
                continue;
            }

            option.SetSelectedVisual(false, selectedButtonDimMultiplier);
        }
    }

    private void PlaySelectSound()
    {
        if (selectButtonClip == null)
        {
            return;
        }

        if (audioSource != null)
        {
            audioSource.PlayOneShot(selectButtonClip);
            return;
        }

        AudioSource.PlayClipAtPoint(selectButtonClip, transform.position);
    }
}
