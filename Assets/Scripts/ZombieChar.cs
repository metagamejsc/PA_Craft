using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class ZombieChar : BaseCharacter
{
    public Material material;
    public SkinnedMeshRenderer[] lstMaterials;
    private float maxHealth;

    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;

        maxHealth = health;
        UpdateHealthUI();

        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material = new Material(material);
        }
    }

    protected override void Update()
    {
       
        base.Update();
    }

    protected override void SearchForEnemy()
    {
        if (isDead)
        {
            return;
        }

        if (target)
        {
            return;
        }

        Collider[] hits = Physics.OverlapSphere(transform.position, detectionRadiusMax);
        target = hits
            .Select(h => h.transform)
            .Where(t => t.CompareTag("Player") &&
                        t.TryGetComponent<BaseCharacter>(out var player) &&
                        !player.isDead)
            .OrderBy(t => Vector3.Distance(transform.position, t.position))
            .FirstOrDefault();
    }

    public override void TakeDamage(float dmg)
    {
        if (isDead)
        {
            return;
        }
        
        detectionRadiusMax = 999;
        health -= dmg;

        UpdateHealthUI();

        StartCoroutine(IeNhapNhay(2f));
        if (health <= 0)
        {
            animator.SetTrigger("Dead");
            isDead = true;
            Die();
            UpdateHealthUI();
        }
    }

    private void UpdateHealthUI()
    {
        
    }

    public IEnumerator IeNhapNhay(float time)
    {
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material.SetColor("_Color", Color.red);
        }
        yield return new WaitForSeconds(0.1f);
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material.SetColor("_Color", Color.white);
        }
    }
}
