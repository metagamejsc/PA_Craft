using UnityEngine;
using System.Collections;

public class TNTWarningEffect : MonoBehaviour
{
    [Header("Flash Settings")]
    public Color warningColor = Color.red;
    public Color normalColor = Color.white;

    public float startFlashSpeed = 0.6f;
    public float endFlashSpeed = 0.1f;
    public float warningDuration = 2f;

    [Header("Shake Settings")]
    public float shakeStrength = 0.05f;

    private MeshRenderer meshRenderer;
    private MaterialPropertyBlock mpb;
    private Vector3 originalPos;

    void Awake()
    {
        meshRenderer = GetComponent<MeshRenderer>();
        mpb = new MaterialPropertyBlock();
        originalPos = transform.localPosition;
    }

    public void PlayWarning(System.Action onFinish)
    {
        StartCoroutine(WarningCoroutine(onFinish));
    }

    IEnumerator WarningCoroutine(System.Action onFinish)
    {
        float timer = 0f;
        bool isRed = false;

        while (timer < warningDuration)
        {
            float t = timer / warningDuration;
            float flashSpeed = Mathf.Lerp(startFlashSpeed, endFlashSpeed, t);

            // Đổi màu
            isRed = !isRed;
            SetColor(isRed ? warningColor : normalColor);

            // Rung
            transform.localPosition = originalPos +
                                      Random.insideUnitSphere * shakeStrength;

            yield return new WaitForSeconds(flashSpeed);
            timer += flashSpeed;
        }

        // Reset
        SetColor(normalColor);
        transform.localPosition = originalPos;

        onFinish?.Invoke();
    }

    void SetColor(Color color)
    {
        meshRenderer.GetPropertyBlock(mpb);
        mpb.SetColor("_Color", color); // Standard Shader
        meshRenderer.SetPropertyBlock(mpb);
    }
}