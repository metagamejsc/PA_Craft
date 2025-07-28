using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class ForestEscapeGame : MonoBehaviour
{
    public enum GameState
    {
        ItemSelection,
        TreeChopping,
        PathSelection
    }

    [Header("Game Objects")]
    public GameObject itemSelectionPanel;
    public GameObject treeChoppingPanel;
    public GameObject pathSelectionPanel;
    public GameObject storePanel;

    [Header("UI Elements")]
    public Button axeButton;
    public Button torchButton;
    public Button foodButton;
    public Button chopTreeButton;
    public Button pathAButton;
    public Button pathBButton;

    [Header("Tree Chopping")]
    public TextMeshProUGUI timerText;
    public float choppingTime = 5f;
    private float currentChoppingTime;
    private int treesChopped = 0;
    private bool isChopping = false;

    private GameState currentState;
    private bool hasTorch = false;

    void Start()
    {
        InitializeGame();
    }

    void InitializeGame()
    {
        currentState = GameState.ItemSelection;
        ShowPanel(itemSelectionPanel);
        
        // Setup button listeners
        axeButton.onClick.AddListener(() => SelectItem(false));
        torchButton.onClick.AddListener(() => SelectItem(true));
        foodButton.onClick.AddListener(() => SelectItem(false));
        chopTreeButton.onClick.AddListener(StartChopping);
        pathAButton.onClick.AddListener(() => SelectPath(true));
        pathBButton.onClick.AddListener(() => SelectPath(false));
    }

    void SelectItem(bool isTorch)
    {
        hasTorch = isTorch;
        if (hasTorch)
        {
            currentState = GameState.TreeChopping;
            ShowPanel(treeChoppingPanel);
        }
        else
        {
            GoToStore();
        }
    }

    void StartChopping()
    {
        if (!isChopping)
        {
            isChopping = true;
            currentChoppingTime = choppingTime;
            treesChopped = 0;
            StartCoroutine(ChoppingCoroutine());
        }
    }

    System.Collections.IEnumerator ChoppingCoroutine()
    {
        while (currentChoppingTime > 0 && treesChopped < 3)
        {
            currentChoppingTime -= Time.deltaTime;
            timerText.text = Mathf.Ceil(currentChoppingTime).ToString();
            yield return null;
        }

        if (treesChopped >= 3)
        {
            currentState = GameState.PathSelection;
            ShowPanel(pathSelectionPanel);
        }
        else
        {
            GoToStore();
        }

        isChopping = false;
    }

    public void OnTreeChopped()
    {
        treesChopped++;
        if (treesChopped >= 3 && isChopping)
        {
            StopAllCoroutines();
            currentState = GameState.PathSelection;
            ShowPanel(pathSelectionPanel);
        }
    }

    void SelectPath(bool isSafePath)
    {
        // Trong kịch bản này, cả 2 path đều dẫn đến store
        GoToStore();
    }

    void ShowPanel(GameObject panelToShow)
    {
        // Ẩn tất cả panel
        itemSelectionPanel.SetActive(false);
        treeChoppingPanel.SetActive(false);
        pathSelectionPanel.SetActive(false);
        storePanel.SetActive(false);

        // Hiện panel cần thiết
        if (panelToShow != null)
            panelToShow.SetActive(true);
    }

    public void GoToStore()
    {
        ShowPanel(storePanel);
    }

    // Public method để gọi từ UI buttons
    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void GoToMainMenu()
    {
        SceneManager.LoadScene("MainMenu"); // Thay đổi tên scene nếu cần
    }
}