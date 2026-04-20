using UnityEngine;

public class DeathRotateBody : MonoBehaviour
{
    private Quaternion startRotation;
    private Quaternion targetRotation;
    private float duration;
    private float elapsed;
    private bool isPlaying;

    private void Awake()
    {
        enabled = false;
    }

    public void Play(float xAngle, float rotateDuration)
    {
        startRotation = transform.rotation;
        targetRotation = startRotation * Quaternion.Euler(xAngle, 0f, 0f);
        duration = Mathf.Max(rotateDuration, 0f);
        elapsed = 0f;
        isPlaying = true;

        if (duration <= 0f)
        {
            transform.rotation = targetRotation;
            isPlaying = false;
            enabled = false;
            return;
        }

        enabled = true;
    }

    private void Update()
    {
        if (!isPlaying)
        {
            enabled = false;
            return;
        }

        elapsed += Time.deltaTime;
        float t = Mathf.Clamp01(elapsed / duration);
        transform.rotation = Quaternion.Slerp(startRotation, targetRotation, EaseOutCubic(t));

        if (t >= 1f)
        {
            isPlaying = false;
            enabled = false;
        }
    }

    private static float EaseOutCubic(float t)
    {
        t = 1f - t;
        return 1f - (t * t * t);
    }
}
