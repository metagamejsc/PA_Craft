using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class ZombieChar : BaseCharacter
{
    public Material material;
    public SkinnedMeshRenderer[] lstMaterials;

    [Header("UI máu Enemy")]
    public Image imageFill;

    private float maxHealth;

    protected override void Start()
    {
        base.Start();
        moveSpeed = LunaManager.ins.enemySpeed;
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
        if (GameController.ins.isPauseGame)
        {
            return;
        }
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

        DynamicTextManager.CreateText((this.transform.position + Vector3.up * 2f), "-" + (dmg * 30).ToString(), DynamicTextManager.defaultData);
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
        if (imageFill == null) return;

        if (maxHealth <= 0f)
        {
            imageFill.fillAmount = 1f;
            return;
        }

        float percent = Mathf.Clamp01(health / maxHealth);
        imageFill.fillAmount = percent;
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
