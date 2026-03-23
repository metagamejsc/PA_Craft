using System.Collections;
using UnityEngine;

public class HorseMountAnimator : MonoBehaviour
{
    [Header("Animator")]
    public Animator animator;

    [Header("Animation Parameters")]
    public string jumpTrigger = "Jump";
    public string isMountedBool = "IsMounted";

    [Header("Audio")]
    public AudioSource idleSource;
    public AudioSource fxSource;
    public AudioClip[] idleClips;
    public AudioClip jumpClip;

    [Header("Idle Timing")]
    public float idleDelayMin = 2f;
    public float idleDelayMax = 5f;

    private Coroutine idleCoroutine;
    private int lastIdleIndex = -1;
    private bool stopIdle = false;

    void Reset()
    {
        animator = GetComponent<Animator>();
    }

    public void PlayJump()
    {
        if (animator != null)
        {
            animator.ResetTrigger(jumpTrigger);
            animator.SetTrigger(jumpTrigger);
        }

        if (fxSource != null && jumpClip != null)
        {
            fxSource.PlayOneShot(jumpClip);
        }
    }

    public void SetMounted(bool value)
    {
        if (animator != null)
        {
            animator.SetBool(isMountedBool, value);
        }
    }

    public void StartIdleLoop()
    {
        stopIdle = false;

        if (idleCoroutine != null)
        {
            StopCoroutine(idleCoroutine);
        }

        idleCoroutine = StartCoroutine(IdleLoopRoutine());
    }

    public void StopIdleLoop()
    {
        stopIdle = true;

        if (idleCoroutine != null)
        {
            StopCoroutine(idleCoroutine);
            idleCoroutine = null;
        }
    }

    IEnumerator IdleLoopRoutine()
    {
        if (idleSource == null) yield break;
        if (idleClips == null || idleClips.Length == 0) yield break;

        while (!stopIdle)
        {
            float delay = Random.Range(idleDelayMin, idleDelayMax);
            yield return new WaitForSeconds(delay);

            if (stopIdle) yield break;

            int index = GetRandomIdleIndex();
            if (index < 0) yield break;

            AudioClip clip = idleClips[index];
            if (clip != null)
            {
                idleSource.PlayOneShot(clip);
                yield return new WaitForSeconds(clip.length);
            }
        }
    }

    int GetRandomIdleIndex()
    {
        if (idleClips == null || idleClips.Length == 0)
            return -1;

        int index;
        do
        {
            index = Random.Range(0, idleClips.Length);
        }
        while (idleClips.Length > 1 && index == lastIdleIndex);

        lastIdleIndex = index;
        return index;
    }
}