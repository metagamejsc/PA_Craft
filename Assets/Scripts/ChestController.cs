using UnityEngine;
using DG.Tweening;

public class ChestController : MonoBehaviour
{
    public Transform chestLid;
    public float openAngle = -110f;
    public float duration = 0.35f;
    public AudioSource audioSource;
    public AudioClip openSound;
    public ParticleSystem openEffect;
    public TNTObject tntObject;

    public bool isOpen = false;
    private Vector3 closedRotation;

    private void Start()
    {
        closedRotation = chestLid.localEulerAngles;

        if (audioSource == null)
            audioSource = GetComponent<AudioSource>();
    }

    public void OpenChest()
    {
        if (isOpen) return;

        isOpen = true;

        Vector3 targetEuler = new Vector3(openAngle, closedRotation.y, closedRotation.z);
        
        if (audioSource && openSound)
            audioSource.PlayOneShot(openSound);
        chestLid.DOLocalRotate(targetEuler, duration).OnComplete(() =>
            {
                /*if (openEffect)
                {
                    openEffect.gameObject.SetActive(true);
                    openEffect.Play();
                }*/
                tntObject.gameObject.SetActive(true);
                //tntObject.Active();
            })
            .SetEase(Ease.OutBack);
    }
}