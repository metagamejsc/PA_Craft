using DG.Tweening;
using Minigames.StealTheBrainrot.Turtorial;
using Spine.Unity;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public static GameController Instance;
        [SerializeField] private float _width = 150f;
        [SerializeField] private float _height = 80f;
        [SerializeField] private float _duration = 2.5f;
        [SerializeField] private int _pointCount = 12;
        [SerializeField] private GameObject _hand;
        [SerializeField] private SkeletonGraphic _animHand;
        [SerializeField] private GameObject _infinity;
        [SerializeField] private Button _btnSteal;
        [SerializeField] private TurtorialLineIndicator _tutLine;
        [SerializeField] private Transform _player;
        [SerializeField] private Transform _monster;

        private Vector3 _originLocalPosition;
        private Tween _tween;
        private bool _firstTut;

        private void Awake()
        {
            Instance = this;
            _originLocalPosition = _hand.transform.localPosition;
        }

        private void Update()
        {
            if (Input.GetMouseButtonDown(0) && !_firstTut)
            {
                _tween.Kill();
                _firstTut = false;
                _infinity.SetActive(false);
                _hand.SetActive(false);
            }
        }

        private void Start()
        {
            _btnSteal.onClick.AddListener(() => { GameManager.Instance.EndGame(); });
            Play();
            _tutLine.StartDraw(_monster, _player);
        }


        private void Play()
        {
            _tween?.Kill();

            Vector3[] path = BuildInfinityPath();

            _tween = _hand.transform.DOLocalPath(path, _duration, PathType.CatmullRom)
                .SetOptions(true)
                .SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Restart);
        }

        private Vector3[] BuildInfinityPath()
        {
            Vector3[] points = new Vector3[_pointCount];

            for (int i = 0; i < _pointCount; i++)
            {
                float t = (i / (float)_pointCount) * Mathf.PI * 2f;
                float x = Mathf.Sin(t) * _width;
                float y = Mathf.Sin(t) * Mathf.Cos(t) * _height;
                points[i] = _originLocalPosition + new Vector3(x, y, 0f);
            }

            return points;
        }

        public void Steal()
        {
            _hand.transform.position = _btnSteal.transform.position;
            _hand.transform.parent = _btnSteal.transform;
            _btnSteal.gameObject.SetActive(true);
            _hand.gameObject.SetActive(true);
            _animHand.AnimationState.SetAnimation(0, "tab", true);
        }

        public void UnSteal()
        {
            _hand.gameObject.SetActive(false);
            _btnSteal.gameObject.SetActive(false);
        }
    }
}