using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class ZombieChar : BaseCharacter
{
    public Material material;
    public SkinnedMeshRenderer[] lstMaterials;
    public GameObject[] lstIconHeart;
    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
        //health = LunaManager.ins.countDropFinal;
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

        foreach (var VARIABLE in lstIconHeart)
        {
            VARIABLE.transform.rotation = Quaternion.Euler(0, Camera.main.transform.rotation.eulerAngles.y, 0);
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
                        !player.isDead) // Kiểm tra có component Player và chưa chết
            .OrderBy(t => Vector3.Distance(transform.position, t.position))
            .FirstOrDefault();
    }

    public override void TakeDamage(float dmg)
    {
        
        if (isDead)
        {
            return;
        }
        health -= dmg;
        lstIconHeart[(int)health].SetActive(false);
        StartCoroutine(IeNhapNhay(2f));
        if (health <= 0)
        {
            
            GameController.ins.EnemyDead();
            animator.SetTrigger("Dead");
            isDead = true;
            Die();
        }
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
