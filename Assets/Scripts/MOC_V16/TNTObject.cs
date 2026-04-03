using System;
using System.Collections;
using DG.Tweening;
using UnityEngine;

public class TNTObject : MonoBehaviour
{
    public ParticleSystem explosionParticleSystem;
    public Sequence s;
    public Renderer renderer;
    public LayerMask enemyLayerMask;
    public Rigidbody rigidbody;
    public float rangExplore = 1;

    private void Start()
    {
        rigidbody = GetComponent<Rigidbody>();
        //StartCoroutine(Xixi());
    }

    public void Explore()
    {
        // Tạo hiệu ứng nổ
        var enemys=Physics.OverlapSphere(transform.position, rangExplore, enemyLayerMask);
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
        StopAllCoroutines();
        AudioManager.ins.PlaySoundXixi();
        renderer.material.DOColor(Color.red, 0.3f).SetLoops(-1, LoopType.Yoyo);
        Sequence s = DOTween.Sequence();
        s.Append(transform.DOScale(Vector3.one*0.1f, 2f).SetEase(Ease.OutBack))
            .Append(transform.DOScale(Vector3.zero, 0.5f).SetEase(Ease.InBack))
         .OnComplete(Explore);
    }

    IEnumerator Xixi()
    {
        renderer.material.DOColor(Color.red, 0.5f).SetLoops(-1, LoopType.Yoyo);
        while (true)
        {
            yield return new WaitForSeconds(2f);
            AudioManager.ins.PlaySoundXixi();
        }
        
    }
}
