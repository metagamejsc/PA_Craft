using DG.Tweening;
using UnityEngine;

public class IceProjectile : MonoBehaviour
{
    public GameObject iceSpikePrefab;
    public float speed = 20f;
    public float lifeTime = 5f;
    public float spikeDuration = 7f;

    public LayerMask triggerLayers;

    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rb.velocity = transform.forward * speed;
        Destroy(gameObject, lifeTime);
    }

    void OnTriggerEnter(Collider other)
    {
        if (((1 << other.gameObject.layer) & triggerLayers) == 0)
        {
            return;
        }

        BaseCharacter target = other.GetComponent<BaseCharacter>();
        if (target != null)
        {
            target.TakeDamage(1);
        }

        Destroy(gameObject);
    }
}
