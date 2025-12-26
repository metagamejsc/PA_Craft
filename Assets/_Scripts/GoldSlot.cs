using System;
using UnityEngine;
using TMPro;

public class GoldSlot : MonoBehaviour
{
    public MonsterController monster;
    private float currentGold = 0f;

    [Header("UI")]
    public TextMeshPro worldText; // World Space text để hiển thị vàng
    [Header("Model Holder & Effects")]
    public Transform modelHolder; // vị trí để gắn model của monster
    public ParticleSystem spawnEffect;

    public void AssignMonster(MonsterController monsterToAssign)
    {
        monster = monsterToAssign;

        // Gắn model vào đúng vị trí (nếu có)
        if (modelHolder != null && monster!= null)
        {
            Transform modelTransform = monster.transform;

            modelTransform.SetParent(modelHolder);
            modelTransform.localPosition = Vector3.zero;
            modelTransform.localRotation = Quaternion.Euler(0,0,0);
            modelTransform.localScale = Vector3.one;
        }

        // Play particle effect
        if (spawnEffect != null)
        {
            //Instantiate(spawnEffect, modelHolder.position, Quaternion.identity);
        }
    }

    private void Update()
    {
        if (monster != null)
        {
            currentGold += monster.goldPerSecond * Time.deltaTime;

            if (worldText != null)
            {
                worldText.text = "$"+Mathf.FloorToInt(currentGold).ToString();
            }
        }
    }

    private void Start()
    {
        worldText.text = "$0";
    }

    public float CollectGold()
    {
        float goldToGive = Mathf.Floor(currentGold);
        currentGold = 0f;

        if (worldText != null)
        {
            worldText.text = "$0";
        }

        return goldToGive;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            if (PlayerGold.Instance != null)
            {
                int collected = (int)CollectGold();
                PlayerGold.Instance.AddGold(collected);
            }
        }
    }
}