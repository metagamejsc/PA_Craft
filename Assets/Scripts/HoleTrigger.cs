using UnityEngine;
using UnityEngine.Serialization;

[DisallowMultipleComponent]
public class HoleTrigger : MonoBehaviour
{
    [Header("Black Hole")]
    [FormerlySerializedAs("snapPoint")]
    [SerializeField] private Transform attractPoint;
    [SerializeField] private Transform dropPoint;
    [SerializeField] private float extraSinkOffset = 0.5f;

    private static readonly System.Collections.Generic.List<HoleTrigger> ActiveHoles = new System.Collections.Generic.List<HoleTrigger>(8);
    private Collider cachedCollider;

    private void Awake()
    {
        cachedCollider = GetComponent<Collider>();
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
        return attractPoint != null ? attractPoint.position : transform.position;
    }

    public Vector3 GetDropPosition()
    {
        if (dropPoint != null)
        {
            return dropPoint.position;
        }

        return GetSnapPosition() + (Vector3.up * 6f) + (transform.forward * 3f);
    }

    public float GetExtraSinkOffset()
    {
        if (cachedCollider != null)
        {
            return cachedCollider.bounds.extents.y;
        }

        return extraSinkOffset;
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
}
