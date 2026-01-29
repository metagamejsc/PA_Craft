using UnityEngine;
using TMPro;

public class WorldValueLabelTMP : MonoBehaviour
{
    [Header("Assign in Inspector")]
    [SerializeField] private TextMeshProUGUI label; // kéo thả TMP UGUI vào đây

    [Header("Value")]
    public int value;

    [Header("Look")]
    public bool showPlusSign = true;
    public Color plusColor = Color.green;
    public Color minusColor = Color.red;
    public Color zeroColor = Color.white;

    void Reset()
    {
        // tự thử tìm nếu bạn quên kéo thả
        if (label == null) label = GetComponentInChildren<TextMeshProUGUI>(true);
        Apply();
    }

    void Awake()
    {
        if (label == null) label = GetComponentInChildren<TextMeshProUGUI>(true);
        Apply();
    }

    void OnValidate()
    {
        Apply();
    }

    public void SetValue(int v)
    {
        value = v;
        Apply();
    }

    void Apply()
    {
        if (label == null) return;

        string sign = (value > 0 && showPlusSign) ? "" : "";
        label.text = sign + value.ToString();

        if (value > 0) label.color = plusColor;
        else if (value < 0) label.color = minusColor;
        else label.color = zeroColor;
    }
}