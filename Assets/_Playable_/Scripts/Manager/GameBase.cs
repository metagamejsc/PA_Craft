using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.Manager
{
    public class GameBase : MonoBehaviour
    {
        [Header("Luna Field")] [LunaPlaygroundField("Total Event For CTA")] [SerializeField]
        protected int _totalEvent;

        [LunaPlaygroundField("End Time")] [SerializeField]
        protected int _endTime = 30;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        protected AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture")] [SerializeField]
        protected Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        private int _quantityEvent = 0;
        protected AudioManager _audioManager;

        private void Start()
        {
            _btnBlock.onClick.AddListener(CallToAction);
            _btnBlock.gameObject.SetActive(false);

            _background.sprite = CreateSprite(_backgroundTexture);
            _audioManager = AudioManager.Instance;
            _audioManager.PlayMusic(_backgroundMusic);

            StartCoroutine(IECountdownEndGame());
        }

        private void CallToAction()
        {
            Debug.Log("Call To Action");
            Luna.Unity.Playable.InstallFullGame();
        }

        protected void EndGame()
        {
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            Luna.Unity.LifeCycle.GameEnded();
        }

        protected void CountEvent()
        {
            _quantityEvent++;
            if (_quantityEvent >= _totalEvent)
            {
                EndGame();
            }
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSeconds(_endTime);
            EndGame();
        }

        protected Sprite CreateSprite(Texture2D texture)
        {
            return Sprite.Create(
                texture,
                new Rect(0f, 0f, texture.width, texture.height),
                new Vector2(0.5f, 0.5f));
        }
    }
}