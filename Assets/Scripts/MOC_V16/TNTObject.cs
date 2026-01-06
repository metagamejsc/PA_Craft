using UnityEngine;
using DG.Tweening;

public class TNTObject : MonoBehaviour
{
    public ParticleSystem explosionParticleSystem;
    public Renderer renderer;
    public LayerMask enemyLayerMask;
    public Rigidbody rigidbody;

    private bool hasHit = false;

    private void Start()
    {
        //rigidbody = GetComponent<Rigidbody>();
    }

    public void AnimExplore()
    {
        AudioManager.ins.PlaySoundXixi();
        renderer.material.DOColor(Color.red, 0.3f).SetLoops(-1, LoopType.Yoyo);

        Sequence s = DOTween.Sequence();
        s.Append(transform.DOScale(Vector3.one * 0.3f, 2f).SetEase(Ease.OutBack))
            .Append(transform.DOScale(Vector3.zero, 0.5f).SetEase(Ease.InBack))
            .OnComplete(Explore);
    }

    private void Explore()
    {
        Instantiate(explosionParticleSystem, transform.position, Quaternion.identity);
        Destroy(gameObject);
        LunaManager.ins.OnClickEndCard();
        LunaManager.ins.ShowEndCard();
    }
}