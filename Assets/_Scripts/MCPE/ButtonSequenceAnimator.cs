// ButtonSequenceAnimator_UpdateTween.cs
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonSequenceAnimator : MonoBehaviour
{
    [Header("Buttons")]
    [SerializeField] private List<Button> buttons = new List<Button>();

    [Tooltip("Parent chứa tất cả buttons (để SetAsLastSibling cho button hiện tại lên trên cùng)")]
    [SerializeField] private Transform buttonsParent;

    [Tooltip("Nếu button hiện tại không nằm dưới buttonsParent thì tự SetParent vào")]
    [SerializeField] private bool forceReparentIntoButtonsParent = false;

    [Tooltip("Nếu parent có LayoutGroup và bạn muốn update ngay sau khi đổi sibling")]
    [SerializeField] private bool rebuildLayoutAfterReorder = false;

    [SerializeField] private bool autoStart = true;
    [SerializeField] private bool loop = true;

    [SerializeField] private float initialDelay = 0f;
    [SerializeField] private float gapBetweenButtons = 0.2f;

    [SerializeField] private bool useUnscaledTime = true;

    [Tooltip("Bật nếu bạn muốn giả click onClick (playable thường KHÔNG cần)")]
    [SerializeField] private bool invokeButtonClickEvent = false;

    [Header("Button Scale Effect")]
    [SerializeField] private float scaleUpDuration = 0.25f;
    [SerializeField] private float scaleDownDuration = 0.25f;
    [SerializeField] private float scaleBackDuration = 0.3f;
    [SerializeField] private float scaleUp = 1.2f;
    [SerializeField] private float scaleDown = 0.9f;

    [Header("Hand")]
    [SerializeField] private RectTransform handRect = null;
    [SerializeField] private float handMoveDuration = 0.25f;
    [SerializeField] private float handPressScale = 0.85f;
    [SerializeField] private float handPressDuration = 0.25f;
    [SerializeField] private float delayAfterHandPress = 0.05f;

    [Header("Border")]
    [SerializeField] private RectTransform borderRect = null;

    [Header("Debug")]
    [SerializeField] private bool debugLog = false;

    // ===== runtime =====
    private readonly Dictionary<Transform, Vector3> _originalScales = new Dictionary<Transform, Vector3>();
    private int _idx = 0;
    private bool _running = false;

    private enum Step
    {
        None,
        InitDelay,
        PrepareButton,
        MoveHand,
        ShowBorder,
        PressDown,
        PressUp,
        HideBorderAfterPress,
        DelayAfterPress,
        BtnScaleUp,
        BtnScaleDown,
        BtnScaleBack,
        Gap,
    }

    private Step _step = Step.None;
    private float _t = 0f;

    // tween caches
    private RectTransform _btnRect;
    private Vector3 _handFromPos, _handToPos;
    private Vector3 _handOrigScale, _handPressScaleVec;
    private Vector3 _btnOrigScale, _btnUpScale, _btnDownScale;

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
                if (!_originalScales.ContainsKey(b.transform))
                    _originalScales[b.transform] = b.transform.localScale;
            }
        }

        if (handRect && !_originalScales.ContainsKey(handRect))
            _originalScales[handRect] = handRect.localScale;
    }

    public void StartSequence(int fromIndex = 0)
    {
        if (buttons == null || buttons.Count == 0) return;

        CacheOriginalScales();
        HideBorder();

        _running = true;
        _idx = Mathf.Clamp(fromIndex, 0, buttons.Count - 1);

        // settle UI 1 frame bằng flag
        _step = Step.InitDelay;
        _t = -1f; // dùng -1 để “đợi 1 frame” trước khi tính delay thật

        if (debugLog) Debug.Log("[Seq] Start at " + _idx);
    }

    public void StopSequence()
    {
        _running = false;
        _step = Step.None;
        _t = 0f;

        HideBorder();

        // reset scales
        if (buttons != null)
        {
            for (int i = 0; i < buttons.Count; i++)
            {
                var b = buttons[i];
                if (!b) continue;

                Vector3 s;
                if (_originalScales.TryGetValue(b.transform, out s))
                    b.transform.localScale = s;
            }
        }

        if (handRect)
        {
            Vector3 hs;
            if (_originalScales.TryGetValue(handRect, out hs))
                handRect.localScale = hs;
        }
    }

    private void Update()
    {
        if (!_running) return;
        if (buttons == null || buttons.Count == 0) { StopSequence(); return; }

        float dt = DtSafe();

        // Step machine
        switch (_step)
        {
            case Step.InitDelay:
                // đợi 1 frame để layout update trong playable
                if (_t < 0f)
                {
                    _t += 1f;
                    Canvas.ForceUpdateCanvases();
                    PlaceHandInstantForCurrent();
                    HideBorder();
                    return;
                }
                _t += dt;
                if (_t >= Mathf.Max(0f, initialDelay))
                {
                    _t = 0f;
                    _step = Step.PrepareButton;
                }
                break;

            case Step.PrepareButton:
                if (!TryGetCurrentButtonRect(out _btnRect))
                {
                    GoNext();
                    break;
                }

                BringButtonToFront(_btnRect);
                HideBorder();

                // set tween caches
                _btnOrigScale = GetOriginalScale(_btnRect);
                _btnUpScale = new Vector3(_btnOrigScale.x * scaleUp, _btnOrigScale.y * scaleUp, _btnOrigScale.z);
                _btnDownScale = new Vector3(_btnOrigScale.x * scaleDown, _btnOrigScale.y * scaleDown, _btnOrigScale.z);

                if (handRect)
                {
                    _handOrigScale = GetOriginalScale(handRect);
                    _handPressScaleVec = new Vector3(_handOrigScale.x * handPressScale, _handOrigScale.y * handPressScale, _handOrigScale.z);

                    _handFromPos = handRect.position;
                    _handToPos = GetTargetWorldPos(handRect, _btnRect);

                    _t = 0f;
                    _step = Step.MoveHand;
                }
                else
                {
                    _t = 0f;
                    _step = Step.ShowBorder;
                }

                if (debugLog) Debug.Log("[Seq] Prepare idx=" + _idx + " btn=" + _btnRect.name);
                break;

            case Step.MoveHand:
                if (!handRect || _btnRect == null)
                {
                    _step = Step.ShowBorder;
                    _t = 0f;
                    break;
                }

                // move hand tween
                _t += dt;
                float md = Mathf.Max(0f, handMoveDuration);
                if (md <= 0f)
                {
                    handRect.position = _handToPos;
                    _t = 0f;
                    _step = Step.ShowBorder;
                }
                else
                {
                    float p = Mathf.Clamp01(_t / md);
                    handRect.position = Vector3.LerpUnclamped(_handFromPos, _handToPos, p);
                    if (p >= 1f)
                    {
                        _t = 0f;
                        _step = Step.ShowBorder;
                    }
                }
                break;

            case Step.ShowBorder:
                if (_btnRect != null)
                    ShowBorderAt(_btnRect); // bật border sau khi move xong
                _t = 0f;
                _step = handRect ? Step.PressDown : Step.BtnScaleUp;
                break;

            case Step.PressDown:
                if (!handRect)
                {
                    _step = Step.BtnScaleUp;
                    _t = 0f;
                    break;
                }
                _t += dt;
                {
                    float half = Mathf.Max(0f, handPressDuration) * 0.5f;
                    if (half <= 0f)
                    {
                        handRect.localScale = _handPressScaleVec;
                        _t = 0f;
                        _step = Step.PressUp;
                    }
                    else
                    {
                        float p = Mathf.Clamp01(_t / half);
                        handRect.localScale = Vector3.LerpUnclamped(_handOrigScale, _handPressScaleVec, p);
                        if (p >= 1f)
                        {
                            _t = 0f;
                            _step = Step.PressUp;
                        }
                    }
                }
                break;

            case Step.PressUp:
                if (!handRect)
                {
                    _step = Step.HideBorderAfterPress;
                    _t = 0f;
                    break;
                }
                _t += dt;
                {
                    float half = Mathf.Max(0f, handPressDuration) * 0.5f;
                    if (half <= 0f)
                    {
                        handRect.localScale = _handOrigScale;
                        _t = 0f;
                        _step = Step.HideBorderAfterPress;
                    }
                    else
                    {
                        float p = Mathf.Clamp01(_t / half);
                        handRect.localScale = Vector3.LerpUnclamped(_handPressScaleVec, _handOrigScale, p);
                        if (p >= 1f)
                        {
                            _t = 0f;
                            _step = Step.HideBorderAfterPress;
                        }
                    }
                }
                break;

            case Step.HideBorderAfterPress:
                // ấn xong -> tắt border
                HideBorder();
                _t = 0f;
                _step = Step.DelayAfterPress;
                break;

            case Step.DelayAfterPress:
                _t += dt;
                if (_t >= Mathf.Max(0f, delayAfterHandPress))
                {
                    _t = 0f;
                    _step = Step.BtnScaleUp;
                }
                break;

            case Step.BtnScaleUp:
                if (_btnRect == null) { _step = Step.Gap; _t = 0f; break; }
                if (TweenScaleStep(_btnRect, _btnOrigScale, _btnUpScale, scaleUpDuration, ref _t, dt))
                {
                    _t = 0f;
                    _step = Step.BtnScaleDown;
                }
                break;

            case Step.BtnScaleDown:
                if (_btnRect == null) { _step = Step.Gap; _t = 0f; break; }
                if (TweenScaleStep(_btnRect, _btnUpScale, _btnDownScale, scaleDownDuration, ref _t, dt))
                {
                    _t = 0f;
                    _step = Step.BtnScaleBack;
                }
                break;

            case Step.BtnScaleBack:
                if (_btnRect == null) { _step = Step.Gap; _t = 0f; break; }
                if (TweenScaleStep(_btnRect, _btnDownScale, _btnOrigScale, scaleBackDuration, ref _t, dt))
                {
                    // optional click
                    if (invokeButtonClickEvent)
                    {
                        var b = buttons[_idx];
                        if (b) b.onClick?.Invoke();
                    }

                    _t = 0f;
                    _step = Step.Gap;
                }
                break;

            case Step.Gap:
                _t += dt;
                if (_t >= Mathf.Max(0f, gapBetweenButtons))
                {
                    _t = 0f;
                    GoNext();
                }
                break;
        }
    }

    // ===== helpers =====

    private bool TweenScaleStep(Transform t, Vector3 from, Vector3 to, float duration, ref float timer, float dt)
    {
        duration = Mathf.Max(0f, duration);
        if (duration <= 0f)
        {
            t.localScale = to;
            return true;
        }

        timer += dt;
        float p = Mathf.Clamp01(timer / duration);
        t.localScale = Vector3.LerpUnclamped(from, to, p);
        return p >= 1f;
    }

    private bool TryGetCurrentButtonRect(out RectTransform rt)
    {
        rt = null;
        if (_idx < 0 || _idx >= buttons.Count) return false;

        var btn = buttons[_idx];
        if (!btn) return false;
        if (!btn.gameObject.activeInHierarchy) return false;

        rt = btn.transform as RectTransform;
        return rt != null;
    }

    private void GoNext()
    {
        if (!_running) return;

        int last = buttons.Count - 1;
        if (_idx >= last)
        {
            if (!loop)
            {
                StopSequence();
                return;
            }
            _idx = 0;
            // reset for loop: place hand instantly to first, border off
            Canvas.ForceUpdateCanvases();
            PlaceHandInstantForCurrent();
            HideBorder();
            _step = Step.PrepareButton;
            _t = 0f;
            if (debugLog) Debug.Log("[Seq] Loop to 0");
        }
        else
        {
            _idx++;
            _step = Step.PrepareButton;
            _t = 0f;
        }
    }

    private void PlaceHandInstantForCurrent()
    {
        if (!handRect) return;
        RectTransform rt;
        if (!TryGetCurrentButtonRect(out rt)) return;
        handRect.position = GetTargetWorldPos(handRect, rt);
    }

    private void BringButtonToFront(RectTransform btnRect)
    {
        if (!btnRect) return;
        Transform parent = buttonsParent != null ? buttonsParent : btnRect.parent;
        if (!parent) return;

        if (forceReparentIntoButtonsParent && btnRect.parent != parent)
            btnRect.SetParent(parent, worldPositionStays: true);

        btnRect.SetAsLastSibling();

        if (rebuildLayoutAfterReorder && parent is RectTransform prt)
            LayoutRebuilder.ForceRebuildLayoutImmediate(prt);

        // playable: force update để vị trí ổn định
        Canvas.ForceUpdateCanvases();
    }

    private void ShowBorderAt(RectTransform targetBtnRect)
    {
        if (!borderRect || !targetBtnRect) return;

        if (!borderRect.gameObject.activeSelf)
            borderRect.gameObject.SetActive(true);

        Vector3 p = targetBtnRect.position;
        p.z = borderRect.position.z;
        borderRect.position = p;

        borderRect.SetAsLastSibling();
    }

    private void HideBorder()
    {
        if (borderRect && borderRect.gameObject.activeSelf)
            borderRect.gameObject.SetActive(false);
    }

    private Vector3 GetOriginalScale(Transform t)
    {
        if (!t) return Vector3.one;

        Vector3 s;
        if (_originalScales.TryGetValue(t, out s)) return s;

        s = t.localScale;
        _originalScales[t] = s;
        return s;
    }

    private Vector3 GetTargetWorldPos(RectTransform mover, RectTransform targetBtnRect)
    {
        Vector3 p = targetBtnRect.position;
        p.z = mover.position.z;
        return p;
    }

    private float DtSafe()
    {
        float dt = useUnscaledTime ? Time.unscaledDeltaTime : Time.deltaTime;
        if (dt <= 0f) dt = 1f / 60f; // fallback để không bị kẹt trong playable
        return dt;
    }
}
