using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class PlayerChar : BaseCharacter
{
    public GameObject swordFake;
    public Transform swordFakePos;
    public Transform swordPos;
    public Action fire;
    public Action canleFire;
    public GameObject[] lstWeapons;
    [Header("UI Buttons")]
    public Button btnShot;
    public Button btnSearchEnemy;
    public bool isHoldingShot;

    protected override void Update()
    {

        //HandleAttack();
        if (GameController.ins.isPauseGame)
        {
            return;
        }
        //SearchForEnemy();
        if (isHoldingShot)
        {
            HandleAttack();
        }
        attackCooldown -= Time.deltaTime;
    }

    protected override void Start()
    {
        base.Start();
        /*for (int i = 0; i < lstWeapons.Length; i++)
        {
            lstWeapons[i].SetActive(false);
        }*/
        //SwordObject.SetActive(false);
        IsFindingEnemy = true;
        SetupButtonEvents();
    }

    private void OnDisable()
    {
        SetHoldingShot(false);
    }

    private void SetupButtonEvents()
    {
        if (btnShot != null)
        {
            ButtonHoldHandler holdHandler = btnShot.GetComponent<ButtonHoldHandler>();
            if (holdHandler == null)
            {
                holdHandler = btnShot.gameObject.AddComponent<ButtonHoldHandler>();
            }

            holdHandler.onPointerDown = () => SetHoldingShot(true);
            holdHandler.onPointerUp = () => SetHoldingShot(false);
        }

        if (btnSearchEnemy != null)
        {
            btnSearchEnemy.onClick.AddListener(SearchEnemyByButton);
        }
    }

    private void SetHoldingShot(bool value)
    {
        isHoldingShot = value;
        if (!isHoldingShot)
        {
            CancleFire();
        }
    }

    public void SearchEnemyByButton()
    {
        SearchForEnemy();
    }

    protected override void SearchForEnemy()
    {
        if (isDead)
        {
            return;
        }
        if (isFindingEnemy == false)
        {
            return;
        }

        if (GameController.ins == null || GameController.ins.enemyList == null)
        {
            return;
        }

        GameObject currentEnemy = target != null ? target.gameObject : null;
        GameObject selectedEnemy = GetRandomEnemy(currentEnemy);

        if (selectedEnemy == null)
        {
            selectedEnemy = GetRandomEnemy(null);
        }

        target = selectedEnemy != null ? selectedEnemy.transform : null;

        if (target != null && MouseLook.ins != null)
        {
            MouseLook.ins.target = target;
            MouseLook.ins.UpdateCameraLookAt(target);
        }
        else if (MouseLook.ins != null)
        {
            MouseLook.ins.target = null;
        }

        /*
        Camera cam = Camera.main;
        Ray ray = new Ray(cam.transform.position, cam.transform.forward);
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit, detectionRadiusMax, LayerMask.GetMask("Enemy")))
        {
            GameObject hitObj = hit.transform.gameObject;

            if (hitObj.CompareTag("Enemy"))
            {
                target = hitObj.transform;
            }
            else
            {
                target = null;
            }
        }
        */
    }

    private GameObject GetRandomEnemy(GameObject excludedEnemy)
    {
        GameObject selectedEnemy = null;
        int validEnemyCount = 0;

        foreach (GameObject enemy in GameController.ins.enemyList)
        {
            if (enemy == null || enemy == excludedEnemy || !enemy.CompareTag("Enemy"))
            {
                continue;
            }

            if (enemy.TryGetComponent<BaseCharacter>(out BaseCharacter enemyCharacter) && enemyCharacter.isDead)
            {
                continue;
            }

            validEnemyCount++;
            if (UnityEngine.Random.Range(0, validEnemyCount) == 0)
            {
                selectedEnemy = enemy;
            }
        }

        return selectedEnemy;
    }

    public void CraftWeapon(int weaponId = 0)
    {
        lstWeapons[weaponId].SetActive(true);
        //SwordObject.SetActive(true);
    }
    public override void AtkCompleted()
    {
        base.AtkCompleted();
        //SwordObject.transform.parent = swordFakePos;
        //SwordObject.transform.localPosition = Vector3.zero;
        //SwordObject.transform.localRotation = Quaternion.Euler(Vector3.zero);
    }

    public override void HandleAttack()
    {
        if (isDead)
        {
            return;
        }
        fire?.Invoke();
        /*if (/*target != null && Vector3.Distance(transform.position, target.position) <= detectionRadiusMin && #1#attackCooldown <= 0)
        {
            SwordObject.transform.parent = swordPos;
            SwordObject.transform.localPosition = Vector3.zero;
            SwordObject.transform.localRotation = Quaternion.Euler(Vector3.zero);
            attackCooldown = atkAnimationClip.length/ attackSpeed;
            animator.SetFloat("AttackSpeed", attackCooldown>attackSpeed?1:attackSpeed);  
            animator.SetTrigger("Attack");
            // Reset thời gian hồi chiêu
        }*/
    }

    public void CancleFire()
    {
        canleFire?.Invoke();
    }
    public override void TakeDamage(float dmg)
    {
        if (isDead)
        {
            return;
        }
        health -= dmg;
        if (health <= 0)
        {
            LunaManager.ins.ShowEndCard();
            isDead = true;
            Die();
        }
    }

    protected override void Die()
    {
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        animator.transform.parent = null;
        //Destroy(gameObject);
    }

    private class ButtonHoldHandler : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
    {
        public Action onPointerDown;
        public Action onPointerUp;

        public void OnPointerDown(PointerEventData eventData)
        {
            onPointerDown?.Invoke();
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            onPointerUp?.Invoke();
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            onPointerUp?.Invoke();
        }
    }
}
