using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(RectTransform))]
[RequireComponent(typeof(RawImage))]
public class RawImageScreenScaler : MonoBehaviour
{
    [Header("Tỉ lệ khi màn ngang (width >= height)")]
    public Vector2 landscapeAspect = new Vector2(16f, 9f); // 16:9

    [Header("Tùy chọn lấy tỉ lệ từ ảnh")]
    public bool readAspectFromTexture = true;
    public Vector2 fallbackAspect = new Vector2(16f, 9f);  // dùng nếu không có texture

    private RectTransform rectTransform;
    private RectTransform parentRect;
    private RawImage rawImage;

    private int lastScreenWidth;
    private int lastScreenHeight;

    private void Awake()
    {
        rectTransform = GetComponent<RectTransform>();
        parentRect = rectTransform.parent as RectTransform;
        rawImage = GetComponent<RawImage>();

        ApplyScale();
    }

    private void Update()
    {
        // Chỉ update khi size màn hình thay đổi (xoay máy, resize window...)
        if (Screen.width != lastScreenWidth || Screen.height != lastScreenHeight)
        {
            ApplyScale();
        }
    }

    private void ApplyScale()
    {
        lastScreenWidth = Screen.width;
        lastScreenHeight = Screen.height;

        float parentWidth = parentRect != null ? parentRect.rect.width : Screen.width;
        float parentHeight = parentRect != null ? parentRect.rect.height : Screen.height;

        bool isLandscape = parentWidth >= parentHeight;

        // Lấy tỉ lệ gốc của ảnh (ảnh ngang)
        float textureAspect = GetTextureAspect(); // width / height

        float aspect;      // aspect dùng để tính size
        float targetWidth; // width của RawImage
        float targetHeight;

        if (isLandscape)
        {
            // MÀN NGANG:
            //  - luôn fit full chiều ngang
            //  - dùng tỉ lệ 16:9 (landscapeAspect)
            aspect = landscapeAspect.x / landscapeAspect.y;
            targetWidth = parentWidth;
        }
        else
        {
            // MÀN DỌC:
            //  - RawImage vẫn là ảnh ngang (dùng tỉ lệ thật của ảnh)
            //  - fit vừa chiều ngang: width = parentWidth
            //  => nhìn giống như scale nhỏ lại so với trạng thái full màn ngang
            aspect = textureAspect;
            targetWidth = parentWidth;
        }

        targetHeight = targetWidth / aspect;

        // Căn giữa
        rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
        rectTransform.anchoredPosition = Vector2.zero;

        rectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, targetWidth);
        rectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, targetHeight);
    }

    private float GetTextureAspect()
    {
        if (readAspectFromTexture && rawImage != null && rawImage.texture != null)
        {
            return (float)rawImage.texture.width / rawImage.texture.height;
        }

        // fallback (ví dụ nếu chưa gán texture)
        return fallbackAspect.x / fallbackAspect.y;
    }
}
