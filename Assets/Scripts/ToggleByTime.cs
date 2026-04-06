using UnityEngine;
using System.Collections;

public class ToggleByTime : MonoBehaviour
{
    public GameObject target;

    public float startDelay = 0f;
    public float onTime = 1f;
    public float offTime = 1f;

    public bool loop = true;
    public bool playOnStart = true;

    Coroutine routine;

    void Start()
    {
        if (playOnStart)
        {
            StartToggle();
        }
    }

    public void StartToggle()
    {
        if (routine != null) StopCoroutine(routine);
        routine = StartCoroutine(ToggleRoutine());
    }

    public void StopToggle()
    {
        if (routine != null)
        {
            StopCoroutine(routine);
            routine = null;
        }
    }

    IEnumerator ToggleRoutine()
    {
        if (startDelay > 0f)
        {
            yield return new WaitForSeconds(startDelay);
        }

        do
        {
            target.SetActive(true);
            yield return new WaitForSeconds(onTime);

            target.SetActive(false);
            yield return new WaitForSeconds(offTime);

        } while (loop);
    }
}