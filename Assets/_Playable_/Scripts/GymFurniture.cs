using UnityEngine;

namespace Playable
{
    public class GymFurniture : MonoBehaviour
    {
        [SerializeField] private Transform _posPlayer;
        [SerializeField] private Collider _interactionCollider;
        [SerializeField] private GameObject _arrow;

        public Transform PosPlayer => _posPlayer;

        private void Awake()
        {
            if (_interactionCollider == null) _interactionCollider = GetComponent<Collider>();
        }

        public bool Contains(Collider hitCollider)
        {
            return hitCollider != null
                   && (hitCollider.transform == transform
                       || hitCollider.transform.IsChildOf(transform));
        }

        public bool ContainsPoint(Vector3 worldPoint)
        {
            if (_interactionCollider == null) return false;
            return (_interactionCollider.ClosestPoint(worldPoint) - worldPoint).sqrMagnitude <= 0.0001f;
        }

        public void DeactivateArrow()
        {
            if (_arrow != null) _arrow.SetActive(false);
        }
    }
}
