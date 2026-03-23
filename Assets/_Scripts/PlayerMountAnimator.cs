using UnityEngine;

public class PlayerMountAnimator : MonoBehaviour
{
    [Header("Animator")]
    public Animator animator;

    [Header("Animation Parameters")]
    public string jumpTrigger = "Jump";
    public string isRidingBool = "IsRiding";

    [Header("Audio")]
    public AudioSource audioSource;
    public AudioClip jumpClip;

    void Reset()
    {
        animator = GetComponent<Animator>();
        audioSource = GetComponent<AudioSource>();
    }

    public void PlayJump()
    {
        if (animator != null)
        {
            animator.ResetTrigger(jumpTrigger);
            animator.SetTrigger(jumpTrigger);
        }

        if (audioSource != null && jumpClip != null)
        {
            audioSource.PlayOneShot(jumpClip);
        }
    }

    public void SetRiding(bool value)
    {
        if (animator != null)
        {
            animator.SetBool(isRidingBool, value);
        }
    }
}