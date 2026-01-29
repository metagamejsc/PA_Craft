using System.Collections;
using UnityEngine;

[RequireComponent(typeof(PlayerStats))]
public class PlayerInteractionController : MonoBehaviour
{
    public SimplePathMover mover;
    public Animator animator;

    [Header("Timings (fallback if no animation events)")]
    public float pickupAnimTime = 0.7f;
    public float fightAnimTime = 0.9f;
    public float dieAnimTime = 1.2f;

    public bool IsBusy { get; private set; }
    public bool IsDead { get; private set; }

    PlayerStats stats;

    void Awake()
    {
        stats = GetComponent<PlayerStats>();
        if (mover == null) mover = GetComponent<SimplePathMover>();
    }

    void OnTriggerEnter(Collider other)
    {
        if (IsDead || IsBusy) return;

        var interactable = other.GetComponentInParent<IInteractable>();
        if (interactable == null) return;

        if (!interactable.CanInteract(this)) return;

        StartCoroutine(DoInteract(interactable));
    }

    IEnumerator DoInteract(IInteractable interactable)
    {
        IsBusy = true;

        // stop movement while interacting
        if (mover != null)
        {
            mover.isMoving = false;
            mover.pathQueue.Clear();
        }
        if (animator) animator.SetBool("isMoving", false);

        yield return interactable.Interact(this);

        IsBusy = false;
    }

    public PlayerStats Stats => stats;

    // Helpers để object gọi dùng
    public IEnumerator PlayPickup()
    {
        if (animator) animator.SetTrigger("Pickup");
        yield return new WaitForSeconds(pickupAnimTime);
    }

    public IEnumerator PlayFight()
    {
        if (animator) animator.SetTrigger("Fight");
        yield return new WaitForSeconds(fightAnimTime);
    }

    public IEnumerator PlayDie()
    {
        IsDead = true;
        if (animator) animator.SetTrigger("Die");
        yield return new WaitForSeconds(dieAnimTime);
    }

    public IEnumerator MoveNear(Vector3 targetPos, float stopDistance)
    {
        if (mover == null)
        {
            // fallback: không có mover thì đứng yên
            yield break;
        }

        // đi thẳng tới 1 điểm (mover bám ground sẽ tự lên dốc/tầng)
        mover.stopDistance = stopDistance;
        mover.MoveAlongPath(new System.Collections.Generic.List<Vector3> { targetPos });

        while (mover.isMoving && !IsDead)
            yield return null;
    }
}
