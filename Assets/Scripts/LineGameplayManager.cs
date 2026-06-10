using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Gameplay theo line:
/// - Bắt đầu: player đứng ở line1, tự sinh ra các line dựa theo số lượng model3D kéo vào.
/// - Mỗi line có 1 model3D button. Player bấm button -> spawn model3D tương ứng theo thứ tự list.
/// - Bấm xong, delay 1-2s, player di chuyển sang line kế tiếp rồi lặp lại.
/// </summary>
[DisallowMultipleComponent]
public class LineGameplayManager : MonoBehaviour
{
    [Header("References")]
    [Tooltip("Object player sẽ di chuyển qua từng line.")]
    [SerializeField] private Transform player;

    [Tooltip("Prefab model3D dùng làm button của mỗi line. Cần có Collider để nhận click.")]
    [SerializeField] private GameObject buttonPrefab;

    [Tooltip("Danh sách model3D. Số lượng item = số line được sinh ra. " +
             "Line thứ i sẽ spawn model3D thứ i khi bấm button.")]
    [SerializeField] private List<GameObject> modelPrefabs = new List<GameObject>();

    [Header("Character Animation")]
    [Tooltip("Animator cua nhan vat. Neu de trong se tu tim Animator trong player.")]
    [SerializeField] private Animator characterAnimator;

    [Tooltip("Trigger trong Animator cua nhan vat de play anim bam nut.")]
    [SerializeField] private string characterPressTriggerName = "Press";

    [Header("Layout")]
    [Tooltip("Vị trí line đầu tiên (line1). Nếu để trống sẽ dùng vị trí của object gắn script này.")]
    [SerializeField] private Transform firstLinePoint;

    [Tooltip("Khoảng cách/độ lệch giữa 2 line liên tiếp (line nằm cạnh nhau).")]
    [SerializeField] private Vector3 lineOffset = new Vector3(3f, 0f, 0f);

    [Header("Timing & Movement")]
    [Tooltip("Thời gian delay (giây) sau khi bấm xong trước khi player di chuyển sang line kế tiếp.")]
    [SerializeField] private float moveDelay = 1.5f;

    [Tooltip("Tốc độ di chuyển của player (đơn vị/giây).")]
    [SerializeField] private float playerMoveSpeed = 5f;

    [Tooltip("Quay mặt player theo hướng di chuyển khi sang line mới.")]
    [SerializeField] private bool faceMoveDirection = true;

    [Header("Choice UI")]
    [Tooltip("So Line3DButton can bam truoc khi hien UI lua chon.")]
    [SerializeField] private int lineClicksBeforeChoice = 3;

    [Tooltip("UI panel hien sau khi bam xong cac Line3DButton.")]
    [SerializeField] private GameObject choicePanel;

    [Tooltip("3 button lua chon tren UI. Button i se bat choiceResultObjects[i].")]
    [SerializeField] private List<Button> choiceButtons = new List<Button>();

    [Tooltip("GameObject duoc bat theo lua chon. Index phai khop voi choiceButtons.")]
    [SerializeField] private List<GameObject> choiceResultObjects = new List<GameObject>();

    private readonly List<Line3DButton> lineButtons = new List<Line3DButton>();
    private int currentLineIndex = -1;
    private int completedLineButtonCount;
    private bool hasChoiceBeenSelected;
    private bool isBusy;

    private Vector3 FirstLinePosition =>
        firstLinePoint != null ? firstLinePoint.position : transform.position;

    private void Start()
    {
        SetupChoiceUI();

        if (!ValidateSetup())
        {
            return;
        }

        BuildLines();
        StartLine(0);
    }

    private bool ValidateSetup()
    {
        if (player == null)
        {
            Debug.LogWarning("[LineGameplayManager] Chưa gán player.");
            return false;
        }

        if (buttonPrefab == null)
        {
            Debug.LogWarning("[LineGameplayManager] Chưa gán buttonPrefab.");
            return false;
        }

        if (modelPrefabs == null || modelPrefabs.Count == 0)
        {
            Debug.LogWarning("[LineGameplayManager] modelPrefabs đang trống nên không có line nào được tạo.");
            return false;
        }

        CacheCharacterAnimator();

        return true;
    }

    private void CacheCharacterAnimator()
    {
        if (characterAnimator == null && player != null)
        {
            characterAnimator = player.GetComponentInChildren<Animator>(true);
        }
    }

    /// <summary>Sinh ra các line + button dựa theo số lượng modelPrefabs.</summary>
    private void BuildLines()
    {
        for (int i = 0; i < modelPrefabs.Count; i++)
        {
            Vector3 linePosition = GetLinePosition(i);

            GameObject buttonObj = Instantiate(buttonPrefab, linePosition, buttonPrefab.transform.rotation, transform);
            buttonObj.name = $"LineButton_{i + 1}";

            Line3DButton lineButton = buttonObj.GetComponent<Line3DButton>();
            if (lineButton == null)
            {
                lineButton = buttonObj.AddComponent<Line3DButton>();
            }

            lineButton.Setup(this, i);
            lineButton.SetInteractable(false);
            lineButtons.Add(lineButton);
        }
    }

