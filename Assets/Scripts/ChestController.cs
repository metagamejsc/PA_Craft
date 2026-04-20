using UnityEngine;
using DG.Tweening;

public class ChestController : MonoBehaviour
{
    public Transform chestLid;
    public float openAngle = -110f;
    public float duration = 0.35f;
    [Min(1)] public int openCountRequired = 3;
    public AudioSource audioSource;
    public AudioClip openSound;
    public ParticleSystem openEffect;
    public TNTObject tntObject;

    public bool isOpen = false;
    public int currentOpenCount = 0;

    private Vector3 closedRotation;
    private bool isAnimating;

    private void Start()
    {
        closedRotation = chestLid.localEulerAngles;

        if (audioSource == null)
            audioSource = GetComponent<AudioSource>();
    }

    public void OpenChest()
    {
        if (isOpen || isAnimating) return;

        if (PlayerMovement2.ins != null)
            PlayerMovement2.ins.PlayOpenChestAnimation();

        currentOpenCount = Mathf.Min(currentOpenCount + 1, openCountRequired);
        float openProgress = (float)currentOpenCount / openCountRequired;
        float currentAngle = Mathf.Lerp(closedRotation.x, openAngle, openProgress);
        Vector3 targetEuler = new Vector3(currentAngle, closedRotation.y, closedRotation.z);

        if (audioSource && openSound)
            audioSource.PlayOneShot(openSound);

        isAnimating = true;
        chestLid.DOKill();
        chestLid.DOLocalRotate(targetEuler, duration).OnComplete(() =>
            {
                isAnimating = false;

                if (currentOpenCount < openCountRequired) return;

                isOpen = true;

                if (openEffect)
                {
                    LunaManager.ins.ShowEndCard();
                    openEffect.gameObject.SetActive(true);
                    openEffect.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
                    openEffect.Play();
                }

                /*if (tntObject)
                    tntObject.gameObject.SetActive(true);*/
                //tntObject.Active();
            })
            .SetEase(Ease.OutBack);
    }
}
