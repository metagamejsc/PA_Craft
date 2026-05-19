using UnityEngine;
using UnityEngine.Events;

[RequireComponent(typeof(Collider))]
public class RunnerInteractableItem : MonoBehaviour
{
    [Header("Trigger")]
    [SerializeField] private string playerTag = "Player";
    [SerializeField] private bool triggerOnce = true;
    [SerializeField] private bool destroyAfterTrigger = true;

    [Header("Effect")]
    [SerializeField] private GameObject effectPrefab;
    [SerializeField] private Transform effectSpawnPoint;
    [SerializeField] private bool parentEffectToPlayer;
    [SerializeField] private float effectLifetime = 2f;

    [Header("Events")]
    public UnityEvent<GameObject> onTriggered;

    private bool triggered;

    private void Reset()
    {
        Collider itemCollider = GetComponent<Collider>();
        itemCollider.isTrigger = true;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (triggerOnce && triggered)
            return;

        if (!other.CompareTag(playerTag))
            return;

        triggered = true;
        SpawnEffect(other.gameObject);
        onTriggered?.Invoke(other.gameObject);

        if (destroyAfterTrigger)
            Destroy(gameObject);
        else if (triggerOnce)
            gameObject.SetActive(false);
    }

    private void SpawnEffect(GameObject player)
    {
        if (effectPrefab == null)
            return;

        Transform spawnPoint = effectSpawnPoint != null ? effectSpawnPoint : transform;
        Transform parent = parentEffectToPlayer ? player.transform : null;
        GameObject effect = Instantiate(effectPrefab, spawnPoint.position, spawnPoint.rotation, parent);

        if (effectLifetime > 0f)
            Destroy(effect, effectLifetime);
    }
}
