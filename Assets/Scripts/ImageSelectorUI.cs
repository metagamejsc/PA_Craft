using UnityEngine;
using UnityEngine.UI;

public class ImageSelectorUI : MonoBehaviour
{
    [Header("Images")]
    public Sprite[] sprites;
    public Image previewImage;

    private int currentIndex = 0;

    private void Start()
    {
        ShowImage();
    }

    public void Next()
    {
        currentIndex++;
        if (currentIndex >= sprites.Length)
            currentIndex = 0;

        ShowImage();
    }

    public void Previous()
    {
        currentIndex--;
        if (currentIndex < 0)
            currentIndex = sprites.Length - 1;

        ShowImage();
    }

    void ShowImage()
    {
        previewImage.sprite = sprites[currentIndex];
    }
}
