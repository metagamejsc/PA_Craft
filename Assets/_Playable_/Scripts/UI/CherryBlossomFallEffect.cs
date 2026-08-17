using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(RectTransform))]
public class CherryBlossomFallEffect : MonoBehaviour
{
    private class Petal
    {
        public RectTransform Rect;
        public float Speed;
        public float SwayAmplitude;
        public float SwayFrequency;
        public float SwayPhase;
        public float RotationSpeed;
    }

    [Header("Setup")]
    [Tooltip("De trong se tu lay RectTransform tren chinh GameObject nay.")]
    [SerializeField] private RectTransform _spawnArea;
    [Tooltip("Neu co Canvas cha, script se dung khung cua Canvas de bao phu toan man hinh.")]
    [SerializeField] private bool _useParentCanvasViewport = true;
    [SerializeField] private Sprite _petalSprite;
    [Tooltip("Nen de 12-14 tren playable ad de nhe may. Tang neu can hieu ung day hon.")]
    [SerializeField] private int _petalCount = 14;

    [Header("Fall")]
    [SerializeField] private Vector2 _fallSpeedRange = new Vector2(80f, 160f);
    [Tooltip("Goc lech so voi phuong thang dung, do. Duong = troi ve phai khi roi, am = troi ve trai.")]
    [SerializeField] private float _diagonalAngle = 20f;
    [SerializeField] private Vector2 _swayAmplitudeRange = new Vector2(10f, 30f);
    [SerializeField] private Vector2 _swayFrequencyRange = new Vector2(0.5f, 1.5f);
    [SerializeField] private Vector2 _rotationSpeedRange = new Vector2(-90f, 90f);
    [SerializeField] private Vector2 _petalSizeRange = new Vector2(30f, 50f);

    private Petal[] _petals;
    private float _halfWidth;
    private float _halfHeight;
    private float _spawnMarginX;
    private Vector2 _fallDirection;
    private Vector2 _lastViewportSize;
    private bool _initialized;

    private void Awake()
    {
        if (_spawnArea == null)
        {
            _spawnArea = GetComponent<RectTransform>();
        }
    }

    private void Start()
    {
        RefreshViewportBounds(true);

        float rad = _diagonalAngle * Mathf.Deg2Rad;
        _fallDirection = new Vector2(Mathf.Sin(rad), -Mathf.Cos(rad));

        _petals = new Petal[_petalCount];
        for (int i = 0; i < _petalCount; i++)
        {
            _petals[i] = CreatePetal();
            RandomizePosition(_petals[i], true);
        }

        _initialized = true;
    }


    private void OnRectTransformDimensionsChange()
    {
        if (!_initialized)
        {
            return;
        }

        RefreshViewportBounds(false);
    }

    private void RefreshViewportBounds(bool forceRedistribute)
    {
        RectTransform viewport = ResolveViewport();
        if (viewport == null)
        {
            viewport = _spawnArea;
        }

        Vector2 currentSize = viewport.rect.size;
        bool sizeChanged = currentSize != _lastViewportSize;

        _lastViewportSize = currentSize;
        _halfWidth = currentSize.x * 0.5f;
        _halfHeight = currentSize.y * 0.5f;
        _spawnMarginX = _halfWidth * 0.3f + Mathf.Abs(_fallSpeedRange.y) * 0.3f;

        if (forceRedistribute || sizeChanged)
        {
            RedistributeAllPetals();
        }
    }

    private RectTransform ResolveViewport()
    {
        if (!_useParentCanvasViewport || _spawnArea == null)
        {
            return _spawnArea;
        }

        Canvas canvas = _spawnArea.GetComponentInParent<Canvas>();
        if (canvas != null)
        {
            return canvas.GetComponent<RectTransform>();
        }

        return _spawnArea;
    }

    private void RedistributeAllPetals()
    {
        if (_petals == null)
        {
            return;
        }

        for (int i = 0; i < _petals.Length; i++)
        {
            if (_petals[i] != null && _petals[i].Rect != null)
            {
                RandomizePosition(_petals[i], true);
            }
        }
    }

    private Petal CreatePetal()
    {
        GameObject go = new GameObject("Petal", typeof(RectTransform), typeof(Image));
        RectTransform rect = go.GetComponent<RectTransform>();
        rect.SetParent(ResolveViewport() ?? _spawnArea, false);
        rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0.5f, 0.5f);

        float size = Random.Range(_petalSizeRange.x, _petalSizeRange.y);
        rect.sizeDelta = new Vector2(size, size);

        Image img = go.GetComponent<Image>();
        img.sprite = _petalSprite;
        img.raycastTarget = false;
        img.maskable = false;
        img.preserveAspect = true;

        return new Petal
        {
            Rect = rect,
            Speed = Random.Range(_fallSpeedRange.x, _fallSpeedRange.y),
            SwayAmplitude = Random.Range(_swayAmplitudeRange.x, _swayAmplitudeRange.y),
            SwayFrequency = Random.Range(_swayFrequencyRange.x, _swayFrequencyRange.y),
            SwayPhase = Random.Range(0f, Mathf.PI * 2f),
            RotationSpeed = Random.Range(_rotationSpeedRange.x, _rotationSpeedRange.y)
        };
    }

  
    private void RandomizePosition(Petal petal, bool spreadAcrossScreen)
    {
        float x = Random.Range(-_halfWidth - _spawnMarginX, _halfWidth + _spawnMarginX);
        float y = spreadAcrossScreen
            ? Random.Range(-_halfHeight, _halfHeight)
            : _halfHeight + Random.Range(0f, 80f);
        petal.Rect.anchoredPosition = new Vector2(x, y);
    }

    private void Update()
    {
        if (!_initialized)
        {
            return;
        }

        RefreshViewportBounds(false);

        float time = Time.time;
        float deltaTime = Time.deltaTime;
        float boundX = _halfWidth + _spawnMarginX + 40f;
        float boundYBottom = -_halfHeight - 60f;

        for (int i = 0; i < _petals.Length; i++)
        {
            Petal p = _petals[i];
            Vector2 pos = p.Rect.anchoredPosition;

            pos += _fallDirection * (p.Speed * deltaTime);
            pos.x += Mathf.Sin(time * p.SwayFrequency + p.SwayPhase) * p.SwayAmplitude * deltaTime;

            p.Rect.anchoredPosition = pos;
            p.Rect.Rotate(0f, 0f, p.RotationSpeed * deltaTime);

            if (pos.y < boundYBottom || pos.x < -boundX || pos.x > boundX)
            {
                RandomizePosition(p, false);
            }
        }
    }
}
