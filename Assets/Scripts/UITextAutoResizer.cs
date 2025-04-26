using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class UITextAutoResizer : MonoBehaviour
{
    
    public RectTransform backgroundImage;
    public TextMeshProUGUI text;

    
    public Vector2 padding = new Vector2(20f, 20f);

    private void Update()
    {
        if (text == null || backgroundImage == null) return;

        // Get the preferred size of the text
        Vector2 preferredSize = new Vector2(text.preferredWidth, text.preferredHeight);

        // Apply padding
        backgroundImage.sizeDelta = preferredSize + padding;
    }
}