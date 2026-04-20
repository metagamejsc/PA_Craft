using UnityEngine;

[DisallowMultipleComponent]
[RequireComponent(typeof(Collider))]
public class HoleTrigger : MonoBehaviour
{
    [SerializeField] private Transform snapPoint;

    private static readonly System.Collections.Generic.List<HoleTrigger> ActiveHoles = new System.Collections.Generic.List<HoleTrigger>(8);
    private Collider cachedCollider;

    private void Awake()
    {
        cachedCollider = GetComponent<Collider>();
        cachedCollider.isTrigger = true;
    }

    private void OnEnable()
    {
        if (!ActiveHoles.Contains(this))
        {
            ActiveHoles.Add(this);
        }
    }

    private void OnDisable()
    {
        ActiveHoles.Remove(this);
    }

    public Vector3 GetSnapPosition()
    {
        if (snapPoint != null)
        {
            return snapPoint.position;
        }

        return transform.position;
    }

    public float GetExtraSinkOffset()
    {
        return cachedCollider != null ? cachedCollider.bounds.extents.y : 0.5f;
    }

    public static HoleTrigger GetClosestHole(Vector3 worldPosition)
    {
        HoleTrigger closestHole = null;
        float closestDistanceSqr = float.MaxValue;

        for (int i = 0; i < ActiveHoles.Count; i++)
        {
            HoleTrigger hole = ActiveHoles[i];
            if (hole == null || !hole.isActiveAndEnabled)
            {
                continue;
            }

            Vector3 snapPosition = hole.GetSnapPosition();
            float distanceSqr = (snapPosition - worldPosition).sqrMagnitude;
            if (distanceSqr < closestDistanceSqr)
            {
                closestDistanceSqr = distanceSqr;
                closestHole = hole;
            }
        }

        return closestHole;
    }

    private void OnTriggerEnter(Collider other)
    {
        DraggableEnemy enemy = other.GetComponent<DraggableEnemy>();
        if (enemy == null)
        {
            enemy = other.GetComponentInParent<DraggableEnemy>();
        }

        if (enemy != null)
        {
            enemy.SetCurrentHole(this, true);
        }
    }

    private void OnTriggerExit(Collider other)
    {
        DraggableEnemy enemy = other.GetComponent<DraggableEnemy>();
        if (enemy == null)
        {
            enemy = other.GetComponentInParent<DraggableEnemy>();
        }

        if (enemy != null)
        {
            enemy.SetCurrentHole(this, false);
        }
    }
}
