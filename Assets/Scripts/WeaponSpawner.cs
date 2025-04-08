using System;
using UnityEngine;
using System.Collections.Generic;
using DG.Tweening;

public class WeaponSpawner : MonoBehaviour
{
    [Header("Spawner Settings")]
    [SerializeField] private GameObject swordPrefabs;
    [SerializeField] private int maxSwords = 5;
    [SerializeField] private float spacing = 2f;
    [SerializeField] private Transform spawnArea;

    private List<Sword> listSpawnedSwords = new List<Sword>();

    void Start()
    {
        SpawnSwords();
    }

    void SpawnSwords()
    {
        // Spawn kiếm mới
        for (int i = 0; i < maxSwords; i++)
        {
            Vector3 spawnPosition = spawnArea.position + new Vector3(((int)i / 3) * spacing, 0, ((int)i % 3)*spacing);
            GameObject newSwordObject = Instantiate(swordPrefabs, spawnPosition, Quaternion.identity,spawnArea.transform);
            Sword newSword = new Sword(newSwordObject,spawnPosition,false);
            listSpawnedSwords.Add(newSword);
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            GameObject targetHand = other.GetComponent<BaseCharacter>().WeaponObject;
            for (int i = 0; i < listSpawnedSwords.Count; i++)
            {
                if (listSpawnedSwords[i].isFlying==false)
                {
                    listSpawnedSwords[i].isFlying = true;
                    StartCoroutine(MoveToPlayer(listSpawnedSwords[i],targetHand));
                    return;
                }
            }
          
        }
    }
    private System.Collections.IEnumerator MoveToPlayer(Sword sword,GameObject posHand)
    {
        sword.isFlying = true;
        sword.swordPrefab.transform.DOMove(posHand.transform.position, 0.5f).OnComplete(() =>
        {
            posHand.SetActive(true);
            sword.swordPrefab.SetActive(false);
        });
        yield return new WaitForSeconds(5);
        sword.Reset();
    }
}

public class Sword
{
    public GameObject swordPrefab;
    public Vector3 posSword;
    public bool isFlying;
    public Sword(GameObject swordPrefab,Vector3 posSword, bool isFlying = false)
    {
        this.swordPrefab = swordPrefab;
        this.posSword = posSword;
        this.isFlying = isFlying;
    }

    public void Reset()
    {
        swordPrefab.SetActive(true);
        swordPrefab.transform.position = posSword;
        isFlying = false;
    }
}