    private Vector3 GetLinePosition(int index)
    {
        return FirstLinePosition + lineOffset * index;
    }

    /// <summary>Đưa player tới line theo index và bật cho button của line đó nhận click.</summary>
    private void StartLine(int index)
    {
        currentLineIndex = index;

        player.position = lineButtons[index].PlayerStandPoint.position;

        EnableCurrentButton();
    }

    private void EnableCurrentButton()
    {
        if (currentLineIndex >= 0 && currentLineIndex < lineButtons.Count)
        {
            lineButtons[currentLineIndex].SetInteractable(true);
        }
    }

    /// <summary>Được Line3DButton gọi khi player bấm vào button.</summary>
    public void OnLineButtonClicked(Line3DButton button)
    {
        if (isBusy || button == null || button.LineIndex != currentLineIndex)
        {
            return;
        }

        isBusy = true;
        PlayCharacterPressAnimation();
        SpawnModelForLine(currentLineIndex);

        completedLineButtonCount++;
        if (completedLineButtonCount >= lineClicksBeforeChoice)
        {
            StartCoroutine(ShowChoicePanelRoutine());
            return;
        }

        StartCoroutine(MoveToNextLineRoutine());
    }

    private void PlayCharacterPressAnimation()
    {
        if (characterAnimator == null || string.IsNullOrEmpty(characterPressTriggerName))
        {
            return;
        }

        characterAnimator.SetTrigger(characterPressTriggerName);
    }

    private void SpawnModelForLine(int index)
    {
        if (index < 0 || index >= modelPrefabs.Count)
        {
            return;
        }

        GameObject prefab = modelPrefabs[index];
        if (prefab == null)
        {
            Debug.LogWarning($"[LineGameplayManager] modelPrefabs[{index}] đang trống.");
            return;
        }

        Transform spawnPoint = lineButtons[index].ModelSpawnPoint;
        Instantiate(prefab, spawnPoint.position, spawnPoint.rotation, transform);
    }

    private IEnumerator MoveToNextLineRoutine()
    {
        yield return new WaitForSeconds(moveDelay);

        int nextIndex = currentLineIndex + 1;
        if (nextIndex >= lineButtons.Count)
        {
            // Đã đi hết tất cả các line.
            currentLineIndex = nextIndex;
            isBusy = false;
            OnAllLinesCompleted();
            yield break;
        }

        Vector3 targetPosition = lineButtons[nextIndex].PlayerStandPoint.position;
        yield return MovePlayerTo(targetPosition);

        currentLineIndex = nextIndex;
        EnableCurrentButton();
        isBusy = false;
    }

    private IEnumerator ShowChoicePanelRoutine()
    {
        yield return new WaitForSeconds(moveDelay);

        isBusy = false;
        ShowChoicePanel();
    }

    private IEnumerator MovePlayerTo(Vector3 targetPosition)
    {
        if (faceMoveDirection)
        {
            Vector3 direction = targetPosition - player.position;
            direction.y = 0f;
            if (direction.sqrMagnitude > 0.0001f)
            {
                player.rotation = Quaternion.LookRotation(direction);
            }
        }

        while (Vector3.Distance(player.position, targetPosition) > 0.01f)
        {
            player.position = Vector3.MoveTowards(
                player.position, targetPosition, playerMoveSpeed * Time.deltaTime);
            yield return null;
        }

        player.position = targetPosition;
    }

    private void OnAllLinesCompleted()
    {
        ShowChoicePanel();
    }

    private void SetupChoiceUI()
    {
        lineClicksBeforeChoice = Mathf.Max(1, lineClicksBeforeChoice);

        if (choicePanel != null)
        {
            choicePanel.SetActive(false);
        }

        for (int i = 0; i < choiceResultObjects.Count; i++)
        {
            if (choiceResultObjects[i] != null)
            {
                choiceResultObjects[i].SetActive(false);
            }
        }

        for (int i = 0; i < choiceButtons.Count; i++)
        {
            Button button = choiceButtons[i];
            if (button == null)
            {
                continue;
            }

            int choiceIndex = i;
            button.onClick.AddListener(() => OnChoiceButtonClicked(choiceIndex));
        }
    }

    private void ShowChoicePanel()
    {
        if (choicePanel == null)
        {
            Debug.LogWarning("[LineGameplayManager] Chua gan choicePanel.");
            return;
        }

        choicePanel.SetActive(true);
    }

    private void OnChoiceButtonClicked(int choiceIndex)
    {
        if (hasChoiceBeenSelected)
        {
            return;
        }

        hasChoiceBeenSelected = true;

        if (choicePanel != null)
        {
            //choicePanel.SetActive(false);
        }

        for (int i = 0; i < choiceResultObjects.Count; i++)
        {
            if (choiceResultObjects[i] != null)
            {
                choiceResultObjects[i].SetActive(i == choiceIndex);
            }
        }

        if (LunaManager.ins != null)
        {
            LunaManager.ins.ShowEndCard();
        }
    }
}
