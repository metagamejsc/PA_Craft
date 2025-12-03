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
        rigidbody = GetComponent<Rigidbody>();
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (hasHit) return;

        if (collision.collider.CompareTag("Ground") || collision.collider.CompareTag("Enemy"))
        {
            hasHit = true;

            rigidbody.velocity = Vector3.zero;
            rigidbody.useGravity = true;
            rigidbody.isKinematic = false;

            AnimExplore();
        }
    }


    public void AnimExplore()
    {
        AudioManager.ins.PlaySoundXixi();
        renderer.material.DOColor(Color.red, 0.3f).SetLoops(-1, LoopType.Yoyo);

        Sequence s = DOTween.Sequence();
        s.Append(transform.DOScale(Vector3.one * 0.1f, 2f).SetEase(Ease.OutBack))
            .Append(transform.DOScale(Vector3.zero, 0.5f).SetEase(Ease.InBack))
            .OnComplete(Explore);
    }

    private void Explore()
    {
        var enemys=Physics.OverlapSphere(transform.position, 0.2f, enemyLayerMask);
        if (enemys.Length > 0)
            foreach (var enemy in enemys)
            {
                if (enemy.TryGetComponent<BaseCharacter>(out var character))
                {
                    character.TakeDamage(100f); // Gọi phương thức TakeDamage trên BaseCharacter
                }
            }
        Instantiate(explosionParticleSystem, transform.position, Quaternion.identity);
        Destroy(gameObject);
    }
}