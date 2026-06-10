using UnityEngine;

namespace Controller.Player
{
    public class PlayerController : MonoBehaviour
    {
        [SerializeField] private PlayerInfo _info;
        [SerializeField] private PlayerMovement _movement;
        [SerializeField] private PlayerInput _input;
        [SerializeField] private Camera _playerCamera;
        [SerializeField] private GameObject _flowerPrefab;
        [SerializeField] private LayerMask _groundLayer;
        [SerializeField] private LayerMask _flowerLayer;
        [SerializeField] private float _viewRayDistance = 10f;
        [SerializeField] private float _groundRayDistance = 20f;
        [SerializeField] private LunaManager _luna;
        [SerializeField] private GameObject _text;
        [SerializeField] private AudioClip _plantSound;
        [SerializeField] [Range(0f, 1f)] private float _plantSoundVolume = 1f;

        private bool _hasPlantedFirstFlower;


        private void Start()
        {
            if (_playerCamera == null)
            {
                _playerCamera = Camera.main;
            }

            if (_movement && _input) _movement.Initialize(_info, _input);
        }

        public void UseHeldItem()
        {
            if (_playerCamera == null || _flowerPrefab == null)
            {
                return;
            }


            Ray centerRay = _playerCamera.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0f));
            if (!Physics.Raycast(centerRay, out RaycastHit viewHit, _viewRayDistance, Physics.DefaultRaycastLayers,
                    QueryTriggerInteraction.Ignore))
            {
                return;
            }

            Vector3 groundRayOrigin = viewHit.point + (Vector3.up * 0.5f);
            if (!Physics.Raycast(
                    groundRayOrigin,
                    Vector3.down,
                    out RaycastHit groundHit,
                    _groundRayDistance,
                    Physics.DefaultRaycastLayers,
                    QueryTriggerInteraction.Ignore))
            {
                return;
            }

            if (!IsGroundLayer(groundHit.collider.gameObject.layer))
            {
                return;
            }

            Vector3 spawnPosition = groundHit.point;
            if (IsFlowerLayer(groundHit.collider.gameObject.layer))
            {
                spawnPosition.x = Random.Range(spawnPosition.x + 3f, spawnPosition.x - 3f);
                spawnPosition.z = Random.Range(spawnPosition.z + 3f, spawnPosition.z - 3f);
            }

            Quaternion spawnRotation = Quaternion.FromToRotation(Vector3.up, groundHit.normal);
            Instantiate(_flowerPrefab, spawnPosition, spawnRotation);
            PlayPlantSound(spawnPosition);

            if (!_hasPlantedFirstFlower)
            {
                _hasPlantedFirstFlower = true;
                if (_text != null)
                {
                    _text.SetActive(true);
                }
            }

            _luna.CheckClickShowEndCard();
        }

        private bool IsGroundLayer(int layer)
        {
            return (_groundLayer.value & (1 << layer)) != 0;
        }

        private bool IsFlowerLayer(int layer)
        {
            return (_flowerLayer.value & (1 << layer)) != 0;
        }

        private void PlayPlantSound(Vector3 worldPosition)
        {
            if (_plantSound != null)
            {
                AudioSource.PlayClipAtPoint(_plantSound, worldPosition, _plantSoundVolume);
            }
        }
    }
}
