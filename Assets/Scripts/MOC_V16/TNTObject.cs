using System;
using DG.Tweening;
using UnityEngine;

public class TNTObject : MonoBehaviour
{
    public ParticleSystem explosionParticleSystem;
    public Sequence s;
    public Renderer renderer;
    public LayerMask enemyLayerMask;
    public Rigidbody rigidbody;

    private void Start()
    {
        rigidbody = GetComponent<Rigidbody>();
    }

    public void Explore()
    {
        // Tạo hiệu ứng nổ
        var enemys=Physics.OverlapSphere(transform.position, 0.1f, enemyLayerMask);
        if (enemys.Length > 0)
        {
            foreach (var enemy in enemys)
            {
                if (enemy.TryGetComponent<BaseCharacter>(out var character))
                {
                    character.TakeDamage(100f); // Gọi phương thức TakeDamage trên BaseCharacter
                }
            }
        }
        Instantiate(explosionParticleSystem, transform.position, Quaternion.identity);
        Destroy(gameObject);
    }
    public void AnimExplore()
    {
        AudioManager.ins.PlaySoundXixi();
        Sequence s = DOTween.Sequence();
        s.Append(transform.DOScale(Vector3.one*0.1f, 2f).SetEase(Ease.OutBack))
            .Append(transform.DOScale(Vector3.zero, 0.5f).SetEase(Ease.InBack))
         .OnComplete(Explore);
    }
    
    /*public void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Ground"))
        {
            AnimExplore();
        }
    }*/
}
