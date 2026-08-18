using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Camera _targetCamera;

        [SerializeField] private Button _buildButton;
        [SerializeField] private GameObject _selectedBlockPrefab;
        [SerializeField] private Transform _blockParent;

        [Header("Build")] [SerializeField] private LayerMask _buildSurfaceMask = ~0;
        [SerializeField, Min(0.1f)] private float _buildDistance = 10f;
        [SerializeField, Min(0f)] private float _buildCastRadius = 0.25f;

        private HotbarItem _selectedHotbarItem;

        private void Awake()
        {
            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;
            }
        }

        private void OnEnable()
        {
            if (_buildButton != null)
            {
                _buildButton.onClick.AddListener(BuildBlock);
            }

            EventBus.Subscribe<CollectItemEvent>(OnCollectItem);
        }

        private void OnDisable()
        {
            if (_buildButton != null)
            {
                _buildButton.onClick.RemoveListener(BuildBlock);
            }

            EventBus.Unsubscribe<CollectItemEvent>(OnCollectItem);
        }

        public void BuildBlock()
        {
            if (_targetCamera == null)
            {
                return;
            }

            if (_selectedBlockPrefab == null)
            {
                return;
            }

            if (_selectedHotbarItem != null && !_selectedHotbarItem.CanSpawn)
            {
                return;
            }

            Ray ray = _targetCamera.ViewportPointToRay(new Vector3(0.5f, 0.5f));
            if (!TryGetBuildHit(ray, out RaycastHit hit))
            {
                return;
            }

            GameObject block = Instantiate(_selectedBlockPrefab, Vector3.zero, Quaternion.identity, _blockParent);
            if (!TryGetBlockBounds(block, out Bounds blockBounds))
            {
                Destroy(block);
                return;
            }

            Bounds targetBounds = hit.collider.bounds;
            Vector3 faceDirection = GetFaceDirection(hit.normal);
            Vector3 desiredBoundsCenter = targetBounds.center;

            if (faceDirection.x != 0f)
            {
                desiredBoundsCenter.x += faceDirection.x * (targetBounds.extents.x + blockBounds.extents.x);
                desiredBoundsCenter.y = targetBounds.min.y + blockBounds.extents.y;
            }
            else if (faceDirection.y != 0f)
            {
                desiredBoundsCenter.y += faceDirection.y * (targetBounds.extents.y + blockBounds.extents.y);
            }
            else
            {
                desiredBoundsCenter.z += faceDirection.z * (targetBounds.extents.z + blockBounds.extents.z);
                desiredBoundsCenter.y = targetBounds.min.y + blockBounds.extents.y;
            }

            block.transform.position += desiredBoundsCenter - blockBounds.center;

            if (_selectedHotbarItem != null)
            {
                _selectedHotbarItem.ConsumeOne();
            }

            GameManager.Instance.CountEvent();
            GameController.Instance.CompleteTut();
        }

        private bool TryGetBuildHit(Ray ray, out RaycastHit hit)
        {
            if (_buildCastRadius <= 0f)
            {
                return Physics.Raycast(
                    ray,
                    out hit,
                    _buildDistance,
                    _buildSurfaceMask,
                    QueryTriggerInteraction.Ignore);
            }

            return Physics.SphereCast(
                ray,
                _buildCastRadius,
                out hit,
                _buildDistance,
                _buildSurfaceMask,
                QueryTriggerInteraction.Ignore);
        }

        private void OnCollectItem(CollectItemEvent eventData)
        {
            _selectedHotbarItem = eventData.HotbarItem;
            SetSelectedBlock(eventData.ItemPrefab);
        }

        private static Vector3 GetFaceDirection(Vector3 normal)
        {
            float absoluteX = Mathf.Abs(normal.x);
            float absoluteY = Mathf.Abs(normal.y);
            float absoluteZ = Mathf.Abs(normal.z);

            if (absoluteX >= absoluteY && absoluteX >= absoluteZ)
            {
                return new Vector3(Mathf.Sign(normal.x), 0f, 0f);
            }

            if (absoluteY >= absoluteX && absoluteY >= absoluteZ)
            {
                return new Vector3(0f, Mathf.Sign(normal.y), 0f);
            }

            return new Vector3(0f, 0f, Mathf.Sign(normal.z));
        }

        private void SetSelectedBlock(GameObject blockPrefab)
        {
            _selectedBlockPrefab = blockPrefab;
        }

        private static bool TryGetBlockBounds(GameObject block, out Bounds bounds)
        {
            Collider[] colliders = block.GetComponentsInChildren<Collider>(true);
            if (colliders.Length > 0)
            {
                bounds = colliders[0].bounds;
                for (int i = 1; i < colliders.Length; i++)
                {
                    bounds.Encapsulate(colliders[i].bounds);
                }

                return true;
            }

            Renderer[] renderers = block.GetComponentsInChildren<Renderer>(true);
            if (renderers.Length > 0)
            {
                bounds = renderers[0].bounds;
                for (int i = 1; i < renderers.Length; i++)
                {
                    bounds.Encapsulate(renderers[i].bounds);
                }

                return true;
            }

            bounds = default;
            return false;
        }
    }
}
