using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class FireTNT : MonoBehaviour
{
    public TNTObject tntObjectPrefab;
    public TNTObject tntInstance;
    public float timeFire=2;
    public float fireRate = 2f;
    public float _fireRateCurrent = 0.2f;
    public AnimationCurve fireCurve;

    private void Update()
    {
        
        if (_fireRateCurrent>0f)
        {
            _fireRateCurrent -= Time.deltaTime;
            if (_fireRateCurrent<=0)
            {
                tntInstance=Instantiate(tntObjectPrefab,transform);
                tntInstance.transform.localPosition = Vector3.zero;
            }
        }
    }

    public void FireTNTObject()
    {
        if (_fireRateCurrent>0)
        {
            return;
        }
        if (SpawnCreeper.zombieChars.Count>0)
        {
            AudioManager.ins.PlaySoundBuild();
            LunaManager.ins.CheckClickShowEndCard();
            var enemy = SpawnCreeper.zombieChars[UnityEngine.Random.Range(0, SpawnCreeper.zombieChars.Count)];
            var tntClone= Instantiate(tntInstance, transform);
        
            tntClone.transform.DOMoveX(enemy.transform.position.x, timeFire)
                .SetEase(Ease.Linear);
            tntClone.transform.DOMoveZ(enemy.transform.position.z, timeFire)
                .SetEase(Ease.Linear);
            tntClone.transform.DOMoveY(enemy.transform.position.y, timeFire*0.8f)
                .SetEase(fireCurve).OnComplete(() =>
                {
                    tntClone.rigidbody.isKinematic = false;
                    tntClone.AnimExplore();
                });
            Destroy(tntInstance.gameObject);
            tntInstance = null;
            _fireRateCurrent= fireRate;
        }
    }
}
