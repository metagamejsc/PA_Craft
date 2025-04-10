using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIMove : MonoBehaviour
{
    public RawImage rawImage;
    public Vector2 speed;

    public void UpdateUV()
    {
        rawImage.uvRect = new Rect(rawImage.uvRect.x + speed.x * Time.deltaTime, rawImage.uvRect.y+ speed.y * Time.deltaTime, rawImage.uvRect.width, rawImage.uvRect.height);
    }

    private void Update()
    {
        UpdateUV();
    }
}
