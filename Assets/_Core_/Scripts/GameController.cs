using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using TMPro;

public class GameController : MonoBehaviour
{
    [Header("UI")] [SerializeField] private Button _btnDog;
    [SerializeField] private Button _btnBirds;
    [SerializeField] private Button _btnMeat;
    [SerializeField] private Button _btnEggs;
    [SerializeField] private GameObject _step1;
    [SerializeField] private GameObject _step2;
    [SerializeField] private GameObject _hand;
    [SerializeField] private Transform _point1;
    [SerializeField] private Transform _point2;
    [SerializeField] private float _handMoveDuration = 0.6f;
    [SerializeField] private float _handStartDelay = 0.2f;
    [SerializeField] private Vector3 _handPressScale = new Vector3(0.9f, 0.9f, 0.9f);
    [SerializeField] private float _handPressDuration = 0.15f;
    [SerializeField] private TMP_Text _txtTut;
    [SerializeField] private Vector3 _txtTutPunchScale = new Vector3(0.9f, 0.9f, 0.9f);
    [SerializeField] private float _txtTutPulseDuration = 0.35f;

    [SerializeField] private House _house;
    [SerializeField] private LunaManager _luna;

    private RectTransform _handRect;
    private Tween _handLoopTween;
    private Tween _txtTutLoopTween;

    private void Awake()
    {
        _handRect = _hand.GetComponent<RectTransform>();
    }

    private void Start()
    {
        _btnDog.onClick.AddListener(() =>
        {
            _house.ShowDog();
            Step2();
        });
        _btnBirds.onClick.AddListener(() =>
        {
            _house.ShowBird();
            Step2();
        });
        _btnMeat.onClick.AddListener(() =>
        {
            _house.ShowMeat();
            _luna.ShowEndCardEmpty();
            _handLoopTween?.Kill();
            _txtTutLoopTween?.Kill();
            _hand.SetActive(false);
            _txtTut.gameObject.SetActive(false);
        });
        _btnEggs.onClick.AddListener(() =>
        {
            _house.ShowEggs();
            _luna.ShowEndCardEmpty();
            _handLoopTween?.Kill();
            _txtTutLoopTween?.Kill();
            _hand.SetActive(false);
            _txtTut.gameObject.SetActive(false);
        });
        Step1();
    }

    private void Step1()
    {
        _step2.SetActive(false);
        _step1.SetActive(true);
        _hand.SetActive(true);
        _txtTut.gameObject.SetActive(true);
        PlayHandLoop();
        _txtTut.text = "Choose your pet!";
        PlayTxtTutLoop();
    }

    private void Step2()
    {
        _step1.SetActive(false);
        _step2.SetActive(true);
        _hand.SetActive(true);
        _txtTut.gameObject.SetActive(true);
        PlayHandLoop();
        _txtTut.text = "Give them a treat";
        PlayTxtTutLoop();
    }

    private void PlayHandLoop()
    {
        if (_handRect == null || _point1 == null || _point2 == null)
        {
            return;
        }

        _handLoopTween?.Kill();
        _handRect.DOKill();

        Vector2 fromPosition = GetAnchoredPositionInParent(_point1);
        Vector2 toPosition = GetAnchoredPositionInParent(_point2);

        _handRect.anchoredPosition = fromPosition;
        _handRect.localScale = Vector3.one;

        Sequence sequence = DOTween.Sequence();
        sequence.AppendInterval(_handStartDelay);
        sequence.Append(_handRect.DOScale(_handPressScale, _handPressDuration));
        sequence.Append(_handRect.DOScale(Vector3.one, _handPressDuration));
        sequence.Append(_handRect.DOAnchorPos(toPosition, _handMoveDuration).SetEase(Ease.InOutSine));
        sequence.Append(_handRect.DOScale(_handPressScale, _handPressDuration));
        sequence.Append(_handRect.DOScale(Vector3.one, _handPressDuration));
        sequence.Append(_handRect.DOAnchorPos(fromPosition, _handMoveDuration).SetEase(Ease.InOutSine));
        sequence.SetLoops(-1, LoopType.Restart).SetEase(Ease.Linear);

        _handLoopTween = sequence;
    }

    private void PlayTxtTutLoop()
    {
        if (_txtTut == null)
        {
            return;
        }

        _txtTutLoopTween?.Kill();
        _txtTut.transform.DOKill();
        _txtTut.transform.localScale = Vector3.one;

        Sequence sequence = DOTween.Sequence();
        sequence.Append(_txtTut.transform.DOScale(_txtTutPunchScale, _txtTutPulseDuration));
        sequence.Append(_txtTut.transform.DOScale(Vector3.one, _txtTutPulseDuration));
        sequence.SetLoops(-1, LoopType.Restart).SetEase(Ease.Linear);

        _txtTutLoopTween = sequence;
    }

    private Vector2 GetAnchoredPositionInParent(Transform target)
    {
        RectTransform parentRect = _handRect.parent as RectTransform;
        if (parentRect == null)
        {
            return _handRect.anchoredPosition;
        }

        Vector3 worldPosition = target.position;
        Vector2 localPosition = parentRect.InverseTransformPoint(worldPosition);
        return localPosition;
    }

    private void OnDisable()
    {
        _handLoopTween?.Kill();
        _txtTutLoopTween?.Kill();
    }

    private void OnDestroy()
    {
        _handLoopTween?.Kill();
        _txtTutLoopTween?.Kill();
    }
}
