using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class HandPointerUI : MonoBehaviour
{
    [Header("References")]
    public Canvas canvas;                       // Canvas chứa buttons & hand
    public RectTransform hand;                  // Hình bàn tay (UI), là RectTransform
    public RectTransform[] targets;             // 3 ButtonUI (điền RectTransform của mỗi nút)

    [Header("Motion")]
    [Min(0.01f)] public float moveDuration = 0.5f;   // thời gian di chuyển tới nút
    [Min(0.01f)] public float dwellDuration = 0.8f;  // thời gian dừng/“chỉ” vào nút
    public AnimationCurve ease = AnimationCurve.EaseInOut(0, 0, 1, 1);
    public bool loop = true;
    public Vector2 handOffset = new Vector2(0f, 0f); // lệch tay so với tâm nút (pixel)
    public bool rotateHand = true;                   // có xoay tay hướng về nút không
    public float maxRotateSpeed = 720f;              // độ/giây (z-rotation)

    [Header("Optional Pulse")]
    public bool pulseAtTarget = false;
    public float pulseScale = 1.1f;
    public float pulseTime = 0.15f;

    RectTransform _handParent;
    Camera _camForUI;

    void Awake()
    {
        if (canvas == null) canvas = GetComponentInParent<Canvas>();
        _handParent = hand != null ? hand.parent as RectTransform : null;

        // Với Overlay không cần camera, còn lại dùng camera của canvas
        _camForUI = canvas != null && canvas.renderMode == RenderMode.ScreenSpaceOverlay
            ? null
            : (canvas != null ? canvas.worldCamera : null);
    }

    void OnEnable()
    {
        if (hand != null && targets != null && targets.Length > 0)
            StartCoroutine(RunSequence());
    }

    IEnumerator RunSequence()
    {
        int idx = 0;
        while (true)
        {
            if (targets.Length == 0 || hand == null || _handParent == null)
                yield break;

            RectTransform target = targets[idx];
            if (target != null && target.gameObject.activeInHierarchy)
            {
                // điểm đích: tâm rect của button -> chuyển sang local của parent của hand
                Vector2 destLocal = TargetCenterInParentLocal(target) + handOffset;

                // di chuyển mượt tới dest
                yield return StartCoroutine(MoveHandTo(destLocal));

                // pulse nhẹ khi tới (tuỳ chọn)
                //if (pulseAtTarget)
                // yield return StartCoroutine(Pulse(hand, pulseScale, pulseTime));

                // giữ tay chỉ vào trong dwellDuration
                float t = 0f;
                while (t < dwellDuration)
                {
                    if (rotateHand) RotateToward(destLocal, Time.deltaTime);
                    t += Time.deltaTime;
                    yield return null;
                }
            }

            idx = (idx + 1) % targets.Length;
            if (!loop && idx == 0) yield break;
        }
    }

    Vector2 TargetCenterInParentLocal(RectTransform target)
    {
        // world pos của tâm rect target
        Vector3 worldCenter = target.TransformPoint(target.rect.center);
        // to screen
        Vector2 screen = RectTransformUtility.WorldToScreenPoint(_camForUI, worldCenter);
        // sang local của parent hand
        Vector2 local;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(_handParent, screen, _camForUI, out local);
        return local;
    }

    IEnumerator MoveHandTo(Vector2 destLocal)
    {
        Vector2 start = hand.anchoredPosition;
        float t = 0f;

        while (t < moveDuration)
        {
            float p = ease.Evaluate(t / moveDuration);
            Vector2 pos = Vector2.LerpUnclamped(start, destLocal, p);
            hand.anchoredPosition = pos;

            if (rotateHand) RotateToward(destLocal, Time.deltaTime);

            t += Time.deltaTime;
            yield return null;
        }

        hand.anchoredPosition = destLocal;
    }

    void RotateToward(Vector2 destLocal, float dt)
    {
        // hướng từ tay tới đích trong toạ độ local (UI)
        Vector2 dir = destLocal - hand.anchoredPosition;
        if (dir.sqrMagnitude < 1e-4f) return;

        // giả định “ngón tay” chỉ theo trục +X của sprite (hand.right)
        float targetAngle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

        float current = hand.localEulerAngles.z;
        // đưa về khoảng [-180, 180]
        current = (current > 180f) ? current - 360f : current;
        float newZ = Mathf.MoveTowardsAngle(current, targetAngle, maxRotateSpeed * dt);

        Vector3 e = hand.localEulerAngles;
        e.z = newZ;
        hand.localEulerAngles = e;
    }

    IEnumerator Pulse(RectTransform rt, float scale, float time)
    {
        Vector3 baseScale = rt.localScale;
        Vector3 targetScale = baseScale * scale;
        float t = 0f;
        while (t < time)
        {
            float p = t / time;
            rt.localScale = Vector3.LerpUnclamped(baseScale, targetScale, ease.Evaluate(p));
            t += Time.deltaTime;
            yield return null;
        }
        rt.localScale = targetScale;

        // trở về
        t = 0f;
        while (t < time)
        {
            float p = t / time;
            rt.localScale = Vector3.LerpUnclamped(targetScale, baseScale, ease.Evaluate(p));
            t += Time.deltaTime;
            yield return null;
        }
        rt.localScale = baseScale;
    }

    // tiện đổi đích khi đang chạy
    public void SetTargets(RectTransform[] newTargets, bool restart = true)
    {
        targets = newTargets;
        if (restart && isActiveAndEnabled)
        {
            StopAllCoroutines();
            StartCoroutine(RunSequence());
        }
    }
}
