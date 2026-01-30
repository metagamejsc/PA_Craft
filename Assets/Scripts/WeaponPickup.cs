using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Collider))]
public class WeaponPickup : MonoBehaviour, IInteractable
{
    public int value = 5; // có thể âm để trừ điểm
    public bool destroyOnPickup = true;

    Collider col;
    bool used;

    public WorldValueLabelTMP label;

    void Awake()
    {
        col = GetComponent<Collider>();
        col.isTrigger = true;

        if (!label) label = GetComponent<WorldValueLabelTMP>();
        if (!label) label = gameObject.AddComponent<WorldValueLabelTMP>();

        label.SetValue(value);
    }


    public bool CanInteract(PlayerInteractionController player)
        => !used && player != null && !player.IsDead;

    public IEnumerator Interact(PlayerInteractionController player)
    {
        player.IsBusy = true;
        used = true;
        if (col) col.enabled = false;

        // play anim nhặt
        yield return player.PlayPickup();
        player.IsBusy = false;
        // cộng/trừ điểm
        player.Stats.AddPoints(value);

        if (destroyOnPickup) Destroy(gameObject);
        else gameObject.SetActive(false);
    }

    public Transform GetTransform()
    {
        return transform;
    }
}