using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

[RequireComponent(typeof(RawImage))]
public class VideoFitToScreen : MonoBehaviour
{
    public VideoPlayer videoPlayer;   // Gắn VideoPlayer ở Inspector

    private RawImage rawImage;
    private RectTransform rawRect;
    private RectTransform parentRect;

    private bool fitted = false;

    void Awake()
    {
        rawImage = GetComponent<RawImage>();
        rawRect = GetComponent<RectTransform>();
        parentRect = transform.parent.GetComponent<RectTransform>();

        // Đăng ký callback khi video đã sẵn sàng
        videoPlayer.prepareCompleted += OnVideoPrepared;
    }

    void Start()
    {
        // Đảm bảo video đang được prepare nếu chưa
        
    }

    void OnDestroy()
    {
        videoPlayer.prepareCompleted -= OnVideoPrepared;
    }

    private void OnVideoPrepared(VideoPlayer source)
    {
        FitVideo();
    }

    void FitVideo()
    {
        if (videoPlayer.width <= 0 || videoPlayer.height <= 0) return;

        float videoAspect = (float)videoPlayer.width / videoPlayer.height;

        float parentWidth = parentRect.rect.width;
        float parentHeight = parentRect.rect.height;
        float parentAspect = parentWidth / parentHeight;

        float newWidth, newHeight;

        // FitInside
        if (videoAspect > parentAspect)
        {
            newWidth = parentWidth;
            newHeight = parentWidth / videoAspect;
        }
        else
        {
            newHeight = parentHeight;
            newWidth = parentHeight * videoAspect;
        }

        rawRect.sizeDelta = new Vector2(newWidth, newHeight);
        fitted = true;
    }

    void OnRectTransformDimensionsChange()
    {
        if (fitted && videoPlayer.isPrepared)
        {
            FitVideo(); // Re-fit on orientation change or screen resize
        }
    }
}