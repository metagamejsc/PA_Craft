using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

[RequireComponent(typeof(RawImage))]
public class FitVideoToScreen : MonoBehaviour
{
    public VideoPlayer videoPlayer;      // Kéo từ Inspector vào
    public RenderTexture renderTexture;  // Kéo RT vào (nếu cần)

    private RawImage rawImage;
    private RectTransform rawRect;
    private RectTransform parentRect;

    private void Awake()
    {
        rawImage = GetComponent<RawImage>();
        rawRect = rawImage.rectTransform;
        parentRect = rawRect.parent as RectTransform;
    }

    private void OnEnable()
    {
        // Nếu dùng VideoPlayer.prepare
        if (videoPlayer != null)
        {
            videoPlayer.prepareCompleted += OnVideoPrepared;
        }
    }

    private void OnDisable()
    {
        if (videoPlayer != null)
        {
            videoPlayer.prepareCompleted -= OnVideoPrepared;
        }
    }

    private void Start()
    {
        // Thử fit lần đầu (phòng trường hợp clip đã ready)
        Fit();
    }

    private void OnRectTransformDimensionsChange()
    {
        // Khi xoay màn hình / đổi size canvas -> fit lại
        Fit();
    }

    private void OnVideoPrepared(VideoPlayer vp)
    {
        Fit();
    }

    public void Fit()
    {
        if (rawRect == null) return;

        // --- 1. Lấy kích thước khung hiển thị (thường là full màn hình) ---
        float screenWidth;
        float screenHeight;

        if (parentRect != null)
        {
            screenWidth  = parentRect.rect.width;
            screenHeight = parentRect.rect.height;
        }
        else
        {
            // fallback: dùng Screen size
            screenWidth  = Screen.width;
            screenHeight = Screen.height;
        }

        if (screenWidth <= 0 || screenHeight <= 0) return;

        // --- 2. Lấy kích thước video từ RenderTexture hoặc clip ---
        float videoWidth  = 0;
        float videoHeight = 0;

        if (renderTexture != null)
        {
            videoWidth  = renderTexture.width;
            videoHeight = renderTexture.height;
        }
        else if (videoPlayer != null && videoPlayer.clip != null)
        {
            videoWidth  = videoPlayer.clip.width;
            videoHeight = videoPlayer.clip.height;
        }
        /*else if (videoPlayer != null && videoPlayer.texture != null)
        {
            videoWidth  = videoPlayer.texture.width;
            videoHeight = videoPlayer.texture.height;
        }*/

        if (videoWidth <= 0 || videoHeight <= 0) return;

        // --- 3. Tính scale để FIT INSIDE ---
        float scale = Mathf.Min(screenWidth / videoWidth, screenHeight / videoHeight);

        float targetWidth  = videoWidth  * scale;
        float targetHeight = videoHeight * scale;

        // --- 4. Gán size cho RawImage ---
        rawRect.sizeDelta = new Vector2(targetWidth, targetHeight);
        rawRect.anchoredPosition = Vector2.zero;   // căn giữa (nếu anchor middle-center)
    }
}
