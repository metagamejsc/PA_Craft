// ButtonSequenceAnimator.cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonSequenceAnimator : MonoBehaviour
{
    [Header("Buttons")]
    [Tooltip("Danh sách button chạy theo thứ tự này")]
    [SerializeField] private List<Button> buttons = new List<Button>();

    [Tooltip("Parent chứa tất cả buttons (để SetAsLastSibling cho button hiện tại)")]
    [SerializeField] private Transform buttonsParent;

    [Tooltip("Nếu button hiện tại không nằm dưới buttonsParent thì tự SetParent vào")]
    [SerializeField] private bool forceReparentIntoButtonsParent = false;

    [Tooltip("Nếu parent có LayoutGroup và bạn muốn update ngay sau khi đổi sibling")]
    [SerializeField] private bool rebuildLayoutAfterReorder = false;

    [Tooltip("Tự chạy khi OnEnable")]
    [SerializeField] private bool autoStart = true;

    [Tooltip("Lặp lại từ nút 1 sau khi hoàn tất")]
    [SerializeField] private bool loop = true;

    [Tooltip("Delay trước khi bắt đầu chuỗi (giây)")]
    [SerializeField] private float initialDelay = 0f;

    [Tooltip("Khoảng nghỉ giữa hai nút (giây)")]
    [SerializeField] private float gapBetweenButtons = 0.2f;

    [Tooltip("Dùng thời gian không bị Time.timeScale ảnh hưởng (khuyên dùng cho UI)")]
    [SerializeField] private bool useUnscaledTime = true;

    [Tooltip("Nếu bật, sau khi 'ấn' sẽ gọi button.onClick.Invoke()")]
    [SerializeField] private bool invokeButtonClickEvent = false;

    [Header("Button Scale Effect")]
    [SerializeField] private float scaleUpDuration = 0.25f;
    [SerializeField] private float scaleDownDuration = 0.25f;
    [SerializeField] private float scaleBackDuration = 0.3f;
    [SerializeField] private float scaleUp = 1.2f;
    [SerializeField] private float scaleDown = 0.9f;

    [Header("Hand")]
    [Tooltip("RectTransform hình bàn tay (optional)")]
    [SerializeField] private RectTransform handRect = null;

    [SerializeField] private float handMoveDuration = 0.25f;
    [SerializeField] private float handPressScale = 0.85f;
    [SerializeField] private float handPressDuration = 0.25f;
    [SerializeField] private float delayAfterHandPress = 0.05f;

    [Header("Border")]
    [Tooltip("Border RectTransform (kéo GameObject border vào đây)")]
    [SerializeField] private RectTransform borderRect = null;

    private int _currentIndex = 0;
    private bool _running = false;
    private Coroutine _sequenceCo = null;

    // Lưu original scale
    private readonly Dictionary<Transform, Vector3> _originalScales = new Dictionary<Transform, Vector3>();

    private void OnEnable()
    {
        CacheOriginalScales();
        HideBorder();
        if (autoStart) StartSequence(0);
    }

    private void OnDisable()
    {
        StopSequence();
    }

    private void CacheOriginalScales()
    {
        if (buttons != null)
        {
            for (int i = 0; i < buttons.Count; i++)
            {
                var b = buttons[i];
                if (!b) continue;

                var t = b.transform;
                if (!_originalScales.ContainsKey(t))
                    _originalScales[t] = t.localScale;
            }
        }

        if (handRect && !_originalScales.ContainsKey(handRect))
            _originalScales[handRect] = handRect.localScale;
    }

    public void StartSequence(int fromIndex = 0)
    {
        if (buttons == null || buttons.Count == 0) return;

        StopSequence();
        CacheOriginalScales();
        HideBorder();

        _running = true;
        _currentIndex = Mathf.Clamp(fromIndex, 0, buttons.Count - 1);

        // Fix button đầu tiên bị lệch: chạy coroutine rồi mới place hand (sau 1 frame)
        _sequenceCo = StartCoroutine(SequenceRoutine(_currentIndex));
    }

    public void StopSequence()
    {
        _running = false;

        if (_sequenceCo != null)
        {
            StopCoroutine(_sequenceCo);
            _sequenceCo = null;
        }

        HideBorder();

        // Reset scales
        if (buttons != null)
        {
            for (int i = 0; i < buttons.Count; i++)
            {
                var b = buttons[i];
                if (!b) continue;

                var t = b.transform;
                if (_originalScales.TryGetValue(t, out var orig))
                    t.localScale = orig;
            }
        }

        if (handRect && _originalScales.TryGetValue(handRect, out var handOrig))
            handRect.localScale = handOrig;
    }

    private IEnumerator SequenceRoutine(int startIndex)
    {
        // Chờ 1 frame để layout update xong
        yield return null;
        Canvas.ForceUpdateCanvases();

        // Place hand đúng button đầu tiên
        var startRect = GetButtonRect(startIndex);
        if (handRect && startRect != null)
            PlaceHandInstant(startRect);

        // Border phải tắt khi bắt đầu
        HideBorder();

        var w0 = Wait(initialDelay);
        if (w0 != null) yield return w0;

        int idx = startIndex;
        bool isFirst = true;

        while (_running)
        {
            var btn = (idx >= 0 && idx < buttons.Count) ? buttons[idx] : null;
            if (!btn)
            {
                (idx, isFirst) = NextIndex(idx);
                if (!_running) yield break;
                continue;
            }

            var btnRect = btn.transform as RectTransform;
            if (btnRect == null)
            {
                (idx, isFirst) = NextIndex(idx);
                if (!_running) yield break;
                continue;
            }

            // Khi "đến" button này: đưa button xuống cuối trong parent để render lên trên
            BringButtonToFront(btnRect);

            // Border TẮT trong lúc chuẩn bị move sang button này
            HideBorder();

            if (handRect != null)
            {
                // Move hand tới button (từ button thứ 2 trở đi)
                if (!isFirst)
                {
                    Vector3 toLocal = GetPosInParent(handRect.parent, btnRect);
                    yield return MoveLocalPosition(handRect, toLocal, Mathf.Max(0f, handMoveDuration));
                }

                // Hand đã tới nơi => BẬT border (đặt theo vị trí button giống cách hand tính)
                ShowBorderAt(btnRect);

                // Press hand
                Vector3 handOrig = GetOriginalScale(handRect);
                Vector3 pressScale = new Vector3(
                    handOrig.x * handPressScale,
                    handOrig.y * handPressScale,
                    handOrig.z
                );

                float halfPress = Mathf.Max(0f, handPressDuration) * 0.5f;
                yield return ScaleTo(handRect, pressScale, halfPress);
                yield return ScaleTo(handRect, handOrig, halfPress);

                // Ấn xong => TẮT border
                HideBorder();

                var w1 = Wait(delayAfterHandPress);
                if (w1 != null) yield return w1;

                // Button effect
                yield return PlayButtonEffect(btnRect);

                if (invokeButtonClickEvent)
                    btn.onClick?.Invoke();
            }
            else
            {
                // Không có hand: vẫn có thể bật border 1 nhịp rồi tắt (tuỳ bạn)
                ShowBorderAt(btnRect);
                yield return PlayButtonEffect(btnRect);
                HideBorder();

                if (invokeButtonClickEvent)
                    btn.onClick?.Invoke();
            }

            var w2 = Wait(gapBetweenButtons);
            if (w2 != null) yield return w2;

            (idx, isFirst) = NextIndex(idx);
            if (!_running) yield break;
        }
    }

    private void BringButtonToFront(RectTransform btnRect)
    {
        if (!btnRect) return;

        Transform parent = buttonsParent != null ? buttonsParent : btnRect.parent;
        if (parent == null) return;

        if (forceReparentIntoButtonsParent && btnRect.parent != parent)
            btnRect.SetParent(parent, worldPositionStays: true);

        // Render/top: SetAsLastSibling
        btnRect.SetAsLastSibling();

        // Nếu border đang cùng parent, về sau khi ShowBorder sẽ SetAsLastSibling lại border để border nằm trên cùng
        if (rebuildLayoutAfterReorder && parent is RectTransform prt)
            LayoutRebuilder.ForceRebuildLayoutImmediate(prt);

        // Vì đổi sibling có thể ảnh hưởng layout/pos => update ngay
        Canvas.ForceUpdateCanvases();
    }

    private void ShowBorderAt(RectTransform targetBtnRect)
    {
        if (!borderRect || !targetBtnRect) return;

        // Border bật sau khi hand move tới nút
        if (!borderRect.gameObject.activeSelf)
            borderRect.gameObject.SetActive(true);

        Transform bParent = borderRect.parent;
        if (bParent != null)
        {
            borderRect.localPosition = GetPosInParent(bParent, targetBtnRect);
        }
        else
        {
            // Không có parent: dùng world position
            borderRect.position = targetBtnRect.position;
        }

        // Border luôn nằm trên cùng để không bị che
        borderRect.SetAsLastSibling();
    }

    private void HideBorder()
    {
        if (borderRect && borderRect.gameObject.activeSelf)
            borderRect.gameObject.SetActive(false);
    }

    private (int nextIdx, bool nextIsFirst) NextIndex(int prevIdx)
    {
        if (!_running) return (prevIdx, false);

        int last = buttons.Count - 1;

        if (prevIdx >= last)
        {
            if (loop)
            {
                _currentIndex = 0;

                // loop về đầu: tắt border, đặt hand tức thời cho đúng
                HideBorder();

                var firstRect = GetButtonRect(0);
                if (handRect && firstRect != null)
                    PlaceHandInstant(firstRect);

                return (0, true);
            }
            else
            {
                StopSequence();
                return (prevIdx, false);
            }
        }
        else
        {
            _currentIndex = prevIdx + 1;
            return (_currentIndex, false);
        }
    }

    private IEnumerator PlayButtonEffect(RectTransform target)
    {
        if (!target) yield break;

        Vector3 orig = GetOriginalScale(target);
        Vector3 up = new Vector3(orig.x * scaleUp, orig.y * scaleUp, orig.z);
        Vector3 down = new Vector3(orig.x * scaleDown, orig.y * scaleDown, orig.z);

        yield return ScaleTo(target, up, Mathf.Max(0f, scaleUpDuration));
        yield return ScaleTo(target, down, Mathf.Max(0f, scaleDownDuration));
        yield return ScaleTo(target, orig, Mathf.Max(0f, scaleBackDuration));
    }

    private void PlaceHandInstant(RectTransform targetBtnRect)
    {
        if (!handRect || !targetBtnRect) return;

        handRect.localPosition = GetPosInParent(handRect.parent, targetBtnRect);
    }

    // Convert world pos của button -> local pos trong một parent bất kỳ (giống inverseTransformPoint)
    private Vector3 GetPosInParent(Transform parent, RectTransform targetBtnRect)
    {
        Vector3 worldPos = targetBtnRect.position;
        if (parent != null)
            return parent.InverseTransformPoint(worldPos);
        return worldPos;
    }

    private RectTransform GetButtonRect(int idx)
    {
        if (buttons == null || idx < 0 || idx >= buttons.Count) return null;
        var b = buttons[idx];
        if (!b) return null;
        return b.transform as RectTransform;
    }

    private Vector3 GetOriginalScale(Transform t)
    {
        if (!t) return Vector3.one;

        if (!_originalScales.TryGetValue(t, out var orig))
        {
            orig = t.localScale;
            _originalScales[t] = orig;
        }
        return orig;
    }

    private IEnumerator MoveLocalPosition(Transform t, Vector3 to, float duration)
    {
        if (!t) yield break;

        if (duration <= 0f)
        {
            t.localPosition = to;
            yield break;
        }

        Vector3 from = t.localPosition;
        float time = 0f;

        while (time < duration)
        {
            time += Dt();
            float p = Mathf.Clamp01(time / duration);
            t.localPosition = Vector3.LerpUnclamped(from, to, p); // linear
            yield return null;
        }

        t.localPosition = to;
    }

    private IEnumerator ScaleTo(Transform t, Vector3 to, float duration)
    {
        if (!t) yield break;

        if (duration <= 0f)
        {
            t.localScale = to;
            yield break;
        }

        Vector3 from = t.localScale;
        float time = 0f;

        while (time < duration)
        {
            time += Dt();
            float p = Mathf.Clamp01(time / duration);
            t.localScale = Vector3.LerpUnclamped(from, to, p); // linear
            yield return null;
        }

        t.localScale = to;
    }

    private float Dt() => useUnscaledTime ? Time.unscaledDeltaTime : Time.deltaTime;

    // Trả object để yield return được cả WaitForSeconds và WaitForSecondsRealtime
    private object Wait(float seconds)
    {
        seconds = Mathf.Max(0f, seconds);
        if (seconds <= 0f) return null;

        return useUnscaledTime
            ? (object)new WaitForSecondsRealtime(seconds)
            : new WaitForSeconds(seconds);
    }
}
