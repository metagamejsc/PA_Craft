using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(CanvasScaler))]
public class ResponsiveCanvasScaler : MonoBehaviour
{
    [Header("Reference Resolution")] [SerializeField]
    private Vector2 referenceResolution = new Vector2(1080f, 1920f);

    [Header("Match Settings")] [SerializeField] [Range(0f, 1f)]
    private float portraitMatch = 1f;

    [SerializeField] [Range(0f, 1f)] private float landscapeMatch = 0f;
    [SerializeField] [Range(0f, 1f)] private float squareMatch = 0.5f;

    [Header("Aspect Ratio Thresholds")] [SerializeField]
    private float portraitAspectThreshold = 0.7f;

    [SerializeField] private float landscapeAspectThreshold = 1.3f;

    [Header("Runtime")] [SerializeField] private bool updateContinuously = true;

    private CanvasScaler canvasScaler;
    private Vector2Int lastScreenSize;

    private void Awake()
    {
        canvasScaler = GetComponent<CanvasScaler>();
        ApplyScaleSettings();
    }

    private void OnEnable()
    {
        ApplyScaleSettings();
    }

    private void Update()
    {
        if (!updateContinuously)
        {
            return;
        }

        Vector2Int currentScreenSize = new Vector2Int(Screen.width, Screen.height);
        if (currentScreenSize == lastScreenSize)
        {
            return;
        }

        ApplyScaleSettings();
    }

    private void OnValidate()
    {
        canvasScaler = GetComponent<CanvasScaler>();
        ApplyScaleSettings();
    }

    public void ApplyScaleSettings()
    {
        if (canvasScaler == null)
        {
            return;
        }

        if (Screen.height == 0)
        {
            return;
        }

        float aspectRatio = (float)Screen.width / Screen.height;

        canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        canvasScaler.referenceResolution = referenceResolution;
        canvasScaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
        canvasScaler.matchWidthOrHeight = GetMatchValue(aspectRatio);

        lastScreenSize = new Vector2Int(Screen.width, Screen.height);
    }

    private float GetMatchValue(float aspectRatio)
    {
        if (aspectRatio <= portraitAspectThreshold)
        {
            return portraitMatch;
        }

        if (aspectRatio >= landscapeAspectThreshold)
        {
            return landscapeMatch;
        }

        return squareMatch;
    }
}