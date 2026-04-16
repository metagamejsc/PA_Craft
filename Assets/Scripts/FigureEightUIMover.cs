using UnityEngine;

public class FigureEightUIMover : MonoBehaviour
{
    [SerializeField] private float width = 300f;
    [SerializeField] private float height = 120f;
    [SerializeField] private float speed = 1f;
    [SerializeField] private bool useUnscaledTime;

    private RectTransform rectTransform;
    private Vector2 startAnchoredPosition;
    private float timer;

    private void Awake()
    {
        rectTransform = GetComponent<RectTransform>();

        if (rectTransform == null)
        {
            Debug.LogError($"{nameof(FigureEightUIMover)} needs a RectTransform because it is made for UI objects in a Canvas.");
            enabled = false;
            return;
        }

        startAnchoredPosition = rectTransform.anchoredPosition;
    }
    // void Start()
    // {
    //     width = LunaManager.ins.widthHand;
    //     height = LunaManager.ins.HeightHand;
    //     speed = LunaManager.ins.SpeedHand;
    // }

    private void Update()
    {
        float deltaTime = useUnscaledTime ? Time.unscaledDeltaTime : Time.deltaTime;
        timer += deltaTime * speed;

        float angle = timer * Mathf.PI * 2f;
        float x = Mathf.Sin(angle) * width * 0.5f;
        float y = Mathf.Sin(angle * 2f) * height * 0.5f;

        rectTransform.anchoredPosition = startAnchoredPosition + new Vector2(x, y);
    }

    public void ResetStartPosition()
    {
        startAnchoredPosition = rectTransform.anchoredPosition;
        timer = 0f;
    }
}
